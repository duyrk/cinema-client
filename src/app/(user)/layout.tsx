import { Chathura } from 'next/font/google';
import { HeaderMegaMenu } from './_components/HeaderMegaMenu';

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    
      <HeaderMegaMenu>
        {children}
      </HeaderMegaMenu>
    
  );
}
