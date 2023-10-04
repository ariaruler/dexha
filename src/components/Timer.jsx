import * as React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function Timer(props) {
    const initialized = useRef(false)

    const [time, setTime] = useState(1200);

    useEffect(() => {

        if (!initialized.current) {
            initialized.current = true
      let timer = setInterval(() => {
        setTime((time) => {
          if (time === 0) {
            clearInterval(timer);
            props.setTimeOut(true);
            props.getStatus();
            props.setStatusFa('پایان زمان تبادل');
            return 0;
          } else return time - 1;
        });
      }, 1000);
    }
    }, []);

  return (
    <>
      {`${Math.floor(time / 60)}`.padStart(2, 0)}:
      {`${time % 60}`.padStart(2, 0)}
    </>
  );
}
