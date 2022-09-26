import { Component, OnInit, VERSION } from '@angular/core';
import { from, of, delay, throwError, concat, tap } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;

  private source = [
    of('0').pipe(delay(0)),
    of('1').pipe(delay(200)),
    of('2').pipe(delay(150)),
    throwError(() => new Error('error')),
    of('3').pipe(delay(120)),
    of('4').pipe(delay(200)),
  ];

  ngOnInit() {
    concat(...this.source)
      .pipe(
        tap({
          next: (v) => console.log(v),
          error: (e) => console.error(e),
          complete: () => console.log(`complete`),
        })
      )
      .subscribe();
  }
}
