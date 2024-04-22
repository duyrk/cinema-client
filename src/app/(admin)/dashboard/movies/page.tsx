'use client'
import MoveForm from "./_components/MovieForm";
import MovieTable from "./_components/MovieTable";
import {Box} from '@mantine/core';
export default function adminMovies() {
    return (
        <Box>
        <MovieTable></MovieTable>
        <MoveForm></MoveForm>
        </Box>
    );
}