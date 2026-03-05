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

    expect(screen.getByRole("heading", { level: 2, name: /90-day operating path/i })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: /daily-friction removers \(first 30 days\)/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /proof board/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /operating rhythm/i })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 2, name: /risks and asks/i })).not.toBeInTheDocument();
  });

  it("filters timeline phases and expands inline details", async () => {
    const user = userEvent.setup();
    render(<InteractivePlan content={ctoPlanContent} />);

    await user.click(screen.getByRole("tab", { name: /days 31-60/i }));

    expect(
      screen.getByText(/the new path is easier than old workarounds/i),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /drill into timeline details/i }));

    expect(screen.getByText(/revenue object mapping/i)).toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("filters quick wins and expands inline details", async () => {
    const user = userEvent.setup();
    render(<InteractivePlan content={ctoPlanContent} />);

    await user.click(screen.getByRole("tab", { name: /meeting -> file note \+ actions/i }));

    expect(
      screen.getAllByText(/meeting summaries generate structured file-note drafts and action lists/i).length,
    ).toBeGreaterThan(0);

    await user.click(screen.getByRole("button", { name: /drill into quick-win details/i }));

    expect(screen.getByText(/human-in-loop summary template/i)).toBeInTheDocument();
  });

  it("opens the CTO watchlist and returns to the plan view", async () => {
    const user = userEvent.setup();
    render(<InteractivePlan content={ctoPlanContent} />);

    await user.click(screen.getByRole("button", { name: /cto watchlist/i }));

    expect(screen.getByRole("heading", { level: 2, name: /cto watchlist/i })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: /90 day plan - watch list/i }),
    ).toBeInTheDocument();

    await user.click(screen.getAllByRole("button", { name: /back to 90-day plan/i })[0]);

    expect(
      screen.queryByRole("heading", { level: 3, name: /90 day plan - watch list/i }),
    ).not.toBeInTheDocument();
  });
});
