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
];
