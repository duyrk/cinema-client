import { StorageService } from "@services";
import authAtom from "@states/atomsStorage/authAtom";
import { getDefaultStore, useAtom, useAtomValue } from "jotai";
import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
    
    }
export const config = {
    matcher: ['/', '/login', '/home', '/movie/:path*', '/dashboard/:path*', '/payment'],
  }