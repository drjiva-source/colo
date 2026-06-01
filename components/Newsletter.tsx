// components/Newsletter.tsx
'use client';

import { useState } from 'react';
import { subscribe } from '@/app/actions/subscribe';

export function Newsletter() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  async function handleSubmit(formData: FormData) {
    setStatus('loading');
    const result = await subscribe(formData);
    setStatus(result.success ? 'success' : 'error');
    setMsg(result.message || result.error || '');
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-foreground mb-2">📬 Suscríbete</h3>
      <p className="text-sm text-muted-foreground mb-4">Recibe noticias cada mañana.</p>

      <form action={handleSubmit} className="flex flex-col gap-3">
        <input
          name="email"
          type="email"
          placeholder="tu@email.com"
          required
          disabled={status === 'loading' || status === 'success'}
          className="w-full bg-background border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
        />
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:bg-primary/90 transition disabled:opacity-50"
        >
          {status === 'loading' ? 'Enviando...' : status === 'success' ? '¡Listo!' : 'Suscribirse'}
        </button>
      </form>

      {msg && (
        <p className={`mt-3 text-sm font-medium ${status === 'success' ? 'text-green-600' : 'text-red-500'}`}>
          {msg}
        </p>
      )}
    </div>
  );
}