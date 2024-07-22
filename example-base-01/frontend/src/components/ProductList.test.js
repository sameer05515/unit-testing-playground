import React,{act} from 'react';
import { render, screen, waitFor } from '@testing-library/react'; // Use act from react-testing-library
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import ProductList from './ProductList';

const mock = new MockAdapter(axios);

describe('ProductList', () => {
  afterEach(() => {
    mock.reset(); // Reset the mock adapter after each test
  });

  it('fetches and displays products', async () => {
    // Mock the API response
    mock.onGet('http://localhost:3000/app').reply(200, {
      products: [
        { title: 'Product 1', description: 'Description 1' },
        { title: 'Product 2', description: 'Description 2' },
      ],
    });

    // Wrap render in act for proper updates
    await act(async () => {
      render(<ProductList />);
    });

    // Wait for the products to be displayed
    await waitFor(() => {
      expect(screen.getByText('title: Product 1')).toBeInTheDocument();
      expect(screen.getByText('description: Description 1')).toBeInTheDocument();
      expect(screen.getByText('title: Product 2')).toBeInTheDocument();
      expect(screen.getByText('description: Description 2')).toBeInTheDocument();
    });
  });

  it('displays an error message on API error', async () => {
    // Mock the API response to return an error
    mock.onGet('http://localhost:3000/app').reply(500);

    // Wrap render in act for proper updates
    await act(async () => {
      render(<ProductList />);
    });

    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(screen.getByText('Failed to load products')).toBeInTheDocument();
    });
  });
});
