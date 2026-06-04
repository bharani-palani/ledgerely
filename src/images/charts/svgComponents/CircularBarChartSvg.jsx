import React, { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

export const CircularBarChartSvg = () => {
  const userContext = useContext(UserContext);
  const appThemeBgColor =
    userContext.userData.theme === "dark"
      ? getComputedStyle(document.documentElement).getPropertyValue("--app-theme-bg-color")
      : getComputedStyle(document.documentElement).getPropertyValue("--bs-gray");
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      version='1.1'
      width={25}
      height={25}
      viewBox='0 0 1000 1000'
      xmlSpace='preserve'
    >
      <desc>Created with Fabric.js 3.5.0</desc>
      <defs></defs>
      <rect x={0} y={0} width='100%' height='100%' fill='transparent' />
      <g transform='matrix(3.6033 0 0 3.6033 506.6769 506.6769)' id={218569}>
        <g style={{}} vectorEffect='non-scaling-stroke'>
          <g transform='matrix(1 0 0 1 25.5 -127.9553)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.014",
              }}
              transform=' translate(-153.5, -0.0447)'
              d='M 151.5 0.5 C 151.5 0.166667 151.5 -0.166667 151.5 -0.5 C 152.833 -0.5 154.167 -0.5 155.5 -0.5 C 154.432 0.434475 153.099 0.767809 151.5 0.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 32 -94)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.995",
              }}
              transform=' translate(-160, -34)'
              d='M 131.5 -0.5 C 136.167 -0.5 140.833 -0.5 145.5 -0.5 C 147.265 0.461384 149.265 0.794717 151.5 0.5 C 155.264 1.99152 159.264 2.99152 163.5 3.5 C 166.215 5.07191 169.215 6.07191 172.5 6.5 C 174.649 7.73623 176.982 8.73623 179.5 9.5 C 180.78 10.9313 182.447 11.5979 184.5 11.5 C 184.842 12.3382 185.508 12.6716 186.5 12.5 C 187.551 13.2223 188.218 14.2223 188.5 15.5 C 187.662 15.8417 187.328 16.5084 187.5 17.5 C 186.833 17.5 186.5 17.8333 186.5 18.5 C 185.662 18.8417 185.328 19.5084 185.5 20.5 C 184.662 20.8417 184.328 21.5084 184.5 22.5 C 183.662 22.8417 183.328 23.5084 183.5 24.5 C 182.833 24.5 182.5 24.8333 182.5 25.5 C 181.662 25.8417 181.328 26.5084 181.5 27.5 C 180.662 27.8417 180.328 28.5084 180.5 29.5 C 179.662 29.8417 179.328 30.5084 179.5 31.5 C 178.833 31.5 178.5 31.8333 178.5 32.5 C 177.662 32.8417 177.328 33.5084 177.5 34.5 C 176.662 34.8417 176.328 35.5084 176.5 36.5 C 175.094 36.9731 174.427 37.9731 174.5 39.5 C 173.662 39.8417 173.328 40.5084 173.5 41.5 C 172.662 41.8417 172.328 42.5084 172.5 43.5 C 171.833 43.5 171.5 43.8333 171.5 44.5 C 170.662 44.8417 170.328 45.5084 170.5 46.5 C 169.662 46.8417 169.328 47.5084 169.5 48.5 C 168.662 48.8417 168.328 49.5084 168.5 50.5 C 167.833 50.5 167.5 50.8333 167.5 51.5 C 166.662 51.8417 166.328 52.5084 166.5 53.5 C 165.662 53.8417 165.328 54.5084 165.5 55.5 C 164.094 55.9731 163.427 56.9731 163.5 58.5 C 162.662 58.8417 162.328 59.5084 162.5 60.5 C 161.662 60.8417 161.328 61.5084 161.5 62.5 C 160.094 62.9731 159.427 63.9731 159.5 65.5 C 158.662 65.8417 158.328 66.5084 158.5 67.5 C 157.833 67.5 157.5 67.8333 157.5 68.5 C 155.883 67.962 154.216 67.6287 152.5 67.5 C 149.916 65.5275 146.916 64.5275 143.5 64.5 C 142.081 63.5489 140.415 63.2155 138.5 63.5 C 136.393 62.5318 134.059 62.1984 131.5 62.5 C 131.5 41.5 131.5 20.5 131.5 -0.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 30 -126.9501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-158, -1.05)'
              d='M 156.5 1.5 C 157.251 0.426544 158.251 0.259877 159.5 1 C 158.552 1.48278 157.552 1.64945 156.5 1.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 2 -97.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-130, -30.5)'
              d='M 129.5 -0.5 C 129.833 -0.5 130.167 -0.5 130.5 -0.5 C 130.167 82.1667 129.833 82.1667 129.5 -0.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 37 -124.9501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.016",
              }}
              transform=' translate(-165, -3.05)'
              d='M 163.5 3.5 C 164.251 2.42654 165.251 2.25988 166.5 3 C 165.552 3.48278 164.552 3.64945 163.5 3.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 40.5 -123.9374)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-168.5, -4.0626)'
              d='M 167.5 4.5 C 167.897 3.47498 168.563 3.30831 169.5 4 C 168.906 4.46434 168.239 4.63101 167.5 4.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 43.5 -122.9374)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-171.5, -5.0626)'
              d='M 172.5 5.5 C 171.761 5.63101 171.094 5.46434 170.5 5 C 171.437 4.30831 172.103 4.47498 172.5 5.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 45.5001 -122)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.01",
              }}
              transform=' translate(-173.5001, -6)'
              d='M 172.5 6.5 C 172.5 6.16667 172.5 5.83333 172.5 5.5 C 175.167 5.83333 175.167 6.16667 172.5 6.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 52.5 -118.9374)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-180.5, -9.0626)'
              d='M 179.5 9.5 C 179.897 8.47498 180.563 8.30831 181.5 9 C 180.906 9.46434 180.239 9.63101 179.5 9.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 54.9999 -118.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,113,130)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-182.9999, -9.75)'
              d='M 182.5 9.5 C 183.833 10.1667 183.833 10.1667 182.5 9.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 56.9999 -117.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-184.9999, -10.75)'
              d='M 184.5 10.5 C 185.833 11.1667 185.833 11.1667 184.5 10.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 58.9999 -116.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,114,131)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-186.9999, -11.75)'
              d='M 186.5 11.5 C 187.833 12.1667 187.833 12.1667 186.5 11.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 61.9999 -113.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-189.9999, -14.75)'
              d='M 189.5 14.5 C 190.833 15.1667 190.833 15.1667 189.5 14.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 61.0219 -111.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-189.0219, -16.5)'
              d='M 188.5 15.5 C 188.833 15.5 189.167 15.5 189.5 15.5 C 189.672 16.4916 189.338 17.1583 188.5 17.5 C 188.5 16.8333 188.5 16.1667 188.5 15.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 60 -110.2487)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-188, -17.7513)'
              d='M 187.5 17.5 C 187.833 17.5 188.167 17.5 188.5 17.5 C 188.315 18.1701 187.981 18.1701 187.5 17.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 59.0219 -108.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.006",
              }}
              transform=' translate(-187.0219, -19.5)'
              d='M 186.5 18.5 C 186.833 18.5 187.167 18.5 187.5 18.5 C 187.672 19.4916 187.338 20.1583 186.5 20.5 C 186.5 19.8333 186.5 19.1667 186.5 18.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 58.0219 -106.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-186.0219, -21.5)'
              d='M 185.5 20.5 C 185.833 20.5 186.167 20.5 186.5 20.5 C 186.672 21.4916 186.338 22.1583 185.5 22.5 C 185.5 21.8333 185.5 21.1667 185.5 20.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -7.5 -104.9643)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,114,131)",
                fillRule: "evenodd",
                opacity: "0.01",
              }}
              transform=' translate(-120.5, -23.0357)'
              d='M 117.5 23.5 C 119.288 22.3775 121.288 22.2109 123.5 23 C 121.527 23.4955 119.527 23.6621 117.5 23.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 57 -105.2487)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,114,130)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-185, -22.7513)'
              d='M 184.5 22.5 C 184.833 22.5 185.167 22.5 185.5 22.5 C 185.315 23.1701 184.981 23.1701 184.5 22.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -16 -103.9614)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-112, -24.0386)'
              d='M 109.5 24.5 C 110.946 23.3871 112.613 23.2204 114.5 24 C 112.866 24.4935 111.199 24.6602 109.5 24.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -64.75 -103)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,113,131)",
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-63.25, -25)'
              d='M 63.5 25.5 C 62.8333 24.1667 62.8333 24.1667 63.5 25.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -21.5 -102.9571)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.009",
              }}
              transform=' translate(-106.5, -25.0429)'
              d='M 108.5 25.5 C 107.127 25.6567 105.793 25.49 104.5 25 C 106.066 24.235 107.399 24.4017 108.5 25.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 55.9999 -103.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-183.9999, -24.75)'
              d='M 183.5 24.5 C 184.833 25.1667 184.833 25.1667 183.5 24.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -67 -102.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-61, -25.75)'
              d='M 60.5 25.5 C 61.8333 26.1667 61.8333 26.1667 60.5 25.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -26 -101.9501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-102, -26.05)'
              d='M 100.5 26.5 C 101.251 25.4265 102.251 25.2599 103.5 26 C 102.552 26.4828 101.552 26.6495 100.5 26.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -67.7513 -101)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,114,131)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-60.2487, -27)'
              d='M 60.5 26.5 C 60.5 26.8333 60.5 27.1667 60.5 27.5 C 59.8299 27.0187 59.8299 26.6853 60.5 26.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -61 -100.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-67, -27.5)'
              d='M 67.5 28.5 C 67.1667 28.5 66.8333 28.5 66.5 28.5 C 66.8333 25.8333 67.1667 25.8333 67.5 28.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -29.5 -100.9374)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-98.5, -27.0626)'
              d='M 97.5 27.5 C 97.8966 26.475 98.5632 26.3083 99.5 27 C 98.9056 27.4643 98.2389 27.631 97.5 27.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 55.0219 -101.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-183.0219, -26.5)'
              d='M 182.5 25.5 C 182.833 25.5 183.167 25.5 183.5 25.5 C 183.672 26.4916 183.338 27.1583 182.5 27.5 C 182.5 26.8333 182.5 26.1667 182.5 25.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -70 -100.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-58, -27.75)'
              d='M 57.5 27.5 C 58.8333 28.1667 58.8333 28.1667 57.5 27.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -32.5 -99.9374)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-95.5, -28.0626)'
              d='M 96.5 28.5 C 95.7611 28.631 95.0944 28.4643 94.5 28 C 95.4368 27.3083 96.1034 27.475 96.5 28.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -26.5 -81.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.993",
              }}
              transform=' translate(-101.5, -46.5)'
              d='M 111.5 64.5 C 108.084 64.5275 105.084 65.5275 102.5 67.5 C 100.784 67.6287 99.1172 67.962 97.5 68.5 C 97.0679 67.2905 96.4013 66.2905 95.5 65.5 C 95.6716 64.5084 95.3382 63.8417 94.5 63.5 C 94.0679 62.2905 93.4013 61.2905 92.5 60.5 C 92.6716 59.5084 92.3382 58.8417 91.5 58.5 C 91.6716 57.5084 91.3382 56.8417 90.5 56.5 C 90.0679 55.2905 89.4013 54.2905 88.5 53.5 C 88.2503 51.326 87.2503 49.6594 85.5 48.5 C 85.3404 46.847 84.6737 45.5137 83.5 44.5 C 83.573 42.9731 82.9063 41.9731 81.5 41.5 C 81.6716 40.5084 81.3382 39.8417 80.5 39.5 C 80.6716 38.5084 80.3382 37.8417 79.5 37.5 C 79.7822 36.2223 80.4489 35.2223 81.5 34.5 C 82.4916 34.6716 83.1583 34.3382 83.5 33.5 C 85.5529 33.5979 87.2196 32.9313 88.5 31.5 C 90.5529 31.5979 92.2196 30.9313 93.5 29.5 C 94.791 29.7373 95.791 29.404 96.5 28.5 C 100.761 28.1016 104.761 27.1016 108.5 25.5 C 113.493 25.0843 118.493 24.7509 123.5 24.5 C 123.5 37.1667 123.5 49.8333 123.5 62.5 C 119.21 62.1977 115.21 62.8643 111.5 64.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 54.0219 -99.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-182.0219, -28.5)'
              d='M 181.5 27.5 C 181.833 27.5 182.167 27.5 182.5 27.5 C 182.672 28.4916 182.338 29.1583 181.5 29.5 C 181.5 28.8333 181.5 28.1667 181.5 27.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -60 -99.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,114,130)",
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-68, -28.75)'
              d='M 67.5 28.5 C 68.8333 29.1667 68.8333 29.1667 67.5 28.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -35.5 -98.9374)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-92.5, -29.0626)'
              d='M 93.5 29.5 C 92.7611 29.631 92.0944 29.4643 91.5 29 C 92.4368 28.3083 93.1034 28.475 93.5 29.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -38.5 -97.9374)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-89.5, -30.0626)'
              d='M 88.5 30.5 C 88.8966 29.475 89.5632 29.3083 90.5 30 C 89.9056 30.4643 89.2389 30.631 88.5 30.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 53 -98.2487)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-181, -29.7513)'
              d='M 180.5 29.5 C 180.833 29.5 181.167 29.5 181.5 29.5 C 181.315 30.1701 180.981 30.1701 180.5 29.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -69.5 -69.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.995",
              }}
              transform=' translate(-58.5, -58.5)'
              d='M 63.5 25.5 C 64.7281 26.3065 65.7281 27.3065 66.5 28.5 C 67.5839 31.0041 68.9172 33.3374 70.5 35.5 C 71.6693 38.5113 73.336 41.178 75.5 43.5 C 76.0787 46.3311 77.412 48.6644 79.5 50.5 C 79.6596 52.153 80.3263 53.4863 81.5 54.5 C 82.5839 57.0041 83.9172 59.3374 85.5 61.5 C 86.6693 64.5113 88.336 67.178 90.5 69.5 C 90.3284 70.4916 90.6618 71.1583 91.5 71.5 C 91.2178 72.7777 90.5511 73.7777 89.5 74.5 C 88.8333 74.5 88.5 74.8333 88.5 75.5 C 87.5084 75.3284 86.8417 75.6618 86.5 76.5 C 85.8333 76.5 85.5 76.8333 85.5 77.5 C 84.8333 77.5 84.5 77.8333 84.5 78.5 C 83.8333 78.5 83.5 78.8333 83.5 79.5 C 82.8333 79.5 82.5 79.8333 82.5 80.5 C 81.8333 80.5 81.5 80.8333 81.5 81.5 C 80.8333 81.5 80.5 81.8333 80.5 82.5 C 79.8333 82.5 79.5 82.8333 79.5 83.5 C 78.8333 83.5 78.5 83.8333 78.5 84.5 C 77.8333 84.5 77.5 84.8333 77.5 85.5 C 76.8333 85.5 76.5 85.8333 76.5 86.5 C 75.6618 86.8417 75.3284 87.5084 75.5 88.5 C 74.8333 88.5 74.5 88.8333 74.5 89.5 C 73.7777 90.5511 72.7777 91.2178 71.5 91.5 C 71.1583 90.6618 70.4916 90.3284 69.5 90.5 C 67.178 88.336 64.5113 86.6693 61.5 85.5 C 59.3374 83.9172 57.0041 82.5839 54.5 81.5 C 51.322 78.7417 47.6553 76.7417 43.5 75.5 C 41.178 73.336 38.5113 71.6693 35.5 70.5 C 33.3374 68.9172 31.0041 67.5839 28.5 66.5 C 27.3065 65.7281 26.3065 64.7281 25.5 63.5 C 26.9063 63.0269 27.573 62.0269 27.5 60.5 C 36.8333 47.8333 47.8333 36.8333 60.5 27.5 C 62.0269 27.573 63.0269 26.9063 63.5 25.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -40.5 -97)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-87.5, -31)'
              d='M 88.5 30.5 C 88.5 30.8333 88.5 31.1667 88.5 31.5 C 85.8333 31.1667 85.8333 30.8333 88.5 30.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -43 -96.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-85, -31.75)'
              d='M 84.5 31.5 C 85.8333 32.1667 85.8333 32.1667 84.5 31.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 51.9999 -96.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-179.9999, -31.75)'
              d='M 179.5 31.5 C 180.833 32.1667 180.833 32.1667 179.5 31.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -44.75 -95)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-83.25, -33)'
              d='M 83.5 33.5 C 82.8333 32.1667 82.8333 32.1667 83.5 33.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 51.0219 -94.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-179.0219, -33.5)'
              d='M 178.5 32.5 C 178.833 32.5 179.167 32.5 179.5 32.5 C 179.672 33.4916 179.338 34.1583 178.5 34.5 C 178.5 33.8333 178.5 33.1667 178.5 32.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -46.75 -94)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-81.25, -34)'
              d='M 81.5 34.5 C 80.8333 33.1667 80.8333 33.1667 81.5 34.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -57 -93.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-71, -34.5)'
              d='M 71.5 35.5 C 71.1667 35.5 70.8333 35.5 70.5 35.5 C 70.8333 32.8333 71.1667 32.8333 71.5 35.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 50.0219 -92.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-178.0219, -35.5)'
              d='M 177.5 34.5 C 177.833 34.5 178.167 34.5 178.5 34.5 C 178.672 35.4916 178.338 36.1583 177.5 36.5 C 177.5 35.8333 177.5 35.1667 177.5 34.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -56 -92.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-72, -35.75)'
              d='M 71.5 35.5 C 72.8333 36.1667 72.8333 36.1667 71.5 35.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -49.75 -91)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-78.25, -37)'
              d='M 78.5 37.5 C 77.8333 36.1667 77.8333 36.1667 78.5 37.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 49 -91.2487)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-177, -36.7513)'
              d='M 176.5 36.5 C 176.833 36.5 177.167 36.5 177.5 36.5 C 177.315 37.1701 176.981 37.1701 176.5 36.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -49.0218 -89.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-78.9781, -38.5)'
              d='M 78.5 37.5 C 78.8333 37.5 79.1667 37.5 79.5 37.5 C 79.5 38.1667 79.5 38.8333 79.5 39.5 C 78.6618 39.1583 78.3284 38.4916 78.5 37.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 47.9999 -89.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,114,130)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-175.9999, -38.75)'
              d='M 175.5 38.5 C 176.833 39.1667 176.833 39.1667 175.5 38.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -48.0218 -87.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-79.9781, -40.5)'
              d='M 79.5 39.5 C 79.8333 39.5 80.1667 39.5 80.5 39.5 C 80.5 40.1667 80.5 40.8333 80.5 41.5 C 79.6618 41.1583 79.3284 40.4916 79.5 39.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 47.0219 -87.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-175.0219, -40.5)'
              d='M 174.5 39.5 C 174.833 39.5 175.167 39.5 175.5 39.5 C 175.672 40.4916 175.338 41.1583 174.5 41.5 C 174.5 40.8333 174.5 40.1667 174.5 39.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -47 -86.2487)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-81, -41.7513)'
              d='M 80.5 41.5 C 80.8333 41.5 81.1667 41.5 81.5 41.5 C 81.3147 42.1701 80.9813 42.1701 80.5 41.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 46.0219 -85.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-174.0219, -42.5)'
              d='M 173.5 41.5 C 173.833 41.5 174.167 41.5 174.5 41.5 C 174.672 42.4916 174.338 43.1583 173.5 43.5 C 173.5 42.8333 173.5 42.1667 173.5 41.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -52 -85.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-76, -42.75)'
              d='M 75.5 42.5 C 76.8333 43.1667 76.8333 43.1667 75.5 42.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -45.75 -84)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-82.25, -44)'
              d='M 82.5 44.5 C 81.8333 43.1667 81.8333 43.1667 82.5 44.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 45 -84.2487)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-173, -43.7513)'
              d='M 172.5 43.5 C 172.833 43.5 173.167 43.5 173.5 43.5 C 173.315 44.1701 172.981 44.1701 172.5 43.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -45 -82.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-83, -45.5)'
              d='M 82.5 44.5 C 82.8333 44.5 83.1667 44.5 83.5 44.5 C 83.1667 47.1667 82.8333 47.1667 82.5 44.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 44.0219 -82.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-172.0219, -45.5)'
              d='M 171.5 44.5 C 171.833 44.5 172.167 44.5 172.5 44.5 C 172.672 45.4916 172.338 46.1583 171.5 46.5 C 171.5 45.8333 171.5 45.1667 171.5 44.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 50.5 -80.9374)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-178.5, -47.0626)'
              d='M 177.5 47.5 C 177.897 46.475 178.563 46.3083 179.5 47 C 178.906 47.4643 178.239 47.631 177.5 47.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 43.0219 -80.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-171.0219, -47.5)'
              d='M 170.5 46.5 C 170.833 46.5 171.167 46.5 171.5 46.5 C 171.672 47.4916 171.338 48.1583 170.5 48.5 C 170.5 47.8333 170.5 47.1667 170.5 46.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -42.75 -79.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-85.25, -48.75)'
              d='M 85.5 48.5 C 84.8333 49.1667 84.8333 49.1667 85.5 48.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 42 -79.2487)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,114,131)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-170, -48.7513)'
              d='M 169.5 48.5 C 169.833 48.5 170.167 48.5 170.5 48.5 C 170.315 49.1701 169.981 49.1701 169.5 48.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -48 -78.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,113,130)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-80, -49.75)'
              d='M 79.5 49.5 C 80.8333 50.1667 80.8333 50.1667 79.5 49.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 47.2499 -78)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-175.2499, -50)'
              d='M 175.5 50.5 C 174.833 49.1667 174.833 49.1667 175.5 50.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -42 -77.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-86, -50.75)'
              d='M 85.5 50.5 C 86.8333 51.1667 86.8333 51.1667 85.5 50.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 40.9999 -77.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-168.9999, -50.75)'
              d='M 168.5 50.5 C 169.833 51.1667 169.833 51.1667 168.5 50.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 40.0219 -75.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,112,131)",
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-168.0219, -52.5)'
              d='M 167.5 51.5 C 167.833 51.5 168.167 51.5 168.5 51.5 C 168.672 52.4916 168.338 53.1583 167.5 53.5 C 167.5 52.8333 167.5 52.1667 167.5 51.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -46 -74.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-82, -53.5)'
              d='M 82.5 54.5 C 82.1667 54.5 81.8333 54.5 81.5 54.5 C 81.8333 51.8333 82.1667 51.8333 82.5 54.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -39.75 -74.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-88.25, -53.75)'
              d='M 88.5 53.5 C 87.8333 54.1667 87.8333 54.1667 88.5 53.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 57 -58)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.996",
              }}
              transform=' translate(-185, -70)'
              d='M 187.5 54.5 C 190.808 57.4715 194.141 60.4715 197.5 63.5 C 198.419 66.0892 200.086 68.0892 202.5 69.5 C 203.449 71.7772 204.782 73.7772 206.5 75.5 C 206.473 77.1993 205.806 78.5326 204.5 79.5 C 203.508 79.3284 202.842 79.6618 202.5 80.5 C 201.508 80.3284 200.842 80.6618 200.5 81.5 C 198.973 81.427 197.973 82.0937 197.5 83.5 C 196.508 83.3284 195.842 83.6618 195.5 84.5 C 194.508 84.3284 193.842 84.6618 193.5 85.5 C 192.833 85.5 192.5 85.8333 192.5 86.5 C 191.508 86.3284 190.842 86.6618 190.5 87.5 C 189.508 87.3284 188.842 87.6618 188.5 88.5 C 187.508 88.3284 186.842 88.6618 186.5 89.5 C 185.833 89.5 185.5 89.8333 185.5 90.5 C 184.508 90.3284 183.842 90.6618 183.5 91.5 C 182.222 91.2178 181.222 90.5511 180.5 89.5 C 180.068 88.2905 179.401 87.2905 178.5 86.5 C 173.758 81.0915 168.758 76.0915 163.5 71.5 C 168.255 64.9965 172.255 57.9965 175.5 50.5 C 176.482 49.8592 177.482 49.1925 178.5 48.5 C 181.518 50.5258 184.518 52.5258 187.5 54.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 59.9999 -74.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,113,131)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-187.9999, -53.75)'
              d='M 187.5 53.5 C 188.833 54.1667 188.833 54.1667 187.5 53.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -45 -73.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-83, -54.75)'
              d='M 82.5 54.5 C 83.8333 55.1667 83.8333 55.1667 82.5 54.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 39.0219 -73.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-167.0219, -54.5)'
              d='M 166.5 53.5 C 166.833 53.5 167.167 53.5 167.5 53.5 C 167.672 54.4916 167.338 55.1583 166.5 55.5 C 166.5 54.8333 166.5 54.1667 166.5 53.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 62.2499 -73)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-190.2499, -55)'
              d='M 190.5 55.5 C 189.833 54.1667 189.833 54.1667 190.5 55.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 38 -72.2487)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,113,130)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-166, -55.7513)'
              d='M 165.5 55.5 C 165.833 55.5 166.167 55.5 166.5 55.5 C 166.315 56.1701 165.981 56.1701 165.5 55.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 62.9999 -72.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-190.9999, -55.75)'
              d='M 190.5 55.5 C 191.833 56.1667 191.833 56.1667 190.5 55.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -100 -70.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-28, -57.75)'
              d='M 27.5 57.5 C 28.8333 58.1667 28.8333 58.1667 27.5 57.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -38 -70.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-90, -57.5)'
              d='M 90.5 56.5 C 90.5 57.1667 90.5 57.8333 90.5 58.5 C 89.1667 57.8333 89.1667 57.1667 90.5 56.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 36.9999 -70.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-164.9999, -57.75)'
              d='M 164.5 57.5 C 165.833 58.1667 165.833 58.1667 164.5 57.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -100.75 -68)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,113,130)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-27.25, -60)'
              d='M 27.5 60.5 C 26.8333 59.1667 26.8333 59.1667 27.5 60.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -37.0218 -68.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-90.9781, -59.5)'
              d='M 90.5 58.5 C 90.8333 58.5 91.1667 58.5 91.5 58.5 C 91.5 59.1667 91.5 59.8333 91.5 60.5 C 90.6618 60.1583 90.3284 59.4916 90.5 58.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 36.0219 -68.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-164.0219, -59.5)'
              d='M 163.5 58.5 C 163.833 58.5 164.167 58.5 164.5 58.5 C 164.672 59.4916 164.338 60.1583 163.5 60.5 C 163.5 59.8333 163.5 59.1667 163.5 58.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -101.75 -67.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-26.25, -60.75)'
              d='M 26.5 60.5 C 25.8333 61.1667 25.8333 61.1667 26.5 60.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -42 -67.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-86, -60.5)'
              d='M 86.5 61.5 C 86.1667 61.5 85.8333 61.5 85.5 61.5 C 85.8333 58.8333 86.1667 58.8333 86.5 61.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -36 -67.2487)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,114,131)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-92, -60.7513)'
              d='M 91.5 60.5 C 91.8333 60.5 92.1667 60.5 92.5 60.5 C 92.3147 61.1701 91.9813 61.1701 91.5 60.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -41 -66.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-87, -61.75)'
              d='M 86.5 61.5 C 87.8333 62.1667 87.8333 62.1667 86.5 61.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 35.0219 -66.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-163.0219, -61.5)'
              d='M 162.5 60.5 C 162.833 60.5 163.167 60.5 163.5 60.5 C 163.672 61.4916 163.338 62.1583 162.5 62.5 C 162.5 61.8333 162.5 61.1667 162.5 60.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -102.75 -65)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,113,131)",
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-25.25, -63)'
              d='M 25.5 63.5 C 24.8333 62.1667 24.8333 62.1667 25.5 63.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 34 -65.2487)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-162, -62.7513)'
              d='M 161.5 62.5 C 161.833 62.5 162.167 62.5 162.5 62.5 C 162.315 63.1701 161.981 63.1701 161.5 62.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 70.2499 -65)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,114,130)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-198.2499, -63)'
              d='M 198.5 63.5 C 197.833 62.1667 197.833 62.1667 198.5 63.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -8.5 -63.9643)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.007",
              }}
              transform=' translate(-119.5, -64.0357)'
              d='M 116.5 64.5 C 118.288 63.3775 120.288 63.2109 122.5 64 C 120.527 64.4955 118.527 64.6621 116.5 64.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 7.5 -64.0357)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.01",
              }}
              transform=' translate(-135.5, -63.9643)'
              d='M 138.5 63.5 C 136.712 64.6225 134.712 64.7891 132.5 64 C 134.473 63.5045 136.473 63.3379 138.5 63.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 71 -64)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-199, -64)'
              d='M 198.5 63.5 C 199.167 63.5 199.5 63.8333 199.5 64.5 C 199.167 64.1667 198.833 63.8333 198.5 63.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -112.75 -63)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,114,130)",
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-15.25, -65)'
              d='M 15.5 65.5 C 14.8333 64.1667 14.8333 64.1667 15.5 65.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -34 -63.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-94, -64.5)'
              d='M 94.5 63.5 C 94.5 64.1667 94.5 64.8333 94.5 65.5 C 93.1667 64.8333 93.1667 64.1667 94.5 63.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -14.5 -63.0429)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.009",
              }}
              transform=' translate(-113.5, -64.9571)'
              d='M 111.5 64.5 C 112.873 64.3433 114.207 64.51 115.5 65 C 113.934 65.765 112.601 65.5983 111.5 64.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 13.5 -63.0429)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.009",
              }}
              transform=' translate(-141.5, -64.9571)'
              d='M 143.5 64.5 C 142.399 65.5983 141.066 65.765 139.5 65 C 140.793 64.51 142.127 64.3433 143.5 64.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 32.9999 -63.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-160.9999, -64.75)'
              d='M 160.5 64.5 C 161.833 65.1667 161.833 65.1667 160.5 64.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 71.9999 -63.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-199.9999, -64.75)'
              d='M 199.5 64.5 C 200.833 65.1667 200.833 65.1667 199.5 64.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 111.9999 -63.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-239.9999, -64.75)'
              d='M 239.5 64.5 C 240.833 65.1667 240.833 65.1667 239.5 64.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -112 -62.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,114,131)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-16, -65.75)'
              d='M 15.5 65.5 C 16.8333 66.1667 16.8333 66.1667 15.5 65.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -18.5 -61.9374)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-109.5, -66.0626)'
              d='M 108.5 66.5 C 108.897 65.475 109.563 65.3083 110.5 66 C 109.906 66.4643 109.239 66.631 108.5 66.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 17.5 -61.9374)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(92,113,132)",
                fillRule: "evenodd",
                opacity: "0.01",
              }}
              transform=' translate(-145.5, -66.0626)'
              d='M 144.5 66.5 C 144.897 65.475 145.563 65.3083 146.5 66 C 145.906 66.4643 145.239 66.631 144.5 66.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 111.2488 -62)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,114,131)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-239.2488, -66)'
              d='M 239.5 65.5 C 239.5 65.8333 239.5 66.1667 239.5 66.5 C 238.83 66.0187 238.83 65.6853 239.5 65.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -100.5 -61)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,114,131)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-27.5, -67)'
              d='M 28.5 66.5 C 28.5 66.8333 28.5 67.1667 28.5 67.5 C 25.8333 67.1667 25.8333 66.8333 28.5 66.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -33 -61.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-95, -66.5)'
              d='M 94.5 65.5 C 94.8333 65.5 95.1667 65.5 95.5 65.5 C 95.1667 68.1667 94.8333 68.1667 94.5 65.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -21.5 -60.9374)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-106.5, -67.0626)'
              d='M 105.5 67.5 C 105.897 66.475 106.563 66.3083 107.5 67 C 106.906 67.4643 106.239 67.631 105.5 67.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 20.5 -60.9374)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-148.5, -67.0626)'
              d='M 147.5 67.5 C 147.897 66.475 148.563 66.3083 149.5 67 C 148.906 67.4643 148.239 67.631 147.5 67.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 32.0219 -61.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-160.0219, -66.5)'
              d='M 159.5 65.5 C 159.833 65.5 160.167 65.5 160.5 65.5 C 160.672 66.4916 160.338 67.1583 159.5 67.5 C 159.5 66.8333 159.5 66.1667 159.5 65.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 108.9999 -61.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-236.9999, -66.75)'
              d='M 236.5 66.5 C 237.833 67.1667 237.833 67.1667 236.5 66.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -115.75 -60)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-12.25, -68)'
              d='M 12.5 68.5 C 11.8333 67.1667 11.8333 67.1667 12.5 68.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -99 -60.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-29, -67.75)'
              d='M 28.5 67.5 C 29.8333 68.1667 29.8333 68.1667 28.5 67.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -24.4999 -60)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-103.5001, -68)'
              d='M 102.5 68.5 C 102.5 68.1667 102.5 67.8333 102.5 67.5 C 105.167 67.8333 105.167 68.1667 102.5 68.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 23.4999 -60)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-151.4999, -68)'
              d='M 152.5 67.5 C 152.5 67.8333 152.5 68.1667 152.5 68.5 C 149.833 68.1667 149.833 67.8333 152.5 67.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 31 -60.2487)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,114,130)",
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-159, -67.7513)'
              d='M 158.5 67.5 C 158.833 67.5 159.167 67.5 159.5 67.5 C 159.315 68.1701 158.981 68.1701 158.5 67.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -37 -59.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,114,130)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-91, -68.75)'
              d='M 90.5 68.5 C 91.8333 69.1667 91.8333 69.1667 90.5 68.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -30.7513 -59)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,114,131)",
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-97.2487, -69)'
              d='M 97.5 68.5 C 97.5 68.8333 97.5 69.1667 97.5 69.5 C 96.8299 69.0187 96.8299 68.6853 97.5 68.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -26.5 -59.0626)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-101.5, -68.9374)'
              d='M 102.5 68.5 C 102.103 69.525 101.437 69.6917 100.5 69 C 101.094 68.5357 101.761 68.369 102.5 68.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 25.5 -59.0626)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-153.5, -68.9374)'
              d='M 152.5 68.5 C 153.239 68.369 153.906 68.5357 154.5 69 C 153.563 69.6917 152.897 69.525 152.5 68.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 30 -59.2487)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,114,130)",
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-158, -68.7513)'
              d='M 157.5 68.5 C 157.833 68.5 158.167 68.5 158.5 68.5 C 158.315 69.1701 157.981 69.1701 157.5 68.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 35.9999 -59.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,114,131)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-163.9999, -68.75)'
              d='M 163.5 68.5 C 164.833 69.1667 164.833 69.1667 163.5 68.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 75.2499 -59)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,114,130)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-203.2499, -69)'
              d='M 203.5 69.5 C 202.833 68.1667 202.833 68.1667 203.5 69.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -116.75 -58)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,114,131)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-11.25, -70)'
              d='M 11.5 70.5 C 10.8333 69.1667 10.8333 69.1667 11.5 70.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -105 -58.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-23, -69.75)'
              d='M 22.5 69.5 C 23.8333 70.1667 23.8333 70.1667 22.5 69.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -29.5 -58.0626)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-98.5, -69.9374)'
              d='M 97.5 69.5 C 98.2389 69.369 98.9056 69.5357 99.5 70 C 98.5632 70.6917 97.8966 70.525 97.5 69.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 28.5 -58.0626)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.01",
              }}
              transform=' translate(-156.5, -69.9374)'
              d='M 157.5 69.5 C 157.103 70.525 156.437 70.6917 155.5 70 C 156.094 69.5357 156.761 69.369 157.5 69.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 75.9999 -58.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-203.9999, -69.75)'
              d='M 203.5 69.5 C 204.833 70.1667 204.833 70.1667 203.5 69.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -103 -57.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-25, -70.75)'
              d='M 24.5 70.5 C 25.8333 71.1667 25.8333 71.1667 24.5 70.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -93.5 -57)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-34.5, -71)'
              d='M 35.5 70.5 C 35.5 70.8333 35.5 71.1667 35.5 71.5 C 32.8333 71.1667 32.8333 70.8333 35.5 70.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -35.75 -57)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-92.25, -71)'
              d='M 92.5 71.5 C 91.8333 70.1667 91.8333 70.1667 92.5 71.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 35.2499 -57)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,113,130)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-163.2499, -71)'
              d='M 163.5 71.5 C 162.833 70.1667 162.833 70.1667 163.5 71.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 101.9999 -57.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,114,130)",
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-229.9999, -70.75)'
              d='M 229.5 70.5 C 230.833 71.1667 230.833 71.1667 229.5 70.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -117.75 -56)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-10.25, -72)'
              d='M 10.5 72.5 C 9.83333 71.1667 9.83333 71.1667 10.5 72.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -92 -56.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,114,130)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-36, -71.75)'
              d='M 35.5 71.5 C 36.8333 72.1667 36.8333 72.1667 35.5 71.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -35 -56.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,114,131)",
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-93, -71.75)'
              d='M 92.5 71.5 C 93.8333 72.1667 93.8333 72.1667 92.5 71.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 34.2499 -56.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,114,130)",
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-162.2499, -71.75)'
              d='M 162.5 71.5 C 161.833 72.1667 161.833 72.1667 162.5 71.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 93 -33)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.996",
              }}
              transform=' translate(-221, -95)'
              d='M 239.5 66.5 C 241.966 68.7403 243.966 71.407 245.5 74.5 C 245.402 76.5529 246.069 78.2196 247.5 79.5 C 247.402 81.5529 248.069 83.2196 249.5 84.5 C 249.263 85.791 249.596 86.791 250.5 87.5 C 250.41 90.1522 251.076 92.4855 252.5 94.5 C 252.232 96.099 252.566 97.4324 253.5 98.5 C 253.646 102.387 254.313 106.054 255.5 109.5 C 255.5 114.167 255.5 118.833 255.5 123.5 C 234.5 123.5 213.5 123.5 192.5 123.5 C 192.802 119.21 192.136 115.21 190.5 111.5 C 190.768 109.901 190.434 108.568 189.5 107.5 C 189.737 106.209 189.404 105.209 188.5 104.5 C 188.039 102.45 187.372 100.45 186.5 98.5 C 186.709 97.914 187.043 97.414 187.5 97 C 205.061 87.0591 222.394 76.8924 239.5 66.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -94 -33)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.996",
              }}
              transform=' translate(-34, -95)'
              d='M 15.5 66.5 C 17.3356 68.588 19.6689 69.9213 22.5 70.5 C 24.3356 72.588 26.6689 73.9213 29.5 74.5 C 30.6594 76.2503 32.326 77.2503 34.5 77.5 C 36.3356 79.588 38.6689 80.9213 41.5 81.5 C 43.3356 83.588 45.6689 84.9213 48.5 85.5 C 52.1638 88.3346 56.1638 90.668 60.5 92.5 C 62.7937 94.653 65.4604 96.3197 68.5 97.5 C 67.962 99.1172 67.6287 100.784 67.5 102.5 C 65.5275 105.084 64.5275 108.084 64.5 111.5 C 63.5489 112.919 63.2155 114.585 63.5 116.5 C 62.5318 118.607 62.1984 120.941 62.5 123.5 C 41.5 123.5 20.5 123.5 -0.5 123.5 C -0.5 118.833 -0.5 114.167 -0.5 109.5 C 0.461384 107.735 0.794717 105.735 0.5 103.5 C 1.45115 102.081 1.78448 100.415 1.5 98.5 C 2.43448 97.4324 2.76781 96.099 2.5 94.5 C 4.40532 90.7843 5.73865 86.7843 6.5 82.5 C 8.35233 79.4493 9.68567 76.116 10.5 72.5 C 11.3382 72.1583 11.6716 71.4916 11.5 70.5 C 12.3382 70.1583 12.6716 69.4916 12.5 68.5 C 13.2223 67.4489 14.2223 66.7822 15.5 66.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 117.9375 -54.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-245.9375, -73.5)'
              d='M 245.5 74.5 C 245.369 73.7611 245.536 73.0944 246 72.5 C 246.692 73.4368 246.525 74.1034 245.5 74.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -119 -54.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-9, -73.75)'
              d='M 8.5 73.5 C 9.83333 74.1667 9.83333 74.1667 8.5 73.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -98 -54.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,114,131)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-30, -73.75)'
              d='M 29.5 73.5 C 30.8333 74.1667 30.8333 74.1667 29.5 73.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -96 -53.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,114,130)",
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-32, -74.75)'
              d='M 31.5 74.5 C 32.8333 75.1667 32.8333 75.1667 31.5 74.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -38 -53.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,113,130)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-90, -74.75)'
              d='M 89.5 74.5 C 90.8333 75.1667 90.8333 75.1667 89.5 74.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 79 -53.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-207, -74.5)'
              d='M 207.5 75.5 C 207.167 75.5 206.833 75.5 206.5 75.5 C 206.833 72.8333 207.167 72.8333 207.5 75.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -84.75 -52.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,114,131)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-43.25, -75.75)'
              d='M 43.5 75.5 C 42.8333 76.1667 42.8333 76.1667 43.5 75.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -39 -52.2487)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-89, -75.7513)'
              d='M 88.5 75.5 C 88.8333 75.5 89.1667 75.5 89.5 75.5 C 89.3147 76.1701 88.9813 76.1701 88.5 75.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 118.9999 -52.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-246.9999, -75.75)'
              d='M 246.5 75.5 C 247.833 76.1667 247.833 76.1667 246.5 75.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -93 -51.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,113,130)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-35, -76.75)'
              d='M 34.5 76.5 C 35.8333 77.1667 35.8333 77.1667 34.5 76.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -40.5 -50.9781)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-87.5, -77.0219)'
              d='M 86.5 77.5 C 86.5 77.1667 86.5 76.8333 86.5 76.5 C 87.1667 76.5 87.8333 76.5 88.5 76.5 C 88.1583 77.3382 87.4916 77.6716 86.5 77.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 79.9375 -51.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-207.9375, -76.5)'
              d='M 207.5 75.5 C 208.525 75.8966 208.692 76.5632 208 77.5 C 207.536 76.9056 207.369 76.2389 207.5 75.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -42 -50.2487)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,114,131)",
                fillRule: "evenodd",
                opacity: "0.016",
              }}
              transform=' translate(-86, -77.7513)'
              d='M 85.5 77.5 C 85.8333 77.5 86.1667 77.5 86.5 77.5 C 86.3147 78.1701 85.9813 78.1701 85.5 77.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 89.9999 -50.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,114,131)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-217.9999, -77.75)'
              d='M 217.5 77.5 C 218.833 78.1667 218.833 78.1667 217.5 77.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -43 -49.2487)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.016",
              }}
              transform=' translate(-85, -78.7513)'
              d='M 84.5 78.5 C 84.8333 78.5 85.1667 78.5 85.5 78.5 C 85.3147 79.1701 84.9813 79.1701 84.5 78.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 120 -49.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-248, -78.5)'
              d='M 248.5 79.5 C 248.167 79.5 247.833 79.5 247.5 79.5 C 247.833 76.8333 248.167 76.8333 248.5 79.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -44 -48.2487)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,114,131)",
                fillRule: "evenodd",
                opacity: "0.016",
              }}
              transform=' translate(-84, -79.7513)'
              d='M 83.5 79.5 C 83.8333 79.5 84.1667 79.5 84.5 79.5 C 84.3147 80.1701 83.9813 80.1701 83.5 79.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 76.9999 -48.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-204.9999, -79.75)'
              d='M 204.5 79.5 C 205.833 80.1667 205.833 80.1667 204.5 79.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 120.9375 -47.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-248.9375, -80.5)'
              d='M 248.5 79.5 C 249.525 79.8966 249.692 80.5632 249 81.5 C 248.536 80.9056 248.369 80.2389 248.5 79.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -86 -47.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-42, -80.75)'
              d='M 41.5 80.5 C 42.8333 81.1667 42.8333 81.1667 41.5 80.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -45 -47.2487)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,114,131)",
                fillRule: "evenodd",
                opacity: "0.016",
              }}
              transform=' translate(-83, -80.7513)'
              d='M 82.5 80.5 C 82.8333 80.5 83.1667 80.5 83.5 80.5 C 83.3147 81.1701 82.9813 81.1701 82.5 80.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 75.5 -46.9781)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-203.5, -81.0219)'
              d='M 202.5 81.5 C 202.5 81.1667 202.5 80.8333 202.5 80.5 C 203.167 80.5 203.833 80.5 204.5 80.5 C 204.158 81.3382 203.492 81.6716 202.5 81.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -122 -46.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-6, -81.5)'
              d='M 6.5 82.5 C 6.16667 82.5 5.83333 82.5 5.5 82.5 C 5.83333 79.8333 6.16667 79.8333 6.5 82.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -74.5 -46)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-53.5, -82)'
              d='M 54.5 81.5 C 54.5 81.8333 54.5 82.1667 54.5 82.5 C 51.8333 82.1667 51.8333 81.8333 54.5 81.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -46 -46.2487)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-82, -81.7513)'
              d='M 81.5 81.5 C 81.8333 81.5 82.1667 81.5 82.5 81.5 C 82.3147 82.1701 81.9813 82.1701 81.5 81.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 73.5 -45.9781)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-201.5, -82.0219)'
              d='M 200.5 82.5 C 200.5 82.1667 200.5 81.8333 200.5 81.5 C 201.167 81.5 201.833 81.5 202.5 81.5 C 202.158 82.3382 201.492 82.6716 200.5 82.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 82.9999 -46.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-210.9999, -81.75)'
              d='M 210.5 81.5 C 211.833 82.1667 211.833 82.1667 210.5 81.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -122.9374 -44.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-5.0626, -83.5)'
              d='M 5.5 82.5 C 5.63101 83.2389 5.46434 83.9056 5 84.5 C 4.30831 83.5632 4.47498 82.8966 5.5 82.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -73 -45.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-55, -82.75)'
              d='M 54.5 82.5 C 55.8333 83.1667 55.8333 83.1667 54.5 82.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -47 -45.2487)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,114,131)",
                fillRule: "evenodd",
                opacity: "0.016",
              }}
              transform=' translate(-81, -82.7513)'
              d='M 80.5 82.5 C 80.8333 82.5 81.1667 82.5 81.5 82.5 C 81.3147 83.1701 80.9813 83.1701 80.5 82.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 72.2499 -45.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,113,130)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-200.2499, -82.75)'
              d='M 200.5 82.5 C 199.833 83.1667 199.833 83.1667 200.5 82.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -48 -44.2487)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.016",
              }}
              transform=' translate(-80, -83.7513)'
              d='M 79.5 83.5 C 79.8333 83.5 80.1667 83.5 80.5 83.5 C 80.3147 84.1701 79.9813 84.1701 79.5 83.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 69.9999 -44.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,114,130)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-197.9999, -83.75)'
              d='M 197.5 83.5 C 198.833 84.1667 198.833 84.1667 197.5 83.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 121.9375 -44.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-249.9375, -83.5)'
              d='M 249.5 84.5 C 249.369 83.7611 249.536 83.0944 250 82.5 C 250.692 83.4368 250.525 84.1034 249.5 84.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -79 -43.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-49, -84.75)'
              d='M 48.5 84.5 C 49.8333 85.1667 49.8333 85.1667 48.5 84.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -49 -43.2487)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,114,131)",
                fillRule: "evenodd",
                opacity: "0.016",
              }}
              transform=' translate(-79, -84.7513)'
              d='M 78.5 84.5 C 78.8333 84.5 79.1667 84.5 79.5 84.5 C 79.3147 85.1701 78.9813 85.1701 78.5 84.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 68.5 -42.9781)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-196.5, -85.0219)'
              d='M 195.5 85.5 C 195.5 85.1667 195.5 84.8333 195.5 84.5 C 196.167 84.5 196.833 84.5 197.5 84.5 C 197.158 85.3382 196.492 85.6716 195.5 85.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -124.0626 -41.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.01",
              }}
              transform=' translate(-3.9374, -86.5)'
              d='M 3.5 85.5 C 4.52502 85.8966 4.69169 86.5632 4 87.5 C 3.53566 86.9056 3.36899 86.2389 3.5 85.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -77 -42.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-51, -85.75)'
              d='M 50.5 85.5 C 51.8333 86.1667 51.8333 86.1667 50.5 85.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -67.5 -42)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-60.5, -86)'
              d='M 61.5 85.5 C 61.5 85.8333 61.5 86.1667 61.5 86.5 C 58.8333 86.1667 58.8333 85.8333 61.5 85.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -50 -42.2487)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.016",
              }}
              transform=' translate(-78, -85.7513)'
              d='M 77.5 85.5 C 77.8333 85.5 78.1667 85.5 78.5 85.5 C 78.3147 86.1701 77.9813 86.1701 77.5 85.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 66.5 -41.9781)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-194.5, -86.0219)'
              d='M 193.5 86.5 C 193.5 86.1667 193.5 85.8333 193.5 85.5 C 194.167 85.5 194.833 85.5 195.5 85.5 C 195.158 86.3382 194.492 86.6716 193.5 86.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -66 -41.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,113,130)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-62, -86.75)'
              d='M 61.5 86.5 C 62.8333 87.1667 62.8333 87.1667 61.5 86.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -50.9781 -40.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-77.0219, -87.5)'
              d='M 76.5 86.5 C 76.8333 86.5 77.1667 86.5 77.5 86.5 C 77.6716 87.4916 77.3382 88.1583 76.5 88.5 C 76.5 87.8333 76.5 87.1667 76.5 86.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 65 -41.2487)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-193, -86.7513)'
              d='M 192.5 86.5 C 192.833 86.5 193.167 86.5 193.5 86.5 C 193.315 87.1701 192.981 87.1701 192.5 86.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 122.9375 -41.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-250.9375, -86.5)'
              d='M 250.5 87.5 C 250.369 86.7611 250.536 86.0944 251 85.5 C 251.692 86.4368 251.525 87.1034 250.5 87.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 50.0625 -40.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-178.0625, -87.5)'
              d='M 178.5 86.5 C 178.631 87.2389 178.464 87.9056 178 88.5 C 177.308 87.5632 177.475 86.8966 178.5 86.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 62.9999 -40.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-190.9999, -87.75)'
              d='M 190.5 87.5 C 191.833 88.1667 191.833 88.1667 190.5 87.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -52 -39.2487)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,114,131)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-76, -88.7513)'
              d='M 75.5 88.5 C 75.8333 88.5 76.1667 88.5 76.5 88.5 C 76.3147 89.1701 75.9813 89.1701 75.5 88.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 61.5 -38.9781)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-189.5, -89.0219)'
              d='M 188.5 89.5 C 188.5 89.1667 188.5 88.8333 188.5 88.5 C 189.167 88.5 189.833 88.5 190.5 88.5 C 190.158 89.3382 189.492 89.6716 188.5 89.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 123.9375 -38.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.01",
              }}
              transform=' translate(-251.9375, -89.5)'
              d='M 251.5 88.5 C 252.525 88.8966 252.692 89.5632 252 90.5 C 251.536 89.9056 251.369 89.2389 251.5 88.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -125.0626 -38.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-2.9374, -89.5)'
              d='M 2.5 88.5 C 3.52502 88.8966 3.69169 89.5632 3 90.5 C 2.53566 89.9056 2.36899 89.2389 2.5 88.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -53 -38.2487)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,114,131)",
                fillRule: "evenodd",
                opacity: "0.016",
              }}
              transform=' translate(-75, -89.7513)'
              d='M 74.5 89.5 C 74.8333 89.5 75.1667 89.5 75.5 89.5 C 75.3147 90.1701 74.9813 90.1701 74.5 89.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 52.2499 -38.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,114,131)",
                fillRule: "evenodd",
                opacity: "0.016",
              }}
              transform=' translate(-180.2499, -89.75)'
              d='M 180.5 89.5 C 179.833 90.1667 179.833 90.1667 180.5 89.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 59.5 -37.9781)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-187.5, -90.0219)'
              d='M 186.5 90.5 C 186.5 90.1667 186.5 89.8333 186.5 89.5 C 187.167 89.5 187.833 89.5 188.5 89.5 C 188.158 90.3382 187.492 90.6716 186.5 90.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -58.75 -37.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-69.25, -90.75)'
              d='M 69.5 90.5 C 68.8333 91.1667 68.8333 91.1667 69.5 90.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 58 -37.2487)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-186, -90.7513)'
              d='M 185.5 90.5 C 185.833 90.5 186.167 90.5 186.5 90.5 C 186.315 91.1701 185.981 91.1701 185.5 90.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -125.9501 -35)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-2.05, -93)'
              d='M 2.5 94.5 C 1.42654 93.7494 1.25988 92.7494 2 91.5 C 2.48278 92.448 2.64945 93.448 2.5 94.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -67 -36.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,114,130)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-61, -91.75)'
              d='M 60.5 91.5 C 61.8333 92.1667 61.8333 92.1667 60.5 91.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -56.7513 -36)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-71.2487, -92)'
              d='M 71.5 91.5 C 71.5 91.8333 71.5 92.1667 71.5 92.5 C 70.8299 92.0187 70.8299 91.6853 71.5 91.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 56.5 -35.9781)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-184.5, -92.0219)'
              d='M 183.5 92.5 C 183.5 92.1667 183.5 91.8333 183.5 91.5 C 184.167 91.5 184.833 91.5 185.5 91.5 C 185.158 92.3382 184.492 92.6716 183.5 92.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 124.9501 -35)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.01",
              }}
              transform=' translate(-252.95, -93)'
              d='M 252.5 94.5 C 252.351 93.448 252.517 92.448 253 91.5 C 253.74 92.7494 253.573 93.7494 252.5 94.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -56 -35.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-72, -92.75)'
              d='M 71.5 92.5 C 72.8333 93.1667 72.8333 93.1667 71.5 92.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 55.2499 -35.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,114,131)",
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-183.2499, -92.75)'
              d='M 183.5 92.5 C 182.833 93.1667 182.833 93.1667 183.5 92.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 63.9999 -35.25)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,114,130)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-191.9999, -92.75)'
              d='M 191.5 92.5 C 192.833 93.1667 192.833 93.1667 191.5 92.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -126.9501 -31)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-1.05, -97)'
              d='M 1.5 98.5 C 0.426544 97.7494 0.259877 96.7494 1 95.5 C 1.48278 96.448 1.64945 97.448 1.5 98.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -58.75 -31)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,113,130)",
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-69.25, -97)'
              d='M 69.5 97.5 C 68.8333 96.1667 68.8333 96.1667 69.5 97.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 125.9501 -31)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,113,132)",
                fillRule: "evenodd",
                opacity: "0.016",
              }}
              transform=' translate(-253.95, -97)'
              d='M 253.5 98.5 C 253.351 97.448 253.517 96.448 254 95.5 C 254.74 96.7494 254.573 97.7494 253.5 98.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 56.9375 -29.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.01",
              }}
              transform=' translate(-184.9375, -98.5)'
              d='M 184.5 97.5 C 185.525 97.8966 185.692 98.5632 185 99.5 C 184.536 98.9056 184.369 98.2389 184.5 97.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -58.0626 -29.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-69.9374, -98.5)'
              d='M 69.5 97.5 C 70.525 97.8966 70.6917 98.5632 70 99.5 C 69.5357 98.9056 69.369 98.2389 69.5 97.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 127.0001 -27)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-255.0001, -101)'
              d='M 255.5 99.5 C 255.5 100.5 255.5 101.5 255.5 102.5 C 254.167 101.5 254.167 100.5 255.5 99.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -127.9553 -26.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.014",
              }}
              transform=' translate(-0.0447, -101.5)'
              d='M -0.5 99.5 C 0.434475 100.568 0.767809 101.901 0.5 103.5 C 0.166667 103.5 -0.166667 103.5 -0.5 103.5 C -0.5 102.167 -0.5 100.833 -0.5 99.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -59.0626 -26.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-68.9374, -101.5)'
              d='M 68.5 102.5 C 68.369 101.761 68.5357 101.094 69 100.5 C 69.6917 101.437 69.525 102.103 68.5 102.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 57.9999 -27.2499)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,114,130)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-185.9999, -100.7501)'
              d='M 185.5 100.5 C 186.833 101.167 186.833 101.167 185.5 100.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -60 -24.4999)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.01",
              }}
              transform=' translate(-68, -103.5001)'
              d='M 67.5 102.5 C 67.8333 102.5 68.1667 102.5 68.5 102.5 C 68.1667 105.167 67.8333 105.167 67.5 102.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 60.0001 -22)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-188.0001, -106)'
              d='M 188.5 104.5 C 188.5 105.5 188.5 106.5 188.5 107.5 C 187.167 106.5 187.167 105.5 188.5 104.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -61.0626 -21.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-66.9374, -106.5)'
              d='M 66.5 105.5 C 67.525 105.897 67.6917 106.563 67 107.5 C 66.5357 106.906 66.369 106.239 66.5 105.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 61 -19)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.01",
              }}
              transform=' translate(-189, -109)'
              d='M 188.5 107.5 C 188.833 107.5 189.167 107.5 189.5 107.5 C 189.167 111.5 188.833 111.5 188.5 107.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -62.0626 -18.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-65.9374, -109.5)'
              d='M 65.5 108.5 C 66.525 108.897 66.6917 109.563 66 110.5 C 65.5357 109.906 65.369 109.239 65.5 108.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 62.05 -15)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.009",
              }}
              transform=' translate(-190.05, -113)'
              d='M 190.5 111.5 C 190.649 112.552 190.483 113.552 190 114.5 C 189.26 113.251 189.427 112.251 190.5 111.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -63.0429 -14.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-64.9571, -113.5)'
              d='M 64.5 111.5 C 65.5983 112.601 65.765 113.934 65 115.5 C 64.51 114.207 64.3433 112.873 64.5 111.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 62.9615 -9)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.01",
              }}
              transform=' translate(-190.9615, -119)'
              d='M 190.5 116.5 C 191.613 117.946 191.78 119.613 191 121.5 C 190.506 119.866 190.34 118.199 190.5 116.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -64.0357 -8.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.01",
              }}
              transform=' translate(-63.9643, -119.5)'
              d='M 63.5 116.5 C 64.6225 118.288 64.7891 120.288 64 122.5 C 63.5045 120.527 63.3379 118.527 63.5 116.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 96.556 -9.9687)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(95,118,136)",
                fillRule: "evenodd",
                opacity: 1,
              }}
              transform=' translate(-224.556, -118.0313)'
              d='M 253.5 113.5 C 254.477 116.287 254.81 119.287 254.5 122.5 C 234.497 122.667 214.497 122.5 194.5 122 C 214.164 121.5 233.831 121.333 253.5 121.5 C 253.5 118.833 253.5 116.167 253.5 113.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -75.5 2.0257)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(88,110,131)",
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-52.5, -130.0257)'
              d='M 43.5 130.5 C 49.3188 129.347 55.3188 129.181 61.5 130 C 55.5092 130.499 49.5092 130.666 43.5 130.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 83 2.0236)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(88,110,131)",
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-211, -130.0236)'
              d='M 193.5 130.5 C 204.993 129.341 216.659 129.174 228.5 130 C 216.838 130.5 205.171 130.667 193.5 130.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 103.9375 4.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,113,130)",
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-231.9375, -132.5)'
              d='M 231.5 131.5 C 232.525 131.897 232.692 132.563 232 133.5 C 231.536 132.906 231.369 132.239 231.5 131.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -64.0357 7.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.007",
              }}
              transform=' translate(-63.9643, -135.5)'
              d='M 63.5 132.5 C 64.6225 134.288 64.7891 136.288 64 138.5 C 63.5045 136.527 63.3379 134.527 63.5 132.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 62.9643 7.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.007",
              }}
              transform=' translate(-190.9643, -135.5)'
              d='M 190.5 132.5 C 191.622 134.288 191.789 136.288 191 138.5 C 190.505 136.527 190.338 134.527 190.5 132.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -73 21)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.996",
              }}
              transform=' translate(-55, -149)'
              d='M 64.5 143.5 C 64.5275 146.916 65.5275 149.916 67.5 152.5 C 67.6287 154.216 67.962 155.883 68.5 157.5 C 67.8333 157.5 67.5 157.833 67.5 158.5 C 66.5084 158.328 65.8417 158.662 65.5 159.5 C 64.5084 159.328 63.8417 159.662 63.5 160.5 C 62.8333 160.5 62.5 160.833 62.5 161.5 C 61.5084 161.328 60.8417 161.662 60.5 162.5 C 59.5084 162.328 58.8417 162.662 58.5 163.5 C 56.9731 163.427 55.9731 164.094 55.5 165.5 C 54.5084 165.328 53.8417 165.662 53.5 166.5 C 51.8007 166.473 50.4674 165.806 49.5 164.5 C 49.6716 163.508 49.3382 162.842 48.5 162.5 C 48.5979 160.447 47.9313 158.78 46.5 157.5 C 46.7373 156.209 46.404 155.209 45.5 154.5 C 45.2785 151.933 44.6118 149.599 43.5 147.5 C 42.9968 142.141 42.3301 136.807 41.5 131.5 C 48.5 131.5 55.5 131.5 62.5 131.5 C 62.1977 135.79 62.8643 139.79 64.5 143.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 80.75 25.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.996",
              }}
              transform=' translate(-208.75, -153.5)'
              d='M 226.5 157.5 C 225.596 158.209 225.263 159.209 225.5 160.5 C 224.596 161.209 224.263 162.209 224.5 163.5 C 223.069 164.78 222.402 166.447 222.5 168.5 C 221.662 168.842 221.328 169.508 221.5 170.5 C 220.662 170.842 220.328 171.508 220.5 172.5 C 219.842 173.398 219.176 174.398 218.5 175.5 C 217.583 174.873 216.583 174.539 215.5 174.5 C 214.486 173.326 213.153 172.66 211.5 172.5 C 209.178 170.336 206.511 168.669 203.5 167.5 C 201.337 165.917 199.004 164.584 196.5 163.5 C 195.486 162.326 194.153 161.66 192.5 161.5 C 191 159.821 189.167 158.488 187 157.5 C 187.019 155.893 187.185 154.226 187.5 152.5 C 189.472 149.916 190.472 146.916 190.5 143.5 C 192.136 139.79 192.802 135.79 192.5 131.5 C 205.167 131.5 217.833 131.5 230.5 131.5 C 229.812 140.273 228.479 148.939 226.5 157.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -87.0386 11)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-40.9614, -139)'
              d='M 40.5 136.5 C 41.6129 137.946 41.7796 139.613 41 141.5 C 40.5065 139.866 40.3398 138.199 40.5 136.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 102.9643 12.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.014",
              }}
              transform=' translate(-230.9643, -140.5)'
              d='M 230.5 137.5 C 231.622 139.288 231.789 141.288 231 143.5 C 230.505 141.527 230.338 139.527 230.5 137.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 62.043 13.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-190.043, -141.5)'
              d='M 190.5 143.5 C 189.402 142.399 189.235 141.066 190 139.5 C 190.49 140.793 190.657 142.127 190.5 143.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -63.0429 13.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-64.9571, -141.5)'
              d='M 64.5 143.5 C 64.3433 142.127 64.51 140.793 65 139.5 C 65.765 141.066 65.5983 142.399 64.5 143.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -86.05 17)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-41.95, -145)'
              d='M 41.5 143.5 C 42.5735 144.251 42.7401 145.251 42 146.5 C 41.5172 145.552 41.3505 144.552 41.5 143.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -62.0626 17.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-65.9374, -145.5)'
              d='M 65.5 144.5 C 66.525 144.897 66.6917 145.563 66 146.5 C 65.5357 145.906 65.369 145.239 65.5 144.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 101.9501 19)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-229.95, -147)'
              d='M 229.5 145.5 C 230.573 146.251 230.74 147.251 230 148.5 C 229.517 147.552 229.351 146.552 229.5 145.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -84.9501 21)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.01",
              }}
              transform=' translate(-43.05, -149)'
              d='M 43.5 147.5 C 43.6495 148.552 43.4828 149.552 43 150.5 C 42.2599 149.251 42.4265 148.251 43.5 147.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -61.0626 20.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-66.9374, -148.5)'
              d='M 66.5 147.5 C 67.525 147.897 67.6917 148.563 67 149.5 C 66.5357 148.906 66.369 148.239 66.5 147.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -60.0626 23.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.01",
              }}
              transform=' translate(-67.9374, -151.5)'
              d='M 67.5 152.5 C 67.369 151.761 67.5357 151.094 68 150.5 C 68.6917 151.437 68.525 152.103 67.5 152.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 100.9501 24)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.009",
              }}
              transform=' translate(-228.95, -152)'
              d='M 228.5 150.5 C 229.573 151.251 229.74 152.251 229 153.5 C 228.517 152.552 228.351 151.552 228.5 150.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 59.0625 23.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-187.0625, -151.5)'
              d='M 187.5 152.5 C 186.475 152.103 186.308 151.437 187 150.5 C 187.464 151.094 187.631 151.761 187.5 152.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -59 25.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,113,130)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-69, -153.7501)'
              d='M 68.5 153.5 C 69.8333 154.167 69.8333 154.167 68.5 153.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 57.9999 25.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-185.9999, -153.7501)'
              d='M 185.5 153.5 C 186.833 154.167 186.833 154.167 185.5 153.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -82.9374 27.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-45.0626, -155.5)'
              d='M 45.5 154.5 C 45.631 155.239 45.4643 155.906 45 156.5 C 44.3083 155.563 44.475 154.897 45.5 154.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 56.9375 28.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.01",
              }}
              transform=' translate(-184.9375, -156.5)'
              d='M 184.5 155.5 C 185.525 155.897 185.692 156.563 185 157.5 C 184.536 156.906 184.369 156.239 184.5 155.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 99.9375 27.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-227.9375, -155.5)'
              d='M 227.5 154.5 C 228.525 154.897 228.692 155.563 228 156.5 C 227.536 155.906 227.369 155.239 227.5 154.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -58.0626 28.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-69.9374, -156.5)'
              d='M 69.5 157.5 C 69.369 156.761 69.5357 156.094 70 155.5 C 70.6917 156.437 70.525 157.103 69.5 157.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -81.9374 30.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.01",
              }}
              transform=' translate(-46.0626, -158.5)'
              d='M 46.5 157.5 C 46.631 158.239 46.4643 158.906 46 159.5 C 45.3083 158.563 45.475 157.897 46.5 157.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -59 29.7512)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,114,131)",
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-69, -157.7512)'
              d='M 68.5 157.5 C 68.8333 157.5 69.1667 157.5 69.5 157.5 C 69.3147 158.17 68.9813 158.17 68.5 157.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -60 30.7512)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,114,130)",
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-68, -158.7512)'
              d='M 67.5 158.5 C 67.8333 158.5 68.1667 158.5 68.5 158.5 C 68.3147 159.17 67.9813 159.17 67.5 158.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 98.9999 31)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-226.9999, -159)'
              d='M 226.5 157.5 C 227.833 158.5 227.833 159.5 226.5 160.5 C 226.5 159.5 226.5 158.5 226.5 157.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -61.5 32.0219)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-66.5, -160.0219)'
              d='M 65.5 160.5 C 65.5 160.167 65.5 159.833 65.5 159.5 C 66.1667 159.5 66.8333 159.5 67.5 159.5 C 67.1583 160.338 66.4916 160.672 65.5 160.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -81 32.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-47, -160.7501)'
              d='M 46.5 160.5 C 47.8333 161.167 47.8333 161.167 46.5 160.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -63.5 33.0219)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-64.5, -161.0219)'
              d='M 63.5 161.5 C 63.5 161.167 63.5 160.833 63.5 160.5 C 64.1667 160.5 64.8333 160.5 65.5 160.5 C 65.1583 161.338 64.4916 161.672 63.5 161.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -65 33.7512)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,114,130)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-63, -161.7512)'
              d='M 62.5 161.5 C 62.8333 161.5 63.1667 161.5 63.5 161.5 C 63.3147 162.17 62.9813 162.17 62.5 161.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -56 33.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-72, -161.7501)'
              d='M 71.5 161.5 C 72.8333 162.167 72.8333 162.167 71.5 161.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 55.2499 34.0001)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-183.2499, -162.0001)'
              d='M 183.5 162.5 C 182.833 161.167 182.833 161.167 183.5 162.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 64.2499 33.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-192.2499, -161.7501)'
              d='M 192.5 161.5 C 191.833 162.167 191.833 162.167 192.5 161.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 98 33.5001)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-226, -161.5001)'
              d='M 225.5 160.5 C 225.833 160.5 226.167 160.5 226.5 160.5 C 226.167 163.167 225.833 163.167 225.5 160.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -66.5 35.0219)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-61.5, -163.0219)'
              d='M 60.5 163.5 C 60.5 163.167 60.5 162.833 60.5 162.5 C 61.1667 162.5 61.8333 162.5 62.5 162.5 C 62.1583 163.338 61.4916 163.672 60.5 163.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -56.7513 35)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-71.2487, -163)'
              d='M 71.5 162.5 C 71.5 162.833 71.5 163.167 71.5 163.5 C 70.8299 163.019 70.8299 162.685 71.5 162.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 55.9999 34.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-183.9999, -162.7501)'
              d='M 183.5 162.5 C 184.833 163.167 184.833 163.167 183.5 162.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -80 35.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-48, -163.5)'
              d='M 48.5 162.5 C 48.5 163.167 48.5 163.833 48.5 164.5 C 47.1667 163.833 47.1667 163.167 48.5 162.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -68.5 36.0219)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-59.5, -164.0219)'
              d='M 58.5 164.5 C 58.5 164.167 58.5 163.833 58.5 163.5 C 59.1667 163.5 59.8333 163.5 60.5 163.5 C 60.1583 164.338 59.4916 164.672 58.5 164.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -59 35.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,114,130)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-69, -163.7501)'
              d='M 68.5 163.5 C 69.8333 164.167 69.8333 164.167 68.5 163.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 57.9999 35.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,114,130)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-185.9999, -163.7501)'
              d='M 185.5 163.5 C 186.833 164.167 186.833 164.167 185.5 163.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 67.4999 36)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-195.4999, -164)'
              d='M 196.5 163.5 C 196.5 163.833 196.5 164.167 196.5 164.5 C 193.833 164.167 193.833 163.833 196.5 163.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -69.75 36.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-58.25, -164.7501)'
              d='M 58.5 164.5 C 57.8333 165.167 57.8333 165.167 58.5 164.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 68.9999 36.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-196.9999, -164.7501)'
              d='M 196.5 164.5 C 197.833 165.167 197.833 165.167 196.5 164.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 96.9375 36.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-224.9375, -164.5)'
              d='M 224.5 163.5 C 225.525 163.897 225.692 164.563 225 165.5 C 224.536 164.906 224.369 164.239 224.5 163.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -79 37.5001)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-49, -165.5001)'
              d='M 48.5 164.5 C 48.8333 164.5 49.1667 164.5 49.5 164.5 C 49.1667 167.167 48.8333 167.167 48.5 164.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -72 37.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-56, -165.7501)'
              d='M 55.5 165.5 C 56.8333 166.167 56.8333 166.167 55.5 165.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -73.5 39.0219)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-54.5, -167.0219)'
              d='M 53.5 167.5 C 53.5 167.167 53.5 166.833 53.5 166.5 C 54.1667 166.5 54.8333 166.5 55.5 166.5 C 55.1583 167.338 54.4916 167.672 53.5 167.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 62.9999 38.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-190.9999, -166.7501)'
              d='M 190.5 166.5 C 191.833 167.167 191.833 167.167 190.5 166.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 95.9999 38.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,114,130)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-223.9999, -166.7501)'
              d='M 223.5 166.5 C 224.833 167.167 224.833 167.167 223.5 166.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -75.5 39.9375)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-52.5, -167.9375)'
              d='M 53.5 167.5 C 53.1034 168.525 52.4368 168.692 51.5 168 C 52.0944 167.536 52.7611 167.369 53.5 167.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -66 39.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-62, -167.7501)'
              d='M 61.5 167.5 C 62.8333 168.167 62.8333 168.167 61.5 167.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 64.9999 39.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,114,130)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-192.9999, -167.7501)'
              d='M 192.5 167.5 C 193.833 168.167 193.833 168.167 192.5 167.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 74.4999 40)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-202.4999, -168)'
              d='M 203.5 167.5 C 203.5 167.833 203.5 168.167 203.5 168.5 C 200.833 168.167 200.833 167.833 203.5 167.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 68.5 68.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.996",
              }}
              transform=' translate(-196.5, -196.5)'
              d='M 183.5 163.5 C 185.336 165.588 187.669 166.921 190.5 167.5 C 194.164 170.335 198.164 172.668 202.5 174.5 C 204.336 176.588 206.669 177.921 209.5 178.5 C 211.336 180.588 213.669 181.921 216.5 182.5 C 217.659 184.25 219.326 185.25 221.5 185.5 C 223.794 187.653 226.46 189.32 229.5 190.5 C 229.5 191.167 229.5 191.833 229.5 192.5 C 228.833 192.5 228.5 192.833 228.5 193.5 C 227.094 193.973 226.427 194.973 226.5 196.5 C 225.833 196.5 225.5 196.833 225.5 197.5 C 224.662 197.842 224.328 198.508 224.5 199.5 C 223.833 199.5 223.5 199.833 223.5 200.5 C 222.833 200.5 222.5 200.833 222.5 201.5 C 221.662 201.842 221.328 202.508 221.5 203.5 C 220.833 203.5 220.5 203.833 220.5 204.5 C 219.833 204.5 219.5 204.833 219.5 205.5 C 218.833 205.5 218.5 205.833 218.5 206.5 C 214.833 210.833 210.833 214.833 206.5 218.5 C 205.833 218.5 205.5 218.833 205.5 219.5 C 204.833 219.5 204.5 219.833 204.5 220.5 C 203.833 220.5 203.5 220.833 203.5 221.5 C 201.973 221.427 200.973 222.094 200.5 223.5 C 199.833 223.5 199.5 223.833 199.5 224.5 C 197.973 224.427 196.973 225.094 196.5 226.5 C 195.833 226.5 195.5 226.833 195.5 227.5 C 194.508 227.328 193.842 227.662 193.5 228.5 C 192.833 228.5 192.5 228.833 192.5 229.5 C 190.57 229.229 189.236 228.229 188.5 226.5 C 188.672 225.508 188.338 224.842 187.5 224.5 C 187.068 223.29 186.401 222.29 185.5 221.5 C 185.672 220.508 185.338 219.842 184.5 219.5 C 184.573 217.973 183.906 216.973 182.5 216.5 C 181.921 213.669 180.588 211.336 178.5 209.5 C 178.672 208.508 178.338 207.842 177.5 207.5 C 176.89 205.566 175.89 203.899 174.5 202.5 C 174.25 200.326 173.25 198.659 171.5 197.5 C 171.672 196.508 171.338 195.842 170.5 195.5 C 170.672 194.508 170.338 193.842 169.5 193.5 C 169.573 191.973 168.906 190.973 167.5 190.5 C 167.672 189.508 167.338 188.842 166.5 188.5 C 166.672 187.508 166.338 186.842 165.5 186.5 C 165.068 185.29 164.401 184.29 163.5 183.5 C 170.5 177.167 177.167 170.5 183.5 163.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 75.9999 40.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-203.9999, -168.7501)'
              d='M 203.5 168.5 C 204.833 169.167 204.833 169.167 203.5 168.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 94.9999 41.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-222.9999, -169.5)'
              d='M 222.5 168.5 C 223.833 169.167 223.833 169.833 222.5 170.5 C 222.5 169.833 222.5 169.167 222.5 168.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -73.0066 72)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.996",
              }}
              transform=' translate(-54.9934, -200)'
              d='M 71.5 163.5 C 76.7962 169.793 82.7962 175.46 89.5 180.5 C 90.5511 181.222 91.2178 182.222 91.5 183.5 C 90.6618 183.842 90.3284 184.508 90.5 185.5 C 89.8333 185.5 89.5 185.833 89.5 186.5 C 88.6618 186.842 88.3284 187.508 88.5 188.5 C 87.6618 188.842 87.3284 189.508 87.5 190.5 C 86.6618 190.842 86.3284 191.508 86.5 192.5 C 85.8333 192.5 85.5 192.833 85.5 193.5 C 84.6618 193.842 84.3284 194.508 84.5 195.5 C 83.6618 195.842 83.3284 196.508 83.5 197.5 C 82.0937 197.973 81.427 198.973 81.5 200.5 C 80.6618 200.842 80.3284 201.508 80.5 202.5 C 79.6618 202.842 79.3284 203.508 79.5 204.5 C 78.0937 204.973 77.427 205.973 77.5 207.5 C 76.6618 207.842 76.3284 208.508 76.5 209.5 C 75.6618 209.842 75.3284 210.508 75.5 211.5 C 74.8333 211.5 74.5 211.833 74.5 212.5 C 73.6618 212.842 73.3284 213.508 73.5 214.5 C 72.6618 214.842 72.3284 215.508 72.5 216.5 C 71.6618 216.842 71.3284 217.508 71.5 218.5 C 70.8333 218.5 70.5 218.833 70.5 219.5 C 69.6618 219.842 69.3284 220.508 69.5 221.5 C 68.6618 221.842 68.3284 222.508 68.5 223.5 C 67.0937 223.973 66.427 224.973 66.5 226.5 C 65.6618 226.842 65.3284 227.508 65.5 228.5 C 64.6618 228.842 64.3284 229.508 64.5 230.5 C 63.0937 230.973 62.427 231.973 62.5 233.5 C 61.6618 233.842 61.3284 234.508 61.5 235.5 C 60.8333 235.5 60.5 235.833 60.5 236.5 C 56.6733 234.754 53.0066 232.754 49.5 230.5 C 40.1329 222.134 31.4662 213.134 23.5 203.5 C 22.4884 202.128 21.4884 200.795 20.5 199.5 C 20.0679 198.29 19.4013 197.29 18.5 196.5 C 18.4142 195.504 18.7476 194.671 19.5 194 C 37.0608 184.059 54.3941 173.892 71.5 163.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 94.0219 43.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-222.0219, -171.5)'
              d='M 221.5 170.5 C 221.833 170.5 222.167 170.5 222.5 170.5 C 222.672 171.492 222.338 172.158 221.5 172.5 C 221.5 171.833 221.5 171.167 221.5 170.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 83.2499 44.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,114,131)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-211.2499, -172.7501)'
              d='M 211.5 172.5 C 210.833 173.167 210.833 173.167 211.5 172.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 74.9999 45.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,114,131)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-202.9999, -173.7501)'
              d='M 202.5 173.5 C 203.833 174.167 203.833 174.167 202.5 173.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 93 45.5001)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,114,131)",
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-221, -173.5001)'
              d='M 220.5 172.5 C 220.833 172.5 221.167 172.5 221.5 172.5 C 221.167 175.167 220.833 175.167 220.5 172.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 86.4999 47)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(92,113,132)",
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-214.4999, -175)'
              d='M 215.5 174.5 C 215.5 174.833 215.5 175.167 215.5 175.5 C 212.833 175.167 212.833 174.833 215.5 174.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 87.9999 47.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-215.9999, -175.7501)'
              d='M 215.5 175.5 C 216.833 176.167 216.833 176.167 215.5 175.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 89.9999 48.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-217.9999, -176.7501)'
              d='M 217.5 176.5 C 218.833 177.167 218.833 177.167 217.5 176.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 81.9999 49.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-209.9999, -177.7501)'
              d='M 209.5 177.5 C 210.833 178.167 210.833 178.167 209.5 177.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -85 50.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-43, -178.7501)'
              d='M 42.5 178.5 C 43.8333 179.167 43.8333 179.167 42.5 178.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 83.9999 50.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,113,130)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-211.9999, -178.7501)'
              d='M 211.5 178.5 C 212.833 179.167 212.833 179.167 211.5 178.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -38 51.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.016",
              }}
              transform=' translate(-90, -179.7501)'
              d='M 89.5 179.5 C 90.8333 180.167 90.8333 180.167 89.5 179.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 88.9999 53.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,114,130)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-216.9999, -181.7501)'
              d='M 216.5 181.5 C 217.833 182.167 217.833 182.167 216.5 181.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -35 54.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-93, -182.7501)'
              d='M 92.5 182.5 C 93.8333 183.167 93.8333 183.167 92.5 182.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 34.2499 55.0001)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,113,130)",
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-162.2499, -183.0001)'
              d='M 162.5 183.5 C 161.833 182.167 161.833 182.167 162.5 183.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 90.9999 54.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-218.9999, -182.7501)'
              d='M 218.5 182.5 C 219.833 183.167 219.833 183.167 218.5 182.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -35.9781 56.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-92.0219, -184.5)'
              d='M 91.5 183.5 C 91.8333 183.5 92.1667 183.5 92.5 183.5 C 92.6716 184.492 92.3382 185.158 91.5 185.5 C 91.5 184.833 91.5 184.167 91.5 183.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 35 55.7512)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,114,130)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-163, -183.7512)'
              d='M 162.5 183.5 C 162.833 183.5 163.167 183.5 163.5 183.5 C 163.315 184.17 162.981 184.17 162.5 183.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -29.5 57.0625)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,114,131)",
                fillRule: "evenodd",
                opacity: "0.01",
              }}
              transform=' translate(-98.5, -185.0625)'
              d='M 97.5 185.5 C 97.8966 184.475 98.5632 184.308 99.5 185 C 98.9056 185.464 98.2389 185.631 97.5 185.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 93.9999 56.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-221.9999, -184.7501)'
              d='M 221.5 184.5 C 222.833 185.167 222.833 185.167 221.5 184.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -37 57.7512)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-91, -185.7512)'
              d='M 90.5 185.5 C 90.8333 185.5 91.1667 185.5 91.5 185.5 C 91.3147 186.17 90.9813 186.17 90.5 185.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -26.5 58.0625)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-101.5, -186.0625)'
              d='M 102.5 186.5 C 101.761 186.631 101.094 186.464 100.5 186 C 101.437 185.308 102.103 185.475 102.5 186.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -37.9781 59.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,113,132)",
                fillRule: "evenodd",
                opacity: "0.006",
              }}
              transform=' translate(-90.0219, -187.5)'
              d='M 89.5 186.5 C 89.8333 186.5 90.1667 186.5 90.5 186.5 C 90.6716 187.492 90.3382 188.158 89.5 188.5 C 89.5 187.833 89.5 187.167 89.5 186.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -24.4999 59)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-103.5001, -187)'
              d='M 102.5 187.5 C 102.5 187.167 102.5 186.833 102.5 186.5 C 105.167 186.833 105.167 187.167 102.5 187.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -21.5 60.0625)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-106.5, -188.0625)'
              d='M 105.5 188.5 C 105.897 187.475 106.563 187.308 107.5 188 C 106.906 188.464 106.239 188.631 105.5 188.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 37.0001 59.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-165.0001, -187.5)'
              d='M 165.5 186.5 C 165.5 187.167 165.5 187.833 165.5 188.5 C 164.167 187.833 164.167 187.167 165.5 186.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -18.5 61.0625)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-109.5, -189.0625)'
              d='M 108.5 189.5 C 108.897 188.475 109.563 188.308 110.5 189 C 109.906 189.464 109.239 189.631 108.5 189.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 32 93)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.994",
              }}
              transform=' translate(-160, -221)'
              d='M 163.5 196.5 C 164.669 199.511 166.336 202.178 168.5 204.5 C 169.079 207.331 170.412 209.664 172.5 211.5 C 172.66 213.153 173.326 214.486 174.5 215.5 C 175.584 218.004 176.917 220.337 178.5 222.5 C 179.669 225.511 181.336 228.178 183.5 230.5 C 184.41 233.992 186.076 236.992 188.5 239.5 C 188.218 240.778 187.551 241.778 186.5 242.5 C 185.508 242.328 184.842 242.662 184.5 243.5 C 183.508 243.328 182.842 243.662 182.5 244.5 C 181.508 244.328 180.842 244.662 180.5 245.5 C 178.447 245.402 176.78 246.069 175.5 247.5 C 173.447 247.402 171.78 248.069 170.5 249.5 C 169.209 249.263 168.209 249.596 167.5 250.5 C 164.848 250.41 162.515 251.076 160.5 252.5 C 158.901 252.232 157.568 252.566 156.5 253.5 C 152.613 253.646 148.946 254.313 145.5 255.5 C 140.833 255.5 136.167 255.5 131.5 255.5 C 131.5 234.5 131.5 213.5 131.5 192.5 C 135.79 192.802 139.79 192.136 143.5 190.5 C 148.067 189.978 152.4 188.645 156.5 186.5 C 158.859 189.851 161.192 193.185 163.5 196.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -104 61.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-24, -189.7501)'
              d='M 23.5 189.5 C 24.8333 190.167 24.8333 190.167 23.5 189.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -38.9781 61.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-89.0219, -189.5)'
              d='M 88.5 188.5 C 88.8333 188.5 89.1667 188.5 89.5 188.5 C 89.6716 189.492 89.3382 190.158 88.5 190.5 C 88.5 189.833 88.5 189.167 88.5 188.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -14.5 62.043)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.009",
              }}
              transform=' translate(-113.5, -190.043)'
              d='M 111.5 190.5 C 112.601 189.402 113.934 189.235 115.5 190 C 114.207 190.49 112.873 190.657 111.5 190.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 14 62.05)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-142, -190.05)'
              d='M 143.5 190.5 C 142.448 190.649 141.448 190.483 140.5 190 C 141.749 189.26 142.749 189.427 143.5 190.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 37.978 61.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-165.9781, -189.5)'
              d='M 165.5 188.5 C 165.833 188.5 166.167 188.5 166.5 188.5 C 166.5 189.167 166.5 189.833 166.5 190.5 C 165.662 190.158 165.328 189.492 165.5 188.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 102.2499 62.0001)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,113,130)",
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-230.2499, -190.0001)'
              d='M 230.5 190.5 C 229.833 189.167 229.833 189.167 230.5 190.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -40 62.7512)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,113,130)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-88, -190.7512)'
              d='M 87.5 190.5 C 87.8333 190.5 88.1667 190.5 88.5 190.5 C 88.3147 191.17 87.9813 191.17 87.5 190.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -8.5 63.0357)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-119.5, -191.0357)'
              d='M 116.5 191.5 C 118.288 190.378 120.288 190.211 122.5 191 C 120.527 191.495 118.527 191.662 116.5 191.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 7.5 63.0357)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,114,131)",
                fillRule: "evenodd",
                opacity: "0.009",
              }}
              transform=' translate(-135.5, -191.0357)'
              d='M 132.5 191.5 C 134.288 190.378 136.288 190.211 138.5 191 C 136.527 191.495 134.527 191.662 132.5 191.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 39 62.7512)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-167, -190.7512)'
              d='M 166.5 190.5 C 166.833 190.5 167.167 190.5 167.5 190.5 C 167.315 191.17 166.981 191.17 166.5 190.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 102.9999 62.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,114,131)",
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-230.9999, -190.7501)'
              d='M 230.5 190.5 C 231.833 191.167 231.833 191.167 230.5 190.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -24.5 76.2608)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.993",
              }}
              transform=' translate(-103.5, -204.2608)'
              d='M 102.5 187.5 C 105.084 189.472 108.084 190.472 111.5 190.5 C 112.919 191.451 114.585 191.784 116.5 191.5 C 118.607 192.468 120.941 192.802 123.5 192.5 C 123.5 202.167 123.5 211.833 123.5 221.5 C 120.167 221.5 116.833 221.5 113.5 221.5 C 109.385 220.057 105.052 219.057 100.5 218.5 C 98.7857 217.262 96.7857 216.595 94.5 216.5 C 93.2196 215.069 91.5529 214.402 89.5 214.5 C 87.7274 213.108 85.7274 211.941 83.5 211 C 84.9858 208.525 86.3192 206.025 87.5 203.5 C 90.8923 198.395 94.059 193.062 97 187.5 C 98.7067 186.862 100.54 186.862 102.5 187.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -41 64.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,114,130)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-87, -192.7501)'
              d='M 86.5 192.5 C 87.8333 193.167 87.8333 193.167 86.5 192.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 40.2499 65.0001)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-168.2499, -193.0001)'
              d='M 168.5 193.5 C 167.833 192.167 167.833 192.167 168.5 193.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 101.9999 64.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-229.9999, -192.7501)'
              d='M 229.5 192.5 C 230.833 193.167 230.833 193.167 229.5 192.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -41.9781 66.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-86.0219, -194.5)'
              d='M 85.5 193.5 C 85.8333 193.5 86.1667 193.5 86.5 193.5 C 86.6716 194.492 86.3382 195.158 85.5 195.5 C 85.5 194.833 85.5 194.167 85.5 193.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 101 65.7512)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-229, -193.7512)'
              d='M 228.5 193.5 C 228.833 193.5 229.167 193.5 229.5 193.5 C 229.315 194.17 228.981 194.17 228.5 193.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 40.978 66.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-168.9781, -194.5)'
              d='M 168.5 193.5 C 168.833 193.5 169.167 193.5 169.5 193.5 C 169.5 194.167 169.5 194.833 169.5 195.5 C 168.662 195.158 168.328 194.492 168.5 193.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 2 96.4999)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-130, -224.4999)'
              d='M 130.5 255.5 C 130.167 255.5 129.833 255.5 129.5 255.5 C 129.833 172.833 130.167 172.833 130.5 255.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 36 67.4999)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-164, -195.4999)'
              d='M 164.5 196.5 C 164.167 196.5 163.833 196.5 163.5 196.5 C 163.833 193.833 164.167 193.833 164.5 196.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 99.9999 67.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-227.9999, -195.7501)'
              d='M 227.5 195.5 C 228.833 196.167 228.833 196.167 227.5 195.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -42.9781 68.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-85.0219, -196.5)'
              d='M 84.5 195.5 C 84.8333 195.5 85.1667 195.5 85.5 195.5 C 85.6716 196.492 85.3382 197.158 84.5 197.5 C 84.5 196.833 84.5 196.167 84.5 195.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -7.6974 79.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(96,119,137)",
                fillRule: "evenodd",
                opacity: 1,
              }}
              transform=' translate(-120.3026, -207.5)'
              d='M 121.5 194.5 C 122.493 202.984 122.826 211.651 122.5 220.5 C 116.833 220.336 116.5 220.003 121.5 219.5 C 121.5 211.167 121.5 202.833 121.5 194.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 36.9999 68.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-164.9999, -196.7501)'
              d='M 164.5 196.5 C 165.833 197.167 165.833 197.167 164.5 196.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 41.978 68.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-169.9781, -196.5)'
              d='M 169.5 195.5 C 169.833 195.5 170.167 195.5 170.5 195.5 C 170.5 196.167 170.5 196.833 170.5 197.5 C 169.662 197.158 169.328 196.492 169.5 195.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 99 68.7512)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,113,130)",
                fillRule: "evenodd",
                opacity: "0.016",
              }}
              transform=' translate(-227, -196.7512)'
              d='M 226.5 196.5 C 226.833 196.5 227.167 196.5 227.5 196.5 C 227.315 197.17 226.981 197.17 226.5 196.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -109.9374 69.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-18.0626, -197.5)'
              d='M 18.5 196.5 C 18.631 197.239 18.4643 197.906 18 198.5 C 17.3083 197.563 17.475 196.897 18.5 196.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -44 69.7512)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-84, -197.7512)'
              d='M 83.5 197.5 C 83.8333 197.5 84.1667 197.5 84.5 197.5 C 84.3147 198.17 83.9813 198.17 83.5 197.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 43 69.7512)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-171, -197.7512)'
              d='M 170.5 197.5 C 170.833 197.5 171.167 197.5 171.5 197.5 C 171.315 198.17 170.981 198.17 170.5 197.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 98.0219 70.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-226.0219, -198.5)'
              d='M 225.5 197.5 C 225.833 197.5 226.167 197.5 226.5 197.5 C 226.672 198.492 226.338 199.158 225.5 199.5 C 225.5 198.833 225.5 198.167 225.5 197.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -107.75 71.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,113,131)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-20.25, -199.7501)'
              d='M 20.5 199.5 C 19.8333 200.167 19.8333 200.167 20.5 199.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -45 71.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-83, -199.7501)'
              d='M 82.5 199.5 C 83.8333 200.167 83.8333 200.167 82.5 199.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 43.9999 71.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-171.9999, -199.7501)'
              d='M 171.5 199.5 C 172.833 200.167 172.833 200.167 171.5 199.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 97 71.7512)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-225, -199.7512)'
              d='M 224.5 199.5 C 224.833 199.5 225.167 199.5 225.5 199.5 C 225.315 200.17 224.981 200.17 224.5 199.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 96 72.7512)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,113,130)",
                fillRule: "evenodd",
                opacity: "0.016",
              }}
              transform=' translate(-224, -200.7512)'
              d='M 223.5 200.5 C 223.833 200.5 224.167 200.5 224.5 200.5 C 224.315 201.17 223.981 201.17 223.5 200.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -45.9781 73.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-82.0219, -201.5)'
              d='M 81.5 200.5 C 81.8333 200.5 82.1667 200.5 82.5 200.5 C 82.6716 201.492 82.3382 202.158 81.5 202.5 C 81.5 201.833 81.5 201.167 81.5 200.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 95.0219 74.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.006",
              }}
              transform=' translate(-223.0219, -202.5)'
              d='M 222.5 201.5 C 222.833 201.5 223.167 201.5 223.5 201.5 C 223.672 202.492 223.338 203.158 222.5 203.5 C 222.5 202.833 222.5 202.167 222.5 201.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -41 74.4999)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-87, -202.4999)'
              d='M 87.5 203.5 C 87.1667 203.5 86.8333 203.5 86.5 203.5 C 86.8333 200.833 87.1667 200.833 87.5 203.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 46.2499 74.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,114,131)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-174.2499, -202.7501)'
              d='M 174.5 202.5 C 173.833 203.167 173.833 203.167 174.5 202.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -46.9781 75.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,114,131)",
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-81.0219, -203.5)'
              d='M 80.5 202.5 C 80.8333 202.5 81.1667 202.5 81.5 202.5 C 81.6716 203.492 81.3382 204.158 80.5 204.5 C 80.5 203.833 80.5 203.167 80.5 202.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -41.75 75.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-86.25, -203.7501)'
              d='M 86.5 203.5 C 85.8333 204.167 85.8333 204.167 86.5 203.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 40.9999 75.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,114,130)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-168.9999, -203.7501)'
              d='M 168.5 203.5 C 169.833 204.167 169.833 204.167 168.5 203.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 94 75.7512)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-222, -203.7512)'
              d='M 221.5 203.5 C 221.833 203.5 222.167 203.5 222.5 203.5 C 222.315 204.17 221.981 204.17 221.5 203.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -104.9374 76.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-23.0626, -204.5)'
              d='M 23.5 203.5 C 23.631 204.239 23.4643 204.906 23 205.5 C 22.3083 204.563 22.475 203.897 23.5 203.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -48 76.7512)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,114,130)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-80, -204.7512)'
              d='M 79.5 204.5 C 79.8333 204.5 80.1667 204.5 80.5 204.5 C 80.3147 205.17 79.9813 205.17 79.5 204.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 93 76.7512)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-221, -204.7512)'
              d='M 220.5 204.5 C 220.833 204.5 221.167 204.5 221.5 204.5 C 221.315 205.17 220.981 205.17 220.5 204.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 92 77.7512)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.016",
              }}
              transform=' translate(-220, -205.7512)'
              d='M 219.5 205.5 C 219.833 205.5 220.167 205.5 220.5 205.5 C 220.315 206.17 219.981 206.17 219.5 205.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -49 78.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,113,130)",
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-79, -206.7501)'
              d='M 78.5 206.5 C 79.8333 207.167 79.8333 207.167 78.5 206.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 91 78.7512)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,113,131)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-219, -206.7512)'
              d='M 218.5 206.5 C 218.833 206.5 219.167 206.5 219.5 206.5 C 219.315 207.17 218.981 207.17 218.5 206.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -49.9781 80.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-78.0219, -208.5)'
              d='M 77.5 207.5 C 77.8333 207.5 78.1667 207.5 78.5 207.5 C 78.6716 208.492 78.3382 209.158 77.5 209.5 C 77.5 208.833 77.5 208.167 77.5 207.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 49.0001 80.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-177.0001, -208.5)'
              d='M 177.5 207.5 C 177.5 208.167 177.5 208.833 177.5 209.5 C 176.167 208.833 176.167 208.167 177.5 207.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -51 81.7512)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,114,131)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-77, -209.7512)'
              d='M 76.5 209.5 C 76.8333 209.5 77.1667 209.5 77.5 209.5 C 77.3147 210.17 76.9813 210.17 76.5 209.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 50 81.7512)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-178, -209.7512)'
              d='M 177.5 209.5 C 177.833 209.5 178.167 209.5 178.5 209.5 C 178.315 210.17 177.981 210.17 177.5 209.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 44.9999 82.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-172.9999, -210.7501)'
              d='M 172.5 210.5 C 173.833 211.167 173.833 211.167 172.5 210.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -52 83.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,114,131)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-76, -211.7501)'
              d='M 75.5 211.5 C 76.8333 212.167 76.8333 212.167 75.5 211.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 50.9999 83.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,114,130)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-178.9999, -211.7501)'
              d='M 178.5 211.5 C 179.833 212.167 179.833 212.167 178.5 211.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -52.9781 85.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-75.0219, -213.5)'
              d='M 74.5 212.5 C 74.8333 212.5 75.1667 212.5 75.5 212.5 C 75.6716 213.492 75.3382 214.158 74.5 214.5 C 74.5 213.833 74.5 213.167 74.5 212.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -39.5 86.9375)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-88.5, -214.9375)'
              d='M 89.5 214.5 C 89.1034 215.525 88.4368 215.692 87.5 215 C 88.0944 214.536 88.7611 214.369 89.5 214.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 47 86.4999)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-175, -214.4999)'
              d='M 175.5 215.5 C 175.167 215.5 174.833 215.5 174.5 215.5 C 174.833 212.833 175.167 212.833 175.5 215.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -53.9781 87.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-74.0219, -215.5)'
              d='M 73.5 214.5 C 73.8333 214.5 74.1667 214.5 74.5 214.5 C 74.6716 215.492 74.3382 216.158 73.5 216.5 C 73.5 215.833 73.5 215.167 73.5 214.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 47.9999 87.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-175.9999, -215.7501)'
              d='M 175.5 215.5 C 176.833 216.167 176.833 216.167 175.5 215.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -55 88.7512)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-73, -216.7512)'
              d='M 72.5 216.5 C 72.8333 216.5 73.1667 216.5 73.5 216.5 C 73.3147 217.17 72.9813 217.17 72.5 216.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -34.5 88.9375)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-93.5, -216.9375)'
              d='M 94.5 216.5 C 94.1034 217.525 93.4368 217.692 92.5 217 C 93.0944 216.536 93.7611 216.369 94.5 216.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 54.2499 88.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-182.2499, -216.7501)'
              d='M 182.5 216.5 C 181.833 217.167 181.833 217.167 182.5 216.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -56 90.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-72, -218.7501)'
              d='M 71.5 218.5 C 72.8333 219.167 72.8333 219.167 71.5 218.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -29 90.9501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-99, -218.95)'
              d='M 100.5 218.5 C 99.7494 219.573 98.7494 219.74 97.5 219 C 98.448 218.517 99.448 218.351 100.5 218.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 55.2499 91.0001)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-183.2499, -219.0001)'
              d='M 183.5 219.5 C 182.833 218.167 182.833 218.167 183.5 219.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 78.9999 90.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,114,131)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-206.9999, -218.7501)'
              d='M 206.5 218.5 C 207.833 219.167 207.833 219.167 206.5 218.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -25.5 92.0625)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-102.5, -220.0625)'
              d='M 101.5 220.5 C 101.897 219.475 102.563 219.308 103.5 220 C 102.906 220.464 102.239 220.631 101.5 220.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 78 91.7512)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,114,131)",
                fillRule: "evenodd",
                opacity: "0.016",
              }}
              transform=' translate(-206, -219.7512)'
              d='M 205.5 219.5 C 205.833 219.5 206.167 219.5 206.5 219.5 C 206.315 220.17 205.981 220.17 205.5 219.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -56.9781 92.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-71.0219, -220.5)'
              d='M 70.5 219.5 C 70.8333 219.5 71.1667 219.5 71.5 219.5 C 71.6716 220.492 71.3382 221.158 70.5 221.5 C 70.5 220.833 70.5 220.167 70.5 219.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -22 93.05)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-106, -221.05)'
              d='M 104.5 221.5 C 105.251 220.427 106.251 220.26 107.5 221 C 106.552 221.483 105.552 221.649 104.5 221.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 55.978 92.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-183.9781, -220.5)'
              d='M 183.5 219.5 C 183.833 219.5 184.167 219.5 184.5 219.5 C 184.5 220.167 184.5 220.833 184.5 221.5 C 183.662 221.158 183.328 220.492 183.5 219.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 77 92.7512)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,114,131)",
                fillRule: "evenodd",
                opacity: "0.016",
              }}
              transform=' translate(-205, -220.7512)'
              d='M 204.5 220.5 C 204.833 220.5 205.167 220.5 205.5 220.5 C 205.315 221.17 204.981 221.17 204.5 220.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -16.5 93.9569)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.01",
              }}
              transform=' translate(-111.5, -221.957)'
              d='M 113.5 221.5 C 112.399 222.598 111.066 222.765 109.5 222 C 110.793 221.51 112.127 221.343 113.5 221.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 51 93.4999)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-179, -221.4999)'
              d='M 179.5 222.5 C 179.167 222.5 178.833 222.5 178.5 222.5 C 178.833 219.833 179.167 219.833 179.5 222.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 76 93.7512)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-204, -221.7512)'
              d='M 203.5 221.5 C 203.833 221.5 204.167 221.5 204.5 221.5 C 204.315 222.17 203.981 222.17 203.5 221.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -57.9781 94.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-70.0219, -222.5)'
              d='M 69.5 221.5 C 69.8333 221.5 70.1667 221.5 70.5 221.5 C 70.6716 222.492 70.3382 223.158 69.5 223.5 C 69.5 222.833 69.5 222.167 69.5 221.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -9.5 95.0319)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.01",
              }}
              transform=' translate(-118.5, -223.0319)'
              d='M 114.5 223.5 C 116.966 222.366 119.633 222.199 122.5 223 C 119.854 223.497 117.187 223.664 114.5 223.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 51.9999 94.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-179.9999, -222.7501)'
              d='M 179.5 222.5 C 180.833 223.167 180.833 223.167 179.5 222.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 57 94.5001)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-185, -222.5001)'
              d='M 184.5 221.5 C 184.833 221.5 185.167 221.5 185.5 221.5 C 185.167 224.167 184.833 224.167 184.5 221.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 75.2499 94.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-203.2499, -222.7501)'
              d='M 203.5 222.5 C 202.833 223.167 202.833 223.167 203.5 222.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -59 95.7512)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,114,131)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-69, -223.7512)'
              d='M 68.5 223.5 C 68.8333 223.5 69.1667 223.5 69.5 223.5 C 69.3147 224.17 68.9813 224.17 68.5 223.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 72.9999 95.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-200.9999, -223.7501)'
              d='M 200.5 223.5 C 201.833 224.167 201.833 224.167 200.5 223.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 72 96.7512)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.016",
              }}
              transform=' translate(-200, -224.7512)'
              d='M 199.5 224.5 C 199.833 224.5 200.167 224.5 200.5 224.5 C 200.315 225.17 199.981 225.17 199.5 224.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -60 97.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,113,130)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-68, -225.7501)'
              d='M 67.5 225.5 C 68.8333 226.167 68.8333 226.167 67.5 225.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 59.0001 97.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-187.0001, -225.5)'
              d='M 187.5 224.5 C 187.5 225.167 187.5 225.833 187.5 226.5 C 186.167 225.833 186.167 225.167 187.5 224.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 71.2499 97.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-199.2499, -225.7501)'
              d='M 199.5 225.5 C 198.833 226.167 198.833 226.167 199.5 225.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 68.9999 98.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,114,130)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-196.9999, -226.7501)'
              d='M 196.5 226.5 C 197.833 227.167 197.833 227.167 196.5 226.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -60.9781 99.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-67.0219, -227.5)'
              d='M 66.5 226.5 C 66.8333 226.5 67.1667 226.5 67.5 226.5 C 67.6716 227.492 67.3382 228.158 66.5 228.5 C 66.5 227.833 66.5 227.167 66.5 226.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 60 99.5001)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-188, -227.5001)'
              d='M 187.5 226.5 C 187.833 226.5 188.167 226.5 188.5 226.5 C 188.167 229.167 187.833 229.167 187.5 226.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 68 99.7512)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,114,131)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-196, -227.7512)'
              d='M 195.5 227.5 C 195.833 227.5 196.167 227.5 196.5 227.5 C 196.315 228.17 195.981 228.17 195.5 227.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 66.5 101.0219)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-194.5, -229.0219)'
              d='M 193.5 229.5 C 193.5 229.167 193.5 228.833 193.5 228.5 C 194.167 228.5 194.833 228.5 195.5 228.5 C 195.158 229.338 194.492 229.672 193.5 229.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -61.9781 101.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-66.0219, -229.5)'
              d='M 65.5 228.5 C 65.8333 228.5 66.1667 228.5 66.5 228.5 C 66.6716 229.492 66.3382 230.158 65.5 230.5 C 65.5 229.833 65.5 229.167 65.5 228.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 55.9999 101.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-183.9999, -229.7501)'
              d='M 183.5 229.5 C 184.833 230.167 184.833 230.167 183.5 229.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 65 101.7512)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-193, -229.7512)'
              d='M 192.5 229.5 C 192.833 229.5 193.167 229.5 193.5 229.5 C 193.315 230.17 192.981 230.17 192.5 229.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -78.7513 103)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,114,130)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-49.2487, -231)'
              d='M 49.5 230.5 C 49.5 230.833 49.5 231.167 49.5 231.5 C 48.8299 231.019 48.8299 230.685 49.5 230.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -63 102.7512)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-65, -230.7512)'
              d='M 64.5 230.5 C 64.8333 230.5 65.1667 230.5 65.5 230.5 C 65.3147 231.17 64.9813 231.17 64.5 230.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 63.5 102.9375)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.006",
              }}
              transform=' translate(-191.5, -230.9375)'
              d='M 192.5 230.5 C 192.103 231.525 191.437 231.692 190.5 231 C 191.094 230.536 191.761 230.369 192.5 230.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -78 103.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,114,130)",
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-50, -231.7501)'
              d='M 49.5 231.5 C 50.8333 232.167 50.8333 232.167 49.5 231.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -64 104.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-64, -232.7501)'
              d='M 63.5 232.5 C 64.8333 233.167 64.8333 233.167 63.5 232.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -64.9781 106.5)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,112,131)",
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-63.0219, -234.5)'
              d='M 62.5 233.5 C 62.8333 233.5 63.1667 233.5 63.5 233.5 C 63.6716 234.492 63.3382 235.158 62.5 235.5 C 62.5 234.833 62.5 234.167 62.5 233.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -66 107.7512)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,114,131)",
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-62, -235.7512)'
              d='M 61.5 235.5 C 61.8333 235.5 62.1667 235.5 62.5 235.5 C 62.3147 236.17 61.9813 236.17 61.5 235.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -67 108.7512)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-61, -236.7512)'
              d='M 60.5 236.5 C 60.8333 236.5 61.1667 236.5 61.5 236.5 C 61.3147 237.17 60.9813 237.17 60.5 236.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 -68.5 109.9375)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-59.5, -237.9375)'
              d='M 60.5 237.5 C 60.1034 238.525 59.4368 238.692 58.5 238 C 59.0944 237.536 59.7611 237.369 60.5 237.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 61 110.4999)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,114,131)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-189, -238.4999)'
              d='M 189.5 239.5 C 189.167 239.5 188.833 239.5 188.5 239.5 C 188.833 236.833 189.167 236.833 189.5 239.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 61.9999 111.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,113,130)",
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-189.9999, -239.7501)'
              d='M 189.5 239.5 C 190.833 240.167 190.833 240.167 189.5 239.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 58.9999 114.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,114,130)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-186.9999, -242.7501)'
              d='M 186.5 242.5 C 187.833 243.167 187.833 243.167 186.5 242.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 57.5 116.0219)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.004",
              }}
              transform=' translate(-185.5, -244.0219)'
              d='M 184.5 244.5 C 184.5 244.167 184.5 243.833 184.5 243.5 C 185.167 243.5 185.833 243.5 186.5 243.5 C 186.158 244.338 185.492 244.672 184.5 244.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 55.5 117.0219)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(90,113,130)",
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-183.5, -245.0219)'
              d='M 182.5 245.5 C 182.5 245.167 182.5 244.833 182.5 244.5 C 183.167 244.5 183.833 244.5 184.5 244.5 C 184.158 245.338 183.492 245.672 182.5 245.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 53.5 117.9999)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-181.5, -245.9999)'
              d='M 180.5 245.5 C 181.167 245.5 181.833 245.5 182.5 245.5 C 181.833 246.833 181.167 246.833 180.5 245.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 50.9999 118.7501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(91,114,131)",
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-178.9999, -246.7501)'
              d='M 178.5 246.5 C 179.833 247.167 179.833 247.167 178.5 246.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 48.5001 120)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-176.5001, -248)'
              d='M 175.5 248.5 C 175.5 248.167 175.5 247.833 175.5 247.5 C 178.167 247.833 178.167 248.167 175.5 248.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 46.5 120.9375)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-174.5, -248.9375)'
              d='M 175.5 248.5 C 175.103 249.525 174.437 249.692 173.5 249 C 174.094 248.536 174.761 248.369 175.5 248.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 43.5 121.9375)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-171.5, -249.9375)'
              d='M 170.5 249.5 C 171.239 249.369 171.906 249.536 172.5 250 C 171.563 250.692 170.897 250.525 170.5 249.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 40.5 122.9375)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-168.5, -250.9375)'
              d='M 167.5 250.5 C 168.239 250.369 168.906 250.536 169.5 251 C 168.563 251.692 167.897 251.525 167.5 250.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 37.5 124.0625)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-165.5, -252.0625)'
              d='M 164.5 252.5 C 164.897 251.475 165.563 251.308 166.5 252 C 165.906 252.464 165.239 252.631 164.5 252.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 34 124.9501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-162, -252.95)'
              d='M 160.5 252.5 C 161.552 252.351 162.552 252.517 163.5 253 C 162.251 253.74 161.251 253.573 160.5 252.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 30 125.9501)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.012",
              }}
              transform=' translate(-158, -253.95)'
              d='M 156.5 253.5 C 157.552 253.351 158.552 253.517 159.5 254 C 158.251 254.74 157.251 254.573 156.5 253.5 Z'
              strokeLinecap='round'
            />
          </g>
          <g transform='matrix(1 0 0 1 26 127.0001)'>
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: appThemeBgColor,
                fillRule: "evenodd",
                opacity: "0.008",
              }}
              transform=' translate(-154, -255.0001)'
              d='M 152.5 255.5 C 153.5 254.167 154.5 254.167 155.5 255.5 C 154.5 255.5 153.5 255.5 152.5 255.5 Z'
              strokeLinecap='round'
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default React.memo(CircularBarChartSvg);
