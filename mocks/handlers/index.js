import {accountHandler} from './accountHandler';
import {auctionsHandler} from './auctionsHandler';
import {bountiesHandler} from './bountiesHandler';
import {bountiesSummaryHandler} from './bountiesSummaryHandler';
import {bountyHandler} from './bountyHandler';
import {chainInfoHandler} from './chainInfoHandler';
import {convictionsHandler} from './convictionsHandler';
import {councilHandler} from './councilHandler';
import {councilMotionDetailsHandler} from './councilMotionDetailsHandler';
import {councilMotionsHandler} from './councilMotionsHandler';
import {councilVotesHandler} from './councilVotesHandler';
import {crowdloanHandler} from './crowdloanHandler';
import {crowdloansHandler} from './crowdloansHandler';
import {democracyHandler} from './democracyHandler';
import {democracySummaryHandler} from './democracySummaryHandler';
import {eventsCalendarHandler} from './eventsCalendarHandler';
import {moduleElectionHandler} from './moduleElectionHandler';
import {parachainCrowdloanHandler} from './parachainCrowdloanHandler';
import {parachainDetailHandler} from './parachainDetailHandler';
import {parachainSummaryHandler} from './parachainSummaryHandler';
import {parathreadsHandler} from './parathreadHandler';
import {registrarsHandler} from './registrarsHandler';
import {tipDetailHandler} from './tipDetailHandler';
import {tipsHandler} from './tipsHandler';

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
  accountHandler,
  councilHandler,
  moduleElectionHandler,
  councilVotesHandler,
  tipDetailHandler,
  tipsHandler,
  convictionsHandler,
  councilMotionDetailsHandler,
  crowdloansHandler,
  // other handlers
];
