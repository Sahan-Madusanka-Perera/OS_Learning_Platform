import type { Question } from '@/types/content'

export const questionsM1M2: Question[] = [
  /* ============ l1-1 ============ */
  {
    id: 'q1-1-1',
    lessonId: 'l1-1',
    type: 'mcq',
    level: 1,
    prompt: 'Which of the following is an example of system software?',
    options: ['Microsoft Excel', 'A device driver', 'Google Chrome', 'Adobe Photoshop'],
    correct: 1,
    optionFeedback: [
      'Excel produces work *for you* — that makes it application software.',
      null,
      'A browser is something you use to get a job done, so it is application software.',
      'Photoshop is an application: you use it to produce images.',
    ],
    explanation:
      'System software provides the essential services a computer needs to function and manages hardware. Device drivers, operating systems and language translators are all system software. The other three are all application software — you use them directly to produce work.',
    remediation:
      'Ask what the software is *for*. Producing output you wanted → application. Running or maintaining the machine → system.',
    tags: ['software-classification'],
  },
  {
    id: 'q1-1-2',
    lessonId: 'l1-1',
    type: 'trueFalse',
    level: 2,
    prompt: 'Utility software is a type of application software.',
    correct: false,
    explanation:
      'Utility software is a type of **system** software. Its job is to maintain, manage and optimise the computer system itself — not to produce work for the user.',
    remediation:
      'Antivirus, disk cleanup and backup tools all look after the machine. Word and Chrome produce output for you. That is the dividing line.',
    tags: ['software-classification'],
  },
  {
    id: 'q1-1-3',
    lessonId: 'l1-1',
    type: 'matching',
    level: 2,
    prompt: 'Match each translator to what it does.',
    pairs: [
      { left: 'Compiler', right: 'Translates the entire high-level code before execution' },
      { left: 'Interpreter', right: 'Translates high-level code line by line at runtime' },
      { left: 'Assembler', right: 'Translates assembly language into machine language' },
    ],
    explanation:
      'The key difference between a compiler and an interpreter is *when* translation happens: a compiler does all of it before the program runs; an interpreter does it line by line while the program runs. An assembler handles the special case of assembly language.',
    tags: ['translators'],
  },

  /* ============ l1-2 ============ */
  {
    id: 'q1-2-1',
    lessonId: 'l1-2',
    type: 'multi',
    level: 2,
    prompt: 'Which of these are utility software? (Select all that apply.)',
    options: ['WinRAR', 'Microsoft PowerPoint', 'Windows Defender', 'Task Manager', 'VLC Media Player'],
    correct: [0, 2, 3],
    explanation:
      'WinRAR (file compression), Windows Defender (antivirus) and Task Manager all maintain, manage or optimise the system. PowerPoint and VLC are application software — you use them to produce or consume content.',
    remediation:
      'The eight utility types are: antivirus, disk cleanup, backup, file compression, screen saver, clipboard, task manager and encryption software.',
    tags: ['utility-software'],
  },
  {
    id: 'q1-2-2',
    lessonId: 'l1-2',
    type: 'mcq',
    level: 2,
    prompt:
      'A student compresses a folder of photographs to email them. Some image quality is lost. Which type of compression was used?',
    options: ['Lossless compression', 'Lossy compression', 'Symmetric compression', 'Asymmetric compression'],
    correct: 1,
    optionFeedback: [
      'Lossless compression reduces size **without losing any data** — the original can be perfectly reconstructed.',
      null,
      'Symmetric and asymmetric describe *encryption*, not compression.',
      'Symmetric and asymmetric describe *encryption*, not compression.',
    ],
    explanation:
      'Lossy compression reduces file size by removing some of the data, so the original cannot be fully recovered. It is used for photos, music and video where small quality losses are acceptable and often invisible.',
    tags: ['compression'],
  },
  {
    id: 'q1-2-3',
    lessonId: 'l1-2',
    type: 'fillBlank',
    level: 1,
    prompt:
      'Encryption that uses a single secret key for both encryption and decryption is called ___ encryption.',
    accepted: ['symmetric'],
    explanation:
      'Symmetric encryption uses one shared secret key for both directions. Asymmetric encryption uses a pair of mathematically linked keys — a public key and a private key.',
    tags: ['encryption'],
  },

  /* ============ l1-3 ============ */
  {
    id: 'q1-3-1',
    lessonId: 'l1-3',
    type: 'ordering',
    level: 3,
    prompt: 'Put the stages of the booting process into the correct order.',
    items: [
      'Power on',
      'BIOS / UEFI starts',
      'POST runs',
      'Boot device is selected',
      'Boot loader is loaded',
      'Operating system loads into RAM',
      'Login screen appears',
    ],
    explanation:
      'Firmware wakes first and checks the hardware (POST), then finds a bootable device, loads the small boot loader program from it, and the boot loader loads the OS kernel into RAM. Only then can a login screen exist.',
    remediation:
      'A useful check: the OS is loaded *near the end*, because the whole point of the earlier stages is to reach the point where loading it is possible.',
    tags: ['booting'],
  },
  {
    id: 'q1-3-2',
    lessonId: 'l1-3',
    type: 'mcq',
    level: 2,
    prompt: 'What is the purpose of the boot loader?',
    options: [
      'To check that essential hardware is working',
      'To store BIOS settings such as the date and boot order',
      'To load the operating system kernel and system files into RAM',
      'To decide which device the computer should boot from',
    ],
    correct: 2,
    optionFeedback: [
      'That is POST — the Power-On Self-Test.',
      'That is CMOS memory, kept alive by the motherboard battery.',
      null,
      'That is the boot device selection stage, done by the BIOS according to the boot order.',
    ],
    explanation:
      'The boot loader is a separate small program (Windows Boot Manager, GRUB) whose single job is loading the OS into main memory. It is not part of the operating system itself.',
    tags: ['booting', 'boot-loader'],
  },
  {
    id: 'q1-3-3',
    lessonId: 'l1-3',
    type: 'mcq',
    level: 3,
    prompt:
      'A computer forgets the date and time every time it is switched off, but still boots normally. What is the most likely cause?',
    options: [
      'The BIOS chip has failed',
      'The CMOS battery is dead',
      'The boot loader is corrupted',
      'POST is failing',
    ],
    correct: 1,
    optionFeedback: [
      'If the BIOS chip had failed the machine would not boot at all — the BIOS code is what starts everything.',
      null,
      'A corrupted boot loader would prevent the OS loading, not affect the clock.',
      'A POST failure would produce beep codes and halt the boot.',
    ],
    explanation:
      'BIOS *code* lives in non-volatile ROM, so it survives without power. BIOS *settings* — date, time, boot order, hardware configuration — live in CMOS memory, which is kept alive by a small battery. A dead battery means those settings are lost each time power is removed.',
    remediation:
      'Separate the two: BIOS = the program, in ROM. CMOS = the settings, in battery-backed memory.',
    tags: ['booting', 'cmos'],
  },
  {
    id: 'q1-3-4',
    lessonId: 'l1-3',
    type: 'mcq',
    level: 2,
    prompt: 'Which statement about UEFI is correct?',
    options: [
      'UEFI is 16-bit and uses MBR partitions up to 2 TB',
      'UEFI supports GPT partitions over 2 TB and Secure Boot',
      'UEFI was released in 1981 and uses a text-based interface',
      'UEFI stores its settings in ROM rather than CMOS',
    ],
    correct: 1,
    explanation:
      'UEFI (2002) is the modern replacement for BIOS: graphical interface, 32/64-bit operation, GPT partitions over 2 TB, and Secure Boot to prevent an unauthorised OS from loading. The 16-bit, MBR, 2 TB, 1981, text-based description is BIOS.',
    tags: ['uefi', 'bios'],
  },

  /* ============ l1-4 ============ */
  {
    id: 'q1-4-1',
    lessonId: 'l1-4',
    type: 'mcq',
    level: 1,
    prompt: 'Which definition of an operating system is most complete?',
    options: [
      'Software that lets you open programs',
      'The main software that manages a computer’s hardware and software resources and allows the user to interact with the computer',
      'A program stored in ROM that starts the computer',
      'Software that protects the computer from viruses',
    ],
    correct: 1,
    optionFeedback: [
      'True but far too narrow — it misses resource management entirely.',
      null,
      'That describes the BIOS, which is firmware, not the operating system.',
      'That is antivirus — utility software.',
    ],
    explanation:
      'A complete definition has two halves: it **manages hardware and software resources**, and it **provides an interface between the user and the hardware**. An answer with only one half is incomplete.',
    tags: ['os-definition'],
  },
  {
    id: 'q1-4-2',
    lessonId: 'l1-4',
    type: 'fillBlank',
    level: 2,
    prompt:
      'The main disadvantage of having no operating system is that the ___ sits idle while programs are being loaded and while I/O is happening.',
    accepted: ['processor', 'cpu', 'processor (cpu)'],
    explanation:
      'This single fact drives the whole evolution story. The OS was introduced to maximise processor utilisation, automate manual operations and reduce the idle time of the processor.',
    tags: ['os-need'],
  },
  {
    id: 'q1-4-3',
    lessonId: 'l1-4',
    type: 'trueFalse',
    level: 3,
    prompt:
      'The earliest computers had no operating system because operating systems had not been invented yet.',
    correct: false,
    explanation:
      'They had no OS because they did not *need* one. Early computers were special-purpose machines with pre-programmed instructions that were not meant to change — so there was nothing for an OS to do. The need arose only once general-purpose computers had to run many different, frequently changing programs.',
    remediation:
      'The invention followed the need, not the other way round. Von Neumann’s general-purpose design is what created the problem an OS solves.',
    tags: ['os-need', 'evolution'],
  },

  /* ============ l2-1 ============ */
  {
    id: 'q2-1-1',
    lessonId: 'l2-1',
    type: 'multi',
    level: 1,
    prompt: 'Which of these are main functions of an operating system? (Select all that apply.)',
    options: [
      'Providing interfaces',
      'Process management',
      'Compiling source code',
      'Resource management',
      'Security and protection',
    ],
    correct: [0, 1, 3, 4],
    explanation:
      'The five main functions are: providing interfaces, process management, resource management, security and protection, and executing application software. Compiling source code is the job of a compiler — system software, but not an OS function.',
    tags: ['os-functions'],
  },
  {
    id: 'q2-1-2',
    lessonId: 'l2-1',
    type: 'mcq',
    level: 3,
    prompt:
      'Directories, files and data are described as "abstractions provided by the operating system". What does this mean?',
    options: [
      'They are difficult concepts that beginners find abstract',
      'They do not exist in the hardware — the OS invents them and maintains the illusion',
      'They are stored in an abstract area of the hard disk',
      'They can only be accessed through abstract classes in programming',
    ],
    correct: 1,
    optionFeedback: [
      'Abstraction here is a technical term, not a comment on difficulty.',
      null,
      'There is no "abstract area" of a disk — only platters, tracks and sectors.',
      'This is a programming-language concept, unrelated.',
    ],
    explanation:
      'A hard disk stores magnetised spots and has no concept of a file. The OS creates the ideas of files, folders and named data, and presents every program with a clean virtual machine. That is exactly why one program can run on thousands of different physical machines.',
    tags: ['os-functions', 'abstraction'],
  },
  {
    id: 'q2-1-3',
    lessonId: 'l2-1',
    type: 'mcq',
    level: 4,
    prompt:
      'Two processes both want to print at the same time. Which OS function is primarily responsible for sorting this out?',
    options: ['Providing interfaces', 'Resource management', 'Executing application software', 'Security and protection'],
    correct: 1,
    optionFeedback: [
      'Interfaces are about how the user and applications interact with the system, not who gets the printer.',
      null,
      'This is about running programs, not allocating devices between them.',
      'Security decides *whether they are allowed* to print, not *which goes first*.',
    ],
    explanation:
      'Resource management means keeping track of resource usage and handling permissions to grant or revoke access as needed. Deciding which process gets the printer, and when, is exactly that. (Spooling, from Module 7, is the specific technique used.)',
    tags: ['os-functions', 'resource-management'],
  },

  /* ============ l2-2 ============ */
  {
    id: 'q2-2-1',
    lessonId: 'l2-2',
    type: 'ordering',
    level: 2,
    prompt: 'Put the generations of operating systems into chronological order.',
    items: [
      'No operating system',
      'Simple batch system',
      'Multi-programmed batch system',
      'Time-sharing system',
    ],
    explanation:
      'Each generation removes one more source of CPU idle time: manual loading → automatic job loading → overlapping I/O with computation → preemptive switching for interactivity.',
    tags: ['evolution'],
  },
  {
    id: 'q2-2-2',
    lessonId: 'l2-2',
    type: 'mcq',
    level: 3,
    prompt:
      'What is the key difference between multiprogramming and time-sharing?',
    options: [
      'Multiprogramming supports multiple users; time-sharing supports only one',
      'In multiprogramming a process switches only when it blocks; in time-sharing it also switches when its time quantum expires',
      'Multiprogramming uses virtual memory; time-sharing does not',
      'Time-sharing is non-preemptive; multiprogramming is preemptive',
    ],
    correct: 1,
    optionFeedback: [
      'The reverse is closer to the truth — time-sharing is what made interactive multi-user systems possible.',
      null,
      'Time-sharing systems typically use *more* advanced memory techniques, including virtual memory.',
      'Exactly backwards: time-sharing is preemptive.',
    ],
    explanation:
      'Multiprogramming switches only when the running process blocks (usually for I/O) — its goal is maximum CPU utilisation. Time-sharing switches even when a process is running perfectly well, because its time slice expired — its goal is minimum response time.',
    remediation:
      'Multiprogramming makes the *machine* efficient. Time-sharing makes the *person* happy.',
    tags: ['multiprogramming', 'time-sharing'],
  },
  {
    id: 'q2-2-3',
    lessonId: 'l2-2',
    type: 'fillBlank',
    level: 2,
    prompt:
      'In a simple batch system, the small part of memory reserved for the software that loads each job is called the ___.',
    accepted: ['resident monitor', 'monitor', 'the resident monitor'],
    explanation:
      'The resident monitor controls job execution: it loads a job, runs it, and when it finishes loads the next one. This removed the human operator from between jobs.',
    tags: ['batch-system'],
  },
  {
    id: 'q2-2-4',
    lessonId: 'l2-2',
    type: 'mcq',
    level: 4,
    prompt:
      'A multi-programmed batch system keeps several jobs in memory at once. Why does this require memory protection, when a simple batch system did not?',
    options: [
      'Because the jobs run faster and could overwrite each other',
      'Because several jobs are in memory simultaneously and could interfere with each other’s memory',
      'Because virtual memory had not been invented yet',
      'Because users could now interact with the system',
    ],
    correct: 1,
    optionFeedback: [
      'Speed is not the issue — coexistence is.',
      null,
      'Virtual memory came later, but its absence is not the reason protection is needed.',
      'Multi-programmed batch systems were still non-interactive; interaction came with time-sharing.',
    ],
    explanation:
      'In a simple batch system only one user program is in memory at a time, so there is nothing to protect it from. Once memory is divided into partitions holding several jobs, one buggy job could write into another’s memory — so memory protection becomes necessary.',
    tags: ['multiprogramming', 'memory-protection'],
  },

  /* ============ l2-3 ============ */
  {
    id: 'q2-3-1',
    lessonId: 'l2-3',
    type: 'trueFalse',
    level: 2,
    prompt:
      'On a single-core CPU, multitasking means several processes execute at exactly the same moment.',
    correct: false,
    explanation:
      'Only one process executes at any instant on a single core. The OS switches between them so rapidly that it *appears* simultaneous. That is why the definition says "seemingly at the same time".',
    remediation:
      'The exam wording matters: "concurrently, seemingly at the same time". Writing "at the same time" alone loses the mark.',
    tags: ['multitasking'],
  },
  {
    id: 'q2-3-2',
    lessonId: 'l2-3',
    type: 'mcq',
    level: 2,
    prompt: 'What do threads within the same process share that separate processes do not?',
    options: [
      'The same process ID',
      'The same memory space and system resources',
      'The same program counter',
      'The same priority level',
    ],
    correct: 1,
    optionFeedback: [
      'Threads belong to one process which has one PID, but that is not what makes them useful.',
      null,
      'Each thread has its own execution state, including its own place in the code.',
      'Priority is assigned per thread and can differ.',
    ],
    explanation:
      'Threads share the same memory space and resources of their process, which makes communication and synchronisation easier and switching between them cheaper. Separate processes each have their own isolated memory space.',
    tags: ['threads'],
  },
  {
    id: 'q2-3-3',
    lessonId: 'l2-3',
    type: 'mcq',
    level: 4,
    prompt:
      'A word processor stays responsive to typing while it spell-checks a 300-page document in the background. Which capability makes this possible?',
    options: [
      'Process-based multitasking',
      'Thread-based multitasking',
      'Batch processing',
      'Spooling',
    ],
    correct: 1,
    optionFeedback: [
      'That would require running the spell-checker as a completely separate program with its own memory, which could not easily see your document.',
      null,
      'Batch processing is non-interactive — the opposite of what is described.',
      'Spooling queues I/O jobs for slow devices; nothing here is being sent to a device.',
    ],
    explanation:
      'This is thread-based multitasking: multiple threads inside one process. Because the threads share the process’s memory, the spell-check thread can read the same document the typing thread is editing — which would be far harder across separate processes.',
    tags: ['threads', 'multitasking'],
  },

  /* ============ l2-4 ============ */
  {
    id: 'q2-4-1',
    lessonId: 'l2-4',
    type: 'trueFalse',
    level: 3,
    prompt: 'A multi-user single-tasking operating system can exist.',
    correct: false,
    explanation:
      'It cannot. When multiple users are active, the system must handle multiple tasks at the same time — and that is multitasking by definition. Only three combinations are valid: single-user single-tasking, single-user multi-tasking, and multi-user multi-tasking.',
    remediation: 'Multiple users necessarily implies multiple tasks. There is no fourth combination.',
    tags: ['classification'],
  },
  {
    id: 'q2-4-2',
    lessonId: 'l2-4',
    type: 'mcq',
    level: 3,
    prompt:
      'A car airbag controller must deploy within a fixed number of milliseconds. Missing that deadline could be fatal. What type of system is this?',
    options: [
      'Soft real-time system',
      'Hard real-time system',
      'Time-sharing system',
      'Batch system',
    ],
    correct: 1,
    optionFeedback: [
      'Soft real-time means missing a deadline degrades performance but does not cause total failure — not the case here.',
      null,
      'Time-sharing aims for a short response time but guarantees nothing.',
      'Batch systems are the opposite of time-critical.',
    ],
    explanation:
      'Hard real-time systems are those where missing a deadline can lead to catastrophic failure. Automotive airbag systems, medical systems and industrial control systems are the syllabus examples.',
    tags: ['rtos'],
  },
  {
    id: 'q2-4-3',
    lessonId: 'l2-4',
    type: 'matching',
    level: 2,
    prompt: 'Match each RTOS characteristic to its description.',
    pairs: [
      { left: 'Deterministic timing', right: 'Tasks complete within known, fixed time constraints' },
      {
        left: 'Priority-based scheduling',
        right: 'Higher-priority tasks preempt lower-priority ones',
      },
      { left: 'Minimal interrupt latency', right: 'Interrupts are handled with minimal delay' },
      { left: 'Real-time clock', right: 'Tracks task deadlines accurately' },
    ],
    explanation:
      'The five key RTOS characteristics are deterministic timing, priority-based scheduling, minimal interrupt latency, reliability and stability, and a real-time clock.',
    tags: ['rtos'],
  },
  {
    id: 'q2-4-4',
    lessonId: 'l2-4',
    type: 'mcq',
    level: 4,
    prompt:
      'What is the single most important difference between a real-time and a time-sharing operating system?',
    options: [
      'An RTOS is faster than a time-sharing system',
      'An RTOS guarantees its response time; a time-sharing system only aims for a short one',
      'An RTOS supports more users',
      'A time-sharing system uses priority scheduling; an RTOS uses Round Robin',
    ],
    correct: 1,
    optionFeedback: [
      'Not necessarily faster — *predictable*. A slow but guaranteed response can beat a usually-fast one.',
      null,
      'The reverse: time-sharing systems support many users; an RTOS typically has minimal user interaction.',
      'Exactly backwards — an RTOS uses priority scheduling, time-sharing uses Round Robin.',
    ],
    explanation:
      'In an RTOS, response times are predictable and guaranteed. A time-sharing system aims for minimal response time but without guaranteed limits. That guarantee is what makes an RTOS usable for airbags and pacemakers.',
    tags: ['rtos', 'time-sharing'],
  },

  /* ============ l2-5 ============ */
  {
    id: 'q2-5-1',
    lessonId: 'l2-5',
    type: 'mcq',
    level: 2,
    prompt: 'Which is an advantage of a CLI over a GUI?',
    options: [
      'It is easier for beginners to learn',
      'It uses fewer system resources',
      'It gives clearer visual error messages',
      'It requires no knowledge of commands',
    ],
    correct: 1,
    optionFeedback: [
      'A CLI has a steeper learning curve — that is a GUI advantage.',
      null,
      'GUIs often give visual cues; CLI errors can be harder for beginners to interpret.',
      'A CLI requires you to know the commands — that is its main barrier.',
    ],
    explanation:
      'A CLI is lightweight and uses fewer resources, which is exactly why servers often run with no GUI at all. It is also faster for experienced users and can be scripted to automate tasks.',
    tags: ['interfaces'],
  },
  {
    id: 'q2-5-2',
    lessonId: 'l2-5',
    type: 'fillBlank',
    level: 1,
    prompt: 'GUIs are often described using the acronym WIMP: windows, icons, menus and ___.',
    accepted: ['pointers', 'pointer'],
    explanation:
      'WIMP — windows, icons, menus and pointers — is the classic shorthand for the elements that make up a graphical user interface.',
    tags: ['interfaces', 'gui'],
  },
  {
    id: 'q2-5-3',
    lessonId: 'l2-5',
    type: 'matching',
    level: 2,
    prompt: 'Match each interface type to an example.',
    pairs: [
      { left: 'Command Line Interface', right: 'Bash, PowerShell' },
      { left: 'Voice User Interface', right: 'Siri, Alexa' },
      { left: 'Virtual Reality interface', right: 'Oculus Rift, HTC Vive' },
      { left: 'Gesture-Based Interface', right: 'Microsoft Kinect' },
    ],
    explanation:
      'Beyond CLI and GUI, the syllabus names voice (VUI), virtual reality and gesture-based interfaces. Each solves a different accessibility or immersion problem.',
    tags: ['interfaces'],
  },
]
