import authAtom from "@states/atomsStorage/authAtom";
import { getDefaultStore, useAtom, useAtomValue } from "jotai";
import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
    const defaultStore = getDefaultStore()
    console.log(defaultStore.get(authAtom).isLogin)
    if (request.nextUrl.pathname.startsWith('/login')) {

       if(defaultStore.get(authAtom).isLogin){
        return NextResponse.redirect(new URL('/home', request.url))
       }else{
        return NextResponse.next();
       }
      }
    }
export const config = {
    matcher: ['/', '/login', '/home', '/movie/:path*', '/dashboard/:path*', '/payment'],
  }