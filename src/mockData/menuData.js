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
import Help from "../components/help/";

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
  {
    href: "/help",
    label: "Help",
    showOnlyIfSuperUser: true,
    component: Help
  }
];

const socialMedias = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/bharani.palani",
    icon: "fa fa-facebook"
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/bharani-palani-4860b2b3/",
    icon: "fa fa-linkedin"
  },
  {
    name: "Twitter",
    href: "https://twitter.com/barani_sug",
    icon: "fa fa-twitter"
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/bharani.palani/",
    icon: "fa fa-instagram"
  }
];

export { menus, socialMedias };
