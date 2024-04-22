'use client'
import ShowTimeForm from "./_components/ShowTimeForm";
import ShowTimeTable from "./_components/ShowTimeTable";
import {Box} from '@mantine/core';
export default function adminMovies() {
    return (
        <Box>
        <ShowTimeTable></ShowTimeTable>
        <ShowTimeForm></ShowTimeForm>
        </Box>
    );
}