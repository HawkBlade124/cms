const express = require("express");
const router = express.Router();
const Document = require("../model/documents");

router.get("/", (req, res, next) => {
  Document.find()
    .then(documents => {
      res.status(200).json({
        message: 'Documents fetched successfully!',
        documents: documents
      });
    })
    .catch(error => {
      returnError(res, error);
    })
});

router.post('/', function (request, response, next) {
  var maxDocumentId = sequenceGenerator.nextId("documents");

  var document = new Document({
    id: maxDocumentId,
    name: request.body.name,
    description: request.body.description,
    url: request.body.url
  });
  document.save().then(createdDocument =>{
    res.status(201).json({
      message: "Document added successfully",
      documentId: createdDocument._id
    })
  })
})

router.put('/:id', function (request, response, next) {
  Document.findOne({ id: request.params.id }, function (err, document) {
    if (err || !document) {
      return response.status(500).json({
        title: 'No Document Found!',
        error: { document: 'Document not found' }
      });
    }

    document.name = request.body.name;
    document.description = request.body.description;
    document.url = request.body.url;

    Document.updateOne({id: req.params.id }, document)
    .then
  });

});

router.delete('/:id', function (request, response, next) {
  var query = { id: request.params.id };

  Document.findOne(query, function (err, document) {
    if (err) {
      return response.status(500).json({
        title: 'No Document Found',
        error: err
      });
    }

    if (!document) {
      return response.status(500).json({
        title: 'No Document Found',
        error: { documentId: request.params.id }
      })
    }
    Document.deleteOne({ _id: req.params.id }).then(result => {
      console.log(result);
      res.status(200).json({ message: "Document deleted!" });
    });
  });
});


module.exports = router;
