/* All copy for /work/poshmera lives here, not in components. It follows the design artboard
   (project/Main.dc.html in the Poshmera design file). Screens are the design's own exports, in
   public/assets/poshmera, with the artboard's alt text.
   - Research and results are as reported in the portfolio; the design file does not hold them.
   - Contrast ratios were recomputed from the colour values; see docs/poshmera-redesign/PLAN.md.
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
  tags: ["Micro case study", "Mobile commerce · iOS and Android", "Fashion", "Accessibility"],
  title: "Poshmera: a fashion app built for *trust* at checkout",
  lead:
    "A new women's fashion app from Urbanfit, designed from research to launch. The work centred on the moments Indian shoppers hesitate: size, delivery, price and payment.",
  meta: [
    { label: "My role", value: "UX lead, research to launch" },
    { label: "Company", value: "Urbanfit Wellness · Pune" },
    { label: "Timeline", value: "24 weeks" },
    { label: "Platforms", value: "iOS and Android, plus web" },
    { label: "In Figma", value: "48 mobile frames" },
  ],
  phones: [
    {
      src: "/assets/poshmera/listing.jpg",
      alt: "Dresses listing with a filter bar: Sort, Category, Size, Fast Delivery and Filter.",
    },
    {
      src: "/assets/poshmera/product.jpg",
      alt: "Product page for a yellow polka dot dress: price 530 rupees down from 870, colour, sizes, size chart and delivery details.",
    },
    {
      src: "/assets/poshmera/bag.jpg",
      alt: "My Bag with two items, a free-shipping message, coupon SPR120 applied and a Continue To Checkout button.",
    },
  ],
};

export const sectionNav = [
  { id: "snapshot", label: "01 · Snapshot" },
  { id: "shopping", label: "02 · The shopping path" },
  { id: "find", label: "03 · Decision 1 · Finding the right dress" },
  { id: "decide", label: "04 · Decision 2 · The product page" },
  { id: "checkout", label: "05 · Decision 3 · Bag and checkout" },
  { id: "growth", label: "06 · Growth loops" },
  { id: "components", label: "07 · Components and tokens" },
  { id: "platforms", label: "08 · iOS and Android" },
  { id: "accessibility", label: "09 · Accessibility audit" },
];

export const snapshot = {
  title: "Research first, then *launch*",
  lead:
    "I led UX from research to launch. Research and results below are as reported in my portfolio; the design file shows the screens and flows.",
  stats: [
    { value: "15", label: "Target shoppers interviewed" },
    { value: "250", label: "Survey responses" },
    { value: "3", label: "Rounds of usability testing" },
    { value: "8,000", label: "Installs in the first month, against a target of 5,000", hot: true },
    { value: "4.3★", label: "App Store rating" },
    { value: "13%", label: "Checkout completion" },
  ] as Stat[],
  note:
    "The 13% needs its denominator stated (sessions that reached the bag, or all sessions) before it can be compared with anything.",
};

export const shopping = {
  title: "Browse freely, sign in only to *pay*",
  lead:
    "Shoppers browse, filter, save and fill a bag without an account. Sign-in appears only when they continue to checkout, so the account ask comes after the intent to buy.",
  pathLabel: "Main shopping path in the prototype",
  path: [
    "Discover",
    "Category",
    "Listing + filters",
    "Product",
    "Bag + coupon",
    "Sign in or sign up",
    "Address",
    "Checkout",
    "Payment success",
  ],
  pathHighlight: "Sign in or sign up",
  stats: [
    { value: "286", label: "Prototype interactions on the mobile page", hot: true },
    { value: "3", label: "Starting flows: launch, home and sign-in" },
    { value: "4", label: "Tabs: Discover, Category, Bag, Account" },
    { value: "7", label: "Home layout explorations on the desktop page" },
  ] as Stat[],
};

export const find = {
  title: "Quick filters on top, full filters one *tap* away",
  screens: [
    {
      name: "Quick filter",
      caption: "Size opens in place, above the results.",
      src: "/assets/poshmera/filter-size.jpg",
      alt: "Listing with the Size quick filter open: size chips from XS to 5XL and One-Size, with Clear and Apply.",
    },
    {
      name: "Full filter",
      caption: "Every facet, with Clear and Apply fixed at the bottom.",
      src: "/assets/poshmera/filter-full.jpg",
      alt: "Full Filter screen: category chips, colour swatches, sizes, length and pattern, with Clear and Apply buttons fixed at the bottom.",
    },
  ] as Screen[],
  options: [
    {
      tag: "Considered",
      title: "One long filter screen",
      body: "Complete, but slow for the most common filter, which is size.",
      chosen: false,
    },
    {
      tag: "Chosen",
      title: "Two levels",
      body: "A sticky bar holds Sort, Category, Size and Fast Delivery as dropdowns. Filter opens the full list for colour, length and pattern.",
      chosen: true,
    },
  ],
  hand: "size is the first question, so it gets the first tap",
};

export const decide = {
  title: "Answer the doubts before they become *exits*",
  lead:
    "The product page answers the questions that stop a purchase: is my size in stock, when will it arrive, can I pay cash, and can I return it.",
  screens: [
    {
      name: "Out of stock",
      caption: "Add to Bag becomes Notify Me.",
      src: "/assets/poshmera/product-out-of-stock.jpg",
      alt: "Product page where the selected size is out of stock, with an orange Notify Me button.",
    },
    {
      name: "Pincode check",
      caption: "A sheet asks for a pincode to show delivery dates.",
      src: "/assets/poshmera/pincode-sheet.jpg",
      alt: "Bottom sheet over the product page asking for a pincode, with a Submit button.",
    },
  ] as Screen[],
  options: [
    {
      tag: "Pattern",
      title: "Keep the shopper, not the stock",
      body: "When a size is sold out, the main button changes to Notify Me instead of disappearing. The file explores colour versions of it: orange and green on mobile, yellow and green on desktop.",
      chosen: true,
    },
    {
      tag: "Pattern",
      title: "Delivery promise in the page",
      body: "Pincode, delivery dates, cash on delivery, free shipping and 10-day free-pickup returns sit right under the size picker.",
      chosen: true,
    },
    {
      tag: "Note",
      title: "Both Notify Me colours fail contrast",
      body: "White on orange is 1.89:1 and white on green is 3.56:1. A black button keeps the state change and passes.",
      chosen: false,
    },
  ],
};

export const checkout = {
  title: "Make the last steps feel *safe*",
  lead:
    "The bag and checkout carry the discount logic, account creation and payment. Each screen gives one clear next step.",
  stripLabel: "Bag and checkout screens, scroll sideways",
  screens: [
    {
      name: "Bag",
      caption: "\"Add ₹700 more for free shipping\" sits at the top.",
      src: "/assets/poshmera/bag.jpg",
      alt: "Bag with a free-shipping nudge, coupon applied and price breakdown.",
    },
    {
      name: "Coupons",
      caption: "Usable codes first, expired ones greyed below.",
      src: "/assets/poshmera/coupons.jpg",
      alt: "Select Coupons screen: a code field, five redeemable coupons, and three expired coupons greyed out.",
    },
    {
      name: "Sign in",
      caption: "Shown only on the way to checkout.",
      src: "/assets/poshmera/sign-in.jpg",
      alt: "Sign in screen on pink with username, password, recovery link and social sign-in buttons.",
    },
    {
      name: "Sign up",
      caption: "Each error says the rule, under its field.",
      src: "/assets/poshmera/sign-up.jpg",
      alt: "Sign-up form with red error messages under name, phone and email fields explaining the rule for each. Personal details are blurred.",
    },
    {
      name: "Checkout",
      caption: "UPI first, cash on delivery always offered.",
      src: "/assets/poshmera/checkout.jpg",
      alt: "Order review: address, delivery date, coupon and reference code fields, and payment methods UPI, card, net banking, cash on delivery and PoshPay. Personal details are blurred.",
    },
    {
      name: "Empty bag",
      caption: "A way back, not a dead end.",
      src: "/assets/poshmera/empty-bag.jpg",
      alt: "Empty bag screen reading Ouhh, it's empty in here, with a Continue Shopping button.",
    },
  ] as Screen[],
  cards: [
    {
      title: "Payment in the local order",
      body: "UPI comes first, then cards, net banking, cash on delivery and the store wallet. Cash on delivery is also promised on the product page, so it's never a surprise.",
    },
    {
      title: "Address from the pincode",
      body: "The address form links state and city to the pincode, so shoppers type six digits instead of two fields.",
    },
  ],
};

export const growth = {
  title: "Shoppers who *sell*",
  lead:
    "Poshmera also recruited shoppers as influencers. They register, wait for approval, then track commission from their link and code. Referrals and Posh Points reward everyone else.",
  stripLabel: "Growth screens, scroll sideways",
  screens: [
    {
      name: "Register",
      caption: "Profile, bank details and social links.",
      src: "/assets/poshmera/influencer-register.jpg",
      alt: "Influencer registration form with personal, bank and social account fields.",
    },
    {
      name: "Earnings",
      caption: "Paid, unpaid and estimated, side by side.",
      src: "/assets/poshmera/earnings.jpg",
      alt: "My Earnings: estimated commission, paid and unpaid commission, referral link and code, and a summary.",
    },
    {
      name: "Account",
      caption: "Refer a friend sits above orders.",
      src: "/assets/poshmera/account.jpg",
      alt: "Account page with wishlist and bag shortcuts, a refer-a-friend banner and a list of account options. Personal details are blurred.",
    },
    {
      name: "Flash sale",
      caption: "Now and upcoming, in two tabs.",
      src: "/assets/poshmera/flash-sale.jpg",
      alt: "Flash Sale screen with On Sale Now and Starts Tomorrow tabs and a list of discounted dresses with Buy Now buttons.",
    },
  ] as Screen[],
};

export const components = {
  title: "Two components did most of the *work*",
  lead:
    "The mobile screens reuse four local components: product price (69 uses), discount badge (41), status bar (32) and bottom bar (10). Colours are typed in directly; no variables are bound. Below: the parts as specimens, with proposed tokens that fix contrast.",
  specs: [
    {
      title: "Product price",
      code: "ProdPrices · 69 instances",
      body:
        "Sale price in a deeper pink that passes on white: 5.22:1, against 3.91:1 as designed. The struck price carries a hidden \"was\" so screen readers read both prices correctly.",
    },
    {
      title: "Size chip",
      code: "Default · Selected · Out of stock",
      body: "Out of stock is shown three ways (dashed border, strike-through, label), not by colour alone. Chips are 44pt.",
    },
    {
      title: "Notify Me button",
      code: "Primary action · out-of-stock state",
      body:
        "The two versions in the file are 1.89:1 (orange) and 3.56:1 (green) with white labels. The proposed black button is 21:1, and keeps the state change visible through the label rather than the colour.",
    },
  ],
  tokens: {
    caption: "Proposed colour tokens, built from the values in the file",
    headers: ["Token", "Value", "Replaces", "Check"],
    rows: [
      {
        token: "brand/pink",
        value: "#FF1D8E",
        swatch: "#ff1d8e",
        replaces: "Pink headers and banners (no change)",
        check: "Black text on it 5.82:1. White text only at 24px+ (3.61:1).",
      },
      {
        token: "text/sale",
        value: "#D6005F",
        swatch: "#d6005f",
        replaces: "#FF0052 on 275 text layers",
        check: "5.22:1 on white",
      },
      {
        token: "text/secondary",
        value: "#5E5E5E",
        swatch: "#5e5e5e",
        replaces: "#B0B0B0 and #CCCCCC hint text",
        check: "6.48:1, against 2.17 and 1.61:1",
      },
      {
        token: "action/primary",
        value: "#000000",
        swatch: "#000000",
        replaces: "Orange and green Notify Me fills",
        check: "White label 21:1",
      },
      {
        token: "type/family",
        value: "Lato",
        replaces: "Lato plus 7 other families in the file",
        check: "One family, 12pt minimum",
      },
    ],
  },
};

export const platforms = {
  title: "One design, two *stores*",
  lead: "The file holds one set of 428 × 926 frames. This is how the shared design maps to each platform.",
  caption: "Shared design and its platform equivalents",
  headers: ["Element", "In the design", "iOS", "Android"],
  rows: [
    ["Bottom bar", "Discover, Category, Bag, Account", "Tab bar", "Navigation bar"],
    ["Back", "Back arrow, plus swipe on some screens", "Back chevron and edge swipe", "System back must also work"],
    ["Pincode sheet", "Overlay from the bottom", "Sheet", "Modal bottom sheet"],
    ["Payment", "UPI, cards, net banking, cash on delivery", "UPI apps open by link", "UPI apps open by intent"],
    ["Phone field", "+91 with a flag picker", "Phone keypad, SMS code autofill", "Phone keypad, SMS code autofill"],
    ["Status bar", "Drawn into the frames", "System status bar", "System status bar"],
    ["Touch targets", "Mixed sizes", "At least 44 × 44 pt", "At least 48 × 48 dp"],
  ],
};

export const accessibility = {
  title: "Checked against WCAG 2.2 *AA*",
  stats: [
    { value: "402", label: "Of 1,545 text layers are smaller than 12pt, down to 7pt", hot: true },
    { value: "275", label: "Sale-price layers in a pink that is 3.91:1 on white" },
    { value: "8", label: "Font families on one page" },
  ] as Stat[],
  caption: "Findings, highest impact first",
  headers: ["Finding", "WCAG 2.2", "Severity", "Fix"],
  rows: [
    {
      finding: "Sale prices and pink links at 3.91:1; hint text at 1.61 to 2.17:1",
      criterion: "1.4.3 Contrast",
      severity: "High" as Severity,
      fix: "Use text/sale and text/secondary.",
    },
    {
      finding: "Notify Me buttons at 1.89 and 3.56:1",
      criterion: "1.4.3 Contrast",
      severity: "High" as Severity,
      fix: "Black button, white label.",
    },
    {
      finding: "Text down to 7pt, fixed sizes",
      criterion: "1.4.4 Resize text",
      severity: "High" as Severity,
      fix: "12pt floor; support Dynamic Type and Android font scale.",
    },
    {
      finding: "Colour swatches in Filter have no names",
      criterion: "1.1.1 · 4.1.2",
      severity: "Medium" as Severity,
      fix: "Label each swatch (\"Coral, not selected\").",
    },
    {
      finding: "Some prototype paths use a swipe to go back to Home",
      criterion: "2.5.7 Dragging movements",
      severity: "Medium" as Severity,
      fix: "Make sure every swipe has a visible button that does the same thing.",
    },
    {
      finding: "Phone field shows a Nigerian flag with +91",
      criterion: "3.3.2 Labels or instructions",
      severity: "Low" as Severity,
      fix: "Default to India and say it in the label.",
    },
    {
      finding: "Policy and FAQ pages hold placeholder text",
      criterion: "Content quality, not WCAG",
      severity: "Low" as Severity,
      fix: "Replace before release; screen readers read it aloud.",
    },
  ],
  cards: [
    {
      title: "What already works",
      body: "Errors sit under each field and state the rule. Out-of-stock sizes keep the shopper with Notify Me. Every tab has a text label.",
      accent: false,
    },
    {
      title: "If I ran it again",
      body: "Name the 13% denominator, bind colours to tokens from day one, and test sign-up and checkout with TalkBack and VoiceOver users in one of the three test rounds.",
      accent: true,
    },
  ],
};

export const footer =
  "Screens are exported from the Poshmera Figma file. Product photography is no longer in the file, so product images are illustrated placeholders added for this case study. Names, phone numbers, emails and addresses are blurred. Specimens in section 07 are recreations. Research and results are as reported in my portfolio.";
