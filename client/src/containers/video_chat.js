import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// 
import io from 'socket.io-client';

class VideoChat extends Component { 
  constructor(props) {	
    super(props);
    this.state = {
      // SIGNAL_SERVER: 'http://localhost',
      USE_AUDIO: true,
      USE_VIDEO: true,
      DEFAULT_CHANNEL: this.props.shortID,
      MUTO_AUDIO_BY_DEFAULT: false,
      ICE_SERVERS: [{
        url: 'stun:stun.l.google.com:19302'
      }],
      local_media_stream: null,
      peers: {},
      peer_media_elements: {},
      signaling_socket: io(),
      join_chat_channel: (channel, userdata) => {
        console.log('CHANNEL CHANNEL: ', channel);
        console.log('THIS.STATE: ', this.state.signaling_socket);
        this.state.signaling_socket.emit('join', {
          'channel': channel,
          'userdata': userdata
        });
      },
      part_chat_channel: (channel) => {
        console.log('LOCAL MEDIA STREAM BRAH: ', this.state.local_media_stream);
        this.state.signaling_socket.emit('part', channel);
        this.state.local_media_stream.getTracks().forEach(track => track.stop());
      },
    };
    /* ------------------------ Shorten this.state --------------------------- */
    let ts = this.state;    
    /* ------------------------ Process --------------------------------- */
    ts.signaling_socket.on('connect', function() {
      console.log('Connected to signaling server');
      setup_local_media(function() {
        /* once the user has given us access to their
         * microphone/camcorder, join the channel and start peering up */
        ts.join_chat_channel(ts.DEFAULT_CHANNEL, {
          'whatever-you-want-here': 'stuff'
        });
      });
    });
    
    ts.signaling_socket.on('disconnect', function() {
      console.log('Disconnected from signaling server');
      /* Tear down all of our peer connections and remove all the
       * media divs when we disconnect */
      for (peer_id in peer_media_elements) {
        peer_media_elements[peer_id].remove();
      }
      for (peer_id in peers) {
        peers[peer_id].close();
      }
      peers = {};
      peer_media_elements = {};
    });

    ts.signaling_socket.on('addPeer', function(config) {
      console.log('Signaling server said to add peer: ', config);
      let peer_id = config.peer_id;
      if (peer_id in ts.peers) {
      /* This could happen if the user joins multiple channels where the other peer is also in. */
        console.log('Already connected to peer ', peer_id);
        return;
      }
      var peer_connection = new RTCPeerConnection({
        'iceServers': ts.ICE_SERVERS
      }, {
        'optional': [{
          'DtlsSrtpKeyAgreement': true
        }]
      }
        /* this will no longer be needed by chrome
         * eventually (supposedly), but is necessary
         * for now to get firefox to talk to chrome */
      );
      console.log('PEER_CONNECTION: ', peer_connection);
      ts.peers[peer_id] = peer_connection;

      peer_connection.onicecandidate = function(event) {
        if (event.candidate) {
          signaling_socket.emit('relayICECandidate', {
            'peer_id': peer_id,
            'ice_candidate': {
              'sdpMLineIndex': event.candidate.sdpMLineIndex,
              'candidate': event.candidate.candidate
            }
          });
        }
      };
      // ON ADD STREAM NOT WORKING
      peer_connection.onaddstream = function(event) {
        console.log('ON ADDDDDD STREAM');
        var remote_media = ts.USE_VIDEO ? document.createElement('video') :
          document.createEvent('audio');
        remote_media_.setAttribute('autoplay', 'autoplay');
        if (ts.MUTO_AUDIO_BY_DEFAULT) {
          remote_media.setAttribute('muted', 'true');
        }
        remote_media.setAttribute('controls', '');
        remote_media.setAttribute('width', '50%');
        ts.peer_media_elements[peer_id] = remote_media;
        var video = document.getElementsByClassName('videos');
        console.log('CURREANT VIDEOO!!1: ', video);
        video.appendChild(remote_media);
        attachMediaStream(remote_media, event.stream);
      };
      // ADD OUR LOCAL STREAM
      console.log('LOCAL MEDIA STREAM: ', ts.local_media_stream);
      setup_local_media(peer_connection.addStream, function() {
        console.log('ERRORRR adding stream!');
      });
      peer_connection.addStream(ts.local_media_stream);
      /* Only one side of the peer connection should create the
       * offer, the signaling server picks one to be the offerer.
       * The other user will get a 'sessionDescription' event and will
       * create an offer, then send back an answer 'sessionDescription' to us
       */
      if (config.should_create_offer) {
        console.log('Creating RTC offer to ', peer_id);
        peer_connection.createOffer(
          function(local_description) {
            console.log('Local offer description is: ', local_description);
            peer_connection.setLocalDescription(local_description,
              function() {
                ts.signaling_socket.emit('relaySessionDescription', {
                  'peer_id': peer_id,
                  'session_description': local_description
                });
                console.log('Offer setLocalDescription succeeded');
              },
              function() {
                Alert('Offer setLocalDescription failed!');
              }
            );
          },
          function(error) {
            console.log('Error sending offer: ', error);
          });
      }
    });
    /**
     * Peers exchange session descriptions which contains information
     * about their audio / video settings and that sort of stuff. First
     * the 'offerer' sends a description to the 'answerer' (with type
     * 'offer'), then the answerer sends one back (with type 'answer').
    */
    ts.signaling_socket.on('sessionDescription', function(config) {
      console.log('REMOTE DESCRITION RECEIVED: ', config);
      let peer_id = config.peer_id;
      let peer = ts.peers[peer_id];
      let remote_description = config.session_description;
      console.log('REMOTE SESSION: ', config.session_description);
      let desc = new RTCSessionDescription(remote_description);
      var stuff = peer.setRemoteDescription(desc, function() {
        console.log('setRemoteDescription succeeded');
        if (remote_description.type === 'offer') {
          console.log('CREATING ANSWER');
          peer.createAnswer(function(local_description) {
            console.log('ANSWER DESCRIPTION IS: ', local_description);
            peer.setLocalDescription(local_description, function() {
              ts.signaling_socket.emit('relaySessionDescription', {
                'peer_id': peer_id,
                'session_description': local_description
              });
              console.log('Answer setLocalDescription succeeded');
            }, function() {
              Alert('Answer setLocalDescription failed');
            });
          },
          function(error) {
            console.log('Error creating answer: ', error);
            console.log(peer);
          });
        }
      },
      function(error) {
        console.log('setRemoteDescription error: ', error);
      }
      );
      console.log('DESCRIPTION OBJECT: ', desc);
    });
    /**
     * The offerer will send a number of ICE Candidate blobs to the answerer so they
     * can begin trying to find the best path to one another on the net.
     */
    ts.signaling_socket.on('iceCandidate', function(config) {
      let peer = peers[conifg.peer_id];
      let ice_candidate = config.ice_candidate;
      peer.addIceCandidate(new RTCIceCandidate(ice_candidate));
    });
    /**
    * When a user leaves a channel (or is disconnected from the
    * signaling server) everyone will recieve a 'removePeer' message
    * telling them to trash the media channels they have open for those
    * that peer. If it was this client that left a channel, they'll also
    * receive the removePeers. If this client was disconnected, they
    * wont receive removePeers, but rather the
    * signaling_socket.on('disconnect') code will kick in and tear down
    * all the peer sessions.
    */
    ts.signaling_socket.on('removePeer', function(c) {
      console.log('SIGNAL SERVER SAID TO REMOVE PEER:  ', c);
      let peer_id = c.peer_id;
      if (peer_id in ts.peer_media_elements) {
        ts.peer_media_elements[peer_id].remove();
      }
      if (peer_id in ts.peers) {
        ts.peers[peer_id].close();
      }
      delete ts.peers[peer_id];
      delete ts.peer_media_elements[c.peer_id];
    });

    let setup_local_media = function(callback, errorback) {
      if (ts.local_media_stream !== null) {
        if (callback) {
          callback();
        }
        return;
      }
      /* Ask user for permission to use the computers microphone and/or camera,
      * attach it to an <audio> or <video> tag if they give us access. */
      console.log('Requesting acccess to local audio / video inputs');
      navigator.getUserMedia = (navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);
      let attachMediaStream = function(element, stream) {
        if (element !== undefined) {
          element.srcObject = stream;
        } else {
          console.error('Element undefined!');
          return;
        }
      };
      console.log('Getting user media!...');
      navigator.getUserMedia({
        audio: ts.USE_AUDIO,
        video: ts.USE_VIDEO
      }, function(stream) { /* user accepted access to a/v */
        console.log('Access granted to audio/video');
        ts.local_media_stream = stream;
        let local_media = ts.USE_VIDEO ? document.createElement('video') :
          document.createElement('audio');
        local_media.setAttribute('autoplay', 'autoplay');
        local_media.setAttribute('muted', 'true'); /* always mute ourselves by default */
        local_media.setAttribute('controls', '');
        local_media.setAttribute('width', '50%');
        let video = document.getElementsByClassName('videos');
        video[0].appendChild(local_media);
        attachMediaStream(local_media, stream);
        if (callback) {
          callback(stream);
        }
      }, function() {
        console.log('Access denied for audio/video');
        alert('You chose not to provide access to the camera/mircophone, demo will not work');
        if (errorback) {
          errorback();
        }
      });
    };

    /* ------------------------ Bind Funcs --------------------------------- */
    this.endVideo = this.endVideo.bind(this);
  }
  // create botton, to exit, once yuou exit call part_chat_channel(channel);

  endVideo() {
    console.log('INSIDE END VIDEO');
    this.state.part_chat_channel(this.state.DEFAULT_CHANNEL);
    this.props.toggleVideo();
  }

  render () {
    return (
      <div>
        <div className='videos'></div>
        <button onClick={this.endVideo}>Leave Video Chat</button>
      </div>

    );
  }
}

export default VideoChat;
