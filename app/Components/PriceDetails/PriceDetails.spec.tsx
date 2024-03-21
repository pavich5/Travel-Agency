import { render } from '@testing-library/react';
import PriceDetail from './PriceDetail';

describe('PriceDetail component', () => {
  it('renders without crashing', () => {
    render(<PriceDetail title="Test Title" value="Test Value" />);
  });

  it('renders title and value correctly', () => {
    const { getByText } = render(<PriceDetail title="Test Title" value="Test Value" />);
    expect(getByText('Test Title')).toBeInTheDocument();
    expect(getByText('Test Value')).toBeInTheDocument();
  });
});
