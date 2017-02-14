import { Component, ViewChild, AfterViewInit, ElementRef, Renderer, OnDestroy, HostListener } from '@angular/core';

@Component({
  selector: 'whiteboard',
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.css']
})
export class WhiteboardComponent implements AfterViewInit {
isDrawing: boolean;
ctx: CanvasRenderingContext2D;
width: number;
height: number;
restore = new Array();
resloc = -1;
strokeColor: string;
strokeWidth = '2';


@ViewChild('myCanvas') myCanvas;

    constructor(private elementRef: ElementRef, private renderer: Renderer) {


    }

@HostListener('touchstart', ['$event']) touchStart(e) {
  this.start(e);
}
@HostListener('touchmove', ['$event']) touchMove(e) {
  this.draw(e);
}
@HostListener('touchend', ['$event']) touchEnd(e) {
  this.stop(e);
}
@HostListener('mousedown', ['$event']) mouseDown(e) {
  this.start(e);
}
@HostListener('mousemove', ['$event']) mouseMove(e) {
  this.draw(e);
}
@HostListener('mouseup', ['$event']) mouseUp(e) {
  this.stop(e);
}
@HostListener('mouseout', ['$event']) mouseOut(e) {
  this.stop(e);
}
    ngAfterViewInit() {
      this.ctx = this.myCanvas.nativeElement.getContext('2d');


}

        start(e) {
          this.isDrawing = true;
          this.ctx.beginPath();
          this.ctx.moveTo(this.getX(e), this.getY(e));
          e.preventDefault();
          console.log('Starting');
        }

        draw(e) {
          if (this.isDrawing) {
          this.ctx.lineTo(this.getX(e), this.getY(e));
          this.ctx.strokeStyle = this.strokeColor;
          this.ctx.lineWidth = this.strokeWidth;
          this.ctx.lineCap = "round";
          this.ctx.lineJoin = "round";
          this.ctx.stroke();
          }
          e.preventDefault();
          console.log('Im drawing in the bitch!');
        }

        stop(e) {
          if (this.isDrawing) {
          this.ctx.stroke();
          this.ctx.closePath();
          this.isDrawing = false;
          }
          e.preventDefault();
          this.restore.push(this.ctx.getImageData(0, 0, this.myCanvas.width, this.myCanvas.height));
          this.resloc += 1;
          console.log('Stopped');
        }

        getX(e) {
          if (e.pageX === undefined) {
            return e.targetTouches[0].pageX - this.myCanvas.offsetLeft;
          }else {
            return e.pageX - this.myCanvas.offsetLeft;
          }
        }

        getY(e) {
        if (e.pageY === undefined) {
          return e.targetTouches[0].pageY - this.myCanvas.offsetTop;
        }else {
          return e.pageY - this.myCanvas.offsetTop;
        }
      }



       Restore() {
         if (this.resloc <= 0) {
           this.Clear();
      } else {
           this.resloc += -1;
           this.restore.pop();
           this.ctx.putImageData(this.restore[this.resloc], 0, 0);
         }
       }

       Save(a) {
      let img = this.myCanvas.toDataURL('image/png');
         a.href = img;
       }

       Clear() {
         let confirmClear = confirm('Are you sure you would like to clear your canvas? This cannot be undone.');
      if (confirmClear === true) {
           this.ctx.fillStyle = '#fff';
           this.ctx.clearRect(0, 0, this.myCanvas.width, this.myCanvas.height);
           this.ctx.fillRect(0, 0, this.myCanvas.width, this.myCanvas.height);
           this.restore = new Array();
           this.resloc = -1;
         } else {}
      }


 ngOnDestroy() {
   
 }

}
