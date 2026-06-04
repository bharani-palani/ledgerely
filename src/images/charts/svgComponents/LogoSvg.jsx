import React, { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

const LogoSvg = props => {
  const userContext = useContext(UserContext);
  const strokeColor =
    userContext.userData.theme === "dark"
      ? getComputedStyle(document.documentElement).getPropertyValue("--app-theme-bg-color")
      : getComputedStyle(document.documentElement).getPropertyValue("--bs-gray");

  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={30} height={30} viewBox='0 0 100 100' fill='none' {...props}>
      <rect width={100} height={100} rx={10} fill='transparent' />
      <path
        d='M13.005 54.9198L35.3738 84.0445C38.6868 88.3582 44.84 89.2328 49.2239 86.0133L87.4594 57.9333C91.996 54.6016 92.8903 48.1835 89.4372 43.7385L79.0042 30.3086C75.6806 26.0302 69.5544 25.1766 65.1878 28.3834L26.7046 56.6455C22.3116 59.8717 16.144 58.9858 12.8367 54.6534L12.1171 53.7108L9.94061 50.7471C6.71272 46.3518 7.60143 40.1808 11.9384 36.8749L40.5738 15.0476C45.0216 11.6572 51.3854 12.5737 54.6958 17.0814L59.0286 22.9811'
        stroke={strokeColor}
        strokeWidth={5}
        style={{ boxShadow: "2px 2px 2px #333" }}
      />
      <path
        d='M79.0089 34.983L70.143 41.4941C69.4753 41.9845 69.3315 42.9233 69.8219 43.591L73.3734 48.427C73.8638 49.0947 74.8026 49.2384 75.4703 48.7481L84.3362 42.2369C85.004 41.7466 85.1477 40.8078 84.6574 40.14L81.1058 35.3041C80.6155 34.6364 79.6767 34.4926 79.0089 34.983Z'
        fill='transparent'
        stroke={strokeColor}
      />
      <path d='M19.6353 41.9859L48.2481 20.9727' stroke={strokeColor} strokeWidth={5} strokeLinecap='round' />
      <path d='M24.9629 49.2398L53.5757 28.2266' stroke={strokeColor} strokeWidth={5} strokeLinecap='round' />
    </svg>
  );
};
export default LogoSvg;
