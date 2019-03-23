import { Injectable, EventEmitter } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import {HttpClient, HttpHeaders, HttpResponse } from'@angular/common/http'
import { Response } from '@angular/http';

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
    this.http.get<Document[]>('http://localhost:3000/documents')
    .subscribe(
      (responseData: Document[]) => {
        if (responseData && responseData.length > 0) {
        this.documents = responseData;
        //this.maxDocumentId = this.getMaxId();
        this.documents.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        }
        else {
          this.documents = [];
        }
        this.documentListChangedEvent.next(this.documents.slice());
      }
    )

  }

  getDocument(index: string) {
    return this.documents[index];
  }

  deleteDocument(document: Document) {
    if (!document){
      return;
    }

    this.http.delete('http://localhost:3000/documents' + document.id)
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.documentListChangedEvent.next(this.documents.slice());
        })
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument){
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0){
      return;
    }

    const headers = new HttpHeaders({'Content-Type':'application/json'});


    this.http.patch('https://localhost:3000/documents' + originalDocument.id,  {headers: headers})
     .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.documentListChangedEvent.next(this.documents.slice());
        })
  }


  addDocument(document: Document) {
    if(!document){
      return;
    }
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    document.id = '';

    this.http.put('https://localhost:3000/documents', {headers: headers})
      .subscribe(
      (documents:Document[]) => {
        this.documents = documents;
        this.documentListChangedEvent.next(this.documents.slice());
      }
    );
  }

  // storeDocuments() {
  //   return this.http.put('http://localhost:3000/document, this.documentService.getDocuments();
  // }

}
