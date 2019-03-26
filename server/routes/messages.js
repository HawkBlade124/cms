const express = require("express");
const router = express.Router();
const Message = require("../model/messages");

router.get("/", (req, res, next) => {
  Message.find()
    .then(messages => {
      res.status(200).json({
        message: 'Messages fetched successfully!',
        messages: messages
      });
    })
    .catch(error => {
      returnError(res, error);
    })
});


router.post('/', function (request, response, next) {
  var maxMessageId = sequenceGenerator.nextId("messages");

  var message = new Message({
    id: maxMessageId,
    subject: request.body.subject,
    msgText: request.body.description,
    sender: request.body.sender
  });
  message.save().then(createdMessage => {
    res.status(201).json({
      message: "Message added successfully",
      documentId: createdMessage._id
    })
  })
})

router.patch('/:id', function (request, response, next) {
  Message.findOne({ id: request.params.id }, function (err, message) {
    if (err || !message) {
      return response.status(500).json({
        title: 'No message Found!',
        error: { message: 'message not found' }
      });
    }

    message.subject = request.body.subject;
    message.msgText = request.body.msgText;
    message.sender = request.body.sender;
  });
});

router.delete('/:id', function (request, response, next) {
  var query = { id: request.params.id };

  message.findOne(query, function (err, message) {
    if (err) {
      return response.status(500).json({
        title: 'No message Found',
        error: err
      });
    }
    if (!message) {
      return response.status(500).json({
        title: 'No message Found',
        error: { messageId: request.params.id }
      })
    }
    message.deleteOne({ _id: req.params.id }).then(result => {
      console.log(result);
      res.status(200).json({ message: "message deleted!" });
    });
  });
});


module.exports = router;
