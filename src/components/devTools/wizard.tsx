import React from "react";
import { Stepper } from "@progress/kendo-react-layout";
const items = [
  { label: "Contact Parameters", icon: "License" },
  { label: "Time Zone", icon: "License" },
];
function Wizard() {
  const [value, setValue] = React.useState(0);

  const handleChange = (e: any) => {
    setValue(e.value);
  };
  return (
    <div>
      <Stepper value={value} onChange={handleChange} items={items} />
    </div>
  );
}

export default Wizard;
