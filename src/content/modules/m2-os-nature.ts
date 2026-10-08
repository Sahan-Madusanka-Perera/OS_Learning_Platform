import type { Module } from '@/types/content'

export const m2: Module = {
  id: 'm2',
  title: 'What an operating system does',
  shortTitle: 'OS functions',
  description:
    'The five jobs every operating system performs, how operating systems evolved to do them, and the ways we classify OSs by users, tasks, threads and timing.',
  accent: 'violet',
  syllabusRefs: ['5.1'],
  lessons: [
    /* ================= l2-1 ================= */
    {
      id: 'l2-1',
      moduleId: 'm2',
      title: 'The main functions of an operating system',
      summary:
        'Five jobs: providing interfaces, process management, resource management, security and protection, and executing application software.',
      whyItMatters:
        '"State the main functions of an operating system" is one of the most predictable questions in this competency. Five clean, distinct points is a full answer: vague waffle is not.',
      objectives: [
        'List the main functions of an operating system',
        'Explain what the OS does under each function',
        'Explain what an "abstraction" means in this context',
      ],
      prerequisites: ['l1-4'],
      minutes: 10,
      syllabusRefs: ['5.1'],
      keyTerms: ['os', 'resource-management', 'process', 'user-interface'],
      blocks: [
        {
          kind: 'prose',
          paragraphs: [
            'An operating system does a great many things, but the syllabus groups them into five main functions. Learn them as five separate ideas, not one blur.',
          ],
        },
        {
          kind: 'steps',
          title: 'The five main functions',
          steps: [
            {
              title: '1. Providing interfaces',
              detail:
                'The OS provides a **virtual machine** that hides hardware details and offers an interface between applications and end users. It also offers user interfaces such as a [[gui|GUI]] and [[cli|CLI]] so people can interact with the system easily.',
            },
            {
              title: '2. Process management',
              detail:
                'Handles the creation, execution and termination of [[process|processes]]. Ensures programs run smoothly and share CPU time fairly.',
            },
            {
              title: '3. Resource management',
              detail:
                'Manages computing resources by keeping track of their usage and handling permissions to grant or revoke access as needed.',
            },
            {
              title: '4. Security and protection',
              detail:
                'Controls access to the system using [[authentication]] and permission settings, ensuring only authorised users and processes can access sensitive data or functions.',
            },
            {
              title: '5. Executing application software',
              detail:
                'Runs application programs, making sure they operate smoothly within the system environment.',
            },
          ],
        },
        {
          kind: 'heading',
          text: 'What "providing an interface" really means',
        },
        {
          kind: 'prose',
          paragraphs: [
            'This function is worth more than one sentence, because it is the deepest idea in the whole unit.',
            'Your hard disk stores magnetised spots on a spinning platter. It has no concept of a "file". Yet you double-click **report.txt** and something opens. The OS invented the file. It invented folders. It invented the idea that data has a name.',
            'These invented conveniences are called **abstractions**. Directories, files and data are abstractions the operating system provides to the user. They do not exist in the hardware: the OS creates them and maintains the illusion perfectly.',
          ],
        },
        {
          kind: 'keyIdea',
          title: 'The virtual machine idea',
          text: 'The OS presents every program with a clean, simplified, imaginary computer: one with files instead of magnetised spots, and unlimited private memory instead of shared chips. Programs are written against that imaginary machine, which is why one program can run on thousands of different real machines.',
        },
        {
          kind: 'analogy',
          title: 'A postal address',
          everyday:
            'You write "42 Galle Road, Colombo 03" on an envelope. You have no idea which sorting office it passes through, which van carries it, or which route the postman walks. The address is an abstraction: a simple name standing in for an enormously complicated physical journey.',
          mapsTo:
            'A file path is exactly the same trick. `C:\\Users\\Nimal\\report.txt` hides which platter, which track, which sector, and lets the OS change all of that without your program noticing.',
        },
        {
          kind: 'recall',
          prompt:
            'Cover the screen. Name all five main functions of an operating system.',
          answer:
            'Providing interfaces · Process management · Resource management · Security and protection · Executing application software.',
          hint: 'Interface, process, resource, security, execution.',
        },
        {
          kind: 'misconception',
          wrong: 'Resource management and process management are the same thing.',
          right:
            'Process management is about the **lifecycle** of programs: creating, running and terminating them, and sharing CPU time. Resource management is about **tracking and allocating** things processes need (memory, devices, files) and controlling permissions to them.',
          why: 'A useful test: process management answers "who runs next?"; resource management answers "who is allowed to use this, and are they finished with it?"',
        },
        {
          kind: 'examTip',
          text: 'When a question asks you to *describe* rather than *list*, give the function name plus one clause of detail each. Five names alone will usually score fewer marks than five name-plus-detail pairs.',
        },
        {
          kind: 'quickCheck',
          questionIds: ['q2-1-1', 'q2-1-2', 'q2-1-3'],
        },
      ],
      takeaways: [
        'Five main functions: interfaces, process management, resource management, security & protection, executing applications.',
        'The OS provides a virtual machine hiding hardware details.',
        'Directories, files and data are abstractions the OS provides to the user: they do not exist in hardware.',
        'Process management is about lifecycle; resource management is about tracking and permissions.',
      ],
    },

    /* ================= l2-2 ================= */
    {
      id: 'l2-2',
      moduleId: 'm2',
      title: 'Evolution: four generations, one problem',
      summary:
        'From no OS at all to time-sharing: each generation invented to stop the processor sitting idle.',
      whyItMatters:
        'Exam questions ask you to compare the generations across specific features: input, output, memory structure, scheduling, users. If you understand *why* each generation appeared, the table becomes something you can reconstruct instead of memorise.',
      objectives: [
        'Describe the four stages in the evolution of operating systems',
        'Explain the problem each generation solved',
        'Compare the generations by CPU utilisation, memory structure, scheduling and user interaction',
      ],
      prerequisites: ['l1-4'],
      minutes: 14,
      syllabusRefs: ['5.1'],
      keyTerms: ['batch-system', 'resident-monitor', 'multiprogramming', 'time-sharing'],
      blocks: [
        {
          kind: 'keyIdea',
          title: 'One idea drives the whole story',
          text: 'A CPU costing a fortune must never be idle. The first three generations each remove one more source of idle time. The fourth, time-sharing, keeps the CPU just as busy but finally makes it respond to people.',
        },
        {
          kind: 'viz',
          viz: 'evolutionTimeline',
          title: 'Four generations: click each one',
          caption:
            'Watch the CPU activity strip. The red gaps are wasted money, and each generation up to multiprogramming shrinks them. Then see what time-sharing changes instead.',
        },
        { kind: 'heading', text: 'The story in words' },
        {
          kind: 'steps',
          steps: [
            {
              title: 'No operating system (late 1940s – mid 1950s)',
              detail:
                'Programs were loaded manually by a human operator. Input was punch cards, output was display lights. All memory went to one program, at a fixed address, with no protection. **The processor sat idle while humans loaded cards and mounted tapes.** Examples: ENIAC (1946), EDSAC (1949), UNIVAC I (1951).',
            },
            {
              title: 'Simple batch system (mid 1950s – late 1960s)',
              detail:
                'A **[[resident-monitor|resident monitor]]** occupies a small part of memory and automatically loads the next job when the current one finishes, removing the human from between jobs. Scheduling is FCFS and non-preemptive. Jobs are described using JCL (Job Control Language). **But the CPU is still idle during I/O.** Examples: IBM 7094, FORTRAN Monitor System.',
            },
            {
              title: 'Multi-programmed batch system (third generation, mid–late 1960s)',
              detail:
                'Several jobs sit in memory at once in separate partitions. When one job blocks for I/O, the CPU switches to another. This is considered **the central theme of modern operating systems**. It also introduced [[spooling]]. Examples: IBM System/360, CDC 6600, Burroughs B5500.',
            },
            {
              title: 'Time-sharing system (from the 1960s)',
              detail:
                'The processor switches after a fixed **time quantum**, whether or not a job has blocked: preemptive scheduling driven by a timer interrupt. Rapid switching creates the illusion of concurrent execution and lets many users interact through terminals. Examples: CTSS (the first, 1961), Multics, UNIX, VMS, Windows NT.',
            },
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The one distinction examiners love',
          text: 'In **multiprogramming**, a process switches only when it *blocks* (usually for I/O). In **time-sharing**, a process switches even when it is running perfectly well, because its time slice expired. Multiprogramming maximises CPU utilisation; time-sharing minimises response time.',
        },
        {
          kind: 'compare',
          title: 'The generations compared',
          headers: ['Feature', 'No OS', 'Simple batch', 'Multi-programmed batch', 'Time-sharing'],
          rows: [
            ['User interaction', 'Direct (manual)', 'None', 'Limited', 'Concurrent, multiple users'],
            [
              'Job execution',
              'Manual, single program',
              'Sequential, single program',
              'Concurrent, multiple programs',
              'Concurrent, multiple users',
            ],
            [
              'CPU utilisation',
              'Low: idle during I/O and loading',
              'Low: idle during I/O',
              'Higher: overlaps I/O and CPU',
              'High: rapid switching',
            ],
            ['Memory management', 'None', 'Simple', 'Complex (partitions, protection)', 'More complex (swapping, paging, virtual memory)'],
            ['Complexity', 'Low', 'Low', 'Medium', 'High'],
            ['Response time', 'Manual (slow)', 'Delayed (batch)', 'Improved', 'Quick (interactive)'],
          ],
        },
        {
          kind: 'recall',
          prompt:
            'Why was the multi-programmed batch system invented? What specific waste did it remove that simple batch systems still suffered?',
          answer:
            'Simple batch systems removed the human from between jobs, but the CPU still sat idle whenever the running job did input or output. Multiprogramming keeps several jobs in memory so the CPU can switch to another job when one blocks for I/O.',
          hint: 'What is the CPU doing while a job reads a tape?',
        },
        {
          kind: 'confused',
          question:
            'If multiprogramming already keeps the CPU busy, why did we need time-sharing at all?',
          simpler:
            'Multiprogramming makes the *machine* efficient. It does nothing for the *person*. If your job is third in the queue and the first two are long, you wait hours: the CPU is 95% busy the whole time, and you are still waiting. Time-sharing fixes the human’s problem, not the machine’s.',
          picture:
            'Imagine a doctor who never has an idle moment because there is always a patient in the room. Excellent for the doctor. Terrible for you, sitting in the waiting room since 8 a.m. Time-sharing is the doctor seeing each patient for five minutes in rotation: less efficient per patient, but everyone gets seen.',
          prerequisite: { label: 'Main functions of an operating system', lessonId: 'l2-1' },
        },
        {
          kind: 'examTip',
          text: 'A frequent question: "State the main disadvantage of a simple batch system." One line answers it.',
          modelAnswer: 'The processor sits idle while the job performs input/output operations.',
        },
        {
          kind: 'quickCheck',
          questionIds: ['q2-2-1', 'q2-2-2', 'q2-2-3', 'q2-2-4'],
        },
      ],
      takeaways: [
        'No OS → simple batch → multi-programmed batch → time-sharing; the first three each remove a source of CPU idle time, and time-sharing adds fast response.',
        'A resident monitor in a simple batch system loads the next job automatically, but the CPU still idles during I/O.',
        'Multiprogramming switches when a process blocks; time-sharing switches when the time quantum expires.',
        'Multiprogramming is considered the central theme of modern operating systems.',
      ],
    },

    /* ================= l2-3 ================= */
    {
      id: 'l2-3',
      moduleId: 'm2',
      title: 'Multitasking and multithreading',
      summary:
        'How one CPU appears to run five programs at once, and the difference between switching between processes and switching between threads.',
      whyItMatters:
        'Students routinely write that multitasking means "running programs at the same time". On a single core that is false, and examiners notice. The precise wording, "seemingly at the same time", carries the mark.',
      objectives: [
        'Explain how multitasking creates the illusion of simultaneous execution',
        'Distinguish process-based from thread-based multitasking',
        'Compare multi-threading and single-threading operating systems',
      ],
      prerequisites: ['l2-2'],
      minutes: 10,
      syllabusRefs: ['5.1'],
      keyTerms: ['multitasking', 'thread', 'multithreading'],
      blocks: [
        {
          kind: 'definition',
          term: 'Multitasking',
          simple: 'A computer appearing to run several programs at the same time.',
          technical:
            'The ability of a computer to execute multiple tasks or processes concurrently, seemingly at the same time. In most cases the operating system rapidly switches between them, giving the illusion of parallel execution.',
        },
        {
          kind: 'viz',
          viz: 'multitasking',
          title: 'Slow the switching down and watch the illusion break',
          caption:
            'The top strip is what really happens; the bottom is what you perceive. They only agree at high speed.',
        },
        {
          kind: 'misconception',
          wrong: 'Multitasking means the CPU runs several programs at exactly the same moment.',
          right:
            'On a single core, only one process executes at any instant. The OS switches between them so rapidly that it *appears* simultaneous. That is why the definition says **"seemingly at the same time"**.',
          why: 'Multi-core CPUs genuinely can run one process per core simultaneously, but even then, far more processes are running than there are cores, so switching is still what makes it work.',
        },
        { kind: 'heading', text: 'Two kinds of multitasking' },
        {
          kind: 'compare',
          headers: ['', 'Process-based', 'Thread-based'],
          rows: [
            [
              'What runs concurrently',
              'Multiple independent programs (processes)',
              'Multiple [[thread|threads]] within a single process',
            ],
            [
              'Memory',
              'Each process has **its own** memory space and resources',
              'Threads **share** the same memory space and resources of the process',
            ],
            [
              'Communication',
              'Harder: processes are isolated from each other',
              'Easier: shared memory makes communication and synchronisation simpler',
            ],
            [
              'Example',
              'Browser, word processor and music player all open',
              'A browser rendering a page while downloading a file in another tab',
            ],
          ],
        },
        {
          kind: 'definition',
          term: 'Thread',
          simple: 'A single stream of work happening inside one program.',
          technical:
            'The smallest unit of processing that can be scheduled by an operating system. Threads share the same memory and system resources but execute independently with their own execution states.',
        },
        {
          kind: 'analogy',
          title: 'A kitchen',
          everyday:
            'Two separate restaurants are two processes: each has its own kitchen, its own ingredients, its own staff. Nothing is shared, and if one burns down the other carries on. Two chefs working in **one** kitchen are two threads: they share the same fridge and the same stove, which makes cooperation fast, but if one chef leaves the gas on, both are in trouble.',
          mapsTo:
            'Threads share memory, so they are cheap to switch between and easy to coordinate. But an error in one thread can corrupt data another thread is using, which is why process isolation still matters.',
        },
        {
          kind: 'compare',
          title: 'Multi-threading vs single-threading operating systems',
          headers: ['Feature', 'Multi-threading OS', 'Single-threading OS'],
          rows: [
            [
              'Concurrency',
              'Supports concurrency and parallelism',
              'Runs only one task at a time within a process',
            ],
            [
              'Resource sharing',
              'Threads share memory and other resources',
              'Each process runs independently with its own allocated resources',
            ],
            [
              'Performance',
              'Uses multiple CPU cores efficiently and keeps the CPU busy',
              'CPU may remain idle during I/O operations',
            ],
            [
              'Responsiveness',
              'Background tasks run concurrently with user interaction',
              'Can become unresponsive during long-running tasks',
            ],
            [
              'Examples',
              'Windows, Linux, macOS, Android, iOS',
              'MS-DOS, CP/M, simple embedded systems, early Palm OS',
            ],
          ],
        },
        {
          kind: 'list',
          title: 'Everyday examples of multitasking',
          items: [
            'Running a web browser, word processor and music player at once',
            'Background processes such as antivirus scans and system updates running while you work',
            'A server handling multiple client requests concurrently',
          ],
        },
        {
          kind: 'recall',
          prompt:
            'Two threads in the same process share something that two separate processes do not. What is it, and name one advantage and one risk of that sharing.',
          answer:
            'They share the same memory space and resources. Advantage: communication and synchronisation between them is easier and faster. Risk: an error in one thread can corrupt data another thread is using, because there is no isolation between them.',
        },
        {
          kind: 'quickCheck',
          questionIds: ['q2-3-1', 'q2-3-2', 'q2-3-3'],
        },
      ],
      takeaways: [
        'Multitasking = executing multiple tasks concurrently, *seemingly* at the same time, via rapid switching.',
        'Process-based multitasking: separate memory per process. Thread-based: threads share the process’s memory.',
        'A thread is the smallest schedulable unit of processing.',
        'Multi-threading improves CPU utilisation and responsiveness; single-threading is simpler but wastes CPU during I/O.',
      ],
    },

    /* ================= l2-4 ================= */
    {
      id: 'l2-4',
      moduleId: 'm2',
      title: 'Classifying operating systems',
      summary:
        'Four ways to classify an OS: by number of users, number of tasks, processing model, and timing requirements.',
      whyItMatters:
        'Classification questions are guaranteed marks *if* you know which axis the question is asking about. Mixing up "multi-user" with "multi-tasking" is the single most common error in this competency.',
      objectives: [
        'Classify operating systems by number of users and number of tasks',
        'Explain why a multi-user single-tasking OS cannot exist',
        'Describe real-time operating systems and compare hard and soft real-time',
        'Compare real-time and time-sharing operating systems',
      ],
      prerequisites: ['l2-3'],
      minutes: 14,
      syllabusRefs: ['5.1'],
      keyTerms: ['rtos', 'hard-real-time', 'soft-real-time', 'time-sharing', 'multithreading'],
      blocks: [
        {
          kind: 'prose',
          paragraphs: [
            'There is no single "type" of operating system. There are four independent questions you can ask about one, and the answers combine.',
          ],
        },
        { kind: 'heading', text: '1. Based on number of users' },
        {
          kind: 'compare',
          headers: ['Feature', 'Single-user OS', 'Multi-user OS'],
          rows: [
            [
              'Resource allocation',
              'Resources are dedicated to one user',
              'Resources are shared among users',
            ],
            ['User interface', 'Mainly a GUI', 'Provides both GUI and command-line interfaces'],
            [
              'Security and permissions',
              'Basic security for a single user',
              'Strong security and access control mechanisms',
            ],
            ['Process management', 'Manages processes for one user', 'Manages processes for multiple users'],
            [
              'System complexity',
              'Simple and easy to use and manage',
              'More complex due to multiple users, processes and security measures',
            ],
            [
              'Examples',
              'MS-DOS, Windows 95/98/ME, Windows 10/11, macOS',
              'UNIX and UNIX-like systems, Windows Server, IBM z/OS, Solaris, FreeBSD',
            ],
          ],
          caption:
            'Windows 10/11 and macOS let you create several accounts, but only one person uses the machine at a time. That is why the syllabus classes them as single-user, multi-tasking.',
        },
        { kind: 'heading', text: '2. Based on number of tasks' },
        {
          kind: 'compare',
          headers: ['Feature', 'Single-tasking OS', 'Multi-tasking OS'],
          rows: [
            ['Resource allocation', 'Simple, less complex', 'Complex, efficient management'],
            ['System overhead', 'Low', 'High'],
            ['CPU utilisation', 'Inefficient', 'Efficient'],
            ['User productivity', 'Limited', 'High'],
            [
              'Examples',
              'Early MS-DOS, embedded systems, early Palm OS, CP/M, Apple DOS',
              'Windows, macOS, Linux',
            ],
          ],
        },
        {
          kind: 'heading',
          text: 'Combining the two axes',
          level: 'sub',
        },
        {
          kind: 'list',
          items: [
            '**Single-user, single-tasking**: one user performs one task at a time. Foundational in computing history; simple and efficient for specific, limited-use scenarios.',
            '**Single-user, multi-tasking**: one user runs several applications at once. This is your laptop.',
            '**Multi-user, multi-tasking**: multiple users concurrently, each running multiple tasks. This is a server.',
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'A favourite exam trap',
          text: 'A **multi-user single-tasking operating system cannot exist**. When multiple users are active, the system must handle multiple tasks at the same time, and that *is* multitasking. There are only three valid combinations, not four.',
        },
        { kind: 'heading', text: '3. Based on processing model' },
        {
          kind: 'prose',
          paragraphs: [
            'This is the single-threading vs multi-threading distinction from the previous lesson. A **single-threading OS** allows only one thread per process, so tasks execute sequentially with no internal concurrency: simpler to design, but limited performance and CPU utilisation. Examples: MS-DOS, CP/M, and some real-time and embedded systems.',
            'A **multi-threading OS** lets the scheduler manage multiple threads to improve CPU utilisation and enable concurrent execution: enhancing performance, responsiveness and efficiency. Examples: Windows, Linux, macOS, Android, iOS.',
          ],
        },
        { kind: 'heading', text: '4. Based on timing requirements' },
        {
          kind: 'definition',
          term: 'Real-Time Operating System (RTOS)',
          simple: 'An OS that must respond within a guaranteed time, every single time.',
          technical:
            'An operating system designed to serve real-time applications that process data as it comes in, typically without buffer delays.',
          example: 'VxWorks, FreeRTOS, QNX, RTEMS.',
        },
        {
          kind: 'list',
          title: 'Key characteristics of an RTOS',
          style: 'check',
          items: [
            '**Deterministic timing**: tasks complete within known, fixed time constraints',
            '**Priority-based scheduling**: higher-priority tasks preempt lower-priority ones',
            '**Minimal interrupt latency**: interrupts are handled with minimal delay',
            '**Reliability and stability**: designed to recover from hardware or software faults',
            '**Real-time clock**: used to manage and track task deadlines accurately',
          ],
        },
        {
          kind: 'compare',
          title: 'Hard vs soft real-time',
          headers: ['', '[[hard-real-time|Hard real-time]]', '[[soft-real-time|Soft real-time]]'],
          rows: [
            [
              'Missing a deadline',
              'Can lead to **catastrophic failure**',
              'Results in **degraded performance**, not total system failure',
            ],
            [
              'Examples',
              'Medical systems (pacemakers), automotive airbag systems, industrial control systems',
              'Multimedia systems, telecommunications',
            ],
          ],
        },
        {
          kind: 'list',
          title: 'Where RTOSs are used',
          items: [
            '**Automotive**: engine control units, airbag systems, driver-assistance systems',
            '**Medical devices**: pacemakers, infusion pumps, MRI machines',
            '**Industrial automation**: robotics, assembly line control, process automation',
            '**Aerospace and defence**: avionics, UAVs, missile guidance',
            '**Nuclear reactor control**: monitoring and controlling reactor operations in real time',
            '**Satellite and space probe control**: navigation with strict timing requirements',
            '**Elevator control**: movement and safety responses in real time',
          ],
        },
        {
          kind: 'analogy',
          title: 'An airbag and a video call',
          everyday:
            'An airbag has to fire within a few tens of milliseconds of a crash. If it fires late, it is not "slightly worse". It can fail to protect the driver at all. That is hard real-time. A video call that stutters for half a second is annoying, but you carry on talking. That is soft real-time.',
          mapsTo:
            'The difference is not how fast the deadline is, but what happens when you miss it. Catastrophic failure means hard; degraded performance means soft.',
        },
        {
          kind: 'compare',
          title: 'Real-time vs time-sharing',
          headers: ['Feature', 'RTOS', 'Time-sharing OS'],
          rows: [
            [
              'Timing constraints',
              'Tasks must complete within defined time limits (hard deadlines)',
              'No strict deadlines; focuses on fair CPU sharing',
            ],
            [
              'Task scheduling',
              'Priority-based: high-priority tasks run immediately',
              'Round Robin using time slices',
            ],
            ['User interaction', 'Typically minimal', 'High interaction with multiple users'],
            [
              'Response time',
              'Predictable and **guaranteed**',
              'Aims for minimal response time but **without guaranteed limits**',
            ],
            [
              'Examples',
              'VxWorks, FreeRTOS, QNX, RTEMS',
              'CTSS, Multics, UNIX, VMS, Windows NT',
            ],
          ],
        },
        {
          kind: 'recall',
          prompt:
            'Why can a multi-user single-tasking operating system not exist?',
          answer:
            'Because when multiple users are active, the system must handle multiple tasks at the same time, and handling multiple tasks simultaneously *is* multitasking. So a multi-user system is necessarily multi-tasking.',
        },
        {
          kind: 'quickCheck',
          questionIds: ['q2-4-1', 'q2-4-2', 'q2-4-3', 'q2-4-4'],
        },
      ],
      takeaways: [
        'Four classification axes: number of users, number of tasks, processing model (threads), timing requirements.',
        'A multi-user single-tasking OS cannot exist: multiple users implies multitasking.',
        'RTOS features: deterministic timing, priority scheduling, minimal interrupt latency, reliability, real-time clock.',
        'Hard real-time: missing a deadline is catastrophic. Soft real-time: performance degrades only.',
        'RTOS guarantees response time; time-sharing merely aims for a short one.',
      ],
    },

    /* ================= l2-5 ================= */
    {
      id: 'l2-5',
      moduleId: 'm2',
      title: 'User interfaces: how people talk to machines',
      summary:
        'CLI, GUI, voice, virtual reality and gesture-based interfaces, and an honest comparison of the first two.',
      whyItMatters:
        'The GUI-vs-CLI comparison table is directly examinable, and the "CLI is old and useless" assumption costs students marks. Both are still used, for good reasons.',
      objectives: [
        'Define a user interface and name the main types',
        'Compare graphical and command-line interfaces across several criteria',
        'Describe voice, virtual reality and gesture-based interfaces',
      ],
      prerequisites: ['l2-1'],
      minutes: 10,
      syllabusRefs: ['5.1'],
      keyTerms: ['user-interface', 'cli', 'gui'],
      blocks: [
        {
          kind: 'definition',
          term: 'User interface',
          simple: 'The part of a system you actually interact with.',
          technical:
            'The part of a computer or device that enables users to interact with software and hardware. A good UI makes interaction smooth, efficient and user-friendly, improving the overall user experience.',
        },
        {
          kind: 'viz',
          viz: 'interfaceComparison',
          title: 'The same task, two interfaces',
          caption: 'Switch between them and read the trade-offs underneath.',
        },
        { kind: 'heading', text: 'Command Line Interface (CLI)' },
        {
          kind: 'prose',
          paragraphs: [
            'A **[[cli|CLI]]** is a text-based interface where you interact by typing commands into a terminal or command prompt. It was the primary way of using early computers, and it is still widely used today.',
            'It is powerful and efficient: commands can be automated into scripts, files managed in bulk, and system settings controlled precisely. You type into a command interpreter called a shell, such as Bash, PowerShell or Zsh.',
          ],
        },
        {
          kind: 'list',
          title: 'CLI examples',
          items: [
            'Unix/Linux shells: Bash, Zsh',
            'Windows Command Prompt',
            'PowerShell',
            'Terminal on macOS',
          ],
        },
        { kind: 'heading', text: 'Graphical User Interface (GUI)' },
        {
          kind: 'prose',
          paragraphs: [
            'A **[[gui|GUI]]** lets you interact using visual elements (windows, icons, buttons and menus) with a pointing device such as a mouse. The classic shorthand is **WIMP**: windows, icons, menus and pointers.',
            'Operating systems like Windows and macOS use GUIs to improve usability and accessibility, which is why they became the default for everyday computing.',
          ],
        },
        {
          kind: 'compare',
          title: 'GUI vs CLI',
          headers: ['Aspect', 'GUI', 'CLI'],
          rows: [
            [
              'User interaction',
              'Through graphical elements: windows, icons, buttons',
              'Through typed text commands',
            ],
            ['Usability', 'User-friendly, easier for beginners', 'Requires knowledge of commands; more complex'],
            ['Learning curve', 'Easier to learn', 'Steeper learning curve'],
            [
              'Speed',
              'Slower for experienced users, navigating menus and dialogs',
              'Faster for experienced users who can execute commands quickly',
            ],
            [
              'Resource usage',
              'Consumes more memory and processing power',
              'Lightweight: uses fewer resources',
            ],
            [
              'Error handling',
              'Often gives visual cues or readable messages',
              'Errors may be harder for beginners to interpret',
            ],
          ],
        },
        {
          kind: 'misconception',
          wrong: 'The CLI is outdated and nobody uses it any more.',
          right:
            'CLIs are used constantly: on servers, in software development, and anywhere tasks must be automated. GUI clicks are hard to automate; a CLI command can run on ten thousand machines unattended.',
          why: 'Servers frequently run with **no GUI at all**, precisely because a GUI wastes memory and processing power that should go to serving users.',
        },
        { kind: 'heading', text: 'Three more interfaces' },
        {
          kind: 'table',
          headers: ['Interface', 'How it works', 'Examples'],
          rows: [
            [
              '**Voice User Interface (VUI)**',
              'Lets users interact using spoken language instead of typing or clicking. Converts speech into commands using speech recognition, enabling hands-free, natural-language interaction with real-time responses. Enhances accessibility and supports multiple languages, often integrated with AI assistants. May struggle with accents, background noise or complex commands.',
              'Siri, Google Assistant, Amazon Alexa, Samsung Bixby',
            ],
            [
              '**Virtual Reality interface**',
              'A computer-generated simulation letting users interact with a 3D environment using VR headsets, gloves or motion sensors. Provides an immersive experience by simulating the real world or creating entirely virtual spaces. Requires VR hardware. Used in entertainment, education, healthcare and military training.',
              'Beat Saber, flight simulators, virtual tours, medical simulations',
            ],
            [
              '**Gesture-Based Interface (GBI)**',
              'Lets users interact using body movements, typically hand or finger gestures, without touching a screen or physical controls. Uses sensors, cameras or wearable devices to detect and interpret gestures. Touchless, natural and intuitive control.',
              'Microsoft Kinect, touchless gesture controls in smartphones, gesture-navigating smart TVs, Meta Quest hand tracking, BMW gesture control',
            ],
          ],
        },
        {
          kind: 'recall',
          prompt:
            'Give two reasons a system administrator might prefer a CLI over a GUI on a server.',
          answer:
            'It uses fewer resources (memory and processing power), leaving more for the actual server work; and commands can be scripted and automated, so the same task can run unattended across many machines. It is also faster for an experienced user than navigating menus.',
        },
        {
          kind: 'quickCheck',
          questionIds: ['q2-5-1', 'q2-5-2', 'q2-5-3'],
        },
      ],
      takeaways: [
        'A user interface enables users to interact with software and hardware.',
        'CLI: text commands, lightweight, scriptable, fast for experts, steep learning curve.',
        'GUI: WIMP elements, beginner-friendly, resource-hungry, slower for experts.',
        'Other types: voice (VUI), virtual reality, and gesture-based interfaces.',
      ],
    },
  ],
}
