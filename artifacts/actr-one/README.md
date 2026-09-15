# actr.one — Actor OS (rebuilt)

A working career command center for actors. Rebuilt from the original Next.js mock into a modern studio-grade web app with real features.

## What works

- Cinematic landing → enter the studio
- Overview with live career health, pipeline, streak, and focus rail
- Auditions: add, edit, delete, status changes, filters
- Self-tapes with checklists you can complete and extend
- Scripts & notes with create / edit / delete
- Training log with weekly minutes and streak
- Analytics computed from your actual board
- Career coach that answers from your data
- Command palette (`⌘K` / `Ctrl+K`) to search and jump
- Three themes (Studio Light, Carbon Noir, Electric Cobalt)
- Profile settings and demo-data reset
- Everything persists in `localStorage`

## Run locally

Open `index.html` in a browser, or:

```bash
python3 -m http.server 4173 --directory .
```

Then visit http://localhost:4173
