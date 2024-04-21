import React from "react";
import { NavbarSimple } from "./_component/NavbarSimple";

export default function RootAdminPage({children}: {children: React.ReactNode}){
    return <NavbarSimple>{children}</NavbarSimple>
}