# Repeating Tasks Specification

## Overview

Repeating tasks are tasks that recur on a defined cycle (daily, weekly, monthly, etc.). They form the foundation of "routines" in TaskTick and enable users to track habit adherence, recurring workflows, and ongoing responsibilities.

## Core Rules

### No Mixing Rule
**Repeating tasks cannot exist in the same list as non-repeating tasks.**

A task list is either:
- **A repeating list:** All child tasks are repeating. The list itself inherits the "repeating" state.
- **A non-repeating list:** All child tasks are one-time/discrete. The list completes when all tasks are done and stays done.

**Rationale:** This prevents ambiguous completion states and keeps the mental model clear for users.

## Repeating State Propagation

### Child-to-Parent Propagation
If ANY child list contains repeating tasks, the parent list inherits the "repeating" state.

This propagation continues up the entire hierarchy:
- A parent of a repeating child list is marked as repeating
- A parent of that parent is marked as repeating
- And so on, all the way to the root

### Visual Representation
A repeating list that has all current tasks completed shows:
- Checkmark or "complete" indicator
- **Clock/timer icon** to signal it's "complete for now" and will reset
- **Next cycle timestamp** showing when the next reset will occur (the soonest cycle among all repeating children)

Example: `✓ Daily Workout [🕐 Next: Tomorrow 6:00 AM]`

### State Transitions
- When all tasks in a repeating list are completed → "complete for now" (with clock icon)
- When the next cycle triggers (time-based) → all tasks reset to incomplete
- Parent automatically flips back to incomplete state

## Cycle Behavior

### Cycle Definition
A cycle is a time-based recurrence period.

### Phase 1 Defaults
Users can set repeating tasks to cycle on:
- **Daily:** Resets every day at a user-specified time (default: midnight in user's timezone)
- **Weekly:** Resets every week on a user-specified day and time (default: Monday at midnight)
- **Monthly:** Resets on a user-specified day of the month and time (default: 1st at midnight)

### Phase 2 & Beyond
- Custom frequencies (every 3 days, bi-weekly, etc.)
- Event-based triggers
- Conditional cycle logic

### Timezone Handling
All cycle times respect the user's local timezone. Cycles trigger at the specified local time regardless of where the user accesses the app from.

## Completion & History

### Completion History
Each repeating task maintains a log of when it was completed in each cycle.

**History is visible only on repeating task lists**, not on their non-repeating parents.

Users can expand/view the history to see:
- Dates completed
- Time spent (if tracked)
- Streaks and patterns
- Previous cycle data

### Parent Completion
Non-repeating parents of repeating children do NOT show completion history. They simply display the current state and next cycle time.

### Reset Behavior
When a cycle triggers:
1. All tasks in the repeating list reset to incomplete
2. Previous completion data is archived and accessible in history
3. Parent lists that have repeating children automatically flip to incomplete
4. New cycle begins

## User Workflows

### Creating a Repeating Task List
1. User creates a new list
2. Adds first task
3. Marks task (or all tasks) as "repeating"
4. Selects cycle frequency (daily/weekly/monthly)
5. Optionally customizes cycle time
6. All subsequent tasks added to this list must be repeating (enforced by UI/validation)

### Completing a Repeating Routine
1. User completes all tasks in a repeating list
2. List shows as "✓ complete" with clock icon and next cycle time
3. User can view completion history by expanding the task
4. At the next cycle trigger, tasks reset and parent state updates

### Viewing Adherence
1. User expands a repeating task list
2. Can see completion history with dates and patterns
3. Can identify streaks, gaps, and consistency

## Edge Cases

### Multiple Repeating Children with Different Cycles
If a parent has multiple repeating children with different cycle times:
- Parent shows the **soonest next cycle time** (whichever child resets first)
- When one child resets, parent remains repeating (other children are still active)
- Parent only resets all children when ALL have triggered their cycles? **[DECISION NEEDED]**

**Current assumption:** Each repeating child resets independently. Parent's "next cycle" timer shows the soonest one, but parent doesn't reset globally until all children have reset. This allows mixing of daily/weekly routines under one parent.

### Empty Repeating Lists
A repeating list with no tasks should:
- Still be marked as repeating
- Show as "complete" (vacuously true — no incomplete tasks)
- Still show next cycle time
- **[DESIGN DECISION NEEDED]** Should empty lists be allowed?

### Pausing a Routine
**Phase 1 scope?** Or Phase 2+?
- Can users pause a repeating list without deleting it?
- Does pausing prevent cycle triggers?

## Implementation Notes

- Cycle triggers should use background jobs or event scheduling
- Timezone handling is critical for correctness
- History storage should be efficient (archive old cycles, keep recent ones indexed)
- UI should make the "repeating" state obvious at a glance

## Open Questions

1. **Multiple children with different cycles:** How should the parent state behave? Reset all at once, or allow independent resets?
2. **Empty repeating lists:** Should they be allowed in Phase 1?
3. **Pausing:** Should users be able to pause without deleting?
4. **Partial completion:** Should users be able to mark individual cycles as "skipped" or "incomplete on purpose"?
5. **Notification/reminder system:** Should repeating tasks notify users when a new cycle begins or when due soon?
