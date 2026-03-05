import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { ctoPlanContent } from "@/data/ctoPlanContent";
import { InteractivePlan } from "./InteractivePlan";

describe("InteractivePlan", () => {
  beforeEach(() => {
    window.history.replaceState(null, "", "/");
  });

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

  it("supports keyboard navigation across timeline tabs", async () => {
    const user = userEvent.setup();
    render(<InteractivePlan content={ctoPlanContent} />);

    const firstTab = screen.getByRole("tab", { name: /days 1-30/i });
    firstTab.focus();
    expect(firstTab).toHaveFocus();

    await user.keyboard("{ArrowRight}");

    const secondTab = screen.getByRole("tab", { name: /days 31-60/i });
    expect(secondTab).toHaveFocus();
    expect(secondTab).toHaveAttribute("aria-selected", "true");
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

  it("syncs timeline and quick-win state into URL params", async () => {
    const user = userEvent.setup();
    render(<InteractivePlan content={ctoPlanContent} />);

    await user.click(screen.getByRole("tab", { name: /days 31-60/i }));
    expect(window.location.search).toContain("phase=phase-60");

    await user.click(screen.getByRole("button", { name: /drill into timeline details/i }));
    expect(window.location.search).toContain("timelineDetails=1");

    await user.click(screen.getByRole("tab", { name: /meeting -> file note \+ actions/i }));
    expect(window.location.search).toContain("win=win-2");

    await user.click(screen.getByRole("button", { name: /drill into quick-win details/i }));
    expect(window.location.search).toContain("winDetails=1");
  });

  it("opens the CTO watchlist and returns to the plan view", async () => {
    const user = userEvent.setup();
    render(<InteractivePlan content={ctoPlanContent} />);

    await user.click(screen.getByRole("button", { name: /cto watchlist/i }));

    expect(await screen.findByRole("heading", { level: 2, name: /cto watchlist/i })).toBeInTheDocument();
    expect(
      await screen.findByRole("heading", { level: 3, name: /included in the 90-day plan/i }),
    ).toBeInTheDocument();

    await user.click(screen.getAllByRole("button", { name: /back to 90-day plan/i })[0]);

    expect(
      screen.queryByRole("heading", { level: 3, name: /included in the 90-day plan/i }),
    ).not.toBeInTheDocument();
  });

  it("traps focus in the watchlist dialog and closes on Escape", async () => {
    const user = userEvent.setup();
    render(<InteractivePlan content={ctoPlanContent} />);

    const trigger = screen.getByRole("button", { name: /cto watchlist/i });
    await user.click(trigger);

    const dialog = await screen.findByRole("dialog", { name: /cto watchlist/i });

    for (let i = 0; i < 8; i += 1) {
      await user.tab();
      expect(dialog).toContainElement(document.activeElement as HTMLElement);
    }

    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog", { name: /cto watchlist/i })).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
