import ClassComponent from "components/ClassComponent";
import EventfulComponent from "components/EventfulComponent";
import FormComponent from "components/FormComponent";
import FunctionComponent from "components/FunctionComponent";
import HookedComponent from "components/HookedComponent";
import ListComponent, {
  Item as ListComponentItem,
} from "components/ListComponent";
import ParentComponent from "components/ParentComponent";
import StatefulComponent from "components/StatefulComponent";

export default function app() {
  const listItems: ListComponentItem[] = [
    {
      id: "42fa0a77-2e6d-4b1f-9a79-082ed2c0af03",
      value: "Lorem ipsum dolor sit amet.",
    },
    {
      id: "222db3ac-694b-4a88-8780-38929d631acc",
      value: "Consectetur adipiscing elit.",
    },
  ];
  return (
    <div>
      <FunctionComponent name="foo" />
      <ClassComponent name="bar" />
      <ParentComponent name="plugh">
        <StatefulComponent name="baz" />
      </ParentComponent>
      <EventfulComponent name="qux" />
      <ListComponent name="corge" items={listItems} />
      <FormComponent name="grault" />
      <ParentComponent name="thud">
        <HookedComponent name="garply" />
      </ParentComponent>
    </div>
  );
}
