import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { WhiteboardComponent } from './whiteboard/whiteboard.component';
import { ChatComponent } from './chat/chat.component';
import { GalleryComponent } from './gallery/gallery.component';

import { SocketService } from './services/socket.service';


@NgModule({
  declarations: [
    AppComponent,
    WhiteboardComponent,
    ChatComponent,
    GalleryComponent
  ],
  imports: [
    MaterialModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
    {
      path: 'chat',
      component: ChatComponent
    },
    {
      path: 'whiteboard',
      component: WhiteboardComponent
    },
    {
      path: 'gallery',
      component: GalleryComponent
    }
    ])
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
