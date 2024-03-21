import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation'; // Mock useRouter
import Page from './page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Page component', () => {
  const mockParams = { name: 'TestCountry' };
  const mockOffers = [
    {
      id: 1,
      City: 'TestCity',
      Date: '2024-03-20 - 2024-03-25',
      Price: 500,
      Hotel: 'hotelImage.jpg',
      HotelName: 'Test Hotel',
      Stars: 4,
      Nights: 5,
      Start: '2024-03-20',
      End: '2024-03-25',
      transportation: 'Transport',
      mealPlan: 'Plan',
      roomType: 'Room Type'
    },
  ];

  beforeEach(() => {
    useRouter.mockReturnValue({
      query: mockParams,
    });
  });

  it('renders country name in the heading', () => {
    render(<Page params={mockParams} />);
    const countryNameHeading = screen.getByRole('heading', { name: `${mockParams.name} Trips` });
    expect(countryNameHeading).toBeInTheDocument();
  });

  it('renders tabs with city names', () => {
    render(<Page params={mockParams} />);
    const tabElements = screen.getAllByRole('tab');
    expect(tabElements).toHaveLength(1); // Only one city, so only one tab expected
    expect(tabElements[0]).toHaveTextContent('TestCity');
  });

  it('renders table with offer details', () => {
    render(<Page params={mockParams} />);
    const hotelNameCell = screen.getByText('Test Hotel');
    const dateCell = screen.getByText('2024-03-20 - 2024-03-25');
    const priceCell = screen.getByText('500$');
    const starsButton = screen.getByRole('button', { name: '4' });
    const viewDetailsButton = screen.getByRole('button', { name: 'View Details' });

    expect(hotelNameCell).toBeInTheDocument();
    expect(dateCell).toBeInTheDocument();
    expect(priceCell).toBeInTheDocument();
    expect(starsButton).toBeInTheDocument();
    expect(viewDetailsButton).toBeInTheDocument();
  });

  it('navigates to offer details page when clicking on View Details button', () => {
    render(<Page params={mockParams} />);
    const viewDetailsButton = screen.getByRole('button', { name: 'View Details' });

    fireEvent.click(viewDetailsButton);

    expect(useRouter().push).toHaveBeenCalledWith('/offer/1');
  });
});
