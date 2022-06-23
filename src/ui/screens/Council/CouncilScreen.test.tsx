import {DashboardStackParamList} from '@ui/navigation/navigation';
import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {render, waitFor, fireEvent} from 'src/testUtils';
import {CouncilOverviewScreen} from './CouncilScreen';

const navigation = {
  navigate: () => jest.fn(),
  goBack: () => jest.fn(),
  setOptions: () => jest.fn(),
} as unknown as NavigationProp<DashboardStackParamList>;

describe('CouncilOverviewScreen', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render the loading screen when the data is fetching', () => {
    const {getByTestId} = render(<CouncilOverviewScreen navigation={navigation} />);
    expect(getByTestId('loading_view')).toBeTruthy();
  });

  it('should render the component after data is fetched with initial states ', async () => {
    const {findByText} = render(<CouncilOverviewScreen navigation={navigation} />);
    await findByText('Prime voter');
    await findByText('Vote');
    await findByText('Submit candidacy');
    await findByText('Runners Up 17/20');
  });

  it('should display vote model on clicked on vote button and click cancel button in the model', async () => {
    const {findByTestId, queryByText, getByTestId} = render(<CouncilOverviewScreen navigation={navigation} />);
    const voteButton = await findByTestId('vote-button');
    expect(voteButton).toBeEnabled();
    expect(queryByText('Vote for council')).toBeNull();

    fireEvent.press(voteButton);

    await waitFor(async () => {
      expect(queryByText('Vote for council')).toBeDefined();
      expect(queryByText('voting account:')).toBeDefined();
      expect(queryByText('Vote value:')).toBeDefined();
      expect(queryByText('Select up to 16 candidates in the preferred order:')).toBeDefined();
      const voteCancelButton = getByTestId('vote-cancel-button');
      fireEvent.press(voteCancelButton);
    });

    await waitFor(() => {
      expect(queryByText('Vote for council')).toBeNull();
    });
  });

  it('should display submit candidacy model on clicked on submit candidacy button and click cancel button in the model', async () => {
    const {findByTestId, queryByText, getByTestId} = render(<CouncilOverviewScreen navigation={navigation} />);
    const submitCandidacyButton = await findByTestId('submit-candidacy-button');
    expect(submitCandidacyButton).toBeEnabled();
    expect(queryByText('Submit Council Candidacy')).toBeNull();

    fireEvent.press(submitCandidacyButton);

    await waitFor(async () => {
      expect(queryByText('Submit Council Candidacy')).toBeDefined();
      expect(queryByText('Candidate account:')).toBeDefined();
      expect(queryByText('Candidacy bond:')).toBeDefined();
      const submitCancelButton = getByTestId('submit-candidacy-cancel-button');
      fireEvent.press(submitCancelButton);
    });

    await waitFor(() => {
      expect(queryByText('Submit Council Candidacy')).toBeNull();
    });
  });
});
