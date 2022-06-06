import {accountHandler} from './accountHandler';
import {bountiesHandler} from './bountiesHandler';
import {bountyHandler} from './bountyHandler';
import {bountiesSummaryHandler} from './bountiesSummaryHandler';
import {chainInfoHandler} from './chainInfoHandler';
import {councilMotionsHandler} from './councilMotionsHandler';
import {democracyHandler} from './democracyHandler';
import {democracySummaryHandler} from './democracySummaryHandler';
import {eventsCalendarHandler} from './eventsCalendarHandler';
import {parachainSummaryHandler} from './parachainSummaryHandler';
import {parathreadsHandler} from './parathreadHandler';
import {registrarsHandler} from './registrarsHandler';

export const handlers = [
  registrarsHandler,
  democracyHandler,
  councilMotionsHandler,
  parathreadsHandler,
  parachainSummaryHandler,
  democracySummaryHandler,
  eventsCalendarHandler,
  accountHandler,
  bountiesHandler,
  bountiesSummaryHandler,
  bountyHandler,
  chainInfoHandler,
  // other handlers
];
