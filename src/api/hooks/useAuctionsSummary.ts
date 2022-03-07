import {gql, useQuery} from '@apollo/client';
import type {SubstrateChainAuctionsSummary} from 'src/generated/litentryGraphQLTypes';

export type AuctionsSummary = SubstrateChainAuctionsSummary;

const AUCTIONS_SUMMARY_QUERY = gql`
  query getAuctionsSummary {
    substrateChainAuctionsSummary {
      auctionsInfo {
        numAuctions
        active
      }
      latestAuction {
        leasePeriod {
          first
          last
        }
        endingPeriod {
          endingIn
          remaining
          remainingPercent
        }
        raised
        raisedPercent
        winningBid {
          blockNumber
          projectId
          projectName
          amount
          isCrowdloan
          firstSlot
          lastSlot
        }
      }
    }
  }
`;

const oneMinute = 60 * 1000;

export function useAuctionsSummary() {
  const {data, ...rest} = useQuery<{substrateChainAuctionsSummary: AuctionsSummary}>(AUCTIONS_SUMMARY_QUERY, {
    pollInterval: oneMinute,
  });

  return {
    data: data?.substrateChainAuctionsSummary,
    ...rest,
  };
}
