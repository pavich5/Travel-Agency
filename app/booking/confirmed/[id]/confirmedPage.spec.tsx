import { render, screen, fireEvent } from '@testing-library/react';
import SuccessPage from './page';

describe('SuccessPage component', () => {
  it('should render success message with correct details', () => {
    const email = 'test@example.com';
    const hotelName = 'Test Hotel';
    const hotelCity = 'Test City';

    render(
      <SuccessPage />
    );

    expect(screen.getByText(`Congratulations! You have successfully booked ${hotelName} in ${hotelCity}.`)).toBeInTheDocument();
    expect(screen.getByText(`An email has been sent to ${email} with the details.`)).toBeInTheDocument();
  });

  it('should trigger email click event when email link is clicked', () => {
    const email = 'test@example.com';
    const hotelName = 'Test Hotel';
    const hotelCity = 'Test City';

    render(
      <SuccessPage />
    );

    fireEvent.click(screen.getByText(email));

    expect(window.location.href).toBe(`mailto:${email}`);
  });
});
