import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { Dashboard } from '@/pages/Dashboard'
import { NotFound } from '@/pages/NotFound'

/* Lesson content and the heavier pages are code-split, so the first
   paint only carries the dashboard and the shell. */
const LessonPage = lazy(() => import('@/pages/LessonPage').then((m) => ({ default: m.LessonPage })))
const ModulePage = lazy(() => import('@/pages/ModulePage').then((m) => ({ default: m.ModulePage })))
const LearningPath = lazy(() =>
  import('@/pages/LearningPath').then((m) => ({ default: m.LearningPath })),
)
const ReviewPage = lazy(() => import('@/pages/ReviewPage').then((m) => ({ default: m.ReviewPage })))
const PracticePage = lazy(() =>
  import('@/pages/PracticePage').then((m) => ({ default: m.PracticePage })),
)
const GlossaryPage = lazy(() =>
  import('@/pages/GlossaryPage').then((m) => ({ default: m.GlossaryPage })),
)
const NotesPage = lazy(() => import('@/pages/NotesPage').then((m) => ({ default: m.NotesPage })))
const ExamPage = lazy(() => import('@/pages/ExamPage').then((m) => ({ default: m.ExamPage })))
const AssessmentPage = lazy(() =>
  import('@/pages/AssessmentPage').then((m) => ({ default: m.AssessmentPage })),
)

export default function App() {
  return (
    <AppShell>
      <ScrollToTop />
      <Suspense fallback={<PageSkeleton />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/path" element={<LearningPath />} />
          <Route path="/module/:moduleId" element={<ModulePage />} />
          <Route path="/lesson/:lessonId" element={<LessonPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/glossary" element={<GlossaryPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/exam" element={<ExamPage />} />
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AppShell>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

function PageSkeleton() {
  return (
    <div
      className="mx-auto max-w-3xl animate-pulse motion-reduce:animate-none"
      role="status"
      aria-label="Loading"
    >
      <div className="h-8 w-2/3 rounded-lg bg-sunken" />
      <div className="mt-3 h-4 w-full rounded bg-sunken" />
      <div className="mt-2 h-4 w-5/6 rounded bg-sunken" />
      <div className="mt-6 h-40 rounded-xl bg-sunken" />
      <div className="mt-4 h-24 rounded-xl bg-sunken" />
    </div>
  )
}
