import type { Module } from '@/types/content'

export const m4: Module = {
  id: 'm4',
  title: 'Storage allocation, file systems and security',
  shortTitle: 'Storage',
  description:
    'The three ways an OS can lay a file out on a disk, the file systems that implement them, what fragmentation costs you, and how files are kept safe.',
  accent: 'cyan',
  syllabusRefs: ['5.2'],
  lessons: [
    /* ================= l4-1 ================= */
    {
      id: 'l4-1',
      moduleId: 'm4',
      title: 'Disk allocation methods',
      summary:
        'Contiguous, linked and indexed allocation — three answers to "where do I put the blocks of this file?", each with a different price.',
      whyItMatters:
        'This is the heart of competency 5.2. Questions ask you to explain each method and compare them, and the comparison table is only memorable if you understand the trade-off driving it.',
      objectives: [
        'Explain contiguous, linked and indexed allocation',
        'Say what a directory entry stores under each method',
        'State the advantages and disadvantages of each',
        'Define external fragmentation and explain which method causes it',
      ],
      prerequisites: ['l3-4'],
      minutes: 14,
      syllabusRefs: ['5.2'],
      keyTerms: [
        'contiguous-allocation',
        'linked-allocation',
        'indexed-allocation',
        'external-fragmentation',
      ],
      blocks: [
        {
          kind: 'prose',
          paragraphs: [
            'A file is a sequence of blocks. The OS must decide **where on the disk those blocks go**, and record enough information to find them again. There are three main methods, and each buys speed, flexibility or reliability at the cost of the other two.',
            'Where that information gets recorded is the file’s **[[directory-entry|directory entry]]** — the row its folder keeps for it. Each of the three methods puts something different in that row, and comparing what they store is the fastest way to tell them apart.',
          ],
        },
        {
          kind: 'viz',
          viz: 'diskAllocation',
          title: 'The same three files, laid out three different ways',
          caption:
            'Switch between the methods. In contiguous, try the "after months of use" button.',
        },
        { kind: 'heading', text: '1. Contiguous allocation' },
        {
          kind: 'prose',
          paragraphs: [
            'A file is stored in **one continuous run of memory locations**. This technique needs to keep track of unused disk space. Accessing such a file is called sequential access, and the directory entry stores the file name, the starting block and (optionally) the length.',
          ],
        },
        {
          kind: 'list',
          title: 'Advantages',
          style: 'check',
          items: [
            'Very fast access — direct access is possible',
            'Simple to implement',
            'No overhead (no extra memory used storing pointers rather than actual file data)',
            'The movements of the hard disk head are low',
            'File size is equal to the storage size of the file',
          ],
        },
        {
          kind: 'list',
          title: 'Disadvantages',
          style: 'cross',
          items: ['External fragmentation occurs', 'Increasing the file size is difficult'],
        },
        {
          kind: 'definition',
          term: 'External fragmentation',
          simple: 'Free space exists, but it is broken into pieces too small to be useful.',
          technical:
            'The condition in which free storage space is split into many small, non-contiguous blocks, so that a large block of memory or disk space cannot be allocated even though the total free space is sufficient.',
        },
        { kind: 'heading', text: '2. Linked allocation' },
        {
          kind: 'prose',
          paragraphs: [
            'A file is stored as a **linked list of blocks scattered across the disk**. Each block contains data plus a pointer to the next block. Blocks can be anywhere on the disk, or adjacent — it makes no difference. This is used in **[[fat|FAT]]** systems, where it is called FAT chaining.',
          ],
        },
        {
          kind: 'list',
          title: 'Advantages',
          style: 'check',
          items: [
            'No external fragmentation occurs',
            'File size can be easily adjusted — files grow easily',
            'Efficient use of disk space',
          ],
        },
        {
          kind: 'list',
          title: 'Disadvantages',
          style: 'cross',
          items: [
            'Slow access — sequential only',
            'Pointer storage overhead (space in every block goes to the pointer, not data)',
            'Risk of data loss if a pointer is corrupted',
          ],
        },
        { kind: 'heading', text: '3. Indexed allocation' },
        {
          kind: 'prose',
          paragraphs: [
            'All block addresses of a file are stored in a **separate index block**. Each file has its own index block containing the addresses of all its data blocks, and the data blocks themselves can be anywhere on the disk. This is used in **UNIX/Linux file systems**.',
          ],
        },
        {
          kind: 'list',
          title: 'Advantages',
          style: 'check',
          items: [
            'No external fragmentation occurs',
            'Direct access and random access are both possible',
            'Files can grow dynamically',
            'No corruption cascade — all indexes are in the index block',
          ],
        },
        {
          kind: 'list',
          title: 'Disadvantages',
          style: 'cross',
          items: ['Extra space needed for the index block', 'Index block size limits file size'],
        },
        {
          kind: 'callout',
          tone: 'info',
          title: 'What the directory entry has to hold',
          text: 'A directory entry always stores the file **name**. Beyond that, it stores exactly what the allocation method needs in order to find the data again: contiguous needs a **starting block and a length** (the blocks run consecutively from there), linked needs only a **starting block** (each block points to the next), and indexed needs the address of the **index block** (which lists every data block). If you can reconstruct that column, you can reconstruct the whole table.',
        },
        {
          kind: 'compare',
          title: 'The comparison table you need',
          headers: ['Feature', 'Contiguous', 'Linked', 'Indexed'],
          rows: [
            [
              'Storage method',
              'File stored in continuous blocks',
              'Blocks linked using pointers',
              'Index block stores the addresses of all file blocks',
            ],
            ['Access speed', 'Very fast', 'Slow', 'Fast'],
            [
              'Directory entry',
              'File name + starting block + length (optional)',
              'File name + starting block + size',
              'File name + index block',
            ],
            ['Block placement', 'Adjacent blocks', 'Anywhere on disk', 'Anywhere on disk'],
            ['Fragmentation', '**External**', 'No', 'No'],
            ['File growth', 'Difficult', 'Easy', 'Easy'],
            [
              'Overhead',
              'No pointer overhead',
              'A pointer stored in each block',
              'One index block required per file',
            ],
            ['Reliability', 'High', 'Pointer corruption risk', 'Safer than linked'],
            ['Implementation complexity', 'Simple', 'Moderate', 'More complex'],
            [
              'Best used when',
              'File size is fixed',
              'Files grow frequently',
              'Large files needing random access',
            ],
          ],
        },
        {
          kind: 'analogy',
          title: 'Three ways to store a book',
          everyday:
            '**Contiguous** is keeping all 300 pages bound together on one shelf — instant to read, but if you want to add a chapter there had better be a gap of exactly the right size. **Linked** is writing each page on a separate card, with a note at the bottom saying which drawer the next page is in — you can add pages forever, but reading page 200 means walking through 199 drawers. **Indexed** is keeping the pages loose but writing a contents list saying exactly which drawer each page is in — one look at the list and you go straight there.',
          mapsTo:
            'Contiguous = fast but inflexible. Linked = flexible but sequential. Indexed = flexible AND direct, at the cost of one extra block per file.',
        },
        {
          kind: 'misconception',
          wrong: 'Linked allocation causes external fragmentation because the blocks are scattered.',
          right:
            'Scattered blocks are exactly what **prevents** external fragmentation. Linked allocation can use any free block anywhere, so no free space is ever unusable. Only **contiguous** allocation suffers external fragmentation, because only contiguous allocation demands an unbroken run.',
          why: 'Remember the direction: fragmentation is a problem for methods that need space *together*. Methods that do not care where blocks go cannot be defeated by scattered free space.',
        },
        {
          kind: 'recall',
          prompt:
            'Which allocation method causes external fragmentation, and precisely why?',
          answer:
            'Contiguous allocation. It requires the whole file to occupy one unbroken run of blocks, so when deletions leave scattered gaps, a large file may not fit even though enough total free space exists.',
        },
        {
          kind: 'teachBack',
          prompt:
            'Explain to a classmate why linked allocation gives slow access, using the idea of a pointer.',
          checklist: [
            'You said each block contains data plus a pointer to the next block',
            'You said there is no way to jump directly to block N',
            'You said you must start at the first block and follow the chain',
            'You mentioned this makes it sequential access only',
            'You connected it to the directory entry only storing the starting block',
          ],
        },
        {
          kind: 'quickCheck',
          questionIds: ['q4-1-1', 'q4-1-2', 'q4-1-3', 'q4-1-4', 'q4-1-5'],
        },
      ],
      takeaways: [
        'Contiguous: one unbroken run. Fast, no overhead, but external fragmentation and hard to grow.',
        'Linked: pointer in each block. No external fragmentation, easy growth, but sequential access only and pointer corruption risk.',
        'Indexed: one index block per file. Direct + random access, dynamic growth, but an extra block and file size capped by index size.',
        'Only contiguous allocation suffers external fragmentation.',
      ],
    },

    /* ================= l4-2 ================= */
    {
      id: 'l4-2',
      moduleId: 'm4',
      title: 'File systems and FAT chaining',
      summary:
        'What a file system actually does, the main ones you should know, and the FAT-chain calculation that turns up in MCQs.',
      whyItMatters:
        'FAT chaining questions are worth marks and are entirely mechanical — but only if you chain correctly and remember to multiply by block size. Both halves trip students up.',
      objectives: [
        'Define a file system and state what it stores and decides',
        'Describe FAT and NTFS and compare them',
        'Solve FAT chaining problems to find the directory entry and disk space allocated',
      ],
      prerequisites: ['l4-1'],
      minutes: 14,
      syllabusRefs: ['5.2'],
      keyTerms: ['file-system', 'fat', 'ntfs', 'metadata'],
      blocks: [
        {
          kind: 'definition',
          term: 'File system',
          simple: 'The OS’s scheme for storing files on a disk and finding them again.',
          technical:
            'A method that an operating system uses to control how data is stored and retrieved on a storage device.',
        },
        {
          kind: 'list',
          title: 'What every file system does',
          items: [
            'Stores **[[metadata|metadata]]** such as file name, size, type, permissions, creation date and modification date',
            'Decides how disk space is assigned to files — contiguous, linked or indexed allocation',
            'Imposes limits on maximum file size, partition size, and number of files',
            'Advanced file systems also support file permissions, encryption and access control lists (ACLs)',
            'Modern file systems are designed to improve speed, reliability and efficient storage usage',
          ],
        },
        { kind: 'heading', text: 'FAT — File Allocation Table' },
        {
          kind: 'prose',
          paragraphs: [
            '**[[fat|FAT]]** was developed for MS-DOS to manage file storage using a File Allocation Table that tracks where files are stored on a disk. It is linked allocation, implemented as a table.',
            'The FAT table and the root directory are placed at **fixed locations**, so the system can find boot files during startup. To prevent data loss, **two copies of the FAT are kept**, allowing one to serve as a backup if the other is damaged.',
            'Its defining quality is universal compatibility. Because of its simplicity and long history, FAT is supported by almost every operating system and a huge number of devices — digital cameras, printers, smart TVs, gaming consoles, car infotainment systems. Many storage devices arrive preformatted with FAT.',
          ],
        },
        { kind: 'heading', text: 'FAT chaining — how the questions work' },
        {
          kind: 'callout',
          tone: 'info',
          title: 'The two rules every FAT question states',
          text: 'i. The last block of a file is indicated by **−1**.  ii. The **[[directory-entry|directory entry]]** of a file contains the block number of the **first block** of the file.',
        },
        {
          kind: 'viz',
          viz: 'fatChain',
          title: 'Follow a chain yourself',
          caption:
            'Click through hop by hop. Notice how rows that are not on the chain belong to other files entirely.',
        },
        {
          kind: 'worked',
          title: 'A typical FAT chaining MCQ',
          problem:
            'The block size of a disk is 8 KB. A portion of its FAT shows: 310→311, 311→315, 312→−1, 313→314, 314→316, 315→−1. Which gives the directory entry for `report.txt` and the disk space allocated to it, if the file starts at block 310?',
          steps: [
            {
              title: 'Step 1 — identify the directory entry',
              detail:
                'By rule ii, the directory entry is the block number of the FIRST block, which is 310. (Not the last, not the largest.)',
            },
            {
              title: 'Step 2 — follow the chain from 310',
              detail: '310 → 311. Look up 311: → 315. Look up 315: → −1, so 315 is the last block.',
            },
            {
              title: 'Step 3 — count the blocks used',
              detail:
                'The chain is 310, 311, 315 = 3 blocks. Rows 312, 313 and 314 are not on this chain — they belong to other files and must be ignored.',
            },
            {
              title: 'Step 4 — multiply by the block size',
              detail: '3 blocks × 8 KB = 24 KB',
            },
          ],
          answer: 'Directory entry = 310; disk space allocated = 24 KB.',
        },
        {
          kind: 'misconception',
          wrong: 'A `−1` anywhere in the visible table marks the end of the file I am tracing.',
          right:
            'A `−1` marks the end of **some** file. If it is not reached by following your chain, it belongs to a different file. In the worked example, block 312 holds −1 but is irrelevant to `report.txt`.',
          why: 'Always trace the chain from the given starting block. Never scan the table for −1 and work backwards.',
        },
        { kind: 'heading', text: 'NTFS and the others' },
        {
          kind: 'prose',
          paragraphs: [
            '**[[ntfs|NTFS]]** (New Technology File System) was developed by Microsoft and first introduced in 1993 with Windows NT 3.1. It is an improved version of FAT, designed to replace it because of FAT’s limitations in file size and performance.',
          ],
        },
        {
          kind: 'list',
          title: 'What NTFS improves on FAT',
          style: 'check',
          items: [
            'Uses a **Master File Table (MFT)** to store information about all files and directories',
            'Keeps backup copies of critical file system data structures to improve fault tolerance',
            'Can automatically recover from certain disk errors',
            'Provides stronger security through file permissions and encryption',
            'Supports built-in file and folder compression to save disk space',
            'Supports Unicode, and handles larger hard drives more efficiently',
            'Supports very large file and partition sizes — far beyond FAT32’s 4 GB file limit',
          ],
        },
        {
          kind: 'table',
          title: 'Other file systems worth naming',
          headers: ['File system', 'Introduced', 'Notes'],
          rows: [
            ['**exFAT**', '—', 'An extended FAT designed for large files on flash media, keeping FAT’s compatibility.'],
            [
              '**HFS+**',
              '1998, macOS',
              'Uses B-tree structures for file management; designed for older Mac systems. NTFS provides more built-in security and advanced capability.',
            ],
            [
              '**APFS**',
              '2017, Apple systems',
              'Optimised for SSDs with copy-on-write, snapshots and encryption. NTFS focuses more on compatibility and enterprise features.',
            ],
            [
              '**ReiserFS**',
              '2001, Linux',
              'A journaling file system using a B*-tree structure for efficient storage, especially of small files — unlike NTFS which uses an MFT.',
            ],
          ],
        },
        {
          kind: 'examTip',
          text: 'In a FAT chaining question, do the two things students forget: (1) the answer for "directory entry" is the FIRST block, and (2) the space answer must be blocks × block size, not the number of blocks.',
        },
        {
          kind: 'quickCheck',
          questionIds: ['q4-2-1', 'q4-2-2', 'q4-2-3', 'q4-2-4'],
        },
      ],
      takeaways: [
        'A file system controls how data is stored and retrieved, stores metadata, and decides the allocation method.',
        'FAT uses linked allocation via a table; two copies are kept; it is universally compatible.',
        'FAT chaining: directory entry = first block; follow the chain to −1; space = blocks × block size.',
        'NTFS uses a Master File Table and adds permissions, encryption, compression, fault tolerance and large file support.',
      ],
    },

    /* ================= l4-3 ================= */
    {
      id: 'l4-3',
      moduleId: 'm4',
      title: 'Fragmentation, defragmentation and compaction',
      summary:
        'Why a disk gets slower over time, what defragmentation does about it, and the closely-related process that is not the same thing.',
      whyItMatters:
        'Defragmentation vs compaction is a classic "compare these two" question, and the answers are genuinely different: one targets files, the other targets free space.',
      objectives: [
        'Explain how disk fragmentation occurs and its drawbacks',
        'Describe defragmentation and what it achieves',
        'Distinguish defragmentation from disk compaction',
      ],
      prerequisites: ['l4-1'],
      minutes: 10,
      syllabusRefs: ['5.2'],
      keyTerms: ['defragmentation', 'compaction', 'external-fragmentation'],
      blocks: [
        {
          kind: 'prose',
          paragraphs: [
            '**Disk fragmentation** occurs when a file is stored in non-contiguous blocks. Instead of being saved in one continuous sequence of storage locations, parts of the file are scattered across different areas of the disk.',
            'It happens naturally over time. If a new file is too large to fit into one continuous free space, the OS splits it into smaller parts and stores them wherever space is available. And as files are deleted, gaps appear — new files may not fit perfectly into those gaps, so the system splits them to fit the available spaces.',
          ],
        },
        {
          kind: 'callout',
          tone: 'info',
          title: 'Which allocation methods suffer this?',
          text: 'Contiguous allocation leads to fragmentation over time because it needs unbroken runs. In the other allocation methods fragmentation is not a problem, because they save file blocks in scattered places by design.',
        },
        {
          kind: 'viz',
          viz: 'defragmentation',
          title: 'Before and after',
          caption: 'Press the button and watch the three files gather themselves together.',
        },
        {
          kind: 'list',
          title: 'Drawbacks of disk fragmentation',
          style: 'number',
          items: [
            '**Slower performance** — the read/write head must move to different locations to access scattered file parts, increasing seek time.',
            '**Longer file access time** — opening, saving or modifying files takes more time; large files are especially affected.',
            '**Inefficient use of space** — free space becomes broken into small pieces, making it harder to store large files.',
            '**Need for defragmentation** — periodic defragmentation consumes time and system resources.',
            '**Increased backup and scanning time** — backup software and antivirus programs must access many scattered locations to read a single file.',
          ],
        },
        { kind: 'heading', text: 'Defragmentation' },
        {
          kind: 'definition',
          term: 'Disk defragmentation',
          simple: 'Rearranging a disk so each file’s pieces sit next to each other again.',
          technical:
            'The process of reorganising data on a storage drive so that pieces of the same file are stored next to each other instead of being scattered across the disk.',
        },
        {
          kind: 'list',
          title: 'What defragmentation does',
          style: 'check',
          items: [
            'Rearranges fragmented data',
            'Places related file pieces together',
            'Organises free space more efficiently',
            'Reduces external fragmentation',
            'Improves disk access performance (on HDDs), file access speed, program loading and overall system performance',
          ],
        },
        {
          kind: 'compare',
          title: 'Defragmentation vs compaction',
          headers: ['Feature', 'Disk defragmentation', 'Disk compaction'],
          rows: [
            [
              'Main goal',
              'Arrange fragmented file blocks into contiguous order',
              'Remove free-space gaps',
            ],
            ['Focus', '**File blocks**', '**Free space**'],
            [
              'Used in',
              'Mainly hard disk drives (HDDs)',
              'Memory management, databases, storage systems',
            ],
            [
              'Data movement',
              'Rearranges file fragments to be stored together',
              'Moves data blocks to remove empty spaces',
            ],
            [
              'Performance impact',
              'Directly improves read/write speed on HDDs',
              'Improves efficiency; may indirectly improve performance',
            ],
            ['Creates contiguous files?', 'Yes — that is the main objective', 'Not necessarily'],
            [
              'Free space handling',
              'May consolidate free space as a side effect',
              'Creates one large contiguous free space — the main objective',
            ],
          ],
        },
        {
          kind: 'keyIdea',
          text: 'Defragmentation may consolidate free space as a side effect, but compaction does not necessarily defragment files. Different targets, overlapping results.',
        },
        {
          kind: 'list',
          title: 'Disadvantages of defragmentation',
          style: 'cross',
          items: [
            'Very time-consuming',
            'Causes system slowdown while it runs',
            'Carries a risk of data loss',
            'Not suitable for live systems in use',
          ],
        },
        {
          kind: 'misconception',
          wrong: 'You should defragment an SSD regularly to keep it fast.',
          right:
            'Never defragment an SSD. Defragmentation exists to reduce **seek time** — the physical movement of a read/write head. An SSD has no moving head, so there is nothing to gain, and the extra writes shorten its lifespan.',
        },
        {
          kind: 'recall',
          prompt:
            'In one sentence each: what does defragmentation focus on, and what does compaction focus on?',
          answer:
            'Defragmentation focuses on file blocks — putting each file’s pieces back into contiguous order. Compaction focuses on free space — merging scattered gaps into one large continuous free area.',
        },
        {
          kind: 'quickCheck',
          questionIds: ['q4-3-1', 'q4-3-2', 'q4-3-3'],
        },
      ],
      takeaways: [
        'Fragmentation happens when files are stored in non-contiguous blocks; it increases seek time.',
        'Defragmentation rearranges file blocks into contiguous order — HDDs only, never SSDs.',
        'Compaction merges scattered free space into one large continuous region.',
        'Defragmentation targets file blocks; compaction targets free space.',
      ],
    },

    /* ================= l4-4 ================= */
    {
      id: 'l4-4',
      moduleId: 'm4',
      title: 'Partitioning, formatting, backups and recovery',
      summary:
        'Preparing a disk to hold files, splitting it into logical drives, and the two things that stand between you and permanent data loss.',
      whyItMatters:
        '"Briefly describe the need for disk formatting" is a named learning outcome. Backups and recovery also give you concrete, easy-to-remember advantage/disadvantage lists worth full marks.',
      objectives: [
        'Explain disk partitioning, its purposes and drawbacks',
        'Explain disk formatting, its purpose and side effects',
        'Describe backups and data recovery, with advantages and disadvantages',
      ],
      prerequisites: ['l4-3'],
      minutes: 12,
      syllabusRefs: ['5.2'],
      keyTerms: ['partitioning', 'formatting', 'backup', 'data-recovery', 'secondary-storage'],
      blocks: [
        { kind: 'heading', text: 'Disk partitioning' },
        {
          kind: 'definition',
          term: 'Disk partitioning',
          simple: 'Splitting one physical drive into several logical drives.',
          technical:
            'Dividing the same physical storage device into several logical parts for ease of handling. Each partition is given a separate drive letter, and partitioning can be done on HDDs, SSDs and other storage devices.',
        },
        {
          kind: 'compare',
          headers: ['Purpose / advantage', 'Detail'],
          rows: [
            ['Improve data management', 'Easier backup, formatting and maintenance of specific sections.'],
            ['Enhance security', 'If one partition is corrupted or infected, others may remain unaffected.'],
            ['Optimise performance', 'Some systems perform better when system and user data are separated.'],
            ['Organise data', 'Separate system files, applications and personal files.'],
            [
              'Multiple operating systems',
              'Run Windows and Linux on the same computer.',
            ],
            [
              'File system flexibility',
              'Different partitions can use different file systems — NTFS, FAT32, EXT4.',
            ],
            [
              'Easier backup & recovery',
              'Format the system partition without deleting personal files.',
            ],
          ],
        },
        {
          kind: 'list',
          title: 'Disadvantages of partitioning',
          style: 'cross',
          items: [
            '**Space management problems** — if one partition fills up you cannot use free space from another unless you resize it',
            '**More complex setup** — requires planning and technical knowledge',
            '**Risk of data loss** — incorrect partitioning can delete existing data',
            '**Limited flexibility after setup** — changing partition sizes later can be difficult',
            '**Slight performance overhead** — improper partition alignment can reduce SSD performance',
          ],
        },
        { kind: 'heading', text: 'Disk formatting' },
        {
          kind: 'definition',
          term: 'Disk formatting',
          simple: 'Preparing a drive to hold files by setting up a file system on it.',
          technical:
            'The process of preparing a storage device — HDD, SSD, USB flash drive or memory card — for data storage. It involves initialising the storage medium and creating a file system that the operating system can use to organise and store data.',
        },
        {
          kind: 'list',
          title: 'Purpose of disk formatting',
          items: [
            'Prepare a new disk for use',
            'Remove viruses or corrupted data',
            'Change file system type',
            'Fix disk errors',
            'Improve performance in some cases',
          ],
        },
        {
          kind: 'list',
          title: 'Side effects',
          style: 'cross',
          items: [
            'Data loss, if not backed up first',
            'Improper formatting can damage partitions',
            'Frequent formatting may slightly reduce SSD lifespan',
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'Formatting is not the same as wiping',
          text: '**Drive wipe software** permanently deletes all data on a storage device by overwriting it multiple times, making recovery nearly impossible. Unlike formatting, wiping destroys data completely. Its purposes: securely disposing of old computers, protecting sensitive information, meeting data-security compliance standards, and preventing data recovery by unauthorised people. Example: DBAN (Darik’s Boot and Nuke).',
        },
        { kind: 'heading', text: 'Backups' },
        {
          kind: 'definition',
          term: 'Backup',
          simple: 'A spare copy of your data, kept somewhere else.',
          technical:
            'A copy of data stored separately from the original location to protect against data loss.',
        },
        {
          kind: 'compare',
          headers: ['Advantages', 'Disadvantages'],
          rows: [
            ['Protection from hardware failure', 'Storage cost — devices, cloud subscriptions, maintenance'],
            ['Recovery from accidental deletion', 'Time consumption — large backups may take hours or days'],
            ['Protection against ransomware', 'Storage space required — extra systems or cloud space'],
            ['Business continuity', 'Security risk if the backup is not encrypted'],
            ['Disaster recovery', 'Management complexity — requires monitoring, updating and testing'],
            ['—', 'Possible backup failure if not checked regularly'],
          ],
        },
        {
          kind: 'list',
          title: 'How large companies use backups',
          items: [
            '**Redundancy** — data is stored in multiple servers (replication)',
            '**Distributed data centres** — data is copied across multiple global data centres',
            '**Automated backup systems** — regularly scheduled, without manual intervention',
            '**Incremental backups** — only changed data is backed up, to save space',
            '**Disaster recovery plans** — if one data centre fails, another takes over immediately, ensuring high availability and minimal downtime',
          ],
        },
        {
          kind: 'table',
          headers: ['Personal backup software', 'Enterprise backup software', 'Cloud backup'],
          rows: [
            [
              'Windows Backup and Restore, Mac Time Machine, Acronis True Image, EaseUS Todo Backup, Cobian Backup',
              'Veeam Backup & Replication, Veritas NetBackup, Commvault, IBM Spectrum Protect, Acronis Cyber Protect',
              'Google Drive Backup, OneDrive, Dropbox, Backblaze, Carbonite',
            ],
          ],
        },
        { kind: 'heading', text: 'Data recovery' },
        {
          kind: 'definition',
          term: 'Data recovery',
          simple: 'Getting back data you lost, deleted or can no longer open.',
          technical:
            'The process of retrieving lost, deleted, corrupted or inaccessible data from storage devices.',
        },
        {
          kind: 'list',
          title: 'When it is needed',
          items: [
            'Accidental deletion',
            'System crash',
            'Virus or ransomware attack',
            'Hard drive failure',
            'Corrupted files',
          ],
        },
        {
          kind: 'prose',
          paragraphs: [
            'Recovery software includes Recuva, EaseUS Data Recovery Wizard, Disk Drill, Stellar Data Recovery, Wondershare Recoverit, MiniTool Power Data Recovery, R-Studio, PhotoRec, AnyRecover and DMDE.',
          ],
        },
        {
          kind: 'heading',
          text: 'Maintaining secondary storage',
          level: 'sub',
        },
        {
          kind: 'prose',
          paragraphs: [
            '**[[secondary-storage|Secondary storage]]** is the non-volatile medium holding the user’s and system’s data and programs — popular programs, executable programs, data for programming, and temporary data. Maintaining it properly extends its lifespan, protects your data and keeps performance stable.',
          ],
        },
        {
          kind: 'steps',
          title: 'Five steps to maintain a storage device',
          steps: [
            {
              title: 'Keep it physically safe',
              detail: 'Avoid physical damage and control temperature.',
            },
            {
              title: 'Protect the data',
              detail: 'Always eject safely and keep backups.',
            },
            {
              title: 'Keep software healthy',
              detail: 'Update the operating system and use antivirus.',
            },
            {
              title: 'Organise and clean regularly',
              detail:
                'Delete unused files, uninstall unused programs, organise files into folders and remove duplicate files.',
            },
            {
              title: 'Maintain performance',
              detail:
                'Run disk cleanup regularly, and disk defragmentation — **for HDDs only, never SSDs**.',
            },
          ],
        },
        {
          kind: 'callout',
          tone: 'danger',
          title: 'Signs your storage is failing',
          text: 'Slow performance · files getting corrupted · strange noises (HDD clicking or grinding) · frequent crashes · disk errors. If you see these, back up **now** — recovery after a full failure is expensive and often incomplete.',
        },
        {
          kind: 'quickCheck',
          questionIds: ['q4-4-1', 'q4-4-2', 'q4-4-3'],
        },
      ],
      takeaways: [
        'Partitioning divides one physical drive into logical parts, each with its own drive letter and possibly its own file system.',
        'Formatting initialises the medium and creates a file system on it.',
        'Wiping overwrites data repeatedly so recovery is nearly impossible — formatting does not.',
        'Backups protect against hardware failure, deletion, ransomware and disaster; they cost storage, time and management effort.',
      ],
    },

    /* ================= l4-5 ================= */
    {
      id: 'l4-5',
      moduleId: 'm4',
      title: 'File security and the File Control Block',
      summary:
        'The three principles of file security, the five ways the OS contributes to it, and the record the OS keeps about every open file.',
      whyItMatters:
        'Two named learning outcomes live here: describing file security methods, and describing how the OS manages file security. The CIA triad gives you a structure that makes both answerable.',
      objectives: [
        'State the three core principles of information security as applied to files',
        'Describe the file security methods available',
        'Explain how the operating system contributes to file security',
        'Describe the File Control Block and its uses',
      ],
      prerequisites: ['l3-2'],
      minutes: 11,
      syllabusRefs: ['5.2'],
      keyTerms: ['file-security', 'acl', 'authentication', 'encryption', 'fcb'],
      blocks: [
        {
          kind: 'definition',
          term: 'File security',
          simple: 'Keeping files safe from people who should not be able to touch them.',
          technical:
            'The protection of files from unauthorised access, modification, deletion or damage.',
        },
        {
          kind: 'steps',
          title: 'The three core principles',
          steps: [
            {
              title: 'Confidentiality',
              detail: 'Only authorised users can access the file.',
            },
            {
              title: 'Integrity',
              detail: 'Files cannot be altered without permission.',
            },
            {
              title: 'Availability',
              detail: 'Authorised users can access files when they need them.',
            },
          ],
        },
        {
          kind: 'callout',
          tone: 'info',
          title: 'Availability is a security property too',
          text: 'Students often forget the third one. If ransomware encrypts your files, confidentiality may be intact and integrity may be intact — but you cannot open them. That is an availability failure, and it is still a security breach.',
        },
        { kind: 'heading', text: 'File security methods' },
        {
          kind: 'list',
          style: 'number',
          items: [
            '**Access control** — permissions (read, write, execute), user and group ownership, and Access Control Lists ([[acl|ACLs]])',
            '**[[authentication|Authentication]]** — passwords and multi-factor authentication',
            '**[[encryption|Encryption]]** — encrypting files so they cannot be read without a key',
            '**Backup and recovery** — creating copies to prevent permanent loss',
            '**Digital signatures and hashing** — ensuring file integrity',
          ],
        },
        { kind: 'heading', text: 'How the OS contributes' },
        {
          kind: 'table',
          headers: ['Contribution', 'What the OS actually does'],
          rows: [
            [
              '**Access control management**',
              'Assigns file ownership, enforces read/write/execute permissions, implements Access Control Lists.',
            ],
            [
              '**Authentication enforcement**',
              'Verifies user identity during login, and supports password policies and authentication methods.',
            ],
            [
              '**Encryption support**',
              'Provides file system encryption (BitLocker in Windows, eCryptfs in Linux), key management systems, and secure storage mechanisms.',
            ],
            [
              '**Process isolation**',
              'Separates processes in memory and prevents one process from accessing another process’s files without permission.',
            ],
            [
              '**File system security**',
              'Maintains the file system structure, supports secure deletion, and provides file locking mechanisms.',
            ],
          ],
        },
        {
          kind: 'analogy',
          title: 'A bank vault',
          everyday:
            'A bank does not rely on one measure. There is a locked door (access control), an ID check at the counter (authentication), the safe itself (encryption), separate rooms so one customer cannot wander into another’s deposit box (process isolation), and a duplicate ledger in another branch (backup).',
          mapsTo:
            'The OS layers the same five defences. Any one of them alone can be defeated; together they make casual compromise very hard — which is exactly the argument for defence in depth.',
        },
        { kind: 'heading', text: 'The File Control Block' },
        {
          kind: 'definition',
          term: 'File Control Block (FCB)',
          simple: 'The record card the OS keeps about a file that is currently open.',
          technical:
            'A structure in which information related to an open file is stored. It acts like a record or metadata container that helps the OS manage files on storage devices.',
        },
        {
          kind: 'list',
          title: 'What an FCB contains',
          items: [
            'Driver name',
            'File name',
            'File type / extension',
            'Current block number',
            'File size in bytes',
            'Date and time of creation or last update',
          ],
        },
        {
          kind: 'list',
          title: 'What the FCB is used for',
          style: 'check',
          items: [
            '**Locate files** — helps the OS find a file’s exact position on the disk',
            '**Manage access control** — stores permission information controlling who can read, write or execute',
            '**Track file information** — maintains details such as file size and timestamps',
            '**Support file operations** — enables opening, reading, writing and deleting files',
          ],
        },
        {
          kind: 'keyIdea',
          title: 'A pattern to notice',
          text: 'The FCB is to a **file** exactly what the [[pcb|Process Control Block]] is to a **process** — the OS’s bookkeeping record for one managed thing. When you meet the PCB in the next module, this is the shape it will have.',
        },
        {
          kind: 'recall',
          prompt:
            'Name the three core principles of file security, and give an example of a threat to each.',
          answer:
            'Confidentiality — someone reading a file they should not (data theft). Integrity — someone altering a file without permission (tampering). Availability — an authorised user unable to access a file when needed (ransomware, disk failure).',
        },
        {
          kind: 'quickCheck',
          questionIds: ['q4-5-1', 'q4-5-2', 'q4-5-3'],
        },
      ],
      takeaways: [
        'File security aims at confidentiality, integrity and availability.',
        'Methods: access control, authentication, encryption, backup & recovery, digital signatures & hashing.',
        'The OS contributes through access control, authentication, encryption support, process isolation and file system security.',
        'The FCB holds information about an open file and is the file equivalent of the PCB.',
      ],
    },
  ],
}
