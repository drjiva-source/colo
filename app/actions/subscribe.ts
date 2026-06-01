// app/actions/subscribe.ts
'use server';

export async function subscribe(formData: FormData) {
  const email = formData.get('email') as string;

  if (!email || !email.includes('@')) {
    return { success: false, error: 'Ingresa un email válido.' };
  }

  try {
    // 🔑 Configura tu servicio (ej. ConvertKit, Resend, o Formspree)
    const API_KEY = process.env.NEWSLETTER_API_KEY;
    const ENDPOINT = process.env.NEWSLETTER_ENDPOINT;

    if (!API_KEY || !ENDPOINT) {
      return { success: false, error: 'Configuración pendiente.' };
    }

    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ api_key: API_KEY, email }),
    });

    if (!res.ok) throw new Error('Fallo en suscripción');
    return { success: true, message: '✅ ¡Suscrito correctamente!' };
  } catch {
    return { success: false, error: 'Error al procesar. Intenta luego.' };
  }
}