import React from "react";

export interface Properties {
  name: string;
}

export interface State {
  onOff: boolean;
  counter: number;
}

export default class EventfulComponent extends React.Component<
  Properties,
  State
> {
  constructor(props: Properties) {
    super(props);

    this.state = {
      onOff: false,
      counter: 0,
    };
  }

  override render() {
    const onOff = this.state.onOff ? "on" : "off";
    return (
      <div>
        This is eventful component: {this.props.name}: {this.state.counter}:{" "}
        {
          // do not forget to `bind(this)`, lambda here may be more problematic:
          //   if lambda gets passed to grandchildren having new one each time around
          //   will promote potentially needless re-rendering
          //
          // the event handler can and *SHOULD* be `private`
        }
        <button onClick={this.handleOnOffClick.bind(this)}>{onOff}</button>
        {/* multiple elements using the same handler with different arguments bound to it */}
        <button
          onClick={
            /* eslint-disable-next-line no-magic-numbers */
            this.handleCounterClick.bind(this, +1)
          }
        >
          +1
        </button>
        <button
          onClick={
            /* eslint-disable-next-line no-magic-numbers */
            this.handleCounterClick.bind(this, -1)
          }
        >
          -1
        </button>
        {/*  */}
        <button onClick={this.handleEventClick.bind(this)}>LOG</button>
      </div>
    );
  }

  private handleOnOffClick() {
    this.setState((prevState) => ({ onOff: !prevState.onOff }));
  }

  private handleCounterClick(increment: number) {
    this.setState((prevState) => ({ counter: prevState.counter + increment }));
  }

  private handleEventClick(event: React.MouseEvent) {
    console.log(
      "[%d,%d]~[%d,%d]: buttons=%d ctrl=%d alt=%d meta=%d shift=%d",
      event.screenX,
      event.screenY,
      event.clientX,
      event.clientY,
      event.buttons,
      event.ctrlKey,
      event.altKey,
      event.metaKey,
      event.shiftKey,
    );
  }
}
