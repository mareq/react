import React from "react";

export interface Item {
  id: string;
  value: string;
}

interface ListItemProperties {
  value: string;
}

function ListItem(props: ListItemProperties) {
  // no key here - it would not make sense
  return <li>{props.value}</li>;
}

export interface Properties {
  name: string;
  items: Item[];
}

export default class ListComponent extends React.Component<Properties> {
  override render() {
    return (
      <div>
        This is list component: {this.props.name}:
        <ul>
          {this.props.items.map((item) => (
            // key *SHOULD* be present here and only here regardless of using `<li>`
            // directly or indirectly by means of a  custom component
            //
            // keys *MUST* be *locally* unique (i.e. within this list, no need for global uniqueness)
            //
            // see also: https://reactjs.org/docs/reconciliation.html#recursing-on-children
            //<li key={item.id}>{item.value}</li>
            <ListItem key={item.id} value={item.value.toString()} />
          ))}
        </ul>
      </div>
    );
  }
}
