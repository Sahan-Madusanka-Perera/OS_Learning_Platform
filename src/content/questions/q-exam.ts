import type { Question } from '@/types/content'

/* Extended practice and exam-style questions. These do not appear in
   the lesson Quick Checks — they are drawn on by the Practice, Challenge
   and Final Assessment sections, and they range wider than any single
   lesson does.

   NOTE ON PROVENANCE: these are original A/L-style practice questions
   written to match the syllabus. They are NOT past-paper questions and
   are never presented as such. */

export const questionsExam: Question[] = [
  /* ---------- Cross-topic application ---------- */
  {
    id: 'qx-1',
    lessonId: 'l2-2',
    type: 'mcq',
    level: 4,
    prompt:
      'A university computer allows 30 students to log in from terminals simultaneously, each editing their own program and getting responses within a second. Which type of operating system is this?',
    options: [
      'A simple batch system',
      'A multi-programmed batch system',
      'A time-sharing system',
      'A real-time operating system',
    ],
    correct: 2,
    optionFeedback: [
      'Batch systems have no user interaction at all while a job runs.',
      'Multi-programmed batch keeps several jobs in memory, but users still cannot interact.',
      null,
      'An RTOS guarantees deadlines and typically has minimal user interaction.',
    ],
    explanation:
      'Time-sharing systems are fully multitasking and multiuser: many users access the system simultaneously via terminals, each feeling as if they have their own computer, with quick response times achieved by preemptive Round Robin scheduling.',
    tags: ['time-sharing', 'classification'],
  },
  {
    id: 'qx-2',
    lessonId: 'l4-1',
    type: 'mcq',
    level: 5,
    prompt:
      'A file system uses contiguous allocation. A disk has 100 free blocks in total, but they are spread as gaps of 12, 8, 15, 20 and 45 blocks. A new file needs 50 blocks. What happens, and what is this problem called?',
    options: [
      'The file is stored across the gaps; this is internal fragmentation',
      'The file cannot be stored despite 100 free blocks; this is external fragmentation',
      'The file is stored in the 45-block gap and truncated; this is compaction',
      'The file is stored successfully; contiguous allocation handles this automatically',
    ],
    correct: 1,
    optionFeedback: [
      'Contiguous allocation cannot spread a file across gaps: that is precisely what it forbids.',
      null,
      'Files are never silently truncated.',
      'Contiguous allocation is exactly the method that cannot handle this.',
    ],
    explanation:
      'Contiguous allocation requires one unbroken run of blocks. The largest available run is 45, which is less than 50, so the file cannot be stored, even though 100 blocks are free in total. This is external fragmentation, and compaction would be needed to merge the gaps.',
    tags: ['external-fragmentation', 'allocation'],
  },
  {
    id: 'qx-3',
    lessonId: 'l5-8',
    type: 'mcq',
    level: 5,
    prompt:
      'A system runs a mixture of short interactive tasks and one very long batch calculation. Users complain that the interface freezes for long periods. The system currently uses FCFS. Which change would most improve the users’ experience?',
    options: [
      'Increase the size of RAM',
      'Switch to Round Robin scheduling with a moderate time quantum',
      'Switch to non-preemptive Shortest Job First',
      'Switch to non-preemptive Priority Scheduling',
    ],
    correct: 1,
    optionFeedback: [
      'The problem is CPU scheduling, not memory. More RAM will not stop the long job monopolising the CPU.',
      null,
      'SJF would help average waiting time, but being non-preemptive the long job would still block everything once it started.',
      'Non-preemptive priority has the same flaw: once the long job holds the CPU, nothing can take it back.',
    ],
    explanation:
      'The freezing is the convoy effect: under FCFS the long job holds the CPU to completion. Round Robin is preemptive and designed for time-sharing: every process gets a turn within one cycle of the queue, so interactive tasks respond quickly even while the long job is still running.',
    remediation:
      'When the complaint is about *responsiveness*, you need a preemptive algorithm. Non-preemptive algorithms cannot fix a freeze.',
    tags: ['scheduling', 'round-robin'],
  },
  {
    id: 'qx-4',
    lessonId: 'l6-3',
    type: 'numeric',
    level: 5,
    prompt:
      'A computer has 1 GB of virtual memory. The size of a frame is 128 KB. How many pages are there in the virtual memory?',
    answer: 8192,
    unit: 'pages',
    hint: 'Page size equals frame size: that is the fact this question is testing.',
    explanation:
      'Since page size = frame size, each page is 128 KB. Number of pages = 1 GB ÷ 128 KB = 2³⁰ ÷ (2⁷ × 2¹⁰) = 2³⁰ ÷ 2¹⁷ = 2¹³ = **8192 pages**.',
    remediation:
      'The question gives you the *frame* size and asks about *pages*. That is only solvable because page size always equals frame size.',
    tags: ['paging', 'calculations'],
  },
  {
    id: 'qx-5',
    lessonId: 'l6-3',
    type: 'numeric',
    level: 5,
    prompt:
      'A computer’s virtual memory contains 1024 pages. The frame size is 2 MB. If the virtual memory capacity is twice that of the physical memory, how many frames are in physical memory?',
    answer: 512,
    unit: 'frames',
    hint: 'Find the virtual capacity first, halve it, then divide by the frame size.',
    explanation:
      'Virtual capacity = page size × number of pages = 2 MB × 1024 = 2 GB. Physical = half of that = 1 GB. Number of frames = 1 GB ÷ 2 MB = 1024 MB ÷ 2 MB = **512 frames**.',
    tags: ['paging', 'calculations'],
  },
  {
    id: 'qx-6',
    lessonId: 'l6-2',
    type: 'numeric',
    level: 5,
    prompt:
      'A physical memory has 2¹⁴ frames of 4 KB each. How many bits in total are used for a physical address?',
    answer: 26,
    unit: 'bits',
    explanation:
      'Frame number bits: 2¹⁴ frames → 14 bits. Offset bits: 4 KB = 2² × 2¹⁰ = 2¹² → 12 bits. Total = 14 + 12 = **26 bits**.',
    tags: ['addressable-memory', 'calculations'],
  },
  {
    id: 'qx-7',
    lessonId: 'l6-4',
    type: 'numeric',
    level: 5,
    prompt:
      'A 32-bit virtual address space uses 8 KB pages, and each page table entry is 4 bytes. What is the total size of the page table, in MB?',
    answer: 2,
    unit: 'MB',
    hint: 'Number of pages first, then multiply by the entry size.',
    explanation:
      'Number of pages = 2³² ÷ 2¹³ = 2¹⁹. Page table size = 2¹⁹ entries × 4 bytes = 2¹⁹ × 2² = 2²¹ bytes = **2 MB** per process. Doubling the page size from 4 KB halved the table, which is one reason larger pages are sometimes chosen.',
    tags: ['page-table', 'calculations'],
  },
  {
    id: 'qx-8',
    lessonId: 'l5-3',
    type: 'mcq',
    level: 5,
    prompt:
      'A process requests data from a slow network server. While it waits, the system runs short of memory. Which sequence of states does the process most likely follow?',
    options: [
      'Running → Ready → Suspended Ready → Ready',
      'Running → Blocked → Suspended Blocked → Suspended Ready → Ready',
      'Running → Terminated → New → Ready',
      'Running → Suspended Blocked → Running',
    ],
    correct: 1,
    optionFeedback: [
      'Waiting for network data blocks the process: it does not simply return to Ready.',
      null,
      'Nothing here terminates the process.',
      'A process can never run while swapped out to disk.',
    ],
    explanation:
      'It requests I/O so it goes Running → Blocked. Memory pressure swaps it out: Blocked → Suspended Blocked. The network data eventually arrives while it is still on disk: Suspended Blocked → Suspended Ready. When memory frees up it is brought back: Suspended Ready → Ready.',
    tags: ['process-states'],
  },
  {
    id: 'qx-9',
    lessonId: 'l4-2',
    type: 'mcq',
    level: 5,
    prompt:
      'A digital camera stores photographs on a memory card that must also be readable by Windows, macOS and a photo printer. Which file system is most appropriate, and why?',
    options: [
      'NTFS, because it supports encryption and permissions',
      'FAT, because it is simple and supported by almost all operating systems and devices',
      'APFS, because it is optimised for flash storage',
      'ReiserFS, because it handles small files efficiently',
    ],
    correct: 1,
    optionFeedback: [
      'NTFS’s security features are irrelevant here, and non-Windows devices may not write to it.',
      null,
      'APFS is designed for Apple systems and would not be readable by the printer or by Windows.',
      'ReiserFS is a Linux file system with no support elsewhere.',
    ],
    explanation:
      'FAT (FAT32, or exFAT on cards over 32 GB) is universally compatible: because of its simplicity and long history it is supported by almost all operating systems and many devices, including digital cameras, printers, smart TVs, gaming consoles and car infotainment systems. Many storage devices are preformatted with FAT for exactly this reason.',
    tags: ['file-systems'],
  },
  {
    id: 'qx-10',
    lessonId: 'l7-3',
    type: 'mcq',
    level: 5,
    prompt:
      'An office has one printer shared by twenty computers. Without spooling, what would be the effect on the network’s computers?',
    options: [
      'Print quality would be lower',
      'Each computer’s CPU would have to wait until the printer finished the current job before continuing other work',
      'Only one computer could be connected to the printer at a time',
      'Print jobs would be printed in random order',
    ],
    correct: 1,
    optionFeedback: [
      'Spooling affects timing, not quality.',
      null,
      'Physical connection is a separate matter from spooling.',
      'Without a queue there is no ordering problem: there is a *waiting* problem.',
    ],
    explanation:
      'Without spooling, the CPU must wait until the peripheral device finishes the current job, which reduces overall system efficiency. Spooling stores jobs in spool files on disk so the CPU continues executing other processes and the user can carry on working while printing occurs.',
    tags: ['spooling'],
  },

  /* ---------- Structured, A/L style ---------- */
  {
    id: 'qs-1',
    lessonId: 'l2-1',
    type: 'structured',
    level: 5,
    prompt:
      'A/L-style practice question, Operating system fundamentals.',
    parts: [
      {
        prompt: 'Define the term "operating system".',
        marks: 2,
        markScheme: [
          'States that it is software that manages a computer’s hardware and software resources (1)',
          'States that it provides an interface between the user and the hardware (1)',
        ],
      },
      {
        prompt: 'State three main functions of an operating system.',
        marks: 3,
        markScheme: [
          'Providing interfaces (1)',
          'Process management (1)',
          'Resource management / security and protection / executing application software (1)',
        ],
      },
      {
        prompt:
          'Explain why operating systems were not needed on the earliest computers, and what changed.',
        marks: 3,
        markScheme: [
          'Early computers were special-purpose with pre-programmed instructions that did not change (1)',
          'General-purpose computers meant one machine had to run many different tasks, with programs changing often (1)',
          'Manual loading left the processor idle, so an OS was needed to maximise processor utilisation and automate operations (1)',
        ],
      },
    ],
    explanation:
      'This question tests the definition, the function list and the historical reasoning together, which is how the topic is usually examined. The definition needs both halves; the third part needs the idea of processor idle time.',
    tags: ['exam', 'os-fundamentals'],
  },
  {
    id: 'qs-2',
    lessonId: 'l4-1',
    type: 'structured',
    level: 5,
    prompt: 'A/L-style practice question: Disk allocation.',
    parts: [
      {
        prompt: 'Name the three disk allocation methods.',
        marks: 3,
        markScheme: ['Contiguous allocation (1)', 'Linked allocation (1)', 'Indexed allocation (1)'],
      },
      {
        prompt:
          'State one advantage and one disadvantage of linked allocation.',
        marks: 2,
        markScheme: [
          'Advantage: no external fragmentation / files grow easily / efficient use of disk space (1)',
          'Disadvantage: slow sequential-only access / pointer storage overhead / risk of data loss if a pointer is corrupted (1)',
        ],
      },
      {
        prompt:
          'A disk uses contiguous allocation. Explain, with reference to fragmentation, why a large file may fail to be stored even when the disk reports plenty of free space.',
        marks: 3,
        markScheme: [
          'Contiguous allocation requires the file to occupy one continuous run of blocks (1)',
          'As files are deleted, free space becomes split into many small non-contiguous gaps (1)',
          'This is external fragmentation: no single gap is large enough, even though the total free space is sufficient (1)',
        ],
      },
    ],
    explanation:
      'Part (c) is the discriminator. A full-mark answer must state the contiguity requirement, describe how gaps arise, and name external fragmentation explicitly.',
    tags: ['exam', 'allocation'],
  },
  {
    id: 'qs-3',
    lessonId: 'l5-3',
    type: 'structured',
    level: 5,
    prompt: 'A/L-style practice question: Process states.',
    parts: [
      {
        prompt: 'List the seven states in the process transition diagram.',
        marks: 4,
        markScheme: [
          'New, Ready, Running (1)',
          'Blocked, Terminated (1)',
          'Suspended Ready (1)',
          'Suspended Blocked (1)',
        ],
      },
      {
        prompt:
          'Explain the difference between the Blocked state and the Suspended Blocked state.',
        marks: 3,
        markScheme: [
          'Blocked: the process is waiting for a resource such as I/O completion (1)',
          'Blocked is still held in main memory (1)',
          'Suspended Blocked: also waiting, but additionally swapped out to secondary storage to free main memory (1)',
        ],
      },
      {
        prompt:
          'A process is in the Running state. Name two states it can move to, and give the reason for each transition.',
        marks: 4,
        markScheme: [
          'Ready: the time quantum expired or a higher-priority process arrived (timeout) (2)',
          'Blocked: the process requested I/O or must wait for an event or resource (2)',
          '(Terminated: the process completed, or the OS ended it due to an error, is also acceptable)',
        ],
      },
    ],
    explanation:
      'The seven-state diagram is one of the most reliably examined items in this competency. Part (b) separates students who understand suspension from those who have only memorised state names.',
    tags: ['exam', 'process-states'],
  },
  {
    id: 'qs-4',
    lessonId: 'l5-8',
    type: 'structured',
    level: 5,
    prompt:
      'A/L-style practice question: CPU scheduling. Four processes are given: P1 (arrival 0, burst 8), P2 (arrival 1, burst 2), P3 (arrival 3, burst 5), P4 (arrival 4, burst 1).',
    parts: [
      {
        prompt:
          'Draw a Gantt chart for First Come First Served scheduling and state the completion time of each process.',
        marks: 4,
        markScheme: [
          'Gantt chart shows P1 0–8, P2 8–10 (1)',
          'Gantt chart shows P3 10–15, P4 15–16 (1)',
          'Completion times: P1 = 8, P2 = 10 (1)',
          'Completion times: P3 = 15, P4 = 16 (1)',
        ],
      },
      {
        prompt: 'Calculate the average turnaround duration.',
        marks: 3,
        markScheme: [
          'Uses turnaround = completion − arrival (1)',
          'Individual values: 8, 9, 12, 12 (1)',
          'Average = (8+9+12+12)/4 = 10.25 ms (1)',
        ],
      },
      {
        prompt: 'Calculate the average waiting duration.',
        marks: 3,
        markScheme: [
          'Uses waiting = turnaround − burst (1)',
          'Individual values: 0, 7, 7, 11 (1)',
          'Average = (0+7+7+11)/4 = 6.25 ms (1)',
        ],
      },
      {
        prompt:
          'State one disadvantage of FCFS scheduling that is visible in your answer.',
        marks: 2,
        markScheme: [
          'Names the convoy effect, or high average waiting time (1)',
          'Refers to the evidence: P4 needs only 1 ms but waits 11 ms, stuck behind the 8 ms process P1 and the 5 ms process P3 (1)',
        ],
      },
    ],
    explanation:
      'Method marks are available even if arithmetic slips, so always write the formula and the individual values before averaging. Part (d) asks you to connect the numbers to the concept: a common structure in higher-mark questions.',
    tags: ['exam', 'scheduling', 'calculations'],
  },
  {
    id: 'qs-5',
    lessonId: 'l6-4',
    type: 'structured',
    level: 5,
    prompt:
      'A/L-style practice question: Paging and address translation. A system uses 8 KB pages, and its physical memory contains 512 frames.',
    parts: [
      {
        prompt: 'Calculate the number of bits used for the offset and for the frame number.',
        marks: 3,
        markScheme: [
          'Offset: 8 KB = 2¹³ bytes, so 13 offset bits (1)',
          'Frames: 512 = 2⁹, so 9 frame number bits (1)',
          'Physical address length = 9 + 13 = 22 bits (1)',
        ],
      },
      {
        prompt: 'Calculate the total physical memory capacity.',
        marks: 2,
        markScheme: [
          'Uses capacity = frame size × number of frames (1)',
          '8 KB × 512 = 2¹³ × 2⁹ = 2²² bytes = 4 MB (1)',
        ],
      },
      {
        prompt:
          'Explain why the offset does not change when a logical address is translated into a physical address.',
        marks: 3,
        markScheme: [
          'States that page size equals frame size (1)',
          'States that when a page is loaded into a frame, the position of each byte within it stays the same (1)',
          'States that only the page number is replaced by the frame number (1)',
        ],
      },
      {
        prompt:
          'The page table shows that page 3 has a present/absent bit of 0. Describe what happens when the CPU requests an address in page 3.',
        marks: 4,
        markScheme: [
          'A page fault occurs / a page fault interrupt is generated (1)',
          'The OS loads the required page from secondary storage into RAM (1)',
          'If no frame is free, a resident page is evicted and its present bit set to 0 (1)',
          'The page table is updated and the process resumes from where it stopped (1)',
        ],
      },
    ],
    explanation:
      'Parts (a) and (b) are pure arithmetic: convert to powers of two and the marks are free. Parts (c) and (d) test whether you can explain the mechanism, which is where most marks are actually lost.',
    tags: ['exam', 'paging', 'page-fault'],
  },
  {
    id: 'qs-6',
    lessonId: 'l7-3',
    type: 'structured',
    level: 5,
    prompt: 'A/L-style practice question: Device management.',
    parts: [
      {
        prompt:
          'Name the two main components an operating system uses to manage I/O devices, and state whether each is hardware or software.',
        marks: 4,
        markScheme: [
          'Device controller (1): hardware (1)',
          'Device driver (1): software (1)',
        ],
      },
      {
        prompt: 'Define spooling.',
        marks: 2,
        markScheme: [
          'An OS technique in which I/O data from multiple processes is queued in secondary storage (1)',
          'So a peripheral device can process the jobs sequentially while the CPU continues executing other processes (1)',
        ],
      },
      {
        prompt:
          'State two differences between spooling and buffering.',
        marks: 4,
        markScheme: [
          'Spooling uses disk / secondary storage; buffering uses main memory (2)',
          'Spooling handles large data and manages slow devices; buffering handles small data and speed mismatch (2)',
        ],
      },
    ],
    explanation:
      'Part (a) is worth four marks for a two-item answer, because each item needs both the name and the classification. Read mark allocations carefully; they tell you how much to write.',
    tags: ['exam', 'device-management', 'spooling'],
  },
]
