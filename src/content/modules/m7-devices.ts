import type { Module } from '@/types/content'

export const m7: Module = {
  id: 'm7',
  title: 'Device management and the kernel',
  shortTitle: 'Devices',
  description:
    'How the OS talks to every different piece of hardware you plug in, how it stops slow devices holding up the CPU, and what sits at the very core of the operating system.',
  accent: 'indigo',
  syllabusRefs: ['5.4'],
  lessons: [
    /* ================= l7-1 ================= */
    {
      id: 'l7-1',
      moduleId: 'm7',
      title: 'How the OS manages input and output devices',
      summary:
        'Device controllers and device drivers: the hardware and software halves of talking to a keyboard, a printer or a disk.',
      whyItMatters:
        '"Briefly describes how an OS manages input and output devices" is a named learning outcome, and it has a clean two-part answer: controllers and drivers.',
      objectives: [
        'State what device management does',
        'Describe device controllers and device drivers',
        'Explain why applications do not communicate directly with hardware',
      ],
      prerequisites: ['l2-1'],
      minutes: 9,
      syllabusRefs: ['5.4'],
      keyTerms: ['device-controller', 'device-driver'],
      blocks: [
        {
          kind: 'prose',
          paragraphs: [
            'The function of an operating system in device management is to **control, coordinate and manage all hardware input and output devices connected to the computer**. It ensures devices work correctly, allocates them to programs, and handles communication between software and hardware.',
            'Crucially, **applications do not communicate directly with hardware**. Instead they send requests to the OS, which handles the device interaction. The OS acts as a middle layer between applications and hardware devices.',
          ],
        },
        {
          kind: 'list',
          title: 'What device management does',
          style: 'check',
          items: [
            'Controls input devices: keyboard, mouse, scanner',
            'Controls output devices: monitor, printer, speakers',
            'Allocates devices to programs when needed',
            'Handles device errors and interrupts',
          ],
        },
        {
          kind: 'keyIdea',
          title: 'Two components do the work',
          text: 'The OS manages devices using **device controllers** (hardware) and **device drivers** (software). One question, two named answers: that is how the marks are allocated.',
        },
        {
          kind: 'compare',
          headers: ['', '[[device-controller|Device controller]]', '[[device-driver|Device driver]]'],
          rows: [
            ['What it is', 'A **hardware** component', '**Software** (a type of system software)'],
            [
              'Its role',
              'Acts as an interface between the computer system and a specific hardware device. Manages the electronic communication between the device and the CPU.',
              'Allows the operating system to communicate with a hardware device by translating general OS instructions into device-specific commands.',
            ],
            [
              'What it does',
              'Controls device operations · Receives commands from the OS · Transfers data between the device and memory',
              'Without drivers, the OS cannot understand how to use a device.',
            ],
          ],
        },
        {
          kind: 'analogy',
          title: 'A translator and a telephone',
          everyday:
            'You want to speak to someone who only speaks Japanese. The **telephone** is the physical equipment that carries your voice: that is the device controller. The **interpreter** who converts your English into Japanese is the driver. Change to a Korean speaker and you need a different interpreter, but the same telephone.',
          mapsTo:
            'That is exactly why every different printer model needs its own driver, but they all connect through the same USB controller. The driver knows the language of one specific device.',
        },
        {
          kind: 'misconception',
          wrong: 'A device driver is hardware, because it comes with the device.',
          right:
            'A device driver is **software**: system software that the OS loads to talk to the device. The hardware part is the device controller, which sits on the motherboard or inside the device itself.',
        },
        {
          kind: 'recall',
          prompt:
            'A program wants to print a document. Describe the chain of components between the program and the paper.',
          answer:
            'The program sends a request to the OS (it never touches hardware directly). The OS passes it to the printer’s device driver, which translates the general instruction into printer-specific commands. Those go to the device controller, which manages the electronic communication with the printer itself.',
        },
        {
          kind: 'quickCheck',
          questionIds: ['q7-1-1', 'q7-1-2'],
        },
      ],
      takeaways: [
        'The OS controls, coordinates and manages all I/O devices; applications never talk to hardware directly.',
        'Device controller = hardware interface between the system and a specific device.',
        'Device driver = software translating general OS instructions into device-specific commands.',
        'Without a driver, the OS cannot use a device.',
      ],
    },

    /* ================= l7-2 ================= */
    {
      id: 'l7-2',
      moduleId: 'm7',
      title: 'Device drivers, Plug and Play, and drive letters',
      summary:
        'How installing a driver went from inserting a floppy disk to plugging in a cable, and why your USB stick is sometimes E: and sometimes F:.',
      whyItMatters:
        '"Installs appropriate device drivers when connecting a peripheral" is a practical learning outcome. Understanding the evolution explains why you rarely have to do it manually any more.',
      objectives: [
        'Describe the evolution of device driver installation',
        'Explain Plug and Play and its advantages',
        'Explain drive letters, their uses, advantages and disadvantages',
      ],
      prerequisites: ['l7-1'],
      minutes: 10,
      syllabusRefs: ['5.4'],
      keyTerms: ['device-driver', 'plug-and-play', 'drive-letter'],
      blocks: [
        {
          kind: 'prose',
          paragraphs: [
            'Device drivers have evolved as computer technology improved. Earlier computers required manual driver installation; modern systems support automatic detection and installation.',
          ],
        },
        {
          kind: 'steps',
          title: 'Four generations of driver installation',
          steps: [
            {
              title: 'Floppy disks (1980s–1990s)',
              detail:
                'Drivers were provided on floppy disks. Users had to insert the disk and manually install the driver before the device could work. Used for early printers, sound cards and network cards. **Problem:** floppy disks had very limited storage, and could easily be lost or damaged.',
            },
            {
              title: 'CDs and DVDs',
              detail:
                'As devices became more advanced, manufacturers began providing drivers on CDs or DVDs, which could store larger driver software and installation programs. Used for printer, graphics card and scanner drivers. **Problem:** drivers on CDs became outdated quickly, and many modern computers no longer have CD drives.',
            },
            {
              title: 'Downloaded from the internet',
              detail:
                'Manufacturers started providing drivers on their official websites, so users could download the latest versions. Used for NVIDIA graphics drivers, HP printer drivers, Intel network drivers. **Advantage:** better device performance from up-to-date drivers.',
            },
            {
              title: 'Plug and Play (modern systems)',
              detail:
                'Windows, Linux and macOS support **[[plug-and-play|Plug and Play (PnP)]]**, which automatically detects a newly connected device, finds the correct driver, and installs it. Used for USB mice, keyboards, flash drives and external hard drives.',
            },
          ],
        },
        {
          kind: 'list',
          title: 'Advantages of Plug and Play',
          style: 'check',
          items: [
            'No manual installation required',
            'Faster device setup',
            'Easy for users',
          ],
        },
        { kind: 'heading', text: 'Drive letters' },
        {
          kind: 'definition',
          term: 'Drive letter',
          simple: 'The letter Windows uses to name each drive, like C: or D:.',
          technical:
            'A single alphabetical letter assigned by the operating system, especially Microsoft Windows, to identify a storage device or partition. Each storage device or partition is assigned a letter followed by a colon.',
        },
        {
          kind: 'steps',
          title: 'How the OS assigns a drive letter',
          steps: [
            { title: 'The OS detects the device', detail: 'When a device connects.' },
            { title: 'The OS checks available letters', detail: 'Which letters are not already in use.' },
            { title: 'The OS assigns the next free drive letter', detail: '' },
          ],
        },
        {
          kind: 'table',
          headers: ['Drive letter', 'Typically'],
          rows: [
            ['**C:**', 'The primary storage drive where the operating system is installed'],
            [
              '**D:, E:, F: …**',
              'Additional hard disk partitions, CD/DVD drives, USB flash drives, external hard drives',
            ],
            [
              '**A: and B:**',
              'Historically reserved for floppy disk drives. In early computers during the 1970s and 1980s, storage was mainly floppy disks and computers often had two floppy drives, so the first two letters were taken.',
            ],
          ],
        },
        {
          kind: 'compare',
          headers: ['Advantages of drive letters', 'Disadvantages'],
          rows: [
            [
              '**Easy to identify storage devices**: a simple way to recognise different devices',
              '**Limited number of letters**: only 26 (A–Z). Servers with many storage devices may run out.',
            ],
            [
              '**Simple file navigation**: file paths become easy to understand and use, e.g. `C:\\Users\\Student\\Documents`',
              '**Drive letters may change**: when removable devices such as USB drives are connected, the letter assigned may differ from last time.',
            ],
            [
              '**Supports multiple storage devices**: the OS can manage many devices at once',
              '',
            ],
          ],
        },
        {
          kind: 'confused',
          question: 'Why does my USB drive get a different letter on different computers?',
          simpler:
            'Because the OS just hands out the next free letter. On a computer with one hard disk your USB becomes D:. On a computer with three partitions and a DVD drive, D:, E: and F: are already taken, so your USB becomes G:. Nothing about the USB stick decided this.',
          picture:
            'It is like being given the next free seat in a cinema. The seat number depends entirely on who arrived before you, not on who you are.',
        },
        {
          kind: 'quickCheck',
          questionIds: ['q7-2-1', 'q7-2-2', 'q7-2-3'],
        },
      ],
      takeaways: [
        'Driver installation evolved: floppy disks → CDs/DVDs → internet downloads → Plug and Play.',
        'Plug and Play automatically detects a device, finds the right driver and installs it.',
        'A drive letter identifies a storage device or partition; the OS assigns the next free letter.',
        'A: and B: were reserved for floppy drives; only 26 letters exist, and removable drives may change letters.',
      ],
    },

    /* ================= l7-3 ================= */
    {
      id: 'l7-3',
      moduleId: 'm7',
      title: 'Spooling and buffering',
      summary:
        'Two ways to stop a slow device holding up a fast CPU, and the difference between them, which is a guaranteed exam question.',
      whyItMatters:
        '"Briefly describes spooling" is a named learning outcome, and spooling vs buffering is an easy comparison to get right if you remember one thing: where the data is stored.',
      objectives: [
        'Define spooling and explain the printer spooling example',
        'State the advantages and disadvantages of spooling',
        'Define buffering and distinguish it from spooling',
      ],
      prerequisites: ['l7-1'],
      minutes: 9,
      syllabusRefs: ['5.4'],
      keyTerms: ['spooling', 'buffering'],
      blocks: [
        {
          kind: 'definition',
          term: 'Spooling',
          simple:
            'Queueing jobs on disk so a slow device can work through them while the CPU gets on with other things.',
          technical:
            'Simultaneous Peripheral Operations On-Line: an operating system technique in which I/O data from multiple processes is queued in secondary storage (disk) so that a peripheral device can process the jobs sequentially while the CPU continues executing other processes.',
        },
        {
          kind: 'keyIdea',
          text: 'Without spooling, the CPU must wait until the peripheral device finishes the current job, which reduces overall system efficiency.',
        },
        {
          kind: 'viz',
          viz: 'spooling',
          title: 'The same three print jobs, with and without spooling',
          caption:
            'Press play and watch the CPU indicator on the left. Every second it spends waiting is processing power thrown away.',
        },
        {
          kind: 'steps',
          title: 'Printer spooling, step by step',
          steps: [
            { title: 'Multiple programs send print jobs', detail: '' },
            {
              title: 'The operating system stores each job in a spool file on disk',
              detail: 'Not in main memory, on secondary storage.',
            },
            { title: 'A print spooler manages the job queue', detail: '' },
            {
              title: 'The printer takes jobs from the queue and prints them sequentially',
              detail: 'Meanwhile the user can continue using the computer.',
            },
          ],
        },
        {
          kind: 'table',
          title: 'Components involved',
          headers: ['Component', 'Role'],
          rows: [
            ['CPU', 'Sends data to the spool system'],
            ['Disk', 'Stores spooled data'],
            ['Spooler', 'Manages the job queue'],
            ['Peripheral device', 'Processes data slowly'],
          ],
        },
        {
          kind: 'compare',
          headers: ['Advantages of spooling', 'Disadvantages'],
          rows: [
            [
              'Improves CPU utilisation by allowing the CPU to continue other tasks without waiting for slow devices',
              'Requires additional disk space to store spool files',
            ],
            [
              'Enables multiple processes or users to share a single peripheral device efficiently',
              'Introduces extra overhead for managing the spool queue',
            ],
            [
              'Organises I/O jobs in a queue for sequential processing, improving device management',
              'Failure of the spool system or disk can delay or interrupt all queued jobs',
            ],
          ],
        },
        {
          kind: 'list',
          title: 'Other uses of spooling',
          items: [
            'Printing systems',
            'Batch I/O processing',
            'Network job queues',
            'Media rendering queues',
            'Background report generation',
          ],
        },
        { kind: 'heading', text: 'Buffering' },
        {
          kind: 'definition',
          term: 'Buffering',
          simple: 'A small holding area in RAM that smooths out speed differences.',
          technical:
            'The temporary storage of data in a memory area called a buffer while it is being transferred between two devices or processes that operate at different speeds. It helps ensure smooth and efficient data transfer by holding data until the receiving component is ready to process it.',
        },
        {
          kind: 'compare',
          title: 'Spooling vs buffering: the comparison to memorise',
          headers: ['Feature', 'Spooling', 'Buffering'],
          rows: [
            ['**Storage used**', 'Disk (secondary storage)', 'Main memory (RAM)'],
            ['**Data size**', 'Large', 'Small'],
            ['**Purpose**', 'Manage slow devices', 'Handle speed mismatch between two components'],
            ['**Example**', 'Printer job queue', 'Keyboard input buffer'],
          ],
        },
        {
          kind: 'analogy',
          title: 'A restaurant',
          everyday:
            '**Buffering** is the small hot plate under the serving hatch: a dish sits there for a moment between the chef finishing it and the waiter collecting it. It is tiny, it is in the kitchen, and it smooths out a mismatch of seconds. **Spooling** is the order pad: fifty orders written down and worked through in turn, kept somewhere else entirely, so the waiters can keep taking orders while the kitchen catches up.',
          mapsTo:
            'Buffer = small, in RAM, speed mismatch. Spool = large, on disk, device queue. Two different problems.',
        },
        {
          kind: 'recall',
          prompt:
            'State the two clearest differences between spooling and buffering.',
          answer:
            'Where the data is stored: spooling uses disk (secondary storage), buffering uses main memory. And the purpose: spooling manages slow devices with a job queue, buffering handles a speed mismatch between two components. Spooling also handles larger amounts of data.',
        },
        {
          kind: 'quickCheck',
          questionIds: ['q7-3-1', 'q7-3-2', 'q7-3-3'],
        },
      ],
      takeaways: [
        'Spooling queues I/O data from multiple processes in secondary storage so the CPU need not wait for slow devices.',
        'Spooling uses disk and handles large data; buffering uses RAM and handles small amounts.',
        'Spooling manages slow devices; buffering handles speed mismatch.',
        'Example of each: printer job queue (spooling), keyboard input buffer (buffering).',
      ],
    },

    /* ================= l7-4 ================= */
    {
      id: 'l7-4',
      moduleId: 'm7',
      title: 'The kernel and the world of operating systems',
      summary:
        'What sits at the very core of the OS, the three kernel designs, and the OS brands you should be able to name.',
      whyItMatters:
        'The kernel ties every function in this unit together: process, memory, device and file management are all kernel jobs. And "name an OS used for X" is a free mark if you have the examples ready.',
      objectives: [
        'Define the kernel and list its main functions',
        'Distinguish monolithic, micro and hybrid kernels',
        'Name operating system brands across device categories',
      ],
      prerequisites: ['l7-3'],
      minutes: 8,
      syllabusRefs: ['5.4'],
      keyTerms: ['kernel', 'monolithic-kernel', 'microkernel', 'system-call'],
      blocks: [
        {
          kind: 'definition',
          term: 'Operating system kernel',
          simple: 'The innermost part of the OS: the bit that talks straight to the hardware.',
          technical:
            'The core part of an operating system that directly interacts with the computer hardware and manages system resources.',
        },
        {
          kind: 'list',
          title: 'Main functions of the kernel',
          style: 'number',
          items: [
            '**Process management**: controls the creation, scheduling and termination of processes',
            '**Memory management**: allocates and deallocates memory to programs',
            '**Device management**: communicates with hardware devices through device drivers',
            '**File management**: manages files and storage devices',
            '**[[system-call|System call]] handling**: provides an interface between user programs and hardware',
          ],
        },
        {
          kind: 'keyIdea',
          title: 'You have already learned all five',
          text: 'Those five functions are Modules 3–7 of this course. The kernel is where they all live: everything you have studied since Module 3 is a description of what the kernel does.',
        },
        {
          kind: 'compare',
          title: 'Three kernel designs',
          headers: ['Type', 'How it works', 'Example'],
          rows: [
            [
              '**[[monolithic-kernel|Monolithic]]**',
              'All OS services run in kernel space as one large program.',
              'Linux',
            ],
            [
              '**[[microkernel|Microkernel]]**',
              'Only essential services run in the kernel; others run in user space as separate processes.',
              'MINIX 3, QNX',
            ],
            [
              '**Hybrid**',
              'A combination of monolithic and microkernel features.',
              'Windows, macOS',
            ],
          ],
        },
        { kind: 'heading', text: 'Operating system brands' },
        {
          kind: 'table',
          headers: ['Family', 'Notes', 'Examples'],
          rows: [
            [
              '**Microsoft · desktop**',
              'User-friendly graphical user interface',
              'Windows 7, Windows 10, Windows 11',
            ],
            [
              '**Microsoft · server**',
              'Network and enterprise server management',
              'Windows Server 2019, 2022, 2025',
            ],
            [
              '**Microsoft · mobile (discontinued)**',
              'Windows Phone: Live Tiles touch interface, discontinued in 2017',
              'Nokia Lumia 520, Lumia 950',
            ],
            [
              '**Google · Android**',
              'Open-source platform with a large app ecosystem',
              'Samsung Galaxy series, Xiaomi Redmi, Google Pixel',
            ],
            [
              '**Google · ChromeOS**',
              'Cloud-based lightweight operating system',
              'Acer, HP and Lenovo Chromebooks',
            ],
            [
              '**Apple · iOS / iPadOS**',
              'Secure and optimised Apple ecosystem',
              'iPhone, iPad Pro',
            ],
            [
              '**Apple · macOS**',
              'Stable Unix-based OS optimised for Apple hardware',
              'macOS Sequoia, macOS Tahoe',
            ],
            [
              '**Linux · community**',
              'Free and open-source, customisable',
              'Ubuntu 24.04 LTS, Fedora, Linux Mint',
            ],
            [
              '**Linux · server**',
              'High stability and security for servers',
              'Red Hat Enterprise Linux, CentOS Stream, Ubuntu Server',
            ],
            [
              '**BlackBerry OS (discontinued)**',
              'Strong enterprise security with push email support; shut down in 2022',
              'BlackBerry Bold, BlackBerry Curve',
            ],
            [
              '**Symbian (discontinued)**',
              'An efficient operating system for low-resource devices; ended in 2014',
              'Nokia N95, Nokia 6600',
            ],
          ],
        },
        {
          kind: 'teachBack',
          prompt:
            'You have now finished the whole competency. In your own words, explain what an operating system does, using at least four of the five kernel functions.',
          checklist: [
            'You explained process management: creating, scheduling and terminating processes, and sharing CPU time',
            'You explained memory management: allocating and deallocating memory, and virtual memory/paging',
            'You explained device management: controllers, drivers, and not letting slow devices block the CPU',
            'You explained file management: files, directories, allocation methods and security',
            'You mentioned that the OS provides an interface between the user and the hardware',
            'You used at least one concrete example of a real operating system',
          ],
        },
        {
          kind: 'quickCheck',
          questionIds: ['q7-4-1', 'q7-4-2', 'q7-4-3'],
        },
      ],
      takeaways: [
        'The kernel is the core of the OS, interacting directly with hardware.',
        'Kernel functions: process, memory, device and file management, plus system call handling.',
        'Monolithic = all services in kernel space (Linux). Microkernel = only essentials (QNX). Hybrid = both (Windows).',
        'Know at least one OS example per category: desktop, server, mobile, cloud, embedded.',
      ],
    },
  ],
}
