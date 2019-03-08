import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'filter',
})
export class ContactsFilterPipe implements PipeTransform {

  transform(value:any, contacts: Contact[], [term]) {
    let filteredArray: Contact[] = [];

    filteredArray = contacts.filter(
 (contact: any) => contact.name.toLowerCase().includes(term.toLowerCase()));

    if(filteredArray.length < 1){
      return contacts;
    }

    return filteredArray;
  }

}
