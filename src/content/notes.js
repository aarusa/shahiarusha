/**
 * NOTES — read like a blog. Text, images and code share one column.
 * { type: 'image' | 'screenshot', src, alt, caption }
 * { type: 'code', lang, caption, text }
 */
export const CATEGORY_COLOR = { ai: 'blue', personal: 'pink', engineering: 'lime' }

export const notes = [
  {
    slug: 'why-i-still-dont-really-understand-ai',
    title: 'Why I still don’t really understand AI',
    date: '2026-08-30',
    category: 'ai',
    tags: ['llms', 'learning', 'honesty'],
    content: [
      { type: 'p', text: 'I have been reading about neural networks since 2017. I can explain backpropagation on a napkin. I have built things with language models that real people use.' },
      { type: 'p', text: 'And I still don’t really understand why they work as well as they do.' },
      { type: 'aside', text: 'neither do most people. that helps a little.' },
      { type: 'p', text: 'I used to think that was a gap I needed to close before I was allowed to call myself someone who works with AI. Now I think the not-understanding is the job. The curiosity is the useful part.' },
      { type: 'quote', text: 'Understanding is not a place you arrive. It’s a direction you keep walking in.' },
      { type: 'p', text: 'So, for now: I keep building small things, reading papers I only half follow, and writing down what surprises me.' },
    ],
  },
  {
    slug: 'what-i-learned-building-a-chatbot-in-2018',
    title: 'What I learned from building a chatbot in 2018',
    date: '2026-06-02',
    category: 'engineering',
    tags: ['pricy', 'chatbots', 'history'],
    content: [
      { type: 'p', text: 'Pricy was my first capstone. A chatbot that compared prices. It sounded simple when I proposed it.' },
      { type: 'screenshot', src: '/notes/pricy-terminal.svg?v=2', alt: 'Pricy running in a Python terminal: hello, then a search for cheap headphones, then an apology.', caption: 'the whole personality of pricy.py' },
      { type: 'h', text: 'things 2018 me learned' },
      { type: 'list', items: ['users never say what you expect', '“intent classification” is a fancy name for guessing', 'Stack Overflow answers from 2012 are still load-bearing', 'sleep is not optional, despite evidence to the contrary'] },
      { type: 'code', lang: 'python', caption: 'pricy.py, 2018', text: `if "cheap" in msg or "cheapest" in msg or "low price" in msg:
    intent = "find_cheapest"   # there were 40 of these` },
      { type: 'p', text: 'Most of what I fought with that year is now a single API call. That used to make me feel like my effort was wasted. Now I think it’s why I can tell when the API call is wrong.' },
    ],
  },
  {
    slug: 'why-i-keep-starting-side-projects',
    title: 'Why I keep starting side projects',
    date: '2026-03-18',
    category: 'personal',
    tags: ['side projects', 'curiosity'],
    content: [
      { type: 'p', text: 'I have a folder called “projects”. It has 61 things in it. Maybe nine of them are finished.' },
      { type: 'p', text: 'For a long time I felt bad about the other 52. Lately I don’t. Each one is a question I got curious about, answered just enough, and put down.' },
      { type: 'aside', text: 'the lab is basically this folder, but public' },
      { type: 'p', text: 'Some of them turned into real products. Most of them turned into something I know now that I didn’t before. That seems like a fair trade.' },
    ],
  },
  {
    slug: 'what-happens-when-i-let-an-llm-write-my-code',
    title: 'What happens when I let an LLM write my code',
    date: '2025-11-04',
    category: 'ai',
    tags: ['llms', 'coding', 'tools'],
    content: [
      { type: 'p', text: 'For one month I let a model write the first draft of everything. Here is the short version.' },
      { type: 'image', src: '/notes/draft-and-review.svg?v=2', alt: 'Two panels: a long generated draft, and a much shorter version of what was kept.', caption: 'most of the draft did not survive the edit' },
      { type: 'list', items: ['I shipped faster', 'I understood less of what I shipped', 'I got better at reading code', 'I got worse at starting from a blank file'] },
      { type: 'p', text: 'The thing nobody told me: the work moves. It doesn’t disappear. You stop typing and start reviewing, deciding, noticing.' },
      { type: 'quote', text: 'Taste turned out to be the part it couldn’t do for me.' },
    ],
  },
  {
    slug: 'reacting-to-my-own-code-from-2019',
    title: 'Reacting to my own code from 2019',
    date: '2025-05-21',
    category: 'engineering',
    tags: ['old code', 'growth', 'cringe'],
    content: [
      { type: 'p', text: 'Found an old repository. Opened it. Closed it. Opened it again.' },
      { type: 'screenshot', src: '/notes/2019-editor.svg?v=2', alt: 'A 2019 editor window showing doTheThing.js, with a note that it was used every day for two years.', caption: 'doTheThing.js, still open' },
      { type: 'code', lang: 'javascript', caption: '2019, unedited', text: `function doTheThing(data, data2, flag, otherFlag) {
  // TODO: fix this properly
  // (it was never fixed properly)` },
      { type: 'p', text: 'It’s bad. It also worked, and someone used it every day for two years. I think I was kinder to that code’s users than I was to its future maintainer, who was me.' },
      { type: 'aside', text: 'hello 2019 me. it gets better. the variable names don’t, but the rest does.' },
    ],
  },
]

export const getNote = (slug) => notes.find((n) => n.slug === slug)
