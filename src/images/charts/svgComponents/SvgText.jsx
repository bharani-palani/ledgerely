import React, { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

export default function SvgText({
  text = "Your text here",
  width = 400,
  height = 100,
  fontSize = 28,
  // fill = "#c2d82e",
  fontWeight = 600,
  fontFamily = "Arial",
  className,
  title = "SVG text image",
  strokeColor = "#000000",
  strokeWidth = 0.75,
  ...props
}) {
  const userContext = useContext(UserContext);
  const fill =
    userContext.userData.theme === "dark"
      ? getComputedStyle(document.documentElement).getPropertyValue("--app-theme-bg-color")
      : getComputedStyle(document.documentElement).getPropertyValue("--bs-gray");

  // Keep viewBox fixed so the text scales well; you can compute viewBox dynamically if needed
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      role='img'
      aria-labelledby='svgTextTitle svgTextDesc'
      className={className}
      {...props}
    >
      <title id='svgTextTitle'>{title}</title>
      <desc id='svgTextDesc'>Rendered text: {text}</desc>

      <rect x='0' y='0' width='100%' height='100%' fill='transparent' />

      <text
        x='50%'
        y='50%'
        dominantBaseline='middle'
        textAnchor='middle'
        fontFamily={fontFamily}
        fontSize={fontSize}
        fontWeight={fontWeight}
        fill={fill}
        stroke={strokeColor}
        strokeWidth={strokeWidth ?? 0}
      >
        {text}
      </text>
    </svg>
  );
}
