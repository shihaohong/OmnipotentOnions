'use strict';
const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');

const app = express();

app.use(middleware.morgan('dev'));
app.use(middleware.cookieParser());
app.use(middleware.bodyParser.urlencoded({extended: false}));
app.use(middleware.bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(middleware.auth.session);
app.use(middleware.passport.initialize());
app.use(middleware.passport.session());
app.use(middleware.flash());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/', routes.auth);

// add groups router
app.use('/groups', routes.groups);

// add profiles_groups router
app.use('/profileGroups', routes.profilesGroups);

// add profile router
app.use('/profiles', routes.profiles);

//  add channels router
app.use('/channels', routes.channels);

// add messages router
app.use('/messages', routes.messages);

// add friends router
app.use('/friendsget', routes.profilesFriends);

// add pending and requests router
app.use('/pendingfriends', routes.pendingFriends);

// add events router
app.use('/events', routes.events);

//add attendees router
app.use('/attendees', routes.attendees);

module.exports = app;
