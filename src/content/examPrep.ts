/* Exam preparation content: the condensed, high-yield material a student
   revises from in the last week. Everything here is drawn from what the
   lessons already taught — this is compression, not new content. */

export interface KeyFact {
  topic: string
  facts: string[]
}

export const KEY_FACTS: KeyFact[] = [
  {
    topic: 'What an OS is and does',
    facts: [
      'An OS manages hardware and software resources **and** provides an interface between user and hardware.',
      'Five main functions: providing interfaces · process management · resource management · security and protection · executing application software.',
      'Directories, files and data are **abstractions** provided by the OS: they do not exist in hardware.',
      'The OS was introduced to maximise processor utilisation, automate manual operations and reduce processor idle time.',
    ],
  },
  {
    topic: 'Booting',
    facts: [
      'Order: power on → BIOS/UEFI → POST → boot device selection → boot loader → OS loads → login screen.',
      'BIOS is firmware in non-volatile ROM; its **settings** live in battery-backed CMOS memory.',
      'POST checks RAM, keyboard, processor and storage, reporting faults via beep codes.',
      'BIOS: IBM PC standard from 1981, text-based, 16-bit, MBR up to 2 TB, no inherent security. UEFI: specified 2006, graphical, 32/64-bit, GPT over 2 TB, Secure Boot.',
      'Cold boot = from powered off. Warm boot = restart without cutting power.',
    ],
  },
  {
    topic: 'Evolution and classification',
    facts: [
      'No OS → simple batch → multi-programmed batch → time-sharing. The first three each remove a source of CPU idle time; time-sharing adds fast response for users.',
      'Simple batch: a **resident monitor** loads the next job automatically, but the CPU still idles during I/O.',
      'Multiprogramming switches when a process **blocks**; time-sharing switches when the **time quantum expires**.',
      'Multiprogramming is considered the central theme of modern operating systems.',
      'A **multi-user single-tasking OS cannot exist**: multiple users implies multitasking.',
      'Hard real-time: missing a deadline is catastrophic. Soft real-time: performance degrades only.',
      'RTOS **guarantees** response time; time-sharing only aims for a short one.',
    ],
  },
  {
    topic: 'Files and directories',
    facts: [
      'Data is the content; a file is the container.',
      'File name = primary name (uniqueness) + extension (which application opens it).',
      'Attributes: owner · location · access permissions · timestamps · file size · size on disk.',
      'Directories have the **same attributes** as files.',
      'Absolute path starts at the root; relative path starts at the current working directory.',
      'Directory structures: single-level, two-level, hierarchical (tree).',
    ],
  },
  {
    topic: 'Physical storage and fragmentation',
    facts: [
      'Platter → track → sector (smallest **physical** unit) → block (OS logical unit) → cluster (file system allocation unit).',
      'The computer always reads and writes in whole **blocks**, never single bytes.',
      '**Internal** fragmentation = wasted space *inside* an allocated block. A block serves only one file.',
      '**External** fragmentation = free space split into gaps too small to use, though the total is sufficient.',
      'Only **contiguous** allocation suffers external fragmentation.',
      'Defragmentation targets **file blocks**; compaction targets **free space**. Never defragment an SSD.',
    ],
  },
  {
    topic: 'Disk allocation and file systems',
    facts: [
      'Contiguous: one unbroken run. Very fast, no pointer overhead, but external fragmentation and hard to grow.',
      'Linked: pointer in every block. No external fragmentation, easy growth, but sequential access only and pointer corruption risk. Used by FAT.',
      'Indexed: one index block per file. Direct + random access, dynamic growth, but an extra block, and index size caps file size. Used by UNIX/Linux.',
      'FAT chaining: directory entry = **first** block. Follow the chain to −1. Space = blocks × block size.',
      'FAT keeps **two copies** of the table for safety; it is universally compatible.',
      'NTFS uses a Master File Table, and adds permissions, encryption, compression, fault tolerance and large file support.',
    ],
  },
  {
    topic: 'Processes',
    facts: [
      'A program is passive instructions on disk; a process is a program **in execution** with state and resources.',
      'One program may have many processes.',
      'PCB contents: PID · process state · program counter · CPU registers · memory management info · CPU scheduling info · accounting info · I/O status · open files · open devices.',
      'Seven states: New, Ready, Running, Blocked, Terminated, Suspended Ready, Suspended Blocked.',
      'Ready/Running/Blocked are in main memory; both Suspended states are on disk.',
      'Running → Ready is a **timeout**; Running → Blocked is an **I/O or resource wait**.',
      'There is no Blocked → Running transition: everything reaches Running through Ready.',
    ],
  },
  {
    topic: 'Deadlock, interrupts and context switching',
    facts: [
      'Deadlock needs all four **simultaneously**: mutual exclusion · hold and wait · no preemption · circular wait.',
      'A zombie has finished executing but keeps a **process table entry**. It uses no CPU or memory.',
      'An interrupt is an event that **alters the sequence of execution** of a process.',
      'Hardware interrupts come from devices; software interrupts from programs (system calls, errors, exceptions).',
      'Non-maskable interrupts cannot be ignored: hardware failures, for example.',
      'Context switching saves the running process’s state into its PCB and restores another’s. Its cost is overhead.',
    ],
  },
  {
    topic: 'Scheduling',
    facts: [
      'Long-term (job) scheduler: New → Ready. Controls the degree of multiprogramming. Slowest.',
      'Short-term (CPU) scheduler: Ready → Running. **Fastest** of the three.',
      'Medium-term scheduler: swaps processes between memory and disk. Speed in between.',
      '**Turnaround = Completion − Arrival.**  **Waiting = Turnaround − Burst.**',
      'Response time = wait before the *first* output. Waiting time = *total* time in the ready queue.',
      'Non-preemptive: FCFS, SJF, non-preemptive Priority. Preemptive: RR, SRTF, preemptive Priority.',
      'FCFS suffers the **convoy effect**. Priority risks **starvation**, fixed by **aging** (e.g. +1 every 15 minutes).',
      'Round Robin prevents starvation and is designed for time-sharing. Too small a quantum wastes time switching; too large and it becomes FCFS.',
    ],
  },
  {
    topic: 'Memory and paging',
    facts: [
      'Programs cannot execute from secondary storage: the OS must load them into RAM.',
      '**2^(address bits) = maximum addressable memory in bytes.** Address length = bus width.',
      'Data bus: bidirectional, width sets transfer speed. Address bus: unidirectional, width sets max memory. Control bus: Read/Write/Interrupt/Clock/Reset.',
      'Virtual memory uses secondary storage as an extension of RAM so programs larger than RAM can run.',
      'Paging divides logical memory into **pages** and physical memory into equally sized **frames**. Page size = frame size, always.',
      'Paging eliminates **external** fragmentation; **internal** fragmentation remains in the last page.',
      'Translation replaces the page number with the frame number. **The offset never changes.**',
      'Page number = address ÷ page size. Offset = address mod page size.',
      'PTE holds: frame number · present/absent bit · dirty bit · referenced bit · protection bits.',
      'MMU functions: address translation · memory protection · relocation · virtual memory support · access control.',
      'Page fault: present/absent bit is 0. Thrashing: excessive swapping because RAM is insufficient.',
    ],
  },
  {
    topic: 'Devices and the kernel',
    facts: [
      'Device controller = **hardware** interface. Device driver = **software** translator. Applications never touch hardware directly.',
      'Driver installation evolved: floppy disks → CDs/DVDs → internet downloads → Plug and Play.',
      'A: and B: were reserved for floppy drives; only 26 drive letters exist.',
      'Spooling: **disk**, large data, manages slow devices, printer queue.',
      'Buffering: **RAM**, small data, handles speed mismatch, keyboard input buffer.',
      'Kernel functions: process · memory · device · file management, plus system call handling.',
      'Monolithic = all services in kernel space (Linux). Microkernel = only essentials (QNX). Hybrid = both (Windows).',
    ],
  },
]

export interface Confusion {
  pair: [string, string]
  distinction: string
  trick: string
}

export const CONFUSED_PAIRS: Confusion[] = [
  {
    pair: ['Internal fragmentation', 'External fragmentation'],
    distinction:
      'Internal is wasted space **inside** an allocated block, because the block is bigger than the data in it. External is free space **between** allocations, split into gaps too small to use.',
    trick: 'Internal = inside a block. External = between blocks.',
  },
  {
    pair: ['Program', 'Process'],
    distinction:
      'A program is a passive set of instructions stored in secondary storage. A process is a program in execution, with its current state, registers, memory and resources.',
    trick: 'Recipe (program) vs cooking it (process). One recipe, many cooks.',
  },
  {
    pair: ['Multiprogramming', 'Time-sharing'],
    distinction:
      'Multiprogramming switches when a process **blocks** for I/O: its goal is CPU utilisation. Time-sharing switches when the **time quantum expires**: its goal is response time.',
    trick: 'Multiprogramming helps the machine. Time-sharing helps the person.',
  },
  {
    pair: ['Blocked', 'Suspended Blocked'],
    distinction:
      'Both are waiting for a resource. Blocked is still in **main memory**; Suspended Blocked has additionally been swapped out to **secondary storage** to free memory.',
    trick: 'Ask two questions: is it waiting? is it in RAM? Suspension is about memory pressure, not about waiting.',
  },
  {
    pair: ['Waiting time', 'Response time'],
    distinction:
      'Waiting time is the **total** time spent in the ready queue across the whole life of the process. Response time is only the wait **before the first output**.',
    trick: 'In Round Robin a process waits many times. Response counts the first gap; waiting counts them all.',
  },
  {
    pair: ['Defragmentation', 'Compaction'],
    distinction:
      'Defragmentation rearranges **file blocks** into contiguous order. Compaction merges scattered **free space** into one continuous region.',
    trick: 'Defrag focuses on files. Compaction focuses on gaps.',
  },
  {
    pair: ['Spooling', 'Buffering'],
    distinction:
      'Spooling queues large data on **disk** to manage slow devices. Buffering holds small data in **RAM** to handle a speed mismatch between two components.',
    trick: 'Spool = disk + queue + printer. Buffer = RAM + smoothing + keyboard.',
  },
  {
    pair: ['Device controller', 'Device driver'],
    distinction:
      'The controller is **hardware**: it manages the electronic communication between the device and the CPU. The driver is **software**: it translates general OS instructions into device-specific commands.',
    trick: 'Controller = the telephone. Driver = the interpreter.',
  },
  {
    pair: ['Page', 'Frame'],
    distinction:
      'A page is a fixed-size block of **logical (virtual)** memory. A frame is a fixed-size block of **physical** memory. They are always the same size, but the *number* of each differs: pages depend on virtual memory size, frames on physical.',
    trick: 'Pages are what the program thinks it has. Frames are what actually exists.',
  },
  {
    pair: ['BIOS', 'CMOS'],
    distinction:
      'BIOS is the firmware **code**, stored in non-volatile ROM. CMOS is the small battery-backed memory holding BIOS **settings**: date, time, boot order.',
    trick: 'A dead CMOS battery loses the clock but the machine still boots, because the code survives.',
  },
  {
    pair: ['Preemptive', 'Non-preemptive'],
    distinction:
      'Preemptive: the OS **can** interrupt a running process and take the CPU away. Non-preemptive: once a process has the CPU it keeps it until it voluntarily releases it.',
    trick: 'If a complaint is about responsiveness or freezing, only a preemptive algorithm can fix it.',
  },
  {
    pair: ['Starvation', 'Deadlock'],
    distinction:
      'Starvation is one process waiting indefinitely because others keep jumping ahead: the system is still working. Deadlock is two or more processes waiting on **each other**, so none can ever proceed.',
    trick: 'Starvation has a fix (aging). Deadlock needs the cycle broken.',
  },
]

export interface Mistake {
  wrong: string
  right: string
}

export const COMMON_MISTAKES: Mistake[] = [
  {
    wrong: 'Writing that multitasking means programs run "at the same time".',
    right:
      'Write "concurrently, **seemingly** at the same time". On a single core only one process executes at any instant.',
  },
  {
    wrong: 'Changing the offset during address translation.',
    right:
      'Only the page number is replaced by the frame number. The offset is carried through byte-for-byte.',
  },
  {
    wrong: 'In a FAT chaining question, giving the last block as the directory entry.',
    right: 'The directory entry contains the **first** block number of the file.',
  },
  {
    wrong: 'Answering a FAT question with the number of blocks instead of the space.',
    right: 'Multiply: disk space allocated = number of blocks × block size.',
  },
  {
    wrong: 'Rounding the number of blocks **down** in a fragmentation calculation.',
    right: 'Always round **up**: the remainder still needs a whole block to live in.',
  },
  {
    wrong: 'Saying paging removes all fragmentation.',
    right: 'Paging removes **external** fragmentation. Internal fragmentation remains in the last page.',
  },
  {
    wrong: 'Claiming linked allocation causes external fragmentation.',
    right:
      'Only **contiguous** allocation does. Linked and indexed can use any free block anywhere, so scattered free space is never a problem for them.',
  },
  {
    wrong: 'Defining an OS as only "software that manages hardware".',
    right:
      'Include both halves: it manages hardware and software resources **and** provides an interface between the user and the hardware.',
  },
  {
    wrong: 'Saying a zombie process wastes CPU and memory.',
    right: 'It uses **neither**. Its only cost is one entry in the process table.',
  },
  {
    wrong: 'Listing "preemption" as a deadlock condition.',
    right: 'The condition is **no** preemption. If resources could be forcibly taken back, deadlock would break.',
  },
  {
    wrong: 'Treating a device driver as hardware.',
    right: 'The driver is software (system software). The controller is the hardware.',
  },
  {
    wrong: 'Answering "list" questions when the command word is "describe".',
    right:
      'Describe = name **plus** a clause of detail for each point. Read the mark allocation: it tells you how much to write.',
  },
]

export interface ExamTip {
  title: string
  text: string
}

export const EXAM_TIPS: ExamTip[] = [
  {
    title: 'Convert to powers of 2 first',
    text: 'Every paging and memory calculation becomes trivial once everything is a power of 2. Multiplying means adding exponents; dividing means subtracting them. You will not need a calculator, and you will not make arithmetic slips.',
  },
  {
    title: 'Draw the Gantt chart before calculating anything',
    text: 'Scheduling questions are almost impossible to get right by reasoning alone, and almost impossible to get wrong once the chart is drawn. Draw it first, read the completion times off it, then apply the two formulas.',
  },
  {
    title: 'Write the formula, then substitute',
    text: 'Method marks are available in calculation questions. Writing "Turnaround = Completion − Arrival" earns a mark even if the arithmetic afterwards slips.',
  },
  {
    title: 'Match the number of points to the marks',
    text: 'A 4-mark question wants four distinct points, not one point explained four ways. Count your points against the marks before moving on.',
  },
  {
    title: 'Definitions need both halves',
    text: 'Most definitions in this competency have two parts (manages resources AND provides an interface; waiting for a resource AND swapped out). Half a definition usually earns half the marks.',
  },
  {
    title: 'Give an example when defining',
    text: 'For "define X", the technical sentence plus one concrete example is almost always a complete answer. It costs you five words and often secures the mark.',
  },
  {
    title: 'Use the syllabus wording for key definitions',
    text: 'For interrupts, write "an event that alters the sequence of execution of a process". For multitasking, "concurrently, seemingly at the same time". Examiners mark against these phrasings.',
  },
  {
    title: 'Check waiting time is never negative',
    text: 'If a waiting time comes out negative, your Gantt chart is wrong: go back and redraw it rather than pressing on.',
  },
]
