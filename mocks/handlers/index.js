import {accountHandler} from './accountHandler';
import {bountiesHandler} from './bountiesHandler';
import {bountiesSummaryHandler} from './bountiesSummaryHandler';
import {bountyHandler} from './bountyHandler';
import {chainInfoHandler} from './chainInfoHandler';
import {councilHandler} from './councilHandler';
import {councilMotionsHandler} from './councilMotionsHandler';
import {councilSummaryHandler} from './councilSummaryHandler';
import {councilVotesHandler} from './councilVotesHandler';
import {crowdloanSummaryHandler} from './crowdloanSummaryHandler';
import {democracyHandler} from './democracyHandler';
import {democracySummaryHandler} from './democracySummaryHandler';
import {eventsCalendarHandler} from './eventsCalendarHandler';
import {moduleElectionHandler} from './moduleElectionHandler';
import {parachainSummaryHandler} from './parachainSummaryHandler';
import {parathreadsHandler} from './parathreadHandler';
import {registrarsHandler} from './registrarsHandler';
import {tipDetailHandler} from './tipDetailHandler';
import {tipsHandler} from './tipsHandler';
import {treasurySummaryHandler} from './treasurySummaryHandler';

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
  councilSummaryHandler,
  crowdloanSummaryHandler,
  treasurySummaryHandler,
  accountHandler,
  councilHandler,
  moduleElectionHandler,
  councilVotesHandler,
  tipDetailHandler,
  tipsHandler,
  // other handlers
];
