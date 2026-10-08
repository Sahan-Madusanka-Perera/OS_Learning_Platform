import type { Module } from '@/types/content'

export const m1: Module = {
  id: 'm1',
  title: 'Foundations: what runs your computer',
  shortTitle: 'Foundations',
  description:
    'Before we can talk about operating systems, we need to be clear about what software is, what the different kinds do, and what actually happens in the seconds after you press the power button.',
  accent: 'indigo',
  syllabusRefs: ['5.1'],
  lessons: [
    /* ================= l1-1 ================= */
    {
      id: 'l1-1',
      moduleId: 'm1',
      title: 'Hardware, software and the person in front of it',
      summary:
        'The three-part model every later idea in this unit sits on: hardware you can touch, software you cannot, and the user who wants something done.',
      whyItMatters:
        'Almost every mistake students make in this unit comes from blurring the line between hardware and software: calling BIOS "hardware", or thinking a program and a process are the same thing. Getting this straight now costs you ten minutes and saves you marks later.',
      objectives: [
        'Tell hardware and software apart, and explain why the difference matters',
        'Name the three broad categories of software',
        'Explain where the operating system sits between the user and the hardware',
      ],
      minutes: 8,
      syllabusRefs: ['5.1'],
      keyTerms: ['system-software', 'application-software', 'utility-software', 'os'],
      blocks: [
        {
          kind: 'prose',
          paragraphs: [
            'Open up a computer and you will find metal, plastic and silicon: a processor, memory chips, a disk, a screen, a keyboard. All of that is **hardware**: the physical parts. Hardware is fast, and completely stupid. A CPU cannot open a file. It has no idea what a file *is*.',
            'What makes hardware useful is **software**: instructions telling the hardware what to do. You cannot touch software. It is stored on a disk and copied into memory when needed.',
            'And then there is you: the person who actually wants something done. In Sri Lankan A/L ICT this human element is sometimes called **liveware**.',
          ],
        },
        {
          kind: 'keyIdea',
          title: 'The whole unit in one sentence',
          text: 'An [[os|operating system]] is the software that stands between you and the hardware, so that neither of you has to understand the other.',
        },
        {
          kind: 'viz',
          viz: 'systemLayers',
          title: 'Where does the operating system sit?',
          caption:
            'Click each layer. Notice that no layer reaches past its neighbours: that is the whole design.',
        },
        { kind: 'heading', text: 'The three kinds of software' },
        {
          kind: 'prose',
          paragraphs: [
            'Not all software does the same kind of job. The syllabus divides it into three categories, and exam questions frequently ask you to classify an example correctly.',
          ],
        },
        {
          kind: 'compare',
          headers: ['Category', 'What it does', 'Examples'],
          rows: [
            [
              '[[system-software|System software]]',
              'Provides the essential services a computer needs to function at all. Manages hardware and supports the running of application software.',
              'Operating systems, device drivers, language translators',
            ],
            [
              '[[application-software|Application software]]',
              'Performs specific tasks **for the user**. Used directly by people. Requires an operating system to run.',
              'MS Word, Chrome, Excel, VLC, games',
            ],
            [
              '[[utility-software|Utility software]]',
              'Helps maintain, manage and optimise the computer system. A sub-type of system software.',
              'Antivirus, disk cleanup, backup software, WinRAR, Task Manager',
            ],
          ],
        },
        {
          kind: 'misconception',
          wrong: 'Antivirus is application software, because I open it and click things.',
          right:
            'Antivirus is **utility software**: a type of system software. Its job is to maintain and protect the system itself, not to produce work for you.',
          why: 'Ask what the software is *for*. If it produces output you wanted (a document, a picture, a web page), it is application software. If it looks after the machine, it is a utility.',
        },
        {
          kind: 'analogy',
          title: 'A school',
          everyday:
            'Think of a school building. The classrooms, desks and electricity are the hardware. The lessons the teachers deliver are the application software: that is what students actually came for. And the principal and office staff are the operating system: nobody comes to school to see them, but without someone assigning classrooms, ringing the bell and settling disputes over who uses the hall, the whole thing collapses.',
          mapsTo:
            'The OS is doing exactly that job (deciding who gets the CPU, who gets memory, and who is allowed to open which file) every few milliseconds, invisibly.',
        },
        {
          kind: 'recall',
          prompt:
            'Without scrolling back: name the three categories of software, and give one example of each.',
          answer:
            'System software (e.g. an operating system), application software (e.g. MS Word), and utility software (e.g. antivirus). Utility software is itself a type of system software.',
          hint: 'One runs the machine, one does your work, one looks after the machine.',
        },
        {
          kind: 'heading',
          text: 'A word about language translators',
          level: 'sub',
        },
        {
          kind: 'prose',
          paragraphs: [
            'One more piece of system software worth naming, because it explains how programs reach the hardware at all. A CPU only understands **machine language**: binary code, 0s and 1s. Humans do not write that.',
            'So we write in higher-level languages and something translates. An **assembler** turns assembly language (human-readable symbols for machine instructions) into machine code. A **compiler** translates an entire high-level program into machine code *before* it runs. An **interpreter** translates it line by line *while* it runs.',
          ],
        },
        {
          kind: 'examTip',
          text: 'The compiler-versus-interpreter distinction is a one-mark giveaway if you keep the timing straight: compiler = all at once, before execution; interpreter = line by line, at runtime.',
        },
        {
          kind: 'quickCheck',
          questionIds: ['q1-1-1', 'q1-1-2', 'q1-1-3'],
        },
      ],
      takeaways: [
        'Hardware is physical; software is instructions. The OS is software.',
        'Software divides into system, application and utility categories: utility is a type of system software.',
        'The OS exists so applications never have to talk to hardware directly.',
        'Machine language is binary; compilers translate all at once before running, interpreters line by line while running.',
      ],
    },

    /* ================= l1-2 ================= */
    {
      id: 'l1-2',
      moduleId: 'm1',
      title: 'Utility software: the tools that keep a computer healthy',
      summary:
        'The eight kinds of utility software the syllabus names, what each one is actually for, and why they count as system software rather than applications.',
      whyItMatters:
        'Utility software appears in exam questions as "classify this" and "state two functions of". Both are easy marks, but only if you can name the categories, which is exactly what students forget.',
      objectives: [
        'Name the main types of utility software and what each does',
        'Explain why utility software is classified as system software',
        'Describe the two types of file compression and the two types of encryption',
      ],
      prerequisites: ['l1-1'],
      minutes: 9,
      syllabusRefs: ['5.1'],
      keyTerms: ['utility-software', 'encryption'],
      blocks: [
        {
          kind: 'definition',
          term: 'Utility software',
          simple:
            'Small tools whose job is to look after the computer itself: cleaning it, protecting it, backing it up.',
          technical:
            'A type of system software designed to help maintain, manage and optimise the performance of a computer system.',
          example: 'Windows Defender, Disk Cleanup, 7-Zip, Task Manager.',
        },
        {
          kind: 'list',
          title: 'What utility software achieves',
          style: 'check',
          items: [
            'Improves system performance and reliability',
            'Enhances security and protects the system from threats',
            'Saves storage space and helps with file management',
            'Detects and fixes errors',
            'Provides data backup and recovery',
            'Supports ongoing system maintenance',
          ],
        },
        { kind: 'heading', text: 'The main types' },
        {
          kind: 'table',
          headers: ['Utility', 'What it does', 'Examples'],
          rows: [
            [
              '**Antivirus**',
              'Detects, prevents and removes malicious software such as viruses, worms and spyware. Scans files, removes infected ones, and provides real-time protection.',
              'Avast, Kaspersky, Norton, Windows Defender',
            ],
            [
              '**Disk cleanup**',
              'Removes unnecessary files (temporary files, cache files, system logs) to free storage space and improve system speed.',
              'Windows Disk Cleanup',
            ],
            [
              '**Backup software**',
              'Creates copies of important files so they can be restored after hardware failure, a crash, or accidental deletion.',
              'Acronis, EaseUS Todo Backup, Windows Backup',
            ],
            [
              '**File compression**',
              'Reduces file size to save space and make transfer easier.',
              'WinRAR, 7-Zip, WinZip',
            ],
            [
              '**Screen saver**',
              'Activates after a period of inactivity. Prevents screen burn-in, provides password protection while you are away, and can reduce power usage.',
              'Built into Windows and macOS',
            ],
            [
              '**Clipboard**',
              'Temporary storage for copied or cut data (text, files, images) so content can move between applications.',
              'Windows clipboard (with history in modern versions)',
            ],
            [
              '**Task manager**',
              'Shows the processes and applications running, plus the general health of the computer. Used to monitor performance, identify problems and end misbehaving processes.',
              'Task Manager (Windows), Activity Monitor (macOS), System Monitor (Linux)',
            ],
            [
              '**Encryption software**',
              'Converts readable data into an unreadable encrypted form so unauthorised parties cannot read it.',
              'BitLocker, VeraCrypt',
            ],
          ],
        },
        {
          kind: 'heading',
          text: 'Two distinctions worth memorising',
          level: 'sub',
        },
        {
          kind: 'compare',
          title: 'File compression',
          headers: ['Type', 'What happens', 'Use it for'],
          rows: [
            [
              '**Lossless**',
              'Reduces file size **without losing any data**. The original can be perfectly reconstructed.',
              'Documents, spreadsheets, program files: anything where losing a byte breaks it',
            ],
            [
              '**Lossy**',
              'Reduces file size **by removing some of the data**. Smaller, but the original cannot be fully recovered.',
              'Photos, music, video, where small quality losses are invisible',
            ],
          ],
        },
        {
          kind: 'compare',
          title: 'Encryption',
          headers: ['Type', 'Keys used'],
          rows: [
            ['**Symmetric**', 'A single secret key does both encryption and decryption.'],
            [
              '**Asymmetric**',
              'A pair of mathematically linked keys: a public key and a private key.',
            ],
          ],
          caption:
            'Encryption software turns plain text into ciphertext. To read it again you need the decryption key, which acts like a password. You will meet this again in the Data Communication and Networking unit.',
        },
        {
          kind: 'confused',
          question: 'Why is Task Manager a utility and not an application?',
          simpler:
            'Ask who benefits. When you open Word, *you* get a document. When you open Task Manager, the *computer* gets sorted out: you are maintaining the machine, not producing work with it.',
          picture:
            'Word is a pen. Task Manager is a spanner you use on the pen factory.',
        },
        {
          kind: 'recall',
          prompt:
            'Name four types of utility software, and say in one phrase what each protects the user from.',
          answer:
            'Antivirus: protects from malware. Backup software: protects from data loss. Disk cleanup: protects from running out of space. Task manager: protects from a frozen or overloaded system. (File compression, screen savers, the clipboard and encryption software also count.)',
        },
        {
          kind: 'viz',
          viz: 'fileTypes',
          title: 'File types and the applications that open them',
          caption:
            'You will meet these again properly in Module 3. For now, notice that it is the extension that tells the OS which application to hand the file to.',
        },
        {
          kind: 'quickCheck',
          questionIds: ['q1-2-1', 'q1-2-2', 'q1-2-3'],
        },
      ],
      takeaways: [
        'Utility software maintains, manages and optimises the system: it is a type of system software.',
        'The main types: antivirus, disk cleanup, backup, file compression, screen saver, clipboard, task manager, encryption.',
        'Lossless compression keeps all data; lossy compression discards some.',
        'Symmetric encryption uses one key; asymmetric uses a public/private key pair.',
      ],
    },

    /* ================= l1-3 ================= */
    {
      id: 'l1-3',
      moduleId: 'm1',
      title: 'Booting: from a dead machine to a desktop',
      summary:
        'The exact sequence between pressing the power button and seeing a login screen, and why the OS cannot start itself.',
      whyItMatters:
        'Booting is a favourite exam topic because it has a fixed order you can be asked to reproduce. It also answers a genuinely interesting puzzle: if the OS manages the computer, who loads the OS?',
      objectives: [
        'List the stages of the booting process in order',
        'Explain the roles of BIOS/UEFI, POST, CMOS and the boot loader',
        'Distinguish a cold boot from a warm boot, and MBR from GPT',
      ],
      prerequisites: ['l1-1'],
      minutes: 12,
      syllabusRefs: ['5.1'],
      keyTerms: ['booting', 'bios', 'uefi', 'post', 'cmos', 'boot-loader', 'firmware', 'mbr', 'gpt'],
      blocks: [
        {
          kind: 'keyIdea',
          title: 'The chicken-and-egg problem',
          text: 'The operating system lives on the hard disk. But reading a hard disk is something the operating system does. So who reads the disk before the OS exists in memory? That is the whole reason booting has stages.',
        },
        {
          kind: 'definition',
          term: 'Booting',
          simple: 'Everything the computer does between you pressing power and the machine being usable.',
          technical:
            'The sequence of steps a computer follows to start up and load the operating system when you turn it on. It prepares the hardware and software so the computer becomes ready to use.',
        },
        {
          kind: 'viz',
          viz: 'bootSequence',
          title: 'Step through a real boot',
          caption:
            'Advance one stage at a time and watch what appears on screen at each point.',
        },
        { kind: 'heading', text: 'The pieces that make it possible' },
        {
          kind: 'definition',
          term: 'Firmware',
          simple: 'Permanent instructions built into a device telling it how to behave.',
          technical:
            'Software containing instructions on how a device should perform and how it should communicate with other devices. It is stored in memory that retains its contents even when the device is powered off: ROM or flash memory.',
          example: 'BIOS and UEFI are firmware. So is the software inside a printer or a router.',
        },
        {
          kind: 'compare',
          title: 'BIOS vs UEFI',
          headers: ['Feature', '[[bios|BIOS]]', '[[uefi|UEFI]]'],
          rows: [
            ['First appeared', '1981 with the IBM PC (the name dates from CP/M, 1975)', '2006 as UEFI 2.0 (grew out of Intel’s EFI, started in 1998)'],
            [
              'User interface',
              'Text based, keyboard navigation',
              'Graphical, supports mouse and keyboard',
            ],
            ['Operating mode', '16-bit', '32-bit or 64-bit: can access more memory'],
            [
              'Partition support',
              '[[mbr|MBR]] (Master Boot Record), up to 2 TB',
              '[[gpt|GPT]] (GUID Partition Table), over 2 TB',
            ],
            [
              'Security',
              'Basic: no inherent security feature',
              'Supports Secure Boot, preventing an unauthorised OS from loading',
            ],
          ],
          caption:
            'Some notes give UEFI’s date as 2002. That was Intel’s earlier EFI 1.10. The industry-wide UEFI specification followed in 2006.',
        },
        {
          kind: 'callout',
          tone: 'info',
          title: 'CMOS memory: the settings, not the code',
          text: 'The BIOS **code** lives in non-volatile ROM. The BIOS **settings** (date and time, boot order, hardware configuration) live in [[cmos|CMOS memory]], a small chip kept alive by a coin battery on the motherboard. That is why a computer with a dead CMOS battery forgets the time but still boots. Removing the battery (or shorting a jumper) clears CMOS and resets BIOS settings to their defaults.',
        },
        {
          kind: 'heading', text: 'POST and beep codes', level: 'sub',
        },
        {
          kind: 'prose',
          paragraphs: [
            'Before anything else, the BIOS runs the **Power-On Self-Test**, checking that RAM, the keyboard, the processor and storage devices are present and working. If something has failed, the machine cannot show you an error on screen: the screen may be part of what failed. So it beeps instead.',
          ],
        },
        {
          kind: 'table',
          headers: ['Beep code', 'Meaning'],
          rows: [
            ['One short beep', 'System booting normally: POST passed'],
            ['Repeated short beeps', 'Memory (RAM) error'],
            ['Two short beeps', 'Minor hardware error'],
            ['Three long beeps', 'Keyboard or motherboard error'],
            ['One long, one short', 'RAM failure'],
            ['One long, three short', 'Video card / graphics error'],
            ['Four short beeps', 'System timer or motherboard problem'],
          ],
          caption:
            'Exact codes vary by manufacturer: the examinable idea is *why* beeps exist, not the precise pattern.',
        },
        { kind: 'heading', text: 'Two kinds of boot' },
        {
          kind: 'compare',
          headers: ['', '[[cold-boot|Cold boot]]', '[[warm-boot|Warm boot]]'],
          rows: [
            [
              'What happens',
              'Starting the computer from a completely powered-off state',
              'Restarting without turning the power off completely',
            ],
            ['Example', 'Switching your PC on in the morning', 'Pressing Restart'],
            ['POST runs?', 'Yes, the full sequence', 'Often shortened on older systems; many modern PCs run it in full'],
          ],
        },
        {
          kind: 'callout',
          tone: 'note',
          title: 'RAM drive',
          text: 'A **RAM drive** is a virtual storage device that uses a portion of RAM as if it were a hard drive. Because RAM is far faster than disk, storing temporary or frequently accessed files there speeds things up, including parts of the boot process.',
        },
        {
          kind: 'recall',
          prompt:
            'Put these in order: boot loader loads · POST · power on · OS loads · BIOS/UEFI starts · login screen · boot device selection',
          answer:
            'Power on → BIOS/UEFI starts → POST → boot device selection → boot loader loads → OS loads → login screen appears.',
          hint: 'Firmware wakes first, checks the hardware, then finds something to load.',
        },
        {
          kind: 'misconception',
          wrong: 'The boot loader is part of the operating system, so the OS loads itself.',
          right:
            'The boot loader is a **separate small program** found by the firmware. Its only job is to load the OS kernel and system files into RAM.',
          why: 'Examples are Windows Boot Manager and GRUB (Linux). On a UEFI system the loader lives in the EFI System Partition, which UEFI locates from the GPT.',
        },
        {
          kind: 'confused',
          question: 'Why do we need BOTH a BIOS and a boot loader? Is that not doing the job twice?',
          simpler:
            'BIOS knows how to talk to hardware, but nothing about operating systems. The boot loader knows about one specific operating system, but needs the machine already awake. Each does the half the other cannot.',
          picture:
            'BIOS is the caretaker who unlocks the building and switches the lights on. The boot loader is the teacher who then walks in and starts the actual lesson. The caretaker cannot teach; the teacher cannot get in without the caretaker.',
        },
        {
          kind: 'examTip',
          text: 'If asked "state the purpose of the boot loader", one sentence gets the mark: do not describe the whole boot process.',
          modelAnswer:
            'The boot loader loads the operating system kernel and system files from secondary storage into main memory.',
        },
        {
          kind: 'quickCheck',
          questionIds: ['q1-3-1', 'q1-3-2', 'q1-3-3', 'q1-3-4'],
        },
      ],
      takeaways: [
        'Order: power on → BIOS/UEFI → POST → boot device selection → boot loader → OS loads → login screen.',
        'BIOS/UEFI is firmware in ROM; its settings live in battery-backed CMOS memory.',
        'POST checks essential hardware and reports failures with beep codes.',
        'UEFI replaced BIOS: graphical, 32/64-bit, GPT partitions over 2 TB, Secure Boot.',
        'The boot loader is a separate program whose only job is loading the OS into RAM.',
      ],
    },

    /* ================= l1-4 ================= */
    {
      id: 'l1-4',
      moduleId: 'm1',
      title: 'What exactly is an operating system?',
      summary:
        'The definition you must be able to write, why a computer needs one at all, and what would happen without it.',
      whyItMatters:
        'This is competency 5.1’s first learning outcome: "defines the computer operating system". A definition question is worth marks only if your wording is precise, so it is worth building the exact sentence deliberately.',
      objectives: [
        'State a precise definition of an operating system',
        'Explain why an operating system is needed in a computer system',
        'Name examples of operating systems across different device categories',
      ],
      prerequisites: ['l1-1'],
      minutes: 8,
      syllabusRefs: ['5.1'],
      keyTerms: ['os', 'resource-management'],
      blocks: [
        {
          kind: 'prose',
          paragraphs: [
            'You have now seen where the OS sits, and how it gets loaded. Time to say precisely what it *is*.',
          ],
        },
        {
          kind: 'definition',
          term: 'Operating System (OS)',
          simple:
            'The main program that runs your whole computer and lets you use it without knowing how any of the hardware works.',
          technical:
            'The main software that manages a computer’s hardware and software resources and allows the user to interact with the computer. It acts as a bridge between the user and the computer hardware.',
          example: 'Windows 11, macOS, Ubuntu Linux, Android, iOS.',
        },
        {
          kind: 'keyIdea',
          text: 'Two halves to the definition, and exam answers usually need both: it **manages resources**, and it **provides an interface**. One without the other is an incomplete answer.',
        },
        { kind: 'heading', text: 'Why is one needed at all?' },
        {
          kind: 'prose',
          paragraphs: [
            'The earliest computers had no operating system. They were special-purpose machines with pre-programmed instructions, and the program was not meant to change, so there was nothing for an OS to do.',
            'Then general-purpose computers arrived, following John von Neumann’s design, and one computer had to do many different tasks. Programs now needed changing often. Someone, or something, had to load them, run them, and clear up afterwards.',
            'Doing that by hand was appallingly wasteful. The processor sat idle while a human loaded punch cards and mounted tapes. **The OS was introduced to maximise processor utilisation, automate the manual operations, and reduce the idle time of the processor.**',
          ],
        },
        {
          kind: 'callout',
          tone: 'success',
          title: 'A sentence worth memorising',
          text: 'The main disadvantage of having no operating system is that **the processor sits idle** while programs are being loaded and while input/output is happening. This single idea drives the whole evolution story in the next module.',
        },
        {
          kind: 'analogy',
          title: 'A hotel receptionist',
          everyday:
            'Guests arrive wanting rooms. There is one lift, three conference halls and a limited number of rooms. Without a receptionist, guests would wander in and fight over keys, two people would end up in the same room, and nobody would know who has paid. The receptionist does not sleep in any room herself: she allocates them, tracks who has what, and hands things back when guests leave.',
          mapsTo:
            'The OS allocates CPU time, memory and devices to processes, tracks who holds what, and reclaims everything when a process terminates. It also handles the "who is allowed in here?" question: that is security and protection.',
        },
        {
          kind: 'table',
          title: 'Operating systems you already use',
          headers: ['Where', 'Examples'],
          rows: [
            ['Desktop / laptop', 'Windows 11, macOS, Ubuntu, Fedora, Linux Mint'],
            ['Servers', 'Windows Server 2025, Red Hat Enterprise Linux, Ubuntu Server, IBM z/OS'],
            ['Mobile', 'Android (Samsung Galaxy, Xiaomi, Google Pixel), iOS (iPhone), iPadOS'],
            ['Cloud / lightweight', 'ChromeOS (Acer, HP, Lenovo Chromebooks)'],
            ['Older mobile (discontinued)', 'Symbian (Nokia N95, 6600), BlackBerry OS, Windows Phone (Lumia)'],
            ['Embedded / real-time', 'VxWorks, FreeRTOS, QNX'],
          ],
        },
        {
          kind: 'teachBack',
          prompt:
            'A friend who has never studied ICT asks you: "What is an operating system, and why does my phone need one?" Write your answer.',
          checklist: [
            'You said it manages the hardware and software resources',
            'You said it provides an interface between the user and the hardware',
            'You gave at least one concrete example of a resource it manages (CPU time, memory, storage, devices)',
            'You explained what would go wrong without one: programs could not share the hardware, and the processor would sit idle',
            'You gave a real example of an OS',
          ],
        },
        {
          kind: 'examTip',
          text: 'For "define an operating system", write the technical sentence, then add one concrete example. Definition plus example is almost always the full mark.',
          modelAnswer:
            'An operating system is system software that manages a computer’s hardware and software resources and provides an interface between the user and the hardware: for example, Windows 11.',
        },
        {
          kind: 'quickCheck',
          questionIds: ['q1-4-1', 'q1-4-2', 'q1-4-3'],
        },
      ],
      takeaways: [
        'An OS manages hardware and software resources AND provides a user interface: both halves matter.',
        'Operating systems became necessary once general-purpose computers had to run many changing programs.',
        'The OS exists to maximise processor utilisation, automate manual operations and reduce idle time.',
        'Without an OS, the processor sits idle while programs are loaded and I/O happens.',
      ],
    },
  ],
}
