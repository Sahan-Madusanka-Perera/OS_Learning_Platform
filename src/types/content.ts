/* ============================================================
   Content model
   ------------------------------------------------------------
   Course content is data, not components. A lesson is an ordered
   list of typed blocks; the renderer maps each block type to a
   presentation component. Adding a new lesson (or a whole new
   competency) means adding data — never rewriting the app.
   ============================================================ */

export type BlockId = string

/* ---------- Rich inline text ----------
   A tiny markup subset is supported inside `text` fields:
     **bold**            → emphasis
     `code`              → inline code / identifiers
     [[term-id|label]]   → clickable glossary term
   Parsed at render time by lib/inline.tsx.                     */

/* ---------- Lesson blocks ---------- */

export interface ProseBlock {
  kind: 'prose'
  /** One paragraph per entry. Keep each under ~60 words. */
  paragraphs: string[]
}

export interface HeadingBlock {
  kind: 'heading'
  text: string
  /** `sub` renders smaller, for grouping inside a long section. */
  level?: 'main' | 'sub'
}

export interface KeyIdeaBlock {
  kind: 'keyIdea'
  title?: string
  text: string
}

export interface AnalogyBlock {
  kind: 'analogy'
  title: string
  /** The everyday picture. */
  everyday: string
  /** How the picture maps onto the real technical idea. */
  mapsTo: string
}

export interface DefinitionBlock {
  kind: 'definition'
  term: string
  /** Plain-English first pass — no jargon allowed here. */
  simple: string
  /** The precise wording a student should be able to write in an exam. */
  technical: string
  example?: string
}

export interface ListBlock {
  kind: 'list'
  title?: string
  style?: 'bullet' | 'number' | 'check' | 'cross'
  items: string[]
}

export interface CompareBlock {
  kind: 'compare'
  title?: string
  /** Column headers, e.g. ['Feature', 'FAT', 'NTFS'] */
  headers: string[]
  rows: string[][]
  caption?: string
}

export interface StepsBlock {
  kind: 'steps'
  title?: string
  steps: { title: string; detail: string }[]
}

export interface MisconceptionBlock {
  kind: 'misconception'
  /** What students commonly (and wrongly) believe. */
  wrong: string
  /** What is actually true. */
  right: string
  why?: string
}

export interface ExamTipBlock {
  kind: 'examTip'
  text: string
  /** Optional model phrasing to reproduce under exam conditions. */
  modelAnswer?: string
}

export interface ConfusedBlock {
  kind: 'confused'
  /** The question the confused student is silently asking. */
  question: string
  /** Layer 1: an even simpler retelling. */
  simpler: string
  /** Layer 2: a picture in words. */
  picture?: string
  /** Layer 3: prerequisite to revisit. */
  prerequisite?: { label: string; lessonId: string }
}

export interface RecallBlock {
  kind: 'recall'
  /** Asked *before* the answer is available — active retrieval. */
  prompt: string
  answer: string
  hint?: string
}

export interface TeachBackBlock {
  kind: 'teachBack'
  prompt: string
  /** Points the student checks their own explanation against. */
  checklist: string[]
}

export interface VizBlock {
  kind: 'viz'
  /** Key into components/viz/registry.tsx */
  viz: string
  title?: string
  caption?: string
  /** Free-form props forwarded to the visualisation. */
  props?: Record<string, unknown>
}

export interface WorkedExampleBlock {
  kind: 'worked'
  title: string
  problem: string
  steps: { title: string; detail: string }[]
  answer: string
}

export interface QuickCheckBlock {
  kind: 'quickCheck'
  /** Question ids drawn from the module's question bank. */
  questionIds: string[]
  title?: string
}

export interface CalloutBlock {
  kind: 'callout'
  tone: 'info' | 'warn' | 'success' | 'note' | 'danger'
  title?: string
  text: string
}

export interface TableBlock {
  kind: 'table'
  title?: string
  headers: string[]
  rows: string[][]
  caption?: string
}

export interface CodeBlock {
  kind: 'code'
  title?: string
  lines: string[]
  caption?: string
}

export type LessonBlock =
  | ProseBlock
  | HeadingBlock
  | KeyIdeaBlock
  | AnalogyBlock
  | DefinitionBlock
  | ListBlock
  | CompareBlock
  | StepsBlock
  | MisconceptionBlock
  | ExamTipBlock
  | ConfusedBlock
  | RecallBlock
  | TeachBackBlock
  | VizBlock
  | WorkedExampleBlock
  | QuickCheckBlock
  | CalloutBlock
  | TableBlock
  | CodeBlock

/* ---------- Questions ---------- */

export type QuestionLevel = 1 | 2 | 3 | 4 | 5
export const LEVEL_LABELS: Record<QuestionLevel, string> = {
  1: 'Recognition',
  2: 'Understanding',
  3: 'Application',
  4: 'Reasoning',
  5: 'Exam style',
}

interface QuestionBase {
  id: string
  /** Lesson this question belongs to — drives mastery + review. */
  lessonId: string
  level: QuestionLevel
  prompt: string
  /** Shown after answering, whether right or wrong. */
  explanation: string
  /** Extra nudge shown only after a wrong answer. */
  remediation?: string
  hint?: string
  /** Concept tags used by search and the weak-area report. */
  tags?: string[]
}

export interface McqQuestion extends QuestionBase {
  type: 'mcq'
  options: string[]
  correct: number
  /** Why each distractor is tempting but wrong (index-aligned). */
  optionFeedback?: (string | null)[]
}

export interface MultiQuestion extends QuestionBase {
  type: 'multi'
  options: string[]
  correct: number[]
}

export interface TrueFalseQuestion extends QuestionBase {
  type: 'trueFalse'
  correct: boolean
}

export interface FillBlankQuestion extends QuestionBase {
  type: 'fillBlank'
  /** Use `___` in the prompt to mark the gap. */
  accepted: string[]
}

export interface OrderingQuestion extends QuestionBase {
  type: 'ordering'
  /** Presented shuffled; this array is the correct order. */
  items: string[]
}

export interface MatchingQuestion extends QuestionBase {
  type: 'matching'
  pairs: { left: string; right: string }[]
}

export interface HotspotQuestion extends QuestionBase {
  type: 'hotspot'
  /** Key into components/quiz/hotspots.tsx */
  diagram: string
  /** id of the correct region within that diagram */
  correctRegion: string
}

export interface NumericQuestion extends QuestionBase {
  type: 'numeric'
  answer: number
  unit?: string
  tolerance?: number
}

export interface StructuredQuestion extends QuestionBase {
  type: 'structured'
  parts: { prompt: string; marks: number; markScheme: string[] }[]
}

export type Question =
  | McqQuestion
  | MultiQuestion
  | TrueFalseQuestion
  | FillBlankQuestion
  | OrderingQuestion
  | MatchingQuestion
  | HotspotQuestion
  | NumericQuestion
  | StructuredQuestion

/* ---------- Course structure ---------- */

export interface Lesson {
  id: string
  moduleId: string
  title: string
  /** One sentence: what this lesson is really about. */
  summary: string
  /** Answers "why should I care?" before any content appears. */
  whyItMatters: string
  objectives: string[]
  /** Lesson ids that should be understood first. */
  prerequisites?: string[]
  /** Reading + activity time, in minutes. */
  minutes: number
  blocks: LessonBlock[]
  keyTerms: string[]
  /** Shown in the lesson summary card at the end. */
  takeaways: string[]
  /** Syllabus competency levels covered, e.g. ['5.3'] */
  syllabusRefs: string[]
}

export interface Module {
  id: string
  title: string
  /** Short label for the sidebar / progress rail. */
  shortTitle: string
  description: string
  /** Used for the module's colour identity. */
  accent: 'indigo' | 'teal' | 'amber' | 'rose' | 'violet' | 'cyan'
  lessons: Lesson[]
  syllabusRefs: string[]
}

export interface GlossaryEntry {
  id: string
  term: string
  /** Plain-English one-liner. */
  simple: string
  technical: string
  example?: string
  related?: string[]
  /** Lesson ids where this term is taught. */
  appearsIn: string[]
}
