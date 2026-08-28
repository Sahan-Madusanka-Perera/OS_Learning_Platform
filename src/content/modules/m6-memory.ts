import type { Module } from '@/types/content'

export const m6: Module = {
  id: 'm6',
  title: 'Memory management',
  shortTitle: 'Memory',
  description:
    'How the OS shares one physical RAM among many processes, how virtual memory lets programs be bigger than RAM, and the paging arithmetic that turns up in every exam.',
  accent: 'rose',
  syllabusRefs: ['5.4'],
  lessons: [
    /* ================= l6-1 ================= */
    {
      id: 'l6-1',
      moduleId: 'm6',
      title: 'Why memory needs managing',
      summary:
        'What main memory does, what each running program thinks its memory looks like, and why sharing RAM is harder than it sounds.',
      whyItMatters:
        '"Briefly explains the need of memory management" is a named learning outcome. It also sets up paging — you cannot appreciate the solution without first feeling the problem.',
      objectives: [
        'State what the OS does for memory management',
        'Describe the core functions of main memory',
        'Describe the logical address space of a running program',
        'Explain the problems caused by contiguous memory allocation',
      ],
      prerequisites: ['l5-2'],
      minutes: 11,
      syllabusRefs: ['5.4'],
      keyTerms: ['ram', 'volatile', 'secondary-storage', 'external-fragmentation'],
      blocks: [
        {
          kind: 'definition',
          term: 'Memory management',
          simple: 'Deciding which running program gets which part of RAM, and taking it back afterwards.',
          technical:
            'The process of managing computer memory, particularly the allocation and deallocation of memory for running processes and programs.',
        },
        {
          kind: 'list',
          title: 'What the OS actually does',
          style: 'check',
          items: [
            'Keeps track of primary memory — which parts are in use and by whom, and which are free',
            'In multiprogramming, decides which process gets memory, when, and how much',
            'Allocates a portion of available memory when a process requires it',
            'Deallocates that memory when the process no longer needs it, making it available for other processes',
          ],
        },
        { kind: 'heading', text: 'Main memory' },
        {
          kind: 'prose',
          paragraphs: [
            '**[[ram|Main memory (RAM)]]** is the primary [[volatile|volatile]] storage that provides a fast, directly accessible workspace for the CPU to execute programs and process data. It allows fast read/write access compared with [[secondary-storage|secondary storage]].',
            'Crucially: **programs cannot execute directly from secondary storage.** The operating system must first load them into RAM. Memory is then temporarily allocated for running processes, while unused space remains available for other programs.',
          ],
        },
        {
          kind: 'list',
          title: 'Core functions of main memory',
          items: [
            'Stores the operating system kernel for system control',
            'Holds running programs for execution',
            'Stores active data such as variables and temporary results',
            'Allocates memory for multiple processes to support multitasking',
            'Works with virtual memory to extend usable memory',
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'RAM is volatile',
          text: 'Its contents disappear when power is turned off. That is why unsaved work is lost in a power cut — the document existed only in RAM, and RAM forgets.',
        },
        { kind: 'heading', text: 'What a program thinks its memory looks like' },
        {
          kind: 'prose',
          paragraphs: [
            'A running program views memory as **its own continuous sequence of addresses**, starting from address 0 up to a maximum limit. This view is called the **logical (or virtual) address space**.',
            'From the program’s perspective it has full and private access to this memory space — even though many programs may be running at the same time. Each process has its own virtual address space, and those spaces are isolated from each other, so one process cannot directly access the memory of another.',
          ],
        },
        {
          kind: 'viz',
          viz: 'memoryLayout',
          title: 'The four regions of a program’s address space',
          caption: 'Click each region.',
        },
        {
          kind: 'keyIdea',
          text: 'In reality the operating system manages memory and maps the logical address space onto physical memory using the **[[mmu|Memory Management Unit (MMU)]]**. Every program is living in a convincing illusion — and that illusion is what makes safe multitasking possible.',
        },
        { kind: 'heading', text: 'The problem with the obvious approach' },
        {
          kind: 'prose',
          paragraphs: [
            'The simplest memory management gives each process **one continuous block** of memory. This is called **contiguous allocation** — and it is exactly the same idea, with exactly the same weakness, as contiguous disk allocation.',
          ],
        },
        {
          kind: 'list',
          title: 'What goes wrong over time',
          style: 'number',
          items: [
            '**[[external-fragmentation|External fragmentation]]** — free memory becomes scattered into many small blocks. Finding a large continuous free block becomes difficult, even when the total free memory is sufficient.',
            '**Limited program size** — a process must fit entirely in physical RAM. Programs larger than available RAM simply cannot run.',
            '**Reduced multiprogramming** — entire processes must stay in memory, so fewer processes can run simultaneously.',
            '**Complex memory allocation** — the OS must search for large contiguous free blocks, making allocation inefficient.',
            '**Weak memory protection** — without structured address mapping it is harder to isolate processes, increasing the risk of memory corruption.',
          ],
        },
        {
          kind: 'callout',
          tone: 'info',
          title: 'Memory compaction is a partial fix only',
          text: 'Compaction can combine scattered free spaces into one region — but the process is time-consuming, and it does nothing about the "program bigger than RAM" problem. Something better was needed. That something is **paging**, and it is coming in lesson 6.3.',
        },
        {
          kind: 'recall',
          prompt:
            'Why can a program not simply execute from the hard disk, saving RAM entirely?',
          answer:
            'Because the CPU can only execute instructions from main memory — it cannot fetch and execute directly from secondary storage, which is far too slow and not directly addressable. The OS must load the program into RAM first.',
        },
        {
          kind: 'quickCheck',
          questionIds: ['q6-1-1', 'q6-1-2', 'q6-1-3'],
        },
      ],
      takeaways: [
        'Memory management = allocating and deallocating memory for running processes, and tracking what is in use.',
        'Programs cannot execute from secondary storage; the OS must load them into RAM.',
        'A program sees a continuous logical address space starting at 0, divided into code, data, heap and stack.',
        'Contiguous memory allocation causes external fragmentation and caps program size at physical RAM.',
      ],
    },

    /* ================= l6-2 ================= */
    {
      id: 'l6-2',
      moduleId: 'm6',
      title: 'Addresses, bus width and the system bus',
      summary:
        'Why 2 to the power of something keeps appearing, and the three buses that connect the CPU to everything else.',
      whyItMatters:
        'Every paging calculation in this competency rests on one equation: 2^(address bits) = addressable bytes. Get comfortable with it here and the rest of the module becomes arithmetic.',
      objectives: [
        'Explain byte-addressable memory and calculate maximum addressable memory from bus width',
        'Name the three buses and state what each carries',
        'Distinguish serial from parallel transmission',
        'State the units of memory data storage',
      ],
      prerequisites: ['l6-1'],
      minutes: 12,
      syllabusRefs: ['5.4'],
      keyTerms: ['addressable-memory', 'bus-width', 'address-bus', 'data-bus', 'control-bus'],
      blocks: [
        {
          kind: 'prose',
          paragraphs: [
            'Memory is organised into many small storage locations, each capable of storing a small unit of data such as a byte. Each location is identified by a **unique numeric address**.',
            'The address identifies **where** the data is stored, not **what** the data contains. The CPU uses these addresses to access memory locations when reading data from memory or writing results to it.',
          ],
        },
        {
          kind: 'definition',
          term: 'Byte addressable memory',
          simple: 'Every single byte in memory has its own address.',
          technical:
            'A type of memory architecture where each individual byte in memory has a unique address. The maximum memory capacity in bytes can therefore be determined by writing the bus width as a power of two.',
        },
        {
          kind: 'callout',
          tone: 'success',
          title: 'The one equation everything rests on',
          text: '**2^(memory address length) = maximum accessible memory in bytes**. And since the maximum length of a memory address equals the bus width: **2^(bus width) = maximum accessible memory**.',
        },
        {
          kind: 'table',
          headers: ['Address bits', 'Maximum addressable memory'],
          rows: [
            ['8 bits', '2⁸ = 256 bytes'],
            ['10 bits', '2¹⁰ = 1 KB'],
            ['15 bits', '2¹⁵ = 32 KB'],
            ['20 bits', '2²⁰ = 1 MB'],
            ['24 bits', '2²⁴ = 16 MB'],
            ['30 bits', '2³⁰ = 1 GB'],
            ['32 bits', '2³² = 4 GB'],
            ['36 bits', '2³⁶ = 64 GB'],
          ],
          caption:
            'This is why 32-bit systems cannot use more than 4 GB of RAM — the address bus physically cannot express a larger address.',
        },
        {
          kind: 'table',
          title: 'Units of memory data storage',
          headers: ['Unit', 'Equals'],
          rows: [
            ['1 bit', 'The smallest unit of data'],
            ['1 nibble', '4 bits (2²)'],
            ['1 byte', '8 bits (2³)'],
            ['1 KiloByte (KB)', '1024 bytes (2¹⁰)'],
            ['1 MegaByte (MB)', '1024 KB'],
            ['1 GigaByte (GB)', '1024 MB'],
            ['1 TeraByte (TB)', '1024 GB'],
          ],
          caption:
            'In computer architecture, memory sizes are expressed using powers of 2 because digital systems operate using binary addressing.',
        },
        { kind: 'heading', text: 'The system bus' },
        {
          kind: 'prose',
          paragraphs: [
            'The **system bus** is the communication pathway connecting the CPU, memory and I/O devices. It consists of three main buses.',
          ],
        },
        {
          kind: 'table',
          headers: ['Bus', 'Carries', 'Direction', 'Key fact'],
          rows: [
            [
              '**[[data-bus|Data bus]]**',
              'The actual data between CPU, memory and I/O devices',
              '**Bidirectional** — data travels both to and from the CPU',
              'Its width (8, 16, 32, 64 bits) determines how many bits transfer at once. A wider data bus increases transfer speed.',
            ],
            [
              '**[[address-bus|Address bus]]**',
              'Memory addresses from the CPU to memory or I/O devices',
              '**Unidirectional** — signals travel only outward from the CPU',
              'The number of address lines determines the maximum addressable memory. Each address line represents one bit of the address.',
            ],
            [
              '**[[control-bus|Control bus]]**',
              'Control signals — Read, Write, Interrupt, Clock, Reset',
              'Coordinating',
              'Ensures data transfer happens at the correct time and in the correct direction, and synchronises hardware components.',
            ],
          ],
        },
        {
          kind: 'callout',
          tone: 'info',
          title: 'Bus width, precisely',
          text: 'The number of wires or address lines is known as the **bus width**. The maximum length of a memory address equals the bus width — memory addresses longer than the bus width cannot exist. Addresses may be *shorter* than the bus width when high-capacity memory is not installed.',
        },
        {
          kind: 'worked',
          title: 'Working backwards from frames to memory size',
          problem:
            'A computer has physical memory divided into 16384 frames. The frame number and offset use an equal number of bits. What is the physical memory capacity?',
          steps: [
            {
              title: 'Step 1 — bits for the frame number',
              detail: '2^(frame number bits) = number of frames = 16384 = 2¹⁴, so frame number bits = 14.',
            },
            {
              title: 'Step 2 — offset bits',
              detail: 'The question says both are equal, so offset bits = 14 too.',
            },
            {
              title: 'Step 3 — total address length = bus width',
              detail: '14 + 14 = 28 bits.',
            },
            {
              title: 'Step 4 — apply the equation',
              detail:
                'Capacity = 2²⁸ bytes = 2⁸ × 2¹⁰ × 2¹⁰ = 2⁸ × 2¹⁰ KB = 2⁸ MB = 256 MB.',
            },
          ],
          answer: 'The physical memory capacity is 256 MB.',
        },
        { kind: 'heading', text: 'Serial vs parallel transmission', level: 'sub' },
        {
          kind: 'compare',
          headers: ['', 'Serial transmission', 'Parallel transmission'],
          rows: [
            [
              'How data moves',
              'One bit at a time through a single communication line',
              'Multiple bits simultaneously through multiple lines — each bit of a byte through a separate wire at the same time',
            ],
            ['Wiring', 'Fewer wires, simpler hardware connections', 'More wires and more complex hardware'],
            [
              'Speed',
              'Usually slower than parallel over short distances',
              'Faster over short distances',
            ],
            [
              'Distance',
              'Suitable for long-distance communication; less signal interference and fewer timing issues',
              'Can suffer signal interference and synchronisation problems (skew) over long distances',
            ],
            [
              'Used in',
              'USB, SATA, network communication',
              'Internal computer communication such as memory buses and old printer ports',
            ],
          ],
        },
        {
          kind: 'recall',
          prompt:
            'A computer has a 12-bit address bus and 16 frames. How many bits are used for the offset, and what is the size of one frame?',
          answer:
            'Frame number bits: 2^n = 16 = 2⁴, so 4 bits. Offset bits = bus width − frame number bits = 12 − 4 = 8 bits. Frame size = 2⁸ = 256 bytes.',
          hint: 'Work out the frame number bits first, then subtract from the bus width.',
        },
        {
          kind: 'quickCheck',
          questionIds: ['q6-2-1', 'q6-2-2', 'q6-2-3', 'q6-2-4'],
        },
      ],
      takeaways: [
        '2^(address bits) = maximum addressable memory in bytes; address length = bus width.',
        'Data bus: bidirectional, carries data, width sets transfer speed. Address bus: unidirectional, sets max memory. Control bus: Read/Write/Interrupt/Clock/Reset.',
        'Memory sizes are powers of 2 because addressing is binary.',
        'Serial: one bit at a time, fewer wires, good over distance. Parallel: many bits at once, faster short-range, suffers skew.',
      ],
    },

    /* ================= l6-3 ================= */
    {
      id: 'l6-3',
      moduleId: 'm6',
      title: 'Virtual memory and paging',
      summary:
        'Chopping memory into equal-sized pieces so a program never needs one unbroken block — and can even be bigger than RAM.',
      whyItMatters:
        'Paging is the single biggest idea in competency 5.4, and every calculation question builds on the page/frame relationship. Understand the relationship and the arithmetic follows.',
      objectives: [
        'Explain virtual memory and its advantages and disadvantages',
        'Define pages and frames and state the relationship between them',
        'Explain how paging eliminates external fragmentation',
        'Perform calculations relating page size, page count and memory capacity',
      ],
      prerequisites: ['l6-2'],
      minutes: 16,
      syllabusRefs: ['5.4'],
      keyTerms: ['virtual-memory', 'paging', 'page', 'frame', 'internal-fragmentation'],
      blocks: [
        {
          kind: 'definition',
          term: 'Virtual memory',
          simple: 'Pretending you have more RAM than you really do, by borrowing space from the disk.',
          technical:
            'A memory management technique where the OS uses part of the secondary storage (HDD/SSD) as an extension of RAM, allowing execution of programs larger than physical memory. It provides each process with a large logical address space, making it appear as if the system has more memory than it actually does.',
        },
        {
          kind: 'compare',
          headers: ['Advantages of virtual memory', 'Disadvantages'],
          rows: [
            [
              'Allows running large programs even with limited RAM',
              'Slower performance, because the disk is slower than RAM',
            ],
            ['Improves multitasking', 'Too much swapping causes **[[thrashing|thrashing]]**'],
            [
              'Better memory utilisation by loading only the needed parts',
              'Requires extra disk space for the swap/page file',
            ],
            [
              'Provides process isolation and protection',
              'Increases system overhead due to frequent page transfers',
            ],
          ],
        },
        { kind: 'heading', text: 'Paging: the mechanism that makes it work' },
        {
          kind: 'definition',
          term: 'Paging',
          simple: 'Cutting memory into equal-sized blocks so a program need not sit in one unbroken piece.',
          technical:
            'A memory management technique used in operating systems to eliminate the need for contiguous allocation of physical memory and to improve memory utilisation.',
        },
        {
          kind: 'steps',
          title: 'How paging works',
          steps: [
            {
              title: 'Logical memory is divided into fixed-size blocks called **[[page|pages]]**',
              detail: 'These are the pieces of the program’s virtual address space.',
            },
            {
              title: 'Physical memory is divided into fixed-size blocks called **[[frame|frames]]**',
              detail: 'These are the slots in real RAM.',
            },
            {
              title: 'Pages of a process are placed into available frames',
              detail: 'They need not be next to each other — any free frame will do.',
            },
            {
              title: 'Since page size equals frame size, pages fit exactly into frames',
              detail: 'This is not a coincidence; it is a design requirement.',
            },
            {
              title: 'The OS maintains a **[[page-table|page table]]**',
              detail: 'Mapping each page to the frame it currently occupies.',
            },
          ],
        },
        {
          kind: 'keyIdea',
          title: 'Why paging was introduced',
          text: 'To **eliminate external fragmentation**, to **support virtual memory**, and to **allow programs to be larger than physical RAM**. Every advantage of paging traces back to one of those three.',
        },
        {
          kind: 'compare',
          headers: ['Advantages of paging', 'Disadvantages'],
          rows: [
            ['Eliminates external fragmentation', '**Internal** fragmentation still occurs'],
            [
              'Enables virtual memory — programs larger than physical RAM can run',
              'The page table itself consumes memory',
            ],
            ['Allows non-contiguous memory allocation', 'Page faults slow down execution, because disk access is slow'],
            ['Supports memory protection and isolation', 'Thrashing can occur if memory is insufficient'],
            ['Allows sharing of common code, such as shared libraries', '—'],
          ],
        },
        {
          kind: 'misconception',
          wrong: 'Paging removes all fragmentation.',
          right:
            'Paging removes **external** fragmentation completely, because any page can go in any free frame. But **[[internal-fragmentation|internal fragmentation]]** remains: the last page of a program may not be completely filled.',
          why: 'If a program is 10 KB and the page size is 4 KB, it needs 3 pages (12 KB). Pages 0 and 1 are full; page 2 holds only 2 KB, and the remaining 2 KB is wasted.',
        },
        { kind: 'heading', text: 'Pages and frames' },
        {
          kind: 'table',
          headers: ['', 'Page', 'Frame'],
          rows: [
            ['Lives in', 'Logical (virtual) memory', 'Physical memory (RAM)'],
            ['Contains', 'A portion of the program — instructions or data', 'A page that has been loaded'],
            [
              'How many',
              'Depends on **virtual** memory size',
              'Depends on **physical** memory size',
            ],
            ['Size', 'A power of two — typically 4 KB, 8 KB or 16 KB', 'Exactly the same as page size'],
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'Four rules examiners test',
          text: '**1.** Frame size and page size are always powers of 2, and so are the number of pages and frames — because memory sizes are powers of 2. **2.** The number of pages depends on virtual memory size and the number of frames on physical memory size, so **they are not necessarily equal**. **3.** Page size must equal frame size to ensure proper placement; if not, it causes internal fragmentation. **4.** A process reserves either many pages or a single page, and correspondingly receives either many frames or a single frame.',
        },
        {
          kind: 'viz',
          viz: 'memoryCalculator',
          title: 'The memory calculator',
          caption:
            'Move any slider and watch the powers of two on everything else. This is the arithmetic every exam question is testing.',
        },
        { kind: 'heading', text: 'The four formulas' },
        {
          kind: 'code',
          title: 'Everything you need for paging calculations',
          lines: [
            'Virtual memory capacity  = page size  × number of pages',
            'Physical memory capacity = frame size × number of frames',
            '',
            '2^(offset bits)       = page size in bytes   (= frame size)',
            '2^(page number bits)  = number of pages',
            '2^(frame number bits) = number of frames',
            '',
            'Virtual address length  = page number bits  + offset bits',
            'Physical address length = frame number bits + offset bits   (= bus width)',
          ],
        },
        {
          kind: 'worked',
          title: 'Question: total virtual memory capacity',
          problem:
            'A computer system has virtual memory divided into 4096 pages. If one page is 4 MB in size, what is the total capacity of this virtual memory?',
          steps: [
            {
              title: 'Use the formula',
              detail: 'Virtual memory capacity = size of a page × number of pages',
            },
            {
              title: 'Convert both to powers of 2',
              detail: '4 MB = 2² × 2²⁰ bytes = 2²² bytes.   4096 = 2¹².',
            },
            {
              title: 'Multiply the powers by adding the exponents',
              detail: '2²² × 2¹² = 2³⁴ bytes = 2⁴ × 2³⁰ bytes = 2⁴ GB',
            },
          ],
          answer: '16 GB',
        },
        {
          kind: 'worked',
          title: 'Question: how many pages?',
          problem:
            'A 2 GB virtual memory has been divided into 512 KB pages. How many pages is this virtual memory divided into?',
          steps: [
            {
              title: 'Use the formula',
              detail: 'Number of pages = virtual memory capacity ÷ size of one page',
            },
            {
              title: 'Convert to powers of 2',
              detail: '2 GB = 2¹ × 2³⁰ = 2³¹ bytes.   512 KB = 2⁹ × 2¹⁰ = 2¹⁹ bytes.',
            },
            {
              title: 'Divide by subtracting the exponents',
              detail: '2³¹ ÷ 2¹⁹ = 2¹² = 4096',
            },
          ],
          answer: '4096 pages',
        },
        {
          kind: 'worked',
          title: 'Question: how many offset bits?',
          problem: 'A system uses pages of size 8 KB. How many bits are required for the offset?',
          steps: [
            {
              title: 'Use the formula',
              detail: '2^(offset bits) = page size in bytes',
            },
            {
              title: 'Convert 8 KB to a power of 2',
              detail: '8 KB = 2³ × 2¹⁰ = 2¹³ bytes',
            },
            {
              title: 'Read off the exponent',
              detail: 'offset bits = 13',
            },
          ],
          answer: '13 bits',
        },
        {
          kind: 'callout',
          tone: 'success',
          title: 'The technique that makes all of these easy',
          text: 'Convert **everything** to a power of 2 before doing anything else. Then multiplying means adding exponents and dividing means subtracting them. No calculator required, and no arithmetic slips.',
        },
        {
          kind: 'confused',
          question:
            'If a program is bigger than my RAM, where do the extra pages actually live?',
          simpler:
            'On the disk, in a file the OS reserves for the purpose (the swap file or page file). Only the pages you are currently using sit in RAM. When you need one that is not there, the OS fetches it from disk and — if RAM is full — sends a different page back out.',
          picture:
            'Your desk holds five books at a time; the bookshelf holds five hundred. You are "working with" all five hundred, but only five are physically in front of you. Fetching a sixth means putting one back.',
          prerequisite: { label: 'Why memory needs managing', lessonId: 'l6-1' },
        },
        {
          kind: 'recall',
          prompt:
            'Why must page size equal frame size? What happens if they do not?',
          answer:
            'So a page fits exactly into a frame, ensuring proper placement in physical memory. If the sizes differ, it causes internal fragmentation. It is also what allows the offset to remain unchanged during address translation.',
        },
        {
          kind: 'quickCheck',
          questionIds: ['q6-3-1', 'q6-3-2', 'q6-3-3', 'q6-3-4', 'q6-3-5'],
        },
      ],
      takeaways: [
        'Virtual memory uses secondary storage as an extension of RAM so programs bigger than RAM can run.',
        'Paging divides logical memory into pages and physical memory into equal-sized frames.',
        'Page size = frame size, always; both are powers of 2.',
        'Paging eliminates external fragmentation but internal fragmentation remains in the last page.',
        'Convert everything to powers of 2: multiply = add exponents, divide = subtract exponents.',
      ],
    },

    /* ================= l6-4 ================= */
    {
      id: 'l6-4',
      moduleId: 'm6',
      title: 'Page tables, address translation and the MMU',
      summary:
        'How a virtual address becomes a real one — and the one part of it that never changes.',
      whyItMatters:
        'Address translation questions are worth several marks and students routinely throw them away by altering the offset. Do this lesson properly and those marks are free.',
      objectives: [
        'Describe the structure of a page table entry',
        'Perform address translation in binary and using arithmetic',
        'Explain why the offset never changes',
        'State the functions of the MMU',
      ],
      prerequisites: ['l6-3'],
      minutes: 16,
      syllabusRefs: ['5.4'],
      keyTerms: [
        'page-table',
        'address-translation',
        'offset',
        'mmu',
        'present-bit',
        'dirty-bit',
      ],
      blocks: [
        {
          kind: 'prose',
          paragraphs: [
            'Whenever a program accesses memory, the CPU produces a **logical address**. That address cannot reach physical memory without translation. The **[[mmu|Memory Management Unit]]** performs the translation, using the page table maintained by the operating system.',
          ],
        },
        { kind: 'heading', text: 'The parts of an address' },
        {
          kind: 'compare',
          title: 'A virtual address has two parts',
          headers: ['Part', 'What it identifies'],
          rows: [
            [
              '**Page number**',
              'Which page in virtual memory. It is used to index the page table.',
            ],
            [
              '**[[offset|Offset (displacement)]]**',
              'The address of a particular byte within that page — the distance from the start of the page to the required data. If the page size is 2ⁿ bytes, the offset requires n bits.',
            ],
          ],
        },
        {
          kind: 'compare',
          title: 'A physical address has two parts too',
          headers: ['Part', 'What it identifies'],
          rows: [
            ['**Frame number**', 'Which frame in physical memory (RAM).'],
            [
              '**Offset (displacement)**',
              'The exact position within that frame — **the same value as the virtual offset**.',
            ],
          ],
        },
        {
          kind: 'keyIdea',
          title: 'The rule that earns you the marks',
          text: 'During translation the **page number is replaced by the frame number**, while the **offset remains completely unchanged**. Larger pages have larger possible offsets; smaller pages have smaller ranges — but within one translation the offset is never touched.',
        },
        {
          kind: 'viz',
          viz: 'addressTranslation',
          title: 'Translate an address yourself',
          caption:
            'Move the page number and offset sliders. Watch the orange offset bits stay byte-for-byte identical top and bottom.',
        },
        {
          kind: 'confused',
          question: 'Why does the offset not change? It feels like it should.',
          simpler:
            'Because a page and a frame are exactly the same size. If a byte was 232 bytes from the start of its page, then after the page is copied into a frame that byte is still 232 bytes from the start of the frame. Nothing inside was rearranged — the whole page moved as one lump.',
          picture:
            'Move a full box of books from one shelf to another. The book that was 12th from the left is still 12th from the left. Only the shelf number changed.',
        },
        { kind: 'heading', text: 'The page table' },
        {
          kind: 'definition',
          term: 'Page table',
          simple: 'A lookup table saying which frame each page is currently sitting in.',
          technical:
            'A data structure maintained by the operating system to map virtual pages to physical frames. Each process has its own page table, and each entry corresponds to a page number.',
        },
        {
          kind: 'table',
          title: 'What a page table entry (PTE) contains',
          headers: ['Field', 'Purpose'],
          rows: [
            [
              '**Frame number**',
              'Stores the address (or number) of the physical memory frame where the page is located, so the system can map the virtual page to the correct location in main memory.',
            ],
            [
              '**[[present-bit|Present/absent bit]]**',
              'Indicates whether the corresponding page is currently loaded in physical memory. **1** = the page is resident in RAM and contains valid data the CPU can use. **0** = the page is not currently loaded in RAM.',
            ],
            [
              '**[[dirty-bit|Dirty bit]]**',
              'Becomes set when a page is modified in memory, indicating that the updated data must be written back to disk before the page is replaced.',
            ],
            [
              '**Referenced bit**',
              'Set when the page is accessed (read or written), helping the OS track recently used pages for page replacement algorithms such as LRU or Clock.',
            ],
            [
              '**Protection bits**',
              'Specify the allowed operations on the page — reading data, writing data, or executing instructions — ensuring memory protection and access control.',
            ],
          ],
        },
        { kind: 'heading', text: 'Translation, two ways' },
        {
          kind: 'worked',
          title: 'Method 1 — arithmetic',
          problem:
            'Logical address = byte 1000. Page size = 256 bytes. Find the page number and offset.',
          steps: [
            {
              title: 'Page number = logical address ÷ page size',
              detail: '1000 ÷ 256 = 3.90625 → take the integer part → page number = 3',
            },
            {
              title: 'Offset = logical address mod page size',
              detail: '1000 mod 256 = 232   (mod means the remainder after division)',
            },
            {
              title: 'Interpret the result',
              detail:
                'Address 1000 sits at page 3, offset 232 — the 232nd byte inside the fourth page.',
            },
            {
              title: 'To finish the translation',
              detail:
                'Look up page 3 in the page table to get the frame number, then: physical address = frame number × frame size + offset.',
            },
          ],
          answer: 'Page 3, offset 232. Physical address = frame number × 256 + 232.',
        },
        {
          kind: 'worked',
          title: 'Method 2 — binary substitution',
          problem:
            'A CPU has a 14-bit logical address space: 4 bits for the page number and 10 bits for the displacement. A program requests virtual address `01011011101001`. The page table says page 5 → frame 111₂ (frame numbers are 3 bits). Find the physical address.',
          steps: [
            {
              title: 'Step 1 — split the address',
              detail:
                'First 4 bits = page number = `0101` (= 5 in decimal). Remaining 10 bits = offset = `1011101001`.',
            },
            {
              title: 'Step 2 — look up the page table',
              detail:
                'Page 5 maps to frame `111`₂ = 7 in decimal, and the present bit is 1 — so page 5 really is in physical memory, in frame 7.',
            },
            {
              title: 'Step 3 — substitute the frame number for the page number',
              detail: 'Replace `0101` with `111`, keeping the offset exactly as it was.',
            },
            {
              title: 'Step 4 — the physical address',
              detail:
                '`111` + `1011101001` = `1111011101001` (13 bits: 3 frame bits + 10 offset bits).',
            },
          ],
          answer:
            'Physical address = `1111011101001`. Note that the displacement of both the page and the frame are identical — it has not changed during translation.',
        },
        {
          kind: 'worked',
          title: 'A hexadecimal version',
          problem:
            'The CPU wants to access virtual address `0x4F5DE`. The page number is `0x4F`, and the frame number that corresponds to page `0x4F` is `0x35`. What is the physical address?',
          steps: [
            {
              title: 'Step 1 — split at the given boundary',
              detail:
                'The page number is `0x4F`, so the first 8 bits (two hex digits) are the page number and the remaining digits `5DE` are the offset.',
            },
            {
              title: 'Step 2 — substitute',
              detail: 'Page `0x4F` maps to frame `0x35`. Replace `4F` with `35`; keep `5DE` intact.',
            },
            {
              title: 'Step 3 — read off the answer',
              detail: '`0x35` + `5DE` = `0x355DE`',
            },
          ],
          answer: '0x355DE',
        },
        { kind: 'heading', text: 'The Memory Management Unit' },
        {
          kind: 'definition',
          term: 'Memory Management Unit (MMU)',
          simple: 'The hardware chip that converts virtual addresses into real ones.',
          technical:
            'A hardware component responsible for handling memory access requests and managing the system’s memory resources.',
        },
        {
          kind: 'list',
          title: 'Functions of the MMU',
          style: 'number',
          items: [
            '**Address translation** — translates virtual addresses generated by the CPU into physical addresses in main memory',
            '**Memory protection** — prevents processes from accessing memory areas not allocated to them',
            '**Relocation** — allows programs to run in different memory locations without modifying their addresses',
            '**Virtual memory support** — supports techniques such as paging and segmentation',
            '**Access control** — ensures each process accesses only its assigned memory space',
          ],
        },
        { kind: 'heading', text: 'Calculating page table size', level: 'sub' },
        {
          kind: 'code',
          lines: [
            'Page Table Size = PTE Count × Size of one PTE',
            '',
            'PTE Count = number of pages',
            'PTE Size  = frame number bits + other control bits',
          ],
        },
        {
          kind: 'worked',
          title: 'A page table size question',
          problem:
            'Virtual address space = 4 GB (2³² bytes). Page size = 4 KB (2¹² bytes). Each PTE is 4 bytes. Calculate the total size of the page table.',
          steps: [
            {
              title: 'Step 1 — number of virtual pages',
              detail: 'N = virtual address space ÷ page size = 2³² ÷ 2¹² = 2²⁰ pages',
            },
            {
              title: 'Step 2 — number of PTEs',
              detail: 'One entry per page, so 2²⁰ PTEs.',
            },
            {
              title: 'Step 3 — multiply by the entry size',
              detail: '2²⁰ × 4 bytes = 2²⁰ × 2² = 2²² bytes = 4 MB',
            },
          ],
          answer:
            '4 MB — and note that this is per process. Page tables consuming memory is a genuine disadvantage of paging.',
        },
        {
          kind: 'examTip',
          text: 'Whenever you are asked for a physical address, write the frame number and offset as separate labelled parts before combining them. Examiners award method marks, and it makes the "offset unchanged" rule impossible to break by accident.',
        },
        {
          kind: 'quickCheck',
          questionIds: ['q6-4-1', 'q6-4-2', 'q6-4-3', 'q6-4-4', 'q6-4-5'],
        },
      ],
      takeaways: [
        'Virtual address = page number + offset; physical address = frame number + offset.',
        'Translation replaces the page number with the frame number; the offset never changes.',
        'A PTE holds the frame number, present/absent bit, dirty bit, referenced bit and protection bits.',
        'MMU functions: address translation, memory protection, relocation, virtual memory support, access control.',
        'Page number = address ÷ page size; offset = address mod page size.',
      ],
    },

    /* ================= l6-5 ================= */
    {
      id: 'l6-5',
      moduleId: 'm6',
      title: 'Page faults, demand paging and the TLB',
      summary:
        'What happens when the page you want is not in RAM, how the OS deals with it, and the cache that makes translation fast.',
      whyItMatters:
        'Page fault questions ask you both to explain the mechanism and to work out the physical address *after* the OS has serviced the fault. Both need the same clear picture of what actually happens.',
      objectives: [
        'Define a page fault and explain what causes one',
        'Explain demand paging',
        'Explain how a page fault is serviced when no free frame exists',
        'Describe the TLB and thrashing',
      ],
      prerequisites: ['l6-4'],
      minutes: 13,
      syllabusRefs: ['5.4'],
      keyTerms: ['page-fault', 'demand-paging', 'thrashing', 'tlb', 'present-bit'],
      blocks: [
        {
          kind: 'definition',
          term: 'Page fault',
          simple: 'The program asked for a page that is not in RAM right now.',
          technical:
            'Occurs when a program tries to access a page that is not currently in main memory. If the CPU requests a page whose present/absent bit is 0, the operating system generates a page fault interrupt.',
        },
        {
          kind: 'steps',
          title: 'What the OS does about it',
          steps: [
            {
              title: 'The CPU requests a page and finds present bit = 0',
              detail: 'The page is not in RAM.',
            },
            {
              title: 'A page fault interrupt is generated',
              detail: 'Execution of the process is suspended.',
            },
            {
              title: 'The OS loads the required page from secondary storage into RAM',
              detail: 'If a free frame exists, it goes there.',
            },
            {
              title: 'If no frame is free, a resident page is evicted first',
              detail:
                'The victim page’s present bit is set to 0, freeing its frame. If the victim’s dirty bit is set, it must be written back to disk first.',
            },
            {
              title: 'The page table is updated',
              detail: 'The new page’s frame number is recorded and its present bit set to 1.',
            },
            {
              title: 'The program continues from where it stopped',
              detail: 'It never knows the interruption happened.',
            },
          ],
        },
        {
          kind: 'viz',
          viz: 'addressTranslation',
          title: 'Trigger a page fault and service it',
          caption:
            'Set the page number to 4 — its present bit is 0. Then press "Service the page fault" and watch which page gets evicted and how the table changes.',
        },
        {
          kind: 'definition',
          term: 'Demand paging',
          simple: 'Only load a page into RAM at the moment it is actually needed.',
          technical:
            'A scheme in which pages are not loaded into RAM until the program actually needs them, avoiding the loading of unnecessary pages and reducing RAM usage.',
        },
        {
          kind: 'list',
          title: 'The most likely reasons a page fault occurs',
          style: 'number',
          items: [
            'The requested page was **swapped out** to virtual memory to free physical memory for other pages.',
            'The page was **never loaded** into physical memory — which happens if it is being accessed for the first time.',
          ],
        },
        {
          kind: 'list',
          title: 'How to reduce page faults',
          style: 'check',
          items: [
            '**Increase RAM size** — more pages can stay in memory',
            '**Use efficient page replacement algorithms** — FIFO, LRU, Optimal',
            '**Locality of reference** — programs should access nearby memory locations',
            '**Working set model** — keep frequently used pages in RAM',
          ],
        },
        {
          kind: 'callout',
          tone: 'info',
          title: 'Page faults cannot be eliminated',
          text: 'They can be **reduced**, never removed completely. A program accessing a page for the very first time must always fault — there is no way to have loaded it in advance without loading everything, which is precisely what demand paging is avoiding.',
        },
        { kind: 'heading', text: 'Thrashing' },
        {
          kind: 'definition',
          term: 'Thrashing',
          simple: 'The system spends all its time swapping pages instead of doing any work.',
          technical:
            'A condition where excessive swapping between main memory and secondary storage occurs because physical memory is insufficient, so the CPU spends most of its time servicing page faults rather than executing processes.',
        },
        {
          kind: 'analogy',
          title: 'A desk that is too small',
          everyday:
            'You are working with five books but your desk fits only two. Every time you need a third, you must put one away and fetch another. Soon you are spending all your time carrying books to and from the shelf and none of it reading. You are working extremely hard and achieving nothing.',
          mapsTo:
            'That is thrashing exactly. The fix is the same in both cases: a bigger desk (more RAM), or working with fewer books at once (fewer concurrent processes).',
        },
        { kind: 'heading', text: 'The Translation Lookaside Buffer' },
        {
          kind: 'definition',
          term: 'Translation Lookaside Buffer (TLB)',
          simple: 'A tiny, very fast cache of recently used page-table rows.',
          technical:
            'A small and very fast memory cache used to store frequently accessed page table information. It stores recently used page table entries so the CPU can quickly find the required frame number.',
        },
        {
          kind: 'prose',
          paragraphs: [
            'Because the page table information is already in the TLB, address translation becomes much faster. If the required page table entry is found in the TLB, it is called a **TLB hit**.',
            'By reducing the number of page table lookups, TLBs significantly improve memory access speed and system performance.',
          ],
        },
        {
          kind: 'confused',
          question:
            'Why is a TLB needed at all? Is the page table not already in memory?',
          simpler:
            'It is — and that is the problem. Reading the page table means an extra trip to memory, so every single memory access would cost **two** memory accesses: one to read the table, one to get the data. The TLB is small enough to be searched almost instantly, so most translations cost nothing extra.',
          picture:
            'The page table is a phone directory in another room. The TLB is the six numbers you have memorised — the ones you call constantly. Most calls need no trip to the other room.',
          prerequisite: { label: 'Page tables and address translation', lessonId: 'l6-4' },
        },
        {
          kind: 'worked',
          title: 'A page fault question with an eviction',
          problem:
            'A request arrives for virtual address `01000000001011` (page number `0100` = 4). The page table shows page 4 has present bit 0. To fulfil the request, the OS changed the present/absent bit of page 7 from 1 to 0. Page 7 was in frame `101`₂. What is the resulting 13-bit physical address?',
          steps: [
            {
              title: 'Step 1 — why is there a fault?',
              detail:
                'Page 4 is not loaded into physical memory, because its present/absent bit is 0.',
            },
            {
              title: 'Step 2 — what did the OS do?',
              detail:
                'Changing page 7’s present bit from 1 to 0 means page 7 was moved back to virtual memory, and its frame `101`₂ (= 5) was freed to fulfil the request.',
            },
            {
              title: 'Step 3 — load page 4 into the freed frame',
              detail:
                'Frame 5 (`101`) is now empty, so page 4 is loaded into it. The page table is updated to record this.',
            },
            {
              title: 'Step 4 — build the physical address',
              detail:
                'Replace the page number `0100` with the frame number `101`, keeping the offset `0000001011` intact: `101` + `0000001011` = `1010000001011`.',
            },
          ],
          answer: 'The physical address is `1010000001011`.',
        },
        {
          kind: 'recall',
          prompt:
            'A page fault occurs and no frame is free. Describe what the OS does, in three steps.',
          answer:
            'It selects a victim page currently in RAM and sets its present bit to 0, freeing its frame (writing it back to disk first if its dirty bit is set). It loads the required page from secondary storage into that freed frame. It updates the page table with the new frame number and sets the new page’s present bit to 1.',
        },
        {
          kind: 'quickCheck',
          questionIds: ['q6-5-1', 'q6-5-2', 'q6-5-3', 'q6-5-4'],
        },
      ],
      takeaways: [
        'A page fault occurs when the requested page has present/absent bit 0 — it is not in RAM.',
        'Demand paging loads pages only when actually needed, reducing RAM usage.',
        'Servicing a fault with no free frame requires evicting a resident page and setting its present bit to 0.',
        'Thrashing = excessive swapping because RAM is insufficient; the CPU services faults instead of executing.',
        'The TLB caches recent page table entries; finding one there is a TLB hit.',
      ],
    },
  ],
}
