'use client'
import MovieTable from "./_components/MovieTable";
import {Box} from '@mantine/core';
export default function adminMovies() {
    return (
        <Box>
        <MovieTable></MovieTable>
        {/* <MoveForm></MoveForm> */}
        </Box>
    );
}