'use client';
import AuthButton from '@/components/auth/auth-button';
import MobileNav from '@/components/dashboard/mobile-nav';
import DashboardNav from '@/components/dashboard/nav';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useEffect } from 'react';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isSignedIn } = useUser();
  console.log('🚀 ~ Dashboard ~ isSignedIn:', isSignedIn);
  useEffect(() => {
    if (!isSignedIn) {
      window.location.href = '/';
    }
  }, [isSignedIn]);
  return (
    <div>
      {/* header */}
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="flex items-center h-16 px-6">
          <MobileNav />

          <div className="flex w-full">
            <Link
              href="/dashboard"
              className="flex items-center space-x-2 cursor-pointer"
            >
              <h1 className="text-lg font-bold">Proof of Concept Department</h1>
            </Link>
            <div className="ml-auto hidden md:block">
              <AuthButton />
            </div>
          </div>
        </div>
      </header>
      {/* sidebar and main contaits */}
      <div className="container md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        {/* sidebar */}
        <aside className="fixed md:sticky top-16 z-30 hidden md:block border-r h-[calc(100vh-4.1rem)]">
          <div className="py-6 px-2 lg:py-8">
            <DashboardNav />
          </div>
        </aside>
        {/* main contents */}
        <main className="flex w-full flex-col overflow-hidden p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
