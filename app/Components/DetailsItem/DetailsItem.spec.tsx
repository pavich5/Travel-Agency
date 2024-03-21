import React from 'react';
import { render, screen } from '@testing-library/react';
import DetailItem from './DetailItem';

describe('DetailItem component', () => {
  test('renders title and value correctly', () => {
    const title = 'Title';
    const value = 'Value';

    render(<DetailItem title={title} value={value} />);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(value)).toBeInTheDocument();
  });

  test('renders divider with correct style', () => {
    const title = 'Title';
    const value = 'Value';

    render(<DetailItem title={title} value={value} />);

    const divider = screen.getByTestId('divider');
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveClass('ant-divider', 'custom-divider-class');
  });
});
