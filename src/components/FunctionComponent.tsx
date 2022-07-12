export interface Properties {
  name: string;
}

export default function FunctionComponent(props: Properties) {
  return <div>This is function component: {props.name}</div>;
}
