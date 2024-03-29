import {accountHandler} from './accountHandler';
import {auctionsHandler} from './auctionsHandler';
import {bountiesHandler} from './bountiesHandler';
import {bountiesSummaryHandler} from './bountiesSummaryHandler';
import {bountyHandler} from './bountyHandler';
import {chainInfoHandler} from './chainInfoHandler';
import {councilHandler} from './councilHandler';
import {councilMotionsHandler} from './councilMotionsHandler';
import {councilSummaryHandler} from './councilSummaryHandler';
import {councilVotesHandler} from './councilVotesHandler';
import {crowdloanHandler} from './crowdloanHandler';
import {crowdloansHandler} from './crowdloansHandler';
import {crowdloanSummaryHandler} from './crowdloanSummaryHandler';
import {democracySummaryHandler} from './democracySummaryHandler';
import {democracyReferendumsHandler} from './democracyReferendumsHandler';
import {democracyProposalsHandler} from './democracyProposalsHandler';
import {eventsCalendarHandler} from './eventsCalendarHandler';
import {moduleElectionHandler} from './moduleElectionHandler';
import {parachainCrowdloanHandler} from './parachainCrowdloanHandler';
import {parachainDetailHandler} from './parachainDetailHandler';
import {parachainSummaryHandler} from './parachainSummaryHandler';
import {parathreadsHandler} from './parathreadHandler';
import {registrarsHandler} from './registrarsHandler';
import {tipDetailHandler} from './tipDetailHandler';
import {tipsHandler} from './tipsHandler';
import {treasurySummaryHandler} from './treasurySummaryHandler';

export const handlers = [
  registrarsHandler,
  councilMotionsHandler,
  accountHandler,
  chainInfoHandler,
  parathreadsHandler,
  parachainSummaryHandler,
  democracySummaryHandler,
  democracyReferendumsHandler,
  democracyProposalsHandler,
  eventsCalendarHandler,
  accountHandler,
  bountiesHandler,
  bountiesSummaryHandler,
  bountyHandler,
  chainInfoHandler,
  councilSummaryHandler,
  crowdloanSummaryHandler,
  treasurySummaryHandler,
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
  crowdloansHandler,
  // other handlers
];
