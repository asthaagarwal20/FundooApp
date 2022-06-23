"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.consumer = consumer;
exports.publisher = publisher;

var _helper = require("../utils/helper");

var amqp = require('amqplib/callback_api'); // Publisher


function publisher(data) {
  amqp.connect('amqp://localhost', function (err, conn) {
    if (err != null) {
      bail(err);
    } else {
      var on_open = function on_open(err, ch) {
        if (err != null) bail(err);
        var stringdata = JSON.stringify(data);
        ch.assertQueue('Registration');
        ch.sendToQueue('Registration', Buffer.from(stringdata));
      };

      conn.createChannel(on_open);
    }
  });
} // Consumer


function consumer() {
  amqp.connect('amqp://localhost', function (err, conn) {
    if (err != null) {
      bail(err);
    } else {
      var on_open = function on_open(err, ch) {
        if (err != null) bail(err);
        ch.assertQueue('Registration');
        ch.consume('Registration', function (msg) {
          if (msg !== null) {
            var data = JSON.parse(msg.content.toString());
            (0, _helper.mail)(data.email);
            console.log(data);
            ch.ack(msg);
          }
        });
      };

      var ok = conn.createChannel(on_open);
    }
  });
}

consumer();