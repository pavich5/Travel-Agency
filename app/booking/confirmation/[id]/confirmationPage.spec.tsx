import { render, screen, fireEvent } from '@testing-library/react';
import Page from './page';

describe('Page component', () => {
  describe('Rendering', () => {
    it('should render all input fields and buttons', () => {
      render(<Page params={{ id: '1' }} />);
      
      expect(screen.getByText(/Book your trip to/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText('First name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Phone Number')).toBeInTheDocument();
      expect(screen.getByText('Pay with Stripe')).toBeInTheDocument();
      expect(screen.getByText('Contact us on Viber')).toBeInTheDocument();
      expect(screen.getByText(/By continuing, you agree with/i)).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('should call handlePayWithStripe when "Pay with Stripe" button is clicked', () => {
      const mockHandlePayWithStripe = jest.fn();
      const mockUserUpdate = jest.fn();

      render(<Page params={{ id: '1' }} />);

      fireEvent.click(screen.getByText('Pay with Stripe'));
      
      expect(mockHandlePayWithStripe).toHaveBeenCalled();
    });

    it('should call handleContactUsOnViber when "Contact us on Viber" button is clicked', () => {
      const mockHandleContactUsOnViber = jest.fn();

      render(<Page params={{ id: '1' }} />);

      fireEvent.click(screen.getByText('Contact us on Viber'));
      
      expect(mockHandleContactUsOnViber).toHaveBeenCalled();
    });
  });
});
