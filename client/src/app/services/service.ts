import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class OpenaiService {
  private baseUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  getChatCompletion(messages: any[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/getChatCompletion`, { messages });
  }
}
