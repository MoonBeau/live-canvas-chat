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

import { ChatService } from './services/chat.service';
import { WindowRef } from './services/window-ref.service';
import { WhiteboardService } from './services/whiteboard.service';

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
  providers: [ChatService, WindowRef, WhiteboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
