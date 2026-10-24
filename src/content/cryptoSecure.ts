/* All copy for /work/crypto-secure lives here, not in components.
   Source: "Case Study.pdf" (the design the page follows).
   Accuracy notes (checked against the project SRS and the live demo):
   - The 14,995 / 1,640 / 8 figures are from the TONScanner study (arXiv 2501.06459),
     not from CryptoSecure's own tests. The source line says so.
   - The PDF's "12 vulnerability classes" is not supported by the SRS (17 categories
     in its reference table), so the count is left out.
   - Hacker Mode is in the live app ("Activate Hacker Mode"), so the attacker and
     defender pass is described as partly in the UI.
   - Titles mark their italic words with *...*. */

export const hero = {
  tags: ["AI / ML", "Developer tools", "Security UX", "Accessibility"],
  titleLines: ["CryptoSecure: smart-", "contract security in", "*plain* English"],
  lead:
    "An AI-assisted scanner that checks TON smart contracts written in FunC or Tact, explains each risk in plain language, and shows the fixed code next to the broken code.",
  meta: [
    { label: "Context", value: "Graduate team project · Drexel" },
    { label: "Team", value: "4 people" },
    { label: "Timeline", value: "~3 months" },
    { label: "My role", value: "ML/AI engineering & frontend" },
    { label: "Stack", value: "Next.js · TypeScript · LLM APIs" },
  ],
  cta: { label: "View the code on GitHub", href: "https://github.com/yeoleshweta/cryptosecure" },
};

export const sectionNav = [
  { id: "problem", label: "01 · Problem" },
  { id: "flow", label: "02 · Flow" },
  { id: "analysis", label: "03 · Under the hood" },
  { id: "decisions", label: "04 · Decisions" },
  { id: "accessibility", label: "05 · Accessibility" },
  { id: "reflection", label: "06 · Reflection" },
];

/* ── 01 The problem ── */
export const problem = {
  title: "TON contracts break in ways *most* tools don’t look for",
  lead: "Smart contracts on TON hold real funds, and most are written by small teams or individual developers with no security budget.",
  body:
    "TON’s language (FunC, and Tact on top of it) has its own failure modes, such as bounced messages, forwarded TON and user-controlled store_coins() values. Those don’t exist in Ethereum’s Solidity, so tools built for Ethereum don’t check for them.",
  stats: [
    { value: "14,995", label: "defects found in the study" },
    { value: "1,640", label: "TON contracts scanned" },
    { value: "8", label: "TON-specific defect types" },
  ],
  source: {
    text: "Source: TONScanner, “Enhancing The Open Network: Definition and Automated Detection of Smart Contract Defects”, ICSE 2025",
    href: "https://arxiv.org/abs/2501.06459",
    linkText: "arXiv 2501.06459",
  },
  stickies: [
    { tone: "yellow" as const, label: "Who it’s for:", body: "independent and student developers shipping FunC or Tact contracts, who can’t wait weeks or pay for a manual audit." },
    { tone: "lilac" as const, label: "The gap:", body: "a check that speaks TON, explains the risk in plain words, and hands back code they can use." },
  ],
};

/* ── 02 The flow ── */
export const flow = {
  title: "Paste, scan, *fix*, take it with you",
  lead: "One screen, one path. The tool detects the language from the code, and it accepts",
  extensions: [".fc", ".func", ".tact"],
  steps: [
    { label: "1 · Add", text: "Drop a file or paste code" },
    { label: "2 · Scan", text: "Score, grade and a summary" },
    { label: "3 · Read", text: "Findings by severity, in plain words" },
    { label: "4 · Fix", text: "Broken vs fixed code, side by side", highlight: true },
    { label: "5 · Keep", text: "PDF report, or ask the assistant" },
  ],
};

/* ── 03 Under the hood ── */
export const analysis = {
  title: "An AI pass with TON rules *built in*",
  lead:
    "An AI model alone can sound sure and be wrong. So the rules a TON auditor checks first are written into the analysis itself, and the output has to fit a strict format the interface can trust.",
  cards: [
    {
      tag: "Runs in the app today",
      tone: "lilac" as const,
      title: "Rule-guided AI analysis",
      bullets: [
        "A mandatory first pass: trace every store_coins() value, flag external calls made before state updates, and flag state changes with no sender check.",
        "Checks the vulnerability classes in its reference table, including reentrancy, access control, bounce handling and unbounded loops.",
        "Returns strict JSON: a score and grade, findings with severity, the broken and fixed lines, and a fully corrected file.",
        "The same contract returns the same cached report while the server runs (results are cached in memory by a hash of the code).",
      ],
      models: ["GPT-4.1 (default)", "Gemini 2.5 Pro", "Claude Sonnet 4.6"],
    },
    {
      tag: "Partly in the UI",
      tone: "white" as const,
      title: "Deterministic rules and an attacker/defender pass",
      bullets: [
        "4 pattern rules for known TON bugs (missing bounce check, missing owner check, unsafe send mode, unprotected withdrawal), 3 of them with automatic patches.",
        "Hacker Mode in the app runs an attacker step and a defender step. The rules are not yet wired in as a check on the AI’s output.",
      ],
      closing: "Wiring these in as a check on the AI’s output is the clearest next step.",
    },
  ],
  note: "AI is a tool, not an oracle — so the rules come first.",
};

/* ── 04 Design decisions ── */
export const decisions = {
  title: "Fix it, don’t *just* flag it",
  items: [
    { n: "01", title: "Plain words over codes", body: "Each finding says what can go wrong and who could do it, so a developer who isn’t a security specialist can act." },
    { n: "02", title: "Show the fix", body: "Every finding carries the broken lines and the fixed lines, with line numbers, plus a fully corrected file to compare." },
    { n: "03", title: "One number, then detail", body: "A 0–100 score and a letter grade first, then findings grouped from critical to informational." },
    { n: "04", title: "Take it with you", body: "Download a PDF report to share, or ask the built-in assistant to explain a finding." },
  ],
  vulnerable: {
    file: "VulnerableWallet.fc · withdraw",
    badge: "Critical",
    lines: [
      { n: 19, text: "if (op == 2) { ;; withdraw" },
      { n: 20, text: "    int amount = in_msg_body~load_coins();" },
      { n: 23, text: "    send_raw_message(begin_cell()", mark: "bad" as const },
      { n: 24, text: "         .store_uint(0x18, 6)", mark: "bad" as const },
      { n: 25, text: "         .store_slice(sender)", mark: "bad" as const },
      { n: 26, text: "         .store_coins(amount)", mark: "bad" as const },
      { n: 27, text: "         .store_uint(0, 107)", mark: "bad" as const },
      { n: 28, text: "    .end_cell(), 1);", mark: "bad" as const },
      { n: 31, text: "    balance -= amount;  ;; after the send", mark: "bad" as const },
      { n: 32, text: "}" },
    ],
  },
  secure: {
    file: "SecureWallet.fc · withdraw",
    badge: "Fixed",
    lines: [
      { n: 27, text: "if (op == 2) { ;; withdraw" },
      { n: 28, text: "    int amount = in_msg_body~load_coins();" },
      { n: 31, text: "    throw_unless(401, amount > 0);", mark: "good" as const },
      { n: 32, text: "    throw_unless(402, amount <= balance);", mark: "good" as const },
      { n: 35, text: "    balance -= amount;  ;; state first", mark: "good" as const },
      { n: 38, text: "    send_raw_message(begin_cell()" },
      { n: 39, text: "         .store_uint(0x18, 6)" },
      { n: 40, text: "         .store_slice(sender)" },
      { n: 41, text: "         .store_coins(amount)" },
      { n: 42, text: "         .store_uint(0, 107)" },
      { n: 43, text: "    .end_cell(), 1);  ;; send last" },
      { n: 44, text: "}" },
    ],
  },
  caption:
    "The sample contract pair from the repo, trimmed to the withdraw handler. The fix is the checks–effects–interactions order the analysis asks for: check the request, update state, then send.",
};

/* ── 05 Accessibility ── */
export const accessibility = {
  title: "What I’d fix *first* in our own UI",
  lead:
    "A security tool should be usable by every developer, including those using a keyboard or a screen reader. Reading back through the scanner’s interface code against WCAG 2.2 AA, four gaps stand out. This was a code read, not a full audit with assistive tech.",
  caption: "Accessibility gaps found in the scanner UI, with the WCAG criterion and the fix",
  rows: [
    { gap: "Scan results appear silently", criterion: "4.1.3 Status messages", fix: "Announce “Scan complete: score, number of findings” in a polite live region" },
    { gap: "Severity shown by colour", criterion: "1.4.1 Use of colour", fix: "Keep the text label (Critical, High…) on every finding, plus an icon shape per level" },
    { gap: "Icon-only controls without names", criterion: "4.1.2 Name, role, value", fix: "An aria-label on each icon button (copy, download, accept fix)" },
    { gap: "Drag-and-drop upload", criterion: "2.1.1 Keyboard", fix: "A visible, labelled “Choose file” button and a paste box as equal routes in the upload area" },
  ],
};

/* ── 06 Reflection ── */
export const reflection = {
  title: "What I’d tell the *next* team",
  cards: [
    { title: "Explanation is the product", body: "“Reentrancy detected” is correct and useless to most of the people this tool is for. The plain-language impact and the fix are what make it worth opening." },
    { title: "Constrain the model", body: "A strict output format and a mandatory first pass did more for reliability than prompt wording. The interface can only be as trustworthy as the data it renders." },
    { title: "UX thinking applies to ML output", body: "Severity hierarchy, summary first, detail on demand: the same patterns that work in any dashboard made raw model output usable." },
    { title: "We didn’t measure accuracy", body: "There’s no benchmark yet of how many real defects it catches or how often it’s wrong. That’s the honest gap in this project." },
  ],
  nextTitle: "Next steps",
  next: [
    "Measure precision and recall against a labelled set of TON contracts, such as TONScanner’s defect types.",
    "Run the 4 deterministic rules as a check on every AI result, and flag disagreements.",
    "Fix the four accessibility gaps, then test with a screen reader and keyboard only.",
  ],
};
