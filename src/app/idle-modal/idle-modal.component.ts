import { Component, Inject, OnInit } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core'
import { TimeOut } from '../models/timeout.model'

@Component({
  selector: 'app-idle-modal',
  templateUrl: './idle-modal.component.html',
  styleUrls: ['./idle-modal.component.css'],
})
export class IdleModalComponent implements OnInit {
  idleState = ''
  lastPing!: Date
  timedOut = false
  countdown!: number | null
  router: any
  childModal: any
  constructor(
    public dialogRef: MatDialogRef<IdleModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TimeOut,
  ) {}

  ngOnInit(): void {
    this.data.timeoutSubscription.subscribe((seconds: number) => {
      this.countdown = seconds
    }),
      this.data.idleEndSubscription.subscribe(() => {
        this.idleState = 'No longer idle.'
        this.countdown = null
        if (this.idleState === 'No longer idle.') {
          console.log('SHOULD BE CLOSING')
          this.dialogRef.close(this.idleState)
        }
      })
    console.log(this.data)
  }
}
