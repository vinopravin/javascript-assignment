import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_URL = environment.SERVER_URL + 'api/auth';
  constructor(private http: HttpClient) { }

  loginUser() {
    this.http.get(this.BASE_URL).subscribe(
      (result: any) => {
        return(result)
      },
      (err) => {
        return(err)
      }
    )
  }
}
