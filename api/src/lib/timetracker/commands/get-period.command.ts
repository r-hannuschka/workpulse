import type { Command } from "../../command";

export type GetPeriodPayload = { startDate: string; endDate?: string };
export type GetPeriodCommand = Command<"timetracker:get-period", GetPeriodPayload>;
