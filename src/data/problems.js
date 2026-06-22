// ─────────────────────────────────────────────────────────────────────────────
// DSA Cracker — Problem Data
//
// Each problem has:
//   metaphor     → real-world analogy to build intuition
//   breakdown    → step-by-step "how to think" guide
//   annotatedCode→ lines with inline time/space notes
//   execution    → pre-computed trace steps for the stepper
// ─────────────────────────────────────────────────────────────────────────────

export const PROBLEMS = [
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 1,
    title: "Move Zeros to End",
    source: "TCS NQT – Sep Day 1, Slot 1",
    category: "Array",
    difficulty: "Easy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    tags: ["Two Pointer", "In-place"],

    // ── Real-world metaphor ─────────────────────────────────────────────────
    metaphor: {
      icon: "🏭",
      title: "Chocolate Factory Conveyor Belt",
      story:
        "Imagine a conveyor belt moving chocolate boxes. Some boxes are empty (0). A worker stands at position `j` — the 'pack zone'. As each box comes by, if it's filled, the worker places it at position `j` and moves one step forward. Empty boxes? Just let them slide past. At the end, everything past `j` is an empty slot — stamp them all with 0.",
      visual: [
        { label: "Read pointer i →", desc: "scans every box" },
        { label: "Write pointer j →", desc: "only moves for non-zero items" },
        { label: "Fill phase →", desc: "zero out remaining slots" },
      ],
    },

    // ── Problem-solving breakdown ───────────────────────────────────────────
    breakdown: [
      {
        step: 1,
        phase: "Observe",
        title: "What is the pattern?",
        detail:
          "Non-zero elements must keep their relative order. Zeros go to the back. This is a partition problem — separate 'valid' from 'invalid' items.",
      },
      {
        step: 2,
        phase: "Key Insight",
        title: "Two-pointer trick",
        detail:
          "Use TWO indices: `i` (reader — moves every step) and `j` (writer — moves only when a non-zero is found). After the loop, `j` marks where zeros begin.",
      },
      {
        step: 3,
        phase: "Loop Construction",
        title: "Build the loop",
        detail:
          "Single `for` loop over all n elements. Inside: `if arr[i] != 0: arr[j]=arr[i]; j++`. This is O(n) — each element visited exactly once.",
      },
      {
        step: 4,
        phase: "Fill",
        title: "Fill the tail",
        detail:
          "After the loop, positions `j` to `n-1` are the 'empty' zone. Fill them all with 0. This second pass is also O(n) worst case but doesn't add extra space.",
      },
      {
        step: 5,
        phase: "Complexity",
        title: "Why O(n) time, O(1) space?",
        detail:
          "We touch each element at most twice (read + possibly write). We only added one extra variable `j` — no extra array. Space is constant regardless of n.",
      },
    ],

    // ── Line-by-line annotated code ─────────────────────────────────────────
    annotatedCode: [
      { id: 0, code: "n = int(input())", timeNote: "O(1) — single read", spaceNote: "O(1) — one int", isLoop: false },
      { id: 1, code: "arr = [int(input()) for _ in range(n)]", timeNote: "O(n) — reads n elements", spaceNote: "O(n) — stores the array", isLoop: false },
      { id: 2, code: "j = 0  # write pointer", timeNote: "O(1) — assignment", spaceNote: "O(1) — one extra var", isLoop: false },
      { id: 3, code: "for i in range(n):", timeNote: "O(n) — loop runs n times", spaceNote: "O(1) — loop var i", isLoop: true, loopNote: "Each iteration: O(1) work → total O(n)" },
      { id: 4, code: "    if arr[i] != 0:", timeNote: "O(1) — single comparison", spaceNote: "O(1)", isLoop: false, indent: 1 },
      { id: 5, code: "        arr[j] = arr[i]", timeNote: "O(1) — array write", spaceNote: "O(1) — in-place", isLoop: false, indent: 2 },
      { id: 6, code: "        j += 1", timeNote: "O(1) — increment", spaceNote: "O(1)", isLoop: false, indent: 2 },
      { id: 7, code: "for i in range(j, n):", timeNote: "O(n-j) — fills zeros", spaceNote: "O(1)", isLoop: true, loopNote: "Worst case: all zeros → O(n)" },
      { id: 8, code: "    arr[i] = 0", timeNote: "O(1) — zero fill", spaceNote: "O(1) — in-place", isLoop: false, indent: 1 },
      { id: 9, code: "print(*arr)", timeNote: "O(n) — print all", spaceNote: "O(1)", isLoop: false },
    ],

    // ── Execution trace for the stepper ────────────────────────────────────
    example: { input: "n=8, arr=[4,5,0,1,9,0,5,0]" },
    steps: [
      { lineId: 0, vars: { n: 8 }, highlight: [0], desc: "Read n=8. We know the array will have 8 elements.", timeOps: 1, spaceVars: ["n"] },
      { lineId: 1, vars: { n: 8, arr: [4,5,0,1,9,0,5,0] }, highlight: [1], desc: "Read all 8 elements into arr.", timeOps: 9, spaceVars: ["n","arr[8]"] },
      { lineId: 2, vars: { n: 8, arr: [4,5,0,1,9,0,5,0], j: 0 }, highlight: [2], desc: "Set write pointer j=0. This is our 'pack zone' cursor.", timeOps: 10, spaceVars: ["n","arr[8]","j"] },
      { lineId: 3, vars: { n: 8, arr: [4,5,0,1,9,0,5,0], j: 0, i: 0 }, highlight: [3,4,5,6], desc: "i=0 → arr[0]=4 ≠ 0 → write arr[0]=4, j becomes 1", timeOps: 13, spaceVars: ["n","arr[8]","j","i"] },
      { lineId: 3, vars: { n: 8, arr: [4,5,0,1,9,0,5,0], j: 1, i: 1 }, highlight: [3,4,5,6], desc: "i=1 → arr[1]=5 ≠ 0 → write arr[1]=5, j becomes 2", timeOps: 16, spaceVars: ["n","arr[8]","j","i"] },
      { lineId: 3, vars: { n: 8, arr: [4,5,0,1,9,0,5,0], j: 2, i: 2 }, highlight: [3,4], desc: "i=2 → arr[2]=0 → skip! j stays at 2", timeOps: 18, spaceVars: ["n","arr[8]","j","i"] },
      { lineId: 3, vars: { n: 8, arr: [4,5,1,1,9,0,5,0], j: 3, i: 3 }, highlight: [3,4,5,6], desc: "i=3 → arr[3]=1 ≠ 0 → write arr[2]=1, j becomes 3", timeOps: 21, spaceVars: ["n","arr[8]","j","i"] },
      { lineId: 3, vars: { n: 8, arr: [4,5,1,9,9,0,5,0], j: 4, i: 4 }, highlight: [3,4,5,6], desc: "i=4 → arr[4]=9 ≠ 0 → write arr[3]=9, j becomes 4", timeOps: 24, spaceVars: ["n","arr[8]","j","i"] },
      { lineId: 3, vars: { n: 8, arr: [4,5,1,9,9,0,5,0], j: 4, i: 5 }, highlight: [3,4], desc: "i=5 → arr[5]=0 → skip! j stays at 4", timeOps: 26, spaceVars: ["n","arr[8]","j","i"] },
      { lineId: 3, vars: { n: 8, arr: [4,5,1,9,5,0,5,0], j: 5, i: 6 }, highlight: [3,4,5,6], desc: "i=6 → arr[6]=5 ≠ 0 → write arr[4]=5, j becomes 5", timeOps: 29, spaceVars: ["n","arr[8]","j","i"] },
      { lineId: 3, vars: { n: 8, arr: [4,5,1,9,5,0,5,0], j: 5, i: 7 }, highlight: [3,4], desc: "i=7 → arr[7]=0 → skip! j stays at 5. Loop ends.", timeOps: 31, spaceVars: ["n","arr[8]","j","i"] },
      { lineId: 7, vars: { n: 8, arr: [4,5,1,9,5,0,0,0], j: 5 }, highlight: [7,8], desc: "Fill phase: positions 5,6,7 → set to 0. Result: [4,5,1,9,5,0,0,0]", timeOps: 34, spaceVars: ["n","arr[8]","j","i"] },
      { lineId: 9, vars: { n: 8, arr: [4,5,1,9,5,0,0,0] }, highlight: [9], desc: "Print the final array. Done! T=O(n), S=O(1).", timeOps: 34, spaceVars: ["n","arr[8]","j","i"] },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 2,
    title: "Toggle Bits After MSB",
    source: "TCS NQT – Sep Day 1, Slot 1",
    category: "Bit Manipulation",
    difficulty: "Easy",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    tags: ["Bit Manipulation", "XOR", "Math"],

    metaphor: {
      icon: "💡",
      title: "Light Switch Panel",
      story:
        "Imagine a row of light switches representing binary digits. The leftmost ON switch is the MSB. You want to flip ALL switches (ON→OFF, OFF→ON). The trick: create a 'mask' — all 1s from the MSB down — then XOR with it. XOR of 1 flips a bit, XOR of 0 keeps it unchanged.",
      visual: [
        { label: "10 → 1010", desc: "binary form" },
        { label: "mask = 1111", desc: "all 1s up to MSB position" },
        { label: "1010 XOR 1111 = 0101 = 5", desc: "every bit flipped" },
      ],
    },

    breakdown: [
      {
        step: 1,
        phase: "Observe",
        title: "What does 'toggle' mean in binary?",
        detail:
          "Toggling a bit means flipping 0→1 and 1→0. XOR with 1 toggles. XOR with 0 keeps. So XOR-ing with all-1s mask flips everything.",
      },
      {
        step: 2,
        phase: "Key Insight",
        title: "Build the mask",
        detail:
          "Find bit-length of n using log2(n). Mask = 2^(bits) - 1. e.g. n=10 → bits=4 → mask = 2^4-1 = 15 = 1111₂",
      },
      {
        step: 3,
        phase: "Loop Construction",
        title: "No loop needed!",
        detail:
          "One XOR operation: `n XOR mask`. This is O(1) — just two math ops. No loop required. This is why bit tricks are so powerful.",
      },
      {
        step: 4,
        phase: "Complexity",
        title: "Why O(log n)?",
        detail:
          "The only 'work' is computing log2(n) to find the bit length. log₂(n) grows slowly — for n=1000, it's only ~10. Then XOR is O(1).",
      },
    ],

    annotatedCode: [
      { id: 0, code: "import math", timeNote: "O(1) — import", spaceNote: "O(1)", isLoop: false },
      { id: 1, code: "n = int(input())", timeNote: "O(1) — single read", spaceNote: "O(1)", isLoop: false },
      { id: 2, code: "bits = int(math.log2(n)) + 1", timeNote: "O(log n) — log2 computation", spaceNote: "O(1) — one int", isLoop: false },
      { id: 3, code: "mask = (1 << bits) - 1", timeNote: "O(1) — bit shift + subtract", spaceNote: "O(1) — one int", isLoop: false },
      { id: 4, code: "print(n ^ mask)", timeNote: "O(1) — single XOR", spaceNote: "O(1)", isLoop: false },
    ],

    example: { input: "n=10" },
    steps: [
      { lineId: 1, vars: { n: 10 }, highlight: [1], desc: "Read n=10. Binary: 1010", timeOps: 1, spaceVars: ["n"] },
      { lineId: 2, vars: { n: 10, bits: 4 }, highlight: [2], desc: "log2(10) ≈ 3.32 → int = 3 → bits = 3+1 = 4. n has 4 binary digits.", timeOps: 2, spaceVars: ["n","bits"] },
      { lineId: 3, vars: { n: 10, bits: 4, mask: 15 }, highlight: [3], desc: "mask = (1 << 4) - 1 = 16 - 1 = 15 = 1111₂. All 4 bits are 1.", timeOps: 3, spaceVars: ["n","bits","mask"] },
      { lineId: 4, vars: { n: 10, bits: 4, mask: 15, result: 5 }, highlight: [4], desc: "10 XOR 15 → 1010 XOR 1111 = 0101 = 5. Every bit flipped!", timeOps: 4, spaceVars: ["n","bits","mask"] },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 3,
    title: "Sort 0s, 1s and 2s",
    source: "TCS NQT – Day 1, Slot 2",
    category: "Array",
    difficulty: "Medium",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    tags: ["Dutch National Flag", "Three Pointer", "In-place Sort"],

    metaphor: {
      icon: "✈️",
      title: "Airport Security Tray Sorter",
      story:
        "Imagine airport trays coming down a belt, each labeled 0 (safe), 1 (suspicious), or 2 (dangerous). Three workers stand at three zones: `low` (left end for 0s), `mid` (scanner scanning), `high` (right end for 2s). The mid scanner looks at each tray: safe? hand to low zone. Dangerous? hand to high zone. Suspicious? leave in middle. This is the Dutch National Flag algorithm.",
      visual: [
        { label: "low pointer →", desc: "next slot for 0s (left side)" },
        { label: "mid pointer →", desc: "current item being examined" },
        { label: "high pointer →", desc: "next slot for 2s (right side)" },
      ],
    },

    breakdown: [
      {
        step: 1,
        phase: "Observe",
        title: "Only 3 values: 0, 1, 2",
        detail:
          "Normal sort would be O(n log n). But knowing the value range is [0,2] lets us sort in a single pass — O(n).",
      },
      {
        step: 2,
        phase: "Key Insight",
        title: "Dutch National Flag Algorithm",
        detail:
          "Three pointers: `low=0`, `mid=0`, `high=n-1`. Invariant: [0..low-1]=0s, [low..mid-1]=1s, [mid..high]=unsorted, [high+1..n-1]=2s.",
      },
      {
        step: 3,
        phase: "Loop Construction",
        title: "While mid ≤ high",
        detail:
          "If arr[mid]==0: swap(low,mid), low++, mid++. If arr[mid]==1: mid++ only. If arr[mid]==2: swap(mid,high), high-- (DON'T increment mid — the swapped value is unchecked!).",
      },
      {
        step: 4,
        phase: "Complexity",
        title: "Why O(n) with O(1) space?",
        detail:
          "mid visits each element at most once. Even with swaps, no element is processed more than twice. Only 3 extra pointer variables — constant space.",
      },
    ],

    annotatedCode: [
      { id: 0, code: "n = int(input())", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false },
      { id: 1, code: "arr = [int(input()) for _ in range(n)]", timeNote: "O(n)", spaceNote: "O(n) — the array", isLoop: false },
      { id: 2, code: "low, mid, high = 0, 0, n - 1", timeNote: "O(1) — 3 assignments", spaceNote: "O(1) — 3 vars", isLoop: false },
      { id: 3, code: "while mid <= high:", timeNote: "O(n) — mid visits each element once", spaceNote: "O(1)", isLoop: true, loopNote: "Each iteration: mid advances or high retreats → terminates in n steps" },
      { id: 4, code: "    if arr[mid] == 0:", timeNote: "O(1) — compare", spaceNote: "O(1)", isLoop: false, indent: 1 },
      { id: 5, code: "        arr[low], arr[mid] = arr[mid], arr[low]", timeNote: "O(1) — swap", spaceNote: "O(1) — in-place", isLoop: false, indent: 2 },
      { id: 6, code: "        low += 1; mid += 1", timeNote: "O(1) — two increments", spaceNote: "O(1)", isLoop: false, indent: 2 },
      { id: 7, code: "    elif arr[mid] == 1:", timeNote: "O(1) — compare", spaceNote: "O(1)", isLoop: false, indent: 1 },
      { id: 8, code: "        mid += 1", timeNote: "O(1) — advance mid only", spaceNote: "O(1)", isLoop: false, indent: 2 },
      { id: 9, code: "    else:  # arr[mid] == 2", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false, indent: 1 },
      { id: 10, code: "        arr[mid], arr[high] = arr[high], arr[mid]", timeNote: "O(1) — swap", spaceNote: "O(1) — in-place", isLoop: false, indent: 2 },
      { id: 11, code: "        high -= 1  # NOT mid++!", timeNote: "O(1) — must re-check mid", spaceNote: "O(1)", isLoop: false, indent: 2 },
      { id: 12, code: "print(*arr)", timeNote: "O(n) — output", spaceNote: "O(1)", isLoop: false },
    ],

    example: { input: "n=7, arr=[1,0,2,0,1,0,2]" },
    steps: [
      { lineId: 2, vars: { arr: [1,0,2,0,1,0,2], low: 0, mid: 0, high: 6 }, highlight: [2], desc: "Initialize: low=0, mid=0, high=6. Three zones set up.", timeOps: 3, spaceVars: ["arr[7]","low","mid","high"] },
      { lineId: 3, vars: { arr: [1,0,2,0,1,0,2], low: 0, mid: 0, high: 6 }, highlight: [3,7,8], desc: "mid=0, arr[0]=1 → mid++ only. 1 goes to middle zone.", timeOps: 4, spaceVars: ["arr[7]","low","mid","high"] },
      { lineId: 3, vars: { arr: [0,1,2,0,1,0,2], low: 1, mid: 2, high: 6 }, highlight: [3,4,5,6], desc: "mid=1, arr[1]=0 → swap(0,1), low=1, mid=2. Zero sent to left.", timeOps: 7, spaceVars: ["arr[7]","low","mid","high"] },
      { lineId: 3, vars: { arr: [0,1,2,0,1,0,2], low: 1, mid: 2, high: 5 }, highlight: [3,9,10,11], desc: "mid=2, arr[2]=2 → swap(2,6), high=5. Two sent to right. mid stays!", timeOps: 10, spaceVars: ["arr[7]","low","mid","high"] },
      { lineId: 3, vars: { arr: [0,1,0,0,1,2,2], low: 2, mid: 3, high: 4 }, highlight: [3,4,5,6], desc: "mid=2, arr[2]=0 → swap(1,2), low=2, mid=3. Another zero sorted.", timeOps: 14, spaceVars: ["arr[7]","low","mid","high"] },
      { lineId: 3, vars: { arr: [0,0,0,1,1,2,2], low: 3, mid: 4, high: 4 }, highlight: [3,4,5,6], desc: "mid=3, arr[3]=0 → swap(2,3), low=3, mid=4.", timeOps: 17, spaceVars: ["arr[7]","low","mid","high"] },
      { lineId: 3, vars: { arr: [0,0,0,1,1,2,2], low: 3, mid: 5, high: 4 }, highlight: [3,7,8], desc: "mid=4, arr[4]=1 → mid++. Loop ends (mid=5 > high=4).", timeOps: 19, spaceVars: ["arr[7]","low","mid","high"] },
      { lineId: 12, vars: { arr: [0,0,0,1,1,2,2] }, highlight: [12], desc: "Print: 0 0 0 1 1 2 2 ✓  T=O(n), S=O(1).", timeOps: 19, spaceVars: ["arr[7]","low","mid","high"] },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 4,
    title: "Count Elements Greater Than All Previous",
    source: "TCS NQT – Day 2, Slot 1",
    category: "Array",
    difficulty: "Easy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    tags: ["Running Maximum", "Single Pass"],

    metaphor: {
      icon: "🏆",
      title: "Record Breakers in a Race",
      story:
        "Imagine race results coming in one by one. We track the 'world record' so far. Every time a new result beats the current record, it's a 'record breaker' — count it! The very first result always sets the first record. We only need to remember ONE number at a time — the current maximum.",
      visual: [
        { label: "Running max →", desc: "the best seen so far" },
        { label: "New element > max?", desc: "record broken → count it, update max" },
        { label: "New element ≤ max?", desc: "not a record → skip" },
      ],
    },

    breakdown: [
      {
        step: 1,
        phase: "Observe",
        title: "When is an element 'a record'?",
        detail:
          "An element qualifies if it's greater than ALL elements before it. Equivalently: it's greater than the running maximum up to that point.",
      },
      {
        step: 2,
        phase: "Key Insight",
        title: "Track just one value: the running max",
        detail:
          "You don't need to compare against all previous elements. Just maintain `max_so_far`. If current > max_so_far → it's a record, update max_so_far and increment count.",
      },
      {
        step: 3,
        phase: "Loop Construction",
        title: "Single pass, single variable",
        detail:
          "Initialize max_so_far = -infinity, count = 0. For each element: if element >= max_so_far → count++, max_so_far = element.",
      },
      {
        step: 4,
        phase: "Complexity",
        title: "O(n) time, O(1) space — optimal",
        detail:
          "We visit each element once — can't do better (must see every element at least once). We keep only 2 extra variables regardless of n.",
      },
    ],

    annotatedCode: [
      { id: 0, code: "n = int(input())", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false },
      { id: 1, code: "max_so_far = float('-inf')", timeNote: "O(1) — init sentinel", spaceNote: "O(1) — one var", isLoop: false },
      { id: 2, code: "count = 0", timeNote: "O(1) — init counter", spaceNote: "O(1) — one var", isLoop: false },
      { id: 3, code: "for _ in range(n):", timeNote: "O(n) — loop runs n times", spaceNote: "O(1)", isLoop: true, loopNote: "Each iteration is O(1) → total O(n)" },
      { id: 4, code: "    x = int(input())", timeNote: "O(1) — read one element", spaceNote: "O(1) — one temp var", isLoop: false, indent: 1 },
      { id: 5, code: "    if x >= max_so_far:", timeNote: "O(1) — single compare", spaceNote: "O(1)", isLoop: false, indent: 1 },
      { id: 6, code: "        max_so_far = x", timeNote: "O(1) — update max", spaceNote: "O(1) — reuse var", isLoop: false, indent: 2 },
      { id: 7, code: "        count += 1", timeNote: "O(1) — increment", spaceNote: "O(1)", isLoop: false, indent: 2 },
      { id: 8, code: "print(count)", timeNote: "O(1) — single print", spaceNote: "O(1)", isLoop: false },
    ],

    example: { input: "n=5, arr=[7,4,8,2,9]" },
    steps: [
      { lineId: 1, vars: { max_so_far: "-∞", count: 0 }, highlight: [1,2], desc: "Initialize max_so_far=-∞ (will be beaten by any number), count=0.", timeOps: 2, spaceVars: ["n","max_so_far","count"] },
      { lineId: 3, vars: { max_so_far: 7, count: 1, x: 7 }, highlight: [3,4,5,6,7], desc: "x=7 ≥ -∞ → NEW RECORD! max_so_far=7, count=1. (1st element always qualifies)", timeOps: 5, spaceVars: ["n","max_so_far","count","x"] },
      { lineId: 3, vars: { max_so_far: 7, count: 1, x: 4 }, highlight: [3,4,5], desc: "x=4 < 7 → not a record. Skip. count stays 1.", timeOps: 8, spaceVars: ["n","max_so_far","count","x"] },
      { lineId: 3, vars: { max_so_far: 8, count: 2, x: 8 }, highlight: [3,4,5,6,7], desc: "x=8 > 7 → NEW RECORD! max_so_far=8, count=2.", timeOps: 11, spaceVars: ["n","max_so_far","count","x"] },
      { lineId: 3, vars: { max_so_far: 8, count: 2, x: 2 }, highlight: [3,4,5], desc: "x=2 < 8 → not a record. count stays 2.", timeOps: 14, spaceVars: ["n","max_so_far","count","x"] },
      { lineId: 3, vars: { max_so_far: 9, count: 3, x: 9 }, highlight: [3,4,5,6,7], desc: "x=9 > 8 → NEW RECORD! max_so_far=9, count=3.", timeOps: 17, spaceVars: ["n","max_so_far","count","x"] },
      { lineId: 8, vars: { count: 3 }, highlight: [8], desc: "Print 3. Done! T=O(n), S=O(1).", timeOps: 18, spaceVars: ["n","max_so_far","count"] },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 5,
    title: "Product of Digits",
    source: "TCS NQT – Day 2, Slot 1",
    category: "Math / String",
    difficulty: "Easy",
    timeComplexity: "O(d) where d=digits",
    spaceComplexity: "O(1)",
    tags: ["String Traversal", "Math"],

    metaphor: {
      icon: "🛒",
      title: "Supermarket Barcode Scanner",
      story:
        "The scanner reads a product code digit by digit, like reading a number's digits left to right. For each digit it reads, it multiplies it into a running total (starting at 1, since 1 is the identity for multiplication). At the end, the total is the price.",
      visual: [
        { label: "product = 1", desc: "start with multiplicative identity" },
        { label: "for each char in string", desc: "convert '5' → int 5" },
        { label: "product *= digit", desc: "accumulate" },
      ],
    },

    breakdown: [
      {
        step: 1,
        phase: "Observe",
        title: "Treat number as a string",
        detail:
          "Reading digits of a number is easiest when you treat it as a string — iterate over characters and convert each to int. No math needed to extract digits.",
      },
      {
        step: 2,
        phase: "Key Insight",
        title: "Multiplicative accumulator",
        detail:
          "Start with `product = 1` (not 0, because 0 would zero everything out). Multiply each digit in. This is a simple reduce/fold operation.",
      },
      {
        step: 3,
        phase: "Loop Construction",
        title: "Single for loop over string",
        detail:
          "For each char c in the string: product *= int(c). Loop runs d times where d = number of digits = floor(log10(n)) + 1.",
      },
      {
        step: 4,
        phase: "Complexity",
        title: "O(d) time where d = digit count",
        detail:
          "For n ≤ 10000, d ≤ 5. So this is practically O(1) for bounded inputs. Truly O(log n) in terms of n, since d = O(log₁₀ n).",
      },
    ],

    annotatedCode: [
      { id: 0, code: "s = input()  # read as string", timeNote: "O(1)", spaceNote: "O(d) — stores d chars", isLoop: false },
      { id: 1, code: "product = 1  # multiplicative identity", timeNote: "O(1)", spaceNote: "O(1) — one var", isLoop: false },
      { id: 2, code: "for c in s:", timeNote: "O(d) — d = number of digits", spaceNote: "O(1)", isLoop: true, loopNote: "d iterations, each O(1) → O(d) total" },
      { id: 3, code: "    product *= int(c)", timeNote: "O(1) — multiply + type conv", spaceNote: "O(1) — reuse product", isLoop: false, indent: 1 },
      { id: 4, code: "print(product)", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false },
    ],

    example: { input: "n=5244" },
    steps: [
      { lineId: 0, vars: { s: "5244" }, highlight: [0], desc: "Read '5244' as a string. 4 characters to process.", timeOps: 1, spaceVars: ["s"] },
      { lineId: 1, vars: { s: "5244", product: 1 }, highlight: [1], desc: "product=1 (identity for multiplication — multiplying by 1 changes nothing)", timeOps: 2, spaceVars: ["s","product"] },
      { lineId: 2, vars: { s: "5244", product: 5, c: "5" }, highlight: [2,3], desc: "c='5' → product = 1 × 5 = 5", timeOps: 4, spaceVars: ["s","product","c"] },
      { lineId: 2, vars: { s: "5244", product: 10, c: "2" }, highlight: [2,3], desc: "c='2' → product = 5 × 2 = 10", timeOps: 6, spaceVars: ["s","product","c"] },
      { lineId: 2, vars: { s: "5244", product: 40, c: "4" }, highlight: [2,3], desc: "c='4' → product = 10 × 4 = 40", timeOps: 8, spaceVars: ["s","product","c"] },
      { lineId: 2, vars: { s: "5244", product: 160, c: "4" }, highlight: [2,3], desc: "c='4' → product = 40 × 4 = 160. Loop ends.", timeOps: 10, spaceVars: ["s","product","c"] },
      { lineId: 4, vars: { product: 160 }, highlight: [4], desc: "Print 160. 5×2×4×4 = 160 ✓  T=O(d), S=O(1).", timeOps: 11, spaceVars: ["s","product"] },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 6,
    title: "Count Sundays in N Days",
    source: "TCS NQT – Day 1, Slot 2",
    category: "Math",
    difficulty: "Easy",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    tags: ["Calendar Math", "Modular Arithmetic"],

    metaphor: {
      icon: "📅",
      title: "Calendar Jump",
      story:
        "You're counting Sundays on a calendar. First, figure out how many days until the FIRST Sunday. Then, after that, a Sunday comes every 7 days. So: `days_remaining / 7` gives additional Sundays. Add 1 for the first one. It's like calculating train stops: first stop at distance `d`, then every 7 km after that.",
      visual: [
        { label: "days to first Sunday", desc: "depends on starting weekday" },
        { label: "(n - offset) / 7", desc: "additional Sundays after first" },
        { label: "total = 1 + floor((n-offset)/7)", desc: "if n ≥ offset" },
      ],
    },

    breakdown: [
      {
        step: 1,
        phase: "Observe",
        title: "Map weekday to offset",
        detail:
          "If we start on Monday, Sunday is 6 days away. Tuesday → 5 days. Wednesday → 4. Thursday → 3. Friday → 2. Saturday → 1. Sunday → 0 (already a Sunday!).",
      },
      {
        step: 2,
        phase: "Key Insight",
        title: "Pure arithmetic — no loop needed",
        detail:
          "Once you know the offset, total Sundays = 0 if n < offset, else 1 + (n - offset) // 7. This is O(1) — constant time, constant space.",
      },
      {
        step: 3,
        phase: "Loop Construction",
        title: "No loop! Just a formula",
        detail:
          "The solution is a direct formula. This is a key problem-solving skill: recognize when math replaces iteration entirely. Looping through days would be O(n) — unnecessary.",
      },
      {
        step: 4,
        phase: "Complexity",
        title: "O(1) time AND space",
        detail:
          "Fixed number of operations regardless of n. 7 weekday strings, one dictionary lookup, one formula — all constant.",
      },
    ],

    annotatedCode: [
      { id: 0, code: "day = input().lower()", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false },
      { id: 1, code: "n = int(input())", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false },
      { id: 2, code: "offsets = {'mon':6,'tue':5,'wed':4,'thu':3,'fri':2,'sat':1,'sun':0}", timeNote: "O(1) — 7 fixed entries", spaceNote: "O(1) — constant dict", isLoop: false },
      { id: 3, code: "offset = offsets[day]", timeNote: "O(1) — hash lookup", spaceNote: "O(1)", isLoop: false },
      { id: 4, code: "if n >= offset:", timeNote: "O(1) — compare", spaceNote: "O(1)", isLoop: false },
      { id: 5, code: "    result = 1 + (n - offset) // 7", timeNote: "O(1) — arithmetic formula", spaceNote: "O(1)", isLoop: false, indent: 1 },
      { id: 6, code: "else:", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false },
      { id: 7, code: "    result = 0", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false, indent: 1 },
      { id: 8, code: "print(result)", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false },
    ],

    example: { input: "day='mon', n=13" },
    steps: [
      { lineId: 2, vars: { day: "mon", n: 13, offsets: "{...}" }, highlight: [0,1,2], desc: "Read day='mon', n=13. Build offsets map: monday is 6 days from sunday.", timeOps: 3, spaceVars: ["day","n","offsets"] },
      { lineId: 3, vars: { day: "mon", n: 13, offset: 6 }, highlight: [3], desc: "offset = offsets['mon'] = 6. First Sunday is 6 days away.", timeOps: 4, spaceVars: ["day","n","offsets","offset"] },
      { lineId: 4, vars: { day: "mon", n: 13, offset: 6 }, highlight: [4], desc: "n=13 ≥ offset=6 → at least one Sunday fits", timeOps: 5, spaceVars: ["day","n","offset"] },
      { lineId: 5, vars: { day: "mon", n: 13, offset: 6, result: 2 }, highlight: [5], desc: "result = 1 + (13-6)//7 = 1 + 7//7 = 1 + 1 = 2 Sundays!", timeOps: 6, spaceVars: ["day","n","offset","result"] },
      { lineId: 8, vars: { result: 2 }, highlight: [8], desc: "Print 2. ✓ T=O(1), S=O(1) — pure math wins!", timeOps: 7, spaceVars: ["result"] },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 7,
    title: "Verbal Kho-Kho",
    source: "TCS NQT Advanced – Set 1, Q1",
    category: "Array",
    difficulty: "Easy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    tags: ["Counting", "Single Pass", "Array"],

    metaphor: {
      icon: "📞",
      title: "Telephone Game (Chinese Whispers)",
      story:
        "Kids sit in a circle. The first child whispers a number. It passes along. By the end, how many got it wrong? Simple: the correct digit is whatever the first friend heard (arr[0]). Everyone else must match it. Count who doesn't — they broke the chain.",
      visual: [
        { label: "arr[0] = truth", desc: "first friend got the original digit" },
        { label: "count mismatches", desc: "anyone who differs from arr[0]" },
        { label: "answer = n - matches", desc: "total - correct = wrong" },
      ],
    },

    breakdown: [
      {
        step: 1,
        phase: "Observe",
        title: "What is the 'correct' digit?",
        detail: "The message started at friend 1 = arr[0]. Every friend should have the same digit. Any difference means they got it wrong.",
      },
      {
        step: 2,
        phase: "Key Insight",
        title: "count() is your friend",
        detail: "arr.count(arr[0]) gives how many people have the correct digit. n minus that = how many got it wrong. No explicit loop needed!",
      },
      {
        step: 3,
        phase: "Loop Construction",
        title: "Python's count() is O(n) internally",
        detail: "Python's built-in count() scans the array once — O(n). The answer is just `n - arr.count(arr[0])`. One line of logic.",
      },
      {
        step: 4,
        phase: "Complexity",
        title: "O(n) time, O(1) space",
        detail: "Single pass through the array. No extra data structures. Just compare each element with the target value.",
      },
    ],

    annotatedCode: [
      { id: 0, code: "n = int(input())", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false },
      { id: 1, code: "arr = list(map(int, input().split()))", timeNote: "O(n) — parse n values", spaceNote: "O(n) — stores array", isLoop: false },
      { id: 2, code: "correct = arr[0]  # the original digit", timeNote: "O(1) — index access", spaceNote: "O(1) — one var", isLoop: false },
      { id: 3, code: "matches = arr.count(correct)", timeNote: "O(n) — scans entire array", spaceNote: "O(1) — counter only", isLoop: false },
      { id: 4, code: "print(n - matches)", timeNote: "O(1) — subtraction", spaceNote: "O(1)", isLoop: false },
    ],

    example: { input: "n=5, arr=[1,2,3,2,2]" },
    steps: [
      { lineId: 1, vars: { n: 5, arr: [1,2,3,2,2] }, highlight: [1], desc: "Read 5 values into arr.", timeOps: 6, spaceVars: ["n","arr[5]"] },
      { lineId: 2, vars: { n: 5, arr: [1,2,3,2,2], correct: 1 }, highlight: [2], desc: "correct = arr[0] = 1. The true digit is 1.", timeOps: 7, spaceVars: ["n","arr[5]","correct"] },
      { lineId: 3, vars: { n: 5, arr: [1,2,3,2,2], correct: 1, matches: 1 }, highlight: [3], desc: "arr.count(1) = 1. Only arr[0]=1 matches. 4 people got it wrong!", timeOps: 12, spaceVars: ["n","arr[5]","correct","matches"] },
      { lineId: 4, vars: { n: 5, matches: 1, result: 4 }, highlight: [4], desc: "Print n - matches = 5 - 1 = 4. ✓  T=O(n), S=O(1).", timeOps: 13, spaceVars: ["n","matches"] },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 8,
    title: "Max Subarray Length with Sum < K",
    source: "TCS NQT Advanced – Set 1, Q2",
    category: "Array",
    difficulty: "Medium",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    tags: ["Sliding Window", "Two Pointer", "Subarray"],

    metaphor: {
      icon: "🪟",
      title: "Rubber Band Window",
      story:
        "Imagine a rubber band stretched over a number line. The left end is `L`, the right end is `R`. You expand R to include more horses. If the total cost goes ≥ K, snap! Shrink from the left (L++) to reduce cost. The longest the band ever stretched without snapping is your answer. This is the Sliding Window pattern.",
      visual: [
        { label: "L = left boundary", desc: "shrinks when sum ≥ K" },
        { label: "R = right boundary", desc: "always expands right" },
        { label: "max(R - L) tracked", desc: "best window seen so far" },
      ],
    },

    breakdown: [
      {
        step: 1,
        phase: "Observe",
        title: "Contiguous subarray + sum constraint",
        detail: "Key signal: 'continuous sequence' + sum condition. This screams Sliding Window. Naive O(n²) works but misses the pattern.",
      },
      {
        step: 2,
        phase: "Key Insight",
        title: "Sliding window: two pointers L and R",
        detail: "Both start at 0. Expand R each step, add arr[R] to window_sum. If window_sum ≥ K, shrink from left: subtract arr[L], L++. Track max R-L.",
      },
      {
        step: 3,
        phase: "Loop Construction",
        title: "Single while loop, R advances every iteration",
        detail: "while R < n: add arr[R] to sum, R++. While sum ≥ K: remove arr[L], L++. ans = max(ans, R-L). R never goes backwards → O(n) total.",
      },
      {
        step: 4,
        phase: "Complexity",
        title: "O(n) time — each element enters and leaves window once",
        detail: "R moves from 0 to n-1 (n steps). L also moves at most n steps total across the whole loop. Total: 2n operations = O(n).",
      },
    ],

    annotatedCode: [
      { id: 0, code: "n, k = map(int, input().split())", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false },
      { id: 1, code: "arr = list(map(int, input().split()))", timeNote: "O(n)", spaceNote: "O(n) — the array", isLoop: false },
      { id: 2, code: "L, R, window_sum, ans = 0, 0, 0, 0", timeNote: "O(1) — 4 vars", spaceNote: "O(1) — constant vars", isLoop: false },
      { id: 3, code: "while R < n:", timeNote: "O(n) — R advances n times total", spaceNote: "O(1)", isLoop: true, loopNote: "R moves right once per iter. L moves right at most n times total." },
      { id: 4, code: "    window_sum += arr[R]", timeNote: "O(1) — add right element", spaceNote: "O(1)", isLoop: false, indent: 1 },
      { id: 5, code: "    R += 1", timeNote: "O(1) — advance right", spaceNote: "O(1)", isLoop: false, indent: 1 },
      { id: 6, code: "    while window_sum >= k:", timeNote: "O(1) amortized — L moves ≤ n total", spaceNote: "O(1)", isLoop: true, loopNote: "L never exceeds R → combined O(n)" },
      { id: 7, code: "        window_sum -= arr[L]", timeNote: "O(1) — remove left element", spaceNote: "O(1)", isLoop: false, indent: 2 },
      { id: 8, code: "        L += 1", timeNote: "O(1) — shrink left", spaceNote: "O(1)", isLoop: false, indent: 2 },
      { id: 9, code: "    ans = max(ans, R - L)", timeNote: "O(1) — track max window", spaceNote: "O(1)", isLoop: false, indent: 1 },
      { id: 10, code: "print(ans)", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false },
    ],

    example: { input: "n=10, k=100, arr=[30,40,50,20,20,10,90,10,10,10]" },
    steps: [
      { lineId: 2, vars: { L: 0, R: 0, window_sum: 0, ans: 0 }, highlight: [2], desc: "Init: L=R=0, window empty, ans=0.", timeOps: 4, spaceVars: ["n","k","arr[10]","L","R","window_sum","ans"] },
      { lineId: 3, vars: { L: 0, R: 1, window_sum: 30, ans: 0 }, highlight: [3,4,5,9], desc: "R=0 → add arr[0]=30. sum=30 < 100. ans=max(0,1)=1.", timeOps: 7, spaceVars: ["L","R","window_sum","ans"] },
      { lineId: 3, vars: { L: 0, R: 2, window_sum: 70, ans: 2 }, highlight: [3,4,5,9], desc: "R=1 → add arr[1]=40. sum=70 < 100. ans=max(1,2)=2.", timeOps: 10, spaceVars: ["L","R","window_sum","ans"] },
      { lineId: 3, vars: { L: 1, R: 3, window_sum: 90, ans: 2 }, highlight: [3,4,5,6,7,8,9], desc: "R=2 → add arr[2]=50. sum=120 ≥ 100! Shrink: remove arr[0]=30, L=1. sum=90. ans=max(2,2)=2.", timeOps: 15, spaceVars: ["L","R","window_sum","ans"] },
      { lineId: 3, vars: { L: 1, R: 4, window_sum: 110, ans: 3 }, highlight: [3,4,5,6,7,8,9], desc: "R=3 → add 20. sum=110 ≥ 100! Shrink: remove arr[1]=40, L=2. sum=70. ans=max(2,2)=2... window [50,20,20] next.", timeOps: 20, spaceVars: ["L","R","window_sum","ans"] },
      { lineId: 3, vars: { L: 2, R: 5, window_sum: 90, ans: 3 }, highlight: [3,4,5,9], desc: "R=4 → add arr[4]=20. sum=90 < 100. ans=max(2,3)=3. Window [50,20,20] length 3!", timeOps: 23, spaceVars: ["L","R","window_sum","ans"] },
      { lineId: 10, vars: { ans: 3 }, highlight: [10], desc: "Continue... final ans=3. T=O(n), S=O(1).", timeOps: 40, spaceVars: ["ans"] },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 9,
    title: "Subarray with Exact Sum K",
    source: "TCS NQT Advanced – Set 1, Q3",
    category: "Array",
    difficulty: "Medium",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    tags: ["Prefix Sum", "Hash Map", "Subarray"],

    metaphor: {
      icon: "🏰",
      title: "Golden House Budget Trip",
      story:
        "You're walking through rooms collecting gold. You need exactly K coins. Think of it as a running total (prefix sum). If at room j your total is P[j], and at some earlier room i your total was P[i], then the gold collected from room i+1 to j = P[j] - P[i]. We want P[j] - P[i] = K, i.e., P[i] = P[j] - K. Store prefix sums in a hash map and look up instantly!",
      visual: [
        { label: "prefix[j] = sum(arr[0..j])", desc: "running total" },
        { label: "need = prefix[j] - K", desc: "what prefix sum we need earlier" },
        { label: "if need in map → found!", desc: "subarray exists" },
      ],
    },

    breakdown: [
      {
        step: 1,
        phase: "Observe",
        title: "Find contiguous subarray summing to exactly K",
        detail: "Brute force: try every pair (i,j), compute sum, check if == K. That's O(n²). We can do O(n) with prefix sums.",
      },
      {
        step: 2,
        phase: "Key Insight",
        title: "Prefix sum + hash map",
        detail: "prefix[j] = arr[0]+...+arr[j]. Sum from i to j = prefix[j] - prefix[i-1]. We want this = K, so we want prefix[i-1] = prefix[j] - K. Store each prefix sum with its index.",
      },
      {
        step: 3,
        phase: "Loop Construction",
        title: "Single pass with hash map lookup",
        detail: "For each j: compute running sum. Check if (running_sum - K) exists in map. If yes → found. Store running_sum in map with index. O(1) hash lookup each step.",
      },
      {
        step: 4,
        phase: "Complexity",
        title: "O(n) time, O(n) space",
        detail: "One pass, n iterations. Hash map stores at most n+1 prefix sums. Lookup is O(1) amortized. Trade O(n) space for time improvement from O(n²) to O(n).",
      },
    ],

    annotatedCode: [
      { id: 0, code: "n, k = map(int, input().split())", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false },
      { id: 1, code: "arr = list(map(int, input().split()))", timeNote: "O(n)", spaceNote: "O(n) — the array", isLoop: false },
      { id: 2, code: "prefix_map = {0: 0}  # sum→index (1-based)", timeNote: "O(1) — init with base case", spaceNote: "O(n) — grows to n+1 entries", isLoop: false },
      { id: 3, code: "running = 0", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false },
      { id: 4, code: "for j in range(1, n + 1):", timeNote: "O(n) — n iterations", spaceNote: "O(1) — loop var", isLoop: true, loopNote: "Each iter: O(1) hash ops → total O(n)" },
      { id: 5, code: "    running += arr[j - 1]", timeNote: "O(1) — accumulate", spaceNote: "O(1)", isLoop: false, indent: 1 },
      { id: 6, code: "    if running - k in prefix_map:", timeNote: "O(1) — hash lookup", spaceNote: "O(1)", isLoop: false, indent: 1 },
      { id: 7, code: "        i = prefix_map[running - k]", timeNote: "O(1) — hash read", spaceNote: "O(1)", isLoop: false, indent: 2 },
      { id: 8, code: "        print(i + 1, j); break", timeNote: "O(1) — found!", spaceNote: "O(1)", isLoop: false, indent: 2 },
      { id: 9, code: "    prefix_map[running] = j", timeNote: "O(1) — hash write", spaceNote: "O(1) per entry, O(n) total", isLoop: false, indent: 1 },
    ],

    example: { input: "n=10, k=15, arr=[5,3,7,14,18,1,18,4,8,3]" },
    steps: [
      { lineId: 2, vars: { prefix_map: "{0:0}", running: 0 }, highlight: [2,3], desc: "Init: prefix_map={0:0}, running=0. Base case: before any element, prefix sum is 0 at position 0.", timeOps: 2, spaceVars: ["n","k","arr[10]","prefix_map","running"] },
      { lineId: 4, vars: { running: 5, j: 1, prefix_map: "{0:0,5:1}" }, highlight: [4,5,6,9], desc: "j=1: running=5. Need 5-15=-10? No. Store prefix_map[5]=1.", timeOps: 5, spaceVars: ["running","j","prefix_map"] },
      { lineId: 4, vars: { running: 8, j: 2, prefix_map: "{0:0,5:1,8:2}" }, highlight: [4,5,6,9], desc: "j=2: running=8. Need 8-15=-7? No. Store 8.", timeOps: 8, spaceVars: ["running","j","prefix_map"] },
      { lineId: 4, vars: { running: 15, j: 3 }, highlight: [4,5,6,7,8], desc: "j=3: running=15. Need 15-15=0? YES! 0 is in map at index 0. Answer: rooms 0+1=1 to 3!", timeOps: 11, spaceVars: ["running","j","prefix_map"] },
      { lineId: 8, vars: { result: "1 3" }, highlight: [8], desc: "Print '1 3'. Subarray arr[0..2]=[5,3,7], sum=15 ✓  T=O(n), S=O(n).", timeOps: 12, spaceVars: ["running","j"] },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 10,
    title: "Jack's Drum Beats (Permutation Cycles)",
    source: "TCS NQT Advanced – Set 1, Q5",
    category: "Math / Graph",
    difficulty: "Hard",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    tags: ["Permutation", "Cycle Detection", "LCM"],

    metaphor: {
      icon: "🥁",
      title: "Musical Chairs Cycle",
      story:
        "Students follow boards like arrows. Student at position 1 goes to board[1], then to board[board[1]], etc. Eventually they return to start — that's a CYCLE. If cycle lengths are 3 and 2, everyone returns after LCM(3,2)=6 beats. LCM ensures ALL cycles complete simultaneously. Find all cycle lengths, take their LCM.",
      visual: [
        { label: "Board [2,3,1,5,4]", desc: "1→2→3→1 (cycle len 3) and 4→5→4 (cycle len 2)" },
        { label: "LCM(3, 2) = 6", desc: "beats until everyone is back" },
        { label: "LCM of all cycles", desc: "answer is LCM, not sum!" },
      ],
    },

    breakdown: [
      {
        step: 1,
        phase: "Observe",
        title: "Every student follows a cycle",
        detail: "Board is a permutation. Starting from any student and following board arrows, you always return to start. This forms a cycle. Different students may be in the same or different cycles.",
      },
      {
        step: 2,
        phase: "Key Insight",
        title: "Answer = LCM of all cycle lengths",
        detail: "A cycle of length L takes L beats to complete. If there are multiple cycles with lengths L1, L2, ..., all complete simultaneously after LCM(L1, L2, ...) beats.",
      },
      {
        step: 3,
        phase: "Loop Construction",
        title: "DFS/traversal to find cycles",
        detail: "Use a visited[] array. For each unvisited node, follow the chain until you revisit — counting the length. Use GCD to compute LCM incrementally: LCM(a,b) = a*b/GCD(a,b).",
      },
      {
        step: 4,
        phase: "Complexity",
        title: "O(n log n) — cycle finding O(n), LCM O(log n) per cycle",
        detail: "Visiting all nodes is O(n). LCM computation with Euclidean GCD is O(log n) per pair. Overall O(n log n).",
      },
    ],

    annotatedCode: [
      { id: 0, code: "from math import gcd", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false },
      { id: 1, code: "n = int(input())", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false },
      { id: 2, code: "B = [int(input()) for _ in range(n)]", timeNote: "O(n)", spaceNote: "O(n)", isLoop: false },
      { id: 3, code: "visited = [False] * (n + 1)", timeNote: "O(n)", spaceNote: "O(n) — tracks visited", isLoop: false },
      { id: 4, code: "ans = 1", timeNote: "O(1) — LCM identity is 1", spaceNote: "O(1)", isLoop: false },
      { id: 5, code: "for i in range(1, n + 1):", timeNote: "O(n) — outer loop", spaceNote: "O(1)", isLoop: true, loopNote: "Each node visited exactly once overall" },
      { id: 6, code: "    if not visited[i]:", timeNote: "O(1) — check", spaceNote: "O(1)", isLoop: false, indent: 1 },
      { id: 7, code: "        cycle_len, cur = 0, i", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false, indent: 2 },
      { id: 8, code: "        while not visited[cur]:", timeNote: "O(cycle_len) — trace cycle", spaceNote: "O(1)", isLoop: true, loopNote: "Terminates when cycle closes" },
      { id: 9, code: "            visited[cur] = True", timeNote: "O(1) — mark", spaceNote: "O(1)", isLoop: false, indent: 3 },
      { id: 10, code: "            cur = B[cur - 1]", timeNote: "O(1) — follow board", spaceNote: "O(1)", isLoop: false, indent: 3 },
      { id: 11, code: "            cycle_len += 1", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false, indent: 3 },
      { id: 12, code: "        ans = ans * cycle_len // gcd(ans, cycle_len)", timeNote: "O(log n) — GCD via Euclidean", spaceNote: "O(1)", isLoop: false, indent: 2 },
      { id: 13, code: "print(ans)", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false },
    ],

    example: { input: "n=5, B=[2,3,1,5,4]" },
    steps: [
      { lineId: 3, vars: { visited: "[F,F,F,F,F,F]", ans: 1 }, highlight: [3,4], desc: "Init visited all False, ans=1 (LCM identity).", timeOps: 7, spaceVars: ["n","B[5]","visited[6]","ans"] },
      { lineId: 5, vars: { i: 1, cur: 1, cycle_len: 0 }, highlight: [5,6,7], desc: "i=1, not visited. Start tracing cycle from node 1.", timeOps: 9, spaceVars: ["i","cur","cycle_len","ans"] },
      { lineId: 8, vars: { cur: 2, cycle_len: 1 }, highlight: [8,9,10,11], desc: "Follow B[1-1]=B[0]=2. cur=2, cycle_len=1. Mark 1 visited.", timeOps: 12, spaceVars: ["i","cur","cycle_len"] },
      { lineId: 8, vars: { cur: 3, cycle_len: 2 }, highlight: [8,9,10,11], desc: "Follow B[2-1]=B[1]=3. cur=3, cycle_len=2. Mark 2 visited.", timeOps: 15, spaceVars: ["i","cur","cycle_len"] },
      { lineId: 8, vars: { cur: 1, cycle_len: 3 }, highlight: [8,9,10,11], desc: "Follow B[3-1]=B[2]=1. cur=1, cycle_len=3. Mark 3 visited.", timeOps: 18, spaceVars: ["i","cur","cycle_len"] },
      { lineId: 12, vars: { cycle_len: 3, ans: 3 }, highlight: [12], desc: "cur=1 already visited! Cycle 1→2→3→1 has length 3. LCM(1,3)=3.", timeOps: 20, spaceVars: ["cycle_len","ans"] },
      { lineId: 5, vars: { i: 4, cycle_len: 2, ans: 6 }, highlight: [5,6,7,8,9,10,11,12], desc: "i=4 not visited. Trace: 4→5→4. Cycle length=2. LCM(3,2)=6.", timeOps: 28, spaceVars: ["i","cycle_len","ans"] },
      { lineId: 13, vars: { ans: 6 }, highlight: [13], desc: "Print 6. ✓ Beats needed = LCM(3,2) = 6. T=O(n log n), S=O(n).", timeOps: 29, spaceVars: ["ans"] },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 11,
    title: "String Conversion A to B",
    source: "TCS NQT Advanced – Set 1, Q6",
    category: "String / Greedy",
    difficulty: "Medium",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    tags: ["Greedy", "String", "Logic"],

    metaphor: {
      icon: "🎨",
      title: "Paint-by-Numbers Correction",
      story:
        "You have a painting A and want it to look like B. The rule: pick any group of letters, the smallest in the group 'wins' and paints over the rest. You can only make letters smaller (move earlier in alphabet), never larger. If B has a letter that's LARGER than A in the same spot, it's impossible — return -1. Otherwise, count how many 'correction passes' you need.",
      visual: [
        { label: "B[i] < A[i]?", desc: "impossible — can't make letters larger" },
        { label: "B[i] == A[i]", desc: "already correct, skip" },
        { label: "B[i] > A[i]", desc: "wait — need to find group to replace with B[i]" },
      ],
    },

    breakdown: [
      {
        step: 1,
        phase: "Observe",
        title: "When is it impossible?",
        detail: "The operation can only DECREASE letters (replace with the minimum). So if B[i] < A[i] at any position, it's impossible — return -1.",
      },
      {
        step: 2,
        phase: "Key Insight",
        title: "Count groups of consecutive mismatches",
        detail: "Each 'operation' can fix one consecutive group where A[i] > B[i]. Count how many such distinct groups there are — each needs one operation.",
      },
      {
        step: 3,
        phase: "Loop Construction",
        title: "Scan left to right, count transitions",
        detail: "prev_mismatch = False. For each i: if A[i] != B[i] and not prev_mismatch → new group, count++. If A[i] == B[i]: prev_mismatch = False. Else: prev_mismatch = True.",
      },
      {
        step: 4,
        phase: "Complexity",
        title: "O(n) time, O(1) space",
        detail: "Single pass, tracking one boolean. No extra memory beyond the input strings.",
      },
    ],

    annotatedCode: [
      { id: 0, code: "n = int(input())", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false },
      { id: 1, code: "A = input()", timeNote: "O(n)", spaceNote: "O(n) — string", isLoop: false },
      { id: 2, code: "B = input()", timeNote: "O(n)", spaceNote: "O(n) — string", isLoop: false },
      { id: 3, code: "ops, in_group = 0, False", timeNote: "O(1)", spaceNote: "O(1) — 2 vars", isLoop: false },
      { id: 4, code: "for i in range(n):", timeNote: "O(n) — one scan", spaceNote: "O(1)", isLoop: true, loopNote: "n iterations, each O(1)" },
      { id: 5, code: "    if B[i] < A[i]:", timeNote: "O(1) — char compare", spaceNote: "O(1)", isLoop: false, indent: 1 },
      { id: 6, code: "        print(-1); exit()", timeNote: "O(1) — early exit", spaceNote: "O(1)", isLoop: false, indent: 2 },
      { id: 7, code: "    elif A[i] != B[i]:", timeNote: "O(1) — compare", spaceNote: "O(1)", isLoop: false, indent: 1 },
      { id: 8, code: "        if not in_group:", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false, indent: 2 },
      { id: 9, code: "            ops += 1; in_group = True", timeNote: "O(1) — new mismatch group", spaceNote: "O(1)", isLoop: false, indent: 3 },
      { id: 10, code: "    else:", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false, indent: 1 },
      { id: 11, code: "        in_group = False", timeNote: "O(1) — group ended", spaceNote: "O(1)", isLoop: false, indent: 2 },
      { id: 12, code: "print(ops)", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false },
    ],

    example: { input: "n=4, A='abab', B='abaa'" },
    steps: [
      { lineId: 3, vars: { ops: 0, in_group: false }, highlight: [3], desc: "Init ops=0, in_group=False.", timeOps: 2, spaceVars: ["n","A","B","ops","in_group"] },
      { lineId: 4, vars: { i: 0, ops: 0 }, highlight: [4,7,10,11], desc: "i=0: A='a', B='a'. Match! in_group=False.", timeOps: 4, spaceVars: ["i","ops","in_group"] },
      { lineId: 4, vars: { i: 1, ops: 0 }, highlight: [4,7,10,11], desc: "i=1: A='b', B='b'. Match! in_group=False.", timeOps: 7, spaceVars: ["i","ops","in_group"] },
      { lineId: 4, vars: { i: 2, ops: 0 }, highlight: [4,7,10,11], desc: "i=2: A='a', B='a'. Match! in_group=False.", timeOps: 10, spaceVars: ["i","ops","in_group"] },
      { lineId: 4, vars: { i: 3, ops: 1, in_group: true }, highlight: [4,7,8,9], desc: "i=3: A='b', B='a'. B < A? No. A≠B? Yes. not in_group → ops=1, in_group=True. New group!", timeOps: 14, spaceVars: ["i","ops","in_group"] },
      { lineId: 12, vars: { ops: 1 }, highlight: [12], desc: "Print 1. One operation covers index 3. T=O(n), S=O(1).", timeOps: 15, spaceVars: ["ops"] },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 12,
    title: "House Robber (Max Non-Adjacent Sum)",
    source: "TCS NQT Advanced – Set 2, Q5",
    category: "Dynamic Programming",
    difficulty: "Medium",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    tags: ["Dynamic Programming", "Greedy", "DP"],

    metaphor: {
      icon: "🏠",
      title: "Thief's Optimal Heist",
      story:
        "A thief walks down a street. Adjacent houses have alarms linked — robbing two neighbors triggers an alert. At each house, the thief decides: rob it (add to total, skip next) or skip it (keep previous total). Track two values: `incl` (max if we rob current) and `excl` (max if we skip current). At each step, update both.",
      visual: [
        { label: "incl = excl + arr[i]", desc: "rob current + best without previous" },
        { label: "new_excl = max(incl, excl)", desc: "skip current — keep best so far" },
        { label: "answer = max(incl, excl)", desc: "after all houses" },
      ],
    },

    breakdown: [
      {
        step: 1,
        phase: "Observe",
        title: "Can't take two adjacent elements",
        detail: "Classic DP problem: maximize sum with no two adjacent elements picked. Brute force: try all 2^n subsets — exponential. DP: O(n).",
      },
      {
        step: 2,
        phase: "Key Insight",
        title: "At each house: rob or skip",
        detail: "If you rob house i: best value = (best without i-1) + arr[i]. If you skip house i: best value = max(best with i-1, best without i-1). Track both states.",
      },
      {
        step: 3,
        phase: "Loop Construction",
        title: "Two variables instead of array",
        detail: "incl = max if last picked. excl = max if last skipped. For each element: new_incl = excl + arr[i]. new_excl = max(incl, excl). Roll forward. O(1) space!",
      },
      {
        step: 4,
        phase: "Complexity",
        title: "O(n) time, O(1) space — DP space optimization",
        detail: "Classic DP uses O(n) array. But we only need the previous two values → optimize to O(1) space. This technique applies to many 1D DP problems.",
      },
    ],

    annotatedCode: [
      { id: 0, code: "n = int(input())", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false },
      { id: 1, code: "arr = list(map(int, input().split()))", timeNote: "O(n)", spaceNote: "O(n) — input array", isLoop: false },
      { id: 2, code: "incl, excl = 0, 0", timeNote: "O(1) — init DP states", spaceNote: "O(1) — only 2 vars!", isLoop: false },
      { id: 3, code: "for x in arr:", timeNote: "O(n) — one pass", spaceNote: "O(1)", isLoop: true, loopNote: "Each step: O(1) — total O(n)" },
      { id: 4, code: "    new_incl = excl + x", timeNote: "O(1) — rob this house", spaceNote: "O(1) — one temp var", isLoop: false, indent: 1 },
      { id: 5, code: "    excl = max(incl, excl)", timeNote: "O(1) — skip this house", spaceNote: "O(1) — reuse var", isLoop: false, indent: 1 },
      { id: 6, code: "    incl = new_incl", timeNote: "O(1) — update state", spaceNote: "O(1)", isLoop: false, indent: 1 },
      { id: 7, code: "print(max(incl, excl))", timeNote: "O(1) — final answer", spaceNote: "O(1)", isLoop: false },
    ],

    example: { input: "n=7, arr=[6,7,1,3,8,2,5]" },
    steps: [
      { lineId: 2, vars: { incl: 0, excl: 0 }, highlight: [2], desc: "Init: incl=0 (best if we rob), excl=0 (best if we skip). Both 0 before any houses.", timeOps: 2, spaceVars: ["arr[7]","incl","excl"] },
      { lineId: 3, vars: { x: 6, new_incl: 6, incl: 6, excl: 0 }, highlight: [3,4,5,6], desc: "x=6: new_incl=0+6=6. excl=max(0,0)=0. incl=6. (Rob house 1: 6)", timeOps: 5, spaceVars: ["x","incl","excl"] },
      { lineId: 3, vars: { x: 7, new_incl: 7, incl: 7, excl: 6 }, highlight: [3,4,5,6], desc: "x=7: new_incl=0+7=7. excl=max(6,0)=6. incl=7. (Best: rob just 7=7, or rob 6 skipping 7=6)", timeOps: 8, spaceVars: ["x","incl","excl"] },
      { lineId: 3, vars: { x: 1, new_incl: 7, incl: 7, excl: 7 }, highlight: [3,4,5,6], desc: "x=1: new_incl=6+1=7. excl=max(7,6)=7. incl=7.", timeOps: 11, spaceVars: ["x","incl","excl"] },
      { lineId: 3, vars: { x: 3, new_incl: 10, incl: 10, excl: 7 }, highlight: [3,4,5,6], desc: "x=3: new_incl=7+3=10 (6+1+3). excl=max(7,7)=7. incl=10.", timeOps: 14, spaceVars: ["x","incl","excl"] },
      { lineId: 3, vars: { x: 8, new_incl: 15, incl: 15, excl: 10 }, highlight: [3,4,5,6], desc: "x=8: new_incl=7+8=15 (7+8=6+1+8). excl=max(10,7)=10. incl=15.", timeOps: 17, spaceVars: ["x","incl","excl"] },
      { lineId: 3, vars: { x: 2, new_incl: 12, incl: 12, excl: 15 }, highlight: [3,4,5,6], desc: "x=2: new_incl=10+2=12. excl=max(15,10)=15. incl=12.", timeOps: 20, spaceVars: ["x","incl","excl"] },
      { lineId: 3, vars: { x: 5, new_incl: 20, incl: 20, excl: 15 }, highlight: [3,4,5,6], desc: "x=5: new_incl=15+5=20 (6+1+8+5). excl=max(12,15)=15. incl=20.", timeOps: 23, spaceVars: ["x","incl","excl"] },
      { lineId: 7, vars: { incl: 20, excl: 15, result: 20 }, highlight: [7], desc: "max(20,15)=20. ✓ 6+1+8+5=20. T=O(n), S=O(1).", timeOps: 24, spaceVars: ["incl","excl"] },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 13,
    title: "Collecting Candies (Min Cost Merge)",
    source: "TCS NQT Advanced – Set 2, Q2",
    category: "Heap / Greedy",
    difficulty: "Hard",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    tags: ["Min Heap", "Greedy", "Priority Queue", "Huffman"],

    metaphor: {
      icon: "🍬",
      title: "Optimal Box Merging",
      story:
        "You want to merge N candy boxes into one. Each merge of boxes with X and Y candies costs X+Y seconds. Which two should you merge first? ALWAYS the two smallest! Merging small ones first keeps intermediate totals small. This is the Huffman/greedy approach. Use a Min-Heap to always grab the two smallest in O(log n).",
      visual: [
        { label: "Min-Heap top = smallest", desc: "always pop two smallest" },
        { label: "cost += X + Y", desc: "add merge cost" },
        { label: "push X+Y back", desc: "merged box re-enters heap" },
      ],
    },

    breakdown: [
      {
        step: 1,
        phase: "Observe",
        title: "Order of merging matters",
        detail: "Merging large boxes early creates large intermediate boxes that get added again in future merges. Merge smallest first — this is provably optimal (exchange argument).",
      },
      {
        step: 2,
        phase: "Key Insight",
        title: "Greedy: always merge the two smallest",
        detail: "Use a min-heap (priority queue). Pop two smallest, add their sum to cost, push the sum back. Repeat until one box remains.",
      },
      {
        step: 3,
        phase: "Loop Construction",
        title: "While heap has > 1 element",
        detail: "while len(heap) > 1: a=heappop(), b=heappop(), cost+=a+b, heappush(a+b). Each iteration: 2 pops + 1 push = O(log n). n-1 iterations total.",
      },
      {
        step: 4,
        phase: "Complexity",
        title: "O(n log n) — n-1 merges, each O(log n)",
        detail: "Building the heap is O(n). n-1 merge operations, each with heap ops costing O(log n). Total: O(n log n).",
      },
    ],

    annotatedCode: [
      { id: 0, code: "import heapq", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false },
      { id: 1, code: "t = int(input())", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false },
      { id: 2, code: "for _ in range(t):", timeNote: "O(t) outer loop", spaceNote: "O(1)", isLoop: true, loopNote: "t test cases" },
      { id: 3, code: "    n = int(input())", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false, indent: 1 },
      { id: 4, code: "    heap = list(map(int, input().split()))", timeNote: "O(n)", spaceNote: "O(n) — heap array", isLoop: false, indent: 1 },
      { id: 5, code: "    heapq.heapify(heap)", timeNote: "O(n) — build min-heap", spaceNote: "O(1) — in-place", isLoop: false, indent: 1 },
      { id: 6, code: "    cost = 0", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false, indent: 1 },
      { id: 7, code: "    while len(heap) > 1:", timeNote: "O(n log n) — n-1 iters × O(log n)", spaceNote: "O(1) per step", isLoop: true, loopNote: "n-1 merges. Each merge: 2×pop + 1×push = O(log n)" },
      { id: 8, code: "        a = heapq.heappop(heap)", timeNote: "O(log n) — min-heap pop", spaceNote: "O(1)", isLoop: false, indent: 2 },
      { id: 9, code: "        b = heapq.heappop(heap)", timeNote: "O(log n) — min-heap pop", spaceNote: "O(1)", isLoop: false, indent: 2 },
      { id: 10, code: "        cost += a + b", timeNote: "O(1) — accumulate", spaceNote: "O(1)", isLoop: false, indent: 2 },
      { id: 11, code: "        heapq.heappush(heap, a + b)", timeNote: "O(log n) — insert merged", spaceNote: "O(1)", isLoop: false, indent: 2 },
      { id: 12, code: "    print(cost)", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false, indent: 1 },
    ],

    example: { input: "t=1, n=4, boxes=[1,2,3,4]" },
    steps: [
      { lineId: 5, vars: { heap: [1,2,3,4], cost: 0 }, highlight: [4,5,6], desc: "Build min-heap from [1,2,3,4]. Heap: [1,2,3,4]. cost=0.", timeOps: 5, spaceVars: ["heap[4]","cost"] },
      { lineId: 7, vars: { heap: [3,3,4], cost: 3, a: 1, b: 2 }, highlight: [7,8,9,10,11], desc: "Pop 1 and 2 (smallest). cost=0+3=3. Push 3 back. Heap: [3,3,4].", timeOps: 10, spaceVars: ["heap[3]","cost","a","b"] },
      { lineId: 7, vars: { heap: [6,4], cost: 9, a: 3, b: 3 }, highlight: [7,8,9,10,11], desc: "Pop 3 and 3. cost=3+6=9. Push 6. Heap: [4,6].", timeOps: 15, spaceVars: ["heap[2]","cost","a","b"] },
      { lineId: 7, vars: { heap: [10], cost: 19, a: 4, b: 6 }, highlight: [7,8,9,10,11], desc: "Pop 4 and 6. cost=9+10=19. Push 10. Heap: [10]. Only 1 left!", timeOps: 20, spaceVars: ["heap[1]","cost","a","b"] },
      { lineId: 12, vars: { cost: 19 }, highlight: [12], desc: "Print 19. ✓ Optimal merge order. T=O(n log n), S=O(n).", timeOps: 21, spaceVars: ["cost"] },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 14,
    title: "K-th Largest Factor",
    source: "TCS NQT Advanced – Set 2, Q1",
    category: "Math",
    difficulty: "Medium",
    timeComplexity: "O(√N)",
    spaceComplexity: "O(d) where d=factors",
    tags: ["Factors", "Math", "Sorting"],

    metaphor: {
      icon: "🔢",
      title: "Factor Fishing",
      story:
        "To find factors of N, you only need to check up to √N. Why? Because every factor ≤ √N pairs with a factor ≥ √N (e.g. for 12: 2×6, 3×4 — both pairs cross √12≈3.46). Collect both the factor and its pair, sort descending, return the k-th.",
      visual: [
        { label: "Check d from 1 to √N", desc: "if N%d==0, collect d and N/d" },
        { label: "Sort factors descending", desc: "largest first" },
        { label: "return factors[k-1]", desc: "1-indexed k-th largest" },
      ],
    },

    breakdown: [
      {
        step: 1, phase: "Observe", title: "Factors come in pairs",
        detail: "If d divides N, then N/d also divides N. So check only up to √N — that's O(√N) instead of O(N).",
      },
      {
        step: 2, phase: "Key Insight", title: "Collect pairs, avoid duplicates",
        detail: "For each d ≤ √N where N%d==0: add d. If d ≠ N/d, also add N/d. This handles perfect squares (d==√N) correctly.",
      },
      {
        step: 3, phase: "Loop Construction", title: "Loop to √N, collect, sort",
        detail: "factors = []. for d in range(1, int(sqrt(N))+1): if N%d==0: factors.append(d); if d != N//d: factors.append(N//d). Sort descending.",
      },
      {
        step: 4, phase: "Complexity", title: "O(√N) time, O(d) space",
        detail: "Loop runs √N times. A number ≤ 10^10 has at most a few hundred factors — bounded space. Sorting d factors: O(d log d), negligible.",
      },
    ],

    annotatedCode: [
      { id: 0, code: "from math import isqrt", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false },
      { id: 1, code: "line = input()  # e.g. '12,3'", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false },
      { id: 2, code: "N, k = map(int, line.split(','))", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false },
      { id: 3, code: "factors = []", timeNote: "O(1)", spaceNote: "O(d) — grows to factor count", isLoop: false },
      { id: 4, code: "for d in range(1, isqrt(N) + 1):", timeNote: "O(√N) — loop to square root", spaceNote: "O(1) — loop var", isLoop: true, loopNote: "√N iterations — key optimization!" },
      { id: 5, code: "    if N % d == 0:", timeNote: "O(1) — modulo", spaceNote: "O(1)", isLoop: false, indent: 1 },
      { id: 6, code: "        factors.append(d)", timeNote: "O(1) — list append", spaceNote: "O(1) per factor", isLoop: false, indent: 2 },
      { id: 7, code: "        if d != N // d:", timeNote: "O(1) — avoid duplicate at √N", spaceNote: "O(1)", isLoop: false, indent: 2 },
      { id: 8, code: "            factors.append(N // d)", timeNote: "O(1) — add pair factor", spaceNote: "O(1)", isLoop: false, indent: 3 },
      { id: 9, code: "factors.sort(reverse=True)", timeNote: "O(d log d) — sort factors", spaceNote: "O(1) — in-place", isLoop: false },
      { id: 10, code: "print(factors[k-1] if k <= len(factors) else 1)", timeNote: "O(1) — index access", spaceNote: "O(1)", isLoop: false },
    ],

    example: { input: "N=12, k=3" },
    steps: [
      { lineId: 3, vars: { N: 12, k: 3, factors: [] }, highlight: [2,3], desc: "N=12, k=3. factors=[]. Find all factors up to √12≈3.", timeOps: 3, spaceVars: ["N","k","factors"] },
      { lineId: 4, vars: { d: 1, factors: [1,12] }, highlight: [4,5,6,7,8], desc: "d=1: 12%1=0 → add 1 and 12/1=12. factors=[1,12].", timeOps: 6, spaceVars: ["d","factors"] },
      { lineId: 4, vars: { d: 2, factors: [1,12,2,6] }, highlight: [4,5,6,7,8], desc: "d=2: 12%2=0 → add 2 and 12/2=6. factors=[1,12,2,6].", timeOps: 9, spaceVars: ["d","factors"] },
      { lineId: 4, vars: { d: 3, factors: [1,12,2,6,3,4] }, highlight: [4,5,6,7,8], desc: "d=3: 12%3=0 → add 3 and 12/3=4. factors=[1,12,2,6,3,4].", timeOps: 12, spaceVars: ["d","factors"] },
      { lineId: 9, vars: { factors: [12,6,4,3,2,1] }, highlight: [9], desc: "Sort descending: [12,6,4,3,2,1]. All 6 factors of 12.", timeOps: 15, spaceVars: ["factors"] },
      { lineId: 10, vars: { factors: [12,6,4,3,2,1], k: 3, result: 4 }, highlight: [10], desc: "k=3 ≤ 6. factors[2] = 4. ✓ 3rd largest factor of 12 is 4. T=O(√N).", timeOps: 16, spaceVars: ["factors","k"] },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 15,
    title: "Square Free Numbers",
    source: "TCS NQT Advanced – Set 2, Q3",
    category: "Math / Number Theory",
    difficulty: "Hard",
    timeComplexity: "O(1) bounded",
    spaceComplexity: "O(1)",
    tags: ["Number Theory", "Prime Factorization", "Bit Math"],

    metaphor: {
      icon: "🔬",
      title: "Prime Building Blocks",
      story:
        "Every number is built from prime blocks. A square-free divisor uses each prime block AT MOST ONCE. If N has c distinct prime factors (say p1, p2, p3), then square-free divisors are all subsets of {p1,p2,p3} — that's 2^c subsets. Subtract 1 for the empty set (which gives 1, not counted). Answer: 2^c - 1.",
      visual: [
        { label: "N=20=2²×5", desc: "distinct primes: {2,5}, c=2" },
        { label: "subsets: {2},{5},{2,5}", desc: "3 = 2^2-1 square-free divisors" },
        { label: "2^c - 1 = answer", desc: "power of 2 minus 1" },
      ],
    },

    breakdown: [
      {
        step: 1, phase: "Observe", title: "What makes a divisor square-free?",
        detail: "A divisor d is square-free if no perfect square (other than 1) divides d. Equivalently: d is a product of DISTINCT primes.",
      },
      {
        step: 2, phase: "Key Insight", title: "Count distinct prime factors of N",
        detail: "Any square-free divisor of N is a product of a subset of N's distinct prime factors. If N has c distinct primes → 2^c - 1 non-empty subsets → 2^c - 1 square-free divisors.",
      },
      {
        step: 3, phase: "Loop Construction", title: "Check 8 fixed primes ≤ 19",
        detail: "Problem says N has no prime factor > 19. Primes ≤ 19: [2,3,5,7,11,13,17,19]. Loop over these 8 primes, check if N%p==0. Count → c. Answer: (1<<c)-1.",
      },
      {
        step: 4, phase: "Complexity", title: "O(1) — exactly 8 iterations",
        detail: "Fixed 8 primes to check regardless of N. The 1<<c is a bit shift. Entire solution is constant time and constant space.",
      },
    ],

    annotatedCode: [
      { id: 0, code: "N = int(input())", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false },
      { id: 1, code: "primes = [2,3,5,7,11,13,17,19]", timeNote: "O(1) — 8 fixed primes", spaceNote: "O(1) — constant list", isLoop: false },
      { id: 2, code: "c = 0  # count of distinct prime factors", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false },
      { id: 3, code: "for p in primes:", timeNote: "O(1) — exactly 8 iterations", spaceNote: "O(1)", isLoop: true, loopNote: "Fixed 8 iterations — technically O(1)!" },
      { id: 4, code: "    if N % p == 0:", timeNote: "O(1) — modulo check", spaceNote: "O(1)", isLoop: false, indent: 1 },
      { id: 5, code: "        c += 1", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false, indent: 2 },
      { id: 6, code: "print((1 << c) - 1)  # 2^c - 1", timeNote: "O(1) — bit shift", spaceNote: "O(1)", isLoop: false },
    ],

    example: { input: "N=20" },
    steps: [
      { lineId: 0, vars: { N: 20, c: 0 }, highlight: [0,1,2], desc: "N=20=2²×5. Init c=0, 8 primes to check.", timeOps: 3, spaceVars: ["N","c"] },
      { lineId: 3, vars: { N: 20, c: 1, p: 2 }, highlight: [3,4,5], desc: "p=2: 20%2=0 → c=1. (2 is a prime factor of 20)", timeOps: 5, spaceVars: ["N","c","p"] },
      { lineId: 3, vars: { N: 20, c: 1, p: 3 }, highlight: [3,4], desc: "p=3: 20%3≠0 → skip.", timeOps: 7, spaceVars: ["N","c","p"] },
      { lineId: 3, vars: { N: 20, c: 2, p: 5 }, highlight: [3,4,5], desc: "p=5: 20%5=0 → c=2. (5 is a prime factor of 20)", timeOps: 9, spaceVars: ["N","c","p"] },
      { lineId: 3, vars: { N: 20, c: 2, p: 7 }, highlight: [3,4], desc: "p=7,11,13,17,19: all fail. c stays 2.", timeOps: 14, spaceVars: ["N","c","p"] },
      { lineId: 6, vars: { c: 2, result: 3 }, highlight: [6], desc: "(1<<2)-1 = 4-1 = 3. Square-free divisors: {2},{5},{10} = 3. ✓", timeOps: 15, spaceVars: ["c"] },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 16,
    title: "Rock Samples in Ranges",
    source: "TCS NQT Advanced – Set 1, Q11",
    category: "Array / Hashing",
    difficulty: "Easy",
    timeComplexity: "O(S + R×range_size)",
    spaceComplexity: "O(max_value)",
    tags: ["Frequency Map", "Range Query", "Hashing"],

    metaphor: {
      icon: "🪨",
      title: "Lab Range Classifier",
      story:
        "Build a frequency table of rock sizes (like a histogram). Then for each lab range [a,b], sum up frequencies from a to b. Hash map lookup is O(1), so range query is O(range_size). Pre-computing frequencies avoids rescanning all samples for each range.",
      visual: [
        { label: "freq[size]++", desc: "count each sample in hash map" },
        { label: "for j in range(a, b+1)", desc: "sum freq[j] for each range" },
        { label: "output count", desc: "one line per range" },
      ],
    },

    breakdown: [
      {
        step: 1, phase: "Observe", title: "Multiple range queries on same samples",
        detail: "Naive: for each range, scan all S samples — O(S×R). Better: build frequency map once in O(S), then each range query is O(range_size).",
      },
      {
        step: 2, phase: "Key Insight", title: "Frequency hash map",
        detail: "freq[x] = count of samples with value x. To answer range [a,b]: sum freq[a] + freq[a+1] + ... + freq[b]. O(b-a+1) per query.",
      },
      {
        step: 3, phase: "Loop Construction", title: "Two loops: build map, then query",
        detail: "Loop 1 (O(S)): read samples, freq[x]++. Loop 2 (O(R×range)): for each range, iterate a..b and sum frequencies.",
      },
      {
        step: 4, phase: "Complexity", title: "O(S + R×max_range)",
        detail: "Sample sizes ≤ 1000. Range width ≤ 1000. R queries each cost ≤ O(1000). Total: O(S + R×1000). With S,R < 10000 this is very fast.",
      },
    ],

    annotatedCode: [
      { id: 0, code: "S, R = map(int, input().split())", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false },
      { id: 1, code: "samples = list(map(int, input().split()))", timeNote: "O(S)", spaceNote: "O(S)", isLoop: false },
      { id: 2, code: "freq = {}", timeNote: "O(1)", spaceNote: "O(S) — at most S entries", isLoop: false },
      { id: 3, code: "for x in samples:", timeNote: "O(S) — build freq map", spaceNote: "O(1) per step", isLoop: true, loopNote: "S iterations, each O(1) hash write" },
      { id: 4, code: "    freq[x] = freq.get(x, 0) + 1", timeNote: "O(1) — hash update", spaceNote: "O(1)", isLoop: false, indent: 1 },
      { id: 5, code: "for _ in range(R):", timeNote: "O(R × range_width)", spaceNote: "O(1)", isLoop: true, loopNote: "R range queries" },
      { id: 6, code: "    a, b = map(int, input().split())", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false, indent: 1 },
      { id: 7, code: "    count = sum(freq.get(j,0) for j in range(a, b+1))", timeNote: "O(b-a+1) — range scan", spaceNote: "O(1)", isLoop: false, indent: 1 },
      { id: 8, code: "    print(count)", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false, indent: 1 },
    ],

    example: { input: "S=10, R=2, samples=[345,604,321,433,704,470,808,718,517,811], ranges=[300-350, 400-700]" },
    steps: [
      { lineId: 3, vars: { freq: "{345:1,604:1,...}" }, highlight: [3,4], desc: "Build freq map from 10 samples. O(S)=O(10) steps.", timeOps: 10, spaceVars: ["S","R","samples[10]","freq"] },
      { lineId: 5, vars: { a: 300, b: 350, count: 2 }, highlight: [5,6,7,8], desc: "Range [300,350]: scan 51 values. freq[345]=1, freq[321]=1 → count=2.", timeOps: 61, spaceVars: ["a","b","count"] },
      { lineId: 5, vars: { a: 400, b: 700, count: 4 }, highlight: [5,6,7,8], desc: "Range [400,700]: scan 301 values. freq[604,433,470,517] → count=4. Print 4.", timeOps: 362, spaceVars: ["a","b","count"] },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 17,
    title: "Primes as Sum of Consecutive Primes",
    source: "TCS NQT Advanced – Set 1, Q10",
    category: "Math / Number Theory",
    difficulty: "Hard",
    timeComplexity: "O(N log log N)",
    spaceComplexity: "O(N)",
    tags: ["Sieve of Eratosthenes", "Prefix Sum", "Prime"],

    metaphor: {
      icon: "🧮",
      title: "Prime Staircase",
      story:
        "List all primes in order: 2, 3, 5, 7, 11, 13... Keep a running total starting from 2. After adding 3: total=5 (prime? yes!). After 5: total=10 (not prime). After 7: total=17 (prime? yes!). This is a prefix sum over the prime sequence — and we check if each prefix sum is itself prime.",
      visual: [
        { label: "Sieve → all primes list", desc: "generate primes up to N" },
        { label: "running_sum += next_prime", desc: "prefix sum of primes" },
        { label: "if running_sum is prime → count!", desc: "check sieve" },
      ],
    },

    breakdown: [
      {
        step: 1, phase: "Observe", title: "Sum always starts with 2",
        detail: "The problem says summation always starts with 2. So we build prefix sums: 2, 2+3=5, 2+3+5=10, 2+3+5+7=17, etc. Check each: is it prime?",
      },
      {
        step: 2, phase: "Key Insight", title: "Sieve of Eratosthenes",
        detail: "Generate all primes up to N with a sieve in O(N log log N). Then iterate over primes in order, maintaining running sum. Check sieve in O(1) per check.",
      },
      {
        step: 3, phase: "Loop Construction", title: "Sieve → prime list → prefix sum loop",
        detail: "sieve = [True]*N. Mark composites. Collect primes. Then: running=2, for each next prime: running+=p. If running>N: break. If sieve[running]: count++.",
      },
      {
        step: 4, phase: "Complexity", title: "O(N log log N) — sieve dominates",
        detail: "Sieve is O(N log log N) ≈ O(N). The prefix sum loop runs at most O(√N) times (sum of primes grows fast). Total dominated by sieve.",
      },
    ],

    annotatedCode: [
      { id: 0, code: "N = int(input())", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false },
      { id: 1, code: "sieve = [True] * (N + 1)", timeNote: "O(N)", spaceNote: "O(N) — boolean array", isLoop: false },
      { id: 2, code: "sieve[0] = sieve[1] = False", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false },
      { id: 3, code: "for p in range(2, int(N**0.5) + 1):", timeNote: "O(√N) outer iterations", spaceNote: "O(1)", isLoop: true, loopNote: "Sieve inner loop total: O(N log log N)" },
      { id: 4, code: "    if sieve[p]:", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false, indent: 1 },
      { id: 5, code: "        for i in range(p*p, N+1, p):", timeNote: "O(N/p) marks composites", spaceNote: "O(1)", isLoop: true, loopNote: "Sum over all p: N/2+N/3+N/5+...=O(N log log N)" },
      { id: 6, code: "            sieve[i] = False", timeNote: "O(1) per mark", spaceNote: "O(1)", isLoop: false, indent: 3 },
      { id: 7, code: "primes = [i for i in range(2, N+1) if sieve[i]]", timeNote: "O(N)", spaceNote: "O(π(N)) — count of primes", isLoop: false },
      { id: 8, code: "running, count = 2, 0", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false },
      { id: 9, code: "for p in primes[1:]:", timeNote: "O(√N) — sum grows fast", spaceNote: "O(1)", isLoop: true, loopNote: "Prefix sum exceeds N quickly" },
      { id: 10, code: "    running += p", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false, indent: 1 },
      { id: 11, code: "    if running > N: break", timeNote: "O(1) — early exit", spaceNote: "O(1)", isLoop: false, indent: 1 },
      { id: 12, code: "    if sieve[running]: count += 1", timeNote: "O(1) — sieve lookup", spaceNote: "O(1)", isLoop: false, indent: 1 },
      { id: 13, code: "print(count)", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false },
    ],

    example: { input: "N=20" },
    steps: [
      { lineId: 1, vars: { N: 20, "sieve[0..20]": "generated" }, highlight: [1,2,3,4,5,6], desc: "Run sieve for N=20. Mark composites: 4,6,8,9,10,12,14,15,16,18,20.", timeOps: 20, spaceVars: ["N","sieve[21]"] },
      { lineId: 7, vars: { primes: [2,3,5,7,11,13,17,19] }, highlight: [7], desc: "Primes ≤ 20: [2,3,5,7,11,13,17,19].", timeOps: 28, spaceVars: ["N","sieve[21]","primes[8]"] },
      { lineId: 8, vars: { running: 2, count: 0 }, highlight: [8], desc: "Start: running=2 (first prime), count=0.", timeOps: 30, spaceVars: ["running","count"] },
      { lineId: 9, vars: { p: 3, running: 5, count: 1 }, highlight: [9,10,12], desc: "Add p=3: running=5. sieve[5]=True → count=1! (5=2+3 ✓)", timeOps: 33, spaceVars: ["p","running","count"] },
      { lineId: 9, vars: { p: 5, running: 10, count: 1 }, highlight: [9,10,12], desc: "Add p=5: running=10. sieve[10]=False → not prime, skip.", timeOps: 36, spaceVars: ["p","running","count"] },
      { lineId: 9, vars: { p: 7, running: 17, count: 2 }, highlight: [9,10,12], desc: "Add p=7: running=17. sieve[17]=True → count=2! (17=2+3+5+7 ✓)", timeOps: 39, spaceVars: ["p","running","count"] },
      { lineId: 11, vars: { p: 11, running: 28 }, highlight: [9,10,11], desc: "Add p=11: running=28 > 20 → break!", timeOps: 41, spaceVars: ["p","running"] },
      { lineId: 13, vars: { count: 2 }, highlight: [13], desc: "Print 2. ✓ T=O(N log log N), S=O(N).", timeOps: 42, spaceVars: ["count"] },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 18,
    title: "Codu and Sum Love (pow2 mod 100)",
    source: "TCS NQT Advanced – Set 2, Q4",
    category: "Math",
    difficulty: "Easy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    tags: ["Math", "Modular Arithmetic", "Bit Manipulation"],

    metaphor: {
      icon: "💻",
      title: "Last Two Digits of Power of 2",
      story:
        "2^x grows fast. But we only care about the last 2 digits (mod 100). For each x, compute 2^x mod 100 (or just 2^x if small). Sum all results, final answer is sum mod 100. The pattern of 2^x mod 100 repeats every 20 steps — but Python handles big powers fine with modular exponentiation.",
      visual: [
        { label: "2^x < 100?", desc: "use 2^x directly" },
        { label: "2^x ≥ 100?", desc: "use 2^x mod 100" },
        { label: "sum all, mod 100", desc: "final answer" },
      ],
    },

    breakdown: [
      {
        step: 1, phase: "Observe", title: "Sum of 2^x values mod 100",
        detail: "For each x in input: if 2^x > 99, add 2^x % 100 to answer, else add 2^x. Finally print answer % 100.",
      },
      {
        step: 2, phase: "Key Insight", title: "Modular arithmetic prevents overflow",
        detail: "2^x for large x is huge — but we only need last 2 digits = mod 100. Python's pow(x, e, mod) computes modular exponentiation efficiently in O(log e).",
      },
      {
        step: 3, phase: "Loop Construction", title: "Simple loop with pow",
        detail: "ans = 0. For each x: p = pow(2, x). ans += p % 100 if p > 99 else p. Print ans % 100.",
      },
      {
        step: 4, phase: "Complexity", title: "O(n log max_x) time",
        detail: "n numbers to process. Python's pow(2, x) for x ≤ 10^18 uses fast exponentiation O(log x). Total: O(n log max_x).",
      },
    ],

    annotatedCode: [
      { id: 0, code: "n = int(input())", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false },
      { id: 1, code: "nums = list(map(int, input().split()))", timeNote: "O(n)", spaceNote: "O(n)", isLoop: false },
      { id: 2, code: "ans = 0", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false },
      { id: 3, code: "for x in nums:", timeNote: "O(n) — n iterations", spaceNote: "O(1)", isLoop: true, loopNote: "Each iteration: O(log x) for pow" },
      { id: 4, code: "    p = pow(2, x)", timeNote: "O(log x) — fast exponentiation", spaceNote: "O(1) — large int (Python)", isLoop: false, indent: 1 },
      { id: 5, code: "    ans += p % 100 if p > 99 else p", timeNote: "O(1) — modulo + add", spaceNote: "O(1)", isLoop: false, indent: 1 },
      { id: 6, code: "print(ans % 100)", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false },
    ],

    example: { input: "n=4, nums=[8,6,7,4]" },
    steps: [
      { lineId: 2, vars: { ans: 0 }, highlight: [2], desc: "Init ans=0.", timeOps: 1, spaceVars: ["n","nums[4]","ans"] },
      { lineId: 3, vars: { x: 8, p: 256, ans: 56 }, highlight: [3,4,5], desc: "x=8: 2^8=256 > 99. 256%100=56. ans=56.", timeOps: 4, spaceVars: ["x","p","ans"] },
      { lineId: 3, vars: { x: 6, p: 64, ans: 120 }, highlight: [3,4,5], desc: "x=6: 2^6=64 ≤ 99. Add 64. ans=56+64=120.", timeOps: 7, spaceVars: ["x","p","ans"] },
      { lineId: 3, vars: { x: 7, p: 128, ans: 148 }, highlight: [3,4,5], desc: "x=7: 2^7=128 > 99. 128%100=28. ans=120+28=148.", timeOps: 10, spaceVars: ["x","p","ans"] },
      { lineId: 3, vars: { x: 4, p: 16, ans: 164 }, highlight: [3,4,5], desc: "x=4: 2^4=16 ≤ 99. Add 16. ans=148+16=164.", timeOps: 13, spaceVars: ["x","p","ans"] },
      { lineId: 6, vars: { ans: 164, result: 64 }, highlight: [6], desc: "164 % 100 = 64. ✓ T=O(n log max_x), S=O(1).", timeOps: 14, spaceVars: ["ans"] },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 19,
    title: "Bank EMI Comparison",
    source: "TCS NQT Advanced – Set 1, Q9",
    category: "Math / Simulation",
    difficulty: "Medium",
    timeComplexity: "O(N1 + N2)",
    spaceComplexity: "O(1)",
    tags: ["Math", "Simulation", "Finance"],

    metaphor: {
      icon: "🏦",
      title: "Loan Calculator Race",
      story:
        "Two banks offer loans with different slab rates over different periods. For each slab, compute the EMI using the formula and sum them up for each bank. Whichever bank has a lower total EMI wins. It's just math — plug and chug through each slab.",
      visual: [
        { label: "EMI formula", desc: "P × r / (1 - 1/(1+r)^(years×12))" },
        { label: "sum EMIs per slab", desc: "accumulate for each bank" },
        { label: "compare Bank A vs B", desc: "print the smaller" },
      ],
    },

    breakdown: [
      {
        step: 1, phase: "Observe", title: "Multiple interest rate slabs",
        detail: "Each bank has N slabs. Each slab has a period and rate. Compute EMI for each slab and sum. The monthly rate = annual_rate / 12 / 100.",
      },
      {
        step: 2, phase: "Key Insight", title: "EMI formula is straightforward",
        detail: "EMI = P * r / (1 - (1+r)^(-months)) where r = monthly_rate, months = years*12. Just implement the formula per slab.",
      },
      {
        step: 3, phase: "Loop Construction", title: "Two outer loops (one per bank)",
        detail: "For each bank: read N slabs. For each slab: read (years, rate), compute monthly_rate, compute EMI, add to sum. Compare sums at the end.",
      },
      {
        step: 4, phase: "Complexity", title: "O(N1 + N2) — one pass per bank's slabs",
        detail: "N1 + N2 slab computations. Each is O(1) arithmetic. Total linear in number of slabs.",
      },
    ],

    annotatedCode: [
      { id: 0, code: "P = int(input())  # principal", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false },
      { id: 1, code: "T = int(input())  # total tenure (unused in slab EMI)", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false },
      { id: 2, code: "totals = []", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false },
      { id: 3, code: "for bank in range(2):", timeNote: "O(2) — two banks", spaceNote: "O(1)", isLoop: true, loopNote: "Exactly 2 iterations" },
      { id: 4, code: "    n_slabs = int(input())", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false, indent: 1 },
      { id: 5, code: "    total = 0", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false, indent: 1 },
      { id: 6, code: "    for _ in range(n_slabs):", timeNote: "O(N_slabs)", spaceNote: "O(1)", isLoop: true, loopNote: "One EMI calc per slab" },
      { id: 7, code: "        yr, rate = map(float, input().split())", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false, indent: 2 },
      { id: 8, code: "        r = rate / 12 / 100  # monthly rate", timeNote: "O(1) — divide twice", spaceNote: "O(1)", isLoop: false, indent: 2 },
      { id: 9, code: "        emi = P * r / (1 - (1+r)**(-(yr*12)))", timeNote: "O(1) — formula eval", spaceNote: "O(1)", isLoop: false, indent: 2 },
      { id: 10, code: "        total += emi", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false, indent: 2 },
      { id: 11, code: "    totals.append(total)", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false, indent: 1 },
      { id: 12, code: "print('Bank A' if totals[0] < totals[1] else 'Bank B')", timeNote: "O(1)", spaceNote: "O(1)", isLoop: false },
    ],

    example: { input: "P=10000, Bank A slabs=[35@9.5, 10@9.6, 5@8.5], Bank B=[310@6.9, 5@8.5, 5@7.9]" },
    steps: [
      { lineId: 3, vars: { P: 10000, bank: 0 }, highlight: [3,4,5], desc: "Processing Bank A. 3 slabs.", timeOps: 3, spaceVars: ["P","T","totals","total"] },
      { lineId: 6, vars: { yr: 35, rate: 9.5, r: 0.00792, emi: 869.4, total: 869.4 }, highlight: [6,7,8,9,10], desc: "Slab 1 (Bank A): 35yr @9.5%. r=9.5/12/100≈0.00792. EMI computed. Add to total.", timeOps: 7, spaceVars: ["yr","rate","r","emi","total"] },
      { lineId: 11, vars: { "totals[0]": "sum_A" }, highlight: [11], desc: "Bank A total EMI stored in totals[0].", timeOps: 15, spaceVars: ["totals"] },
      { lineId: 3, vars: { bank: 1 }, highlight: [3,4,5,6,7,8,9,10,11], desc: "Processing Bank B. 3 slabs. Compute total EMI.", timeOps: 25, spaceVars: ["totals"] },
      { lineId: 12, vars: { "totals[0]": "A", "totals[1]": "B" }, highlight: [12], desc: "Compare totals. If A < B → print 'Bank A', else 'Bank B'. T=O(N1+N2).", timeOps: 26, spaceVars: ["totals"] },
    ],
  },
];
