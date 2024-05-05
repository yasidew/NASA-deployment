import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import FetchApodSpecificDateRange from '../pages/ApodDateRange';
import { MemoryRouter } from 'react-router-dom';



describe('FetchApodSpecificDateRange', () => {
    it('renders component correctly', () => {
        render(
            <MemoryRouter>
                <FetchApodSpecificDateRange />
            </MemoryRouter>
        );
        expect(screen.getByText('Date Range Selection')).toBeInTheDocument();
    });

    it('fetches data on button click', async () => {

        render(
            <MemoryRouter>
                <FetchApodSpecificDateRange />
            </MemoryRouter>
        );

        expect(screen.getByLabelText('Start Date:')).toBeInTheDocument();
        expect(screen.getByLabelText('End Date:')).toBeInTheDocument();
        expect(screen.getByText('Fetch Data')).toBeInTheDocument();
    });


});