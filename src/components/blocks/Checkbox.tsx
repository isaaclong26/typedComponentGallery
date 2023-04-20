import React from "react";
import { Form } from "react-bootstrap";
import { CheckboxProps } from "../..";


export const Checkbox: React.FC<CheckboxProps> = ({ label, state, setState }) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.checked);
  };

  return (
    <Form.Group>
      <Form.Check
        type="checkbox"
        label={label}
        checked={state}
        onChange={handleCheckboxChange}
      />
    </Form.Group>
  );
};

