import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation'; // Mock useRouter
import Page from './page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockParams = { id: '1' };

describe('Page component', () => {
  beforeEach(() => {
    useRouter.mockReturnValue({
      push: jest.fn(),
    });
  });

  it('renders essential details when offerDetails is provided', () => {
    const mockOfferDetails = {
      id: 1,
      hotelCity: 'Test City',
      hotelStars: 5,
      hotelName: 'Test Hotel',
      offerImage: 'test-image-url',
      duration: '3 Nights',
      person: 2,
      startDate: '2024-05-15',
      arrivalTime: '09:00 AM',
      cancellationPolicy: 'Free cancellation up to 7 days before arrival',
      totalCost: 500,
      taxAmount: 50,
      additionalImages: ['additional-image-1.jpg', 'additional-image-2.jpg'],
      roomType: 'Deluxe Room',
      roomImage: 'room-image-url',
      mealPlan: 'All Inclusive',
      transportation: 'Airport transfer included',
      activities: [
        { name: 'Sightseeing Tour', description: 'Guided tour of city landmarks' },
        { name: 'Beach Excursion', description: 'Relaxing day at the beach' },
      ],
      hotelDescription: 'Luxurious accommodation with stunning views',
      reviews: [],
    };

    render(<Page params={mockParams} />);
    
    expect(screen.getByText('Essential Details for Test City Journey')).toBeInTheDocument();
    expect(screen.getByText('5-star hotel, Test Hotel - Test City')).toBeInTheDocument();
    expect(screen.getByText('Nights')).toBeInTheDocument();
    expect(screen.getByText('Departure Time')).toBeInTheDocument();
    expect(screen.getByText('Arrival Time')).toBeInTheDocument();
    expect(screen.getByText('Cancellation Policy')).toBeInTheDocument();
    expect(screen.getByText('Price Breakdown')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('Room Type')).toBeInTheDocument();
    expect(screen.getByText('Meal Plan')).toBeInTheDocument();
    expect(screen.getByText('Activities')).toBeInTheDocument();
    expect(screen.getByText('Transportation')).toBeInTheDocument();
    expect(screen.getByText('Trip Details')).toBeInTheDocument();
    expect(screen.getByText('Reviews')).toBeInTheDocument();
    expect(screen.getByText('More Images')).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(5);
  });

  it('renders nothing when offerDetails is not provided', () => {
    render(<Page params={{ id: '999' }} />);
    
    expect(screen.queryByText('Essential Details for Test City Journey')).not.toBeInTheDocument();
    expect(screen.queryByText('5-star hotel, Test Hotel - Test City')).not.toBeInTheDocument();
    expect(screen.queryByText('Nights')).not.toBeInTheDocument();
    expect(screen.queryByText('Departure Time')).not.toBeInTheDocument();
    expect(screen.queryByText('Arrival Time')).not.toBeInTheDocument();
    expect(screen.queryByText('Cancellation Policy')).not.toBeInTheDocument();
    expect(screen.queryByText('Price Breakdown')).not.toBeInTheDocument();
    expect(screen.queryByText('Total')).not.toBeInTheDocument();
    expect(screen.queryByText('Room Type')).not.toBeInTheDocument();
    expect(screen.queryByText('Meal Plan')).not.toBeInTheDocument();
    expect(screen.queryByText('Activities')).not.toBeInTheDocument();
    expect(screen.queryByText('Transportation')).not.toBeInTheDocument();
    expect(screen.queryByText('Trip Details')).not.toBeInTheDocument();
    expect(screen.queryByText('Reviews')).not.toBeInTheDocument();
    expect(screen.queryByText('More Images')).not.toBeInTheDocument();
    expect(screen.queryAllByRole('tab')).toHaveLength(0);
  });
});
