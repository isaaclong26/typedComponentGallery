import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { Theme, useEloise } from "../..";

interface DateSelectorProps {
  state: Date | null;
  setState: (date: Date | null) => void;
}

const StyledDatePicker = styled(DatePicker)<{ theme: Theme }>`
  & > .date-selector {
    font-family: ${(props) => props.theme.font};
    border-radius: 4px;
  }

  & > .react-datepicker__input-container {
    border: ${(props) => props.theme.colors[0]} !important;
  }

  & > .react-datepicker__day--selected {
    border-color: ${(props) => props.theme.colors[0]};
  }
`;

const DateSelector: React.FC<DateSelectorProps> = ({ state, setState }) => {
  const handleDateChange = (date: Date | null) => {
    setState(date);
  };
  const { theme } = useEloise();

  return (
    <div className="date-selector">
      <StyledDatePicker
        theme={theme}
        selected={state}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        isClearable
        showPopperArrow={false}
        placeholderText="Select or type a date"
      />
    </div>
  );
};

export default DateSelector;
