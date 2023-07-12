import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from '../Models/profile';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  baseApiUrl: string="http://localhost:5219";

  constructor(private http: HttpClient) { }

  getProfile()
  {
    return this.http.get<Profile>(this.baseApiUrl+ '/api/Profile/'+ localStorage.getItem('token'));
  }

  updateProfile( ProfileUpdate:Profile)
  {
    return this.http.put<Profile>(this.baseApiUrl+ '/api/Profile/'+localStorage.getItem('token'), ProfileUpdate);
    // return this.http.put<any>('http://localhost:5219/api/Profile/f617a460-d223-4b03-85e2-78503b6c7d6b', ProfileUpdate);
  }


  uploadPhoto(photo: File): Observable<any> {
    const formData = new FormData();
    formData.append('photo', photo);

    return this.http.post(`${this.baseApiUrl}/upload-photo`, formData);
  }
}
