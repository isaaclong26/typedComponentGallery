# Input Component

The Input component is a styled and customizable input field that can be used for various purposes, such as gathering user input for forms or searching for data. It supports several optional properties to modify its appearance and behavior.

## Installation

To use this component, simply import it into your project and include it in your JSX code:

```jsx
import Input from "path/to/Input";
```

## Usage

Here's an example of how to use the Input component in your project:

```jsx
import React, { useState } from "react";
import Input from "path/to/Input";

function MyComponent() {
  const [username, setUsername] = useState("");

  return (
    <div>
      <Input
        label="Username"
        state={username}
        setState={setUsername}
        placeholder="Enter your username"
      />
    </div>
  );
}
```

## API Reference

### Props

| Name            | Type                                    | Default       | Description                                                                                              |
| --------------- | --------------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------- |
| label           | string                                  |               | The label to display above the input field.                                                              |
| onEnter         | function                                |               | Callback function to execute when the "Enter" key is pressed.                                           |
| extLabel        | boolean                                 | false         | Whether the label is outside of the input field or not.                                                  |
| border          | boolean                                 | true          | Whether the input field has a border or not.                                                             |
| state           | any \| undefined                        |               | The state value for the input field.                                                                     |
| setState        | React.Dispatch<React.SetStateAction<any>> |               | The function to set the state value for the input field.                                                 |
| placeholder     | string                                  |               | The placeholder text for the input field.                                                                |
| type            | string                                  |               | The type of input field (e.g., "text", "password", "email", etc.).                                      |
| locked          | boolean                                 | false         | Whether the input field is read-only or not.                                                             |
| warning         | boolean                                 | false         | Whether to display a warning modal when the user attempts to change the input field value.               |
| warningMessage  | string                                  |               | The warning message to display in the modal.                                                             |

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.