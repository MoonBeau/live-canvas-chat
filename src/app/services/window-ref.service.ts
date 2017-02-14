import { Injectable } from '@angular/core';

function _window(): any {
  // returns the native window object
  return window;
}

@Injectable()

export class WindowRef {

  get nativeWindow(): any {
    return _window();
  }

}
