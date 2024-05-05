import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import ApodRandom from "../pages/ApodRandom";
import { MemoryRouter } from 'react-router-dom';


describe('FetchApodRandom', () => {
    it('renders component correctly', () => {
        const { getByText } = render(<MemoryRouter>
            <ApodRandom />
        </MemoryRouter>);
        // Assert that the component renders without crashing
        expect(getByText('Fetch Random Images')).toBeInTheDocument();
    });

    it('fetches random data on button click', async () => {
        const mockApodData = [
            {
                title: 'Test Title 1',
                explanation: 'Test Explanation 1',
                media_type: 'image',
                url: 'test-url-1',
            },
            {
                title: 'Test Title 2',
                explanation: 'Test Explanation 2',
                media_type: 'video',
                url: 'test-url-2',
            },
        ];

        const { getByText, getByAltText } = render(<MemoryRouter>
            <ApodRandom />
        </MemoryRouter>);

        fireEvent.click(getByText('Generate Random Number'));
        fireEvent.click(getByText('Fetch Images'));

        // Assert that loading message appears
        expect(screen.getByText('Wait...')).toBeInTheDocument();


    });
});
