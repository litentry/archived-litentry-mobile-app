import {accountHandler} from './accountHandler';
import {auctionsHandler} from './auctionsHandler';
import {bountiesHandler} from './bountiesHandler';
import {bountiesSummaryHandler} from './bountiesSummaryHandler';
import {bountyHandler} from './bountyHandler';
import {chainInfoHandler} from './chainInfoHandler';
import {councilMotionsHandler} from './councilMotionsHandler';
import {crowdloanHandler} from './crowdloanHandler';
import {democracyHandler} from './democracyHandler';
import {democracySummaryHandler} from './democracySummaryHandler';
import {eventsCalendarHandler} from './eventsCalendarHandler';
import {parachainCrowdloanHandler} from './parachainCrowdloanHandler';
import {parachainDetailHandler} from './parachainDetailHandler';
import {parachainSummaryHandler} from './parachainSummaryHandler';
import {parathreadsHandler} from './parathreadHandler';
import {registrarsHandler} from './registrarsHandler';

export const handlers = [
  registrarsHandler,
  democracyHandler,
  councilMotionsHandler,
  accountHandler,
  chainInfoHandler,
  parathreadsHandler,
  parachainSummaryHandler,
  democracySummaryHandler,
  eventsCalendarHandler,
  bountiesHandler,
  bountiesSummaryHandler,
  bountyHandler,
  chainInfoHandler,
  auctionsHandler,
  parachainCrowdloanHandler,
  crowdloanHandler,
  parachainDetailHandler,
  // other handlers
];
