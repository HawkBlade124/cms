const express = require("express");
const router = express.Router();

router.get('/', function (request, response, next) {
  getContacts(response);
})

router.post('/', function (request, response, next) {
  var maxContactId = sequenceGenerator.nextId("contacts");

  var contact = new Contact({
    id: maxContactId,
    name: request.body.name,
    email: request.body.email,
    phone: request.body.phone,
    imageUrl: request.body.imageUrl

  });

  saveContact(response, contact)
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

    saveContact(response, contact);
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
    deleteContact(response, contact);
  });
});

getContact(request, response)(
  router.get("/", (req, res, next) => {
    contact.find()
      .then(contacts => {
        res.status(200).json({
          contact: 'contacts fetched successfully!',
          contacts: contacts
        });
      })
      .catch(error => {
        returnError(res, error);
      })
  }));

saveContact(response, contact)(
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
  }));

deleteContact(response, contact)(
  router.delete("/:id", (req, res, next) => {
    contact.deleteOne({ _id: req.params.id }).then(result => {
      console.log(result);
      res.status(200).json({ contact: "contact deleted!" });
    });
  }));
