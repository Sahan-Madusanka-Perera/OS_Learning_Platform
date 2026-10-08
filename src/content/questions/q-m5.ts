import type { Question } from '@/types/content'

export const questionsM5: Question[] = [
  /* ============ l5-1 ============ */
  {
    id: 'q5-1-1',
    lessonId: 'l5-1',
    type: 'mcq',
    level: 1,
    prompt: 'Which statement correctly distinguishes a program from a process?',
    options: [
      'A program runs; a process is stored on disk',
      'A program is a set of instructions stored in secondary storage; a process is a program currently being executed',
      'A program and a process are the same thing viewed differently',
      'A process is a program that has finished executing',
    ],
    correct: 1,
    optionFeedback: [
      'Exactly backwards: a program sits on disk, a process runs.',
      null,
      'They are genuinely different: one is passive, one is active.',
      'A finished process is *terminated*, not a program.',
    ],
    explanation:
      'A program is passive: a set of instructions stored in secondary storage. A process is active: a program in execution, together with its current state, CPU registers, memory and required resources.',
    tags: ['process'],
  },
  {
    id: 'q5-1-2',
    lessonId: 'l5-1',
    type: 'trueFalse',
    level: 2,
    prompt: 'One program can have many processes.',
    correct: true,
    explanation:
      'Yes: a program may have many processes. Opening the same application twice creates two processes from one program file, each with its own memory, its own resources and its own place in the code.',
    tags: ['process'],
  },
  {
    id: 'q5-1-3',
    lessonId: 'l5-1',
    type: 'mcq',
    level: 3,
    prompt:
      'A process spends most of its time waiting for data to arrive from the network. How is it classified?',
    options: ['CPU bound', 'I/O bound', 'A system process', 'A foreground process'],
    correct: 1,
    optionFeedback: [
      'CPU bound processes spend most of their time computing, not waiting.',
      null,
      'That classification is about *who started it*, not what it spends time doing.',
      'That classification is about whether it interacts with the user.',
    ],
    explanation:
      'I/O bound processes spend more time waiting for input/output operations, reading from or writing to a disk or network, than doing actual computation. Copying a large file and loading a web page are the syllabus examples.',
    tags: ['process', 'io-bound'],
  },

  /* ============ l5-2 ============ */
  {
    id: 'q5-2-1',
    lessonId: 'l5-2',
    type: 'multi',
    level: 1,
    prompt: 'Which of these are stored in a Process Control Block? (Select all that apply.)',
    options: [
      'Process ID',
      'Program counter',
      'CPU registers',
      'The program’s source code',
      'List of open files',
    ],
    correct: [0, 1, 2, 4],
    explanation:
      'The PCB stores the PID, process state, program counter, CPU registers, memory management information, CPU scheduling information, accounting information, I/O status information, and lists of open files and devices. The source code is not stored: the executable code is a separate component of the process.',
    tags: ['pcb'],
  },
  {
    id: 'q5-2-2',
    lessonId: 'l5-2',
    type: 'mcq',
    level: 3,
    prompt:
      'Why must the program counter be saved in the PCB when a process is switched out?',
    options: [
      'To record how long the process has been running',
      'So the process can resume from the exact next instruction when it runs again',
      'To identify the process uniquely',
      'To reserve memory for the process',
    ],
    correct: 1,
    optionFeedback: [
      'That is accounting information: a separate PCB field.',
      null,
      'That is the PID.',
      'That is memory management information.',
    ],
    explanation:
      'The program counter is a pointer to the address of the next instruction to be executed. Without it, a resumed process would have no idea where it had got to, and multitasking would be impossible.',
    tags: ['pcb', 'program-counter'],
  },
  {
    id: 'q5-2-3',
    lessonId: 'l5-2',
    type: 'mcq',
    level: 2,
    prompt: 'What is the relationship between a parent and a child process?',
    options: [
      'They share the same memory space and PID',
      'The child is created by the parent through a system call, and has its own memory space and PID',
      'The parent cannot terminate until the child does',
      'The child is a copy of the parent that runs the same instructions in lockstep',
    ],
    correct: 1,
    optionFeedback: [
      'The child has its own memory space and its own PID.',
      null,
      'A parent can be terminated first. Depending on the OS, its children are then terminated too, or adopted by a system process.',
      'The child can run independently and take a different path.',
    ],
    explanation:
      'A parent process creates one or more new processes using a system call such as `fork()`. The child executes as a separate process with its own memory space and PID, but usually reports its termination status back to the parent.',
    tags: ['process', 'parent-child'],
  },

  /* ============ l5-3 ============ */
  {
    id: 'q5-3-1',
    lessonId: 'l5-3',
    type: 'mcq',
    level: 2,
    prompt:
      'A process is executing when its time quantum expires. Which state does it move to?',
    options: ['Blocked', 'Ready', 'Suspended Ready', 'Terminated'],
    correct: 1,
    optionFeedback: [
      'Blocked is for waiting on a *resource*, such as I/O. Nothing is being waited for here.',
      null,
      'Suspension means being swapped out to disk: that is not what a timeout does.',
      'A timeout does not end the process; it just moves it out of the CPU.',
    ],
    explanation:
      'Running → Ready is the **timeout** transition. It happens when the time slice expires or a higher-priority process arrives. The process is perfectly healthy and ready to continue: it just no longer holds the CPU.',
    remediation:
      'Timeout → Ready (nothing is wrong). I/O request → Blocked (waiting for something).',
    tags: ['process-states'],
  },
  {
    id: 'q5-3-2',
    lessonId: 'l5-3',
    type: 'hotspot',
    level: 2,
    prompt:
      'Click the state a process is in when it is waiting for an I/O operation to complete, while still in main memory.',
    diagram: 'process-states',
    correctRegion: 'blocked',
    explanation:
      'Blocked means the process is paused and waiting for a resource, such as I/O completion or data availability, before it can continue. It is still in main memory. If it were also swapped out to disk it would be Suspended Blocked.',
    tags: ['process-states'],
  },
  {
    id: 'q5-3-3',
    lessonId: 'l5-3',
    type: 'mcq',
    level: 4,
    prompt: 'Why does an operating system move a Ready process to Suspended Ready?',
    options: [
      'Because the process has stopped responding',
      'To free main memory for other processes',
      'Because the process is waiting for input/output',
      'Because the process has a low priority',
    ],
    correct: 1,
    optionFeedback: [
      'Suspension is not a punishment for misbehaviour.',
      null,
      'That would move it to Blocked, not Suspended Ready.',
      'Priority affects *scheduling order*, not whether a process is swapped out.',
    ],
    explanation:
      'A ready process is moved out of main memory to secondary storage to free memory, even though it is ready to run. The medium-term scheduler makes this decision, and reverses it when sufficient main memory becomes available.',
    tags: ['process-states', 'swapping'],
  },
  {
    id: 'q5-3-4',
    lessonId: 'l5-3',
    type: 'mcq',
    level: 4,
    prompt:
      'A process is in Suspended Blocked. The I/O it was waiting for completes, but main memory is still full. Which state does it move to?',
    options: ['Blocked', 'Ready', 'Suspended Ready', 'Running'],
    correct: 2,
    optionFeedback: [
      'Blocked would mean it is back in main memory *and* still waiting: neither is true.',
      'Ready would mean it is back in main memory, but memory is still full.',
      null,
      'It cannot run while it is still on disk.',
    ],
    explanation:
      'Suspended Blocked → Suspended Ready happens when the waiting event or I/O operation completes **while the process remains in secondary storage**. It is now ready to run, but still swapped out, so it must first be brought back into memory.',
    remediation:
      'Two independent things: is it waiting for a resource, and is it in memory? Suspended Blocked is "yes and no"; Suspended Ready is "no and no".',
    tags: ['process-states'],
  },
  {
    id: 'q5-3-5',
    lessonId: 'l5-3',
    type: 'ordering',
    level: 3,
    prompt:
      'A process starts, runs, requests input from the user, receives it, runs again and finishes. Put its states in order.',
    items: [
      'New: the process is being created',
      'Ready, waiting for the CPU',
      'Running, executing on the CPU',
      'Blocked, waiting for the user’s input',
      'Ready again: the input has arrived',
      'Running again, finishing its work',
      'Terminated: execution complete',
    ],
    explanation:
      'New (being created) → Ready (waiting for CPU) → Running → Blocked (waiting for input) → Ready (input arrived, waiting for CPU again) → Running → Terminated. Note that a process re-enters Ready after being unblocked; it never jumps straight from Blocked to Running.',
    remediation:
      'There is no Blocked → Running transition. Everything reaches Running through Ready.',
    tags: ['process-states'],
  },

  /* ============ l5-4 ============ */
  {
    id: 'q5-4-1',
    lessonId: 'l5-4',
    type: 'multi',
    level: 2,
    prompt:
      'Which four conditions must ALL be present simultaneously for deadlock to occur?',
    options: [
      'Mutual exclusion',
      'Hold and wait',
      'Preemption',
      'No preemption',
      'Circular wait',
      'High CPU utilisation',
    ],
    correct: [0, 1, 3, 4],
    explanation:
      'The four conditions are mutual exclusion, hold and wait, **no** preemption, and circular wait. Note the negative: if resources *could* be forcibly taken away, deadlock would break immediately. CPU utilisation is irrelevant.',
    remediation:
      'Two cars on a one-lane bridge: exclusive use, each holding half and needing the other half, neither able to be forced back, each waiting on the other.',
    tags: ['deadlock'],
  },
  {
    id: 'q5-4-2',
    lessonId: 'l5-4',
    type: 'mcq',
    level: 3,
    prompt: 'What resources does a zombie process consume?',
    options: [
      'CPU time and main memory',
      'Main memory only',
      'An entry in the process table only',
      'Nothing at all',
    ],
    correct: 2,
    optionFeedback: [
      'A zombie has already finished executing, so it uses no CPU.',
      'It does not occupy main memory either: its memory was released.',
      null,
      'It does consume one thing: a process table entry.',
    ],
    explanation:
      'A zombie has completed execution and uses neither CPU nor main memory, but it still occupies an entry in the process table. If many accumulate, the process table can become full, preventing new processes from being created.',
    remediation:
      'The danger is table exhaustion, not resource consumption.',
    tags: ['zombie-process'],
  },
  {
    id: 'q5-4-3',
    lessonId: 'l5-4',
    type: 'mcq',
    level: 3,
    prompt: 'Why does a zombie process exist in the first place?',
    options: [
      'Because the process crashed instead of exiting cleanly',
      'Because the parent process did not collect the terminated child’s exit status',
      'Because the OS ran out of memory while terminating it',
      'Because the process was suspended and never resumed',
    ],
    correct: 1,
    explanation:
      'When a child process terminates it sends its exit status to the parent. If the parent does not collect this exit status, the terminated child remains in the system as a zombie: its process table entry cannot be cleaned up until someone reads the result.',
    tags: ['zombie-process'],
  },
  {
    id: 'q5-4-4',
    lessonId: 'l5-4',
    type: 'mcq',
    level: 4,
    prompt:
      'A process attempts to write to a memory address outside its allocated space. What happens, and why?',
    options: [
      'The write succeeds but corrupts another process',
      'Memory protection detects it and the OS terminates the process',
      'The OS automatically allocates the extra memory',
      'The process is moved to the Blocked state until memory becomes available',
    ],
    correct: 1,
    optionFeedback: [
      'Preventing exactly this is the purpose of memory protection.',
      null,
      'Silently granting access to memory a process did not request would destroy isolation.',
      'This is an error, not a resource wait.',
    ],
    explanation:
      'When a process tries to touch memory it does not own, the hardware and OS step in immediately and terminate it. The mechanism is **memory protection**: most modern operating systems use paging or segmentation to ensure each process lives in its own sandbox.',
    tags: ['process-termination', 'memory-protection'],
  },

  /* ============ l5-5 ============ */
  {
    id: 'q5-5-1',
    lessonId: 'l5-5',
    type: 'fillBlank',
    level: 1,
    prompt:
      'According to the syllabus, an interrupt is an event that alters the sequence of ___ of a process.',
    accepted: ['execution'],
    explanation:
      'The syllabus definition is: an interrupt is an event that alters the sequence of execution of a process. More generally, it is a signal sent to the processor indicating an event needs immediate attention.',
    tags: ['interrupts'],
  },
  {
    id: 'q5-5-2',
    lessonId: 'l5-5',
    type: 'matching',
    level: 2,
    prompt: 'Classify each interrupt cause as hardware or software.',
    pairs: [
      { left: 'Keyboard press', right: 'Hardware interrupt' },
      { left: 'System call', right: 'Software interrupt' },
      { left: 'Division by zero', right: 'Software interrupt' },
      { left: 'Power failure', right: 'Hardware interrupt' },
    ],
    explanation:
      'Hardware interrupts are triggered by external hardware devices: keyboard input, mouse clicks, disk I/O completion, hardware failures. Software interrupts are triggered by programs: system calls, errors and exceptions.',
    tags: ['interrupts'],
  },
  {
    id: 'q5-5-3',
    lessonId: 'l5-5',
    type: 'mcq',
    level: 3,
    prompt: 'Which type of interrupt cannot be ignored by the operating system?',
    options: [
      'Maskable interrupts',
      'Non-maskable interrupts',
      'Software interrupts',
      'Low-priority interrupts',
    ],
    correct: 1,
    explanation:
      'Non-maskable interrupts cannot be ignored and must be handled immediately: hardware failures are the classic example. Maskable interrupts can be temporarily ignored by the OS.',
    tags: ['interrupts'],
  },
  {
    id: 'q5-5-4',
    lessonId: 'l5-5',
    type: 'mcq',
    level: 4,
    prompt: 'What is the main disadvantage of context switching?',
    options: [
      'It prevents multitasking',
      'It introduces overhead: time spent saving and restoring state during which no useful work happens',
      'It requires processes to be in the Blocked state',
      'It only works on multi-core processors',
    ],
    correct: 1,
    optionFeedback: [
      'Context switching is what *enables* multitasking.',
      null,
      'Switching happens between any states, not only from Blocked.',
      'Context switching is precisely what makes single-core multitasking possible.',
    ],
    explanation:
      'Saving and restoring process states takes real time during which the CPU does no useful work. This is exactly why a Round Robin time quantum that is too small hurts performance: the machine spends more time switching than computing.',
    tags: ['context-switch'],
  },

  /* ============ l5-6 ============ */
  {
    id: 'q5-6-1',
    lessonId: 'l5-6',
    type: 'matching',
    level: 2,
    prompt: 'Match each scheduler to the state transition it causes.',
    pairs: [
      { left: 'Long-term scheduler', right: 'New → Ready' },
      { left: 'Short-term scheduler', right: 'Ready → Running' },
      { left: 'Medium-term scheduler', right: 'Ready ↔ Suspended Ready' },
    ],
    explanation:
      'The long-term (job) scheduler admits processes into memory. The short-term (CPU) scheduler dispatches a ready process to the CPU. The medium-term scheduler swaps processes between memory and secondary storage.',
    tags: ['schedulers'],
  },
  {
    id: 'q5-6-2',
    lessonId: 'l5-6',
    type: 'mcq',
    level: 3,
    prompt: 'Which scheduler controls the degree of multiprogramming, and why?',
    options: [
      'The short-term scheduler, because it decides which process runs',
      'The long-term scheduler, because it decides how many processes are admitted into memory',
      'The medium-term scheduler only, because it swaps processes out',
      'None of them: the degree of multiprogramming is fixed by hardware',
    ],
    correct: 1,
    optionFeedback: [
      'The short-term scheduler provides *less* control over the degree of multiprogramming: it only chooses among processes already admitted.',
      null,
      'The medium-term scheduler also controls it, but the long-term scheduler is the primary answer since it makes the admission decision.',
      'It is very much a software decision.',
    ],
    explanation:
      'The long-term scheduler selects processes from a pool and loads them into memory, so it decides how many processes are in memory at once: that is the degree of multiprogramming. The medium-term scheduler also controls it, by swapping processes out.',
    tags: ['schedulers'],
  },
  {
    id: 'q5-6-3',
    lessonId: 'l5-6',
    type: 'mcq',
    level: 2,
    prompt: 'Which scheduler is the fastest of the three?',
    options: ['Long-term', 'Short-term', 'Medium-term', 'They all run at the same speed'],
    correct: 1,
    explanation:
      'The short-term scheduler is the fastest, because it must run every time the CPU becomes free: potentially thousands of times per second. The long-term scheduler runs least often and is slowest; the medium-term scheduler sits between them.',
    tags: ['schedulers'],
  },

  /* ============ l5-7 ============ */
  {
    id: 'q5-7-1',
    lessonId: 'l5-7',
    type: 'numeric',
    level: 2,
    prompt:
      'A process arrives at time 3, has a burst duration of 6 ms, and completes at time 15. What is its waiting duration in ms?',
    answer: 6,
    unit: 'ms',
    hint: 'Find turnaround first.',
    explanation:
      'Turnaround = Completion − Arrival = 15 − 3 = 12 ms. Waiting = Turnaround − Burst = 12 − 6 = 6 ms.',
    remediation:
      'Always in this order: turnaround first (completion minus arrival), then waiting (turnaround minus burst).',
    tags: ['scheduling-criteria'],
  },
  {
    id: 'q5-7-2',
    lessonId: 'l5-7',
    type: 'mcq',
    level: 3,
    prompt:
      'What is the difference between waiting time and response time?',
    options: [
      'They are the same thing',
      'Waiting time is the total time in the ready queue; response time is only the wait before the first output',
      'Response time includes the burst duration; waiting time does not',
      'Waiting time applies to preemptive scheduling only',
    ],
    correct: 1,
    optionFeedback: [
      'They differ substantially for preempted processes.',
      null,
      'Neither includes burst duration: that is turnaround time.',
      'Both apply to any algorithm.',
    ],
    explanation:
      'In Round Robin a process may wait, run, wait, run, wait, run. Response time counts only the first gap: the duration until the very first output is produced. Waiting time counts every gap added together.',
    tags: ['scheduling-criteria'],
  },
  {
    id: 'q5-7-3',
    lessonId: 'l5-7',
    type: 'mcq',
    level: 2,
    prompt: 'Which of these algorithms is non-preemptive?',
    options: ['Round Robin', 'Shortest Remaining Time First', 'First Come First Served', 'Preemptive Priority Scheduling'],
    correct: 2,
    explanation:
      'Non-preemptive algorithms: FCFS, (non-preemptive) SJF, non-preemptive Priority Scheduling. Preemptive: Round Robin, SRTF, preemptive Priority Scheduling. In a non-preemptive algorithm, once a process gets the CPU it keeps it until it voluntarily releases it.',
    tags: ['scheduling-policies'],
  },

  /* ============ l5-8 ============ */
  {
    id: 'q5-8-1',
    lessonId: 'l5-8',
    type: 'numeric',
    level: 3,
    prompt:
      'Four processes are scheduled with FCFS: P1 (arrival 0, burst 7), P2 (arrival 2, burst 4), P3 (arrival 3, burst 2) and P4 (arrival 5, burst 2). What is the average waiting duration in ms?',
    answer: 5.25,
    unit: 'ms',
    tolerance: 0.01,
    hint: 'Draw the Gantt chart first: they run in arrival order.',
    explanation:
      'Gantt: P1 0–7, P2 7–11, P3 11–13, P4 13–15. Turnaround: 7, 9, 10, 10. Waiting = turnaround − burst: 0, 5, 8, 8. Average = (0+5+8+8)/4 = **5.25 ms**.',
    remediation:
      'FCFS runs processes strictly in arrival order, each to completion. Draw the chart before calculating anything.',
    tags: ['fcfs', 'calculations'],
  },
  {
    id: 'q5-8-2',
    lessonId: 'l5-8',
    type: 'numeric',
    level: 4,
    prompt:
      'The same four processes, P1 (0, 7), P2 (2, 4), P3 (3, 2) and P4 (5, 2), given as (arrival, burst), are scheduled with SRTF (preemptive SJF). What is the average waiting duration in ms?',
    answer: 3,
    unit: 'ms',
    tolerance: 0.01,
    hint: 'At time 2, P1 still needs 5 ms but P2 needs only 4, so P1 is preempted.',
    explanation:
      'Gantt: P1 0–2, P2 2–3, P3 3–5, P4 5–7, P2 7–10, P1 10–15. Completions: P1 15, P2 10, P3 5, P4 7. Turnaround: 15, 8, 2, 2. Waiting: 8, 4, 0, 0. Average = (8+4+0+0)/4 = **3 ms**, compared with 5.25 ms under FCFS for the same processes.',
    remediation:
      'At every arrival, compare the newcomer’s burst with the running process’s REMAINING time, not its original burst.',
    tags: ['srtf', 'calculations'],
  },
  {
    id: 'q5-8-3',
    lessonId: 'l5-8',
    type: 'numeric',
    level: 4,
    prompt:
      'Four processes P1 (burst 5), P2 (burst 3), P3 (burst 7) and P4 (burst 2) all arrive at time 0. Round Robin is used with a time quantum of 3 ms. What is the average turnaround duration in ms?',
    answer: 11.75,
    unit: 'ms',
    tolerance: 0.01,
    hint: 'In each round a process runs for at most 3 ms. P3 needs three rounds.',
    explanation:
      'Round 1: P1 0–3 (2 ms left), P2 3–6 (finishes), P3 6–9 (4 ms left), P4 9–11 (finishes). Round 2: P1 11–13 (finishes), P3 13–16 (1 ms left). Round 3: P3 16–17. Completions: 13, 6, 17, 11. All arrived at 0, so turnaround = completion. Average = 47/4 = **11.75 ms**.',
    remediation:
      'A preempted process goes to the END of the ready queue, behind everyone who has not yet had a turn.',
    tags: ['round-robin', 'calculations'],
  },
  {
    id: 'q5-8-4',
    lessonId: 'l5-8',
    type: 'mcq',
    level: 3,
    prompt: 'What is the convoy effect?',
    options: [
      'Many processes arriving at the same time',
      'A long process at the head of the queue delaying all the shorter processes behind it',
      'Processes being swapped in and out repeatedly',
      'The CPU switching between processes too frequently',
    ],
    correct: 1,
    optionFeedback: [
      'Simultaneous arrival is not itself a problem.',
      null,
      'That is thrashing, a memory management problem.',
      'That is context-switching overhead.',
    ],
    explanation:
      'The convoy effect is FCFS’s signature weakness: a long-running process at the head of the ready queue delays every shorter process behind it, raising average waiting time considerably.',
    tags: ['fcfs', 'convoy-effect'],
  },
  {
    id: 'q5-8-5',
    lessonId: 'l5-8',
    type: 'mcq',
    level: 4,
    prompt:
      'Priority scheduling is used and a low-priority process has been waiting for hours while higher-priority processes keep arriving. What is this problem called, and what is the standard solution?',
    options: [
      'Deadlock, solved by preemption',
      'Starvation, solved by aging',
      'Thrashing, solved by adding RAM',
      'The convoy effect, solved by using SJF',
    ],
    correct: 1,
    optionFeedback: [
      'Deadlock requires processes waiting on *each other*; here nothing is circular.',
      null,
      'Thrashing is excessive page swapping: a memory problem.',
      'The convoy effect is an FCFS problem caused by a long job, not by priority.',
    ],
    explanation:
      'Starvation is when a process waits indefinitely because higher-priority processes continuously get the CPU. Aging solves it: the priority of long-waiting processes is gradually increased, for example by 1 for every 15 minutes of waiting.',
    remediation:
      'Priority scheduling has no built-in aging mechanism, so starvation occurs unless aging is applied deliberately.',
    tags: ['starvation', 'aging', 'priority-scheduling'],
  },
  {
    id: 'q5-8-6',
    lessonId: 'l5-8',
    type: 'mcq',
    level: 4,
    prompt:
      'A Round Robin system is configured with a very large time quantum. What happens?',
    options: [
      'Response time improves dramatically',
      'The system behaves like FCFS, so short and interactive processes wait too long',
      'Context switching overhead increases',
      'Processes begin to starve',
    ],
    correct: 1,
    optionFeedback: [
      'The opposite: a large quantum makes short processes wait.',
      null,
      'A large quantum means *fewer* switches, so overhead falls.',
      'Round Robin prevents starvation regardless of quantum size.',
    ],
    explanation:
      'When the quantum is large enough that most processes finish in one CPU burst without being preempted, CPU efficiency rises because switching is rare, but the system behaves like FCFS, so short and interactive processes must wait too long. Too small a quantum has the opposite problem: too many switches waste CPU time.',
    tags: ['round-robin', 'time-quantum'],
  },
]
