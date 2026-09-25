export const STATUSES = ['BUILDING', 'BROKEN', 'TESTING', 'CURIOUS', 'ABANDONED', 'WORKS', "I DON'T KNOW YET"]

export const experiments = [
  {
    id: 1,
    slug: 'pricy-again',
    title: 'Pricy, again.',
    date: '2026-09-02',
    type: 'chatbot',
    status: 'WORKS',
    duration: '3 HOURS',
    description: 'Rebuilt my 2018 chatbot’s brain from memory. It is mostly regex. It was always mostly regex.',
    learned: 'Most of what felt like magic in 2018 was pattern matching and hope.',
    note: 'try saying hi',
    color: 'blue',
    size: 'm',
  },
  {
    id: 3,
    slug: 'xor-by-hand',
    title: 'Teaching a tiny network XOR, by hand.',
    date: '2017-11-20',
    type: 'neural networks',
    status: 'WORKS',
    duration: '2 WEEKS',
    size: 'l',
    tried: 'Two layers, no libraries, a paper printed out next to the laptop.',
    learned: 'Backpropagation is just blame, passed backwards, politely.',
    code: {
      lang: 'python',
      text: `# 2017. I did not know numpy yet.
w1 = [[0.5, -0.2], [0.3, 0.8]]
for epoch in range(10000):
    for x, y in data:
        h = [sigmoid(dot(x, w)) for w in w1]
        out = sigmoid(dot(h, w2))
        # ...backprop I copied from a paper
        # and then spent a week understanding`,
    },
    note: 'the week I understood backprop',
  },
  {
    id: 7,
    slug: 'can-an-llm-do-this',
    title: '“Can an LLM do this?”',
    date: '2025-03-11',
    type: 'LLM',
    status: 'TESTING',
    description: 'Gave a model my university assignments from 2017. It did them in 40 seconds. I have feelings about this.',
    size: 's',
  },
  {
    id: 9,
    slug: 'rental-scraper',
    title: 'Scraping every rental in my suburb',
    date: '2024-02-04',
    type: 'scraping',
    status: 'ABANDONED',
    duration: '1 WEEKEND',
    description: 'Stopped when I found a place to live.',
    size: 's',
  },
  {
    id: 12,
    slug: 'receipt-agent',
    title: 'An agent that files my receipts',
    date: '2026-06-18',
    type: 'agent',
    status: 'BROKEN',
    description: 'I thought this would work.',
    learned: 'Categorisation needs examples, not vibes.',
    output: `> agent: found 14 receipts
> agent: categorised 14 receipts
> agent: all 14 are “coffee”`,
    size: 'm',
  },
  {
    id: 14,
    slug: 'explain-it-to-2017-me',
    title: 'Explain neural networks to me, in 2017.',
    date: '2026-01-09',
    type: 'prompt',
    status: 'WORKS',
    output: `Imagine a lot of tiny dials.
You turn them a little every time
you're wrong. Eventually you're
wrong less often. That's it.
That's the whole thing.`,
    note: 'would have saved me 6 months',
    size: 'm',
  },
  {
    id: 16,
    slug: 'only-at-night',
    title: 'A website that only works at night',
    date: '2026-08-21',
    type: 'web',
    status: 'CURIOUS',
    description: 'Come back after 9pm.',
    color: 'lavender',
    size: 's',
    expires: '2026-12-31',
  },
  {
    id: 19,
    slug: 'voice-memo-todo',
    title: 'Voice memo → to-do list',
    date: '2025-10-02',
    type: 'prototype',
    status: 'WORKS',
    duration: '3 HOURS',
    description: 'Speech-to-text, a small model and one very long prompt. I still use it every morning.',
    size: 's',
  },
  {
    id: 21,
    slug: 'embedding-my-notes',
    title: 'Embedding every note I’ve ever written',
    date: '2025-07-15',
    type: 'embeddings',
    status: 'TESTING',
    description: 'Searching my own brain by meaning. Found a lot of half-ideas from 2019.',
    code: {
      lang: 'python',
      text: `hits = index.query(
  embed("that idea about plants"),
  top_k=5,
)
# returns 5 notes. none about plants.`,
    },
    size: 'm',
  },
  {
    id: 23,
    slug: 'local-model',
    title: 'Running a local model on my laptop',
    date: '2026-04-30',
    type: 'LLM',
    status: 'WORKS',
    output: `tokens/sec: 14
fan: loud
me: delighted`,
    color: 'lime',
    size: 's',
  },
  {
    id: 24,
    slug: 'colour-of-a-word',
    title: 'What colour is a word?',
    date: '2026-05-12',
    type: 'weird idea',
    status: "I DON'T KNOW YET",
    description: 'Mapping embeddings to colours. “Tuesday” is apparently beige.',
    color: 'yellow',
    size: 's',
  },
  {
    id: 26,
    slug: 'tabs-vs-spaces',
    title: 'Two agents arguing about tabs vs spaces',
    date: '2026-07-07',
    type: 'agents',
    status: 'ABANDONED',
    description: 'They agreed after 3 turns. Very disappointing.',
    size: 's',
  },
  {
    id: 27,
    slug: 'no-buttons',
    title: 'An interface with no buttons',
    date: '2026-09-15',
    type: 'interface',
    status: 'BUILDING',
    description: 'You just type what you want. Harder than it sounds. Mostly because I keep adding buttons.',
    color: 'orange',
    size: 'm',
  },
]

export const getExperiment = (slug) => experiments.find((e) => e.slug === slug)
export const isExpired = (exp, now = new Date()) => Boolean(exp.expires) && new Date(exp.expires) < now
export const liveExperiments = () =>
  experiments.filter((e) => !isExpired(e)).sort((a, b) => b.date.localeCompare(a.date))

export const variantOf = (e) => (e.code ? 'code' : e.color ? 'note' : e.output ? 'output' : 'plain')

export function deskSample(variants = ['note', 'output', 'plain']) {
  const live = liveExperiments()
  return variants.map((v) => live.find((e) => variantOf(e) === v)).filter(Boolean)
}
