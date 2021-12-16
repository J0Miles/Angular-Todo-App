import { Component, Inject, Input, OnInit } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Observable, Subscription, timer } from 'rxjs'
import { environment } from 'src/environments/environment'
import { Timeout } from '../models/timeout.model'

@Component({
  selector: 'app-idle-timer',
  templateUrl: './idle-timer.component.html',
  styleUrls: ['./idle-timer.component.css'],
})
export class IdleTimerComponent implements OnInit {
  countdown!: number
  startTimer!: Subscription
  public remainingTime!: string
  router: any
  constructor(
    public dialogRef: MatDialogRef<IdleTimerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Timeout,
  ) {}

  ngOnInit(): void {
    //timer(this.timeOutDelta, 1000).subscribe((n) => console.log('timer', n))
    let limit = environment.timeOut
    this.startTimer = timer(0, 1000).subscribe(
      (n) => (this.countdown = limit - n),
    )
    setTimeout(() => {
      this.router?.navigate([''])
      console.log('Unsubscribing')
      this.startTimer.unsubscribe()
    }, 1800000)
  }
}
