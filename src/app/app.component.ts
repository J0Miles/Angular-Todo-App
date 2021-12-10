import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core'
import { Keepalive } from '@ng-idle/keepalive'
import { Subscription } from 'rxjs'
import { IdleModalComponent } from './idle-modal/idle-modal.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-todo-app'
  idleState = 'Not started.'
  timeoutMsg = ''
  countdown?: number | null
  timedOut = false
  lastPing!: Date
  router: any
  childModal: any

  constructor(
    private idle: Idle,
    private keepalive: Keepalive,
    private dialog: MatDialog,
  ) {
    idle.setIdle(10)
    idle.setTimeout(60)
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES)

    idle.onIdleEnd.subscribe(() => {
      // this.idleState = 'No longer idle.'
      // this.countdown = null
      // console.log(this.idleState)
      this.reset()
    })

    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!'
      this.timedOut = true
      console.log(this.idleState)
      this.router?.navigate(['reset'])
    })

    // idle.onTimeoutWarning.subscribe((countdown) => {
    //   this.timeoutMsg = 'You will time out in ' + countdown + ' seconds!'
    //   this.countdown = countdown
    //   console.log(this.timeoutMsg)
    // })

    idle.onIdleStart.subscribe(() => {
      this.idleState = "You've gone idle!"
      idle.onTimeoutWarning.subscribe((seconds) => {
        this.idleState = 'You will time out in ' + seconds + ' seconds!'
        this.countdown = seconds
      })

      let dialogRef = this.dialog.open(IdleModalComponent, {
        width: '700px',
        data: {
          title: 'Timed Out!',
          timedOut: true,
          idleState: this.idleState,
          timeoutSubscription: idle.onTimeoutWarning,
          idleEndSubscription: idle.onIdleEnd,
          newIdleInterupts: idle,
        },
      })

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          console.log(result)
          this.idleState = result
          this.reset()
        }
      })

      this.childModal?.show()
    })

    keepalive.interval(15)
    this.lastPing = new Date()

    keepalive.onPing.subscribe(this.lastPing)
    console.log(this.lastPing)

    this.reset()
  }

  reset() {
    this.idle.watch()
    this.idleState = 'Started.'
    this.timedOut = false
  }

  ngOnInit(): void {
    // right when the component initializes, start reset state and start watching
    this.reset()
  }
}
