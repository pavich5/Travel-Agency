import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import CancelledPage from './page';

// Mock the useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('CancelledPage component', () => {
  it('should render cancellation message and return button', () => {
    render(<CancelledPage />);
    expect(screen.getByText('Payment Cancelled')).toBeInTheDocument();
    expect(screen.getByText("We're sorry to see you go. Your payment has been cancelled.")).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Return to Homepage' })).toBeInTheDocument();
  });

  it('should navigate to homepage when return button is clicked', async () => {
    const pushMock = jest.fn();
    useRouter.mockReturnValue({
      push: pushMock,
    });

    render(<CancelledPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Return to Homepage' }));

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/');
    });
  });
});
