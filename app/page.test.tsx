import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HomePage from './page';


//didn't have time to finish ject-test cases

// describe('HomePage Component', () => {
//   test('renders without errors', () => {
//     render(<HomePage />);
//   });

//   test('handles checkbox toggle correctly', () => {
//     render(<HomePage />);

//     const checkbox = screen.getByLabelText('Test'); 
//     fireEvent.click(checkbox);

//   });

//   test('fetches data and renders results', async () => {
//     const mockData = [{ id: 1, title: 'Test Title' }];
//     jest.spyOn(global, 'fetch').mockResolvedValue({
//       json: jest.fn().mockResolvedValue(mockData),
//     });

//     render(<HomePage />);
//     fireEvent.click(screen.getByText('Submit'));

//     await waitFor(() => {
//       expect(screen.getByText('Test Title')).toBeInTheDocument();
//     });
//   });
// });