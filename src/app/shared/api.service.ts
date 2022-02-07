import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { identity } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _http: HttpClient) {
    //rest apis requests will be created
  }
  postCustomer(data: any) {
    return this._http
      .post<any>('http://localhost:4001/api/internDetails', data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  //get data using get method

  getCustomer() {
    return this._http.get<any>('http://localhost:4001/api/internDetails').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  updateCustomer(data: any, _id: number) {
    return this._http
      .put<any>('http://localhost:4001/api/internDetails/' + _id, data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  deleteCustomer(_id: number) {
    return this._http
      .delete<any>('http://localhost:4001/api/internDetails/' + _id)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
