import { StorageService } from "@services";
import authAtom from "@states/atomsStorage/authAtom";
import { getDefaultStore, useAtom, useAtomValue } from "jotai";
import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
    // const isLogin =  JSON.parse(StorageService.get('islogin')!)
    // console.log('islogin'+isLogin.isLogin)
    if (request.nextUrl.pathname.startsWith('/login')) {

    //    if(isLogin){
    //     return NextResponse.redirect(new URL('/home', request.url))
    //    }else{
    //     return NextResponse.next();
    //    }
      }
    }
export const config = {
    matcher: ['/', '/login', '/home', '/movie/:path*', '/dashboard/:path*', '/payment'],
  }