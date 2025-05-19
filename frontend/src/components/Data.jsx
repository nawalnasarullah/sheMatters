import {
  AttachMoney,
  CardGiftcard,
  Security,
  AccessTime,
} from "@mui/icons-material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";

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
    link: "/marital",
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

export const whySheMattersData = {
  HomePage: {
    title: "Why",
    highlight: "SheMatters?",
    data: [
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
    ],
    imageSrc: "/images/Psychologist.gif",
  },

  Individual: {
    title: "How",
    highlight: "We Help?",
    data: [
      {
        id: 1,
        title: "Convenient Scheduling",
        description:
          "Access therapy sessions at times that fit into your busy schedule.",
      },
      {
        id: 2,
        title: "Expert Therapists",
        description:
          "We partner with leading professionals to ensure high-quality care.",
      },
      {
        id: 3,
        title: "Tailored Approach",
        description:
          "Receive personalized care designed for your unique mental health journey.",
      },
    ],
    imageSrc: "/images/help.gif",
  },

  Teen: {
    title: "How",
    highlight: "We Support You?",
    data: [
      {
        id: 1,
        title: "Flexible Scheduling",
        description:
          "Get therapy sessions that fit around your school, activities, and friends' time – no stress!",
      },
      {
        id: 2,
        title: "Teen-Friendly Therapists",
        description:
          "Our therapists are experienced in working with teens, providing support in ways that make sense to you.",
      },
      {
        id: 3,
        title: "Your Unique Journey",
        description:
          "Receive care that’s made just for you, helping you tackle mental health challenges in your own way.",
      },
    ],
    imageSrc: "/images/teen-page.gif",
  },

  Marital: {
    title: "How",
    highlight: "We Support You in Your Marriage?",
    data: [
      {
        id: 1,
        title: "Flexible Scheduling",
        description:
          "Access therapy sessions that fit around your family, work, and personal life – no added pressure.",
      },
      {
        id: 2,
        title: "Marriage-Specific Therapists",
        description:
          "Our therapists specialize in helping wives navigate the unique challenges of marriage and relationships.",
      },
      {
        id: 3,
        title: "Support Tailored to You",
        description:
          "Receive personalized care designed to address your unique relationship needs and emotional journey.",
      },
    ],
    imageSrc: "/images/Wedding.gif",
  },

  Motherhood: {
    title: "How",
    highlight: "We Support You Through Motherhood?",
    data: [
      {
        id: 1,
        title: "Flexible Scheduling",
        description:
          "Get therapy sessions that fit into your busy schedule as a mother, balancing work, family, and self-care.",
      },
      {
        id: 2,
        title: "Motherhood-Specific Therapists",
        description:
          "Our therapists understand the emotional challenges mothers face and provide support tailored to your needs.",
      },
      {
        id: 3,
        title: "Your Journey, Your Way",
        description:
          "Receive care that acknowledges your motherhood journey and supports you in finding balance and peace.",
      },
    ],
    imageSrc: "/images/Motherhood.gif",
  },
  
  
};

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
    buttonLink: "/loginPsychologist",
    imgSrc: "/images/doctor-2.svg",
    footerText:
      "Empowering doctors to transform mental health care, one patient at a time.",
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
  Teen: {
    heading1: "Online therapy",
    heading2: "for",
    heading3: "Teens",
    content:
      "A private space where you can open up about your experiences and emotions, and get non-judgmental support from a licensed therapist who specializes in teens.",
    buttonText: "Get Started",
    buttonLink: "/login",
    imgSrc: "/images/teens.svg",
    footerText: "It's okay to not be okay, as long as you are not giving up.",
  },
  Marital: {
    heading1: "Online Therapy",
  heading2: "for",
  heading3: "Wives",
  content:
    "A private space where you can share your thoughts, emotions, and struggles, and receive compassionate support from a licensed therapist specializing in marital challenges faced by wives.",
  buttonText: "Start Your Healing Journey",
  buttonLink: "/login",
  imgSrc: "/images/c3.svg",
  footerText: "Taking care of yourself is the first step to healing and growth.",
  },
  Motherhood: {
    heading1: "Online Therapy",
    heading2: "for",
    heading3: "Mothers",
    content:
      "A safe and supportive space where you can share the challenges of motherhood, find comfort, and receive guidance from a licensed therapist who understands the unique emotional needs of mothers.",
    buttonText: "Start Your Journey",
    buttonLink: "/login",
    imgSrc: "/images/motherhood.svg",
    footerText: "You are doing your best, and that’s enough.",
  },
};

export const questions = [
  {
      question: "Do you feel depressed or unmotivated?",
      label: "depression",
  },
  {
      question: "Do you feel anxious or worried often?",
      label: "anxiety",
  },
  {
      question: "Are any family-related issues causing you distress?",
      label: "family_issues",
  },
  {
      question: "Do you have thoughts about harming yourself or committing suicide?",
      label: "self_harm",
  },
  {
      question: "Are you struggling to deal with any addiction?",
      label: "addiction",
  },
  {
      question: "Do you have trouble sleeping at night or with the quality of your sleep?",
      label: "sleep_issues",
  },
  {
      question: "Have you experienced any traumatic experience?",
      label: "trauma",
  },
  {
      question: "Do you have regular menstrual cycles?",
      label: "menstrual_health",
  },
];

export const menuItemsSidebar = [
  {
    label: "Dashboard",
    icon: <HomeRoundedIcon sx={{ marginRight: "10px", marginBottom: "3px" }} />,
    to: "/dashboard",
  },
  {
    label: "Consultation",
    icon: <EventNoteRoundedIcon sx={{ marginRight: "10px", marginBottom: "3px" }} />,
    to: "/dashboard/user/consultations",
  },
  // {
  //   label: "Group Therapy",
  //   icon: <GroupRoundedIcon sx={{ marginRight: "10px", marginBottom: "3px" }} />,
  // },
  
];
