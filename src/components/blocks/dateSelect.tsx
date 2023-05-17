import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Input } from "../..";

interface DateSelectorProps {
  state: Date | null;
  setState: (date: Date | null) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ state, setState }) => {
  const handleDateChange = (date: Date | null) => {
    setState(date);
  };

  return (
    <div className="date-selector">
      <DatePicker
        selected={state}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        isClearable
        showPopperArrow={false}
        placeholderText="Select or type a date"
        customInput={<Input  state={state} setState={setState} label="Select or type a date>" />}
      />
    </div>
  );
};

export default DateSelector;
