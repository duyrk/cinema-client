'use client';

import FilmItem from "@app/(user)/home/_component/FilmItem";
import { ERole } from "@constants";
import { useRouter } from "@libs/patch-router";
import userAtom from "@states/atomsStorage/userAtom";
import { useAtom } from "jotai";
import React from "react";

export default function DashboardPage(){
    const [user,] = useAtom(userAtom)
    const router = useRouter()

    React.useEffect(()=>{
        if(user.role === ERole.USER){
            router.push('/home')
        }
    },[])
    return <div></div>
}