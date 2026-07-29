# Sacramento Special Report

Modern editorial rebuild of the Sacramento Special Report website.

## Current migration status

- Premium responsive front page
- Local copies of the original SSR logo and homepage imagery
- Article templates for the lead package
- A complete inventory of all 38 original Google Sites pages
- Production-ready social sharing artwork

The `/archive` route is the migration ledger. It preserves the title, original
path, category, and source link for every page discovered on the legacy site.

## Local development

```sh
pnpm install
pnpm dev
```

## Build

```sh
pnpm build
```

The long-term publishing target is GitHub Pages. A GitHub repository must be
created or connected before the Pages workflow can be added and activated.
