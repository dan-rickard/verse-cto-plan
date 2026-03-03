import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ctoPlanContent } from "@/data/ctoPlanContent";
import { InteractivePlan } from "./InteractivePlan";

describe("InteractivePlan", () => {
  it("renders all required sections with 7 metrics and 3 outcomes", () => {
    render(<InteractivePlan content={ctoPlanContent} />);

    expect(
      screen.getByRole("heading", { level: 1, name: /90-day cto plan - verse wealth/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByTestId("metric-card")).toHaveLength(7);
    expect(screen.getAllByTestId("outcome-item")).toHaveLength(3);

    expect(screen.getByRole("heading", { level: 2, name: /scoreboard/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /30\/60\/90 timeline/i })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: /early wins \(first 2-3 weeks\)/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /risks and asks/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /operating cadence/i })).toBeInTheDocument();
  });

  it("opens and closes drill-down via Escape", async () => {
    const user = userEvent.setup();
    render(<InteractivePlan content={ctoPlanContent} />);

    const trigger = screen.getByRole("button", {
      name: /view details for days 1-30: protect delivery \+ map truth/i,
    });

    await user.click(trigger);

    const dialog = screen.getByRole("dialog", { name: /days 1-30: protect delivery \+ map truth/i });
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getAllByText(/source-of-truth map/i).length).toBeGreaterThan(0);

    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("returns focus to the trigger when the drawer closes", async () => {
    const user = userEvent.setup();
    render(<InteractivePlan content={ctoPlanContent} />);

    const trigger = screen.getByRole("button", {
      name: /view details for revenue exceptions queue/i,
    });

    await user.click(trigger);

    const closeButton = screen.getByRole("button", { name: /close details panel/i });
    await user.click(closeButton);

    await waitFor(() => {
      expect(trigger).toHaveFocus();
    });
  });
});
