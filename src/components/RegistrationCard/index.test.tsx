import RegistrationCard from "./index";
import { render, screen } from "@testing-library/react";

const mockRegistration = {
  id: "1",
  employeeName: "John Doe",
  email: "john.doe@example.com",
  admissionDate: "2021-01-01",
  status: "REVIEW"
};

describe("RegistrationCard", () => {
  it("should render registration card data values", () => {
    render(<RegistrationCard data={mockRegistration} />);
    expect(screen.getByText("John Doe"))
    expect(screen.getByText("john.doe@example.com"))
  });
});