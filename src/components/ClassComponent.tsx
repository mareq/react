import React from "react";

export interface Properties {
  name: string;
}

export default class ClassComponent extends React.Component<Properties> {
  override render() {
    // "template variable" antipattern:
    // - `this.props` is defined by `React.Component`
    // - this is apparently the recommended canonical way of accessing properties :(
    return <div>This is class component: {this.props.name}</div>;
  }
}
