import { mail } from '../utils/helper';
const amqp = require('amqplib/callback_api');

// Publisher
export function publisher(data) {
  amqp.connect('amqp://localhost', function (err, conn) {
    if (err != null) {
      bail(err);
    } else {
      conn.createChannel(on_open);
      function on_open(err, ch) {
        if (err != null) bail(err);
        const stringdata = JSON.stringify(data);
        ch.assertQueue('Registration');
        ch.sendToQueue('Registration', Buffer.from(stringdata));
      }
    }
  });
}

// Consumer
export function consumer() {
  amqp.connect('amqp://localhost', function (err, conn) {
    if (err != null) {
      bail(err);
    } else {
      var ok = conn.createChannel(on_open);
      function on_open(err, ch) {
        if (err != null) bail(err);
        ch.assertQueue('Registration');
        ch.consume('Registration', function (msg) {
          if (msg !== null) {
            const data = JSON.parse(msg.content.toString());
            mail(data.email);
            console.log(data);
            ch.ack(msg);
          }
        });
      }
    }
  });
}
consumer();
