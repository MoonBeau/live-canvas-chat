import { Component, OnInit, OnDestroy } from '@angular/core';

import { SocketService } from '../services/socket.service';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  messages: any = [];
  message: string;
  connection: any;
  username: string;
  alert: any = false;

  constructor(
    private _socketService: SocketService
  ) { }


  ngOnInit() {
    this.connection = this._socketService.getMessages()
    .subscribe(
      message => {
        console.log(message);
        this.messages.push(message);
      }
    );
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

  sendMessage() {
    this._socketService.sendMessage(this.message, this.username);
    this.message = '';
  }

  setUsername() {
    this._socketService.setUsername(this.username);
    this.alert = 'Username is set';
  }

}
