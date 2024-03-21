import { render, fireEvent } from '@testing-library/react';
import HamburgerMenu from './HamburgerMenu';

describe('HamburgerMenu component', () => {
  it('renders without crashing', () => {
    render(<HamburgerMenu />);
  });

  it('opens the drawer when the button is clicked', () => {
    const { getByRole } = render(<HamburgerMenu />);
    const button = getByRole('button', { name: /menu/i });
    fireEvent.click(button);
    const drawer = getByRole('presentation', { name: /menu/i });
    expect(drawer).toBeInTheDocument();
  });

  it('closes the drawer when the button inside the drawer is clicked', () => {
    const { getByRole } = render(<HamburgerMenu />);
    const button = getByRole('button', { name: /menu/i });
    fireEvent.click(button);
    const menuItem = getByRole('menuitem');
    fireEvent.click(menuItem);
    const drawer = getByRole('presentation', { name: /menu/i });
    expect(drawer).not.toBeInTheDocument();
  });
});
