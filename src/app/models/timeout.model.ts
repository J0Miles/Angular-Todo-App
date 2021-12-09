import { Idle } from '@ng-idle/core'

export class TimeOut {
  constructor(
    public idleState: string,
    public timedOut: boolean,
    public title: string,
    public idle: Idle,
    public countdown: number,
    public timeoutSubscription: any,
    public idleEndSubscription: any,
  ) {}
}
