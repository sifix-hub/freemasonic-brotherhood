export const information = {
  about: { eyebrow: "The Brotherhood", title: "About the Brotherhood", intro: "A lodge community built around fellowship, personal responsibility and service.", sections: [
    ["Our purpose", "Members come together to support one another, develop their character and serve their communities."],
    ["Lodge life", "Meetings, shared meals and volunteer projects give members different ways to take part. Local lodges can explain their traditions and membership requirements."],
  ], image: "brotherhood.jpg" },
  "what-we-do": { eyebrow: "Our Work", title: "What We Do", intro: "See how fellowship and charity come together in lodge life.", sections: [
    ["Charitable service", "Lodges can organise local volunteering, collections and practical support. Opportunities vary by location."],
    ["Education and fellowship", "Talks, discussions and shared meals give members space to learn and build friendships."],
  ], image: "charity-work.jpg" },
  "where-we-work": { eyebrow: "Our Network", title: "Where We Work", intro: "Lodge activity begins in local communities.", sections: [
    ["Find a local lodge", "Ask the membership team which lodge serves your area and how it welcomes prospective members."],
    ["Visiting another lodge", "Contact the lodge before arranging a visit. Visiting requirements can vary."],
  ] },
  benefits: { eyebrow: "Membership", title: "Benefits of Fellowship", intro: "Get to know people from different walks of life through shared commitments.", sections: [
    ["Build meaningful connections", "Regular meetings and shared projects offer opportunities to get to know fellow members over time."],
    ["Grow through service", "Volunteering and lodge responsibilities offer ways to contribute, practise leadership and learn from others."],
  ] },
  "get-involved": { eyebrow: "Take Part", title: "Get Involved", intro: "Ask about opportunities to support a local project or learn more about the lodge.", sections: [
    ["Volunteer locally", "Tell the lodge what kind of work interests you and how much time you can offer."],
    ["Ask about events", "Find out which community activities and open events welcome visitors."],
  ], image: "charity-work.jpg" },
  donate: { eyebrow: "Charity", title: "Support Relief Work", intro: "Learn about ways to support community and charitable projects.", sections: [
    ["Discuss a donation", "Ask the organisation about its current projects and verified giving channels. Donation checkout is unavailable on this site."],
  ] },
  members: { eyebrow: "Member Services", title: "Members Portal", intro: "A space for lodge members and applicants.", sections: [
    ["Portal availability", "Member accounts and application records will be available here after the organisation connects its membership system."],
  ] },
  "sign-in": { eyebrow: "Member Services", title: "Sign In", intro: "Access to member accounts requires the organisation’s membership system.", sections: [
    ["Sign-in availability", "This preview has no active account service. Contact the organisation for access to its existing member services."],
  ] },
  "verify-status": { eyebrow: "Member Services", title: "Verify Status", intro: "Membership verification requires access to the lodge’s official records.", sections: [
    ["Verification availability", "Online verification is unavailable on this site. Contact the lodge through its verified channels for assistance."],
  ] },
  contact: { eyebrow: "Reach the Lodge", title: "Contact Us", intro: "Ask about membership, events, volunteering or lodge visits.", sections: [
    ["Membership enquiries", "Include your city and country so the membership team can help you find the appropriate lodge."],
  ] },
  privacy: { eyebrow: "Site Information", title: "Privacy", intro: "This website collects application details to review requests to join the organisation.", sections: [
    ["Information you enter", "The website sends your application to the organisation’s Google Sheet for membership review and follow-up. Contact the organisation if you have questions about your information."],
    ["Image requests", "By default, photographs are served from the reference website. Your browser connects to that host to load them."],
  ] },
} satisfies Record<string, { eyebrow: string; title: string; intro: string; sections: string[][]; image?: string }>;

export const articles = [
  { slug: "fellowship-at-the-festive-board", title: "Fellowship at the Festive Board", category: "Fellowship", image: "lodge-dinner.jpg", summary: "How a shared meal helps members get to know one another.", body: "After a meeting, some lodges continue the evening with a shared meal. The festive board creates time for conversation and helps newer members become familiar with the people they meet at lodge." },
  { slug: "charity-in-the-community", title: "Charity in the Community", category: "Charity", image: "charity-work.jpg", summary: "Practical ways to take part in local relief work.", body: "Charitable work starts with listening to local needs. A lodge may offer volunteer time, organise a collection or support a community group. Ask your local lodge which opportunities are currently open." },
  { slug: "what-to-ask-before-joining", title: "What to Ask Before Joining", category: "Membership", image: "brotherhood.jpg", summary: "Questions to bring to your first conversation with a lodge.", body: "Ask when the lodge meets, what its members are expected to contribute and whether it hosts open events. Discuss local eligibility rules and the steps from a first enquiry to membership." },
];
