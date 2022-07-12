// see: https://stackoverflow.com/a/53090848/5292184
import { useEffect, useState } from "react";

export interface Properties {
  name: string;
}

export default function HookedComponent(props: Properties) {
  const [date, setDate] = useState<Date>(new Date());
  console.log("HookedComponent: date=%s", date.toLocaleString());

  // the callable passed as the argument is called asynchronously
  //
  // react guarantees the DOM has been updated by the time it runs the effects
  useEffect(
    () => {
      const TICK_MS = 1000;
      const timerId = window.setInterval(() => {
        console.log("HookedComponent: tick: timerId=%d", timerId);
        setDate(new Date());
      }, TICK_MS);
      console.log("HookedComponent: setInterval() -> %d", timerId);

      return () => {
        console.log("HookedComponent: clearInterval(timerId=%d)", timerId);
        window.clearInterval(timerId);
      };
    },
    // the default behaviour is to call the clean-up function each time around
    //
    // this would cause the timer to be constantly torn down and re-created
    // in order to prevent that, empty array is passed in as the second
    // (optional) argument, which results in calling the effect only
    // at `componentDidMount` and the corresponding clean-up function
    // at `componentWillUnmount`
    //
    // note that there are pitfalls easy to fall into here: the rule of thumb is that
    // this array, if passed in, *SHOULD* contain all the values the effect depends on
    [],
  );

  const dateString = date.toLocaleString();
  return (
    <div>
      This is hooked component: {props.name}: {dateString}
    </div>
  );
}
