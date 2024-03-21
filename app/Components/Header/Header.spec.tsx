import { render, fireEvent } from '@testing-library/react';
import Header from './Header';

jest.mock('next/link', () => ({ children }) => children);
jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    back: jest.fn(),
  })),
}));

describe('Header component', () => {
  it('renders without crashing', () => {
    render(<Header />);
  });

  it('renders logo and menu items correctly', () => {
    const { getByText } = render(<Header />);
    expect(getByText('Globetrotter')).toBeInTheDocument();
    expect(getByText('Trips')).toBeInTheDocument();
    expect(getByText('Travel AI')).toBeInTheDocument();
    expect(getByText('Destinations')).toBeInTheDocument();
    expect(getByText('Help')).toBeInTheDocument();
    expect(getByText('Login')).toBeInTheDocument();
  });

  it('renders hamburger menu on mobile view', () => {
    global.innerWidth = 500; // set innerWidth to simulate mobile view
    const { getByRole } = render(<Header />);
    expect(getByRole('button', { name: /menu/i })).toBeInTheDocument();
  });

  it('handles back button click correctly', () => {
    const { getByRole } = render(<Header />);
    fireEvent.click(getByRole('img', { name: /left/i }));
    expect(window.location.pathname).toBe('/');
  });
});
