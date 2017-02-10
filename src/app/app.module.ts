import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WhiteboardComponent } from './whiteboard/whiteboard.component';
import { ChatComponent } from './chat/chat.component';
import { GalleryComponent } from './gallery/gallery.component';

import { ChatService } from './services/chat.service';

@NgModule({
  declarations: [
    AppComponent,
    WhiteboardComponent,
    ChatComponent,
    GalleryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
      path: 'chat',
      component: ChatComponent
      }
    ])
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
