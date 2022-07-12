import React from "react";

export interface Properties {
  name: string;
}

export interface State {
  date: Date;
}

export default class StatefulComponent extends React.Component<
  Properties,
  State
> {
  constructor(props: Properties) {
    console.log("StatefulComponent: constructor", JSON.stringify(props));
    super(props);

    // "template variable" antipattern:
    // - `this.state` is defined by `React.Component`
    // - it is not possible to use `this.setState(state)` function here (React blows up)
    // - this is apparently the recommended canonical way of initializing the state :(
    this.state = { date: new Date() };
  }

  override render() {
    console.log("StatefulComponent: render: this._timerID=%d", this._timerID);
    // "template variable" antipattern:
    // - `this.state` ought to be `private` in the parent, but it is not
    // - this is apparently the recommended canonical way of accessing the state in `render()`
    const dateString = this.state.date.toLocaleString();
    return (
      <div>
        This is stateful component: {this.props.name}: {dateString}
      </div>
    );
  }

  override componentDidMount() {
    console.log("StatefulComponent: componentDidMount");
    const TICK_MS = 1000;
    this._timerID = window.setInterval(
      // javascript does not bind class methods by default: `this` would be `undefined` inside `this.tick()` without `bind(this)`
      this.tick.bind(this),
      // ..or just use lambda to dodge the whole thing:
      // (do note that new lambda is created every time this function is called - that is hardly a problem here, but be aware)
      //() => this.tick(),
      // ..see here for more details: https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/
      TICK_MS,
    );
    console.log("StatefulComponent: setInterval() -> %d", this._timerID);
  }

  override componentWillUnmount() {
    console.log("StatefulComponent: componentWillUnmount");
    if (this._timerID) {
      console.log("StatefulComponent: clearInterval(%d)", this._timerID);
      window.clearInterval(this._timerID);
    }
  }

  private tick() {
    console.log("StatefulComponent: tick: timer_id=%d", this._timerID);
    // *MUST* use `this.setState(state)` outside of constructor in order for the component to properly re-`render()`:
    // - yes, `this.state` ought to be `private` in the parent anyway, which would force exactly that
    this.setState({ date: new Date() });
  }

  private _timerID: null | number = null;
}
