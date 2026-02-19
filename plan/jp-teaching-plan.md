# Japanese Teaching Activities Plan — Primary School (Ages 5–10)

Build 9 offline-capable, interactive-whiteboard-optimised web tools using **Bun + Next.js 15**, hosted on **GitHub Pages**, for 3 age-banded Japanese intro lessons where children vote on the day.

---

## Confirmed Details

- **Sessions:** 3 total — one per age band
- **Display:** Interactive whiteboard (touch-capable)
- **Voting:** On the day → **all 9 tools must be built**
- **Your Japanese level:** N3 (intermediate) → tools focus on children's UX, not your pronunciation
- **Connectivity:** Offline-capable preferred (hotspot backup available)
- **Runtime:** Bun
- **Framework:** Next.js 15 (App Router, static export)
- **Hosting:** GitHub Pages (free) — static export via `output: 'export'` in `next.config.ts`
- **Fallback:** Can also run locally via `bun run dev` or serve the `out/` folder

---

## 5-Day Build Schedule

| Day           | Evening                         | What to Build                                                                             |
| ------------- | ------------------------------- | ----------------------------------------------------------------------------------------- |
| **1 (Today)** | Project scaffold + Band A tools | Next.js project init, shared components, Animal Sounds, Colour Spinner, Greetings Karaoke |
| **2**         | Band B tools                    | Number Ninja, Body Parts Dance, Food Menu                                                 |
| **3**         | Band C tools                    | Hiragana Decoder, Jikoshoukai Builder, Kanji Evolution                                    |
| **4**         | Polish + audio + deploy         | Source/record audio, test touch interactions, deploy to GitHub Pages                      |
| **5**         | Dry run                         | Test on actual whiteboard if possible, prepare physical backups                           |

---

## Age Group Bands

| Band | UK Years       | Ages | Cognitive Stage                  |
| ---- | -------------- | ---- | -------------------------------- |
| A    | Reception / Y1 | 5–6  | Pre-operational → early concrete |
| B    | Y2 / Y3        | 6–8  | Concrete operational             |
| C    | Y4 / Y5 / Y6   | 8–10 | Concrete → early formal          |

---

## Band A: Reception / Y1 (Ages 5–6)

### Activity Option 1: "Animal Sounds Around the World"

**What:** Children learn 5–6 animal names in Japanese (inu, neko, tori, etc.) through a call-and-response game. Teacher says the English animal, children respond with the Japanese word + the Japanese onomatopoeia for the animal sound (e.g. wan-wan for dog).

**Educational Value:**

- **Phonological awareness** — hearing and reproducing unfamiliar sounds builds early literacy skills
- **Cross-cultural awareness** — discovering that animals "sound different" in other languages is mind-blowing at this age

**Learning Theories:**

- **Total Physical Response (TPR, Asher)** — pairing words with gestures/movements (act like the animal) aids retention
- **Krashen's Input Hypothesis** — comprehensible, fun input in a low-anxiety environment

**Digital Tool:** A simple web app showing animated animal images that play the Japanese word + sound when tapped. Big, colourful buttons. Could be projected or used on a tablet.

---

### Activity Option 2: "Colour Hunt — Iro Sagashi"

**What:** Teach 5–6 colour names in Japanese (aka, ao, kiiro, midori, shiro, kuro). Then do a classroom colour hunt — children find objects of each colour and shout the Japanese word.

**Educational Value:**

- **Vocabulary through physical context** — associating words with real objects
- **Active learning** — movement-based, suits short attention spans

**Learning Theories:**

- **TPR (Asher)** — physical movement paired with language
- **Experiential Learning (Kolb)** — concrete experience → reflection → learning
- **Constructivism (Piaget)** — children build meaning through interaction with environment

**Digital Tool:** A projected "Colour Wheel Spinner" web app — spins and lands on a colour, displays the Japanese word + pronunciation audio. Adds excitement/randomness.

---

### Activity Option 3: "Greetings Song & Role Play"

**What:** Learn 4–5 greetings (konnichiwa, ohayou, sayounara, arigatou, sumimasen) through a simple song/chant with actions, then pair up for mini role-plays (bowing, greeting each other).

**Educational Value:**

- **Pragmatic/social language** — functional phrases children can actually use
- **Cultural learning** — bowing, politeness norms

**Learning Theories:**

- **Sociocultural Theory (Vygotsky)** — learning through social interaction, scaffolded by teacher
- **Audio-Lingual Method** — repetition and pattern drills through song
- **TPR** — physical gestures (bowing) paired with words

**Digital Tool:** A "Greeting Karaoke" screen — displays the word in romaji + hiragana with a bouncing-ball style highlight synced to audio. Visual + auditory reinforcement.

---

## Band B: Y2 / Y3 (Ages 6–8)

### Activity Option 1: "Number Ninja — Kazu Game"

**What:** Learn numbers 1–10 in Japanese. Play a "Number Ninja" game: teacher calls a number in Japanese, children must slap/touch the correct number card on their table (like a competitive snap game). Progress to simple addition in Japanese.

**Educational Value:**

- **Cross-curricular (maths + languages)** — reinforces numeracy while learning Japanese
- **Competitive element** — high engagement for this age group

**Learning Theories:**

- **Gamification (Deterding et al.)** — game mechanics (competition, speed) increase motivation
- **Dual Coding Theory (Paivio)** — visual number + auditory Japanese word = stronger memory trace
- **Behaviourism (Skinner)** — immediate reinforcement through winning/speed feedback

**Digital Tool:** A web-based "Number Ninja" game projected on screen — displays a grid of numbers, plays audio of a Japanese number, children (or teams) race to identify it. Tracks score. Could also work as a buzzer-style team quiz.

---

### Activity Option 2: "Body Parts Dance — Karada no Uta"

**What:** Learn 6–8 body part words in Japanese (atama, kata, hiza, te, me, mimi, kuchi, hana) through a "Head Shoulders Knees and Toes" style song but in Japanese, with increasing speed.

**Educational Value:**

- **Kinaesthetic learning** — whole-body engagement
- **Pattern recognition** — song structure helps memorisation
- **Cultural bridge** — familiar song format, new language

**Learning Theories:**

- **TPR (Asher)** — the gold standard for young language learners
- **Scaffolding (Bruner)** — start slow, increase speed = graduated challenge
- **Multiple Intelligences (Gardner)** — musical, bodily-kinaesthetic, linguistic

**Digital Tool:** An animated character on screen that highlights body parts as the song plays, with speed controls. Children follow along. Think "Simon Says" meets karaoke.

---

### Activity Option 3: "Japanese Food Market — Omise-ya-san"

**What:** Learn 6–8 food words (sushi, ramen, onigiri, mochi, tempura, edamame, etc.) through a pretend market stall role-play. Children take turns being shopkeeper and customer using simple phrases: "** kudasai" (** please) and "hai, douzo" (here you go).

**Educational Value:**

- **Functional language** — transactional phrases usable in real life
- **Cultural knowledge** — Japanese food culture
- **Social skills** — turn-taking, politeness

**Learning Theories:**

- **Communicative Language Teaching (CLT)** — focus on meaningful communication
- **Sociocultural Theory (Vygotsky)** — peer interaction in ZPD
- **Situated Learning (Lave & Wenger)** — learning in context that mimics real use

**Digital Tool:** A "Food Menu" app projected on screen showing illustrated Japanese foods with names in romaji + hiragana + audio pronunciation. Could include a simple drag-and-drop "order" interface for the interactive whiteboard.

---

## Band C: Y4 / Y5 / Y6 (Ages 8–10)

### Activity Option 1: "Hiragana Detective — Crack the Code"

**What:** Introduce 5–10 basic hiragana characters (a, i, u, e, o + ka, ki, ku, ke, ko). Children learn to recognise them, then solve a "secret message" puzzle where they decode a word written in hiragana using a reference sheet.

**Educational Value:**

- **Script literacy** — introduces a real writing system, stretches beyond romanisation
- **Problem-solving** — decoding is cognitively engaging
- **Growth mindset** — "I can read Japanese!" moment

**Learning Theories:**

- **Discovery Learning (Bruner)** — children figure out the message themselves
- **Cognitive Load Theory (Sweller)** — limited character set keeps load manageable
- **Self-Determination Theory (Deci & Ryan)** — autonomy (solving it themselves) + competence (success) = intrinsic motivation

**Digital Tool:** A "Hiragana Decoder" web app — children type/select hiragana characters and see the romaji translation build up. Could include a timed challenge mode and multiple secret messages of increasing difficulty. Could also have a "draw the hiragana" canvas with stroke order animation.

---

### Activity Option 2: "Self-Introduction Challenge — Jikoshoukai"

**What:** Children learn to introduce themselves in Japanese: "Watashi no namae wa ** desu. ** sai desu. ** ga suki desu." (My name is **. I am ** years old. I like **.) They practise in pairs, then volunteer to present to the class.

**Educational Value:**

- **Sentence structure** — introduces basic Japanese grammar (topic-comment, particles)
- **Personalisation** — using their own name/age/interests makes it meaningful
- **Public speaking** — builds confidence

**Learning Theories:**

- **CLT** — genuine communicative purpose
- **Personalisation Principle (Mayer)** — personalised content improves learning
- **Social Learning Theory (Bandura)** — modelling (teacher demos first), then peer observation
- **ZPD (Vygotsky)** — scaffolded sentence frames

**Digital Tool:** A "Jikoshoukai Builder" web app — children fill in blanks (name, age, favourite thing from a picture grid), and the app generates their introduction in romaji + hiragana + audio playback. They can practise listening to "their" sentence before presenting. Could generate a printable "Japanese ID card" as a takeaway.

---

### Activity Option 3: "Emoji Pictionary — Kanji Origins"

**What:** Show how some kanji evolved from pictures (山 = mountain, 川 = river, 木 = tree, 日 = sun, 月 = moon, 火 = fire, 水 = water). Children guess what each kanji means from its pictographic origin, then play a drawing game where they try to draw the kanji from memory.

**Educational Value:**

- **Visual literacy** — understanding that writing systems can be pictographic
- **Art + language integration** — drawing reinforces memory
- **Cultural depth** — understanding the "why" behind Japanese writing

**Learning Theories:**

- **Dual Coding Theory (Paivio)** — visual (picture) + verbal (meaning) = strong encoding
- **Elaborative Interrogation** — "why does it look like that?" deepens processing
- **Levels of Processing (Craik & Lockhart)** — drawing = deep processing vs. shallow rote

**Digital Tool:** A "Kanji Evolution" animation app — shows the ancient pictograph morphing into the modern kanji with smooth animation. Then a "Draw It" canvas where children trace/draw the kanji and get feedback. Could include a quiz mode: "Which kanji means mountain?"

---

## Digital Tools — Build Plan

**All 9 tools will be built** (children vote on the day). Single Next.js project, offline-capable, touch-optimised for interactive whiteboard.

### Tech Stack

- **Bun** — runtime + package manager (`bun install`, `bun run dev`, `bun run build`)
- **Next.js 15** — App Router, static export (`output: 'export'` in `next.config.ts`)
- **TypeScript** — strict mode
- **Tailwind CSS v4** — fast styling, large touch targets
- **shadcn/ui** — polished component primitives (Button, Card, Dialog, etc.)
- **Lucide React** — icons
- **Framer Motion** — animations (kanji morphing, spinner, transitions)
- **Web Speech Synthesis API** — Japanese pronunciation (offline on most OS)
- **Canvas API** — drawing features (Kanji Evolution, Hiragana Decoder)
- **GitHub Pages** — free hosting via GitHub Actions workflow (`next build` → deploy `out/`)

### Project Structure (Next.js App Router)

```
jp-teaching/
├── app/
│   ├── layout.tsx                    # Root layout (fonts, Tailwind, nav)
│   ├── page.tsx                      # Home — band selector dashboard
│   ├── band-a/
│   │   ├── page.tsx                  # Band A menu (3 activity cards)
│   │   ├── animal-sounds/page.tsx
│   │   ├── colour-spinner/page.tsx
│   │   └── greetings-karaoke/page.tsx
│   ├── band-b/
│   │   ├── page.tsx                  # Band B menu
│   │   ├── number-ninja/page.tsx
│   │   ├── body-parts-dance/page.tsx
│   │   └── food-market/page.tsx
│   └── band-c/
│       ├── page.tsx                  # Band C menu
│       ├── hiragana-decoder/page.tsx
│       ├── jikoshoukai-builder/page.tsx
│       └── kanji-evolution/page.tsx
├── components/
│   ├── ui/                           # shadcn/ui components
│   ├── AudioButton.tsx               # Tap-to-play pronunciation
│   ├── BackButton.tsx                # Persistent nav
│   └── TouchCard.tsx                 # Large touch-friendly card
├── lib/
│   ├── data/                         # Vocabulary JSON data files
│   ├── audio.ts                      # Web Speech Synthesis helper
│   └── utils.ts                      # shadcn/ui cn() helper
├── public/
│   └── audio/                        # Fallback MP3 pronunciation files
├── next.config.ts
├── tailwind.config.ts
├── package.json
├── bun.lock
├── tsconfig.json
└── .github/
    └── workflows/
        └── deploy.yml                # GitHub Pages deploy action
```

### GitHub Pages Deployment

- `next.config.ts` sets `output: 'export'` and `basePath: '/<repo-name>'`
- GitHub Actions workflow: on push to `main` → `bun install` → `bun run build` → deploy `out/` to GitHub Pages
- **Offline fallback:** You can also copy the `out/` folder to a USB and serve it locally with `bunx serve out/`

### UX Principles for Interactive Whiteboard

- **Large touch targets** — minimum 64px buttons, generous spacing
- **High contrast** — dark text on light backgrounds, vibrant colours
- **No hover states** — touch only, no tooltips
- **Audio feedback** — sounds on tap for younger children
- **Simple navigation** — back button always visible, no deep nesting
- **Teacher controls** — small gear icon for speed/difficulty settings
- **All pages are `'use client'`** — interactive tools need client-side state

---

## Lesson Flow Template (All Bands)

1. **Hook (3 min):** Fun fact or visual about Japan (projected on whiteboard)
2. **Vote (2 min):** Show 3 activity cards on whiteboard, children raise hands
3. **Teach (10 min):** Introduce vocabulary using the digital tool
4. **Activity (15–20 min):** Main chosen activity (mix of whiteboard + physical)
5. **Wrap-up (5 min):** Quick review, teach "sayounara" + bow

---

## Audio Strategy

Since you're N3, you can pronounce everything yourself live. The tools serve as **visual + audio reinforcement**:

- **Primary:** Web Speech Synthesis API with Japanese voice (works offline on most OS — Windows, macOS, ChromeOS all ship Japanese voices)
- **Fallback:** You record short MP3s of key vocabulary → placed in `public/audio/`
- **Static export:** Next.js static export bundles everything into `out/` — no server needed, all assets available offline

---

## Physical Backup Plan

In case of tech failure on the day:

- **Printed flashcards** for each activity's vocabulary (you mentioned you have paper)
- **Whiteboard markers** for manual versions of games
- Your N3 Japanese carries the lesson — the tools enhance, not replace
