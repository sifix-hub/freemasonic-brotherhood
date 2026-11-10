export const site = {
  name: "Join Freemasonic Brotherhood",
  source: "https://joinfreemason.co.uk",
  description: "Discover a lodge community centred on fellowship, charitable work and service.",
  contactEmail: process.env.NEXT_PUBLIC_LODGE_EMAIL,
};

export const navigation = [
  ["Home", "/"], ["About", "/about/"], ["What We Do", "/what-we-do/"],
  ["Where We Work", "/where-we-work/"], ["Benefits", "/benefits/"], ["How to Join", "/join/"],
  ["Apply", "/apply/"], ["Verify Status", "/verify-status/"], ["Get Involved", "/get-involved/"],
  ["Donate", "/donate/"], ["Gallery", "/gallery/"], ["Members", "/members/"],
  ["Blog", "/blog/"], ["Contact", "/contact/"],
] as const;

export const imageSource = (file: string) => {
  const base = process.env.NEXT_PUBLIC_IMAGE_BASE ?? site.source + "/assets/images";
  return base.replace(/\/$/, "") + "/" + file;
};

export const pillars = [
  { icon: "heart", title: "Relief & Charity", body: "Stand beside fellow members and serve people facing hardship in the wider community." },
  { icon: "shield", title: "Standing & Character", body: "Build habits of integrity, accountability and respect through lodge life." },
  { icon: "hands", title: "Practical Relief", body: "Find a listening ear and take part in practical efforts to help others." },
  { icon: "growth", title: "Business Growth", body: "Share experience and learn from members with different professional backgrounds." },
  { icon: "star", title: "Recognition & Service", body: "Celebrate the time, care and effort members give to their communities." },
  { icon: "lock", title: "Discretion", body: "Respect personal information and the confidence members place in one another." },
] as const;

export const gallery = [
  { file: "grand-lodge-installation.jpg", title: "Grand Lodge Installation", category: "Ceremony", alt: "Lodge officers in full regalia at an installation ceremony" },
  { file: "lodge-officers.jpg", title: "Lodge Lecture", category: "Education", alt: "Lodge officers gathered in a formal meeting room" },
  { file: "lodge-dinner.jpg", title: "The Festive Board", category: "Fellowship", alt: "Members gathered at long tables for a formal dinner" },
  { file: "charity-work.jpg", title: "Community Charity Work", category: "Charity", alt: "Lodge members taking part in a community service project" },
  { file: "brotherhood.jpg", title: "Lodge Library Study", category: "Education", alt: "Lodge members gathered in a candlelit library" },
  { file: "brotherhood-assembly.jpg", title: "Annual Assembly", category: "Ceremony", alt: "Lodge members assembled in formal regalia" },
  { file: "lodge-procession.jpg", title: "Opening Procession", category: "Ceremony", alt: "Lodge members processing into the temple" },
  { file: "hospital-visit.jpg", title: "Hospital Visit", category: "Charity", alt: "Members of the lodge visiting a hospital" },
  { file: "grand-masters.jpg", title: "Grand Masters", category: "History", alt: "Group photograph of Grand Masters" },
  { file: "charter-signing.jpg", title: "Charter Signing", category: "Ceremony", alt: "Lodge officers signing a charter" },
  { file: "women-freemasons.jpg", title: "Women's Lodge", category: "Fellowship", alt: "Women Freemasons gathered for a lodge photograph" },
  { file: "hero-temple.jpg", title: "The Temple", category: "Lodge", alt: "Candlelit Masonic temple with stone columns" },
] as const;

export const steps = [
  { title: "Submit your application", body: "Fill out the membership form so the organisation can review your application." },
  { title: "Meet the lodge", body: "Speak with a lodge representative about membership, responsibilities and what to expect." },
  { title: "Membership review", body: "The lodge explains its requirements and guides eligible applicants through the process." },
  { title: "Take part", body: "New members get to know their lodge through meetings, fellowship and service." },
];

