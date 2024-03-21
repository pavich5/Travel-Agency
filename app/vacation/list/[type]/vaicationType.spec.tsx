import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation'; // Mock useRouter
import Page from './page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Page component', () => {
  beforeEach(() => {
    useRouter.mockReturnValue({
      push: jest.fn(),
    });
  });

  it('renders correctly with provided params', () => {
    const mockParams = { type: 'TestType' };
    render(<Page params={mockParams} />);
    
    expect(screen.getByText(`${mockParams.type} Vacations`)).toBeInTheDocument();
    expect(screen.getByText('Experience the season\'s best destinations with Globetrotter')).toBeInTheDocument();
    expect(screen.getByText('All TestType offers')).toBeInTheDocument();
  });

  it('calls router.push with correct path when clicking on a vacation country', () => {
    const mockParams = { type: 'TestType' };
    render(<Page params={mockParams} />);
    const vacationCountry = screen.getByText('TestCountry');

    fireEvent.click(vacationCountry);

    expect(useRouter().push).toHaveBeenCalledWith('/vacation/TestCountry', { shallow: true });
  });

  it('calls router.push with correct path when clicking on View Offer button', () => {
    const mockParams = { type: 'TestType' };
    render(<Page params={mockParams} />);
    const viewOfferButton = screen.getByText('View Offer');

    fireEvent.click(viewOfferButton);

    expect(useRouter().push).toHaveBeenCalledWith('/offer/1', { shallow: true });
  });
});
