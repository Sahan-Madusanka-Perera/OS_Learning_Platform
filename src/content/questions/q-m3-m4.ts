import type { Question } from '@/types/content'

export const questionsM3M4: Question[] = [
  /* ============ l3-1 ============ */
  {
    id: 'q3-1-1',
    lessonId: 'l3-1',
    type: 'mcq',
    level: 1,
    prompt: 'Which statement correctly describes the relationship between data and a file?',
    options: [
      'Data is the container; a file is the content',
      'Data is the content; a file is the container that stores it',
      'Data and file mean the same thing',
      'A file is data that has been printed',
    ],
    correct: 1,
    explanation:
      'Data refers to raw facts, figures or symbols which may have no meaning until processed. A file is a named collection of related information — the container holding that content.',
    tags: ['files'],
  },
  {
    id: 'q3-1-2',
    lessonId: 'l3-1',
    type: 'trueFalse',
    level: 3,
    prompt: 'Renaming `song.mp3` to `song.txt` converts the audio into text.',
    correct: false,
    explanation:
      'The extension only tells the operating system which application should open the file. The bytes inside are completely unchanged — Notepad will simply display them as gibberish.',
    remediation:
      'The extension is a label the OS reads, not a transformation of the contents.',
    tags: ['file-types'],
  },
  {
    id: 'q3-1-3',
    lessonId: 'l3-1',
    type: 'mcq',
    level: 3,
    prompt:
      'A student saves `essay.docx` into a folder that already contains a file called `essay.docx`. What happens?',
    options: [
      'Both files are kept, and the second is renamed automatically by the file system',
      'The second file overwrites the first, potentially losing important data',
      'The operating system refuses to save and reports an error',
      'The two files are merged into one',
    ],
    correct: 1,
    optionFeedback: [
      'Some *applications* offer to rename, but the file system rule itself is overwrite.',
      null,
      'The OS may warn, but the underlying behaviour is that saving replaces the first file.',
      'File systems never merge file contents.',
    ],
    explanation:
      'Each file in a directory must have a unique name. If two files have the same name and extension, saving the second overwrites the first — which is exactly why unique naming matters.',
    tags: ['files', 'file-name'],
  },

  /* ============ l3-2 ============ */
  {
    id: 'q3-2-1',
    lessonId: 'l3-2',
    type: 'multi',
    level: 1,
    prompt: 'Which of these are file attributes? (Select all that apply.)',
    options: ['Owner', 'Access permissions', 'The file’s contents', 'Size on disk', 'Time and date of creation'],
    correct: [0, 1, 3, 4],
    explanation:
      'The six attributes are owner, location, access permissions, timestamps (creation/modification/last access), file size and size on disk. The contents are the data itself, not an attribute describing it.',
    tags: ['file-attributes'],
  },
  {
    id: 'q3-2-2',
    lessonId: 'l3-2',
    type: 'mcq',
    level: 3,
    prompt:
      'A file’s properties show "Size: 1.2 KB" and "Size on disk: 4.00 KB". Why are these different?',
    options: [
      'The file is compressed on disk',
      'Disk space is allocated in whole blocks, and this file occupies one 4 KB block',
      'Size on disk includes the file’s attributes and metadata',
      'The file system has made a backup copy of the file',
    ],
    correct: 1,
    optionFeedback: [
      'Compression would make size on disk *smaller*, not larger.',
      null,
      'Metadata is stored separately and is not what causes this gap.',
      'File systems do not silently duplicate files.',
    ],
    explanation:
      'The OS never allocates fractions of a block. A 1.2 KB file on a system with 4 KB blocks still consumes a whole block, so 2.8 KB is wasted as internal fragmentation. Size on disk is the true consumption.',
    tags: ['file-attributes', 'internal-fragmentation'],
  },

  /* ============ l3-3 ============ */
  {
    id: 'q3-3-1',
    lessonId: 'l3-3',
    type: 'mcq',
    level: 1,
    prompt: 'What is the root directory?',
    options: [
      'The directory where the operating system is installed',
      'The topmost directory in a file system, from which all others branch out',
      'The current working directory',
      'The directory containing a user’s personal files',
    ],
    correct: 1,
    explanation:
      'The root directory is the topmost directory — the starting point from which all other files and folders branch out. Every file and directory in the system is located inside it, directly or indirectly. Examples: `/` on Unix-like systems, `C:\\` on Windows.',
    tags: ['directories'],
  },
  {
    id: 'q3-3-2',
    lessonId: 'l3-3',
    type: 'mcq',
    level: 2,
    prompt: 'Which of these is an absolute path?',
    options: ['images\\photo.jpg', 'photo.jpg', 'C:\\Users\\Nimal\\Pictures\\photo.jpg', '..\\photo.jpg'],
    correct: 2,
    optionFeedback: [
      'This starts from the current directory, so it is relative.',
      'A bare file name is the shortest possible relative path.',
      null,
      'The `..` means "go up one level from here", which makes it relative.',
    ],
    explanation:
      'An absolute path shows the complete route starting from the root directory. Only `C:\\Users\\Nimal\\Pictures\\photo.jpg` starts at the root (`C:\\`).',
    tags: ['paths'],
  },
  {
    id: 'q3-3-3',
    lessonId: 'l3-3',
    type: 'mcq',
    level: 4,
    prompt:
      'A website is developed on a laptop and all image references use absolute paths like `C:\\site\\images\\logo.png`. What happens when the site is uploaded to a web server?',
    options: [
      'It works normally — the server copies the paths',
      'The images break, because the server has no `C:\\site\\images` folder',
      'The images load more slowly but still appear',
      'The server automatically converts the paths to relative ones',
    ],
    correct: 1,
    optionFeedback: [
      'The paths refer to a location that only exists on the developer’s laptop.',
      null,
      'They will not appear at all — there is nothing at that location.',
      'No server does this; the path is just text in the HTML.',
    ],
    explanation:
      'This is exactly why relative paths exist. An absolute path names one specific location on one specific machine. A relative path describes the route from the current file, so it stays correct when the whole folder is moved.',
    remediation:
      'Absolute = "42 Galle Road, Colombo". Relative = "next door". Move the whole street and only the second one still works.',
    tags: ['paths'],
  },
  {
    id: 'q3-3-4',
    lessonId: 'l3-3',
    type: 'ordering',
    level: 2,
    prompt: 'Order these directory structures from simplest to most flexible.',
    items: ['Single-level directory', 'Two-level directory', 'Hierarchical directory'],
    explanation:
      'Single-level puts everything in one directory (every file needs a globally unique name). Two-level allows top-level directories each holding files. Hierarchical allows directories inside directories to any depth — flexible, scalable, and what every modern OS uses.',
    tags: ['directories'],
  },

  {
    id: 'q3-3-5',
    lessonId: 'l3-3',
    type: 'mcq',
    level: 2,
    prompt: 'What does a directory entry contain?',
    options: [
      'The complete contents of the file',
      'The file’s name, plus the information needed to locate its data on the disk',
      'A backup copy of the file',
      'The list of users allowed to open the file',
    ],
    correct: 1,
    optionFeedback: [
      'The data lives elsewhere on the disk. A directory holds a *record about* each file, not the file itself.',
      null,
      'Directories store no copies of data.',
      'Permissions are file attributes; the directory entry is about locating the file.',
    ],
    explanation:
      'A directory does not contain files the way a box contains objects — the data sits elsewhere on the disk. The directory entry is the row the folder keeps for each file: its name, plus whatever the allocation method needs to find the data (a starting block, a length, or an index block address).',
    remediation:
      'This is why moving a file within one disk is instant but copying it is slow: moving rewrites one directory entry, copying duplicates every block.',
    tags: ['directories', 'directory-entry'],
  },

  /* ============ l3-4 ============ */
  {
    id: 'q3-4-1',
    lessonId: 'l3-4',
    type: 'ordering',
    level: 2,
    prompt: 'Order these disk structures from largest to smallest.',
    items: ['Platter', 'Track', 'Cluster', 'Block', 'Sector'],
    explanation:
      'A platter carries many tracks; each track is divided into sectors (the smallest *physical* unit). Blocks are logical units of one or more sectors, and a cluster is a group of one or more blocks. Note that clusters sit above blocks, which sit above sectors.',
    tags: ['disk-structure'],
  },
  {
    id: 'q3-4-2',
    lessonId: 'l3-4',
    type: 'numeric',
    level: 3,
    prompt:
      'A disk uses 4 KB blocks. A file is 13 KB. How many blocks are allocated to it?',
    answer: 4,
    unit: 'blocks',
    hint: 'Divide, then round in the direction that guarantees the whole file fits.',
    explanation:
      '13 ÷ 4 = 3.25, which rounds **up** to 4 blocks. Rounding down would leave part of the file with nowhere to live. So 4 × 4 = 16 KB is allocated, and 3 KB is wasted as internal fragmentation.',
    remediation: 'Always round the number of blocks UP. Never down.',
    tags: ['internal-fragmentation'],
  },
  {
    id: 'q3-4-3',
    lessonId: 'l3-4',
    type: 'numeric',
    level: 3,
    prompt:
      'A disk uses 8 KB blocks. A file is 20 KB. How much space is wasted as internal fragmentation?',
    answer: 4,
    unit: 'KB',
    explanation:
      '20 ÷ 8 = 2.5 → 3 blocks. 3 × 8 = 24 KB allocated. 24 − 20 = 4 KB wasted inside the last block.',
    remediation:
      'Three steps every time: blocks needed (round up) → space allocated (blocks × block size) → waste (allocated − file size).',
    tags: ['internal-fragmentation'],
  },
  {
    id: 'q3-4-4',
    lessonId: 'l3-4',
    type: 'hotspot',
    level: 2,
    prompt:
      'Click the structure that is the **smallest physical storage unit** on a disk.',
    diagram: 'disk-anatomy',
    correctRegion: 'sector',
    explanation:
      'Sectors are the smallest physical storage units on a disk, storing data in fixed-size portions of commonly 512 bytes or 4 KB. Blocks and clusters are larger *logical* units the OS and file system build on top of sectors.',
    remediation:
      'Physical (made by the manufacturer): platters, tracks, sectors. Logical (decided by software): blocks, clusters.',
    tags: ['disk-structure'],
  },

  /* ============ l4-1 ============ */
  {
    id: 'q4-1-1',
    lessonId: 'l4-1',
    type: 'mcq',
    level: 2,
    prompt: 'Which disk allocation method suffers from external fragmentation?',
    options: ['Contiguous allocation', 'Linked allocation', 'Indexed allocation', 'All three equally'],
    correct: 0,
    optionFeedback: [
      null,
      'Linked allocation places blocks anywhere, so scattered free space is never a problem.',
      'Indexed allocation also places data blocks anywhere on the disk.',
      'Only the method that demands an unbroken run can be defeated by scattered free space.',
    ],
    explanation:
      'Contiguous allocation requires a file to occupy one unbroken run of blocks. When deletions leave scattered gaps, a large file may not fit even though the total free space is sufficient — that is external fragmentation. Linked and indexed allocation are immune, because they can use any free block anywhere.',
    tags: ['allocation', 'external-fragmentation'],
  },
  {
    id: 'q4-1-2',
    lessonId: 'l4-1',
    type: 'mcq',
    level: 3,
    prompt: 'Why does linked allocation give slow access?',
    options: [
      'Because the pointers take up too much disk space',
      'Because you must follow the chain from the first block — there is no way to jump directly to block N',
      'Because the blocks are always at the far end of the disk',
      'Because the index block must be read first',
    ],
    correct: 1,
    optionFeedback: [
      'Pointer overhead is a real disadvantage, but it costs space, not speed.',
      null,
      'Blocks can be anywhere — position is not the issue.',
      'Index blocks belong to *indexed* allocation, not linked.',
    ],
    explanation:
      'The directory entry stores only the starting block, and each block points to the next. To read the fourth block you must first read blocks one, two and three. This is why linked allocation offers sequential access only.',
    tags: ['allocation', 'linked'],
  },
  {
    id: 'q4-1-3',
    lessonId: 'l4-1',
    type: 'matching',
    level: 3,
    prompt: 'Match each allocation method to what its directory entry stores.',
    pairs: [
      { left: 'Contiguous', right: 'File name + starting block + length' },
      { left: 'Linked', right: 'File name + starting block + size' },
      { left: 'Indexed', right: 'File name + index block' },
    ],
    explanation:
      'The directory entry tells you a lot about the method: contiguous needs a length (because the blocks run consecutively from the start), linked needs only a start (because each block points onward), and indexed points to a separate block listing every address.',
    tags: ['allocation'],
  },
  {
    id: 'q4-1-4',
    lessonId: 'l4-1',
    type: 'mcq',
    level: 4,
    prompt:
      'A video editing system stores very large files that must support random access — jumping instantly to any point. Which allocation method is most appropriate?',
    options: ['Contiguous', 'Linked', 'Indexed', 'Any of them would work equally well'],
    correct: 2,
    optionFeedback: [
      'Contiguous gives fast access but a very large file may never find an unbroken run big enough, and it cannot grow.',
      'Linked gives sequential access only — jumping to the middle means walking the whole chain.',
      null,
      'They differ substantially on exactly this requirement.',
    ],
    explanation:
      'Indexed allocation is "best used when large files need random access". The index block lets the system jump straight to any data block, and files can grow dynamically without needing an unbroken run.',
    tags: ['allocation', 'indexed'],
  },
  {
    id: 'q4-1-5',
    lessonId: 'l4-1',
    type: 'trueFalse',
    level: 3,
    prompt: 'Indexed allocation has no overhead at all.',
    correct: false,
    explanation:
      'Indexed allocation avoids the *pointer* overhead of linked allocation, but each file requires an extra index block — and the size of that index block limits the maximum file size. Those are its two named disadvantages.',
    tags: ['allocation', 'indexed'],
  },

  /* ============ l4-2 ============ */
  {
    id: 'q4-2-1',
    lessonId: 'l4-2',
    type: 'mcq',
    level: 3,
    prompt:
      'A disk has 8 KB blocks. The FAT shows: 150→151, 151→152, 152→−1, 153→154, 154→155, 155→156. A file starts at block 150. What is the directory entry and the disk space allocated?',
    options: ['150, 16 KB', '150, 24 KB', '151, 16 KB', '152, 8 KB', '150, 32 KB'],
    correct: 1,
    optionFeedback: [
      'The directory entry is right, but count the blocks again: 150 → 151 → 152 is three blocks, not two.',
      null,
      'The directory entry is the *first* block of the file, which is 150.',
      'Block 152 is where the chain *ends*, not where it starts.',
      'The chain is only three blocks long, so 32 KB would need four.',
    ],
    explanation:
      'By the standard rules: the directory entry contains the block number of the first block = **150**. Following the chain: 150 → 151 → 152 → −1, so three blocks are used. 3 × 8 KB = **24 KB**. Blocks 153, 154 and 155 belong to another file entirely.',
    remediation:
      'Two things to get right: the directory entry is the FIRST block, and the space answer must be blocks × block size.',
    tags: ['fat', 'fat-chaining'],
  },
  {
    id: 'q4-2-2',
    lessonId: 'l4-2',
    type: 'numeric',
    level: 4,
    prompt:
      'A disk has 8 KB blocks. The FAT shows: 310→311, 311→315, 312→−1, 313→314, 314→316, 315→−1. The file `report.txt` starts at block 310. How much disk space is allocated to it, in KB?',
    answer: 24,
    unit: 'KB',
    hint: 'Follow the chain from 310. Ignore any −1 you did not reach by following it.',
    explanation:
      'The chain is 310 → 311 → 315 → −1, so three blocks. 3 × 8 KB = 24 KB. The −1 in row 312 belongs to a different file — you never reach it by following this chain, so it is irrelevant.',
    remediation:
      'Never scan the table looking for −1. Always start at the given block and follow the pointers.',
    tags: ['fat', 'fat-chaining'],
  },
  {
    id: 'q4-2-3',
    lessonId: 'l4-2',
    type: 'multi',
    level: 2,
    prompt: 'Which of these are improvements NTFS made over FAT? (Select all that apply.)',
    options: [
      'Uses a Master File Table',
      'Supports file permissions and encryption',
      'Is supported by almost every device ever made',
      'Supports built-in file and folder compression',
      'Supports very large file and partition sizes',
    ],
    correct: [0, 1, 3, 4],
    explanation:
      'Universal compatibility is FAT’s advantage, not NTFS’s — it is precisely why cameras, printers and consoles still use FAT. NTFS improves on security, size limits, compression, fault tolerance and Unicode support.',
    tags: ['ntfs', 'fat'],
  },
  {
    id: 'q4-2-4',
    lessonId: 'l4-2',
    type: 'mcq',
    level: 3,
    prompt: 'Why does a FAT file system keep two copies of the File Allocation Table?',
    options: [
      'To allow two operating systems to use the disk',
      'So one can serve as a backup if the other is damaged',
      'To double the maximum file size',
      'To speed up file access by reading both in parallel',
    ],
    correct: 1,
    explanation:
      'To prevent data loss, two copies of the FAT are kept, allowing one to serve as a backup if the other is damaged. Losing the FAT would make every file on the disk unreachable, since the chains would be gone.',
    tags: ['fat'],
  },

  /* ============ l4-3 ============ */
  {
    id: 'q4-3-1',
    lessonId: 'l4-3',
    type: 'mcq',
    level: 2,
    prompt: 'What is the main goal of disk defragmentation?',
    options: [
      'To merge scattered free spaces into one large continuous free space',
      'To arrange fragmented file blocks into contiguous order',
      'To delete unnecessary temporary files',
      'To create a backup of the disk',
    ],
    correct: 1,
    optionFeedback: [
      'That is disk **compaction** — its focus is free space, not file blocks.',
      null,
      'That is disk cleanup, a different utility entirely.',
      'That is backup software.',
    ],
    explanation:
      'Defragmentation focuses on **file blocks**, putting each file’s pieces back into contiguous order so the read/write head does not have to jump. It may consolidate free space as a side effect, but that is not its objective.',
    tags: ['defragmentation'],
  },
  {
    id: 'q4-3-2',
    lessonId: 'l4-3',
    type: 'trueFalse',
    level: 3,
    prompt: 'Defragmenting an SSD regularly improves its performance.',
    correct: false,
    explanation:
      'Defragmentation exists to reduce seek time — the physical movement of a read/write head across a platter. An SSD has no moving head, so there is nothing to gain, and the extra write operations shorten its lifespan.',
    remediation:
      'Defragmentation is for HDDs only. The syllabus is explicit: run disk defragmentation only for HDDs, not SSDs.',
    tags: ['defragmentation'],
  },
  {
    id: 'q4-3-3',
    lessonId: 'l4-3',
    type: 'mcq',
    level: 4,
    prompt:
      'Why does a fragmented disk make antivirus scans and backups take longer?',
    options: [
      'Because fragmented files are larger',
      'Because the software must access many scattered locations to read a single file',
      'Because fragmented files must be defragmented before they can be read',
      'Because fragmentation corrupts file data',
    ],
    correct: 1,
    optionFeedback: [
      'Fragmentation does not change a file’s size — only where its pieces sit.',
      null,
      'Fragmented files can be read perfectly well; they are just slower to read.',
      'Fragmentation is a performance problem, not a corruption problem.',
    ],
    explanation:
      'When files are fragmented they are stored in multiple scattered locations. Backup software and antivirus programs must access different parts of the disk to read a single file, increasing the time required for backups, virus scans and disk checking operations.',
    tags: ['defragmentation'],
  },

  /* ============ l4-4 ============ */
  {
    id: 'q4-4-1',
    lessonId: 'l4-4',
    type: 'mcq',
    level: 2,
    prompt: 'What does disk formatting do?',
    options: [
      'Divides a physical drive into several logical parts',
      'Initialises the storage medium and creates a file system on it',
      'Overwrites all data multiple times so it cannot be recovered',
      'Rearranges file blocks into contiguous order',
    ],
    correct: 1,
    optionFeedback: [
      'That is partitioning.',
      null,
      'That is drive wiping — formatting does not overwrite repeatedly.',
      'That is defragmentation.',
    ],
    explanation:
      'Formatting prepares a storage device for data storage by initialising the medium and creating a file system the OS can use to organise and store data.',
    tags: ['formatting'],
  },
  {
    id: 'q4-4-2',
    lessonId: 'l4-4',
    type: 'mcq',
    level: 4,
    prompt:
      'A company is disposing of old computers containing confidential client records. Is formatting the drives sufficient?',
    options: [
      'Yes — formatting removes all data permanently',
      'No — they should use drive wipe software, which overwrites data multiple times',
      'Yes, provided they format twice',
      'No — they should defragment the drives first',
    ],
    correct: 1,
    optionFeedback: [
      'Formatting prepares the medium and creates a file system; it does not overwrite every byte, so recovery software can often retrieve data.',
      null,
      'Repeating a format does not add the overwriting that wiping performs.',
      'Defragmentation rearranges files; it does nothing for security.',
    ],
    explanation:
      'Unlike formatting, wiping destroys data completely. Drive wipe software permanently deletes all data by overwriting it multiple times, making recovery nearly impossible — which is exactly why it is used for securely disposing of old computers.',
    tags: ['formatting', 'security'],
  },
  {
    id: 'q4-4-3',
    lessonId: 'l4-4',
    type: 'multi',
    level: 3,
    prompt: 'Which of these are genuine disadvantages of disk partitioning? (Select all that apply.)',
    options: [
      'If one partition fills up you cannot use free space from another without resizing',
      'It requires planning and technical knowledge',
      'Different partitions cannot use different file systems',
      'Incorrect partitioning can delete existing data',
      'A virus in one partition always spreads to all others',
    ],
    correct: [0, 1, 3],
    explanation:
      'Different file systems on different partitions is an *advantage* of partitioning, not a limitation. And confining problems to one partition is also an advantage — a virus or corruption in one partition may not affect others.',
    tags: ['partitioning'],
  },

  /* ============ l4-5 ============ */
  {
    id: 'q4-5-1',
    lessonId: 'l4-5',
    type: 'multi',
    level: 1,
    prompt:
      'What are the three core principles of information security that file security aims to ensure?',
    options: ['Confidentiality', 'Compression', 'Integrity', 'Availability', 'Compatibility'],
    correct: [0, 2, 3],
    explanation:
      'Confidentiality (only authorised users can access), integrity (files cannot be altered without permission) and availability (authorised users can access files when needed).',
    tags: ['file-security'],
  },
  {
    id: 'q4-5-2',
    lessonId: 'l4-5',
    type: 'mcq',
    level: 4,
    prompt:
      'Ransomware encrypts a company’s files. Nobody unauthorised has read them and nobody has altered their contents. Which security principle has been violated?',
    options: ['Confidentiality', 'Integrity', 'Availability', 'None — the files are unchanged'],
    correct: 2,
    optionFeedback: [
      'Confidentiality is about unauthorised *access*, which has not happened here.',
      'Integrity is about unauthorised *alteration of content* — the underlying data is intact, just locked.',
      null,
      'Being unable to open your own files is very much a security failure.',
    ],
    explanation:
      'Availability means authorised users can access files when needed. Ransomware attacks availability specifically — which is why backups, not just access control, are part of file security.',
    remediation:
      'Three questions: Can the wrong people read it? (confidentiality) Can they change it? (integrity) Can the right people get to it? (availability)',
    tags: ['file-security'],
  },
  {
    id: 'q4-5-3',
    lessonId: 'l4-5',
    type: 'mcq',
    level: 2,
    prompt: 'What does a File Control Block store?',
    options: [
      'The contents of an open file',
      'Information about an open file — driver name, file name, type, current block number, size and timestamps',
      'A list of all files on the disk',
      'The encryption key for a protected file',
    ],
    correct: 1,
    optionFeedback: [
      'Contents live in the data blocks; the FCB describes the file, not its data.',
      null,
      'That is closer to a directory or the FAT.',
      'Key management is a separate OS service.',
    ],
    explanation:
      'The FCB is a record/metadata container for an **open** file, helping the OS locate it, manage access control, track its information and support file operations. It is the file equivalent of the Process Control Block.',
    tags: ['fcb'],
  },
]
