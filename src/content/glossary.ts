import type { GlossaryEntry } from '@/types/content'

/* Every term a student can click inside a lesson lives here.
   `appearsIn` powers "where does this show up in the course?". */

export const glossary: GlossaryEntry[] = [
  {
    id: 'os',
    term: 'Operating System (OS)',
    simple: 'The main program that runs the whole computer and lets you use it.',
    technical:
      'System software that manages a computer’s hardware and software resources, provides an interface between the user and the hardware, and offers common services to application programs.',
    example: 'Windows 11, macOS, Ubuntu Linux, Android, iOS.',
    related: ['kernel', 'system-software', 'resource-management'],
    appearsIn: ['l1-4', 'l2-1'],
  },
  {
    id: 'kernel',
    term: 'Kernel',
    simple: 'The innermost part of the OS that talks straight to the hardware.',
    technical:
      'The core component of an operating system that runs in a privileged mode, directly interacts with hardware, and manages processes, memory, devices, files and system calls.',
    example: 'The Linux kernel; the Windows NT kernel.',
    related: ['os', 'system-call', 'monolithic-kernel'],
    appearsIn: ['l7-4'],
  },
  {
    id: 'monolithic-kernel',
    term: 'Monolithic kernel',
    simple: 'A kernel where all OS services run together in one big block.',
    technical:
      'A kernel design in which all operating system services (process management, memory management, file systems and device drivers) execute in kernel space as a single large program.',
    example: 'Linux.',
    related: ['kernel', 'microkernel'],
    appearsIn: ['l7-4'],
  },
  {
    id: 'microkernel',
    term: 'Microkernel',
    simple: 'A kernel that keeps only the essentials inside, and pushes the rest out.',
    technical:
      'A kernel design in which only essential services run in kernel space, while other services such as file systems and drivers run in user space as separate processes.',
    example: 'MINIX 3, QNX.',
    related: ['kernel', 'monolithic-kernel'],
    appearsIn: ['l7-4'],
  },
  {
    id: 'system-software',
    term: 'System software',
    simple: 'Software that runs the computer itself rather than doing a job for you.',
    technical:
      'Software that provides the essential services required for a computer to function, manages hardware, and supports the execution of application software.',
    example: 'Operating systems, device drivers, utility software, language translators.',
    related: ['application-software', 'utility-software', 'os'],
    appearsIn: ['l1-2'],
  },
  {
    id: 'application-software',
    term: 'Application software',
    simple: 'Programs you open to get something done.',
    technical:
      'Software designed to perform specific tasks for the end user, such as word processing, spreadsheet calculation or web browsing. It requires an operating system to run.',
    example: 'Microsoft Word, Google Chrome, VLC Media Player.',
    related: ['system-software', 'utility-software'],
    appearsIn: ['l1-2'],
  },
  {
    id: 'utility-software',
    term: 'Utility software',
    simple: 'Small tools that maintain, protect and tidy up the computer.',
    technical:
      'A category of system software designed to help maintain, manage, and optimise the performance of a computer system.',
    example: 'Antivirus, disk cleanup, backup software, file compression, task manager.',
    related: ['system-software'],
    appearsIn: ['l1-2'],
  },
  {
    id: 'firmware',
    term: 'Firmware',
    simple: 'Permanent instructions built into a device that tell it how to behave.',
    technical:
      'Software written into non-volatile memory (ROM or flash) on a hardware device, containing instructions on how the device should operate and communicate with other devices.',
    example: 'BIOS, UEFI, the software inside a printer or router.',
    related: ['bios', 'uefi', 'rom'],
    appearsIn: ['l1-3'],
  },
  {
    id: 'bios',
    term: 'BIOS',
    simple: 'The small startup program on the motherboard that wakes the computer up.',
    technical:
      'Basic Input Output System: firmware stored in non-volatile ROM on the motherboard that initialises hardware, runs POST, and loads the boot loader. Standard on the IBM PC from 1981; text-based, 16-bit, supports MBR partitioning up to 2 TB.',
    related: ['uefi', 'post', 'firmware', 'cmos'],
    appearsIn: ['l1-3'],
  },
  {
    id: 'uefi',
    term: 'UEFI',
    simple: 'The modern replacement for BIOS.',
    technical:
      'Unified Extensible Firmware Interface: a specification defining a software interface between an operating system and platform firmware. Specified in 2006 (growing out of Intel’s earlier EFI); graphical, 32/64-bit, supports GPT partitions over 2 TB and Secure Boot.',
    related: ['bios', 'gpt', 'firmware'],
    appearsIn: ['l1-3'],
  },
  {
    id: 'post',
    term: 'POST',
    simple: 'A quick self-test the computer runs before it starts up properly.',
    technical:
      'Power-On Self-Test: a diagnostic routine run by the BIOS at startup that checks essential hardware such as RAM, keyboard, processor and storage devices, reporting failures using beep codes.',
    related: ['bios', 'booting'],
    appearsIn: ['l1-3'],
  },
  {
    id: 'cmos',
    term: 'CMOS memory',
    simple: 'A tiny battery-backed memory that remembers your BIOS settings.',
    technical:
      'A small amount of memory on the motherboard, powered by the CMOS battery, that stores system settings such as date and time, boot order and hardware configuration so they survive power-off.',
    related: ['bios'],
    appearsIn: ['l1-3'],
  },
  {
    id: 'booting',
    term: 'Booting',
    simple: 'Everything the computer does between pressing power and being usable.',
    technical:
      'The sequence of steps a computer follows to start up and load the operating system into main memory, preparing the hardware and software so the computer becomes ready to use.',
    related: ['bios', 'boot-loader', 'post'],
    appearsIn: ['l1-3'],
  },
  {
    id: 'boot-loader',
    term: 'Boot loader',
    simple: 'The program whose only job is to load the OS into RAM.',
    technical:
      'A small program located by the firmware which loads the operating system kernel and system files from secondary storage into main memory.',
    example: 'Windows Boot Manager, GRUB.',
    related: ['booting', 'mbr', 'gpt'],
    appearsIn: ['l1-3'],
  },
  {
    id: 'mbr',
    term: 'MBR',
    simple: 'The old style of partition table, read from the first sector of the disk.',
    technical:
      'Master Boot Record: a partition scheme used mainly with BIOS-based systems. The first sector of the disk holds the partition table plus a small boot program. Limited to 2 TB.',
    related: ['gpt', 'bios', 'partitioning'],
    appearsIn: ['l1-3'],
  },
  {
    id: 'gpt',
    term: 'GPT',
    simple: 'The modern partition table, used with UEFI.',
    technical:
      'GUID Partition Table: a partition scheme used mainly with UEFI-based systems. UEFI reads the GPT and locates the EFI System Partition (ESP) containing the boot loader. Supports disks over 2 TB.',
    related: ['mbr', 'uefi', 'partitioning'],
    appearsIn: ['l1-3'],
  },
  {
    id: 'cold-boot',
    term: 'Cold boot',
    simple: 'Starting the computer from completely off.',
    technical: 'Starting the computer from a powered-off state, running the full boot sequence including POST.',
    related: ['warm-boot', 'booting'],
    appearsIn: ['l1-3'],
  },
  {
    id: 'warm-boot',
    term: 'Warm boot',
    simple: 'Restarting without cutting the power.',
    technical: 'Restarting the computer without disconnecting the power supply completely: for example, by choosing Restart.',
    related: ['cold-boot', 'booting'],
    appearsIn: ['l1-3'],
  },
  {
    id: 'ram',
    term: 'RAM',
    simple: 'The computer’s fast, temporary workspace. It empties when power goes off.',
    technical:
      'Random Access Memory: the primary volatile storage that holds the OS kernel, running programs and active data, providing fast directly-addressable working space for the CPU.',
    related: ['virtual-memory', 'volatile', 'secondary-storage'],
    appearsIn: ['l6-1'],
  },
  {
    id: 'volatile',
    term: 'Volatile',
    simple: 'Loses everything when the power goes off.',
    technical: 'A property of memory whose contents are not retained when electrical power is removed.',
    related: ['ram', 'rom'],
    appearsIn: ['l6-1'],
  },
  {
    id: 'rom',
    term: 'ROM',
    simple: 'Memory that can be read but keeps its contents forever.',
    technical: 'Read-Only Memory: non-volatile memory whose contents are retained without power; used to store firmware such as the BIOS.',
    related: ['firmware', 'bios', 'volatile'],
    appearsIn: ['l1-3'],
  },
  {
    id: 'secondary-storage',
    term: 'Secondary storage',
    simple: 'Where files live permanently: the hard disk or SSD.',
    technical:
      'Non-volatile storage used to hold the user’s and the system’s data and programs permanently. Slower but far larger than main memory, and not directly executable by the CPU.',
    example: 'Hard disk drive, solid-state drive, USB flash drive.',
    related: ['ram', 'file', 'virtual-memory'],
    appearsIn: ['l4-4', 'l6-1'],
  },
  {
    id: 'process',
    term: 'Process',
    simple: 'A program that is actually running right now.',
    technical:
      'A program in execution, together with its current state, CPU registers, program counter, memory allocation and the resources it holds.',
    related: ['program', 'pcb', 'thread'],
    appearsIn: ['l5-1'],
  },
  {
    id: 'program',
    term: 'Program',
    simple: 'A file of instructions sitting on the disk, not yet running.',
    technical:
      'A set of instructions written in a programming language and stored in secondary storage, which tells the computer what tasks to perform. A program is passive; a process is active.',
    related: ['process'],
    appearsIn: ['l5-1'],
  },
  {
    id: 'thread',
    term: 'Thread',
    simple: 'A single stream of work inside a process.',
    technical:
      'The smallest unit of processing that can be scheduled by an operating system. Threads within a process share the same memory and system resources but execute independently with their own execution state.',
    related: ['process', 'multithreading'],
    appearsIn: ['l2-3'],
  },
  {
    id: 'multithreading',
    term: 'Multithreading',
    simple: 'One program doing several things at once inside itself.',
    technical:
      'A processing model in which multiple threads within a single process are scheduled by the operating system, sharing the process’s memory and resources to improve CPU utilisation and responsiveness.',
    related: ['thread', 'multitasking'],
    appearsIn: ['l2-3', 'l2-4'],
  },
  {
    id: 'multitasking',
    term: 'Multitasking',
    simple: 'The computer appearing to run several programs at the same time.',
    technical:
      'The ability of a computer to execute multiple tasks or processes concurrently. In most cases the operating system switches rapidly between them, giving the illusion of parallel execution.',
    related: ['multiprogramming', 'time-sharing', 'context-switch'],
    appearsIn: ['l2-3'],
  },
  {
    id: 'multiprogramming',
    term: 'Multiprogramming',
    simple: 'Keeping several jobs in memory so the CPU never sits idle.',
    technical:
      'A technique in which several jobs are held in main memory simultaneously; when the running job blocks for I/O, the CPU switches to another job, maximising processor utilisation.',
    related: ['multitasking', 'time-sharing', 'batch-system'],
    appearsIn: ['l2-2'],
  },
  {
    id: 'time-sharing',
    term: 'Time-sharing',
    simple: 'Giving each user a tiny slice of CPU time, over and over, very fast.',
    technical:
      'A system in which processor time is shared among multiple users or programs by rapidly switching between them using preemptive scheduling and a time quantum, minimising response time and maximising interaction.',
    related: ['multiprogramming', 'round-robin', 'time-quantum'],
    appearsIn: ['l2-2', 'l2-4'],
  },
  {
    id: 'batch-system',
    term: 'Batch system',
    simple: 'Jobs are collected up and run one after another with no user watching.',
    technical:
      'An operating system generation in which users submit jobs to an operator and a resident monitor loads and runs them one at a time using non-preemptive FCFS scheduling, with no interaction while the job runs.',
    related: ['multiprogramming', 'resident-monitor'],
    appearsIn: ['l2-2'],
  },
  {
    id: 'resident-monitor',
    term: 'Resident monitor',
    simple: 'A small permanent program in memory that runs the queue of jobs.',
    technical:
      'The portion of memory in a simple batch system reserved for control software that loads each job, runs it, and loads the next one when it finishes.',
    related: ['batch-system'],
    appearsIn: ['l2-2'],
  },
  {
    id: 'rtos',
    term: 'Real-Time OS (RTOS)',
    simple: 'An OS that must respond within a guaranteed time, every time.',
    technical:
      'An operating system designed to serve real-time applications that process data as it arrives, typically without buffer delays, using deterministic timing, priority-based scheduling and minimal interrupt latency.',
    example: 'VxWorks, FreeRTOS, QNX: used in airbags, pacemakers, avionics.',
    related: ['hard-real-time', 'soft-real-time', 'time-sharing'],
    appearsIn: ['l2-4'],
  },
  {
    id: 'hard-real-time',
    term: 'Hard real-time system',
    simple: 'Missing a deadline is a disaster.',
    technical:
      'A real-time system in which missing a deadline can lead to catastrophic failure. Used in medical systems, automotive airbag systems and industrial control systems.',
    related: ['rtos', 'soft-real-time'],
    appearsIn: ['l2-4'],
  },
  {
    id: 'soft-real-time',
    term: 'Soft real-time system',
    simple: 'Missing a deadline is annoying, not fatal.',
    technical:
      'A real-time system in which deadlines are important but not critical; missing one results in degraded performance rather than total system failure. Used in multimedia and telecommunications.',
    related: ['rtos', 'hard-real-time'],
    appearsIn: ['l2-4'],
  },
  {
    id: 'cli',
    term: 'Command Line Interface (CLI)',
    simple: 'You type commands as text instead of clicking.',
    technical:
      'A text-based user interface in which the user interacts with the system by typing commands into a terminal, interpreted by a shell such as Bash, PowerShell or Zsh.',
    related: ['gui', 'user-interface'],
    appearsIn: ['l2-5'],
  },
  {
    id: 'gui',
    term: 'Graphical User Interface (GUI)',
    simple: 'You point and click on windows, icons and buttons.',
    technical:
      'A user interface using visual elements (windows, icons, menus and pointers, known as WIMP) together with a pointing device, making navigation easier than a command line.',
    related: ['cli', 'user-interface'],
    appearsIn: ['l2-5'],
  },
  {
    id: 'user-interface',
    term: 'User interface',
    simple: 'The part of the system you actually interact with.',
    technical:
      'The part of a computer or device that enables users to interact with software and hardware. Types include CLI, GUI, voice, virtual reality and gesture-based interfaces.',
    related: ['cli', 'gui'],
    appearsIn: ['l2-5'],
  },
  {
    id: 'file',
    term: 'File',
    simple: 'A named container that stores data on a disk.',
    technical:
      'A named collection of related information, usually a sequence of bytes, stored on a computer or electronic device and managed by the operating system through a file system.',
    related: ['data', 'directory', 'file-system'],
    appearsIn: ['l3-1'],
  },
  {
    id: 'data',
    term: 'Data',
    simple: 'The raw content: numbers, text, pictures, sound.',
    technical:
      'Raw facts, figures, symbols or information such as numbers, text, images or sounds. Data by itself may have no meaning until it is processed. Data is the content; a file is the container.',
    related: ['file'],
    appearsIn: ['l3-1'],
  },
  {
    id: 'file-extension',
    term: 'File extension',
    simple: 'The bit after the dot that says what kind of file it is.',
    technical:
      'The part of a file name following the final dot, indicating the file type and informing the operating system which application should be used to open the file.',
    example: '`.txt`, `.jpg`, `.exe`, `.mp4`.',
    related: ['file', 'file-name'],
    appearsIn: ['l3-1'],
  },
  {
    id: 'file-name',
    term: 'File name (primary name)',
    simple: 'The name you give a file so you can tell it apart from others.',
    technical:
      'The part of a file’s identity used to uniquely distinguish it from other files in the same directory. Two files with the same name and extension in one directory cannot coexist: saving the second overwrites the first.',
    related: ['file-extension', 'file'],
    appearsIn: ['l3-1'],
  },
  {
    id: 'directory',
    term: 'Directory (folder)',
    simple: 'A container that holds files and other folders.',
    technical:
      'A virtual container within a file system that holds files and other directories, providing a logical way to organise and manage files. Every entry inside one directory must have a unique name.',
    related: ['file', 'root-directory', 'path'],
    appearsIn: ['l3-3'],
  },
  {
    id: 'root-directory',
    term: 'Root directory',
    simple: 'The very top folder that everything else sits inside.',
    technical:
      'The topmost directory in a file system, the starting point from which all other files and directories branch out.',
    example: '`/` on Unix-like systems, `C:\\` on Windows.',
    related: ['directory', 'path'],
    appearsIn: ['l3-3'],
  },
  {
    id: 'path',
    term: 'Path name',
    simple: 'The full address that says where a file is.',
    technical:
      'The complete address specifying the location of a file or directory in a file system, listing all directories leading to it. Absolute paths start at the root; relative paths start at the current working directory.',
    related: ['absolute-path', 'relative-path', 'root-directory'],
    appearsIn: ['l3-3'],
  },
  {
    id: 'absolute-path',
    term: 'Absolute path',
    simple: 'The address starting from the very top of the disk.',
    technical:
      'A path that shows the complete directory route starting from the root directory and including every folder up to the required file.',
    example: '`C:\\Users\\user\\Documents\\report.txt`',
    related: ['relative-path', 'path'],
    appearsIn: ['l3-3'],
  },
  {
    id: 'relative-path',
    term: 'Relative path',
    simple: 'The address starting from where you already are.',
    technical:
      'A path that shows the location of a file with respect to the current working directory. It does not begin at the root and is usually shorter than an absolute path.',
    example: '`images\\cheems.jpg`',
    related: ['absolute-path', 'path'],
    appearsIn: ['l3-3'],
  },
  {
    id: 'directory-entry',
    term: 'Directory entry',
    simple: 'The one row inside a folder that records a file’s name and where its data starts.',
    technical:
      'The record a directory holds for each file it contains, storing the file’s name and the information the operating system needs to locate its data on the disk. What it stores depends on the allocation method: contiguous keeps the starting block and length, linked keeps the starting block, and indexed keeps the address of the file’s index block.',
    example:
      'In a FAT system the directory entry for `report.txt` holds the number of its **first** block; the FAT chain supplies the rest.',
    related: ['directory', 'contiguous-allocation', 'linked-allocation', 'indexed-allocation', 'fat'],
    appearsIn: ['l3-3', 'l4-1', 'l4-2'],
  },
  {
    id: 'file-system',
    term: 'File system',
    simple: 'The OS’s scheme for storing and finding files on a disk.',
    technical:
      'A method used by an operating system to control how data is stored on and retrieved from a storage device, including metadata, allocation strategy, permissions and size limits.',
    example: 'FAT32, exFAT, NTFS, HFS+, APFS, ext4.',
    related: ['fat', 'ntfs', 'file'],
    appearsIn: ['l4-2'],
  },
  {
    id: 'fat',
    term: 'FAT',
    simple: 'A simple, very widely supported file system that uses a lookup table.',
    technical:
      'File Allocation Table: a file system created by Microsoft in the late 1970s and made famous by MS-DOS. It manages storage using a table recording which block follows which. Two copies of the FAT are kept for safety, and the table and root directory sit at fixed locations.',
    related: ['file-system', 'linked-allocation', 'ntfs'],
    appearsIn: ['l4-2'],
  },
  {
    id: 'ntfs',
    term: 'NTFS',
    simple: 'Windows’ modern file system: more secure and handles bigger files.',
    technical:
      'New Technology File System: introduced by Microsoft in 1993 with Windows NT 3.1. Uses a Master File Table, supports permissions, encryption, compression, fault tolerance, Unicode and very large files and partitions.',
    related: ['fat', 'file-system'],
    appearsIn: ['l4-2'],
  },
  {
    id: 'metadata',
    term: 'Metadata',
    simple: 'Data about the data: a file’s name, size, dates and permissions.',
    technical:
      'Information stored by a file system describing a file, such as its name, size, type, permissions, creation date and modification date, rather than its contents.',
    related: ['file-system', 'file-attributes'],
    appearsIn: ['l3-2', 'l4-2'],
  },
  {
    id: 'file-attributes',
    term: 'File attributes',
    simple: 'The properties recorded about a file.',
    technical:
      'Properties associated with a file describing its characteristics, permissions and status: owner, location, access permissions, creation/modification/access timestamps, file size and size on disk.',
    related: ['metadata', 'file'],
    appearsIn: ['l3-2'],
  },
  {
    id: 'platter',
    term: 'Platter',
    simple: 'The spinning metal disc inside a hard drive.',
    technical:
      'A circular metal disk inside a hard disk drive that physically stores data as tiny magnetised spots and rotates at high speed while data is read or written.',
    related: ['track', 'sector'],
    appearsIn: ['l3-4'],
  },
  {
    id: 'track',
    term: 'Track',
    simple: 'One circular ring of data on the surface of a platter.',
    technical:
      'A circular path on the surface of a platter along which data is recorded. Modern hard disks can have thousands of tracks on a single platter.',
    related: ['platter', 'sector'],
    appearsIn: ['l3-4'],
  },
  {
    id: 'sector',
    term: 'Sector',
    simple: 'The smallest physical slice of a track.',
    technical:
      'A small section of a track and the smallest physical storage unit on a disk, storing data in fixed-size portions: commonly 512 bytes or 4 KB.',
    related: ['track', 'block', 'cluster'],
    appearsIn: ['l3-4'],
  },
  {
    id: 'block',
    term: 'Block',
    simple: 'The fixed-size chunk the OS always reads and writes in.',
    technical:
      'A logical storage unit used by the operating system to read and write data, made of one or more sectors. Blocks are created when the disk is formatted and their size is usually a power of two.',
    related: ['sector', 'cluster', 'internal-fragmentation'],
    appearsIn: ['l3-4'],
  },
  {
    id: 'cluster',
    term: 'Cluster',
    simple: 'A group of blocks that the file system hands out as one unit.',
    technical:
      'A group of one or more blocks used by the file system to store a file. Files are allocated space in terms of clusters.',
    related: ['block', 'sector'],
    appearsIn: ['l3-4'],
  },
  {
    id: 'internal-fragmentation',
    term: 'Internal fragmentation',
    simple: 'Wasted space *inside* the last block a file was given.',
    technical:
      'The wastage of memory or disk space that occurs inside an allocated block when the block is larger than the data stored in it. The leftover space cannot be used by another file, because a block is allocated to only one file at a time.',
    example: 'Block size 4 KB, file size 8.66 KB → 3 blocks (12 KB) allocated, 3.34 KB wasted.',
    related: ['external-fragmentation', 'block', 'paging'],
    appearsIn: ['l3-4'],
  },
  {
    id: 'external-fragmentation',
    term: 'External fragmentation',
    simple: 'Free space exists, but it is scattered in pieces too small to use.',
    technical:
      'The condition in which free storage space is split into many small, non-contiguous blocks, so that a large contiguous block cannot be allocated even though the total free space is sufficient.',
    related: ['internal-fragmentation', 'contiguous-allocation', 'compaction'],
    appearsIn: ['l4-1', 'l4-3'],
  },
  {
    id: 'contiguous-allocation',
    term: 'Contiguous allocation',
    simple: 'The whole file is stored in one unbroken run of blocks.',
    technical:
      'A disk allocation method in which a file occupies one continuous run of blocks. Access is very fast and there is no pointer overhead, but external fragmentation occurs and growing a file is difficult. The directory entry stores the start block and length.',
    related: ['linked-allocation', 'indexed-allocation', 'external-fragmentation'],
    appearsIn: ['l4-1'],
  },
  {
    id: 'linked-allocation',
    term: 'Linked allocation',
    simple: 'Each block points to the next one, like a treasure hunt.',
    technical:
      'A disk allocation method in which a file is stored as a linked list of blocks scattered across the disk, each block containing data and a pointer to the next. No external fragmentation and files grow easily, but access is sequential only and a corrupted pointer loses the rest of the file. Used by FAT.',
    related: ['contiguous-allocation', 'indexed-allocation', 'fat'],
    appearsIn: ['l4-1'],
  },
  {
    id: 'indexed-allocation',
    term: 'Indexed allocation',
    simple: 'One special block holds a list of all the file’s block addresses.',
    technical:
      'A disk allocation method in which all block addresses of a file are stored in a separate index block. Supports direct and random access, files grow dynamically, and there is no external fragmentation, but each file needs an extra index block whose size limits the maximum file size. Used by UNIX/Linux file systems.',
    related: ['contiguous-allocation', 'linked-allocation'],
    appearsIn: ['l4-1'],
  },
  {
    id: 'defragmentation',
    term: 'Defragmentation',
    simple: 'Rearranging a disk so each file’s pieces sit next to each other.',
    technical:
      'The process of reorganising data on a storage drive so that pieces of the same file are stored contiguously instead of scattered, reducing seek time and improving access performance on hard disk drives.',
    related: ['compaction', 'external-fragmentation'],
    appearsIn: ['l4-3'],
  },
  {
    id: 'compaction',
    term: 'Disk compaction',
    simple: 'Pushing everything together so all the free space becomes one big gap.',
    technical:
      'The process of rearranging files or blocks so that scattered free spaces are merged into one large continuous free space. Its focus is free space, not file contiguity.',
    related: ['defragmentation', 'external-fragmentation'],
    appearsIn: ['l4-3'],
  },
  {
    id: 'partitioning',
    term: 'Disk partitioning',
    simple: 'Splitting one physical drive into several logical drives.',
    technical:
      'Dividing a single physical storage device into several logical parts, each assigned its own drive letter and able to use a different file system.',
    related: ['formatting', 'drive-letter', 'mbr', 'gpt'],
    appearsIn: ['l4-4'],
  },
  {
    id: 'formatting',
    term: 'Disk formatting',
    simple: 'Preparing a drive to hold files by setting up a file system on it.',
    technical:
      'The process of preparing a storage device for data storage by initialising the medium and creating a file system that the operating system can use to organise and store data.',
    related: ['partitioning', 'file-system'],
    appearsIn: ['l4-4'],
  },
  {
    id: 'backup',
    term: 'Backup',
    simple: 'A spare copy of your data, kept somewhere else.',
    technical:
      'A copy of data stored separately from the original location to protect against data loss from hardware failure, accidental deletion, ransomware or disaster.',
    related: ['data-recovery'],
    appearsIn: ['l4-4'],
  },
  {
    id: 'data-recovery',
    term: 'Data recovery',
    simple: 'Getting back data you lost or deleted.',
    technical:
      'The process of retrieving lost, deleted, corrupted or inaccessible data from storage devices after events such as accidental deletion, system crash, virus attack or drive failure.',
    related: ['backup'],
    appearsIn: ['l4-4'],
  },
  {
    id: 'acl',
    term: 'Access Control List (ACL)',
    simple: 'A list saying exactly who may do what to a file.',
    technical:
      'A file system structure listing which users or groups are permitted to perform which operations (read, write, execute) on a given file or directory.',
    related: ['file-security', 'authentication'],
    appearsIn: ['l4-5'],
  },
  {
    id: 'file-security',
    term: 'File security',
    simple: 'Keeping files safe from people who should not touch them.',
    technical:
      'The protection of files from unauthorised access, modification, deletion or damage, aiming to ensure confidentiality, integrity and availability.',
    related: ['acl', 'authentication', 'encryption'],
    appearsIn: ['l4-5'],
  },
  {
    id: 'authentication',
    term: 'Authentication',
    simple: 'Proving you are who you say you are.',
    technical:
      'The process of verifying a user’s identity, typically at login, using passwords, multi-factor authentication or other credentials, before granting access to system resources.',
    related: ['file-security', 'acl'],
    appearsIn: ['l4-5'],
  },
  {
    id: 'encryption',
    term: 'Encryption',
    simple: 'Scrambling data so only someone with the key can read it.',
    technical:
      'The process of converting plain readable data into ciphertext that cannot be read by unauthorised parties, using algorithms and a key. Symmetric encryption uses one shared key; asymmetric uses a public/private key pair.',
    related: ['file-security'],
    appearsIn: ['l1-2', 'l4-5'],
  },
  {
    id: 'fcb',
    term: 'File Control Block (FCB)',
    simple: 'The OS’s record card for an open file.',
    technical:
      'A data structure holding information related to an open file (drive name, file name, type, current block number, size in bytes, and creation/modification timestamps) used by the OS to locate files, manage access control and support file operations.',
    related: ['file', 'metadata', 'pcb'],
    appearsIn: ['l4-5'],
  },
  {
    id: 'pcb',
    term: 'Process Control Block (PCB)',
    simple: 'The OS’s record card for a running process.',
    technical:
      'A data structure maintained by the operating system storing everything needed to manage a process: PID, process state, program counter, CPU registers, memory management information, CPU scheduling information, accounting information, I/O status, and lists of open files and devices.',
    related: ['process', 'context-switch', 'pid'],
    appearsIn: ['l5-2'],
  },
  {
    id: 'pid',
    term: 'Process ID (PID)',
    simple: 'The unique number the OS gives each running process.',
    technical:
      'A unique identifier assigned to each process by the operating system, used to allocate and track system resources such as memory, CPU time and I/O operations.',
    related: ['process', 'pcb'],
    appearsIn: ['l5-2'],
  },
  {
    id: 'program-counter',
    term: 'Program counter',
    simple: 'A pointer to the next instruction the CPU should run.',
    technical:
      'A register (saved in the PCB when a process is switched out) holding the address of the next instruction to be executed for that process.',
    related: ['pcb', 'context-switch'],
    appearsIn: ['l5-2'],
  },
  {
    id: 'context-switch',
    term: 'Context switch',
    simple: 'Saving one process’s state and loading another’s so the CPU can swap jobs.',
    technical:
      'The mechanism by which the operating system saves the execution state of the currently running process into its PCB and restores the previously saved state of another process, allowing multiple processes to share the CPU.',
    related: ['pcb', 'multitasking', 'interrupt'],
    appearsIn: ['l5-5'],
  },
  {
    id: 'interrupt',
    term: 'Interrupt',
    simple: 'A signal that says "stop what you are doing, something needs attention".',
    technical:
      'An event that alters the sequence of execution of a process. A signal sent to the processor by hardware or software indicating that an event needs immediate attention. Hardware interrupts occur asynchronously; interrupts have priority levels, and some are maskable while others are not.',
    related: ['context-switch', 'system-call'],
    appearsIn: ['l5-5'],
  },
  {
    id: 'system-call',
    term: 'System call',
    simple: 'How a program politely asks the OS to do something for it.',
    technical:
      'A software interrupt through which a program requests a service from the operating system, providing the controlled interface between user programs and hardware.',
    example: '`fork()` in Unix/Linux creates a child process.',
    related: ['interrupt', 'kernel'],
    appearsIn: ['l5-4', 'l5-5'],
  },
  {
    id: 'deadlock',
    term: 'Deadlock',
    simple: 'Two processes each waiting for something the other is holding: forever.',
    technical:
      'A state in which two or more processes wait for each other indefinitely and none can proceed. It requires four simultaneous conditions: mutual exclusion, hold and wait, no preemption, and circular wait.',
    related: ['process', 'blocked-state'],
    appearsIn: ['l5-4'],
  },
  {
    id: 'zombie-process',
    term: 'Zombie process',
    simple: 'A finished process whose entry has not been cleaned up yet.',
    technical:
      'A process that has completed execution but still has an entry in the process table because its parent has not collected its exit status. It uses no CPU or memory, but too many can fill the process table and prevent new processes being created.',
    related: ['process', 'process-termination'],
    appearsIn: ['l5-4'],
  },
  {
    id: 'process-termination',
    term: 'Process termination',
    simple: 'The end of a process, when it gives back everything it was using.',
    technical:
      'The end of a process’s lifecycle, at which it releases its resources and ceases execution. Causes include normal completion, unavailable resources, execution errors, memory access violations, parent or OS requests, time limit expiry, parent termination, user intervention, hardware failure and exceptions.',
    related: ['process', 'zombie-process'],
    appearsIn: ['l5-4'],
  },
  {
    id: 'blocked-state',
    term: 'Blocked state',
    simple: 'A process paused because it is waiting for something.',
    technical:
      'A process state in which execution is paused while the process waits for a resource, such as I/O completion or data availability, before it can continue.',
    related: ['ready-state', 'running-state', 'seven-state'],
    appearsIn: ['l5-3'],
  },
  {
    id: 'ready-state',
    term: 'Ready state',
    simple: 'Fully prepared to run: just waiting for a turn on the CPU.',
    technical:
      'A process state in which a process is fully prepared to execute and is waiting only for the CPU to become available.',
    related: ['running-state', 'blocked-state', 'seven-state'],
    appearsIn: ['l5-3'],
  },
  {
    id: 'running-state',
    term: 'Running state',
    simple: 'The process currently using the CPU.',
    technical:
      'The process state in which actual execution occurs. Processes move in and out of this state based on CPU scheduling, I/O operations and other events.',
    related: ['ready-state', 'blocked-state', 'seven-state'],
    appearsIn: ['l5-3'],
  },
  {
    id: 'seven-state',
    term: 'Seven-state process transition diagram',
    simple: 'The full map of every state a process can be in and how it moves between them.',
    technical:
      'A diagram showing the seven process states (New, Ready, Running, Blocked, Terminated, Suspended Ready and Suspended Blocked) together with the transitions between them, including swapping between main memory and secondary storage.',
    related: ['ready-state', 'running-state', 'blocked-state', 'swapping'],
    appearsIn: ['l5-3'],
  },
  {
    id: 'swapping',
    term: 'Swapping',
    simple: 'Moving a whole process out of RAM to disk to free memory.',
    technical:
      'The transfer of a process between main memory and secondary storage, performed by the medium-term scheduler to free physical memory. A swapped-out process becomes Suspended Ready or Suspended Blocked.',
    related: ['seven-state', 'medium-term-scheduler', 'virtual-memory'],
    appearsIn: ['l5-3', 'l5-6'],
  },
  {
    id: 'long-term-scheduler',
    term: 'Long-term scheduler',
    simple: 'Decides which jobs get let into memory in the first place.',
    technical:
      'Also called the job scheduler. Selects processes from a pool and loads them into memory, moving them from New to Ready. It controls the degree of multiprogramming and runs least frequently of the three schedulers.',
    related: ['short-term-scheduler', 'medium-term-scheduler'],
    appearsIn: ['l5-6'],
  },
  {
    id: 'short-term-scheduler',
    term: 'Short-term scheduler',
    simple: 'Decides which ready process gets the CPU next.',
    technical:
      'Also called the CPU scheduler. Selects which process in the Ready state receives the CPU next. It is the fastest of the three schedulers and provides less control over the degree of multiprogramming.',
    related: ['long-term-scheduler', 'medium-term-scheduler', 'scheduling-algorithm'],
    appearsIn: ['l5-6'],
  },
  {
    id: 'medium-term-scheduler',
    term: 'Medium-term scheduler',
    simple: 'Decides which processes get swapped out to disk and back.',
    technical:
      'The process swapping scheduler. Swaps processes out of and back into main memory so execution can continue, controlling the degree of multiprogramming. Its speed is between the long-term and short-term schedulers.',
    related: ['swapping', 'long-term-scheduler', 'short-term-scheduler'],
    appearsIn: ['l5-6'],
  },
  {
    id: 'preemptive',
    term: 'Preemptive scheduling',
    simple: 'The OS can take the CPU away from a running process.',
    technical:
      'A scheduling policy in which the operating system has the authority to interrupt a currently running process, pause its execution and allocate the CPU to a different process.',
    example: 'Round Robin, Shortest Remaining Time First, Preemptive Priority.',
    related: ['non-preemptive', 'scheduling-algorithm'],
    appearsIn: ['l5-7'],
  },
  {
    id: 'non-preemptive',
    term: 'Non-preemptive scheduling',
    simple: 'Once a process starts, it keeps the CPU until it chooses to give it up.',
    technical:
      'A scheduling policy in which a process, once allocated the CPU, keeps it until it voluntarily releases it. The OS cannot forcibly interrupt the process.',
    example: 'FCFS, non-preemptive SJF, non-preemptive Priority.',
    related: ['preemptive', 'scheduling-algorithm'],
    appearsIn: ['l5-7'],
  },
  {
    id: 'scheduling-algorithm',
    term: 'Scheduling algorithm',
    simple: 'The rule for choosing which process runs next.',
    technical:
      'A program used by the operating system’s short-term scheduler to determine the order in which processes in the ready queue are executed by the CPU.',
    example: 'FCFS, SJF, SRTF, Priority Scheduling, Round Robin.',
    related: ['fcfs', 'sjf', 'round-robin', 'priority-scheduling'],
    appearsIn: ['l5-8'],
  },
  {
    id: 'fcfs',
    term: 'First Come First Served (FCFS)',
    simple: 'Whoever arrives first, runs first.',
    technical:
      'The simplest, non-preemptive scheduling algorithm. Processes execute in arrival order following the FIFO principle and run to completion. Fair and starvation-free, but suffers the convoy effect and high average waiting time.',
    related: ['scheduling-algorithm', 'convoy-effect'],
    appearsIn: ['l5-8'],
  },
  {
    id: 'convoy-effect',
    term: 'Convoy effect',
    simple: 'One long job at the front makes everyone behind it wait.',
    technical:
      'A performance problem in FCFS scheduling where a long-running process at the head of the ready queue delays all shorter processes behind it, raising average waiting time.',
    related: ['fcfs'],
    appearsIn: ['l5-8'],
  },
  {
    id: 'sjf',
    term: 'Shortest Job First (SJF)',
    simple: 'The quickest job goes first.',
    technical:
      'A scheduling algorithm that selects the process with the shortest burst duration to execute next. In its non-preemptive form a started process runs to completion; the preemptive form is Shortest Remaining Time First (SRTF).',
    related: ['srtf', 'scheduling-algorithm', 'burst-time'],
    appearsIn: ['l5-8'],
  },
  {
    id: 'srtf',
    term: 'Shortest Remaining Time First (SRTF)',
    simple: 'Preemptive SJF: a shorter newcomer can push out whatever is running.',
    technical:
      'The preemptive version of SJF. If a newly arrived process has a shorter remaining time than the running process, the running process is preempted. Gives the best average waiting and turnaround times but requires accurate burst estimates and causes many context switches.',
    related: ['sjf', 'preemptive'],
    appearsIn: ['l5-8'],
  },
  {
    id: 'priority-scheduling',
    term: 'Priority scheduling',
    simple: 'The most important job goes first.',
    technical:
      'A scheduling algorithm in which the process with the highest priority runs first. Available in preemptive and non-preemptive forms. Risks starvation of low-priority processes unless aging is applied.',
    related: ['starvation', 'aging', 'scheduling-algorithm'],
    appearsIn: ['l5-8'],
  },
  {
    id: 'round-robin',
    term: 'Round Robin (RR)',
    simple: 'Everyone gets an equal, small turn, over and over.',
    technical:
      'A preemptive scheduling algorithm in which each process receives a fixed time quantum in circular order from the ready queue. Designed for time-sharing systems; prevents starvation and gives good response time, but performance depends heavily on the quantum size.',
    related: ['time-quantum', 'time-sharing', 'preemptive'],
    appearsIn: ['l5-8'],
  },
  {
    id: 'time-quantum',
    term: 'Time quantum',
    simple: 'The size of the turn each process gets in Round Robin.',
    technical:
      'The fixed amount of CPU time given to each process in one turn under Round Robin scheduling. Too long and RR degenerates into FCFS; too short and context-switching overhead wastes CPU time.',
    related: ['round-robin', 'context-switch'],
    appearsIn: ['l5-8'],
  },
  {
    id: 'starvation',
    term: 'Starvation',
    simple: 'A process that never gets its turn because others keep jumping ahead.',
    technical:
      'A situation in which a process waits indefinitely in the ready queue because higher-priority processes continuously receive the CPU. Aging is the standard solution.',
    related: ['aging', 'priority-scheduling'],
    appearsIn: ['l5-8'],
  },
  {
    id: 'aging',
    term: 'Aging',
    simple: 'Slowly raising the priority of a process that has waited a long time.',
    technical:
      'A technique in which the priority of long-waiting processes is gradually increased (for example, by 1 for every 15 minutes of waiting) so that they eventually run, preventing starvation.',
    related: ['starvation', 'priority-scheduling'],
    appearsIn: ['l5-8'],
  },
  {
    id: 'burst-time',
    term: 'Burst duration (burst time)',
    simple: 'How long a process needs the CPU for.',
    technical: 'The duration for which a process needs to run on the CPU.',
    related: ['arrival-time', 'turnaround-time', 'sjf'],
    appearsIn: ['l5-7'],
  },
  {
    id: 'arrival-time',
    term: 'Arrival time',
    simple: 'The moment a process joins the queue.',
    technical: 'The moment a process enters the ready queue and becomes available to be scheduled for CPU execution.',
    related: ['burst-time', 'turnaround-time'],
    appearsIn: ['l5-7'],
  },
  {
    id: 'turnaround-time',
    term: 'Turnaround time',
    simple: 'Total time from arriving to finishing.',
    technical:
      'The total time taken from the moment a process arrives in the system until it is completely finished. Turnaround = Completion time − Arrival time.',
    related: ['waiting-time', 'response-time', 'burst-time'],
    appearsIn: ['l5-7'],
  },
  {
    id: 'waiting-time',
    term: 'Waiting time',
    simple: 'How long the process sat in the queue doing nothing.',
    technical:
      'The total time a process spends waiting in the ready queue before using the CPU. Waiting = Turnaround time − Burst duration.',
    related: ['turnaround-time', 'response-time'],
    appearsIn: ['l5-7'],
  },
  {
    id: 'response-time',
    term: 'Response time',
    simple: 'How long until the process first shows any sign of life.',
    technical:
      'The duration from when a process is first submitted until the very first response or output is produced.',
    related: ['waiting-time', 'turnaround-time'],
    appearsIn: ['l5-7'],
  },
  {
    id: 'throughput',
    term: 'Throughput',
    simple: 'How many jobs get finished per unit of time.',
    technical: 'The number of processes that the CPU completes within a specific unit of time.',
    related: ['turnaround-time'],
    appearsIn: ['l5-7'],
  },
  {
    id: 'gantt-chart',
    term: 'Gantt chart',
    simple: 'A timeline strip showing which process ran when.',
    technical:
      'In process scheduling, a chart illustrating the order and duration of process execution over time, used to derive completion, turnaround and waiting times.',
    related: ['scheduling-algorithm'],
    appearsIn: ['l5-8'],
  },
  {
    id: 'virtual-memory',
    term: 'Virtual memory',
    simple: 'Pretending you have more RAM than you really do, by borrowing disk space.',
    technical:
      'A memory management technique in which the OS uses part of secondary storage as an extension of RAM, giving each process a large logical address space and allowing programs larger than physical memory to run.',
    related: ['paging', 'page', 'ram', 'thrashing'],
    appearsIn: ['l6-3'],
  },
  {
    id: 'paging',
    term: 'Paging',
    simple: 'Chopping memory into equal blocks so a program need not sit in one unbroken piece.',
    technical:
      'A memory management technique in which logical memory is divided into fixed-size pages and physical memory into equally sized frames. Pages are placed into any free frames, eliminating the need for contiguous allocation and removing external fragmentation.',
    related: ['page', 'frame', 'page-table', 'virtual-memory'],
    appearsIn: ['l6-3'],
  },
  {
    id: 'page',
    term: 'Page',
    simple: 'One fixed-size block of a program’s virtual memory.',
    technical:
      'A fixed-size block of logical (virtual) memory. Page sizes are powers of two, typically 4 KB, 8 KB or 16 KB. The last page of a program may be partly empty, causing internal fragmentation.',
    related: ['frame', 'paging', 'offset'],
    appearsIn: ['l6-3'],
  },
  {
    id: 'frame',
    term: 'Frame',
    simple: 'One fixed-size block of real, physical RAM.',
    technical:
      'A fixed-size block of physical memory into which a page is loaded. Frame size always equals page size, so a page fits exactly into a frame.',
    related: ['page', 'paging', 'page-table'],
    appearsIn: ['l6-3'],
  },
  {
    id: 'page-table',
    term: 'Page table',
    simple: 'A lookup table saying which frame each page is currently sitting in.',
    technical:
      'A per-process data structure maintained by the operating system that maps virtual page numbers to physical frame numbers. Each entry (PTE) holds a frame number, a present/absent bit, and control bits such as dirty and referenced bits.',
    related: ['page', 'frame', 'mmu', 'page-fault'],
    appearsIn: ['l6-4'],
  },
  {
    id: 'offset',
    term: 'Offset (displacement)',
    simple: 'How far into the page the byte you want sits.',
    technical:
      'The part of an address specifying the position of a particular byte within a page or frame. Because page size equals frame size, the offset is never changed during address translation.',
    related: ['page', 'frame', 'address-translation'],
    appearsIn: ['l6-4'],
  },
  {
    id: 'address-translation',
    term: 'Address translation',
    simple: 'Turning the address a program uses into a real address in RAM.',
    technical:
      'The process of converting a logical (virtual) address generated by the CPU into the corresponding physical address, by replacing the page number with the frame number from the page table while preserving the offset. Performed by the MMU.',
    related: ['mmu', 'page-table', 'offset'],
    appearsIn: ['l6-4'],
  },
  {
    id: 'mmu',
    term: 'Memory Management Unit (MMU)',
    simple: 'The hardware (inside the CPU on modern computers) that converts virtual addresses to real ones.',
    technical:
      'A hardware component responsible for handling memory access requests and managing memory resources. Its functions are address translation, memory protection, relocation, virtual memory support and access control.',
    related: ['address-translation', 'page-table', 'tlb'],
    appearsIn: ['l6-4'],
  },
  {
    id: 'tlb',
    term: 'Translation Lookaside Buffer (TLB)',
    simple: 'A tiny cache of recently used page-table rows, so lookups are faster.',
    technical:
      'A small, very fast memory cache storing recently used page table entries so the CPU can find frame numbers quickly. Finding an entry there is called a TLB hit; TLBs greatly reduce page table lookups.',
    related: ['page-table', 'mmu'],
    appearsIn: ['l6-5'],
  },
  {
    id: 'page-fault',
    term: 'Page fault',
    simple: 'The program asked for a page that is not in RAM right now.',
    technical:
      'An interrupt raised when a program accesses a page whose present/absent bit is 0, meaning the page is not currently in main memory. The OS loads the required page from secondary storage and execution resumes.',
    related: ['demand-paging', 'page-table', 'thrashing'],
    appearsIn: ['l6-5'],
  },
  {
    id: 'demand-paging',
    term: 'Demand paging',
    simple: 'Only load a page into RAM at the moment it is actually needed.',
    technical:
      'A virtual memory scheme in which pages are not loaded into RAM until the program actually references them, avoiding the loading of unnecessary pages and reducing RAM usage.',
    related: ['page-fault', 'virtual-memory'],
    appearsIn: ['l6-5'],
  },
  {
    id: 'thrashing',
    term: 'Thrashing',
    simple: 'The system spends all its time swapping pages instead of doing work.',
    technical:
      'A condition in which excessive swapping between main memory and secondary storage occurs because physical memory is insufficient, so the CPU spends most of its time servicing page faults rather than executing processes.',
    related: ['page-fault', 'virtual-memory'],
    appearsIn: ['l6-5'],
  },
  {
    id: 'present-bit',
    term: 'Present/absent bit',
    simple: 'A single bit saying "is this page in RAM right now?"',
    technical:
      'A bit in a page table entry indicating whether the corresponding page is currently loaded in physical memory. 1 means resident and valid; 0 means not in RAM, and accessing it raises a page fault.',
    related: ['page-table', 'page-fault'],
    appearsIn: ['l6-4'],
  },
  {
    id: 'dirty-bit',
    term: 'Dirty bit',
    simple: 'A bit that says "this page was changed, so save it before removing it".',
    technical:
      'A page table bit set when a page is modified in memory, indicating that the updated data must be written back to disk before the page is replaced.',
    related: ['page-table'],
    appearsIn: ['l6-4'],
  },
  {
    id: 'bus-width',
    term: 'Bus width',
    simple: 'How many address lines there are, which caps how much memory you can reach.',
    technical:
      'The number of address lines in the address bus. The maximum addressable memory equals 2^(bus width) bytes on a byte-addressable machine, and the maximum length of a memory address equals the bus width.',
    related: ['address-bus', 'addressable-memory'],
    appearsIn: ['l6-2'],
  },
  {
    id: 'addressable-memory',
    term: 'Addressable memory',
    simple: 'The largest amount of memory the CPU can reach at all.',
    technical:
      'The total amount of memory a computer’s architecture can address. On byte-addressable machines every individual byte has a unique address, and capacity = 2^(number of address bits) bytes.',
    related: ['bus-width', 'address-bus'],
    appearsIn: ['l6-2'],
  },
  {
    id: 'address-bus',
    term: 'Address bus',
    simple: 'The wires that carry "which memory location do I want" from the CPU.',
    technical:
      'A unidirectional part of the system bus that carries memory addresses from the CPU to memory or I/O devices. The number of address lines determines the maximum addressable memory.',
    related: ['data-bus', 'control-bus', 'bus-width'],
    appearsIn: ['l6-2'],
  },
  {
    id: 'data-bus',
    term: 'Data bus',
    simple: 'The wires that carry the actual data.',
    technical:
      'A bidirectional part of the system bus that transfers actual data between the CPU, memory and I/O devices. Its width (8, 16, 32, 64 bits) determines how many bits can be transferred at once.',
    related: ['address-bus', 'control-bus'],
    appearsIn: ['l6-2'],
  },
  {
    id: 'control-bus',
    term: 'Control bus',
    simple: 'The wires that carry "read now", "write now" and other commands.',
    technical:
      'The part of the system bus that carries control signals (Read, Write, Interrupt, Clock and Reset) coordinating system operations and synchronising hardware components.',
    related: ['address-bus', 'data-bus'],
    appearsIn: ['l6-2'],
  },
  {
    id: 'device-driver',
    term: 'Device driver',
    simple: 'A translator that lets the OS talk to one particular piece of hardware.',
    technical:
      'System software allowing the operating system to communicate with a hardware device by translating general OS instructions into device-specific commands. Without a driver, the OS cannot use the device.',
    related: ['device-controller', 'plug-and-play'],
    appearsIn: ['l7-1', 'l7-2'],
  },
  {
    id: 'device-controller',
    term: 'Device controller',
    simple: 'The electronics that physically drive a device.',
    technical:
      'A hardware component acting as an interface between the computer system and a specific hardware device. It controls device operations, receives commands from the OS, and transfers data between the device and memory.',
    related: ['device-driver'],
    appearsIn: ['l7-1'],
  },
  {
    id: 'plug-and-play',
    term: 'Plug and Play (PnP)',
    simple: 'Plug the device in and it just works: the OS finds the driver itself.',
    technical:
      'A technology supported by modern operating systems that automatically detects a newly connected device, finds the correct driver and installs it without manual intervention.',
    related: ['device-driver'],
    appearsIn: ['l7-2'],
  },
  {
    id: 'drive-letter',
    term: 'Drive letter',
    simple: 'The letter Windows uses to name each drive, like C: or D:.',
    technical:
      'A single alphabetical label followed by a colon, assigned by the operating system (especially Windows) to identify a storage device or partition. Limited to 26 letters; A: and B: were historically reserved for floppy drives.',
    related: ['partitioning'],
    appearsIn: ['l7-2'],
  },
  {
    id: 'spooling',
    term: 'Spooling',
    simple: 'Queueing jobs on disk so a slow device can work through them while the CPU carries on.',
    technical:
      'Simultaneous Peripheral Operations On-Line: a technique in which I/O data from multiple processes is queued in secondary storage so a peripheral device can process jobs sequentially while the CPU continues executing other processes.',
    example: 'Printer spooling: multiple print jobs are stored in spool files on disk and printed in turn.',
    related: ['buffering', 'device-driver'],
    appearsIn: ['l7-3'],
  },
  {
    id: 'buffering',
    term: 'Buffering',
    simple: 'A small holding area in RAM that smooths out speed differences.',
    technical:
      'The temporary storage of data in a memory area called a buffer while it is transferred between two devices or processes operating at different speeds. Uses main memory and handles small amounts of data, unlike spooling which uses disk.',
    related: ['spooling'],
    appearsIn: ['l7-3'],
  },
  {
    id: 'resource-management',
    term: 'Resource management',
    simple: 'The OS keeping track of who is using what, and handing things out fairly.',
    technical:
      'An operating system function that manages computing resources by tracking their usage and handling permissions to grant or revoke access as needed.',
    related: ['os', 'process'],
    appearsIn: ['l2-1'],
  },
  {
    id: 'io-bound',
    term: 'I/O bound process',
    simple: 'A process that spends most of its time waiting for the disk or network.',
    technical:
      'A process that spends more time waiting for input/output operations than performing computation.',
    example: 'Copying a large file, loading a web page.',
    related: ['cpu-bound', 'process'],
    appearsIn: ['l5-1'],
  },
  {
    id: 'cpu-bound',
    term: 'CPU bound process',
    simple: 'A process that spends most of its time calculating.',
    technical:
      'A process that spends most of its time performing computations and requires more CPU processing time than I/O.',
    example: 'Complex calculations, video rendering.',
    related: ['io-bound', 'process'],
    appearsIn: ['l5-1'],
  },
]

export const glossaryById = new Map(glossary.map((g) => [g.id, g]))
