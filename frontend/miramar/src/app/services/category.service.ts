import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

const host = environment.host

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categorySubject = new Subject<any[]>();
  categories: any[] = []
  constructor(private httpClient: HttpClient) {
    this.getListCategory()
   }

  emitNextSubjet() {
    this.categorySubject.next(this.categories);
  }

  getListCategory() {
    this.httpClient.get(host +'/category')
      .subscribe((res:any) => {
        this.categories = res;
        this.emitNextSubjet();
      }, err => {
        console.log(err)
      })
  
  }
}
