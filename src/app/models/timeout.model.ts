export class Timeout {
  constructor(
    public title: string,
    public timedOut: boolean = false,
    public firstPing: number,
  ) {}
}
