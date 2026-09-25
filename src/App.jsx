import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import CursorLabel from './components/CursorLabel.jsx'
import Thinking from './components/Thinking.jsx'
import Home from './pages/Home.jsx'

const load = {
  work: () => import('./pages/Work.jsx'),
  project: () => import('./pages/Project.jsx'),
  lab: () => import('./pages/Lab.jsx'),
  experiment: () => import('./pages/Experiment.jsx'),
  notes: () => import('./pages/Notes.jsx'),
  note: () => import('./pages/Note.jsx'),
  about: () => import('./pages/About.jsx'),
  index: () => import('./pages/Index.jsx'),
  clone: () => import('./features/clone/ClonePage.jsx'),
  notFound: () => import('./pages/NotFound.jsx'),
}

const Work = lazy(load.work)
const Project = lazy(load.project)
const Lab = lazy(load.lab)
const Experiment = lazy(load.experiment)
const Notes = lazy(load.notes)
const Note = lazy(load.note)
const About = lazy(load.about)
const Index = lazy(load.index)
const ClonePage = lazy(load.clone)
const NotFound = lazy(load.notFound)

function ScrollReset() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function usePrefetchRoutes() {
  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb) => setTimeout(cb, 1200))
    const id = idle(() => Object.values(load).forEach((fn) => fn()))
    return () => (window.cancelIdleCallback ?? clearTimeout)(id)
  }, [])
}

export default function App() {
  usePrefetchRoutes()

  return (
    <>
      <a href="#main" className="skip mono">skip to content</a>
      <ScrollReset />
      <Nav />
      <main id="main" tabIndex={-1}>
        <Suspense fallback={<Thinking className="wrap page-thinking" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:slug" element={<Project />} />
            <Route path="/lab" element={<Lab />} />
            <Route path="/lab/:slug" element={<Experiment />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/notes/:slug" element={<Note />} />
            <Route path="/about" element={<About />} />
            <Route path="/index" element={<Index />} />
            <Route path="/me" element={<ClonePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <CursorLabel />
    </>
  )
}
