import { Injectable, EventEmitter } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';
import { Subject } from 'rxjs';
import { Subject } from 'rxjs/Subject';


@Injectable({
  providedIn: 'root'
})

export class DocumentsService {
  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();
<<<<<<< HEAD
  documentsChanged = new Subject<Document[]>();
  startedEditing = new Subject<string>();
  maxDocumentId: number;
=======

>>>>>>> f837bd5cde805c7cfbafd1bbb634447d8128393b
  documents: Document[] = [];


  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }


  getMaxId(): number{
   var maxId = 0;
    for(let document of this.documents){
     var currentId = +document.id;
      if(+currentId > maxId){
       +maxId;
      }
    }
    return maxId;
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }
  getDocument(index: string) {
    return this.documents[index];
  }

  deleteDocument(document: Document) {
    if (document === null) {
      return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.documents.splice(pos, 1);
    this.documentListChangedEvent.next(this.documents.slice());
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument){
      return;
    }
    
    const pos = this.documents.indexOf(originalDocument);

    if ( pos < 0){
      return;     
    }


    this.documents[pos] = newDocument;
    
  }

  addDocument(document: Document) {
    this.documents.push(document);
    this.documentsChanged.next(this.documents.slice());
  }

}
