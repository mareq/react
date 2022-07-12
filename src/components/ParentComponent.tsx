import React, { useState } from "react";

export interface Properties {
  name: string;
  children: JSX.Element;
}

export default function ParentComponent(props: Properties) {
  const [enabled, setEnabled] = useState(true);

  const children = enabled
    ? props.children
    : "Nothing but the wind howling through the rocks";

  const handleCheckBoxOnChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEnabled(event.target.checked);
  };

  return (
    <div>
      This is hooked component: {props.name}:
      <div>
        <input
          type="checkbox"
          defaultChecked={enabled}
          onChange={handleCheckBoxOnChange}
        />
        <label>enable children</label>
      </div>
      <div>{children}</div>
    </div>
  );
}
