import type { Question } from '@/types/content'

export const questionsM6M7: Question[] = [
  /* ============ l6-1 ============ */
  {
    id: 'q6-1-1',
    lessonId: 'l6-1',
    type: 'trueFalse',
    level: 2,
    prompt: 'A program can be executed directly from the hard disk without being loaded into RAM.',
    correct: false,
    explanation:
      'Programs cannot execute directly from secondary storage. The operating system must first load them into RAM, where memory is temporarily allocated for running processes.',
    remediation:
      'The CPU can only fetch and execute instructions from main memory. Disk is too slow and not directly addressable by the CPU.',
    tags: ['memory-management'],
  },
  {
    id: 'q6-1-2',
    lessonId: 'l6-1',
    type: 'matching',
    level: 2,
    prompt: 'Match each region of a program’s logical address space to what it holds.',
    pairs: [
      { left: 'Code (text) segment', right: 'The program instructions' },
      { left: 'Data / global segment', right: 'Global and static variables' },
      { left: 'Heap', right: 'Memory requested dynamically while running' },
      { left: 'Stack', right: 'Function calls, parameters, return addresses, local variables' },
    ],
    explanation:
      'A running program sees its own continuous address space starting at 0, divided into these four regions. The stack grows downward and the heap grows upward, toward each other.',
    tags: ['memory-layout'],
  },
  {
    id: 'q6-1-3',
    lessonId: 'l6-1',
    type: 'multi',
    level: 3,
    prompt:
      'Which problems does contiguous memory allocation cause? (Select all that apply.)',
    options: [
      'External fragmentation',
      'Programs cannot be larger than physical RAM',
      'Internal fragmentation is eliminated',
      'Reduced multiprogramming',
      'Weak memory protection',
    ],
    correct: [0, 1, 3, 4],
    explanation:
      'Contiguous allocation causes external fragmentation, caps program size at physical RAM, reduces multiprogramming (whole processes must stay in memory), makes allocation complex, and weakens memory protection. It does not eliminate internal fragmentation.',
    tags: ['memory-management', 'external-fragmentation'],
  },

  /* ============ l6-2 ============ */
  {
    id: 'q6-2-1',
    lessonId: 'l6-2',
    type: 'numeric',
    level: 2,
    prompt:
      'A computer has a 20-bit address bus and byte-addressable memory. What is the maximum addressable memory, in MB?',
    answer: 1,
    unit: 'MB',
    hint: '2^(bus width) = maximum accessible memory in bytes.',
    explanation:
      '2²⁰ bytes = 1 MB (since 2²⁰ = 1024 × 1024). This is why the address bus width is a hard limit on how much RAM a system can use — a 32-bit bus gives 2³² = 4 GB.',
    tags: ['addressable-memory'],
  },
  {
    id: 'q6-2-2',
    lessonId: 'l6-2',
    type: 'matching',
    level: 2,
    prompt: 'Match each bus to what it carries.',
    pairs: [
      { left: 'Data bus', right: 'The actual data — bidirectional' },
      { left: 'Address bus', right: 'Memory addresses — unidirectional, CPU outward' },
      { left: 'Control bus', right: 'Read, Write, Interrupt, Clock and Reset signals' },
    ],
    explanation:
      'The data bus is bidirectional; its width determines how many bits transfer at once. The address bus is unidirectional and its width determines the maximum addressable memory. The control bus coordinates and synchronises the whole system.',
    tags: ['system-bus'],
  },
  {
    id: 'q6-2-3',
    lessonId: 'l6-2',
    type: 'mcq',
    level: 3,
    prompt: 'Which is an advantage of serial over parallel transmission?',
    options: [
      'It is always faster',
      'It suffers less signal interference and fewer timing issues over long distances',
      'It uses more wires, which makes it more reliable',
      'It can send an entire byte at once',
    ],
    correct: 1,
    optionFeedback: [
      'Parallel is usually faster over short distances.',
      null,
      'Serial uses *fewer* wires — that is part of its advantage.',
      'That is parallel transmission.',
    ],
    explanation:
      'Serial transmission sends one bit at a time through a single line. It requires fewer wires and simpler hardware, and suffers less interference and fewer timing issues (skew) over distance — which is why USB, SATA and network communication all use it.',
    tags: ['transmission'],
  },
  {
    id: 'q6-2-4',
    lessonId: 'l6-2',
    type: 'numeric',
    level: 4,
    prompt:
      'A computer’s physical memory is divided into 16384 frames. The frame number and the offset use an equal number of bits. What is the physical memory capacity in MB?',
    answer: 256,
    unit: 'MB',
    hint: '16384 = 2^? — that gives the frame number bits, and the offset has the same number.',
    explanation:
      '16384 = 2¹⁴, so frame number bits = 14. Equal offset bits = 14. Bus width = 14 + 14 = 28. Capacity = 2²⁸ bytes = 2⁸ × 2²⁰ = 2⁸ MB = **256 MB**.',
    remediation:
      'Convert everything to a power of 2 first, then just add the exponents.',
    tags: ['addressable-memory', 'calculations'],
  },

  /* ============ l6-3 ============ */
  {
    id: 'q6-3-1',
    lessonId: 'l6-3',
    type: 'mcq',
    level: 2,
    prompt: 'Why must page size always equal frame size?',
    options: [
      'To make the page table smaller',
      'So that a page fits exactly into a frame, and the offset does not change during translation',
      'Because RAM and disk have the same block size',
      'To eliminate internal fragmentation',
    ],
    correct: 1,
    optionFeedback: [
      'Page table size depends on the number of pages, not on matching sizes.',
      null,
      'RAM and disk sizes are unrelated to this requirement.',
      'Internal fragmentation still occurs even with matched sizes.',
    ],
    explanation:
      'A page must fit exactly into a frame to ensure proper placement in physical memory — if they differed, it would cause internal fragmentation. Equal sizes are also what allows the offset to remain unchanged during address translation.',
    tags: ['paging'],
  },
  {
    id: 'q6-3-2',
    lessonId: 'l6-3',
    type: 'numeric',
    level: 3,
    prompt:
      'A computer system has virtual memory divided into 4096 pages. Each page is 4 MB. What is the total virtual memory capacity, in GB?',
    answer: 16,
    unit: 'GB',
    hint: 'Convert both to powers of 2 before multiplying.',
    explanation:
      'Capacity = page size × number of pages = 4 MB × 4096 = 2²² × 2¹² = 2³⁴ bytes = 2⁴ × 2³⁰ = 2⁴ GB = **16 GB**.',
    remediation:
      'Convert to powers of 2, then multiplying means adding exponents. No calculator needed.',
    tags: ['paging', 'calculations'],
  },
  {
    id: 'q6-3-3',
    lessonId: 'l6-3',
    type: 'numeric',
    level: 3,
    prompt: 'A 2 GB virtual memory is divided into 512 KB pages. How many pages are there?',
    answer: 4096,
    unit: 'pages',
    explanation:
      'Number of pages = capacity ÷ page size = 2 GB ÷ 512 KB = 2³¹ ÷ 2¹⁹ = 2¹² = **4096 pages**.',
    tags: ['paging', 'calculations'],
  },
  {
    id: 'q6-3-4',
    lessonId: 'l6-3',
    type: 'numeric',
    level: 2,
    prompt: 'A system uses pages of size 8 KB. How many bits are required for the offset?',
    answer: 13,
    unit: 'bits',
    explanation:
      '2^(offset bits) = page size in bytes. 8 KB = 2³ × 2¹⁰ = 2¹³ bytes, so **13 offset bits** are needed.',
    tags: ['paging', 'calculations'],
  },
  {
    id: 'q6-3-5',
    lessonId: 'l6-3',
    type: 'mcq',
    level: 4,
    prompt: 'Paging eliminates external fragmentation. What about internal fragmentation?',
    options: [
      'Paging eliminates that too',
      'Internal fragmentation remains, because the last page of a program may not be completely filled',
      'Internal fragmentation only happens without paging',
      'Paging makes internal fragmentation worse than contiguous allocation',
    ],
    correct: 1,
    optionFeedback: [
      'Paging solves the *external* problem, not the internal one.',
      null,
      'Internal fragmentation is caused by fixed-size allocation, which paging uses.',
      'It is comparable, not worse.',
    ],
    explanation:
      'A 10 KB program with 4 KB pages needs 3 pages (12 KB). Pages 0 and 1 are full; page 2 holds only 2 KB, and the remaining 2 KB is wasted. That is internal fragmentation, and it is a named disadvantage of paging.',
    tags: ['paging', 'internal-fragmentation'],
  },

  /* ============ l6-4 ============ */
  {
    id: 'q6-4-1',
    lessonId: 'l6-4',
    type: 'mcq',
    level: 2,
    prompt: 'During address translation, what happens to the offset?',
    options: [
      'It is recalculated from the frame number',
      'It remains completely unchanged',
      'It is divided by the page size',
      'It is replaced by the frame offset from the page table',
    ],
    correct: 1,
    explanation:
      'Only the page number is replaced by the frame number. The offset is preserved byte-for-byte, because a page and a frame are the same size — so a byte 232 positions into its page is still 232 positions into its frame.',
    remediation:
      'This is the single most common place students lose marks. The offset never changes.',
    tags: ['address-translation'],
  },
  {
    id: 'q6-4-2',
    lessonId: 'l6-4',
    type: 'hotspot',
    level: 2,
    prompt: 'Click the part of the address that is NOT changed during translation.',
    diagram: 'address-translation',
    correctRegion: 'offset-virtual',
    explanation:
      'The page number is replaced by the frame number from the page table, but the offset is carried straight through to the physical address, unchanged.',
    tags: ['address-translation'],
  },
  {
    id: 'q6-4-3',
    lessonId: 'l6-4',
    type: 'numeric',
    level: 3,
    prompt:
      'A logical address is byte 1000 and the page size is 256 bytes. What is the page number?',
    answer: 3,
    hint: 'Page number = logical address ÷ page size, taking the integer part.',
    explanation:
      '1000 ÷ 256 = 3.90625 → take the integer part → page number = **3**. The offset is 1000 mod 256 = 232, so address 1000 sits at page 3, offset 232.',
    tags: ['address-translation', 'calculations'],
  },
  {
    id: 'q6-4-4',
    lessonId: 'l6-4',
    type: 'mcq',
    level: 4,
    prompt:
      'The CPU wants virtual address `0x4F5DE`. The page number is `0x4F` and it maps to frame `0x35`. What is the physical address?',
    options: ['0x354F5DE', '0x355DE', '0x4F355DE', '0x5DE', 'None of the above'],
    correct: 1,
    optionFeedback: [
      'You have prepended the frame number instead of replacing the page number.',
      null,
      'Both the page number and the frame number appear — the page number must be replaced, not kept.',
      'The frame number is missing entirely.',
      'One of the options above is correct.',
    ],
    explanation:
      'The page number `4F` is replaced by the frame number `35`, and the offset `5DE` is preserved exactly. `0x35` + `5DE` = **0x355DE**.',
    remediation:
      'Replace, do not append. The physical address has exactly the same number of offset digits as the virtual one.',
    tags: ['address-translation', 'calculations'],
  },
  {
    id: 'q6-4-5',
    lessonId: 'l6-4',
    type: 'multi',
    level: 2,
    prompt: 'Which of these are functions of the Memory Management Unit? (Select all that apply.)',
    options: [
      'Address translation',
      'Memory protection',
      'Scheduling processes',
      'Relocation',
      'Access control',
    ],
    correct: [0, 1, 3, 4],
    explanation:
      'The MMU’s functions are address translation, memory protection, relocation, virtual memory support and access control. Scheduling processes is the short-term scheduler’s job, not the MMU’s.',
    tags: ['mmu'],
  },

  /* ============ l6-5 ============ */
  {
    id: 'q6-5-1',
    lessonId: 'l6-5',
    type: 'mcq',
    level: 2,
    prompt: 'What indicates that a page fault will occur?',
    options: [
      'The dirty bit is set to 1',
      'The present/absent bit is 0',
      'The frame number is 0',
      'The referenced bit is 0',
    ],
    correct: 1,
    optionFeedback: [
      'The dirty bit means the page was modified and must be written back before replacement.',
      null,
      'Frame 0 is a perfectly valid frame.',
      'The referenced bit tracks recent use for replacement algorithms.',
    ],
    explanation:
      'If the CPU requests a page whose present/absent bit is 0, the page is not in RAM and the operating system generates a page fault interrupt.',
    tags: ['page-fault'],
  },
  {
    id: 'q6-5-2',
    lessonId: 'l6-5',
    type: 'ordering',
    level: 3,
    prompt: 'Order the steps the OS takes to service a page fault when no frame is free.',
    items: [
      'The CPU requests a page whose present bit is 0',
      'A page fault interrupt is generated',
      'A victim page is selected and its present bit set to 0, freeing its frame',
      'The required page is loaded from secondary storage into the freed frame',
      'The page table is updated and the new page’s present bit set to 1',
      'The program continues from where it stopped',
    ],
    explanation:
      'The eviction step is what students often forget. If the victim’s dirty bit is set, it must also be written back to disk before its frame can be reused.',
    tags: ['page-fault'],
  },
  {
    id: 'q6-5-3',
    lessonId: 'l6-5',
    type: 'mcq',
    level: 3,
    prompt: 'What is thrashing?',
    options: [
      'Too many context switches between processes',
      'Excessive swapping between memory and disk, so the CPU services page faults instead of executing',
      'A process repeatedly failing and restarting',
      'The read/write head moving excessively across a fragmented disk',
    ],
    correct: 1,
    optionFeedback: [
      'That is context-switching overhead — a scheduling problem.',
      null,
      'That is a crash loop, not a memory management concept.',
      'That is the seek-time cost of disk fragmentation.',
    ],
    explanation:
      'Thrashing occurs when physical memory is insufficient, so excessive swapping happens and the CPU spends most of its time servicing page faults rather than executing processes. The system works extremely hard and achieves almost nothing.',
    tags: ['thrashing'],
  },
  {
    id: 'q6-5-4',
    lessonId: 'l6-5',
    type: 'mcq',
    level: 4,
    prompt: 'Why does a TLB improve performance?',
    options: [
      'It stores more pages in RAM',
      'It caches recently used page table entries, so translation needs no extra memory access',
      'It compresses the page table',
      'It prevents page faults from occurring',
    ],
    correct: 1,
    optionFeedback: [
      'The TLB caches translations, not pages.',
      null,
      'Compression is not what the TLB does.',
      'A TLB hit still requires the page to be resident; it cannot prevent faults.',
    ],
    explanation:
      'Without a TLB, every memory access would cost two: one to read the page table, one to fetch the data. The TLB is a small, very fast cache of recently used page table entries, so most translations are found instantly — a TLB hit.',
    tags: ['tlb'],
  },

  /* ============ l7-1 ============ */
  {
    id: 'q7-1-1',
    lessonId: 'l7-1',
    type: 'mcq',
    level: 2,
    prompt: 'What is a device driver?',
    options: [
      'A hardware component that interfaces between the system and a device',
      'Utility software that lets the OS communicate with a device by translating general instructions into device-specific commands',
      'The physical cable connecting a device to the computer',
      'A process that runs a peripheral device',
    ],
    correct: 1,
    optionFeedback: [
      'That is the device controller — the hardware half.',
      null,
      'Cables carry signals; drivers are software.',
      'Drivers are software components, not processes in their own right.',
    ],
    explanation:
      'A device driver is utility software. Without drivers, the OS cannot understand how to use a device. The hardware counterpart is the device controller, which manages the electronic communication between the device and the CPU.',
    tags: ['device-driver'],
  },
  {
    id: 'q7-1-2',
    lessonId: 'l7-1',
    type: 'trueFalse',
    level: 2,
    prompt: 'Applications communicate directly with hardware devices.',
    correct: false,
    explanation:
      'Applications do **not** communicate directly with hardware. They send requests to the OS, which handles the device interaction. The OS acts as a middle layer between applications and hardware devices.',
    tags: ['device-management'],
  },

  /* ============ l7-2 ============ */
  {
    id: 'q7-2-1',
    lessonId: 'l7-2',
    type: 'ordering',
    level: 2,
    prompt: 'Order the ways device drivers have been installed, from oldest to newest.',
    items: [
      'Drivers on floppy disks',
      'Drivers on CDs / DVDs',
      'Drivers downloaded from the internet',
      'Plug and Play automatic installation',
    ],
    explanation:
      'Each step reduced the work for the user: floppy disks (1980s–90s) had tiny capacity and were easily lost; CDs held more but went out of date; internet downloads gave the latest versions; Plug and Play removed manual installation entirely.',
    tags: ['device-driver', 'plug-and-play'],
  },
  {
    id: 'q7-2-2',
    lessonId: 'l7-2',
    type: 'mcq',
    level: 3,
    prompt: 'Why were the drive letters A: and B: historically reserved?',
    options: [
      'They were reserved for the operating system',
      'In early computers storage was mainly floppy disks, and machines often had two floppy drives',
      'They were reserved for network drives',
      'The alphabet was designed to start at C: for hard disks',
    ],
    correct: 1,
    explanation:
      'In the 1970s and 1980s storage was mainly floppy disks, and computers often had two floppy disk drives — so A: and B: were taken. That is why the primary hard disk, where the OS is installed, conventionally starts at C:.',
    tags: ['drive-letter'],
  },
  {
    id: 'q7-2-3',
    lessonId: 'l7-2',
    type: 'multi',
    level: 3,
    prompt: 'Which are genuine disadvantages of drive letters? (Select all that apply.)',
    options: [
      'Only 26 letters exist, which servers with many devices may exhaust',
      'They make file paths harder to understand',
      'The letter assigned to a removable device may change',
      'They prevent the OS from managing multiple storage devices',
    ],
    correct: [0, 2],
    explanation:
      'Simple file navigation and support for multiple storage devices are *advantages* of drive letters. The two real disadvantages are the 26-letter limit and the fact that removable devices may receive a different letter each time, since the OS simply assigns the next free one.',
    tags: ['drive-letter'],
  },

  /* ============ l7-3 ============ */
  {
    id: 'q7-3-1',
    lessonId: 'l7-3',
    type: 'mcq',
    level: 2,
    prompt: 'What does spooling stand for, and where is the data stored?',
    options: [
      'Simultaneous Peripheral Operations On-Line; stored in main memory',
      'Simultaneous Peripheral Operations On-Line; stored in secondary storage (disk)',
      'Sequential Peripheral Output Line; stored in cache',
      'Simultaneous Processing Of Output Lines; stored in the device controller',
    ],
    correct: 1,
    explanation:
      'Spooling — Simultaneous Peripheral Operations On-Line — queues I/O data from multiple processes in **secondary storage** so a peripheral can process jobs sequentially while the CPU continues executing other processes. The disk location is the key difference from buffering.',
    tags: ['spooling'],
  },
  {
    id: 'q7-3-2',
    lessonId: 'l7-3',
    type: 'matching',
    level: 3,
    prompt: 'Match each feature to spooling or buffering.',
    pairs: [
      { left: 'Uses disk (secondary storage)', right: 'Spooling' },
      { left: 'Uses main memory (RAM)', right: 'Buffering' },
      { left: 'Printer job queue', right: 'Spooling example' },
      { left: 'Keyboard input buffer', right: 'Buffering example' },
    ],
    explanation:
      'Spooling: disk, large data, manages slow devices, printer queue. Buffering: RAM, small data, handles speed mismatch between two components, keyboard input buffer.',
    tags: ['spooling', 'buffering'],
  },
  {
    id: 'q7-3-3',
    lessonId: 'l7-3',
    type: 'mcq',
    level: 4,
    prompt: 'What is the main advantage of spooling from the CPU’s point of view?',
    options: [
      'It makes the printer print faster',
      'The CPU can continue other tasks instead of waiting for slow devices',
      'It reduces the amount of disk space needed',
      'It removes the need for device drivers',
    ],
    correct: 1,
    optionFeedback: [
      'The printer runs at exactly the same speed — what changes is what the CPU does meanwhile.',
      null,
      'Spooling *requires* additional disk space; that is a named disadvantage.',
      'Drivers are still needed to talk to the device.',
    ],
    explanation:
      'Spooling improves CPU utilisation by allowing the CPU to continue other tasks without waiting for slow devices. Without spooling, the CPU must wait until the peripheral finishes the current job, reducing overall system efficiency.',
    tags: ['spooling'],
  },

  /* ============ l7-4 ============ */
  {
    id: 'q7-4-1',
    lessonId: 'l7-4',
    type: 'mcq',
    level: 1,
    prompt: 'What is the kernel?',
    options: [
      'The graphical shell of an operating system',
      'The core part of an OS that directly interacts with hardware and manages system resources',
      'The firmware stored on the motherboard',
      'The part of the OS that runs application software',
    ],
    correct: 1,
    optionFeedback: [
      'The shell is the interface layer — the kernel sits beneath it.',
      null,
      'That is BIOS/UEFI, which is not part of the OS at all.',
      'Applications run *on top of* the kernel’s services.',
    ],
    explanation:
      'The kernel is the core part of an operating system that directly interacts with the computer hardware and manages system resources. Its main functions are process, memory, device and file management, plus system call handling.',
    tags: ['kernel'],
  },
  {
    id: 'q7-4-2',
    lessonId: 'l7-4',
    type: 'matching',
    level: 2,
    prompt: 'Match each kernel type to its description.',
    pairs: [
      { left: 'Monolithic kernel', right: 'All OS services run in kernel space (e.g. Linux)' },
      {
        left: 'Microkernel',
        right: 'Only essential services run in the kernel; others run in user space',
      },
      {
        left: 'Hybrid kernel',
        right: 'A combination of monolithic and microkernel features (e.g. Windows)',
      },
    ],
    explanation:
      'The trade-off is between speed and robustness: monolithic kernels are fast because everything is together, but a fault anywhere can bring down the system. Microkernels isolate services, at the cost of more communication overhead.',
    tags: ['kernel'],
  },
  {
    id: 'q7-4-3',
    lessonId: 'l7-4',
    type: 'multi',
    level: 2,
    prompt: 'Which of these are main functions of the kernel? (Select all that apply.)',
    options: [
      'Process management',
      'Memory management',
      'Compiling application code',
      'Device management',
      'System call handling',
    ],
    correct: [0, 1, 3, 4],
    explanation:
      'The kernel’s five main functions are process management, memory management, device management, file management and system call handling. Compiling is done by a compiler — system software, but not part of the kernel.',
    tags: ['kernel'],
  },
]
