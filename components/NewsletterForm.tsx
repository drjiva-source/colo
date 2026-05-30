// components/NewsletterForm.tsx
'use client'; // 👈 Esto lo convierte en Client Component

export function NewsletterForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Tu lógica aquí
  };
  
  return (
    <form onSubmit={handleSubmit} className="...">
      {/* ... */}
    </form>
  );
}