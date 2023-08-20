import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function ToggleButtons(props) {
  const [alignment, setAlignment] = React.useState("left");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
    >
      <ToggleButton value="left" aria-label="left aligned">
        {props.first}
      </ToggleButton>
      <ToggleButton value="center" aria-label="centered">
        {props.second}
      </ToggleButton>
      <ToggleButton value="right" aria-label="right aligned">
        {props.third}
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
