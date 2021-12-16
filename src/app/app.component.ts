import { Component, NgZone, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { environment } from 'src/environments/environment'
import { IdleTimerComponent } from './idle-timer/idle-timer.component'
import { IdleService } from './idle.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-todo-app'
  firstPing!: number

  constructor(
    private router: Router,
    private idleService: IdleService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.initialIdleSettings()
    this.firstPing = new Date().getTime()
    // let second: number | string = this.firstPing.getSeconds()
    // let minute: number | string = this.firstPing.getMinutes()
    // let hour: number | string = this.firstPing.getHours()

    console.log(this.firstPing)
  }

  private initialIdleSettings() {
    console.log('Initializing Idle Timer')
    const idleTimeoutInSeconds: number = environment.idleTimeInMinutes * 60
    console.log(idleTimeoutInSeconds)
    this.idleService
      .startWatching(idleTimeoutInSeconds)
      .subscribe((isTimeOut: boolean) => {
        if (isTimeOut) {
          let dialogRef = this.dialog.open(IdleTimerComponent, {
            width: '700px',
            data: {
              title: "You've gone idle!",
              timedOut: false,
              firstPing: this.firstPing,
            },
          })
        }
      })
  }
}
