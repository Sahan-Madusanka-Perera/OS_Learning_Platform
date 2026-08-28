import type { Module } from '@/types/content'

export const m3: Module = {
  id: 'm3',
  title: 'Files and directories',
  shortTitle: 'Files',
  description:
    'What a file actually is, how the OS describes one, how directories organise them, and what is really happening on the spinning platter underneath.',
  accent: 'teal',
  syllabusRefs: ['5.2'],
  lessons: [
    /* ================= l3-1 ================= */
    {
      id: 'l3-1',
      moduleId: 'm3',
      title: 'Files, data and why file types exist',
      summary:
        'The difference between data and a file, what a file structure is, and why the bit after the dot matters so much.',
      whyItMatters:
        'The syllabus explicitly asks you to "identify the need for file types". That needs a real reason, not "so you know what it is" — and the reason is about which application the OS hands the file to.',
      objectives: [
        'Distinguish data from a file',
        'Explain the two components of a file name and why each is needed',
        'Explain the need for file types',
        'Distinguish the logical view of a file from the physical view',
      ],
      prerequisites: ['l2-1'],
      minutes: 10,
      syllabusRefs: ['5.2'],
      keyTerms: ['file', 'data', 'file-name', 'file-extension'],
      blocks: [
        {
          kind: 'compare',
          title: 'Data vs file',
          headers: ['', '[[data|Data]]', '[[file|File]]'],
          rows: [
            [
              'What it is',
              'Raw facts, figures, symbols or information — numbers, text, images, sounds. May have no meaning until processed.',
              'A named collection of related information, usually a sequence of bytes, stored on a computer or other electronic device.',
            ],
            ['Simple version', 'The **content**', 'The **container** that stores that content'],
          ],
        },
        {
          kind: 'keyIdea',
          text: 'A file is the fundamental unit of storage. It lets data be saved, retrieved and organised efficiently. Files are managed by the operating system using a [[file-system|file system]] that keeps track of their locations and properties.',
        },
        {
          kind: 'prose',
          paragraphs: [
            'A **file structure** is a format understood by the operating system. Every file has a specifically defined structure according to its file type — a JPEG has a header describing the image dimensions before any pixel data begins; an MP3 has a completely different arrangement. The OS relies on the file type to know what shape to expect.',
          ],
        },
        { kind: 'heading', text: 'The two parts of a file name' },
        {
          kind: 'steps',
          steps: [
            {
              title: '1. File name (primary name)',
              detail:
                'Used to uniquely identify and distinguish a file from others. When multiple files are saved in the same directory, each must have a unique name to avoid confusion and accidental overwriting.',
            },
            {
              title: '2. File extension',
              detail:
                'Indicates the file type and determines which application can open it. It informs the operating system and the user which application should be used.',
            },
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'Why unique names matter',
          text: 'If two files have the same name **and** the same extension in the same directory, saving the second overwrites the first — potentially losing important data. `report.txt` and `report.docx` can coexist; two `report.txt` files cannot.',
        },
        {
          kind: 'viz',
          viz: 'fileTypes',
          title: 'File types and their extensions',
        },
        {
          kind: 'misconception',
          wrong: 'Changing a file’s extension changes the file’s type.',
          right:
            'The extension only tells the OS **which application to open the file with**. The bytes inside are unchanged. Renaming `song.mp3` to `song.txt` does not turn music into text — it just makes the OS hand it to Notepad, which then displays gibberish.',
        },
        {
          kind: 'callout',
          tone: 'note',
          title: 'Seeing hidden extensions in Windows',
          text: 'Windows hides extensions for known file types by default. To show them: Control Panel → search "file extension" → click **Show or hide file extensions** under File Explorer Options → untick **Hide extensions for known file types**.',
        },
        { kind: 'heading', text: 'Two ways of looking at the same file' },
        {
          kind: 'compare',
          headers: ['Aspect', 'Logical view (programmer’s view)', 'Physical view (OS view)'],
          rows: [
            [
              'Representation',
              'Represents data in a meaningful format — text, tables, records, pixels, bytes',
              'Represents data as binary content stored on the disk (0s and 1s / north–south magnetism / crest–trough)',
            ],
            [
              'Purpose',
              'Provides a conceptual representation of data',
              'Describes the actual storage structure of data on the disk',
            ],
            [
              'Accessibility',
              'Represents data in a user-friendly format for manipulation',
              'Represents data at the lowest level for storage management',
            ],
            [
              'Focus',
              'Data structure and organisation for usability',
              'Disk-level details for efficient storage',
            ],
          ],
        },
        {
          kind: 'analogy',
          title: 'A song',
          everyday:
            'When you listen to a song you hear a melody — verses, a chorus, a singer. That is the logical view. What is physically on the CD is a spiral of microscopic pits and lands. Nobody hears pits. But without them there is no song.',
          mapsTo:
            'A sound wave is converted into digital form to be stored: the logical view is the music; the physical view is the pattern of bits. The OS bridges the two so applications only ever deal with the logical view.',
        },
        {
          kind: 'recall',
          prompt: 'State two reasons why file types (extensions) are needed.',
          answer:
            'They tell the operating system which application should be used to open the file, and they tell the OS what internal structure to expect, so the file can be read correctly. They also help the user identify what a file contains at a glance.',
        },
        {
          kind: 'quickCheck',
          questionIds: ['q3-1-1', 'q3-1-2', 'q3-1-3'],
        },
      ],
      takeaways: [
        'Data is the content; a file is the named container holding it.',
        'A file name has two parts: the primary name (uniqueness) and the extension (which application opens it).',
        'Two files with the same name and extension in one directory cannot coexist — the second overwrites the first.',
        'Logical view = meaningful format for users; physical view = binary content on disk.',
      ],
    },

    /* ================= l3-2 ================= */
    {
      id: 'l3-2',
      moduleId: 'm3',
      title: 'File attributes: what the OS records about every file',
      summary:
        'The six attributes stored about every file, and why "size" and "size on disk" are different numbers.',
      whyItMatters:
        '"List the attributes of files and directories" is an explicit learning outcome. It is also the setup for internal fragmentation later — the moment you understand why size on disk exceeds file size, you have understood block allocation.',
      objectives: [
        'List the attributes of a file',
        'Explain the difference between file size and size on disk',
        'State that directories have the same attributes as files',
      ],
      prerequisites: ['l3-1'],
      minutes: 8,
      syllabusRefs: ['5.2'],
      keyTerms: ['file-attributes', 'metadata'],
      blocks: [
        {
          kind: 'definition',
          term: 'File attributes',
          simple: 'The properties the system records about a file — who owns it, how big it is, when it changed.',
          technical:
            'Properties associated with files that provide information about their characteristics, permissions and status within a file system.',
        },
        {
          kind: 'steps',
          title: 'The six attributes',
          steps: [
            {
              title: 'Owner',
              detail:
                'The individual who created or owns the file. The owner typically has special privileges, such as the ability to modify permissions or delete the file.',
            },
            {
              title: 'Location',
              detail:
                'The physical or logical location(s) where the file is stored on secondary storage devices — hard disk drive, solid-state drive.',
            },
            {
              title: 'Access permissions',
              detail:
                'Specify who is permitted to read, write or delete data in the file.',
            },
            {
              title: 'Time and date of creation, modification and last access',
              detail:
                'Timestamps providing information about the history and usage of the file. They help track changes made to its content and monitor file activity.',
            },
            {
              title: 'File size',
              detail: 'The amount of storage space the file occupies — the actual quantity of data.',
            },
            {
              title: 'Size on disk',
              detail:
                'The actual amount of storage space the file occupies on the disk, which **may be larger than the file size** because of how disk space is allocated.',
            },
          ],
        },
        {
          kind: 'callout',
          tone: 'info',
          title: 'Why are there two different sizes?',
          text: 'Because the OS never gives out space in fractions. It allocates whole **[[block|blocks]]**. A 1 KB file on a system with 4 KB blocks still consumes a whole 4 KB block — so file size reads 1 KB and size on disk reads 4 KB. You will see exactly this in the next lesson.',
        },
        {
          kind: 'callout',
          tone: 'note',
          title: 'Directories have attributes too',
          text: 'A directory has attributes of its own — and **they are the same attributes as a file’s**. Owner, location, permissions, timestamps, size. If asked about directory attributes, you can quote the file list.',
        },
        {
          kind: 'prose',
          paragraphs: [
            'Collectively, this information is called **[[metadata|metadata]]** — data about the data. It is stored by the file system separately from the file’s contents, which is why you can see a file’s size and date without opening it.',
          ],
        },
        {
          kind: 'recall',
          prompt: 'Name four file attributes.',
          answer:
            'Any four of: owner, location, access permissions, timestamps (creation / modification / last access), file size, size on disk.',
        },
        {
          kind: 'quickCheck',
          questionIds: ['q3-2-1', 'q3-2-2'],
        },
      ],
      takeaways: [
        'Attributes: owner, location, access permissions, timestamps, file size, size on disk.',
        'Size on disk can exceed file size because space is allocated in whole blocks.',
        'Directories have the same attributes as files.',
        'Attributes are metadata — data about the data — stored separately from the contents.',
      ],
    },

    /* ================= l3-3 ================= */
    {
      id: 'l3-3',
      moduleId: 'm3',
      title: 'Directories and path names',
      summary:
        'How folders organise files, the three directory structures, and the difference between absolute and relative paths.',
      whyItMatters:
        'Path-name questions appear regularly and are easy marks — but only if you are precise about where a relative path starts from. That is exactly the bit students get wrong.',
      objectives: [
        'Define a file directory and state the difference between a directory and a folder',
        'Describe single-level, two-level and hierarchical directory structures',
        'Write and distinguish absolute and relative path names',
        'Define the root directory',
      ],
      prerequisites: ['l3-1'],
      minutes: 12,
      syllabusRefs: ['5.2'],
      keyTerms: ['directory', 'root-directory', 'path', 'absolute-path', 'relative-path'],
      blocks: [
        {
          kind: 'definition',
          term: 'File directory',
          simple: 'A container that holds files and other directories.',
          technical:
            'A virtual container within a file system that holds files and other directories. It serves as a way to organise and manage files on a computer or storage device.',
        },
        {
          kind: 'callout',
          tone: 'info',
          title: 'Folder or directory?',
          text: '**Folder** is the user-friendly term used in graphical interfaces. **Directory** is the technical term used in operating systems and command-line environments. They mean the same thing — use "directory" in exam answers.',
        },
        {
          kind: 'list',
          title: 'Facts about directories worth knowing',
          items: [
            'Directories can contain any number of files and subdirectories, allowing hierarchical organisation.',
            'Each file and directory within the same directory must have a **unique name**.',
            'A file directory is a **logical structure and a concept** — it cannot be seen by users as a physical thing. It does take a small amount of space on the disk to record.',
            'Directories have attributes, and those attributes are the same as file attributes.',
          ],
        },
        {
          kind: 'viz',
          viz: 'directoryStructures',
          title: 'Three ways to organise a file system',
          caption: 'Switch between the three and watch the shape change.',
        },
        {
          kind: 'definition',
          term: 'Directory entry',
          simple:
            'The one row inside a folder that records a file’s name and where to find its data.',
          technical:
            'The record a directory holds for each file it contains, storing the file’s name and the information the operating system needs to locate its data on the disk.',
          example:
            'When you open a folder and see `report.txt`, you are looking at its directory entry — not at the file’s data, which is elsewhere on the disk.',
        },
        {
          kind: 'prose',
          paragraphs: [
            'This matters more than it sounds. A directory does not *contain* files the way a box contains objects — the file’s data sits somewhere else entirely on the disk. What the directory holds is a **[[directory-entry|directory entry]]**: a name, plus a pointer to where the data begins.',
            'That is why moving a file within the same disk is instant while copying it is slow. Moving rewrites one directory entry; copying has to duplicate every block of data.',
          ],
        },
        {
          kind: 'compare',
          headers: ['Structure', 'What it allows', 'Limitation'],
          rows: [
            [
              '**Single-level**',
              'All files in one directory, no subdirectories. Simplest form — suitable for small systems or limited file management needs.',
              'Every file in the entire system must have a unique name.',
            ],
            [
              '**Two-level**',
              'Multiple directories at the top level, each holding files and further directories. Introduces organisation through subdirectories.',
              'Each file must still be unique within its own directory — but two users can now both have `notes.txt`.',
            ],
            [
              '**Hierarchical**',
              'Multiple levels arranged in a tree-like fashion. Nested directories to any depth; users navigate up and down. Flexible, scalable, efficient for large systems.',
              'None significant — this is what every modern OS uses.',
            ],
          ],
        },
        { kind: 'heading', text: 'Path names' },
        {
          kind: 'definition',
          term: 'Root directory',
          simple: 'The very top folder that everything else lives inside.',
          technical:
            'The topmost directory in a file system — the starting point from which all other files and folders branch out. Every file and directory in the system is located inside the root directory, either directly or indirectly.',
          example: '`/` on Unix-like systems, `C:\\` on Windows.',
        },
        {
          kind: 'viz',
          viz: 'directoryTree',
          title: 'Try it: click a file, then move the current directory',
          caption:
            'Watch how the absolute path never changes, but the relative path rewrites itself every time you move.',
        },
        {
          kind: 'compare',
          headers: ['', '[[absolute-path|Absolute path]]', '[[relative-path|Relative path]]'],
          rows: [
            [
              'Starts from',
              'The **root directory**',
              'The **current working directory**',
            ],
            [
              'Contains',
              'All folders from the root down to the file',
              'Only the route from where you are now',
            ],
            [
              'Length',
              'Longer',
              'Usually shorter',
            ],
            [
              'Examples',
              '`/home/user/Documents/report.txt` (Unix-like)  ·  `C:\\Users\\user\\Documents\\report.txt` (Windows)',
              '`/Documents/report.txt`  ·  `images\\cheems.jpg`',
            ],
          ],
        },
        {
          kind: 'worked',
          title: 'Reading paths in a web page',
          problem:
            'A file `abc.html` sits in a folder called `nf 3`. An image `xyz.jpg` is in the **same** folder. A second image `cheems.jpg` is inside `nf 3\\images`. Write the shortest correct reference to each image from `abc.html`, and give the absolute path of `cheems.jpg`.',
          steps: [
            {
              title: 'Step 1 — `xyz.jpg` is in the same folder as the HTML file',
              detail:
                'Nothing to navigate. Refer to it simply as `xyz.jpg`. This is a relative path name.',
            },
            {
              title: 'Step 2 — `cheems.jpg` is one folder down',
              detail:
                'Start from the current folder and step into `images`: `\\images\\cheems.jpg`. Also a relative path name.',
            },
            {
              title: 'Step 3 — the absolute path starts at the root',
              detail:
                'Give the full route from the drive letter: `C:\\nf 3\\images\\cheems.jpg`.',
            },
          ],
          answer:
            '`xyz.jpg` and `\\images\\cheems.jpg` are relative paths; `C:\\nf 3\\images\\cheems.jpg` is the absolute path.',
        },
        {
          kind: 'confused',
          question: 'Why would anyone use a relative path if absolute paths always work?',
          simpler:
            'Because absolute paths break the moment you move the folder. If a website’s pages refer to images by absolute path, uploading the site to a server — where the folder lives somewhere completely different — breaks every image. Relative paths survive the move, because everything moves together.',
          picture:
            'Absolute: "42 Galle Road, Colombo 03". Relative: "next door". If the whole street is picked up and rebuilt elsewhere, "next door" is still correct and the street address is not.',
        },
        {
          kind: 'recall',
          prompt:
            'What is the one word that distinguishes an absolute path from a relative path? Give the definition of each in one line.',
          answer:
            'Where it **starts**. An absolute path starts from the root directory; a relative path starts from the current working directory.',
        },
        {
          kind: 'quickCheck',
          questionIds: ['q3-3-1', 'q3-3-2', 'q3-3-5', 'q3-3-3', 'q3-3-4'],
        },
      ],
      takeaways: [
        'A directory is a virtual container holding files and other directories; every name inside one must be unique.',
        '"Folder" is the GUI term; "directory" is the technical term.',
        'Three structures: single-level, two-level, hierarchical (tree) — modern systems use hierarchical.',
        'The root directory is the topmost directory; absolute paths start there, relative paths start at the current directory.',
      ],
    },

    /* ================= l3-4 ================= */
    {
      id: 'l3-4',
      moduleId: 'm3',
      title: 'How data physically sits on a disk',
      summary:
        'Platters, tracks, sectors, blocks and clusters — and the wasted space that block allocation creates.',
      whyItMatters:
        'Internal fragmentation is a guaranteed exam topic and it is purely mechanical once you can picture blocks. It also explains the "size on disk" mystery from the previous lesson.',
      objectives: [
        'Name and describe the physical structures of a hard disk',
        'Explain the difference between a sector, a block and a cluster',
        'Define and calculate internal fragmentation',
      ],
      prerequisites: ['l3-2'],
      minutes: 12,
      syllabusRefs: ['5.2'],
      keyTerms: ['platter', 'track', 'sector', 'block', 'cluster', 'internal-fragmentation'],
      blocks: [
        {
          kind: 'prose',
          paragraphs: [
            'Data on a hard disk is stored as tiny magnetised spots. To find any one of them, the disk needs a physical addressing scheme — and that scheme is built from four nested structures.',
          ],
        },
        {
          kind: 'steps',
          title: 'From the outside in',
          steps: [
            {
              title: '[[platter|Platters]]',
              detail:
                'Circular metal disks inside a hard disk drive that physically store data. They rotate at high speed while data is read or written. Some hard disks have several platters stacked together.',
            },
            {
              title: '[[track|Tracks]]',
              detail:
                'Circular paths drawn on the surface of a platter. Data is recorded along these circular paths. There are several tracks on one platter — modern hard disks can have thousands on a single platter.',
            },
            {
              title: '[[sector|Sectors]]',
              detail:
                'Small sections of a track. They are the **smallest physical storage unit** on a disk and store data in fixed-size portions, commonly 512 bytes or 4 KB.',
            },
            {
              title: '[[block|Blocks]]',
              detail:
                'Logical storage units used by the operating system to read and write data. A block may consist of one or more sectors.',
            },
            {
              title: '[[cluster|Clusters]]',
              detail:
                'Groups of one or more blocks used by the file system to store a file. A file is allocated space in terms of clusters.',
            },
          ],
        },
        {
          kind: 'callout',
          tone: 'info',
          title: 'The physical / logical divide',
          text: 'Sectors are a **hardware** fact — the disk is manufactured that way. Blocks and clusters are **software** decisions the file system makes, and blocks are created when the disk is formatted. Each file system has a default block size, but it can be tuned.',
        },
        { kind: 'heading', text: 'Why the computer never reads one byte' },
        {
          kind: 'prose',
          paragraphs: [
            'This is the key mechanical fact of file storage: **the computer does not read or write single letters or bytes. It always works using blocks.**',
            'Block sizes in a hard disk are usually a power of two. When files of arbitrary sizes are stored, they must occupy whole blocks. And if a file size is not an exact multiple of the block size, the last block allocated to that file will not be filled.',
          ],
        },
        {
          kind: 'viz',
          viz: 'internalFragmentation',
          title: 'Watch the waste appear and disappear',
          caption:
            'Drag the file size. The striped area in the last block is space no other file can use.',
        },
        {
          kind: 'definition',
          term: 'Internal fragmentation',
          simple: 'Wasted space inside the last block a file was given.',
          technical:
            'The wastage of memory or disk space that occurs inside an allocated block when the block is larger than the data stored in it. The unused space cannot be used to store another file, because a block can be allocated to only one file at a time.',
          example:
            'Block size 4 KB, file size 8.66 KB → the file needs 3 blocks (12 KB). Only 8.66 KB is used; the remaining 3.34 KB inside the third block is wasted.',
        },
        {
          kind: 'worked',
          title: 'Calculating internal fragmentation',
          problem:
            'A disk uses 4 KB blocks. A file is 8.66 KB. How many blocks are allocated, how much disk space is used, and how much is wasted?',
          steps: [
            {
              title: 'Step 1 — how many blocks are needed?',
              detail: '8.66 ÷ 4 = 2.165 → round UP to 3 blocks. (Never round down: the remainder still needs somewhere to live.)',
            },
            {
              title: 'Step 2 — how much space is allocated?',
              detail: '3 blocks × 4 KB = 12 KB',
            },
            {
              title: 'Step 3 — how much is wasted?',
              detail: '12 KB − 8.66 KB = 3.34 KB of internal fragmentation',
            },
          ],
          answer:
            '3 blocks allocated, 12 KB of disk space used, 3.34 KB wasted as internal fragmentation.',
        },
        {
          kind: 'misconception',
          wrong: 'Another small file can be squeezed into the leftover space in a partly-used block.',
          right:
            'It cannot. **A block can be allocated to only one file at a time.** The unused space inside that block is genuinely lost until the file is deleted or shrinks.',
          why: 'This is precisely why "size on disk" is larger than "file size" in a file’s properties dialog.',
        },
        {
          kind: 'confused',
          question:
            'If small blocks waste less space, why not just make blocks tiny?',
          simpler:
            'Because every block needs to be tracked. Halving the block size doubles the number of blocks, which doubles the size of the tables the file system must keep and the number of lookups needed to read a file. You trade wasted space for wasted time.',
          picture:
            'Storing rice in matchboxes wastes almost no space inside each box — but you now need ten thousand matchboxes and a catalogue to find any grain. Big sacks waste space at the top of each sack, but you only manage five sacks.',
          prerequisite: { label: 'File attributes', lessonId: 'l3-2' },
        },
        {
          kind: 'recall',
          prompt:
            'A disk uses 8 KB blocks. A file is 20 KB. How many blocks are allocated and how much is wasted?',
          answer:
            '20 ÷ 8 = 2.5 → 3 blocks. 3 × 8 = 24 KB allocated. 24 − 20 = 4 KB wasted as internal fragmentation.',
          hint: 'Always round the number of blocks up.',
        },
        {
          kind: 'quickCheck',
          questionIds: ['q3-4-1', 'q3-4-2', 'q3-4-3', 'q3-4-4'],
        },
      ],
      takeaways: [
        'Platter → track → sector (smallest physical unit) → block (OS logical unit) → cluster (file system allocation unit).',
        'Blocks are created when a disk is formatted; block size is usually a power of two.',
        'The computer always reads and writes in whole blocks, never single bytes.',
        'Internal fragmentation = wasted space inside an allocated block; a block serves only one file.',
      ],
    },
  ],
}
