/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import {render, wait, within} from 'src/testUtils';
import RegistrarList from '@ui/components/RegistrarList';

describe('RegistrarList component', () => {
  it('should render the loading view when first rendered with no data', async () => {
    const {getByTestId} = render(<RegistrarList />);
    expect(getByTestId('loading_view')).toBeTruthy();
  });

  it('renders data correctly', async () => {
    const {getByTestId, getAllByTestId} = render(<RegistrarList />);
    await wait();

    const countContainer = getByTestId('registrars_count');
    expect(within(countContainer).getByText('Count')).toBeTruthy();
    expect(within(countContainer).getByText('3')).toBeTruthy();

    const lowestFeeContainer = getByTestId('registrars_lowest_fee');
    expect(within(lowestFeeContainer).getByText('Lowest Fee')).toBeTruthy();
    expect(within(lowestFeeContainer).getByText('0.0000 DOT')).toBeTruthy();

    const highestFeeContainer = getByTestId('registrars_highest_fee');
    expect(within(highestFeeContainer).getByText('Highest Fee')).toBeTruthy();
    expect(within(highestFeeContainer).getByText('5.0000 DOT')).toBeTruthy();

    const registrarItems = getAllByTestId('registrar_item');
    expect(within(registrarItems[0]!).getByText('W3F/✍️')).toBeTruthy();
    expect(within(registrarItems[0]!).getByText('Index: 0')).toBeTruthy();
    expect(within(registrarItems[0]!).getByText('Fee: 0.0000 DOT')).toBeTruthy();

    expect(within(registrarItems[1]!).getByText('Registrar #1')).toBeTruthy();
    expect(within(registrarItems[1]!).getByText('Index: 1')).toBeTruthy();
    expect(within(registrarItems[1]!).getByText('Fee: 5.0000 DOT')).toBeTruthy();

    expect(within(registrarItems[2]!).getByText('Wei/📚')).toBeTruthy();
    expect(within(registrarItems[2]!).getByText('Index: 2')).toBeTruthy();
    expect(within(registrarItems[2]!).getByText('Fee: 0.0000 DOT')).toBeTruthy();
  });
});
