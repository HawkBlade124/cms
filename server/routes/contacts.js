const express = require("express");
const router = express.Router();
const Contact = require("../model/contacts");

router.get("/", (req, res, next) => {
  Contact.find()
    .then(contacts => {
      res.status(200).json({
        contact: 'contacts fetched successfully!',
        contacts: contacts
      });
    })
    .catch(error => {
      returnError(res, error);
    })
});

router.post('/', function (request, response, next) {
  var maxContactId = sequenceGenerator.nextId("contacts");

  var contact = new Contact({
    id: maxContactId,
    name: request.body.name,
    email: request.body.email,
    phone: request.body.phone,
    imageUrl: request.body.imageUrl

  });
})

router.patch('/:id', function (request, response, next) {
  Contact.findOne({ id: request.params.id }, function (err, contact) {
    if (err || !contact) {
      return response.status(500).json({
        title: 'No contact Found!',
        error: { contact: 'contact not found' }
      });
    }

    contact.subject = request.body.subject;
    contact.msgText = request.body.msgText;
    contact.sender = request.body.sender;
  });
});

router.delete('/:id', function (request, response, next) {
  var query = { id: request.params.id };

  contact.findOne(query, function (err, contact) {
    if (err) {
      return response.status(500).json({
        title: 'No contact Found',
        error: err
      });
    }
    if (!contact) {
      return response.status(500).json({
        title: 'No contact Found',
        error: { contactId: request.params.id }
      })
    }
    contact.deleteOne({ _id: req.params.id }).then(result => {
      console.log(result);
      res.status(200).json({ contact: "contact deleted!" });
  });
});


  router.post("/:id", (req, res, next) => {
    contact.save()
      .then(contacts => {
        res.status(200).json({
          contact: "contact saved successfully!",
          contacts: contacts
        });
      })
      .catch(error => {
        returnError(res, error);
      })
  });
});
module.exports = router;
