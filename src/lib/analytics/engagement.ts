/** Foreground-time accumulator with an explicit protected-content activation boundary. */
export class VisibleTime {
  private since: number | null;
  constructor(
    now: number,
    visible: boolean,
    private active: boolean,
  ) {
    this.since = visible ? now : null;
  }
  checkpoint(now: number, visible: boolean) {
    const seconds =
      this.active && this.since !== null
        ? Math.max(0, (now - this.since) / 1000)
        : 0;
    this.since = visible ? now : null;
    return seconds;
  }
  activate(now: number, visible: boolean) {
    this.active = true;
    this.since = visible ? now : null;
  }
  reset(now: number, visible: boolean) {
    this.since = visible ? now : null;
  }
}
