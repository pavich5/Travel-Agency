import React from 'react';
import { render } from '@testing-library/react';
import Reviews from './Reviews';

describe('Reviews component', () => {
  const offerDetails:any = {
    reviews: [
      { username: 'John Doe', rating: 4, comment: 'Great experience!' },
      { username: 'Jane Smith', rating: 5, comment: 'Excellent service!' },
    ],
  };

  it('renders without crashing', () => {
    render(<Reviews offerDetails={offerDetails} />);
  });

  it('renders correct number of reviews', () => {
    const { getAllByTestId } = render(<Reviews offerDetails={offerDetails} />);
    const reviewElements = getAllByTestId('review');
    expect(reviewElements.length).toBe(2);
  });

  it('renders username, rating, and comment for each review', () => {
    const { getByText } = render(<Reviews offerDetails={offerDetails} />);
    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByText('Jane Smith')).toBeInTheDocument();
    expect(getByText('Great experience!')).toBeInTheDocument();
    expect(getByText('Excellent service!')).toBeInTheDocument();
  });
});
