import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { schemaTypes } from './lib/sanity/schema';

export default defineConfig({
  name: 'default',
  title: 'Colo News CMS',
  projectId: 'itqv5t0l',
  dataset: 'production',
  plugins: [deskTool()],
  schema: { types: schemaTypes },
});
