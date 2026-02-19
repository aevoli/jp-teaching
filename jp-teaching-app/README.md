# にほんご — Japanese Teaching App

Interactive Japanese lessons for UK primary school children (ages 5–10), built with Next.js 15 + Bun. Designed for interactive whiteboards with large touch targets and offline-capable audio.

## Stack

- **Runtime:** Bun
- **Framework:** Next.js 16 (App Router, static export)
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Animation:** Framer Motion
- **Audio:** Web Speech Synthesis API (offline, Japanese voice)
- **Hosting:** GitHub Pages

## Running Locally

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build & Deploy

```bash
bun run build   # outputs to /out
```

Push to `main` → GitHub Actions automatically deploys to GitHub Pages.

**Offline / USB use:** Copy the `out/` folder to a USB stick and serve with:

```bash
bunx serve out/
```

## Activities

| Band | Years          | Ages | Activities                                             |
| ---- | -------------- | ---- | ------------------------------------------------------ |
| A    | Reception / Y1 | 5–6  | Animal Sounds, Colour Spinner, Greetings Karaoke       |
| B    | Y2 / Y3        | 6–8  | Number Ninja, Body Parts Dance, Food Market            |
| C    | Y4–Y6          | 8–10 | Hiragana Decoder, Jikoshoukai Builder, Kanji Evolution |

## GitHub Pages Setup

1. Push this repo to GitHub
2. Go to **Settings → Pages → Source → GitHub Actions**
3. Push to `main` — the workflow in `.github/workflows/deploy.yml` handles the rest

If deploying to a non-root path (e.g. `https://user.github.io/repo-name/`), add to `next.config.ts`:

```ts
basePath: '/repo-name',
assetPrefix: '/repo-name/',
```
