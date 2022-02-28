import About from "../components/wrapper/about";
import Technologies from "../components/wrapper/technologies";
import Projects from "../components/wrapper/projects";
import Skills from "../components/wrapper/skills";
import Awards from "../components/wrapper/awards";
import Contact from "../components/wrapper/contact";
import Resume from "../components/wrapper/resume";
import Write from "../components/wrapper/write";
import AccountPlanner from "../components/accountPlanner/AccountPlanner";
import Settings from "../components/wrapper/settings";

const menus = [
  {
    href: "/about",
    showOnlyIfSuperUser: false,
    label: "About",
    component: About
  },
  {
    href: "/technologies",
    showOnlyIfSuperUser: false,
    label: "Technolgies",
    component: Technologies
  },
  {
    href: "/projects",
    showOnlyIfSuperUser: false,
    label: "Projects",
    component: Projects
  },
  {
    href: "/skills",
    showOnlyIfSuperUser: false,
    label: "Skills",
    component: Skills
  },
  {
    href: "/awards",
    showOnlyIfSuperUser: false,
    label: "Awards",
    component: Awards
  },
  {
    href: "/contact",
    showOnlyIfSuperUser: false,
    label: "Contact",
    component: Contact
  },
  {
    href: "/resume",
    showOnlyIfSuperUser: false,
    label: "Resume",
    component: Resume
  },
  {
    href: "/settings",
    showOnlyIfSuperUser: true,
    label: "Settings",
    component: Settings
  },
  {
    href: "/write",
    label: "Write",
    showOnlyIfSuperUser: false,
    component: Write
  },
  {
    href: "/accountPlanner",
    label: "Money Planner",
    showOnlyIfSuperUser: true,
    component: AccountPlanner
  },
];

const socialMedias = [
  {
    name: "Facebook",
    icon: "fa fa-facebook",
    id: "social_media_facebook"
  },
  {
    name: "LinkedIn",
    icon: "fa fa-linkedin",
    id: "social_media_linkedIn"
  },
  {
    name: "Twitter",
    icon: "fa fa-twitter",
    id: "social_media_twitter"
  },
  {
    name: "Instagram",
    icon: "fa fa-instagram",
    id: "social_media_instagram"
  }
];

export { menus, socialMedias };
