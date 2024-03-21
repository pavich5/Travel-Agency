import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';

import TravelAI from './page';

describe('TravelAI component', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() =>
          JSON.stringify([
            {
              role: 'assistant',
              content: "Hello! I'm Travel AI. How can I assist you with your travel plans today?",
            },
          ])
        ),
        setItem: jest.fn(),
      },
      writable: true,
    });
  });

  test('renders initial message correctly', () => {
    render(<TravelAI />);
    expect(screen.getByText("Hello! I'm Travel AI. How can I assist you with your travel plans today?"))
  });

  test('allows user to type and send message', async () => {
    render(<TravelAI />);

    const input = screen.getByPlaceholderText('Type your message here...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Test message' } });

    const sendButton = screen.getByText('Send');
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(input.value).toBe('');
    });
  });
});
