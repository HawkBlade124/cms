import { Injectable, EventEmitter } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import {HttpClient, HttpHeaders, HttpResponse } from'@angular/common/http'
import { Response } from '@angular/http';
import { map } from 'rxjs/operators'
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
    this.http.get<Document[]>('https://cmsproject-4163e.firebaseio.com/documents.json')
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

    this.http.delete('http://localhost:3000/documents' + document.id).map(
      (response: Response) =>{
        return response.json().obj;
      })
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

    const strDocument = JSON.stringify(newDocument);

    this.http.patch('https://localhost:3000/documents' + originalDocument.id, strDocument, {headers: headers}).map(
      (response: Response) =>{
        response.json().obj;
      })
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
    const strDocument = JSON.stringify(document);

    // this.maxDocumentId++;
    // document.id = this.maxDocumentId.toString();
    // this.documents.push(document);


    this.http.put('https://localhost:3000/documents', strDocument, {headers: headers})
    .map (
      (response: Response) => {
        return response.json().obj;
      })
      .subscribe(
      (documents:Document[]) => {
        this.documents = documents;
        this.documentListChangedEvent.next(this.documents.slice());
      }
    );
  }

  storeDocuments() {
    return this.http.put('https://cmsproject-4163e.firebaseio.com/documents.json', this.documentService.getDocuments());
  }

}
