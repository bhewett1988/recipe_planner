# Dinner Planner

A Gousto/HelloFresh-style weekly dinner planner for 2 adults + kids. Auto-generates a 7-day meal plan from a catalogue of 30 recipes, builds a smart shopping list, and lets you import new recipes from Instagram screenshots using GPT-4o vision.

## Features

- 30-recipe catalogue with macro info (~600 kcal / 50g protein per adult)
- Auto-generated weekly plan with one-tap swap
- Smart shopping list — staples (oils, herbs, spices, condiments) excluded by default
- Instagram/photo recipe import via GPT-4o (scales quantities to your macro targets automatically)
- Settings: adjust kcal/protein targets, number of adults and children

## Setup

```bash
npm install
npm run dev
```

## Deploy to Vercel

1. Push this repo to GitHub
2. Import into Vercel at vercel.com
3. Add environment variable:
   - `VITE_OPENAI_KEY` = your OpenAI API key
4. Deploy

Once deployed, the API key input field in the app will disappear — the key is loaded securely from the environment.

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_OPENAI_KEY` | OpenAI API key for recipe photo import (GPT-4o) |
