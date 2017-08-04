import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// 
import io from 'socket.io-client';

class VideoChat extends Component { 
  constructor(props) {	
    super(props);

    this.state = {
      // SIGNAL_SERVER: 'http://localhost',
      // USE_AUDIO: true,
      // USE_VIDEO: true,
      DEFAULT_CHANNEL: 'test',
      // MUTO_AUDIO_BY_DEFAULT: false,
      // ICE_SERVERS: [{
      //   url: 'stun:global.stun.twilio.com:3478?transport=udp'
      // }],
      // local_media_stream: null,
      // peers: {},
      // peer_media_elements: {},
      // signaling_socket: io(),
      // join_chat_channel: (channel, userdata) => {
        
      //   this.state.signaling_socket.emit('join', {
      //     'channel': channel,
      //     'userdata': userdata
      //   });
      // },
      part_chat_channel: (channel) => {
        io().emit('part', channel);
        // local_media_stream = null;
        local_media_stream.getTracks().forEach(track => track.stop());
      },
    };
  // }
  // componentDidMount() {
    /** CONFIG **/
        /* ------------------------ Shorten this.state --------------------------- */
    let ts = this.state; 
    // var SIGNALING_SERVER = 'http://localhost';
    var USE_AUDIO = true;
    var USE_VIDEO = true;
    var MUTE_AUDIO_BY_DEFAULT = true;
    /** You should probably use a different stun server doing commercial stuff **/
    /** Also see: https://gist.github.com/zziuni/3741933 **/
    var ICE_SERVERS = [{
        url: 'stun:global.stun.twilio.com:3478?transport=udp'
    }];
    var signaling_socket = null; /* our socket.io connection to our webserver */
    var local_media_stream = null; /* our own microphone / webcam */
    var peers = {}; /* keep track of our peer connections, indexed by peer_id (aka socket.io id) */
    var peer_media_elements = {}; /* keep track of our <video>/<audio> tags, indexed by peer_id */
    var checkIfInChannel = this.props.channelId !== undefined ? true : false;
    var channel = this.props.channelId;
    // var numberOfVideos =
    // console.log('Connecting to signaling server');
    // signaling_socket = io(SIGNALING_SERVER);
    signaling_socket = io();
    signaling_socket.on('connect', function() {
      console.log('Connected to signaling server');
      if(checkIfInChannel){
        setup_local_media(function() {
          /* once the user has given us access to their
          * microphone/camcorder, join the channel and start peering up */
          join_chat_channel(channel, {
            'whatever-you-want-here': 'stuff'
          });
        });
      } 
    });

    signaling_socket.on('disconnect', function() {
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

    const join_chat_channel = function(channel, userdata) {
      signaling_socket.emit('join', {
        'channel': channel,
        'userdata': userdata
      });
    }
    // const part_chat_channel = function(channel) {
    //   signaling_socket.emit('part', channel);
    // }
    /**
     * When we join a group, our signaling server will send out 'addPeer' events to each pair
     * of users in the group (creating a fully-connected graph of users, ie if there are 6 people
     * in the channel you will connect directly to the other 5, so there will be a total of 15
     * connections in the network).
     */
    signaling_socket.on('addPeer', function(config) {      
      // console.log('Signaling server said to add peer:', config);
      var peer_id = config.peer_id;
      if (peer_id in peers) {
        /* This could happen if the user joins multiple channels where the other peer is also in. */
        // console.log('Already connected to peer ', peer_id);
        return;
      }

      if(document.getElementById('videos').childNodes.length > 4) {
        alert('Please purchase our premium plan!');
      }

      var peer_connection = new RTCPeerConnection({
        'iceServers': ICE_SERVERS
      }, {
        'optional': [{
          'DtlsSrtpKeyAgreement': true
        }]
      }
        /* this will no longer be needed by chrome
         * eventually (supposedly), but is necessary
         * for now to get firefox to talk to chrome */
      );
      // console.log(peer_connection)
      peers[peer_id] = peer_connection;
      
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
      }
      // ON ADD STREAM NOT WORKING
      peer_connection.onaddstream = function(event) {
        // console.log('ON ADDDDDD STTTTREEEAAAMMMM');
        var remote_media = USE_VIDEO ? document.createElement('video') : document.createElement('audio');
        remote_media.setAttribute('autoplay', 'autoplay');
        if (MUTE_AUDIO_BY_DEFAULT) {
          remote_media.setAttribute('muted', 'true');
        }
        remote_media.setAttribute('controls', '');
        remote_media.setAttribute('width', '50%');
        peer_media_elements[peer_id] = remote_media;
        var video = document.getElementById('videos');
        // console.log(video)
        video.appendChild(remote_media);
        attachMediaStream(remote_media, event.stream);
      }

      //CHANGE 1
      peer_connection.addStream(local_media_stream);

      /* Add our local stream */
      // console.log('LOCAL MEDIA STREAM: ', local_media_stream)
      // setup_local_media(peer_connection.addStream, function () {
      //   console.log('Error adding stream!');
      // });
      // peer_connection.addStream(local_media_stream);
      /* Only one side of the peer connection should create the
       * offer, the signaling server picks one to be the offerer.
       * The other user will get a 'sessionDescription' event and will
       * create an offer, then send back an answer 'sessionDescription' to us
       */
      if (config.should_create_offer) {
        // console.log('Creating RTC offer to ', peer_id);
        peer_connection.createOffer(
          function(local_description) {
            // console.log('Local offer description is: ', local_description);
            peer_connection.setLocalDescription(local_description,
              function() {
                signaling_socket.emit('relaySessionDescription', {
                  'peer_id': peer_id,
                  'session_description': local_description
                });
                // console.log('Offer setLocalDescription succeeded');
              },
              function() {
                Alert('Offer setLocalDescription failed!');
              }
            );
          },
          function(error) {
            // console.log('Error sending offer: ', error);
          });
      }
    });
    /**
     * Peers exchange session descriptions which contains information
     * about their audio / video settings and that sort of stuff. First
     * the 'offerer' sends a description to the 'answerer' (with type
     * 'offer'), then the answerer sends one back (with type 'answer').
     */
    signaling_socket.on('sessionDescription', function(config) {
      // console.log('Remote description received: ', config);
      var peer_id = config.peer_id;
      var peer = peers[peer_id];
      var remote_description = config.session_description;
      console.log(config.session_description);

      var desc = new RTCSessionDescription(remote_description);
      peer.setRemoteDescription(desc,
        function() {
          // console.log('setRemoteDescription succeeded');
          if (remote_description.type == 'offer') {
            // console.log('Creating answer');
            peer.createAnswer(
              function(local_description) {
                // console.log('Answer description is: ', local_description);
                peer.setLocalDescription(local_description,
                  function() {
                    signaling_socket.emit('relaySessionDescription', {
                      'peer_id': peer_id,
                      'session_description': local_description
                    });
                    // console.log('Answer setLocalDescription succeeded');
                  },
                  function() {
                    Alert('Answer setLocalDescription failed!');
                  }
                );
              },
              function(error) {
                // console.log('Error creating answer: ', error);
                // console.log(peer);
              });
          }
        },
        function(error) {
          // console.log('setRemoteDescription error: ', error);
        }
      );
      // console.log('Description Object: ', desc);
    });
    /**
     * The offerer will send a number of ICE Candidate blobs to the answerer so they
     * can begin trying to find the best path to one another on the net.
     */
    signaling_socket.on('iceCandidate', function(config) {
      var peer = peers[config.peer_id];
      var ice_candidate = config.ice_candidate;
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
    signaling_socket.on('removePeer', function(config) {
      console.log('Signaling server said to remove peer:', config);
      var peer_id = config.peer_id;
      if (peer_id in peer_media_elements) {
        peer_media_elements[peer_id].remove();
      }
      if (peer_id in peers) {
        peers[peer_id].close();
      }
      delete peers[peer_id];
      delete peer_media_elements[config.peer_id];
    });
  /***********************/
  /** Local media stuff **/
  /***********************/

  function attachMediaStream(element, stream) {
    // console.log('DEPRECATED, attachMediaStream will soon be removed.');
    if (element !== undefined) {
      element.srcObject = stream;
    } else {
      // console.error('Element undefined!');
      return;
    }
  };

  function setup_local_media(callback, errorback) {
    if (local_media_stream != null) { /* ie, if we've already been initialized */
      if (callback) callback();
      return;
    }
    /* Ask user for permission to use the computers microphone and/or camera,
     * attach it to an <audio> or <video> tag if they give us access. */
    // console.log('Requesting access to local audio / video inputs');
    navigator.getUserMedia = (navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia);


    // console.log('Getting user media!...');
    navigator.getUserMedia({
      'audio': USE_AUDIO,
      'video': USE_VIDEO
    },
    (stream) => { /* user accepted access to a/v */
      console.log('Access granted to audio/video');
      local_media_stream = stream;
      var local_media = USE_VIDEO ? document.createElement('video') : document.createElement('audio');
      local_media.setAttribute('autoplay', 'autoplay');
      local_media.setAttribute('muted', 'true'); /* always mute ourselves by default */
      local_media.setAttribute('controls', '');
      local_media.setAttribute('width', '50%');
      var video = document.getElementById('videos');
      video.appendChild(local_media);
      attachMediaStream(local_media, stream);
      if (callback) callback(stream);
    },
    function() { /* user denied access to a/v */
      // console.log('Access denied for audio/video');
      alert('You chose not to provide access to the camera/microphone, demo will not work.');
      if (errorback) errorback();
    });
  }

    this.endVideo = this.endVideo.bind(this);  
}

  endVideo() {
    console.log('INSIDE END VIDEO');

    this.state.part_chat_channel(this.props.channelId);
    this.props.toggleVideo();
  }

  render () {
    return (
      <div>
         <div id='videos'></div> 
        <button onClick={this.endVideo}>Leave Video Chat</button>
      </div>

    );
  }
}

export default VideoChat;
