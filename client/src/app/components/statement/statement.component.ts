import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.scss']
})
export class StatementComponent {
  constructor(private http: HttpClient) {}

  userMessage: string=""
  chatMessages: { role: string, content: string }[] = [{ role: "system", content: "You are a devil's advocate. Your responses are in four sentences or less."}];
  displayedChatMessages: { role: string, content: string }[] = [];
  response: string="";

  toggleColor(role: string) {
    let color = ""
    if ( role==="user" ) {
      color = "rgb(255,255,255)"
    } else {
      color = "rgb(247, 247, 248)"
    }
  }

  sendUserMessage(message: string) {

    this.chatMessages.push({ role: "user", content: this.userMessage });
    this.displayedChatMessages.push({ role: "user", content: this.userMessage });

    const requestData = {
      // message: this.userMessage,
      messages: this.chatMessages,
    };

    this.http.post<any>('http://localhost:8080/getChatCompletion', requestData/*{ messages: this.chatMessages }*/).subscribe((response) => {
      // Handle the response from your backend
      console.log(this.chatMessages)
      console.log(response);
      this.chatMessages.push({role: "system", content: response.response })
      this.displayedChatMessages.push({role: "system", content: response.response })
      this.response=response.response;
    });
    this.userMessage = "";
  }
}
