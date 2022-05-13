import {bountiesHandler} from './bountiesHandler';
import {bountyHandler} from './bountyHandler';
import {chainInfoHandler} from './chainInfoHandler';
import {councilMotionsHandler} from './councilMotionsHandler';
import {democracyHandler} from './democracyHandler';
import {democracySummaryHandler} from './democracySummaryHandler';
import {eventsCalendarHandler} from './eventsCalendarHandler';
import {parachainSummaryHandler} from './parachainSummaryHandler';
import {registrarsHandler} from './registrarsHandler';

export const handlers = [
  registrarsHandler,
  democracyHandler,
  councilMotionsHandler,
  parachainSummaryHandler,
  democracySummaryHandler,
  eventsCalendarHandler,
  bountiesHandler,
  bountyHandler,
  chainInfoHandler,
  // other handlers
];
