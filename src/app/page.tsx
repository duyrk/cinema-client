'use client';
import { useRouter } from '@libs/patch-router';
import React from 'react';

export default function RootPage() {
  const router = useRouter();

  React.useEffect(() => {
    router.push("/home");
  }, []);

  return null;
}
