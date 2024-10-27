import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TextField from "./index";

describe("TextField", () => {
  // Setup userEvent
  const user = userEvent.setup();

  it("should render input with label", () => {
    render(
      <TextField 
        label="Username" 
        id="username" 
        placeholder="Enter username" 
      />
    );

    expect(screen.getByLabelText("Username"))
  });

  it("should render input with error", () => {
    render(<TextField error="Error message" />);
    expect(screen.getByText("Error message"))
  });
 
  

});