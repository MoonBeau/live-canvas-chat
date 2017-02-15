import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import * as io from 'socket.io-client';

export class WhiteboardService {
    private url: string = 'http://localhost:8000';
    private socket: any;


    sendDrawings(data: any) {
      this.socket.emit('mouseClick', data);
    }

    getDrawings() {
      let observable = new Observable((observer: any) => {
        this.socket = io(this.url);
        this.socket.on('mouseClick', (data: any) => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      })
      return observable;
    }


}
