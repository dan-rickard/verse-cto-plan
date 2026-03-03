import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ctoPlanContent } from "@/data/ctoPlanContent";
import { InteractivePlan } from "./InteractivePlan";

describe("InteractivePlan", () => {
  it("renders the updated flow with 4 metrics and no risks/asks section", () => {
    render(<InteractivePlan content={ctoPlanContent} />);

    expect(
      screen.getByRole("heading", { level: 1, name: /90-day cto plan - verse wealth/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByTestId("metric-card")).toHaveLength(4);
    expect(screen.getAllByTestId("outcome-item")).toHaveLength(3);

    expect(screen.getByRole("heading", { level: 2, name: /30\/60\/90 timeline/i })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: /early wins \(first 2-3 weeks\)/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /scoreboard/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /operating cadence/i })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 2, name: /risks and asks/i })).not.toBeInTheDocument();
  });

  it("filters timeline phases and expands inline details", async () => {
    const user = userEvent.setup();
    render(<InteractivePlan content={ctoPlanContent} />);

    await user.click(screen.getByRole("tab", { name: /days 31-60/i }));

    expect(
      screen.getByText(/the new way is live for one team on one journey/i),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /drill into timeline details/i }));

    expect(screen.getByText(/field validation rules/i)).toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("filters quick wins and expands inline details", async () => {
    const user = userEvent.setup();
    render(<InteractivePlan content={ctoPlanContent} />);

    await user.click(screen.getByRole("tab", { name: /meeting to file note \(ai-assisted\)/i }));

    expect(
      screen.getByText(/meeting recordings produce structured file notes, actions, and tasks/i),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /drill into quick-win details/i }));

    expect(screen.getByText(/copilot or equivalent with explicit human approval/i)).toBeInTheDocument();
  });
});
