import {
  AttachMoney,
  CardGiftcard,
  Security,
  AccessTime,
} from "@mui/icons-material";

export const cardData = [
    {
      title: "Individual",
      description: "Therapy for mental health support for individuals 18+",
      cta: "Get started",
      img: "/images/c5.svg",
      link: "/individual",
    },
    {
      title: "Teens",
      description: "Therapy for adolescent girls aged 13-17",
      cta: "Get started",
      img: "/images/c2.svg",
      link: "/teens",
    },
    {
      title: "Married",
      description: "Therapy for married women to address relationship challenges",
      cta: "Get started",
      img: "/images/c3.svg",
      link: "/married",
    },
    {
      title: "Motherhood Support",
      description:
        "Therapy for mothers, covering postpartum depression and stress",
      cta: "Get started",
      img: "/images/c4.svg",
      link: "/motherhood",
    },
  ];

export const testimonials = [
    {
      name: "Melissa",
      text: "Having a Talkspace therapist is like somebody coming in and kind of shining a light down the path. It just makes it a little bit easier.",
      img: "/images/p1.jpg",
    },
    {
      name: "Evert",
      text: "Instead of just texting my friends, I text my therapist and there's no judgment on what I say.",
      img: "/images/p2.jpg",
    },
    {
      name: "April",
      text: "The therapist I'm working with gives me thoughtful feedback and is very prompt with responses.",
      img: "/images/p3.png",
    },
    {
      name: "Diana",
      text: "I like that my Talkspace therapist is always checking up on me through text.",
      img: "/images/p4.jpg",
    },
    {
      name: "Fatima",
      text: "Talkspace has given me a chance to not give up on myself. It’s helped me see things very differently.",
      img: "/images/p5.jpg",
    },
    {
      name: "Ozzie",
      text: "Talkspace has changed my life because it's given me the confidence to do difficult things.",
      img: "/images/p6.jpg",
    },
  ];

export  const reasons = [
    {
      id: 1,
      title: "Online Psychological Care",
      description:
        "We're in-network with most major plans, and you can check your coverage in minutes. You can also pay out-of-pocket.",
    },
    {
      id: 2,
      title: "Get matched with a therapist",
      description:
        "Answer a few questions online and we'll match you with a licensed provider.",
    },
    {
      id: 3,
      title: "Start therapy",
      description:
        "Communicate with your therapist through live sessions, messaging, or both.",
    },
  ];

export const benefits = [
  {
    icon: <AttachMoney sx={{ fontSize: 24, color: "primary.main" }} />,
    title: "Competitive pay",
    description:
      "Make almost 2x the hourly rate compared to other platforms - up to $67.90 per hour - for Live Sessions (via video, audio, or chat).",
  },
  {
    icon: <CardGiftcard sx={{ fontSize: 24, color: "primary.main" }} />,
    title: "Monthly bonus incentives",
    description:
      "Earn monthly bonuses up to $4,000* when you spend more time engaging with clients.",
  },
  {
    icon: <AccessTime sx={{ fontSize: 24, color: "primary.main" }} />,
    title: "Flexibility",
    description:
      "Choose your time commitment and set a schedule that works best for you and your clients.",
  },
];

export const heroSectionData = {
  Clinician: {
    heading1: "Helping therapists",
    heading2: "provide quality",
    heading3: "mental health care",
    content:
      "Experience the benefits of private practice without the challenges of maintaining one. Make your own schedule and let us handle insurance billing, marketing, and admin costs.",
    buttonText: "Apply Now",
    buttonLink: "/apply",
    imgSrc: "/images/doctor-2.svg",
    footerText: "Empowering doctors to transform mental health care, one patient at a time.",
  },
  Individual: {
    heading1: "Online therapy",
    heading2: "with a",
    heading3: "Licensed Therapist",
    content:
      "We match patients with therapists based on their needs and preferences, ensuring personalized and effective mental health care.",
    buttonText: "Get Started",
    buttonLink: "/login",
    imgSrc: "/images/individual.svg",
    footerText: "No wait lists.  Match with a therapist today",
  },
};

