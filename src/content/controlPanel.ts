/* All copy for /work/control-panel lives here, not in components. It follows the design artboard
   (project/Main.dc.html in the Urbanfit Control Panel design canvas). Screens are the design's own exports,
   in public/assets/control-panel, with the artboard's alt text.
   - Counts are the design's. 30 screens; 484 interactions, of which 203, 246 and 18 are broken out.
   - Contrast ratios were recomputed from the colour values; see docs/control-panel-redesign/PLAN.md.
   - Titles mark their italic words with *...*. */

export type Screen = {
  name: string;
  caption: string;
  src: string;
  alt: string;
};

export type Stat = {
  value: string;
  label: string;
  hot?: boolean;
};

export type Severity = "High" | "Medium" | "Low";

export const hero = {
  tags: ["Micro case study", "Internal tool · desktop web", "Inventory and operations", "Accessibility"],
  title: "Urbanfit Control Panel: one screen for every *branch*",
  lead:
    "An internal tool for Urbanfit's supplement business. Admins, warehouses and franchise shops use it to move stock, price products, take orders and see sales, each with only the access their role needs.",
  meta: [
    { label: "My role", value: "UI/UX designer" },
    { label: "Company", value: "Urbanfit Wellness · Pune" },
    { label: "Platform", value: "Desktop web, 1512 × 977" },
    { label: "Users", value: "Admin · Warehouse · Franchise shop" },
    { label: "In Figma", value: "30 screens · 484 interactions" },
  ],
  laptop: {
    src: "/assets/control-panel/admin-dashboard.jpg",
    alt: "Admin dashboard: a teal sidebar with Dashboard, Inventory Management, Account Reports, Quotation and Settings; an Overview of five franchise branch cards with total orders and revenue; and Sales Statistics and Overall Analytics panels.",
  },
};

export const sectionNav = [
  { id: "problem", label: "01 · The problem" },
  { id: "structure", label: "02 · Structure" },
  { id: "dashboards", label: "03 · Role-based dashboards" },
  { id: "pricing", label: "04 · Stock and pricing" },
  { id: "records", label: "05 · Records, quotes and access" },
  { id: "components", label: "06 · Components" },
  { id: "accessibility", label: "07 · Accessibility audit" },
  { id: "reflection", label: "08 · Reflection" },
];

export const problem = {
  title: "Stock in many places, truth in *none*",
  lead:
    "Urbanfit sells supplements through warehouses and franchise shops. The Control Panel had to give each of them one shared, correct view of stock, prices and sales.",
  stickies: [
    {
      title: "Stock moves between places",
      body: "Warehouses add stock from distributors and send it to shops. Each transfer had to be traceable, with pending units visible.",
    },
    {
      title: "One product, many prices",
      body: "The same tub sells online, in a shop and to gym trainers at different rates, all worked out from one purchase price.",
    },
    {
      title: "Three roles, three views",
      body: "An admin sees every branch; a franchise owner sees only their own shop. Permissions decide who can add stock or users.",
    },
  ],
};

export const structure = {
  title: "Five sections, three *dashboards*",
  body:
    "A fixed sidebar holds five sections: Dashboard, Inventory Management, Account Reports, Quotation and Settings. The Figma page groups screens by who sees them: an admin, warehouse or shop dashboard, inventory access and settings access.",
  pathLabel: "Main stock path",
  path: [
    "Add stock to warehouse",
    "Set channel prices",
    "Distribute to a shop",
    "Shop sells or quotes",
    "Sales and ledger reports",
  ],
  pathHighlight: "Distribute to a shop",
  stats: [
    { value: "484", label: "Prototype interactions", hot: true },
    { value: "203", label: "Navigate between screens" },
    { value: "246", label: "Change a component's state: 167 on click, 79 on hover" },
    { value: "18", label: "Open an overlay: filters and forms" },
  ] as Stat[],
};

export const dashboards = {
  title: "Same layout, different *scope*",
  body:
    "The admin dashboard compares branches. The shop dashboard answers a shop owner's first questions: what to reorder, what's selling, and who owes money.",
  screens: [
    {
      name: "Admin",
      caption: "Every branch as a card: orders and revenue for the month, then sales and analytics.",
      src: "/assets/control-panel/admin-dashboard.jpg",
      alt: "Admin dashboard with branch cards, monthly sales chart and overall analytics.",
    },
    {
      name: "Franchise shop",
      caption: "Place and find orders, a pending-stock alert, trending products and on-credit customers.",
      src: "/assets/control-panel/shop-dashboard.jpg",
      alt: "Shop dashboard with Place Order and View Order search, a pending stock alert, stock analysis chart, on-credit customers, trending products and monthly sales. Branch details are blurred.",
    },
  ] as Screen[],
};

export const pricing = {
  title: "One purchase price, three *selling* prices",
  body:
    "Adding stock and sending it to a shop use the same form. The key interaction is the price calculator: enter the MRP once, set a percentage for each channel, and the online, retail and gym-trainer prices fill in.",
  screens: [
    {
      name: "Inventory hub",
      caption: "Add, distribute, check warehouse status and set stock limits from one screen.",
      src: "/assets/control-panel/inventory-hub.jpg",
      alt: "Inventory Management hub: Add Stock and Distribute Stock cards, a monthly closing report chart, warehouse stock status rings, and links to distributor, party, product and demand lists.",
    },
    {
      name: "Add stock",
      caption: "The form and the resulting entries on one screen, with stock status on each row.",
      src: "/assets/control-panel/add-stock.jpg",
      alt: "Add Stock To Warehouse form with product, party, distributor, quantity, prices and expiry, above a table of entries with In Stock and Expired status labels.",
    },
  ] as Screen[],
  calculator: {
    title: "Try the calculator",
    body: "A working recreation of the pattern. It assumes each percentage is taken off the MRP.",
    defaults: { mrp: 3000, online: 25, retail: 35, gym: 45 },
    max: 90,
    note:
      "In the Figma file, an MRP of 3000 with 25%, 35% and 25% gives 2250, 1950 and 1650. The first two match this rule; 1650 matches 45%, not the 25% shown, so one of the two values in the design needs correcting.",
  },
};

export const records = {
  title: "Tables people can *act* on",
  body:
    "Lists share one table pattern: entries per page, search, export to Copy, CSV, Excel, PDF or Print, and pagination. Quotes and permissions build on the same parts. Permissions are a grid of actions (set access, add stock, add or delete users) against the Admin, Warehouse and Franchise roles.",
  screens: [
    {
      name: "Customer list",
      caption: "One table pattern for customers, sales, parties, distributors and demand.",
      src: "/assets/control-panel/customer-list.jpg",
      alt: "Customer List table with order ID, customer, total, quantity, product, purchase date and location, time, logged by and barcode columns, plus search, export and pagination. Customer details are blurred.",
    },
    {
      name: "Sales report",
      caption: "Date range and shop filters above the same table.",
      src: "/assets/control-panel/sales-report.jpg",
      alt: "Sales Report table by shop with total sale, quantity, conversion rate, date, location and logged by, plus date filters. Shop contact details are blurred.",
    },
    {
      name: "Quotation",
      caption: "Pick a customer, add products, generate a quote.",
      src: "/assets/control-panel/quotation.jpg",
      alt: "Quotation screen: a customer row with products, MRP, user rate, quantity and expiry, quote prices and a Generate Quote button. Customer details are blurred.",
    },
    {
      name: "Permissions",
      caption: "Actions against roles, set by the admin.",
      src: "/assets/control-panel/permissions.jpg",
      alt: "Settings, Permissions tab: a matrix of actions (set access, add stock, add or delete user) against Admin, Warehouse and Franchise roles, with Cancel and Update buttons.",
    },
  ] as Screen[],
};

export const components = {
  title: "The parts behind 30 *screens*",
  body:
    "The page has 19 component sets: the user menu (27 uses), status labels (25), category and brand pickers, sort menus and the four settings tabs. Charts use a shared data-visualisation library. No variables are bound. Below are recreated specimens, with fixes where the originals fail contrast.",
  specs: {
    status: {
      title: "Stock status",
      code: "Component 14 · 15 · 25 uses",
      body:
        "As designed, the status words are green (#1BE1AF, 1.69:1) and orange (#FF774A, 2.63:1) on white. The fix uses dark text on a tinted chip, plus an icon, so status isn't shown by colour alone.",
    },
    sidebar: {
      title: "Sidebar navigation",
      code: "Fixed left rail · 5 sections",
      body:
        "White labels on the teal rail are 1.65:1. Keeping teal for the selected item and darkening the rail fixes every label, to 10.3:1 and up.",
    },
    toolbar: {
      title: "Table toolbar",
      code: "Repeated on every list",
      body:
        "One toolbar on every list, so exports always live in the same place. Real buttons with visible outlines (3:1 or more) and a 36px minimum height.",
    },
  },
};

export const accessibility = {
  title: "Checked against WCAG 2.2 *AA*",
  body:
    "Data-dense tools are used for hours at a time, so small text and low contrast cost more here than on a marketing page. Counts come from the 2,971 text layers inside the 30 screens.",
  stats: [
    { value: "2,047", label: "Of 2,971 text layers are smaller than 12px, down to 8px", hot: true },
    { value: "1.65:1", label: "White sidebar labels on teal, on every screen" },
    { value: "79", label: "Hover-only state changes that need a keyboard equivalent" },
  ] as Stat[],
  caption: "Findings, highest impact first",
  headers: ["Finding", "WCAG 2.2", "Severity", "Fix"],
  rows: [
    {
      finding: "White sidebar labels on teal",
      criterion: "1.4.3 Contrast",
      severity: "High" as Severity,
      fix: "1.65:1. Darken the rail; keep teal for the selected item.",
    },
    {
      finding: "Most table text is 8 to 11px",
      criterion: "1.4.4 Resize text · 1.4.10 Reflow",
      severity: "High" as Severity,
      fix: "14px table text; tables scroll inside their own box at 200% zoom.",
    },
    {
      finding: "Grey text #C0C0C0, #979797, #909090, #858585",
      criterion: "1.4.3 Contrast",
      severity: "High" as Severity,
      fix: "1.82 to 3.69:1. Use #4D4D4D, which passes at 8.45:1 on white.",
    },
    {
      finding: "Status in green and orange text only",
      criterion: "1.4.1 Use of colour · 1.4.3",
      severity: "High" as Severity,
      fix: "Dark text in a tinted chip, plus an icon.",
    },
    {
      finding: "79 hover states",
      criterion: "2.1.1 Keyboard · 2.4.7 Focus visible · 1.4.13",
      severity: "Medium" as Severity,
      fix: "Show the same change on keyboard focus, with a visible focus ring.",
    },
    {
      finding: "18 overlays for filters and forms",
      criterion: "2.4.3 Focus order · 2.4.11 Focus not obscured",
      severity: "Medium" as Severity,
      fix: "Move focus into the dialog, trap it there, return it on close; Escape closes.",
    },
    {
      finding: "Blue Update button, white label",
      criterion: "1.4.3 Contrast",
      severity: "Medium" as Severity,
      fix: "3.5:1. Use a darker blue such as #0A6FE0 (4.81:1).",
    },
    {
      finding: "Data tables",
      criterion: "1.3.1 Info and relationships",
      severity: "Medium" as Severity,
      fix: "Build as real tables with header cells and a caption, so screen readers read column names.",
    },
    {
      finding: "Spelling in labels: \"Coversion Rate\", \"Paid Amuont\", \"Reciepts\", \"Itenary\"",
      criterion: "Content quality, not WCAG",
      severity: "Low" as Severity,
      fix: "Fix before build; screen readers read them as written.",
    },
  ],
};

export const reflection = {
  title: "What I'd do *next*",
  cards: [
    {
      kicker: "Strength",
      title: "Roles shape the screen",
      body: "Admin, warehouse and shop views share one layout, so training is shared too, while each role sees only its own scope.",
      accent: false,
    },
    {
      kicker: "Strength",
      title: "Pricing as a pattern",
      body: "One purchase price feeding three channel prices removes manual sums, the most error-prone step in a franchise business.",
      accent: false,
    },
    {
      kicker: "To fix",
      title: "Built for reading all day",
      body: "Raise text sizes, fix contrast and bind colours to tokens. People live in this tool, so small type is a daily cost.",
      accent: true,
    },
  ],
  validateTitle: "To validate next",
  validate: [
    "Task-test \"send 20 units to a shop\" and \"find who owes money\" with 3 to 5 people per role. Report counts, not percentages.",
    "Measure transfer errors: transfers corrected afterwards, out of all transfers, before and after launch.",
    "Check every screen at 200% zoom and with keyboard only.",
  ],
};

export const footer =
  "Screens are exported from the Urbanfit Control Panel Figma file. People's names, contact details, addresses and profile photos are blurred. The calculator, permissions table and component specimens are recreations. No research findings or outcome numbers for this tool are included, because none were in the file.";
