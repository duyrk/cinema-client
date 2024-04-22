'use client'
import SeatForm from "./_components/SeatForm";
import SeatTable from "./_components/SeatTable";
import {Box} from '@mantine/core';
export default function adminMovies() {
    return (
        <Box>
        <SeatTable></SeatTable>
        <SeatForm></SeatForm>
        </Box>
    );
}