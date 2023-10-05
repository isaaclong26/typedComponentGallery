import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { useEloise } from "../../App";
import { Color } from "../../functions/color";

export interface dropdownProps {
  options: string[];
  label?: string;
  onChange?: any;
  width?: string | number;
  className?: string;
  margin?: string;
  inverse?: boolean;
  extLabel?: boolean;
  color?: number | Color; // Defines the color of the button
  externalLabel?: boolean;
  whiteLabel?: boolean;
  posClassName?: string;
  onParent?: any;
  state?: any;
  value?: any;
  setState: React.Dispatch<React.SetStateAction<any>>;
  locked?: boolean;
  warning?: boolean;
  warningMessage?: string;
}

const DropDown = (props: dropdownProps) => {
  const { theme, logic } = useEloise();
  const [showWarningModal, setShowWarningModal] = useState(false);

  const handleCloseModal = () => setShowWarningModal(false);

  const handleSelect = (option: string) => {
    if (props.warning) {
      setShowWarningModal(true);
    } else {
      props.setState(option);
    }
  };

  const displayText = useMemo(() => {
    if (props.state && props.options.includes(props.state)) {
      return props.state;
    } else if (props.label) {
      return props.label;
    } else {
      return "Select One";
    }
  }, [props.state, props.options, props.label]);

  const [maxHeight, setMaxHeight] = useState("400px");

  const dropdownRef = useRef<any>();

  useLayoutEffect(() => {
    const calculateMaxHeight = () => {
      if (dropdownRef.current) {
        const rect = dropdownRef.current.getBoundingClientRect();
        const availableSpace = window.innerHeight - rect.top;
        setMaxHeight(`${availableSpace}px`);
      }
    };

    calculateMaxHeight();
    window.addEventListener("resize", calculateMaxHeight);

    return () => {
      window.removeEventListener("resize", calculateMaxHeight);
    };
  }, []);

  return (
    <>
      <Dropdown
        className={props.posClassName}
        style={{ padding: props.margin ? props.margin : " 0" }}
        onChange={props.onChange}>
        <Dropdown.Toggle
          style={{
            margin: "auto",
            width: props.width ? props.width : "100%",
            backgroundColor: props.color
              ? typeof props.color === "number"
                ? theme.colors[props.color]
                : props.color
              : theme.colors[0],
            color: "black",
          }}
          variant="success"
          id="dropdown-basic">
          {displayText}
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ maxHeight: maxHeight, overflowY: "scroll" }}>
          {props.options.map((option) => (
            <Dropdown.Item
              active={props.value == option ? true : false}
              key={option}
              onClick={() => {
                handleSelect(option);
              }}>
              {option}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      {/* Warning Modal */}
      <Modal
        show={showWarningModal}
        onHide={handleCloseModal}
        centered>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.warningMessage}</Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-primary"
            onClick={handleCloseModal}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export { DropDown };
