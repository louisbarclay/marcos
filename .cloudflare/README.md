# Cloudflare Pages Configuration

## Compatibility Flags

This project requires the `nodejs_compat` compatibility flag to be enabled in Cloudflare Pages settings.

### How to Enable:

1. Go to your Cloudflare Pages project dashboard
2. Navigate to **Settings** → **Functions** → **Compatibility Flags**
3. Add `nodejs_compat` to both:
   - **Production environment**
   - **Preview environment**
4. Save the changes

### Why is this needed?

The build script (`scripts/generate-data.ts`) uses Node.js APIs (`fs`, `path`) to read YAML files and generate the static data module. While the runtime API routes use Edge Runtime, the build process itself requires Node.js compatibility.
