import { render, screen } from "@testing-library/react";
import Columns from "./index";

const mockRegistrations = [
  { id: "1", employeeName: "John Doe", email: "john.doe@example.com", admissionDate: "2021-01-01", status: "REVIEW" },
  { id: "2", employeeName: "Jane Doe", email: "jane.doe@example.com", admissionDate: "2021-01-02", status: "APPROVED" },
  { id: "3", employeeName: "Jim Beam", email: "jim.beam@example.com", admissionDate: "2021-01-03", status: "REPROVED" },
];

describe("Columns", () => {
  it("should render columns with onStatusChange", () => {
    const handleStatusChange = jest.fn();
    render(<Columns registrations={mockRegistrations} onStatusChange={handleStatusChange} />);
    expect(handleStatusChange).toHaveBeenCalledTimes(0);
  });
});

