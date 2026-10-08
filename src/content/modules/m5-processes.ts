import type { Module } from '@/types/content'

export const m5: Module = {
  id: 'm5',
  title: 'Process management',
  shortTitle: 'Processes',
  description:
    'What a process is, the seven states it moves through, how the OS switches between them, and the algorithms that decide who runs next.',
  accent: 'amber',
  syllabusRefs: ['5.3'],
  lessons: [
    /* ================= l5-1 ================= */
    {
      id: 'l5-1',
      moduleId: 'm5',
      title: 'Program vs process',
      summary:
        'The single most examined distinction in this competency, and the types of process the OS has to juggle.',
      whyItMatters:
        '"Distinguishes a process and a program" is a named learning outcome, and it is the foundation of everything else in this module. Get it precise now.',
      objectives: [
        'Distinguish a program from a process',
        'Explain why one program can produce many processes',
        'List the types of process',
      ],
      prerequisites: ['l2-1'],
      minutes: 9,
      syllabusRefs: ['5.3'],
      keyTerms: ['program', 'process', 'io-bound', 'cpu-bound'],
      blocks: [
        {
          kind: 'compare',
          headers: ['', '[[program|Program]]', '[[process|Process]]'],
          rows: [
            [
              'What it is',
              'A set of instructions written in a programming language and stored in secondary storage, telling the computer what tasks to perform.',
              'A program **currently being executed** by the computer, along with its current state, CPU registers, memory and other required resources.',
            ],
            ['Where it lives', 'On the disk', 'In main memory (RAM)'],
            ['State', 'Passive: it just sits there', 'Active: it is doing something'],
            ['Lifetime', 'Permanent until deleted', 'Exists only while running'],
          ],
        },
        {
          kind: 'keyIdea',
          title: 'The sentence to remember',
          text: 'A process is **not** a program. A program may have **many** processes.',
        },
        {
          kind: 'analogy',
          title: 'A recipe and a meal',
          everyday:
            'A recipe in a book is a program: instructions, sitting still, waiting. Cooking that recipe is a process. Three cooks can follow the same recipe at the same time in three kitchens: one recipe, three processes. Each has its own pan, its own half-chopped onions, and its own place in the instructions.',
          mapsTo:
            'That "own place in the instructions" is the [[program-counter|program counter]]. The half-chopped onions are the process’s memory. The pan is a resource the OS allocated. All of this is what makes a process more than a program.',
        },
        {
          kind: 'confused',
          question: 'How can ONE program have MANY processes at once?',
          simpler:
            'Open Chrome. Now open a second Chrome window. Same program file on your disk, but the OS is running it twice, and each copy has its own memory, its own tabs and its own place in the code. Two processes, one program.',
          picture:
            'Look in Task Manager. You will often see the same application name listed six or seven times: each row is a separate process from a single program file.',
        },
        { kind: 'heading', text: 'Types of process' },
        {
          kind: 'compare',
          title: 'By what they spend time doing',
          headers: ['Type', 'Behaviour', 'Example'],
          rows: [
            [
              '**[[io-bound|I/O bound]]**',
              'Spends more time waiting for I/O operations, reading from or writing to a disk or network, than doing actual computation.',
              'Copying a large file; loading a web page',
            ],
            [
              '**[[cpu-bound|Processor bound]]**',
              'Spends most of its time doing computations and requires more CPU processing time than I/O.',
              'Complex calculations; video rendering',
            ],
          ],
        },
        {
          kind: 'compare',
          title: 'Other classifications',
          headers: ['Type', 'Description'],
          rows: [
            ['**User processes**', 'Initiated by the user to perform user-related tasks.'],
            [
              '**System processes**',
              'Initiated by the operating system to perform system-related functions.',
            ],
            [
              '**Foreground processes**',
              'Run in the foreground and interact directly with the user.',
            ],
            [
              '**Background processes**',
              'Run in the background without direct user interaction.',
            ],
          ],
        },
        {
          kind: 'callout',
          tone: 'info',
          title: 'Why the OS cares about I/O bound vs CPU bound',
          text: 'A good mix keeps everything busy. If every process were CPU bound, the disk would idle; if every process were I/O bound, the CPU would idle. Schedulers work best when they can overlap one process’s waiting with another’s computing, which is exactly the multiprogramming idea from Module 2.',
        },
        {
          kind: 'heading',
          text: 'Why we need process management at all',
        },
        {
          kind: 'list',
          style: 'check',
          items: [
            'To create and terminate processes when required',
            'To schedule processes efficiently so the CPU is shared fairly',
            'To enable concurrent execution of multiple programs',
            'To allocate and manage CPU time and other system resources effectively',
            'To prevent conflicts and ensure proper synchronisation between processes',
          ],
        },
        {
          kind: 'recall',
          prompt: 'In one sentence each, define a program and a process.',
          answer:
            'A program is a set of instructions written in a programming language and stored in secondary storage. A process is a program currently being executed, together with its current state, CPU registers, memory and required resources.',
        },
        {
          kind: 'quickCheck',
          questionIds: ['q5-1-1', 'q5-1-2', 'q5-1-3'],
        },
      ],
      takeaways: [
        'A program is passive instructions on disk; a process is a program in execution with state and resources.',
        'One program can produce many processes.',
        'I/O bound processes wait mostly; CPU bound processes compute mostly.',
        'Processes are also classified as user/system and foreground/background.',
      ],
    },

    /* ================= l5-2 ================= */
    {
      id: 'l5-2',
      moduleId: 'm5',
      title: 'Inside a process: components and the PCB',
      summary:
        'What a process is actually made of, and the data structure that lets the OS put a paused process back exactly as it was.',
      whyItMatters:
        '"Briefly explains the process control block and lists its contents" is an explicit learning outcome: this is a list you can be asked to reproduce.',
      objectives: [
        'List the components of a process',
        'Explain the purpose of the Process Control Block',
        'List the contents of a PCB',
        'Distinguish a parent process from a child process',
      ],
      prerequisites: ['l5-1'],
      minutes: 11,
      syllabusRefs: ['5.3'],
      keyTerms: ['pcb', 'pid', 'program-counter', 'process'],
      blocks: [
        {
          kind: 'list',
          title: 'The main components of a process',
          style: 'number',
          items: [
            '**Executable code**: the program or binary file containing the instructions for the process to execute',
            '**Data segment**: the data the process needs while running',
            '**[[pcb|Process Control Block]] (PCB)**: the OS’s record of everything about this process',
            '**Input/output resources**: the devices and files the process is using',
          ],
        },
        {
          kind: 'prose',
          paragraphs: [
            'A process also has an **execution context**: all the important information the operating system needs to keep track of for the process to run correctly. If the process is interrupted, the OS saves this information so it can resume exactly where it left off when it is ready to run again.',
            'And every process has a **[[pid|Process ID (PID)]]**: a unique identifier assigned by the operating system, whose purpose is to facilitate easy allocation and tracking of system resources such as memory, CPU time and I/O operations.',
          ],
        },
        { kind: 'heading', text: 'The Process Control Block' },
        {
          kind: 'definition',
          term: 'Process Control Block (PCB)',
          simple: 'The OS’s record card for one running process.',
          technical:
            'A data structure maintained by the operating system that stores all the information needed to manage and control a process. By storing crucial information about each process, the PCB enables the OS to oversee their execution, manage system resources, and ensure efficient multitasking.',
        },
        {
          kind: 'table',
          title: 'Contents of a PCB',
          headers: ['Item', 'What it holds'],
          rows: [
            [
              '**Process identifier (PID)**',
              'A unique identification number assigned to each process by the operating system.',
            ],
            [
              '**Process state**',
              'The current status of the process in its lifecycle: new, ready, running, blocked and so on.',
            ],
            [
              '**[[program-counter|Program counter]]**',
              'A pointer to the address of the next instruction to be executed for this process.',
            ],
            [
              '**CPU registers**',
              'While a process runs, its working values live in the CPU’s registers. Those values are copied here when the process is switched out, and copied back when it resumes.',
            ],
            [
              '**Memory management information**',
              'Page table, memory limits and segment table, depending on the memory management scheme used.',
            ],
            [
              '**CPU scheduling information**',
              'Data the scheduler needs to determine process priority, allocation and so on.',
            ],
            [
              '**Accounting information**',
              'Resources used by the process: CPU time used, time limits and similar.',
            ],
            [
              '**I/O status information**',
              'Information about I/O devices allocated to the process: open files, pending requests.',
            ],
            [
              '**List of open files**',
              'Details of files currently opened by the process, so the OS can manage reading, writing and file access properly.',
            ],
            [
              '**List of open devices**',
              'Input and output devices being used by the process, enabling the OS to control device usage efficiently.',
            ],
          ],
          caption:
            'The exact architecture of a PCB depends entirely on the operating system, and may contain different information across different operating systems.',
        },
        {
          kind: 'analogy',
          title: 'Pausing a film',
          everyday:
            'You pause a film 47 minutes in and switch off the TV. When you come back, the player remembers the timestamp, the subtitle setting and the volume, so it resumes exactly where you were. It did not save the film itself; it saved *where you were in it*.',
          mapsTo:
            'That saved information is the PCB. The program counter is the timestamp. The registers are the settings. This is why the PCB makes multitasking possible: without it, a paused process could never be resumed.',
        },
        { kind: 'heading', text: 'Parent and child processes' },
        {
          kind: 'compare',
          headers: ['', 'Parent process', 'Child process'],
          rows: [
            [
              'Definition',
              'A process that creates one or more new processes during its execution using a system call.',
              'A new process created by a parent process.',
            ],
            [
              'Relationship',
              'Controls or manages the child processes and can collect their exit status when they terminate.',
              'Executes as a separate process with its own memory space and PID, but is initially created based on the parent process.',
            ],
            [
              'Independence',
              'Carries on with its own work, and may wait for its children to finish',
              'Can run independently, but usually reports its termination status back to the parent.',
            ],
          ],
        },
        {
          kind: 'recall',
          prompt:
            'The OS pauses a process. Name four things it must save in the PCB so the process can resume correctly.',
          answer:
            'Any four of: process state, program counter, CPU registers, memory management information, CPU scheduling information, accounting information, I/O status information, list of open files, list of open devices, PID.',
          hint: 'What would go wrong if it forgot the next instruction address?',
        },
        {
          kind: 'quickCheck',
          questionIds: ['q5-2-1', 'q5-2-2', 'q5-2-3'],
        },
      ],
      takeaways: [
        'A process consists of executable code, a data segment, a PCB and I/O resources.',
        'The PCB stores everything needed to manage and control a process, including the program counter and CPU registers.',
        'The PID uniquely identifies a process for resource allocation and tracking.',
        'A parent process creates child processes via a system call; each child has its own memory space and PID.',
      ],
    },

    /* ================= l5-3 ================= */
    {
      id: 'l5-3',
      moduleId: 'm5',
      title: 'The seven-state process transition diagram',
      summary:
        'Every state a process can occupy, every legal move between them, and what triggers each move.',
      whyItMatters:
        'This diagram is one of the most heavily examined items in the whole competency. You must be able to draw it, name every state, and explain every transition.',
      objectives: [
        'Name and describe the seven process states',
        'Explain each transition and what triggers it',
        'Explain what suspension means and why the OS does it',
      ],
      prerequisites: ['l5-2'],
      minutes: 15,
      syllabusRefs: ['5.3'],
      keyTerms: ['seven-state', 'ready-state', 'running-state', 'blocked-state', 'swapping'],
      blocks: [
        {
          kind: 'prose',
          paragraphs: [
            'A process does not simply "run". It moves between a fixed set of states, and the operating system’s job is to shuttle it between them until it finishes.',
          ],
        },
        {
          kind: 'viz',
          viz: 'processStates',
          title: 'Drive a process through the diagram yourself',
          caption:
            'Start at New and take each transition. Read what happens and why before moving on.',
        },
        { kind: 'heading', text: 'The seven states' },
        {
          kind: 'steps',
          steps: [
            {
              title: '1. New',
              detail:
                'The process is being created. This includes allocating the necessary resources, such as memory, and setting up the [[pcb|process control block]].',
            },
            {
              title: '2. Ready',
              detail:
                'The process is **fully prepared to execute** but is waiting for the CPU to become available. It is in main memory.',
            },
            {
              title: '3. Running',
              detail:
                'Where the actual execution of a process occurs. Processes transition in and out of this state based on CPU scheduling, I/O operations and other events.',
            },
            {
              title: '4. Blocked',
              detail:
                'The process is paused and waiting for a resource, such as I/O completion or data availability, before it can continue execution. It is still in main memory.',
            },
            {
              title: '5. Terminated / Exit',
              detail:
                'The process has finished executing its task, or the operating system or a user has explicitly terminated it. This marks the end of a process’s execution.',
            },
            {
              title: '6. Suspended Blocked',
              detail:
                'The process is waiting for a resource **and** has been temporarily removed from main memory and stored in secondary storage. This happens to free memory for other processes. It will not run until it is brought back to main memory **and** the required resource becomes available.',
            },
            {
              title: '7. Suspended Ready',
              detail:
                'The process is ready to execute but has been temporarily moved to secondary storage to free up main memory.',
            },
          ],
        },
        {
          kind: 'keyIdea',
          title: 'The organising idea',
          text: 'Ready, Running and Blocked are **in main memory**. The two Suspended states are **on disk**. Suspension is not about what the process wants: it is about the OS needing RAM back.',
        },
        { kind: 'heading', text: 'The transitions' },
        {
          kind: 'table',
          headers: ['Transition', 'What triggers it'],
          rows: [
            [
              'New → Ready',
              'The process is loaded into main memory and made available for scheduling.',
            ],
            ['Ready → Running', 'The scheduler assigns CPU time to the process (dispatch).'],
            [
              'Running → Ready',
              'A higher-priority process arrives, or the time slice (quantum) expires: **timeout**.',
            ],
            [
              'Running → Blocked',
              'The process requests I/O, or must wait for an event or resource.',
            ],
            [
              'Running → Terminated',
              'The process completes its execution, or is ended by the OS due to an error.',
            ],
            [
              'Blocked → Ready',
              'The requested operation completes, or the required resource becomes available.',
            ],
            [
              'Ready → Suspended Ready',
              'A ready process is moved out of main memory to secondary storage to free memory, even though it is ready to run.',
            ],
            [
              'Suspended Ready → Ready',
              'Sufficient main memory becomes available, so the process is loaded back and scheduled.',
            ],
            [
              'Blocked → Suspended Blocked',
              'The blocked process is moved out of main memory to free space while it is still waiting for an event or I/O.',
            ],
            [
              'Suspended Blocked → Blocked',
              'A suspended blocked process is brought back into main memory while still waiting for the required event.',
            ],
            [
              'Suspended Blocked → Suspended Ready',
              'The waiting event or I/O operation completes **while the process remains in secondary storage**.',
            ],
          ],
        },
        {
          kind: 'misconception',
          wrong: 'A process in the Ready state is one that has not started yet.',
          right:
            '**New** is the state for a process that has not started. **Ready** means the process is completely prepared to run and is waiting for one thing only: a free CPU. It may have already run many times.',
        },
        {
          kind: 'confused',
          question:
            'Why does the OS suspend a process that is Ready? It could be running!',
          simpler:
            'Because RAM is finite. If ten processes are ready and there is only room for six, four must wait somewhere, and disk is the only somewhere there is. The OS is choosing between "some processes progress slowly" and "the system runs out of memory and crashes".',
          picture:
            'A restaurant with twelve tables and forty bookings. Some diners wait in the lobby. They are perfectly ready to eat; there is simply no table. The lobby is secondary storage.',
          prerequisite: { label: 'Inside a process: components and the PCB', lessonId: 'l5-2' },
        },
        {
          kind: 'callout',
          tone: 'info',
          title: 'Who does the suspending?',
          text: 'Swapping between main memory and secondary storage is the job of the **[[medium-term-scheduler|medium-term scheduler]]**: the one you will meet in lesson 5.6. That is the entire reason the medium-term scheduler exists.',
        },
        {
          kind: 'recall',
          prompt:
            'A process is Running. Name the three states it can move to, and what causes each move.',
          answer:
            'Ready (timeout: its quantum expired, or a higher-priority process arrived). Blocked (it requested I/O or must wait for an event or resource). Terminated (it completed, or the OS ended it because of an error).',
        },
        {
          kind: 'teachBack',
          prompt:
            'Explain the difference between Blocked and Suspended Blocked to someone who has just learned the five basic states.',
          checklist: [
            'You said Blocked means waiting for a resource such as I/O completion',
            'You said Blocked is still in main memory',
            'You said Suspended Blocked is also waiting for a resource',
            'You said Suspended Blocked has additionally been moved out to secondary storage',
            'You said the reason for suspension is to free main memory for other processes',
            'You said a Suspended Blocked process needs BOTH to come back to memory AND to get its resource before it can run',
          ],
        },
        {
          kind: 'quickCheck',
          questionIds: ['q5-3-1', 'q5-3-2', 'q5-3-3', 'q5-3-4', 'q5-3-5'],
        },
      ],
      takeaways: [
        'Seven states: New, Ready, Running, Blocked, Terminated, Suspended Ready, Suspended Blocked.',
        'Ready/Running/Blocked are in main memory; both Suspended states are in secondary storage.',
        'Running → Ready is a timeout; Running → Blocked is an I/O or resource wait.',
        'Suspension exists to free main memory, and is performed by the medium-term scheduler.',
      ],
    },

    /* ================= l5-4 ================= */
    {
      id: 'l5-4',
      moduleId: 'm5',
      title: 'Creating, terminating and getting stuck',
      summary:
        'What the OS does when a process is born, the ten reasons it might die, deadlock, and the zombie left behind.',
      whyItMatters:
        '"Lists the operating system tasks when a process is created" and "explains process termination" are both named learning outcomes, and deadlock’s four conditions are a classic four-mark answer.',
      objectives: [
        'List the OS tasks performed when a process is created',
        'State the reasons for process creation and termination',
        'Explain deadlock and its four necessary conditions',
        'Explain what a zombie process is and why it matters',
      ],
      prerequisites: ['l5-3'],
      minutes: 13,
      syllabusRefs: ['5.3'],
      keyTerms: ['process-termination', 'deadlock', 'zombie-process', 'system-call'],
      blocks: [
        { kind: 'heading', text: 'What happens when a process is created' },
        {
          kind: 'steps',
          title: 'The OS tasks, in order',
          steps: [
            {
              title: 'Process initiation',
              detail:
                'A new process is usually created by an existing process, the **parent process**, through a [[system-call|system call]], such as `fork()` in Unix/Linux. The newly created process is called the **child process**.',
            },
            {
              title: 'Process identification',
              detail:
                'The OS assigns a unique **Process ID (PID)** to the new process, used to identify and manage it within the system.',
            },
            {
              title: 'PCB creation',
              detail:
                'A new [[pcb|Process Control Block]] for the child process is created. Vital information (state, memory allocation, program counter and other details) is stored in it.',
            },
            {
              title: 'Memory allocation',
              detail:
                'The OS allocates memory space for the new process, holding the program code, data and a stack for the child process.',
            },
            {
              title: 'Process state initialisation',
              detail: 'The OS initialises the state of the child process.',
            },
            {
              title: 'Process execution',
              detail: 'The child process starts executing instructions from its program code.',
            },
          ],
        },
        {
          kind: 'table',
          title: 'Reasons for process creation',
          headers: ['Reason', 'Detail'],
          rows: [
            [
              '**New batch job**',
              'A task submitted to run automatically without user interaction, usually executed in groups at scheduled times: nightly system backups, large-scale data processing, system updates and maintenance.',
            ],
            [
              '**User starts a program**',
              'When a user opens an application, the OS creates a new process to execute that program: it loads the program into memory, assigns a PID, creates a PCB and schedules it for execution.',
            ],
            [
              '**OS creates a process to provide services**',
              'The OS creates a process to facilitate various system functions or user tasks.',
            ],
            [
              '**A running program starts another process**',
              'This typically involves creating a child process from a parent process.',
            ],
          ],
        },
        { kind: 'heading', text: 'Process termination' },
        {
          kind: 'definition',
          term: 'Process termination',
          simple: 'The end of a process, when it hands back everything it was using.',
          technical:
            'The end of a process’s lifecycle, where it releases resources and ceases execution. All the resources assigned to execute the process are taken back.',
        },
        {
          kind: 'list',
          title: 'The ten reasons a process terminates',
          style: 'number',
          items: [
            '**Normal termination**: the process completes its task successfully, releases resources and shuts down properly',
            '**A requested resource is unavailable**: the required memory, file, device or network resource is unavailable for a long time, and the OS stops the process to prevent system problems',
            '**An execution error**: an unexpected issue during execution prevents it completing its intended task',
            '**A memory access violation**: the process tried to touch memory it does not own, or perform an unauthorised action; memory protection (via paging or segmentation) keeps each process in its own sandbox, and the OS terminates a process that breaks out',
            '**An OS or parent process request**: a parent can explicitly terminate its child using system calls, due to task completion, errors, or the need to stop misbehaving children',
            '**Execution time limit exceeded**: the process ran longer than the maximum CPU time allowed, so the OS terminates it to stop it monopolising system resources',
            '**The parent process has been terminated**: on many systems, when a parent terminates its child processes are terminated too (cascading termination). Unix and Linux instead hand orphaned children to a system process so they can carry on',
            '**User intervention**: the user manually stops a running program; the OS stops execution and releases the allocated resources',
            '**Hardware failures**: a disk crash, RAM error or power failure means the process cannot continue safely or access required hardware',
            '**Exceptions**: such as divide-by-zero, invalid memory access or an illegal instruction; the OS detects the fault and stops the process to prevent system instability',
          ],
        },
        { kind: 'heading', text: 'Deadlock' },
        {
          kind: 'definition',
          term: 'Deadlock',
          simple: 'Two processes each waiting for something the other is holding: forever.',
          technical:
            'A state that occurs when two or more processes are waiting for each other indefinitely, and none of them can proceed.',
        },
        {
          kind: 'list',
          title: 'The four conditions: all must happen at the same time',
          style: 'number',
          items: [
            '**Mutual exclusion**: processes require exclusive access to resources',
            '**Hold and wait**: a process holds one resource while waiting for another',
            '**No preemption**: resources cannot be forcibly taken away',
            '**Circular wait**: a circular waiting condition exists, each process waiting for another in a cycle',
          ],
        },
        {
          kind: 'analogy',
          title: 'A narrow bridge',
          everyday:
            'Two cars meet head-on halfway across a one-lane bridge. Neither can pass (mutual exclusion). Each occupies half the bridge and needs the other half (hold and wait). Neither driver will reverse, and nobody can force them (no preemption). Car A waits for Car B, and Car B waits for Car A (circular wait). Nothing moves, ever, without outside intervention.',
          mapsTo:
            'Remove any one condition and there is no deadlock. If reversing were allowed (preemption), or if a car waited at the entrance until the bridge was empty (no hold and wait), traffic would flow.',
        },
        {
          kind: 'list',
          title: 'Effects of deadlock',
          style: 'cross',
          items: [
            'Processes involved become permanently blocked',
            'System performance decreases',
            'Resources remain locked and unused',
            'The system may freeze or become unresponsive',
            'Manual intervention or process termination may be required to recover',
          ],
        },
        { kind: 'heading', text: 'Zombie processes' },
        {
          kind: 'definition',
          term: 'Zombie process (defunct process)',
          simple: 'A process that has finished but whose paperwork has not been filed away.',
          technical:
            'A process that has completed its execution but still has an entry in the process table.',
        },
        {
          kind: 'prose',
          paragraphs: [
            '**Why it happens:** when a child process terminates, it sends its exit status to the parent process. If the parent does not collect this exit status, the terminated child remains in the system as a zombie.',
            '**The effect:** a zombie process has already completed execution and **does not use CPU or main memory**, but it occupies an entry in the process table. If many zombie processes accumulate, the process table can become full, preventing new processes from being created.',
          ],
        },
        {
          kind: 'misconception',
          wrong: 'Zombie processes slow the computer down by using CPU and memory.',
          right:
            'A zombie uses **neither CPU nor main memory**. Its only cost is an entry in the process table. The danger is table exhaustion, not resource consumption.',
        },
        {
          kind: 'recall',
          prompt: 'Name the four conditions that must all hold simultaneously for deadlock to occur.',
          answer:
            'Mutual exclusion, hold and wait, no preemption, and circular wait. All four must be present at the same time.',
          hint: 'Think about the two cars on the bridge.',
        },
        {
          kind: 'quickCheck',
          questionIds: ['q5-4-1', 'q5-4-2', 'q5-4-3', 'q5-4-4'],
        },
      ],
      takeaways: [
        'Process creation: initiation via system call → assign PID → create PCB → allocate memory → initialise state → execute.',
        'Termination causes include normal completion, unavailable resources, errors, memory violations, parent/OS requests, time limits, parent termination, user action, hardware failure and exceptions.',
        'Deadlock needs all four of: mutual exclusion, hold and wait, no preemption, circular wait.',
        'A zombie has finished but keeps a process-table entry; it uses no CPU or memory but can exhaust the table.',
      ],
    },

    /* ================= l5-5 ================= */
    {
      id: 'l5-5',
      moduleId: 'm5',
      title: 'Interrupts and context switching',
      summary:
        'The signal that stops the CPU mid-instruction, and the mechanism that lets it come back later as if nothing happened.',
      whyItMatters:
        '"Defines context switch" is a named learning outcome, and the interrupt causes list is directly examinable. These two ideas also explain *how* every state transition you learned actually happens.',
      objectives: [
        'Define an interrupt and list the reasons interrupts occur',
        'Distinguish hardware from software interrupts',
        'Define context switching and explain how it works',
        'State the advantages and disadvantages of context switching',
      ],
      prerequisites: ['l5-3'],
      minutes: 13,
      syllabusRefs: ['5.3'],
      keyTerms: ['interrupt', 'context-switch', 'system-call', 'pcb'],
      blocks: [
        {
          kind: 'definition',
          term: 'Interrupt',
          simple: 'A signal saying "stop what you are doing: something needs attention right now".',
          technical:
            'According to the syllabus: an event that alters the sequence of execution of a process. More generally, a signal sent to the processor by hardware or software to indicate that an event needs immediate attention. It temporarily stops the current process so the operating system can handle an important task.',
        },
        {
          kind: 'viz',
          viz: 'interrupts',
          title: 'Ten reasons an interrupt happens',
          caption: 'Click each cause. Orange ones are hardware interrupts; the rest are software.',
        },
        {
          kind: 'compare',
          title: 'Two types of interrupt',
          headers: ['Type', 'Triggered by', 'Examples'],
          rows: [
            [
              '**Hardware interrupts**',
              'External hardware devices',
              'Keyboard input, mouse click, disk I/O completion, hardware failure',
            ],
            [
              '**Software interrupts**',
              'Programs',
              'System calls, errors, exceptions',
            ],
          ],
        },
        {
          kind: 'list',
          title: 'Key points about interrupts',
          items: [
            '**Priority levels**: interrupts have different priority levels; higher-priority interrupts can interrupt lower-priority ones.',
            '**Asynchronous**: hardware interrupts occur independently of what the processor is doing, so their timing is unpredictable. (Software interrupts, such as a divide-by-zero, happen at a predictable point in the program.)',
            '**Maskable** interrupts can be temporarily ignored by the OS. **Non-maskable** interrupts cannot be ignored and must be handled immediately: for example, hardware failures.',
            '**Latency**: the time taken to respond to an interrupt. Lower latency means faster response.',
          ],
        },
        {
          kind: 'steps',
          title: 'Interrupt handling: how it works',
          steps: [
            { title: 'An interrupt signal is sent to the CPU', detail: 'From hardware or software.' },
            {
              title: 'The CPU pauses the current process and saves its state',
              detail: 'Into that process’s PCB.',
            },
            {
              title: 'The OS runs an interrupt handler',
              detail: 'A routine that manages the specific event that occurred.',
            },
            {
              title: 'The original process resumes where it left off',
              detail: 'Or the OS may select a different process for execution instead.',
            },
          ],
        },
        {
          kind: 'callout',
          tone: 'info',
          title: 'Why interrupts and I/O go together',
          text: 'I/O devices are far slower than the CPU. Rather than waiting, the CPU switches to another task during an I/O operation. When the I/O finishes, the device sends an interrupt, and the CPU can then resume the original process. This keeps the system efficient, and it is exactly why the Blocked state exists.',
        },
        { kind: 'heading', text: 'Context switching' },
        {
          kind: 'definition',
          term: 'Context switching',
          simple:
            'Saving one process’s state and loading another’s, so the CPU can swap between jobs.',
          technical:
            'The mechanism by which the operating system saves the execution state of the currently running process and restores the previously saved state of another process, allowing multiple processes to share the CPU by efficiently switching execution from one process to another.',
        },
        {
          kind: 'viz',
          viz: 'contextSwitch',
          title: 'Step through a context switch',
          caption:
            'Follow all five phases. Notice that in phases 2–4 the CPU is doing no useful work at all.',
        },
        {
          kind: 'worked',
          title: 'How context switching works, step by step',
          problem:
            'Two processes P0 and P1 exist. P0 is running. Explain what happens when P1 needs to run.',
          steps: [
            {
              title: 'Step 1: P0 is in progress',
              detail: 'P0 holds the CPU; its registers and program counter are live in the CPU.',
            },
            {
              title: 'Step 2: an interrupt is created',
              detail:
                'The central processing unit is informed. P0 must stop where it stands.',
            },
            {
              title: 'Step 3: save P0’s state',
              detail:
                'The memory management information and process status related to P0 are stored in the PCB belonging to that process.',
            },
            {
              title: 'Step 4: restore and run P1',
              detail:
                'P1’s saved state is loaded from its PCB into the CPU, and P1 starts running.',
            },
            {
              title: 'Step 5: reverse it later',
              detail:
                'When an interrupt related to P1 occurs, P1’s information is stored in its own PCB the same way, and P0 is executed again from exactly where it stopped.',
            },
          ],
          answer:
            'The OS saves P0’s state into P0’s PCB, restores P1’s state from P1’s PCB, and P1 resumes exactly where it previously stopped. Neither process is aware it was paused.',
        },
        {
          kind: 'compare',
          title: 'The trade-off',
          headers: ['Advantages', 'Disadvantages'],
          rows: [
            [
              'Enables multitasking by allowing several processes to share the CPU',
              'Introduces overhead due to the saving and restoring of process states',
            ],
            ['Improves CPU utilisation by reducing idle time', 'Frequent switching can decrease overall system performance'],
            [
              'Increases system responsiveness in time-sharing systems',
              'Consumes additional memory for storing process information (PCBs)',
            ],
            [
              'Allows priority-based execution of important processes',
              'Increases the complexity of operating system design',
            ],
            [
              'Supports efficient resource sharing among multiple programs',
              'Excessive switching may lead to reduced CPU efficiency',
            ],
          ],
        },
        {
          kind: 'keyIdea',
          title: 'Why this matters later',
          text: 'Context switching is not free. That single fact explains why a Round Robin time quantum must not be too small: you would spend more time switching than computing. Keep it in mind for lesson 5.8.',
        },
        {
          kind: 'recall',
          prompt: 'Define context switching in one sentence, then state its main cost.',
          answer:
            'Context switching is the mechanism by which the OS saves the execution state of the running process and restores the saved state of another, so multiple processes can share the CPU. Its main cost is overhead: time spent saving and restoring state during which no useful work happens.',
        },
        {
          kind: 'quickCheck',
          questionIds: ['q5-5-1', 'q5-5-2', 'q5-5-3', 'q5-5-4'],
        },
      ],
      takeaways: [
        'An interrupt is an event that alters the sequence of execution of a process.',
        'Hardware interrupts come from devices; software interrupts come from programs (system calls, errors, exceptions).',
        'Hardware interrupts are asynchronous; interrupts have priority levels and may be maskable or non-maskable.',
        'Context switching saves the running process’s state into its PCB and restores another’s, enabling multitasking at the cost of overhead.',
      ],
    },

    /* ================= l5-6 ================= */
    {
      id: 'l5-6',
      moduleId: 'm5',
      title: 'The three schedulers',
      summary:
        'Long-term, short-term and medium-term: three different decisions, three different speeds.',
      whyItMatters:
        '"Compares long, short and medium term schedulers" is a named learning outcome, and the comparison table is a guaranteed-mark question if you know which scheduler does what.',
      objectives: [
        'Describe the long-term, short-term and medium-term schedulers',
        'Compare the three schedulers by function, speed and control over multiprogramming',
        'Connect each scheduler to the state transitions it causes',
      ],
      prerequisites: ['l5-3'],
      minutes: 9,
      syllabusRefs: ['5.3'],
      keyTerms: [
        'long-term-scheduler',
        'short-term-scheduler',
        'medium-term-scheduler',
        'swapping',
      ],
      blocks: [
        {
          kind: 'prose',
          paragraphs: [
            'In a multiprogramming environment the operating system decides which process gets the CPU, when, and for how long. This decision-making function is called **process scheduling**, and it is split across three schedulers, each answering a different question.',
          ],
        },
        {
          kind: 'steps',
          steps: [
            {
              title: 'Long-term scheduler (job scheduler)',
              detail:
                'Answers **"which jobs should be let into memory at all?"** It brings processes in the New state to the Ready state, and is responsible for moving processes through the job queue into main memory.',
            },
            {
              title: 'Short-term scheduler (CPU scheduler / low-level scheduling)',
              detail:
                'Answers **"which ready process gets the CPU next?"** It decides which process in the Ready state should receive the CPU allocation when it becomes available.',
            },
            {
              title: 'Medium-term scheduler (process swapping scheduler)',
              detail:
                'Answers **"who should be swapped out to disk to free memory?"** It swaps processes between main memory and secondary storage.',
            },
          ],
        },
        {
          kind: 'compare',
          title: 'The comparison table',
          headers: ['', 'Long-term', 'Short-term', 'Medium-term'],
          rows: [
            ['Also called', 'Job scheduler', 'CPU scheduler', 'Processes swapping scheduler'],
            [
              'What it does',
              'Selects processes from a pool and loads them into memory for execution',
              'Selects processes that are ready to execute, for dispatching',
              'Swaps processes out of and back into memory so execution can continue',
            ],
            [
              'Control over multiprogramming',
              'Controls the degree of multiprogramming',
              'Provides **less** control over the degree of multiprogramming',
              'Controls the degree of multiprogramming',
            ],
            [
              'Speed',
              'Slower than the short-term scheduler',
              '**Fastest** of the three',
              'In between the short-term and long-term schedulers',
            ],
            [
              'State transitions caused',
              'New → Ready',
              'Ready → Running',
              'Ready ↔ Suspended Ready, Blocked ↔ Suspended Blocked',
            ],
          ],
        },
        {
          kind: 'analogy',
          title: 'A hospital',
          everyday:
            'The **long-term scheduler** is the admissions desk: it decides how many patients are allowed into the hospital at all. Admit too many and the wards overflow. The **short-term scheduler** is the doctor deciding which waiting patient to see next: a decision made constantly, in seconds. The **medium-term scheduler** is the ward manager who moves a stable patient to an overflow annex when beds run short, and brings them back when a bed frees up.',
          mapsTo:
            'This is why the long-term scheduler controls the degree of multiprogramming (it literally decides how many processes are in memory), while the short-term scheduler only picks among those already admitted.',
        },
        {
          kind: 'misconception',
          wrong: 'The short-term scheduler controls how many processes run at once.',
          right:
            'The short-term scheduler chooses **which of the already-admitted processes** runs next. The **long-term** scheduler controls the degree of multiprogramming, because it decides how many processes are admitted to memory in the first place.',
        },
        {
          kind: 'recall',
          prompt:
            'Which scheduler is fastest, and why does that make sense?',
          answer:
            'The short-term scheduler. It must run every time the CPU becomes free, potentially thousands of times a second, so it has to make its decision extremely quickly. The long-term scheduler runs far less often, so it can afford to take longer.',
        },
        {
          kind: 'quickCheck',
          questionIds: ['q5-6-1', 'q5-6-2', 'q5-6-3'],
        },
      ],
      takeaways: [
        'Long-term (job) scheduler: New → Ready; controls the degree of multiprogramming; slowest.',
        'Short-term (CPU) scheduler: Ready → Running; fastest; less control over multiprogramming.',
        'Medium-term scheduler: swaps processes between memory and disk; speed in between.',
        'Only processes admitted by the long-term scheduler are ever available to the short-term scheduler.',
      ],
    },

    /* ================= l5-7 ================= */
    {
      id: 'l5-7',
      moduleId: 'm5',
      title: 'Scheduling policies and criteria',
      summary:
        'Preemptive versus non-preemptive, and the five measurements used to judge whether a scheduler is any good.',
      whyItMatters:
        'You cannot answer a scheduling calculation question without knowing what turnaround and waiting time actually mean. This lesson is the vocabulary for the next one.',
      objectives: [
        'Distinguish preemptive from non-preemptive scheduling',
        'Define CPU utilisation, throughput, turnaround time, waiting time and response time',
        'State the formulas for turnaround and waiting time',
      ],
      prerequisites: ['l5-6'],
      minutes: 10,
      syllabusRefs: ['5.3'],
      keyTerms: [
        'preemptive',
        'non-preemptive',
        'turnaround-time',
        'waiting-time',
        'response-time',
        'throughput',
        'burst-time',
        'arrival-time',
      ],
      blocks: [
        {
          kind: 'definition',
          term: 'Scheduling policy',
          simple: 'The rules a system uses to decide which process gets the CPU.',
          technical:
            'The set of rules and criteria used by a system’s scheduler to decide which process or task should be assigned to the CPU at any given time.',
        },
        {
          kind: 'compare',
          headers: ['', '[[non-preemptive|Non-preemptive]]', '[[preemptive|Preemptive]]'],
          rows: [
            [
              'Rule',
              'Once a process is allocated the CPU, it keeps it until it voluntarily releases it. The OS **cannot** forcefully interrupt it.',
              'The OS **has the authority** to interrupt a currently running process, pause its execution, and allocate the CPU to a different process.',
            ],
            [
              'Example algorithms',
              'First-Come First-Served (FCFS), Shortest Job First (SJF), non-preemptive Priority Scheduling',
              'Round Robin (RR), Shortest Remaining Time First (SRTF), preemptive Priority Scheduling',
            ],
          ],
        },
        { kind: 'heading', text: 'Scheduling criteria: how we judge a scheduler' },
        {
          kind: 'table',
          headers: ['Criterion', 'Definition', 'Goal'],
          rows: [
            [
              '**CPU utilisation**',
              'The percentage of time the CPU is actively working.',
              'Keep the CPU as busy as possible, ideally 100%, to avoid wasting processing power.',
            ],
            [
              '**[[throughput|Throughput]]**',
              'The number of processes the CPU completes within a specific unit of time.',
              'As high as possible.',
            ],
            [
              '**[[turnaround-time|Turnaround time]]**',
              'The total time taken from the moment a process arrives in the system until it is completely finished.',
              'As low as possible.',
            ],
            [
              '**[[waiting-time|Waiting time]]**',
              'The total amount of time a process spends waiting in the ready queue before it gets to use the CPU.',
              'As low as possible.',
            ],
            [
              '**[[response-time|Response time]]**',
              'The duration from when a process is first submitted until the very first response or output is produced.',
              'As low as possible: critical for interactive systems.',
            ],
          ],
        },
        { kind: 'heading', text: 'The vocabulary of a scheduling question' },
        {
          kind: 'table',
          headers: ['Term', 'Meaning'],
          rows: [
            [
              '**[[arrival-time|Arrival time]]**',
              'The moment a process enters the ready queue and is ready to be scheduled for CPU execution.',
            ],
            [
              '**[[burst-time|Burst duration]]**',
              'The duration a process needs to run on the CPU.',
            ],
            [
              '**Completion time**',
              'The point in time at which a process finishes its execution and releases the CPU.',
            ],
            [
              '**Time**',
              'A specific moment or timestamp: arrival time, start time, completion time.',
            ],
            [
              '**Duration**',
              'The total length of time a process uses the CPU or stays in a state: burst time, waiting time, turnaround time.',
            ],
            [
              '**[[gantt-chart|Gantt chart]]**',
              'A chart illustrating the order and duration of process execution over time.',
            ],
          ],
        },
        {
          kind: 'callout',
          tone: 'success',
          title: 'The two formulas: memorise these exactly',
          text: '**Turnaround duration = Completion time − Arrival time**  ·  **Waiting duration = Turnaround duration − Burst duration**. Every calculation question in this competency reduces to these two lines plus a correctly drawn Gantt chart.',
        },
        {
          kind: 'worked',
          title: 'Applying the formulas',
          problem:
            'A process P3 arrives at time 2, has a burst duration of 8 ms, and completes at time 16. Find its turnaround and waiting durations.',
          steps: [
            {
              title: 'Turnaround = completion − arrival',
              detail: '16 − 2 = 14 ms',
            },
            {
              title: 'Waiting = turnaround − burst',
              detail: '14 − 8 = 6 ms',
            },
            {
              title: 'Sanity check',
              detail:
                'The process existed for 14 ms and used the CPU for 8 of them, so it waited 6. Waiting time can never be negative: if yours is, the Gantt chart is wrong.',
            },
          ],
          answer: 'Turnaround duration = 14 ms; waiting duration = 6 ms.',
        },
        {
          kind: 'misconception',
          wrong: 'Waiting time is how long a process waits before it first starts running.',
          right:
            'That is **response time**. Waiting time is the **total** time spent in the ready queue, including every time a preempted process goes back and waits again.',
          why: 'In Round Robin a process may wait, run, wait, run, wait, run. Response time counts only the first gap; waiting time counts all of them added together.',
        },
        {
          kind: 'recall',
          prompt:
            'Write both formulas from memory, then say in one line what the difference is between waiting time and response time.',
          answer:
            'Turnaround = Completion − Arrival. Waiting = Turnaround − Burst. Response time is the wait before the *first* output only; waiting time is the *total* time spent in the ready queue across the whole life of the process.',
        },
        {
          kind: 'quickCheck',
          questionIds: ['q5-7-1', 'q5-7-2', 'q5-7-3'],
        },
      ],
      takeaways: [
        'Non-preemptive: a process keeps the CPU until it voluntarily releases it. Preemptive: the OS can take it away.',
        'Criteria: CPU utilisation, throughput, turnaround time, waiting time, response time.',
        'Turnaround = Completion − Arrival. Waiting = Turnaround − Burst.',
        'Response time counts only the wait before the first output; waiting time counts the total.',
      ],
    },

    /* ================= l5-8 ================= */
    {
      id: 'l5-8',
      moduleId: 'm5',
      title: 'Scheduling algorithms and Gantt charts',
      summary:
        'FCFS, SJF, SRTF, Priority and Round Robin: drawn, calculated and compared on the same set of processes.',
      whyItMatters:
        'This is the biggest calculation topic in the competency. Full marks are available and entirely mechanical, provided you can draw a correct Gantt chart.',
      objectives: [
        'Describe each scheduling algorithm and whether it is preemptive',
        'Draw a Gantt chart and use it to calculate turnaround and waiting durations',
        'Explain starvation and aging',
        'Explain the effect of the Round Robin time quantum',
      ],
      prerequisites: ['l5-7'],
      minutes: 22,
      syllabusRefs: ['5.3'],
      keyTerms: [
        'scheduling-algorithm',
        'fcfs',
        'sjf',
        'srtf',
        'priority-scheduling',
        'round-robin',
        'time-quantum',
        'starvation',
        'aging',
        'convoy-effect',
        'gantt-chart',
      ],
      blocks: [
        {
          kind: 'definition',
          term: 'Scheduling algorithm',
          simple: 'The rule for choosing which process runs next.',
          technical:
            'A program used by operating systems to determine the order in which processes should be executed by the CPU. Its purpose is to evaluate all waiting processes in the ready queue and calculate which is most optimal to run next. The **short-term scheduler** applies these algorithms to make immediate, split-second decisions on CPU allocation.',
        },
        {
          kind: 'callout',
          tone: 'info',
          title: 'The process set used throughout',
          text: 'Every worked example below uses the same four processes, so you can compare the algorithms directly: **P1** (arrival 0, burst 5, priority 3) · **P2** (arrival 1, burst 3, priority 1) · **P3** (arrival 2, burst 8, priority 4) · **P4** (arrival 4, burst 4, priority 2). Lower priority number = higher priority.',
        },
        {
          kind: 'viz',
          viz: 'scheduler',
          title: 'The scheduling laboratory',
          caption:
            'Switch algorithms and watch the Gantt chart redraw. Press "Show the working" to see every subtraction. You can also edit arrival times, bursts and priorities.',
        },
        { kind: 'heading', text: '1. First Come First Served (FCFS)' },
        {
          kind: 'prose',
          paragraphs: [
            'The simplest scheduling algorithm. Processes are executed in the order they arrive in the ready queue, following the **FIFO** principle. Once a process starts, it runs until completion: **non-preemptive**. After finishing, the CPU is given to the next process in the queue.',
          ],
        },
        {
          kind: 'worked',
          title: 'FCFS on the four processes',
          problem: 'Draw the Gantt chart and calculate the average turnaround and waiting durations.',
          steps: [
            {
              title: 'Build the Gantt chart in arrival order',
              detail:
                'P1 arrives at 0 and runs 0–5. P2 arrives at 1 but waits; runs 5–8. P3 arrives at 2 but waits; runs 8–16. P4 arrives at 4 but waits; runs 16–20.',
            },
            {
              title: 'Turnaround = completion − arrival',
              detail:
                'P1: 5−0 = 5 · P2: 8−1 = 7 · P3: 16−2 = 14 · P4: 20−4 = 16',
            },
            {
              title: 'Waiting = turnaround − burst',
              detail: 'P1: 5−5 = 0 · P2: 7−3 = 4 · P3: 14−8 = 6 · P4: 16−4 = 12',
            },
            {
              title: 'Average them',
              detail:
                'ATD = (5+7+14+16)/4 = 10.5 ms   ·   AWD = (0+4+6+12)/4 = 5.5 ms',
            },
          ],
          answer: 'Average turnaround = 10.5 ms; average waiting = 5.5 ms.',
        },
        {
          kind: 'compare',
          headers: ['FCFS advantages', 'FCFS disadvantages'],
          rows: [
            ['Fair: processes executed in arrival order', '**Convoy effect**: a long job delays short jobs behind it'],
            ['No starvation', 'High average waiting time'],
            ['Low scheduling overhead', 'Poor turnaround time'],
            ['Easy to manage and understand', 'Non-preemptive, not suitable for time-sharing systems'],
            ['', 'Not efficient for short or interactive processes'],
          ],
        },
        { kind: 'heading', text: '2. Shortest Job First (SJF)' },
        {
          kind: 'prose',
          paragraphs: [
            'Selects the process with the **shortest burst time** to execute next. In its non-preemptive form, once a process starts it cannot be interrupted: the CPU completes the shortest job fully before switching.',
          ],
        },
        {
          kind: 'worked',
          title: 'Non-preemptive SJF (all arriving at 0)',
          problem:
            'Assuming all four processes arrive at time 0, draw the Gantt chart and find the averages.',
          steps: [
            {
              title: 'Order by burst duration, shortest first',
              detail:
                'P2 (3 ms) runs 0–3. P4 (4 ms) runs 3–7. P1 (5 ms) runs 7–12. P3 (8 ms) runs 12–20.',
            },
            {
              title: 'Turnaround = completion − arrival (all arrivals are 0)',
              detail: 'P1: 12 · P2: 3 · P3: 20 · P4: 7',
            },
            {
              title: 'Waiting = turnaround − burst',
              detail: 'P1: 12−5 = 7 · P2: 3−3 = 0 · P3: 20−8 = 12 · P4: 7−4 = 3',
            },
            {
              title: 'Averages',
              detail: 'ATD = (3+7+12+20)/4 = 10.5 ms   ·   AWD = (0+3+7+12)/4 = 5.5 ms',
            },
          ],
          answer: 'Average turnaround = 10.5 ms; average waiting = 5.5 ms.',
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'A subtlety worth knowing',
          text: 'In **non-preemptive** SJF, even if a shorter process arrives while a longer one is already on the CPU, the longer process runs to completion. With the **real** arrival times, only P1 exists at time 0, so it must start and runs 0–5. Then P2 (5–8), P4 (8–12) and P3 (12–20). That gives an average turnaround of 9.5 ms and average waiting of 4.5 ms. Arrival times change the answer, so always check which times a question gives you.',
        },
        { kind: 'heading', text: '3. Shortest Remaining Time First (SRTF)' },
        {
          kind: 'prose',
          paragraphs: [
            'The **preemptive** version of SJF. If a new process arrives with a shorter remaining time than the currently running process, the current process is preempted and the new one is scheduled. The CPU always runs the process with the least remaining time.',
          ],
        },
        {
          kind: 'worked',
          title: 'SRTF with the real arrival times',
          problem: 'Draw the Gantt chart and find the averages.',
          steps: [
            {
              title: 'Time 0: P1 arrives and starts',
              detail: 'Remaining burst for P1 is 5 ms.',
            },
            {
              title: 'Time 1: P2 arrives with burst 3',
              detail:
                'P1 has 4 ms remaining. P2 needs only 3, so P1 is preempted and P2 starts.',
            },
            {
              title: 'Time 2: P3 arrives with burst 8',
              detail:
                'P2 continues: its remaining 2 ms is shorter than P1’s 4 ms and P3’s 8 ms.',
            },
            {
              title: 'Time 4: P2 finishes, P4 arrives with burst 4',
              detail:
                'Remaining: P1 = 4, P3 = 8, P4 = 4. P1 is chosen (equal to P4 but arrived first). P1 runs 4–8.',
            },
            {
              title: 'Time 8: P1 finishes',
              detail: 'P4 (4 ms) is shorter than P3 (8 ms), so P4 runs 8–12.',
            },
            {
              title: 'Time 12: only P3 remains',
              detail: 'P3 runs 12–20.',
            },
            {
              title: 'Calculate',
              detail:
                'Completion times are P1 = 8, P2 = 4, P3 = 20, P4 = 12. Turnaround: 8, 3, 18, 8. Waiting: 3, 0, 10, 4.',
            },
            {
              title: 'Averages',
              detail: 'ATD = (8+3+18+8)/4 = 9.25 ms   ·   AWD = (3+0+10+4)/4 = 4.25 ms',
            },
          ],
          answer: 'Average turnaround = 9.25 ms; average waiting = 4.25 ms, the best so far.',
        },
        {
          kind: 'compare',
          headers: ['SRTF advantages', 'SRTF disadvantages'],
          rows: [
            ['Very fast response for short jobs', 'Too many context switches'],
            ['Good for interactive systems', 'High overhead'],
            ['Better handling of mixed workloads', 'Complex to implement'],
            ['Reduces the waiting of newly arrived short processes', 'Needs accurate remaining-time tracking'],
            ['More dynamic control', 'Long processes get interrupted many times'],
          ],
        },
        { kind: 'heading', text: '4. Priority scheduling' },
        {
          kind: 'prose',
          paragraphs: [
            'The process with the **highest priority** runs first. In the **non-preemptive** form, once it starts it continues until it finishes. In the **preemptive** form, a running process can be interrupted if a higher-priority process arrives.',
          ],
        },
        {
          kind: 'worked',
          title: 'Non-preemptive priority',
          problem: 'Using priorities P1=3, P2=1, P3=4, P4=2 (lower number = higher priority).',
          steps: [
            {
              title: 'Time 0: only P1 is available',
              detail: 'P1 starts and, being non-preemptive, runs to completion: 0–5.',
            },
            {
              title: 'Time 5: choose among the waiting processes',
              detail: 'P2 (priority 1) is highest, so P2 runs 5–8.',
            },
            {
              title: 'Then P4, then P3',
              detail:
                'P4 (priority 2) runs 8–12. P3 (priority 4, lowest) runs last, 12–20.',
            },
            {
              title: 'Calculate',
              detail:
                'Turnaround: P1 5, P2 7, P3 18, P4 8. Waiting: P1 0, P2 4, P3 10, P4 4.',
            },
            {
              title: 'Averages',
              detail: 'AWD = (0+4+10+4)/4 = 4.5 ms   ·   ATD = (5+7+18+8)/4 = 9.5 ms',
            },
          ],
          answer: 'Average waiting = 4.5 ms; average turnaround = 9.5 ms.',
        },
        {
          kind: 'worked',
          title: 'Preemptive priority',
          problem: 'Same priorities, but the OS may now interrupt.',
          steps: [
            {
              title: 'Time 0: P1 starts',
              detail: 'It is the only process available.',
            },
            {
              title: 'Time 1: P2 arrives with priority 1',
              detail: 'Higher priority than P1 (3), so P2 preempts P1 and runs until it finishes at 4.',
            },
            {
              title: 'Time 4: P4 arrives with priority 2',
              detail: 'Higher than P1 (3), so P4 runs 4–8.',
            },
            {
              title: 'Time 8: P1 resumes',
              detail: 'It has 4 ms left, running 8–12.',
            },
            {
              title: 'Time 12: P3 finally runs',
              detail: 'Lowest priority, so last: 12–20.',
            },
            {
              title: 'Averages',
              detail: 'AWD = (7+0+10+0)/4 = 4.25 ms   ·   ATD = (12+3+18+4)/4 = 9.25 ms',
            },
          ],
          answer: 'Average waiting = 4.25 ms; average turnaround = 9.25 ms.',
        },
        { kind: 'heading', text: 'Starvation and aging', level: 'sub' },
        {
          kind: 'definition',
          term: 'Starvation',
          simple: 'A process that never gets its turn because others keep jumping ahead.',
          technical:
            'A situation where a process waits indefinitely in the ready queue because higher-priority processes continuously get the CPU.',
        },
        {
          kind: 'definition',
          term: 'Aging',
          simple: 'Slowly raising the priority of a process that has been waiting a long time.',
          technical:
            'A technique where the priority of long-waited processes in the system is gradually increased: for example, by 1 for every 15 minutes of waiting. It is the standard solution to starvation.',
        },
        {
          kind: 'callout',
          tone: 'danger',
          title: 'A named disadvantage',
          text: 'Priority scheduling has **no built-in aging mechanism**, so starvation can occur if aging is not applied deliberately. Round Robin, by contrast, prevents starvation structurally: everyone gets a turn.',
        },
        { kind: 'heading', text: '5. Round Robin (RR)' },
        {
          kind: 'prose',
          paragraphs: [
            'A **preemptive** algorithm in which each process is given a fixed **[[time-quantum|time quantum]]**. The CPU cycles through the ready queue, giving each process an equal share of CPU time in circular order. It was designed mainly for **time-sharing systems**.',
          ],
        },
        {
          kind: 'steps',
          title: 'How Round Robin works',
          steps: [
            { title: 'All processes are added to the ready queue', detail: '' },
            {
              title: 'The CPU compares each process’s burst time with the time quantum',
              detail: '',
            },
            {
              title: 'If burst time ≤ quantum, the process completes',
              detail: 'It terminates and leaves the queue.',
            },
            {
              title: 'If burst time > quantum, it runs only for the quantum',
              detail:
                'When the quantum expires, the system checks whether it is finished. If not, it returns to the **end** of the ready queue.',
            },
            { title: 'This continues until all processes are executed', detail: '' },
          ],
        },
        {
          kind: 'worked',
          title: 'Round Robin with quantum = 4 ms (all arriving at 0)',
          problem: 'Draw the Gantt chart and calculate the averages.',
          steps: [
            {
              title: 'First round',
              detail:
                'P1 runs 0–4 (1 ms remaining, preempted). P2 runs 4–7 (finishes: burst 3 ≤ 4). P3 runs 7–11 (4 ms remaining, preempted). P4 runs 11–15 (finishes).',
            },
            {
              title: 'Second round',
              detail:
                'P1 resumes and completes its remaining 1 ms: 15–16. P3 resumes and completes its remaining 4 ms: 16–20.',
            },
            {
              title: 'Completion times',
              detail: 'P1: 16 · P2: 7 · P3: 20 · P4: 15',
            },
            {
              title: 'Turnaround and waiting',
              detail:
                'Turnaround: 16, 7, 20, 15. Waiting = turnaround − burst: 11, 4, 12, 11.',
            },
            {
              title: 'Averages',
              detail: 'ATD = (16+7+20+15)/4 = 14.5 ms   ·   AWD = (11+4+12+11)/4 = 9.5 ms',
            },
          ],
          answer:
            'Average turnaround = 14.5 ms; average waiting = 9.5 ms. These are the worst averages here, but nobody starved and everyone responded quickly.',
        },
        {
          kind: 'compare',
          title: 'Choosing the time quantum',
          headers: ['', 'Too short', 'Too long'],
          rows: [
            [
              'What happens',
              'Processes are interrupted very frequently before doing meaningful work.',
              'Most processes finish in one CPU burst without being preempted.',
            ],
            [
              'Positive',
              'Each process gets the CPU quickly: better for interactive systems.',
              'CPU efficiency increases because switching happens less often.',
            ],
            [
              'Negative',
              'Too many switches waste CPU time and reduce overall performance.',
              'The system behaves like FCFS, so short/interactive processes must wait too long.',
            ],
          ],
        },
        {
          kind: 'compare',
          headers: ['Round Robin advantages', 'Round Robin disadvantages'],
          rows: [
            ['Fair allocation of CPU: each process gets an equal time slice', 'Performance depends heavily on quantum size'],
            ['**Prevents starvation**: every process gets a chance', 'High context-switching overhead'],
            ['Good response time for interactive and time-sharing systems', 'Average waiting time can be high'],
            ['Preemptive: the system stays responsive', 'Turnaround time may not be optimal'],
            ['Simple to implement using a circular queue', 'Not suitable for real-time systems without priority handling'],
            ['Suitable for multitasking environments', 'Does not consider process priority'],
          ],
        },
        { kind: 'heading', text: 'So which is best?' },
        {
          kind: 'prose',
          paragraphs: [
            'For this particular set of four processes, the best scheduler is **preemptive SJF (SRTF)**: it gives the lowest average waiting time (4.25 ms) and lowest average turnaround time (9.25 ms).',
            'A fair comparison needs the same arrival times. The SJF and Round Robin examples above assumed everything arrived at 0. With the real arrival times, non-preemptive SJF gives 9.5 / 4.5 ms and Round Robin (quantum 4) gives 12.75 / 7.75 ms, so SRTF still wins.',
            'Why? Shorter processes (P2 and P4) are executed earlier, which reduces overall waiting time, and newly arrived short jobs are handled immediately by preempting the current process.',
            '**Preemptive priority scheduling gets the same averages in this example**, but SRTF reaches that performance using burst length alone, without depending on manually assigned priorities. That independence is why it is preferred here.',
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'But "best" depends on the workload',
          text: 'SRTF’s advantages (high efficiency, fast completion of short jobs) come with real costs: long processes such as P3 may wait far longer, the scheduler must know or estimate CPU burst times in advance, and it is harder to implement. In this workload the short jobs naturally benefit first, which is exactly why the averages improve. A different mix of processes could favour a different algorithm.',
        },
        {
          kind: 'teachBack',
          prompt:
            'Explain to a classmate why Round Robin gives worse average waiting times than SRTF, but is still the algorithm chosen for time-sharing systems.',
          checklist: [
            'You said Round Robin gives every process an equal fixed time quantum in circular order',
            'You said this means short jobs may be interrupted and have to queue again, raising their waiting time',
            'You said SRTF always runs the shortest remaining job, which minimises average waiting time',
            'You said Round Robin prevents starvation because every process gets a turn',
            'You said Round Robin gives good response time, which matters most for interactive users',
            'You mentioned that SRTF requires knowing or estimating burst times in advance, which is often impossible',
          ],
        },
        {
          kind: 'quickCheck',
          questionIds: ['q5-8-1', 'q5-8-2', 'q5-8-3', 'q5-8-4', 'q5-8-5', 'q5-8-6'],
        },
      ],
      takeaways: [
        'FCFS: non-preemptive, arrival order, suffers the convoy effect.',
        'SJF: shortest burst first, non-preemptive. SRTF: its preemptive version, usually the best averages.',
        'Priority scheduling risks starvation; aging (for example, raising priority by 1 every 15 minutes) is the fix.',
        'Round Robin: fixed time quantum, circular order, prevents starvation, designed for time-sharing.',
        'Too small a quantum wastes time switching; too large and RR degenerates into FCFS.',
      ],
    },
  ],
}
