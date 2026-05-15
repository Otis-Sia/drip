'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [identification, setIdentification] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: identification,
        password: securityCode,
      });

      if (authError) throw authError;

      // Redirect to admin dashboard on success
      router.push('/admin');
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-md3-on-surface-variant selection:bg-md3-surface-container-highest flex flex-col min-h-screen">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-black border-b border-md3-surface-container-highest flex justify-between items-center px-margin-mobile h-16">
        <div className="font-headline-md text-headline-md font-bold text-md3-on-background tracking-tighter">CEDAR</div>
        <div className="flex items-center gap-base">
          <button className="p-2 text-md3-on-surface-variant hover:bg-md3-surface-container-high transition-colors rounded">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center px-margin-mobile pt-24 pb-16">
        {/* Hero / Warning Section */}
        <section className="w-full max-w-[340px] mb-8 text-center">
          <div className="inline-flex flex-col items-center w-full border border-md3-error-container bg-md3-surface-container-lowest p-6 rounded">
            <span className="material-symbols-outlined text-md3-error mb-2">error_outline</span>
            <h1 className="font-headline-md text-headline-md text-md3-on-background mb-2">YOU ARE LOST</h1>
            <p className="font-body-sm text-body-sm text-md3-on-surface-variant">This is admin control, please find your way back</p>
          </div>
        </section>

        {/* Login Form Section */}
        <section className="w-full max-w-[340px] bg-md3-surface-container-low border border-[#1A1A1A] p-6 rounded shadow-2xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 bg-md3-error-container text-md3-on-error-container text-xs rounded border border-md3-error/20">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label className="block font-label-caps text-label-caps text-md3-on-surface-variant opacity-60">IDENTIFICATION</label>
              <input 
                className="w-full bg-transparent border-b border-[#404040] focus:border-md3-on-background focus:ring-0 text-md3-on-background font-body-lg text-body-lg placeholder:text-md3-on-surface-variant/30 px-0 py-2 transition-colors outline-none" 
                placeholder="identification" 
                type="email"
                value={identification}
                onChange={(e) => setIdentification(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <label className="block font-label-caps text-label-caps text-md3-on-surface-variant opacity-60">SECURITY CODE</label>
              <input 
                className="w-full bg-transparent border-b border-[#404040] focus:border-md3-on-background focus:ring-0 text-md3-on-background font-body-lg text-body-lg placeholder:text-md3-on-surface-variant/30 px-0 py-2 transition-colors outline-none" 
                placeholder="security code" 
                type="password"
                value={securityCode}
                onChange={(e) => setSecurityCode(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="pt-4">
              <button 
                className="w-full border border-md3-on-background text-md3-on-background py-4 font-label-caps text-label-caps tracking-widest hover:bg-md3-surface-container-high active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed" 
                type="submit"
                disabled={loading}
              >
                {loading ? 'AUTHENTICATING...' : 'AUTHENTICATE'}
              </button>
            </div>
          </form>
        </section>

        {/* Aesthetic Background Elements (Minimal) */}
        <div className="fixed inset-0 pointer-events-none -z-10 flex items-center justify-center opacity-5 overflow-hidden">
          <div className="min-w-[500px] min-h-[500px] border border-md3-surface-container-highest rounded-full"></div>
          <div className="absolute min-w-[350px] min-h-[350px] border border-md3-surface-container-highest rounded-full"></div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-black border-t border-md3-surface-container-highest">
        <div className="flex flex-col items-center w-full px-margin-mobile py-6">
          <div className="font-body-sm text-[10px] text-md3-on-surface-variant/60 uppercase tracking-widest">© 2024 Cedar . ALL RIGHTS RESERVED.</div>
        </div>
      </footer>
    </div>
  );
}
