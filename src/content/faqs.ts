type Faq = { question: string; answer: string };

export const faqs = [
  {
    question: "Can you help with an existing sprinkler system?",
    answer:
      "Sprinkler repair is a core service. Describe the problem, your system if known, and your property location so John can discuss the next step.",
  },
  {
    question: "Can I ask about a brand-new installation?",
    answer:
      "Yes. Share your location, lawn layout, and project goals. The system design, scope, and timing are discussed for your property.",
  },
  {
    question: "Where is All Outdoors based?",
    answer:
      "All Outdoors Lawn Sprinklers is listed in Little Rock, Arkansas. Call or include your city and ZIP code in your enquiry to confirm service at your property.",
  },
  {
    question: "What should I have ready before I call?",
    answer:
      "Your city or ZIP code, a short description of what you need, and any known system details. Photos of a visible issue may also help when you contact John.",
  },
  {
    question: "Can I book an appointment online?",
    answer:
      "This preview lets you prepare an enquiry and open it in your email app. An appointment is confirmed directly with John; the website does not reserve a time or send your request automatically.",
  },
] as const satisfies readonly Faq[];
