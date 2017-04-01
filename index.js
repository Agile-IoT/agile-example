'use strict';
var agile = require('agile-sdk')('http://agile-core:8080');
var db = require('firebase').initializeApp({
  databaseURL: 'https://agile-demo.firebaseio.com'
}).database();

function devicePoll() {
  setInterval(function () {
    agile.protocolManager.devices()
    .then(function(devices) {
      // console.log(devices);
      db.ref().set(devices);
    })
    .catch(function(err) {
      console.log(err);
    });
  }, 5000);
}

function start() {
  agile.protocolManager.discovery.start().then(function() {
    console.log('All protocols are running discovery is on');
    devicePoll();
  }).catch(function(err) {
    console.log(err);
    // keep running trying discovery is turned on
    setTimeout(function () {
      console.log('retrying');
      start();
    }, 1000);
  });
}

// run app
start();
