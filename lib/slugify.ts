export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
}