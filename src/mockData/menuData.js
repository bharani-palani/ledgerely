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
import React from "react";

const menus = [
  {
    href: "/about",
    hasAccessTo: ['public','admin','superAdmin'],
    label: "About",
    component: About
  },
  {
    href: "/technologies",
    hasAccessTo: ['public','admin','superAdmin'],
    label: "Technolgies",
    component: Technologies
  },
  {
    href: "/projects",
    hasAccessTo: ['public','admin','superAdmin'],
    label: "Projects",
    component: Projects
  },
  {
    href: "/skills",
    hasAccessTo: ['public','admin','superAdmin'],
    label: "Skills",
    component: Skills
  },
  {
    href: "/awards",
    hasAccessTo: ['public','admin','superAdmin'],
    label: "Awards",
    component: Awards
  },
  {
    href: "/contact",
    hasAccessTo: ['public','admin','superAdmin'],
    label: "Contact",
    component: Contact
  },
  {
    href: "/resume",
    hasAccessTo: ['public','admin','superAdmin'],
    label: "Resume",
    component: Resume
  },
  {
    href: "/write",
    label: "Write",
    hasAccessTo: ['public','admin','superAdmin'],
    component: Write
  },
  {
    href: "/settings",
    hasAccessTo: ['superAdmin'],
    label: "Settings",
    component: Settings
  },
  {
    href: "/accountPlanner",
    label: "Money Planner",
    hasAccessTo: ['superAdmin'],
    component: AccountPlanner
  },
  {
    href: "/cms",
    label: "Layout design",
    hasAccessTo: ['admin','superAdmin'],
    component: React.createElement(<div className="my-5">CMS</div>)
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
