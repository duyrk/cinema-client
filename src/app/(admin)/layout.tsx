import React from "react";
import { NavbarSimple } from "./_component/NavbarSimple";
import { Box } from "@mantine/core";

export default function RootAdminPage({children}: {children: React.ReactNode}){
    return (
        <Box><NavbarSimple>{children}</NavbarSimple></Box>
    );
}