const express = require("express");
const router = express.Router();

router.get('/', function (request, response, next) {
  getDocuments(response);
})

router.post('/', function (request, response, next) {
  var maxDocumentId = sequenceGenerator.nextId("documents");

  var document = new Document({
    id: maxDocumentId,
    name: request.body.name,
    description: request.body.description,
    url: request.body.url
  });

  saveDocument(response, document)
})

router.patch('/:id', function (request, response, next) {
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

    saveDocument(response, document);
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
    deleteDocument(response, document);
  });
});


getDocument(request, response)(
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
  }));

saveDocument(response, document)(
  router.post("/:id", (req, res, next) => {
    Document.save()
      .then(documents => {
        res.status(200).json({
          message: "Document saved successfully!",
          documents: documents
        });
      })
      .catch(error => {
        returnError(res, error);
      })
  }));

deleteDocument(response, document)(
  router.delete("/:id", (req, res, next) => {
    Document.deleteOne({ _id: req.params.id }).then(result => {
      console.log(result);
      res.status(200).json({ message: "Document deleted!" });
    });
  }));

module.exports = router;
