import * as React from 'react';
import { Header } from '@/app/ui/Header';

export const Page = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
};