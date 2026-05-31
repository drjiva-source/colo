// lib/sanity/test.ts
import { client } from "./client";

export async function testSanity() {
  const result = await client.fetch(`*[_type == "news"][0]`);
  console.log(" Sanity conectado:", result);
  return result;
}