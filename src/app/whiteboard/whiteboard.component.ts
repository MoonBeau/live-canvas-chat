import { Component, ViewChild, AfterViewInit, ElementRef, OnDestroy, HostListener } from '@angular/core';
import { WhiteboardService } from '../services/whiteboard.service';



@Component({
  selector: 'whiteboard',
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.css']
})
export class WhiteboardComponent implements AfterViewInit, OnDestroy {
isDrawing: boolean;
ctx: CanvasRenderingContext2D;
// ctx.fillStyle = '#ff5555';
// ctx.fillRect(0, 0, ctx.width, ctx.height);
// myCanvas.width:  number = win.innerWidth - 60;
// myCanvas.height: number = win.innerHeight * 0.6;
restore = new Array();
resloc = -1;
strokeColor = '#282a36';
strokeWidth: number;
innerWidth: number;
innerHeight: number;
data;
connection: any;
fill;
noStroke;
ellipse;



@ViewChild('myCanvas') myCanvas: ElementRef;

    constructor(private _whiteboardService: WhiteboardService) {
    }
// @HostListener('window:resize', ['$event'])
    // onResize(e) {
    // this.width = window.innerWidth - 60;
    // this.height = window.innerHeight * 0.6;
    // this.render();

// }
@HostListener('touchstart', ['$event']) touchStart(e) {
  // this.isDrawing = false;
  this.start(e);
}
@HostListener('touchmove', ['$event']) touchMove(e) {
  // this.isDrawing = false;
  this.draw(e);
}
@HostListener('touchend', ['$event']) touchEnd(e) {
  // this.isDrawing = false;
  this.stop(e);
}
@HostListener('mousedown', ['$event']) mouseDown(e) {
  // this.isDrawing = false;
  this.start(e);
}
@HostListener('mousemove', ['$event']) mouseMove(e) {
  // this.isDrawing = false;
  this.draw(e);
}
@HostListener('mouseup', ['$event']) mouseUp(e) {
  // this.isDrawing = false;
  this.stop(e);
}
@HostListener('mouseout', ['$event']) mouseOut(e) {
  // this.isDrawing = false;
  this.stop(e);
}
    ngAfterViewInit() {
      this.connection = this._whiteboardService.getDrawings()
      .subscribe(
        data => {
          this.reDraw(data);

        }
      );
       this.ctx = this.myCanvas.nativeElement.getContext('2d');
      // console.log('Window Object', this.winRef.nativeWindow);
      this.brush();
}

        brush() {
          this.ctx.strokeStyle = this.strokeColor;
          this.ctx.lineWidth = this.strokeWidth;
          this.ctx.lineCap = 'round';
          this.ctx.lineJoin = 'round';
        }

        start(e) {
          this.isDrawing = true;
          this.ctx.beginPath();
          this.ctx.moveTo(this.getX(e), this.getY(e));
          e.preventDefault();
          console.log('Starting');
        }

        draw(e) {
          if (this.isDrawing === true) {
          this.ctx.lineTo(this.getX(e), this.getY(e));
          this.brush();
          this.ctx.stroke();
          this.sendDrawings(e.x, e.y);
          console.log('Youre Drawing');
          }
          e.preventDefault();
        }

        stop(e) {
          if (this.isDrawing === true) {
          this.ctx.stroke();
          this.ctx.closePath();
          this.isDrawing = false;
          }
          e.preventDefault();
          // this.restore.push(this.ctx.getImageData(0, 0, this.myCanvas.width, this.myCanvas.height));
          // this.resloc += 1;
          console.log('Stopped');
        }

        getX(e) {
          if (e.pageX === undefined) {
            return e.targetTouches[0].pageX - e.target.offsetLeft;
          }else {
            return e.pageX - e.target.offsetLeft;
          }
        }

        getY(e) {
        if (e.pageY === undefined) {
          return e.targetTouches[0].pageY - e.target.offsetTop;
        }else {
          return e.pageY - e.target.offsetTop;
        }
      }
      sendDrawings(xpos, ypos) {
        let data = {
          x: xpos,
          y: ypos
        };
        console.log(data);
        this._whiteboardService.sendDrawings(data);
      }

      reDraw(d) {
        this.ctx.beginPath();
        this.ctx.moveTo(d.x, d.y);
        this.ctx.lineTo(d.x, d.y);
        this.brush();
        this.ctx.stroke();
        this.ctx.stroke();
        this.ctx.closePath();
      }

      //  Restore() {
      //    if (this.resloc <= 0) {
      //      this.Clear();
      // } else {
      //      this.resloc += -1;
      //      this.restore.pop();
      //      this.ctx.putImageData(this.restore[this.resloc], 0, 0);
      //    }
      //  }
      //
      //  Save(a) {
      // let img = this.myCanvas.toDataURL('image/png');
      //    a.href = img;
      //  }
      //
      //  Clear() {
      //    let confirmClear = confirm('Are you sure you would like to clear your canvas? This cannot be undone.');
      // if (confirmClear === true) {
      //      this.ctx.fillStyle = '#fff';
      //      this.ctx.clearRect(0, 0, this.myCanvas.width, this.myCanvas.height);
      //      this.ctx.fillRect(0, 0, this.myCanvas.width, this.myCanvas.height);
      //      this.restore = new Array();
      //      this.resloc = -1;
      //    } else {}
      // }

    // ngAfterViewChecked() {
        // render(){
        //
        // }
    // }
 ngOnDestroy() {
   this.connection.unsubscribe();
 }

}
