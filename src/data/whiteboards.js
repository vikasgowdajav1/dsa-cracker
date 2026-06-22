// ─────────────────────────────────────────────────────────────────────────────
// Whiteboard explanations — plain English, zero assumed coding knowledge.
// Each entry maps to a problem id from problems.js.
// Colours: 'blue' | 'gray' | 'green' | 'red' | 'orange' | 'purple' | 'yellow' | 'active' | 'sky'
// Visual types: array | window | split | steps | formula | binary | cycles | heap | table | compare | buckets | prefix
// ─────────────────────────────────────────────────────────────────────────────

export const WHITEBOARDS = {

  // ── 1. Move Zeros to End ────────────────────────────────────────────────────
  1: {
    tldr: "Slide all non-zero chocolates to the front, leave empty wrappers at the back — without using a second tray.",
    frames: [
      {
        emoji: "🎯",
        heading: "What's the problem?",
        body: "You have a row of chocolate boxes. Some boxes have chocolates (numbers), some are empty wrappers marked 0. Your job: shove all the empty wrappers to the end of the row — without changing the order of the actual chocolates.",
        visual: {
          type: "array",
          items: [
            { v: 4, c: "blue" }, { v: 5, c: "blue" }, { v: 0, c: "gray" },
            { v: 1, c: "blue" }, { v: 9, c: "blue" }, { v: 0, c: "gray" },
            { v: 5, c: "blue" }, { v: 0, c: "gray" },
          ],
        },
        think: "Which boxes have chocolates? Which are empty? What should the final row look like?",
      },
      {
        emoji: "🤔",
        heading: "What would you do first? (The slow way)",
        body: "Most people's first idea: take all chocolates out, put them in a new tray, then fill the rest with zeros. That works! But it uses a whole extra tray — twice the space. Can we do it without a second tray?",
        visual: {
          type: "steps",
          items: [
            { icon: "📦", text: "Create a brand-new empty tray", sub: "Extra memory used — not ideal!" },
            { icon: "✅", text: "Copy only the non-zero chocolates across", sub: "In order: 4, 5, 1, 9, 5" },
            { icon: "0️⃣", text: "Fill remaining spots with 0", sub: "Final: [4, 5, 1, 9, 5, 0, 0, 0]" },
          ],
        },
        warn: "This works but wastes memory. What if you have a million chocolates? That's a million extra slots!",
      },
      {
        emoji: "💡",
        heading: "The smart way: Two-hand trick",
        body: "Use TWO fingers on the SAME row. Left finger (j) = 'write position', starts at slot 0. Right finger (i) = 'read position', walks across every box. Rule: if the box at i has a chocolate, put it at j, then move j one step forward. Skip empty boxes.",
        visual: {
          type: "array",
          items: [
            { v: 4, c: "active" }, { v: 5, c: "blue" }, { v: 0, c: "gray" },
            { v: 1, c: "blue" }, { v: 9, c: "blue" }, { v: 0, c: "gray" },
            { v: 5, c: "blue" }, { v: 0, c: "gray" },
          ],
          pointers: [
            { idx: 0, name: "j (write)", c: "violet" },
            { idx: 0, name: "i (read)", c: "amber", pos: "above" },
          ],
        },
        key: "j = 'next open slot', i = 'scanner'. After the loop, every slot from j onwards is guaranteed to be an empty wrapper — just fill them with 0.",
      },
      {
        emoji: "📽️",
        heading: "Watch it happen — step by step",
        body: "i=0: box has 4 → place at j=0, move j to 1. i=1: box has 5 → place at j=1, move j to 2. i=2: box is empty → skip (j stays at 2). i=3: box has 1 → place at j=2. And so on. After the scan, fill positions 5,6,7 with zeros.",
        visual: {
          type: "split",
          before: [
            { v: 4, c: "blue" }, { v: 5, c: "blue" }, { v: 0, c: "gray" },
            { v: 1, c: "blue" }, { v: 9, c: "blue" }, { v: 0, c: "gray" },
            { v: 5, c: "blue" }, { v: 0, c: "gray" },
          ],
          after: [
            { v: 4, c: "green" }, { v: 5, c: "green" }, { v: 1, c: "green" },
            { v: 9, c: "green" }, { v: 5, c: "green" }, { v: 0, c: "gray" },
            { v: 0, c: "gray" }, { v: 0, c: "gray" },
          ],
        },
        key: "We looked at each box ONCE. We didn't need a second tray. Single pass, same tray — fast AND memory-efficient.",
      },
    ],
  },

  // ── 2. Toggle Bits ──────────────────────────────────────────────────────────
  2: {
    tldr: "Flip every binary digit of a number — like flipping all light switches from ON to OFF and vice versa.",
    frames: [
      {
        emoji: "💡",
        heading: "First — what is binary?",
        body: "Computers store numbers as a row of light switches — each switch is either ON (1) or OFF (0). The number 10 in 'binary' (base-2) is represented as four switches: ON OFF ON OFF = 1010.",
        visual: {
          type: "binary",
          rows: [
            { label: "Number: 10", bits: ["1","0","1","0"], decimal: 10 },
          ],
        },
        think: "Each switch position represents a power of 2. 1×8 + 0×4 + 1×2 + 0×1 = 10.",
      },
      {
        emoji: "🔄",
        heading: "Toggling = flipping every switch",
        body: "If a switch is ON, turn it OFF. If OFF, turn it ON. That's 'toggling'. After toggling all 4 switches of 1010, you get 0101. What number is 0101? 0×8 + 1×4 + 0×2 + 1×1 = 5.",
        visual: {
          type: "binary",
          rows: [
            { label: "Before", bits: ["1","0","1","0"], decimal: 10 },
            { label: "After toggle", bits: ["0","1","0","1"], decimal: 5 },
          ],
          note: "1010 toggled = 0101 = 5 ✓",
        },
      },
      {
        emoji: "🔑",
        heading: "The trick: XOR with a 'mask'",
        body: "There is a magic operation called XOR. If you XOR any bit with 1, it flips. If you XOR with 0, it stays the same. So to flip all switches of 1010, XOR it with 1111 (all switches ON). This is the 'mask'.",
        visual: {
          type: "binary",
          rows: [
            { label: "Number",      bits: ["1","0","1","0"] },
            { label: "Mask (1111)", bits: ["1","1","1","1"] },
            { label: "XOR result",  bits: ["0","1","0","1"] },
          ],
          note: "XOR: 1⊕1=0, 0⊕1=1. Every bit flipped!",
        },
        key: "Build the mask by counting the number of switches (bit-length of n). If n=10 has 4 bits → mask = 2⁴ - 1 = 15 = 1111.",
      },
      {
        emoji: "⚡",
        heading: "Three steps, zero loops",
        body: "Step 1: Find bit-length (how many switches) using log₂(n)+1. Step 2: Build mask = 2^(bit-length) - 1. Step 3: Answer = n XOR mask. Three arithmetic operations — no scanning needed at all!",
        visual: {
          type: "steps",
          items: [
            { icon: "1️⃣", text: "Bit-length of 10?", sub: "log₂(10) ≈ 3.32 → int = 3 → bits = 4" },
            { icon: "2️⃣", text: "Build mask = 2⁴ - 1", sub: "16 - 1 = 15 = 1111 in binary" },
            { icon: "3️⃣", text: "10 XOR 15 = ?", sub: "1010 XOR 1111 = 0101 = 5 ✓" },
          ],
        },
      },
    ],
  },

  // ── 3. Sort 0s, 1s, 2s ─────────────────────────────────────────────────────
  3: {
    tldr: "Sort airport security trays (0=safe, 1=check, 2=dangerous) in a single pass using three zone markers.",
    frames: [
      {
        emoji: "✈️",
        heading: "The scene: airport security trays",
        body: "Trays arrive on a conveyor belt labelled 0 (safe), 1 (needs checking), or 2 (dangerous). You need all 0s first, then 1s, then 2s — in one pass, without a second belt.",
        visual: {
          type: "array",
          items: [
            { v: 1, c: "yellow" }, { v: 0, c: "green" }, { v: 2, c: "red" },
            { v: 0, c: "green" }, { v: 1, c: "yellow" }, { v: 0, c: "green" }, { v: 2, c: "red" },
          ],
        },
        think: "Can you sort this without a second belt? Notice only 3 possible values — that's key!",
      },
      {
        emoji: "🪣",
        heading: "Three workers, three zones",
        body: "Set up three zones on the belt: LEFT zone (for 0s), MIDDLE zone (not yet sorted), RIGHT zone (for 2s). Three zone-marker positions: low, mid, and high. The 'mid' position is our scanner — it looks at one tray at a time.",
        visual: {
          type: "buckets",
          buckets: [
            { label: "Left zone (0s)", color: "green", items: [{ v: 0, c: "green" }, { v: 0, c: "green" }] },
            { label: "Middle (1s)", color: "amber", items: [{ v: 1, c: "yellow" }, { v: 1, c: "yellow" }] },
            { label: "Right zone (2s)", color: "red", items: [{ v: 2, c: "red" }, { v: 2, c: "red" }] },
          ],
        },
      },
      {
        emoji: "📐",
        heading: "Three rules for the scanner (mid)",
        body: "The scanner at 'mid' checks each tray. Rule 1: It's a 0? Swap it to the left zone (swap with 'low'), advance both low and mid. Rule 2: It's a 1? Perfect, already in middle, just advance mid. Rule 3: It's a 2? Swap it to the right zone (swap with 'high'), shrink high — but DON'T advance mid (need to re-check the swapped tray).",
        visual: {
          type: "steps",
          items: [
            { icon: "🟢", text: "See a 0?", sub: "Swap to left zone. Advance both low and mid." },
            { icon: "🟡", text: "See a 1?", sub: "Already in the right zone. Just advance mid." },
            { icon: "🔴", text: "See a 2?", sub: "Swap to right zone. Shrink high. Re-check mid!" },
          ],
        },
        warn: "When you swap a 2 to the right, you must NOT advance mid — the newly arrived tray at mid is unknown!",
      },
      {
        emoji: "🏁",
        heading: "Result: sorted in one single pass",
        body: "The scanner (mid) advances toward high, and stops when mid > high. At that point all 0s are on the left, 1s in the middle, 2s on the right. No extra memory needed, only 3 position markers.",
        visual: {
          type: "split",
          before: [
            { v: 1, c: "yellow" }, { v: 0, c: "green" }, { v: 2, c: "red" },
            { v: 0, c: "green" }, { v: 1, c: "yellow" }, { v: 0, c: "green" }, { v: 2, c: "red" },
          ],
          after: [
            { v: 0, c: "green" }, { v: 0, c: "green" }, { v: 0, c: "green" },
            { v: 1, c: "yellow" }, { v: 1, c: "yellow" },
            { v: 2, c: "red" }, { v: 2, c: "red" },
          ],
        },
        key: "This is called the Dutch National Flag Algorithm. Key insight: only 3 possible values means we can exploit structure that normal sorting can't.",
      },
    ],
  },

  // ── 4. Count Elements Greater Than All Previous ────────────────────────────
  4: {
    tldr: "Count how many times a new world record is set as race results come in one by one.",
    frames: [
      {
        emoji: "🏆",
        heading: "Imagine a record board at a race",
        body: "Race results come in one at a time. The scoreboard shows the current record. Every time a new result BEATS the record, the record updates and we count it. The very first result always counts (beats the empty board).",
        visual: {
          type: "array",
          items: [
            { v: 7, c: "active", sub: "record!" },
            { v: 4, c: "gray", sub: "skip" },
            { v: 8, c: "active", sub: "record!" },
            { v: 2, c: "gray", sub: "skip" },
            { v: 9, c: "active", sub: "record!" },
          ],
        },
      },
      {
        emoji: "🧠",
        heading: "The slow way: compare to everyone before",
        body: "For each person, check ALL previous results — 'Is this larger than all of them?' For 5 people, that's up to 10 comparisons. For 1000 people, up to 500,000 comparisons. Way too slow!",
        visual: {
          type: "table",
          headers: ["Person", "Check against", "Operations"],
          rows: [
            ["1st (7)", "nobody", "0 checks"],
            ["2nd (4)", "7", "1 check"],
            ["3rd (8)", "7, 4", "2 checks"],
            ["4th (2)", "7, 4, 8", "3 checks"],
            ["5th (9)", "7, 4, 8, 2", "4 checks — wasted!"],
          ],
        },
        warn: "For n=1000 people, worst case is ~500,000 checks. For n=1,000,000 it's 500 billion. Way too slow!",
      },
      {
        emoji: "💡",
        heading: "The smart way: just remember the champion",
        body: "You don't need to remember every previous score. Just keep ONE number: 'the best so far'. When a new score arrives: is it bigger than 'the best so far'? If yes → it's a record, update 'the best'. If no → skip.",
        visual: {
          type: "steps",
          items: [
            { icon: "📌", text: "Start: best_so_far = minus-infinity", sub: "Any number beats this!" },
            { icon: "👀", text: "Look at each score once", sub: "Is it > best_so_far?" },
            { icon: "✅", text: "Yes? Count it, update best_so_far", sub: "New champion!" },
            { icon: "❌", text: "No? Just move on", sub: "Not a record." },
          ],
        },
        key: "Only 1 extra number stored (the current best). Checked each score exactly once. n scores = n operations. That's as fast as it gets!",
      },
      {
        emoji: "📽️",
        heading: "Trace through: [7, 4, 8, 2, 9]",
        body: "Start best=-∞. See 7: 7>-∞ → record! best=7, count=1. See 4: 4<7 → skip. See 8: 8>7 → record! best=8, count=2. See 2: 2<8 → skip. See 9: 9>8 → record! best=9, count=3. Final answer: 3.",
        visual: {
          type: "array",
          items: [
            { v: 7, c: "green", sub: "✓ #1" },
            { v: 4, c: "gray", sub: "skip" },
            { v: 8, c: "green", sub: "✓ #2" },
            { v: 2, c: "gray", sub: "skip" },
            { v: 9, c: "green", sub: "✓ #3" },
          ],
        },
      },
    ],
  },

  // ── 5. Product of Digits ────────────────────────────────────────────────────
  5: {
    tldr: "A barcode reader scans each digit one by one and multiplies them all together to get the price.",
    frames: [
      {
        emoji: "🛒",
        heading: "The barcode scanner problem",
        body: "A supermarket item has a code like 5244. The price is found by multiplying all its digits: 5 × 2 × 4 × 4 = 160. Your job is to read that code and compute the product.",
        visual: {
          type: "array",
          items: [
            { v: "5", c: "blue" }, { v: "×", c: "gray" }, { v: "2", c: "blue" },
            { v: "×", c: "gray" }, { v: "4", c: "blue" }, { v: "×", c: "gray" },
            { v: "4", c: "blue" }, { v: "=160", c: "active" },
          ],
        },
      },
      {
        emoji: "🔡",
        heading: "Trick: read the number as a word, not a number",
        body: "If we read 5244 as a NUMBER, pulling out each digit requires division and modulo (messy!). Instead, read it as a STRING of characters — like reading individual letters in a word. Then '5' is just the character at position 0.",
        visual: {
          type: "steps",
          items: [
            { icon: "🔢", text: "As a number: 5244", sub: "Getting digits needs 5244÷10=524 rem 4 etc. — tedious" },
            { icon: "🔤", text: "As a string: '5' '2' '4' '4'", sub: "Just read character by character — easy!" },
            { icon: "🔁", text: "Convert each character back to a number", sub: "'5' → 5, '2' → 2 etc." },
          ],
        },
        key: "Reading a number as a string of characters is a classic trick! It lets you process each digit individually without any math.",
      },
      {
        emoji: "✖️",
        heading: "Multiply one digit at a time",
        body: "Start with product=1 (NOT 0 — multiplying by 0 would wipe everything out!). Read each character, convert it to a digit, multiply into product. After the last character, product is your answer.",
        visual: {
          type: "steps",
          items: [
            { icon: "1️⃣", text: "product = 1, read '5' → product = 1×5 = 5" },
            { icon: "2️⃣", text: "read '2' → product = 5×2 = 10" },
            { icon: "3️⃣", text: "read '4' → product = 10×4 = 40" },
            { icon: "4️⃣", text: "read '4' → product = 40×4 = 160 ✓" },
          ],
        },
      },
    ],
  },

  // ── 6. Count Sundays ────────────────────────────────────────────────────────
  6: {
    tldr: "Use a calendar formula — no loop needed. Figure out when the first Sunday falls, then count every 7 days after.",
    frames: [
      {
        emoji: "📅",
        heading: "Jack wants to know how many Sundays he gets",
        body: "The month starts on Monday. There are 13 days. Jack wants to count Sundays. Simple: first Sunday is 6 days away (Mon→Tue→Wed→Thu→Fri→Sat→Sun). Then every 7 days after that.",
        visual: {
          type: "steps",
          items: [
            { icon: "📆", text: "Day 1: Monday (start)", sub: "Jack's month begins here" },
            { icon: "📆", text: "Day 6: Sunday! → count = 1", sub: "First Sunday arrives" },
            { icon: "📆", text: "Day 13: Sunday! → count = 2", sub: "6+7=13, another Sunday" },
            { icon: "✅", text: "Answer: 2 Sundays in 13 days", sub: "" },
          ],
        },
      },
      {
        emoji: "💡",
        heading: "The offset map trick",
        body: "Each weekday has a fixed 'days until Sunday' offset: Mon=6, Tue=5, Wed=4, Thu=3, Fri=2, Sat=1, Sun=0. Look up the offset, then the formula gives the count immediately.",
        visual: {
          type: "table",
          headers: ["Start Day", "Days Until Sunday", "Offset"],
          rows: [
            ["Sunday", "0 days", "0"],
            ["Saturday", "1 day", "1"],
            ["Friday", "2 days", "2"],
            ["Thursday", "3 days", "3"],
            ["Wednesday", "4 days", "4"],
            ["Tuesday", "5 days", "5"],
            ["Monday", "6 days", "6"],
          ],
        },
      },
      {
        emoji: "🧮",
        heading: "One formula replaces any loop",
        body: "Once you know the offset, the answer is: 1 + (n - offset) ÷ 7 (if n ≥ offset, else 0). For Monday start, offset=6: 1 + (13-6)÷7 = 1 + 1 = 2. Done in a single calculation!",
        visual: {
          type: "formula",
          title: "Sundays in n days",
          expr: "1 + ⌊(n − offset) ÷ 7⌋",
          note: "⌊⌋ means round DOWN. offset = days from start to first Sunday",
        },
        key: "Recognizing that a problem has a FORMULA is a superpower. You never need to loop through days one by one — math gives the answer instantly!",
      },
    ],
  },

  // ── 7. Verbal Kho-Kho ──────────────────────────────────────────────────────
  7: {
    tldr: "In a telephone game, count how many players passed the WRONG digit — it's just n minus how many passed the RIGHT digit.",
    frames: [
      {
        emoji: "📞",
        heading: "The telephone game (Chinese Whispers)",
        body: "Alice whispers a digit to friend 1. Friend 1 gestures it to friend 2, who gestures it to friend 3, and so on. At the end, Alice checks who got it wrong. Whatever friend 1 heard = the correct digit. Everyone else must match it.",
        visual: {
          type: "array",
          items: [
            { v: 1, c: "green", sub: "truth" }, { v: 2, c: "red", sub: "wrong!" },
            { v: 3, c: "red", sub: "wrong!" }, { v: 2, c: "red", sub: "wrong!" }, { v: 2, c: "red", sub: "wrong!" },
          ],
          showIndex: false,
        },
        think: "The first number (1) is the truth. Everyone else has 2 or 3 — all wrong! Answer = 4.",
      },
      {
        emoji: "💡",
        heading: "Count matches, subtract from total",
        body: "Instead of counting wrong answers one by one, count the RIGHT answers — it's easier. Then: wrong answers = total friends − right answers. Python's built-in `.count()` does the counting for you in one step.",
        visual: {
          type: "steps",
          items: [
            { icon: "🎯", text: "truth = arr[0] = 1", sub: "First element is always correct" },
            { icon: "🔢", text: "matches = count how many equal 1", sub: "arr.count(1) = 1 (only arr[0] itself)" },
            { icon: "➖", text: "wrong = 5 − 1 = 4", sub: "n − matches = how many got it wrong" },
          ],
        },
        key: "You don't need to loop — Python's count() does it. But even if you loop, it's just n comparisons. One pass, that's it.",
      },
    ],
  },

  // ── 8. Max Subarray Length with Sum < K ────────────────────────────────────
  8: {
    tldr: "Use a rubber-band window on the horse list — stretch it right until it's too expensive, then shrink from the left.",
    frames: [
      {
        emoji: "🪟",
        heading: "Bob wants the longest cheap run of horses",
        body: "Bob bets on a continuous run of horses. The total cost must be LESS than K=100. He wants the longest possible run. The array shows bet prices for each horse.",
        visual: {
          type: "array",
          items: [
            { v: 30, c: "blue" }, { v: 40, c: "blue" }, { v: 50, c: "blue" },
            { v: 20, c: "blue" }, { v: 20, c: "blue" }, { v: 10, c: "blue" },
            { v: 90, c: "blue" }, { v: 10, c: "blue" }, { v: 10, c: "blue" }, { v: 10, c: "blue" },
          ],
          showIndex: true,
        },
        think: "Which consecutive group is longest with sum under 100? [50,20,20]=90 ✓ or [10,10,10]=30 ✓ — both length 3.",
      },
      {
        emoji: "😩",
        heading: "Naïve approach: try every possible start and end",
        body: "Try every pair: start at horse 0, end at 0, 1, 2... then start at 1, end at 1, 2, 3... This is like trying every possible window. For 10 horses that's 55 combinations. For 100,000 horses it's 5 billion. Way too slow!",
        visual: {
          type: "table",
          headers: ["Start", "Ends tried", "Operations"],
          rows: [
            ["Horse 0", "0,1,2,...,9", "10 tries"],
            ["Horse 1", "1,2,...,9",   "9 tries"],
            ["Horse 2", "2,3,...,9",   "8 tries"],
            ["...","...","..."],
            ["Total","", "55 tries for n=10 → 5 BILLION for n=100,000"],
          ],
        },
      },
      {
        emoji: "🪟",
        heading: "Sliding window: stretch and shrink",
        body: "Put a rubber band over the horses — left end at L, right end at R. Rule: always try to stretch R to the right. If the total cost ≥ K → snap! Pull L inward by one. Track the longest the band has stretched without snapping.",
        visual: {
          type: "window",
          items: [
            { v: 30 }, { v: 40 }, { v: 50 }, { v: 20 }, { v: 20 },
            { v: 10 }, { v: 90 }, { v: 10 }, { v: 10 }, { v: 10 },
          ],
          L: 2, R: 5,
          sum: 90,
          limit: "K=100",
          limitNum: 100,
        },
      },
      {
        emoji: "⚡",
        heading: "Why is this faster?",
        body: "In the naive way, R and L can go backwards and re-check the same horses. In the sliding window, R only moves RIGHT and L only moves RIGHT — they never go back. So each horse is visited at most twice total — once by R, once by L. For 100,000 horses: just 200,000 operations instead of 5 billion!",
        visual: {
          type: "compare",
          options: [
            { label: "😩 Brute Force", result: "O(n²) = 5 billion ops", c: "red", note: "R and L both reset and re-scan" },
            { label: "😎 Sliding Window", result: "O(n) = 200k ops", c: "green", note: "R and L only move forward" },
          ],
        },
      },
    ],
  },

  // ── 9. Subarray with Exact Sum K ───────────────────────────────────────────
  9: {
    tldr: "Running total trick: store every prefix sum in a notebook, then check if 'current total minus K' is already in the notebook.",
    frames: [
      {
        emoji: "🏰",
        heading: "The golden house — find rooms summing to exactly 15",
        body: "Ten rooms have gold coins: [5,3,7,14,18,1,18,4,8,3]. Walk through collecting coins. Find the continuous stretch of rooms where your total is EXACTLY K=15. Room numbering starts at 1.",
        visual: {
          type: "array",
          items: [
            { v: 5, c: "active" }, { v: 3, c: "active" }, { v: 7, c: "active" },
            { v: 14, c: "blue" }, { v: 18, c: "blue" }, { v: 1, c: "blue" },
            { v: 18, c: "blue" }, { v: 4, c: "blue" }, { v: 8, c: "blue" }, { v: 3, c: "blue" },
          ],
          showIndex: true,
        },
        think: "Rooms 1-3 have coins 5+3+7=15 ✓. That's our answer: start=1, end=3.",
      },
      {
        emoji: "📊",
        heading: "Prefix sums — the running total idea",
        body: "As you walk through rooms, keep a running total. After room 1: total=5. After room 2: total=8. After room 3: total=15. After room 4: total=29. This is the 'prefix sum'. The coins collected from room i to room j = prefix[j] - prefix[i-1].",
        visual: {
          type: "prefix",
          arr:    [{ v: 5, c: "blue" }, { v: 3, c: "blue" }, { v: 7, c: "blue" }, { v: 14, c: "blue" }],
          prefix: [{ v: 5, c: "sky"  }, { v: 8, c: "sky"  }, { v: 15, c: "active" }, { v: 29, c: "sky" }],
          note: "prefix[3]=15, prefix[0]=0. So rooms 1→3 sum = 15 - 0 = 15 ✓",
        },
      },
      {
        emoji: "🔑",
        heading: "The notebook trick (hash map)",
        body: "While walking, keep a notebook of every prefix sum you've seen. When your running total is T, check the notebook: is (T minus K) written down? If yes — you found the stretch! Because: if prefix[j]-prefix[i]=K, then prefix[i] = prefix[j]-K = T-K.",
        visual: {
          type: "steps",
          items: [
            { icon: "📒", text: "Notebook starts with {0 → room 0}", sub: "Base case: before any rooms, total is 0" },
            { icon: "🚶", text: "Walk room 3, total becomes 15", sub: "Check notebook: is 15-15=0 there? YES!" },
            { icon: "🎯", text: "Found! Rooms notebook[0]+1 to current = 1 to 3", sub: "Answer: 1 3" },
          ],
        },
        key: "The notebook lookup is instant (like finding a word in a dictionary). So instead of trying all pairs (slow), each room just does one notebook lookup. One pass, instant lookups = very fast.",
      },
    ],
  },

  // ── 10. Jack's Drum Beats (Permutation Cycles) ────────────────────────────
  10: {
    tldr: "Students follow cycle arrows. Find each cycle's length, then find the LCM — that's when ALL cycles finish at the same time.",
    frames: [
      {
        emoji: "🥁",
        heading: "Students follow board arrows",
        body: "Boards say: position 1→2, 2→3, 3→1, 4→5, 5→4. Students follow arrows on each drum beat. After some beats, everyone is back to their original spot. How many beats does it take?",
        visual: {
          type: "array",
          items: [
            { v: 2, c: "blue", sub: "pos 1" }, { v: 3, c: "blue", sub: "pos 2" },
            { v: 1, c: "blue", sub: "pos 3" }, { v: 5, c: "orange", sub: "pos 4" }, { v: 4, c: "orange", sub: "pos 5" },
          ],
          showIndex: false,
        },
        think: "Positions 1,2,3 form one loop. Positions 4,5 form another loop.",
      },
      {
        emoji: "🔄",
        heading: "Spot the cycles",
        body: "Follow arrows from position 1: 1→2→3→1. That's a cycle of length 3. Follow from position 4: 4→5→4. That's a cycle of length 2. These two groups are completely independent of each other.",
        visual: {
          type: "cycles",
          cycles: [
            { nodes: [1, 2, 3], len: 3 },
            { nodes: [4, 5], len: 2 },
          ],
        },
      },
      {
        emoji: "🔢",
        heading: "LCM — when do ALL cycles sync?",
        body: "Cycle 1 (length 3) resets at beats: 3, 6, 9, 12... Cycle 2 (length 2) resets at beats: 2, 4, 6, 8... Both reset at beat 6 (the first common number). The Lowest Common Multiple (LCM) of 3 and 2 is 6.",
        visual: {
          type: "table",
          headers: ["Beat", "Cycle 1 (len 3)", "Cycle 2 (len 2)", "Both reset?"],
          rows: [
            ["1", "not reset", "not reset", "❌"],
            ["2", "not reset", "✅ reset", "❌"],
            ["3", "✅ reset", "not reset", "❌"],
            ["4", "not reset", "✅ reset", "❌"],
            ["5", "not reset", "not reset", "❌"],
            ["6", "✅ reset", "✅ reset", "✅ YES!"],
          ],
        },
        key: "The answer is always LCM of all cycle lengths. LCM(3,2) = 6. If there were a cycle of length 5 too, it would be LCM(3,2,5) = 30.",
      },
    ],
  },

  // ── 11. String Conversion A→B ─────────────────────────────────────────────
  11: {
    tldr: "You can only make letters go earlier in the alphabet, never later. Count how many groups of consecutive mismatches need fixing.",
    frames: [
      {
        emoji: "🎨",
        heading: "Repainting letters — only darken, never lighten",
        body: "String A = 'abab', String B = 'abaa'. The rule: you can pick any group of letters and replace them all with the SMALLEST letter in that group. This can only make letters earlier in the alphabet (a < b < c...), never later.",
        visual: {
          type: "split",
          before: [{ v: "a", c: "green" }, { v: "b", c: "blue" }, { v: "a", c: "green" }, { v: "b", c: "blue" }],
          after:  [{ v: "a", c: "green" }, { v: "b", c: "blue" }, { v: "a", c: "green" }, { v: "a", c: "active" }],
        },
        think: "Position 4 changed from 'b' → 'a'. That's going backwards in alphabet — allowed! Could you change 'a' → 'b'? No — that goes forward.",
      },
      {
        emoji: "🚫",
        heading: "When is it IMPOSSIBLE?",
        body: "If at any position B has a letter that comes LATER in alphabet than A (e.g. A='d', B='e' — 'e' is after 'd'), it's impossible. Our rule can only decrease letters. Answer = -1.",
        visual: {
          type: "compare",
          options: [
            { label: "✅ Possible", result: "B[i] ≥ A[i]", c: "green", note: "Can always decrease to match" },
            { label: "❌ Impossible", result: "B[i] < A[i]", c: "red", note: "Can't increase a letter — return -1" },
          ],
        },
      },
      {
        emoji: "💡",
        heading: "Count groups of mismatches",
        body: "Each 'operation' can fix one continuous group of positions where A and B differ. So scan left to right: when you enter a new mismatch group, count +1. When positions match again, the group ended. Count distinct mismatch groups = number of operations.",
        visual: {
          type: "steps",
          items: [
            { icon: "✅", text: "pos 1: A='a', B='a' — match, skip" },
            { icon: "✅", text: "pos 2: A='b', B='b' — match, skip" },
            { icon: "✅", text: "pos 3: A='a', B='a' — match, skip" },
            { icon: "🔧", text: "pos 4: A='b', B='a' — mismatch! NEW group → ops=1" },
          ],
        },
        key: "1 group of mismatches = 1 operation. If mismatches are separated by a matching position, they need separate operations.",
      },
    ],
  },

  // ── 12. House Robber ───────────────────────────────────────────────────────
  12: {
    tldr: "At each house decide: rob it (skip the previous) or skip it (keep the best so far). Track two running totals.",
    frames: [
      {
        emoji: "🏠",
        heading: "The thief's dilemma",
        body: "7 houses in a row: [6,7,1,3,8,2,5]. Each house has money. You can't rob two houses next to each other — the neighbors will notice. Pick houses to maximize your loot.",
        visual: {
          type: "array",
          items: [
            { v: 6, c: "blue" }, { v: 7, c: "blue" }, { v: 1, c: "blue" },
            { v: 3, c: "blue" }, { v: 8, c: "blue" }, { v: 2, c: "blue" }, { v: 5, c: "blue" },
          ],
          showIndex: true,
        },
        think: "6+1+8+5=20, or 7+3+2=12, or 6+8+5=19? Best is 6+1+8+5=20.",
      },
      {
        emoji: "🤔",
        heading: "Brute force: try all combinations",
        body: "For 7 houses, you could try all possible 'rob or skip' combinations — that's 2^7 = 128 possibilities. For 20 houses: over 1 million. For 50 houses: over 1 quadrillion. Way too slow!",
        visual: {
          type: "table",
          headers: ["Houses", "Combinations"],
          rows: [
            ["7", "128"],
            ["20", "1,048,576 (1 million)"],
            ["50", "Over 1 quadrillion"],
          ],
        },
      },
      {
        emoji: "💡",
        heading: "Dynamic Programming: rob or skip?",
        body: "At each house you face exactly two choices. Track two running totals: 'incl' = best if you rob THIS house. 'excl' = best if you SKIP this house. For each new house: new_incl = old_excl + house_value. new_excl = max(old_incl, old_excl). That's it!",
        visual: {
          type: "compare",
          options: [
            { label: "Rob this house", result: "excl + arr[i]", c: "green", note: "Can't have robbed previous → add excl" },
            { label: "Skip this house", result: "max(incl, excl)", c: "amber", note: "Keep the best of either previous choice" },
          ],
        },
        key: "You only ever need TWO numbers — not a whole table. Walking through 7 houses takes 7 steps, not 128. That's the power of dynamic programming!",
      },
      {
        emoji: "📽️",
        heading: "Trace: [6, 7, 1, 3, 8, 2, 5]",
        body: "Start incl=0, excl=0. House 6: incl=6, excl=0. House 7: incl=7, excl=6. House 1: incl=7, excl=7. House 3: incl=10, excl=7. House 8: incl=15, excl=10. House 2: incl=12, excl=15. House 5: incl=20, excl=15. Answer: max(20,15)=20.",
        visual: {
          type: "table",
          headers: ["House", "Value", "incl (rob)", "excl (skip)"],
          rows: [
            ["start", "—", "0", "0"],
            ["1", "6", "6", "0"],
            ["2", "7", "7", "6"],
            ["3", "1", "7", "7"],
            ["4", "3", "10", "7"],
            ["5", "8", "15", "10"],
            ["6", "2", "12", "15"],
            ["7", "5", "20", "15 → answer: 20!"],
          ],
        },
      },
    ],
  },

  // ── 13. Collecting Candies ─────────────────────────────────────────────────
  13: {
    tldr: "Always merge the two SMALLEST boxes first — this minimises cost. A min-heap (priority queue) finds the smallest instantly.",
    frames: [
      {
        emoji: "🍬",
        heading: "Merging candy boxes costs time",
        body: "You have 4 boxes: [1, 2, 3, 4]. Merging two boxes of size X and Y takes X+Y seconds. You must merge all into one box. Every merge costs you time equal to the combined size.",
        visual: {
          type: "array",
          items: [{ v: 1, c: "sky" }, { v: 2, c: "sky" }, { v: 3, c: "sky" }, { v: 4, c: "sky" }],
        },
        think: "Does it matter which boxes you merge first? YES! Try merging largest first vs smallest first and see which is cheaper.",
      },
      {
        emoji: "🔢",
        heading: "Merge largest first (bad idea)",
        body: "Merge 4+3=7 (costs 7). Merge 7+2=9 (costs 9). Merge 9+1=10 (costs 10). Total: 7+9+10=26. Now try the other order...",
        visual: {
          type: "steps",
          items: [
            { icon: "❌", text: "Merge 4+3 → costs 7. New box: 7", sub: "7 seconds wasted on a big merge" },
            { icon: "❌", text: "Merge 7+2 → costs 9. New box: 9", sub: "Getting more expensive!" },
            { icon: "❌", text: "Merge 9+1 → costs 10. Total: 26", sub: "Can we do better?" },
          ],
        },
      },
      {
        emoji: "✅",
        heading: "Merge smallest first (smart!)",
        body: "Merge 1+2=3 (costs 3). Merge 3+3=6 (costs 6). Merge 6+4=10 (costs 10). Total: 3+6+10=19. Saves 7 seconds! Why? Small merges create small intermediate boxes, which cost less in future merges.",
        visual: {
          type: "steps",
          items: [
            { icon: "✅", text: "Merge 1+2 → costs 3. New box: 3", sub: "Small numbers first!" },
            { icon: "✅", text: "Merge 3+3 → costs 6. New box: 6", sub: "Medium step" },
            { icon: "✅", text: "Merge 6+4 → costs 10. Total: 19 ✓", sub: "7 seconds saved!" },
          ],
        },
        key: "ALWAYS merge the two smallest available boxes. This is a greedy principle — always take the locally best choice.",
      },
      {
        emoji: "📚",
        heading: "How to always find the two smallest fast",
        body: "After each merge, the new box joins the pool and the minimum changes. A Min-Heap (like a priority queue) is a data structure that always keeps the smallest element at the top — accessing the minimum takes zero searching. Each merge is just: pop-pop-push.",
        visual: {
          type: "heap",
          nodes: [1, 2, 3, 4],
          note: "Min-Heap: 1 is on top (smallest). Pop 1 and 2, merge them into 3, push 3 back.",
        },
      },
    ],
  },

  // ── 14. K-th Largest Factor ────────────────────────────────────────────────
  14: {
    tldr: "Factors come in pairs — only check up to √N, collect both of each pair, sort, pick the k-th largest.",
    frames: [
      {
        emoji: "🔢",
        heading: "What are factors?",
        body: "Factors of 12 are all numbers that divide 12 evenly with no remainder: 1, 2, 3, 4, 6, 12. You want the 3rd LARGEST — so that's 4 (sorted descending: 12, 6, 4, 3, 2, 1).",
        visual: {
          type: "array",
          items: [
            { v: 12, c: "active", sub: "1st" }, { v: 6, c: "blue", sub: "2nd" },
            { v: 4, c: "active", sub: "3rd ✓" }, { v: 3, c: "blue" },
            { v: 2, c: "blue" }, { v: 1, c: "blue" },
          ],
        },
      },
      {
        emoji: "💡",
        heading: "Factors come in pairs — only check half!",
        body: "If 2 is a factor of 12, then 12÷2=6 is ALSO a factor. They're a pair! For 12: pairs are (1,12), (2,6), (3,4). You only need to check up to √12≈3.46 — then you automatically get the other half of each pair.",
        visual: {
          type: "table",
          headers: ["Check d", "Factor pair found"],
          rows: [
            ["d=1", "1 and 12/1=12"],
            ["d=2", "2 and 12/2=6"],
            ["d=3", "3 and 12/3=4"],
            ["d=4", "4 > √12=3.46 → STOP"],
          ],
        },
        key: "Checking up to √N instead of all the way to N is a huge speed improvement. √1,000,000 = 1,000. So instead of 1 million checks, just 1,000!",
      },
      {
        emoji: "🎯",
        heading: "Collect, sort, pick",
        body: "Collect all pairs up to √N. Sort the full list descending. Return the item at position k-1 (k starts at 1). If there are fewer than k factors, return 1.",
        visual: {
          type: "steps",
          items: [
            { icon: "🔍", text: "Check d=1,2,3 (up to √12)", sub: "Collect: [1,12,2,6,3,4]" },
            { icon: "📋", text: "Sort descending", sub: "[12, 6, 4, 3, 2, 1]" },
            { icon: "🎯", text: "k=3: pick index 2 → 4", sub: "3rd largest factor of 12 = 4 ✓" },
          ],
        },
      },
    ],
  },

  // ── 15. Square Free Numbers ────────────────────────────────────────────────
  15: {
    tldr: "Count distinct prime building blocks of N. Answer = 2^(count) − 1. No loops, just prime factorisation.",
    frames: [
      {
        emoji: "🧱",
        heading: "Every number is built from prime blocks",
        body: "20 = 2 × 2 × 5. Its prime building blocks are {2, 5}. A 'square-free divisor' uses each block AT MOST ONCE: just 2, just 5, or 2×5=10. Those are the 3 square-free divisors of 20.",
        visual: {
          type: "steps",
          items: [
            { icon: "🔵", text: "Distinct prime factors of 20: {2, 5}", sub: "Even though 2 appears twice (2²×5), we count each prime ONCE" },
            { icon: "🔲", text: "Subsets of {2, 5}:", sub: "{2}, {5}, {2,5} → divisors 2, 5, 10" },
            { icon: "🚫", text: "1 is NOT counted", sub: "Problem says exclude 1 (the empty subset)" },
          ],
        },
      },
      {
        emoji: "💡",
        heading: "The formula: 2^c − 1",
        body: "If N has c distinct prime factors, there are 2^c subsets of those primes. Subtract 1 for the empty set (gives divisor 1, excluded). So the answer is always 2^c − 1.",
        visual: {
          type: "formula",
          title: "Number of square-free divisors",
          expr: "2^c − 1",
          note: "c = number of DISTINCT prime factors of N",
        },
        key: "For N=20: c=2 (primes 2 and 5). Answer = 2²−1 = 3. ✓  For N=72=2³×3²: c=2 (primes 2 and 3). Answer = 2²−1 = 3. ✓",
      },
      {
        emoji: "🔍",
        heading: "Finding prime factors: only check 8 primes!",
        body: "The problem says N has no prime factor bigger than 19. There are only 8 primes ≤ 19: [2,3,5,7,11,13,17,19]. Check each — if N is divisible by it, that's a prime factor. Just 8 checks. Constant time!",
        visual: {
          type: "table",
          headers: ["Prime", "20 ÷ prime?", "Is a factor?"],
          rows: [
            ["2", "20÷2=10 ✓", "YES → c=1"],
            ["3", "20÷3=6.67 ✗", "No"],
            ["5", "20÷5=4 ✓", "YES → c=2"],
            ["7,11,13,17,19", "all fail", "No"],
          ],
        },
      },
    ],
  },

  // ── 16. Rock Samples in Ranges ────────────────────────────────────────────
  16: {
    tldr: "Pre-count each rock size in a frequency table, then each range query just sums up a slice of that table.",
    frames: [
      {
        emoji: "🪨",
        heading: "The lab needs rocks grouped by size",
        body: "You have 10 rock samples with sizes [345, 604, 321, 433, 704, 470, 808, 718, 517, 811]. The lab asks: how many rocks are between sizes 300-350? And between 400-700? Your job: answer each range query.",
        visual: {
          type: "array",
          items: [
            { v: 345, c: "green" }, { v: 604, c: "orange" }, { v: 321, c: "green" },
            { v: 433, c: "orange" }, { v: 704, c: "blue" }, { v: 470, c: "orange" },
            { v: 808, c: "blue" }, { v: 718, c: "blue" }, { v: 517, c: "orange" }, { v: 811, c: "blue" },
          ],
        },
        think: "Green = in range 300-350. Orange = in range 400-700. Blue = outside both ranges.",
      },
      {
        emoji: "🗃️",
        heading: "Build a frequency table first",
        body: "Before answering any queries, scan all rocks ONCE and count how many times each size appears. freq[345]=1, freq[321]=1, freq[604]=1, etc. This is your lookup dictionary.",
        visual: {
          type: "steps",
          items: [
            { icon: "1️⃣", text: "Scan all samples once — O(S)", sub: "Build freq dictionary: {345:1, 604:1, 321:1, ...}" },
            { icon: "2️⃣", text: "For range [300,350]: sum freq[300]+freq[301]+...+freq[350]", sub: "Only 345 and 321 hit → count=2 ✓" },
            { icon: "3️⃣", text: "For range [400,700]: sum freq[400]...freq[700]", sub: "604, 433, 470, 517 hit → count=4 ✓" },
          ],
        },
        key: "Build once, query many times! This is much faster than rescanning all 10,000 rocks for each of 1,000 range queries.",
      },
    ],
  },

  // ── 17. Primes as Consecutive Sum ─────────────────────────────────────────
  17: {
    tldr: "List primes in order, build a running total starting from 2, and check if each running total is itself a prime.",
    frames: [
      {
        emoji: "🧮",
        heading: "A prime staircase starting from 2",
        body: "List primes: 2, 3, 5, 7, 11, 13... Keep adding them up from the start: 2, 2+3=5, 2+3+5=10, 2+3+5+7=17... Check: is each running total itself a prime? If yes, count it!",
        visual: {
          type: "table",
          headers: ["Primes added", "Running total", "Is it prime?", "Count"],
          rows: [
            ["2", "2", "Yes (but start, skip)", "0"],
            ["2+3", "5", "✅ Yes!", "1"],
            ["2+3+5", "10", "❌ No (=2×5)", "1"],
            ["2+3+5+7", "17", "✅ Yes!", "2"],
            ["2+3+5+7+11", "28", "❌ No (=4×7)", "2"],
          ],
        },
      },
      {
        emoji: "🔍",
        heading: "Sieve of Eratosthenes — find ALL primes fast",
        body: "How do we know if 17 is prime? We need a list of all primes up to N. The Sieve is like scratching off multiples: circle 2, cross out 4,6,8,10... Circle 3, cross out 9,15,21... What's left uncrossed = primes!",
        visual: {
          type: "steps",
          items: [
            { icon: "2️⃣", text: "Circle 2, cross out 4, 6, 8, 10, 12..." },
            { icon: "3️⃣", text: "Circle 3, cross out 9, 15, 21..." },
            { icon: "5️⃣", text: "Circle 5, cross out 25, 35..." },
            { icon: "✅", text: "Remaining circled numbers = all primes" },
          ],
        },
        key: "Sieve gives you a YES/NO lookup for any number — is it prime? Instant check after sieve is built. Build once, answer many times.",
      },
    ],
  },

  // ── 18. Codu Sum Love ──────────────────────────────────────────────────────
  18: {
    tldr: "Compute 2^x for each number, keep only the last 2 digits (mod 100), add them all up, take final mod 100.",
    frames: [
      {
        emoji: "🔢",
        heading: "2 raised to the power of x",
        body: "For each input number x, compute 2^x. Then add all results. But 2^x can be HUGE (2^100 has 30 digits!). The problem only cares about the last 2 digits — that's the same as taking the result mod 100.",
        visual: {
          type: "steps",
          items: [
            { icon: "1️⃣", text: "x=8: 2^8 = 256 → last 2 digits = 56", sub: "256 mod 100 = 56" },
            { icon: "2️⃣", text: "x=6: 2^6 = 64 → last 2 digits = 64", sub: "64 < 100, use as-is" },
            { icon: "3️⃣", text: "x=7: 2^7 = 128 → last 2 digits = 28", sub: "128 mod 100 = 28" },
            { icon: "4️⃣", text: "x=4: 2^4 = 16 → last 2 digits = 16", sub: "16 < 100, use as-is" },
          ],
        },
      },
      {
        emoji: "➕",
        heading: "Sum them up, take final mod 100",
        body: "Sum = 56 + 64 + 28 + 16 = 164. Final answer = 164 mod 100 = 64. The 'mod 100' at the end ensures the answer is always between 0 and 99 (a 2-digit number).",
        visual: {
          type: "formula",
          title: "Final answer",
          expr: "(Σ (2^x mod 100)) mod 100",
          note: "mod = remainder after dividing. 164 ÷ 100 = 1 remainder 64. Answer = 64.",
        },
      },
    ],
  },

  // ── 19. Bank EMI Comparison ────────────────────────────────────────────────
  19: {
    tldr: "Plug each bank's interest slabs into the EMI formula, sum the results per bank, then pick the smaller total.",
    frames: [
      {
        emoji: "🏦",
        heading: "Two banks, different rates — which is cheaper?",
        body: "Bank A and Bank B both offer loans but charge different interest rates for different periods (called 'slabs'). An EMI (Equated Monthly Installment) is your monthly payment. You want the bank with the lower total EMI.",
        visual: {
          type: "compare",
          options: [
            { label: "Bank A", result: "35yr@9.5% + 10yr@9.6% + 5yr@8.5%", c: "amber" },
            { label: "Bank B", result: "10yr@6.9% + 5yr@8.5% + 5yr@7.9%", c: "green" },
          ],
        },
      },
      {
        emoji: "🧮",
        heading: "The EMI formula",
        body: "For each slab: convert annual rate to monthly (÷12÷100). Plug into the EMI formula. Sum up all slab EMIs for each bank. Compare.",
        visual: {
          type: "formula",
          title: "EMI per slab",
          expr: "P × r ÷ (1 − (1+r)^(−months))",
          note: "P = principal, r = monthly rate = annual% / 12 / 100, months = years × 12",
        },
      },
      {
        emoji: "⚖️",
        heading: "Compare and decide",
        body: "Compute total EMI for Bank A (sum all slabs). Compute total EMI for Bank B. Whichever is smaller = the better deal. This is pure formula evaluation — no algorithmic tricks needed. Just careful arithmetic.",
        visual: {
          type: "steps",
          items: [
            { icon: "🏦", text: "Compute Bank A total EMI = EMI_A1 + EMI_A2 + EMI_A3" },
            { icon: "🏦", text: "Compute Bank B total EMI = EMI_B1 + EMI_B2 + EMI_B3" },
            { icon: "⚖️", text: "If Bank A total < Bank B total → print 'Bank A', else 'Bank B'" },
          ],
        },
      },
    ],
  },

};
