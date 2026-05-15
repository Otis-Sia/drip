'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      // Don't check auth or redirect if we're already on the login page
      if (pathname === '/admin/login') {
        setLoading(false);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // Use replace to prevent the user from going back to the protected page
        router.replace('/admin/login');
      } else {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes to handle sign-out events globally
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' && pathname !== '/admin/login') {
        router.replace('/admin/login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [pathname, router]);

  // Show a loading state while verifying the session, unless it's the login page
  if (loading && pathname !== '/admin/login') {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-sm text-muted font-medium animate-pulse uppercase tracking-widest text-center">
            Verifying access...<br/>
            <span className="text-[10px] opacity-50">Please wait while we secure your session</span>
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
