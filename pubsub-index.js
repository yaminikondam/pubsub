/**
 * Triggered from a message on a Cloud Pub/Sub Topic.
 */
const {PubSub} = require('@google-cloud/pubsub');

/*
  Publishes a message to a Cloud Pub/Sub Topic.
*/
exports.publish = async (req, res) => {
  if (!req.body.topic || !req.body.message) {
    res
      .status(500)
      .send(
        'Missing parameter(s); include "topic" and "subscription" properties in your request.'
      );
    return;
  }
  console.log(`Publishing message to topic ${req.body.topic}`);

  // References an existing topic
  const topic = pubsub.topic(req.body.topic);

  const messageObject = {
    data: {
      message: req.body.message,
    },
  };
  const messageBuffer = Buffer.from(JSON.stringify(messageObject), 'utf8');

  // Publishes a message
  try {
    await topic.publish(messageBuffer);
    res.status(200).send('Message published.');
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

/*
 * Triggered from a message on a Cloud Pub/Sub topic.
*/
exports.subscribe = pubsubMessage => {
  
  console.log(Buffer.from(JSON.stringify(pubsubMessage.data), 'utf8').toString());
};
