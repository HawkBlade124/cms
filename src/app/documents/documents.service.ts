import { Injectable, EventEmitter } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';
import { Subject } from 'rxjs';
import 'rxjs/Rx'
import {HttpClient, HttpHeaders, HttpResponse } from'@angular/common/http'
// import { Http, Response } from '@angular/http'

@Injectable({
  providedIn: 'root'
})

export class DocumentsService {
  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;
  documents: Document[] = [];
  id: string;

  constructor(private http: HttpClient, private documentService: DocumentsService) {
      this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }


  getMaxId(): number{
   var maxId = 0;
    for(let document of this.documents){
     var currentId = document.id;
      if(+currentId > maxId){
       +maxId;
      }
    }
    return maxId;
  }

  getDocuments() {
    this.http.get('https://cmsproject-4163e.firebaseio.com/documents')
    .subscribe(
      (responseData: Document[]) => {
        this.documents = responseData;
        this.maxDocumentId = this.getMaxId();
        this.documents.sort();
        this.documentListChangedEvent.next(this.documents.slice());
      }
    )
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
    this.documentService.setDocuments(this.documents);
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

  addDocument(newDocument: Document, documentsListClone: Document) {


    if(!newDocument){
      return;
    }
    this.maxDocumentId++;
    // this.addDocument.id = this.maxDocumentId;
    this.documents.push(...this.documents);
    documentsListClone[this.id] = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone[this.id])
  }

  storeDocuments() {
    return this.http.put('https://cmsproject-4163e.firebaseio.com/documents.json', this.documentService.getDocuments());
  }

}
