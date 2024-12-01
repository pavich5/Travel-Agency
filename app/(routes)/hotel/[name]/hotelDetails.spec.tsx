import { render, screen } from '@testing-library/react';
import Page from './page';

const mockParams = { name: 'Test Hotel' };

describe('Page component', () => {
  it('should render hotel details if hotel is found', () => {
    const mockFoundHotel = {
      id: 1,
      hotelName: 'Test Hotel',
      hotelCity: 'Test City',
      hotelCoverImage: 'test-image-url',
      hotelStars: 4,
      amenities: ['Amenity 1', 'Amenity 2'],
      hotelDescription: 'Test hotel description',
      reviews: [],
    };

    render(<Page params={mockParams} />);

    expect(screen.getByText('Test Hotel Test City')).toBeInTheDocument();
    expect(screen.getByText('Country not found')).toBeInTheDocument();
    expect(screen.getByText('Amenity 1')).toBeInTheDocument();
    expect(screen.getByText('Amenity 2')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Test hotel description')).toBeInTheDocument();
  });

  it('should render image not found message if hotel is not found', () => {
    render(<Page params={mockParams} />);

    expect(screen.getByAltText('hotel image')).toBeInTheDocument();
  });
});
