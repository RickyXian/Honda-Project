import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getLocaleDateFormat } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) { }

  configUrl = 'assets/data.txt';
  configBack = 'assets/readings.php';
  baseUrl = '';
  
  getConfig() {
    return this.http.get(this.configUrl,{responseType: "text"});
  }

  getData(){
    return this.http.get(this.configBack);
  }

}

 
