'use client'
import RoomForm from "./_components/RoomForm";
import RoomTable from "./_components/RoomTable";
import {Box} from '@mantine/core';
export default function adminMovies() {
    return (
        <Box>
        <RoomTable></RoomTable>
        <RoomForm></RoomForm>
        </Box>
    );
}