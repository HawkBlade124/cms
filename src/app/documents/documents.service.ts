import { Injectable, EventEmitter } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import {HttpClient, HttpHeaders, HttpResponse } from'@angular/common/http'


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

  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument){
      return;
    }


  }


  addDocument(document: Document) {
    if(!document){
      return;
    }

    this.maxDocumentId++;
    document.id = this.maxDocumentId.toString();
    this.documents.push(document);

    const headers = new HttpHeaders({'Content-Type':'application/json'});
    this.http.put('https://cmsproject-4163e.firebaseio.com/documents.json',
    this.documents,
    { headers: headers })
    .subscribe(
      (responseData) => {
        this.documentListChangedEvent.next(this.documents.slice());
      }
    );
  }

  storeDocuments() {
    return this.http.put('https://cmsproject-4163e.firebaseio.com/documents.json', this.documentService.getDocuments());
  }

}
