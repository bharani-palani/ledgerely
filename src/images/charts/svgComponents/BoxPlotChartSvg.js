import React, { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

export const BoxPlotChartSvg = () => {
  const userContext = useContext(UserContext);
  const appThemeBgColor =
    userContext.userData.theme === "dark"
      ? getComputedStyle(document.documentElement).getPropertyValue("--app-theme-bg-color")
      : getComputedStyle(document.documentElement).getPropertyValue("--app-theme-color");
  return (
    <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' width='25px' height='25px' viewBox='0 0 25 25' version='1.1'>
      <defs>
        <filter id='alpha' filterUnits='objectBoundingBox' x='0%' y='0%' width='100%' height='100%'>
          <feColorMatrix type='matrix' in='SourceGraphic' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0' />
        </filter>
        <mask id='mask0'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0196078",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip1'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface5' clipPath='url(#clip1)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M -0.046875 -0.046875 C 0.015625 -0.046875 0.0820312 -0.046875 0.148438 -0.046875 C 0.113281 0.046875 0.046875 0.113281 -0.046875 0.148438 C -0.046875 0.0820312 -0.046875 0.015625 -0.046875 -0.046875 Z M -0.046875 -0.046875 '
          />
        </g>
        <mask id='mask1'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip2'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface8' clipPath='url(#clip2)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 1.609375 -0.046875 C 1.773438 -0.046875 1.9375 -0.046875 2.101562 -0.046875 C 1.414062 0.699219 0.699219 1.414062 -0.046875 2.101562 C -0.046875 1.9375 -0.046875 1.773438 -0.046875 1.609375 C 0.539062 1.089844 1.089844 0.539062 1.609375 -0.046875 Z M 1.609375 -0.046875 '
          />
        </g>
        <mask id='mask2'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip3'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface11' clipPath='url(#clip3)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 3.5625 -0.046875 C 3.726562 -0.046875 3.890625 -0.046875 4.054688 -0.046875 C 2.71875 1.351562 1.351562 2.71875 -0.046875 4.054688 C -0.046875 3.890625 -0.046875 3.726562 -0.046875 3.5625 C 1.1875 2.390625 2.390625 1.1875 3.5625 -0.046875 Z M 3.5625 -0.046875 '
          />
        </g>
        <mask id='mask3'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip4'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface14' clipPath='url(#clip4)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 5.515625 -0.046875 C 5.679688 -0.046875 5.84375 -0.046875 6.007812 -0.046875 C 4.019531 2 2 4.019531 -0.046875 6.007812 C -0.046875 5.84375 -0.046875 5.679688 -0.046875 5.515625 C 1.839844 3.695312 3.695312 1.839844 5.515625 -0.046875 Z M 5.515625 -0.046875 '
          />
        </g>
        <mask id='mask4'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip5'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface17' clipPath='url(#clip5)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 7.46875 -0.046875 C 7.632812 -0.046875 7.796875 -0.046875 7.960938 -0.046875 C 6.949219 0.992188 5.941406 2.035156 4.929688 3.078125 C 4.769531 3.078125 4.605469 3.078125 4.445312 3.078125 C 5.453125 2.035156 6.460938 0.992188 7.46875 -0.046875 Z M 7.46875 -0.046875 '
          />
        </g>
        <mask id='mask5'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip6'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface20' clipPath='url(#clip6)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 9.421875 -0.046875 C 9.585938 -0.046875 9.75 -0.046875 9.914062 -0.046875 C 8.316406 1.609375 6.6875 3.238281 5.03125 4.835938 C 5.03125 4.671875 5.03125 4.507812 5.03125 4.34375 C 6.527344 2.914062 7.992188 1.449219 9.421875 -0.046875 Z M 9.421875 -0.046875 '
          />
        </g>
        <mask id='mask6'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip7'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface23' clipPath='url(#clip7)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 11.375 -0.046875 C 11.539062 -0.046875 11.703125 -0.046875 11.867188 -0.046875 C 9.617188 2.261719 7.339844 4.539062 5.03125 6.789062 C 5.03125 6.625 5.03125 6.460938 5.03125 6.296875 C 7.179688 4.214844 9.292969 2.101562 11.375 -0.046875 Z M 11.375 -0.046875 '
          />
        </g>
        <mask id='mask7'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip8'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface26' clipPath='url(#clip8)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 13.328125 -0.046875 C 13.492188 -0.046875 13.65625 -0.046875 13.820312 -0.046875 C 11.375 2.425781 8.9375 4.898438 6.492188 7.375 C 6.332031 7.375 6.167969 7.375 6.007812 7.375 C 8.445312 4.898438 10.890625 2.425781 13.328125 -0.046875 Z M 13.328125 -0.046875 '
          />
        </g>
        <mask id='mask8'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip9'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface29' clipPath='url(#clip9)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 15.28125 -0.046875 C 15.445312 -0.046875 15.609375 -0.046875 15.773438 -0.046875 C 14.761719 0.992188 13.753906 2.035156 12.742188 3.078125 C 12.582031 3.078125 12.417969 3.078125 12.257812 3.078125 C 13.265625 2.035156 14.273438 0.992188 15.28125 -0.046875 Z M 15.28125 -0.046875 '
          />
        </g>
        <mask id='mask9'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip10'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface32' clipPath='url(#clip10)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 17.234375 -0.046875 C 17.398438 -0.046875 17.5625 -0.046875 17.726562 -0.046875 C 16.128906 1.609375 14.5 3.238281 12.84375 4.835938 C 12.84375 4.671875 12.84375 4.507812 12.84375 4.34375 C 14.339844 2.914062 15.804688 1.449219 17.234375 -0.046875 Z M 17.234375 -0.046875 '
          />
        </g>
        <mask id='mask10'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip11'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface35' clipPath='url(#clip11)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 19.1875 -0.046875 C 19.351562 -0.046875 19.515625 -0.046875 19.679688 -0.046875 C 17.429688 2.261719 15.152344 4.539062 12.84375 6.789062 C 12.84375 6.625 12.84375 6.460938 12.84375 6.296875 C 14.992188 4.214844 17.105469 2.101562 19.1875 -0.046875 Z M 19.1875 -0.046875 '
          />
        </g>
        <mask id='mask11'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip12'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface38' clipPath='url(#clip12)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 21.140625 -0.046875 C 21.304688 -0.046875 21.46875 -0.046875 21.632812 -0.046875 C 18.734375 2.914062 15.804688 5.84375 12.84375 8.742188 C 12.84375 8.578125 12.84375 8.414062 12.84375 8.25 C 15.640625 5.515625 18.40625 2.75 21.140625 -0.046875 Z M 21.140625 -0.046875 '
          />
        </g>
        <mask id='mask12'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip13'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface41' clipPath='url(#clip13)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 23.09375 -0.046875 C 23.257812 -0.046875 23.421875 -0.046875 23.585938 -0.046875 C 22.574219 0.992188 21.566406 2.035156 20.554688 3.078125 C 20.394531 3.078125 20.230469 3.078125 20.070312 3.078125 C 21.078125 2.035156 22.085938 0.992188 23.09375 -0.046875 Z M 23.09375 -0.046875 '
          />
        </g>
        <mask id='mask13'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip14'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface44' clipPath='url(#clip14)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 24.953125 0.148438 C 24.953125 0.308594 24.953125 0.472656 24.953125 0.632812 C 23.519531 2.035156 22.085938 3.433594 20.65625 4.835938 C 20.65625 4.671875 20.65625 4.507812 20.65625 4.34375 C 22.085938 2.945312 23.519531 1.546875 24.953125 0.148438 Z M 24.953125 0.148438 '
          />
        </g>
        <mask id='mask14'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip15'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface47' clipPath='url(#clip15)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 24.953125 2.101562 C 24.953125 2.261719 24.953125 2.425781 24.953125 2.585938 C 23.84375 3.628906 22.769531 4.703125 21.726562 5.8125 C 21.566406 5.8125 21.402344 5.8125 21.242188 5.8125 C 22.445312 4.539062 23.679688 3.304688 24.953125 2.101562 Z M 24.953125 2.101562 '
          />
        </g>
        <mask id='mask15'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip16'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface50' clipPath='url(#clip16)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 4.25 3.273438 C 4.25 3.433594 4.25 3.597656 4.25 3.757812 C 2.816406 5.160156 1.382812 6.558594 -0.046875 7.960938 C -0.046875 7.796875 -0.046875 7.632812 -0.046875 7.46875 C 1.382812 6.070312 2.816406 4.671875 4.25 3.273438 Z M 4.25 3.273438 '
          />
        </g>
        <mask id='mask16'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip17'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface53' clipPath='url(#clip17)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 12.0625 3.273438 C 12.0625 3.433594 12.0625 3.597656 12.0625 3.757812 C 10.238281 5.550781 8.414062 7.339844 6.59375 9.132812 C 6.59375 8.96875 6.59375 8.804688 6.59375 8.640625 C 8.414062 6.851562 10.238281 5.0625 12.0625 3.273438 Z M 12.0625 3.273438 '
          />
        </g>
        <mask id='mask17'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip18'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface56' clipPath='url(#clip18)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 19.875 3.273438 C 19.875 3.433594 19.875 3.597656 19.875 3.757812 C 17.53125 6.070312 15.1875 8.382812 12.84375 10.695312 C 12.84375 10.53125 12.84375 10.367188 12.84375 10.203125 C 15.1875 7.894531 17.53125 5.582031 19.875 3.273438 Z M 19.875 3.273438 '
          />
        </g>
        <mask id='mask18'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip19'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface59' clipPath='url(#clip19)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 24.953125 4.054688 C 24.953125 4.214844 24.953125 4.378906 24.953125 4.539062 C 24.039062 5.421875 23.128906 6.296875 22.21875 7.179688 C 22.21875 7.015625 22.21875 6.851562 22.21875 6.6875 C 23.128906 5.8125 24.039062 4.929688 24.953125 4.054688 Z M 24.953125 4.054688 '
          />
        </g>
        <mask id='mask19'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip20'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface62' clipPath='url(#clip20)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 4.25 5.226562 C 4.25 5.386719 4.25 5.550781 4.25 5.710938 C 2.816406 7.113281 1.382812 8.511719 -0.046875 9.914062 C -0.046875 9.75 -0.046875 9.585938 -0.046875 9.421875 C 1.382812 8.023438 2.816406 6.625 4.25 5.226562 Z M 4.25 5.226562 '
          />
        </g>
        <mask id='mask20'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip21'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface65' clipPath='url(#clip21)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 12.0625 5.226562 C 12.0625 5.386719 12.0625 5.550781 12.0625 5.710938 C 10.238281 7.503906 8.414062 9.292969 6.59375 11.085938 C 6.59375 10.921875 6.59375 10.757812 6.59375 10.59375 C 8.414062 8.804688 10.238281 7.015625 12.0625 5.226562 Z M 12.0625 5.226562 '
          />
        </g>
        <mask id='mask21'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip22'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface68' clipPath='url(#clip22)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 19.875 5.226562 C 19.875 5.386719 19.875 5.550781 19.875 5.710938 C 19.808594 5.710938 19.773438 5.746094 19.773438 5.8125 C 19.613281 5.8125 19.449219 5.8125 19.289062 5.8125 C 19.449219 5.582031 19.644531 5.386719 19.875 5.226562 Z M 19.875 5.226562 '
          />
        </g>
        <mask id='mask22'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip23'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface71' clipPath='url(#clip23)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 24.953125 6.007812 C 24.953125 6.167969 24.953125 6.332031 24.953125 6.492188 C 24.039062 7.375 23.128906 8.25 22.21875 9.132812 C 22.21875 8.96875 22.21875 8.804688 22.21875 8.640625 C 23.128906 7.765625 24.039062 6.882812 24.953125 6.007812 Z M 24.953125 6.007812 '
          />
        </g>
        <mask id='mask23'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip24'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface74' clipPath='url(#clip24)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 20.359375 6.59375 C 20.523438 6.59375 20.6875 6.59375 20.851562 6.59375 C 20.296875 7.210938 19.710938 7.796875 19.09375 8.351562 C 19.09375 8.1875 19.09375 8.023438 19.09375 7.859375 C 19.546875 7.46875 19.96875 7.046875 20.359375 6.59375 Z M 20.359375 6.59375 '
          />
        </g>
        <mask id='mask24'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip25'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface77' clipPath='url(#clip25)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 18.3125 6.789062 C 18.3125 6.949219 18.3125 7.113281 18.3125 7.273438 C 16.683594 8.835938 15.085938 10.433594 13.523438 12.0625 C 13.363281 12.0625 13.199219 12.0625 13.039062 12.0625 C 14.761719 10.269531 16.519531 8.511719 18.3125 6.789062 Z M 18.3125 6.789062 '
          />
        </g>
        <mask id='mask25'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0196078",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip26'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface80' clipPath='url(#clip26)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 4.25 7.179688 C 4.25 7.308594 4.183594 7.375 4.054688 7.375 C 4.085938 7.273438 4.148438 7.210938 4.25 7.179688 Z M 4.25 7.179688 '
          />
        </g>
        <mask id='mask26'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip27'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface83' clipPath='url(#clip27)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 12.0625 7.179688 C 12.0625 7.339844 12.0625 7.503906 12.0625 7.664062 C 10.238281 9.457031 8.414062 11.246094 6.59375 13.039062 C 6.59375 12.875 6.59375 12.710938 6.59375 12.546875 C 8.414062 10.757812 10.238281 8.96875 12.0625 7.179688 Z M 12.0625 7.179688 '
          />
        </g>
        <mask id='mask27'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip28'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface86' clipPath='url(#clip28)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 21.4375 7.570312 C 21.4375 7.730469 21.4375 7.894531 21.4375 8.054688 C 20.65625 8.804688 19.875 9.554688 19.09375 10.304688 C 19.09375 10.140625 19.09375 9.976562 19.09375 9.8125 C 19.875 9.066406 20.65625 8.316406 21.4375 7.570312 Z M 21.4375 7.570312 '
          />
        </g>
        <mask id='mask28'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip29'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface89' clipPath='url(#clip29)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 24.953125 7.960938 C 24.953125 8.121094 24.953125 8.285156 24.953125 8.445312 C 24.039062 9.328125 23.128906 10.203125 22.21875 11.085938 C 22.21875 10.921875 22.21875 10.757812 22.21875 10.59375 C 23.128906 9.71875 24.039062 8.835938 24.953125 7.960938 Z M 24.953125 7.960938 '
          />
        </g>
        <mask id='mask29'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0196078",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip30'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface92' clipPath='url(#clip30)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 3.664062 8.15625 C 3.628906 8.25 3.5625 8.316406 3.46875 8.351562 C 3.46875 8.21875 3.53125 8.15625 3.664062 8.15625 Z M 3.664062 8.15625 '
          />
        </g>
        <mask id='mask30'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip31'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface95' clipPath='url(#clip31)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 5.125 8.15625 C 5.289062 8.15625 5.453125 8.15625 5.617188 8.15625 C 4.929688 8.902344 4.214844 9.617188 3.46875 10.304688 C 3.46875 10.140625 3.46875 9.976562 3.46875 9.8125 C 4.054688 9.292969 4.605469 8.742188 5.125 8.15625 Z M 5.125 8.15625 '
          />
        </g>
        <mask id='mask31'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip32'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface98' clipPath='url(#clip32)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 2.6875 8.742188 C 2.6875 8.902344 2.6875 9.066406 2.6875 9.226562 C 1.773438 10.109375 0.863281 10.984375 -0.046875 11.867188 C -0.046875 11.703125 -0.046875 11.539062 -0.046875 11.375 C 0.863281 10.5 1.773438 9.617188 2.6875 8.742188 Z M 2.6875 8.742188 '
          />
        </g>
        <mask id='mask32'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip33'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface101' clipPath='url(#clip33)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 18.3125 8.742188 C 18.3125 8.902344 18.3125 9.066406 18.3125 9.226562 C 17.007812 10.5 15.707031 11.765625 14.40625 13.039062 C 14.40625 12.875 14.40625 12.710938 14.40625 12.546875 C 15.707031 11.28125 17.007812 10.007812 18.3125 8.742188 Z M 18.3125 8.742188 '
          />
        </g>
        <mask id='mask33'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip34'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface104' clipPath='url(#clip34)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 12.0625 9.132812 C 12.0625 9.292969 12.0625 9.457031 12.0625 9.617188 C 10.238281 11.410156 8.414062 13.199219 6.59375 14.992188 C 6.59375 14.828125 6.59375 14.664062 6.59375 14.5 C 8.414062 12.710938 10.238281 10.921875 12.0625 9.132812 Z M 12.0625 9.132812 '
          />
        </g>
        <mask id='mask34'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip35'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface107' clipPath='url(#clip35)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 5.8125 9.523438 C 5.8125 9.683594 5.8125 9.847656 5.8125 10.007812 C 5.03125 10.757812 4.25 11.507812 3.46875 12.257812 C 3.46875 12.09375 3.46875 11.929688 3.46875 11.765625 C 4.25 11.019531 5.03125 10.269531 5.8125 9.523438 Z M 5.8125 9.523438 '
          />
        </g>
        <mask id='mask35'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip36'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface110' clipPath='url(#clip36)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 21.4375 9.523438 C 21.4375 9.683594 21.4375 9.847656 21.4375 10.007812 C 20.65625 10.757812 19.875 11.507812 19.09375 12.257812 C 19.09375 12.09375 19.09375 11.929688 19.09375 11.765625 C 19.875 11.019531 20.65625 10.269531 21.4375 9.523438 Z M 21.4375 9.523438 '
          />
        </g>
        <mask id='mask36'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip37'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface113' clipPath='url(#clip37)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 24.953125 9.914062 C 24.953125 10.074219 24.953125 10.238281 24.953125 10.398438 C 24.039062 11.28125 23.128906 12.15625 22.21875 13.039062 C 22.21875 12.875 22.21875 12.710938 22.21875 12.546875 C 23.128906 11.671875 24.039062 10.789062 24.953125 9.914062 Z M 24.953125 9.914062 '
          />
        </g>
        <mask id='mask37'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip38'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface116' clipPath='url(#clip38)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 2.6875 10.695312 C 2.6875 10.855469 2.6875 11.019531 2.6875 11.179688 C 1.773438 12.0625 0.863281 12.9375 -0.046875 13.820312 C -0.046875 13.65625 -0.046875 13.492188 -0.046875 13.328125 C 0.863281 12.453125 1.773438 11.570312 2.6875 10.695312 Z M 2.6875 10.695312 '
          />
        </g>
        <mask id='mask38'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip39'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface119' clipPath='url(#clip39)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 18.3125 10.695312 C 18.3125 10.855469 18.3125 11.019531 18.3125 11.179688 C 17.007812 12.453125 15.707031 13.71875 14.40625 14.992188 C 14.40625 14.828125 14.40625 14.664062 14.40625 14.5 C 15.707031 13.234375 17.007812 11.960938 18.3125 10.695312 Z M 18.3125 10.695312 '
          />
        </g>
        <mask id='mask39'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip40'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface122' clipPath='url(#clip40)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 12.0625 11.085938 C 12.0625 11.246094 12.0625 11.410156 12.0625 11.570312 C 11.867188 11.703125 11.703125 11.867188 11.570312 12.0625 C 11.410156 12.0625 11.246094 12.0625 11.085938 12.0625 C 11.375 11.703125 11.703125 11.375 12.0625 11.085938 Z M 12.0625 11.085938 '
          />
        </g>
        <mask id='mask40'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip41'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface125' clipPath='url(#clip41)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 5.8125 11.476562 C 5.8125 11.636719 5.8125 11.800781 5.8125 11.960938 C 5.03125 12.710938 4.25 13.460938 3.46875 14.210938 C 3.46875 14.046875 3.46875 13.882812 3.46875 13.71875 C 4.25 12.972656 5.03125 12.222656 5.8125 11.476562 Z M 5.8125 11.476562 '
          />
        </g>
        <mask id='mask41'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip42'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface128' clipPath='url(#clip42)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 21.4375 11.476562 C 21.4375 11.636719 21.4375 11.800781 21.4375 11.960938 C 20.65625 12.710938 19.875 13.460938 19.09375 14.210938 C 19.09375 14.046875 19.09375 13.882812 19.09375 13.71875 C 19.875 12.972656 20.65625 12.222656 21.4375 11.476562 Z M 21.4375 11.476562 '
          />
        </g>
        <mask id='mask42'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip43'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface131' clipPath='url(#clip43)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 24.953125 11.867188 C 24.953125 12.027344 24.953125 12.191406 24.953125 12.351562 C 24.039062 13.234375 23.128906 14.109375 22.21875 14.992188 C 22.21875 14.828125 22.21875 14.664062 22.21875 14.5 C 23.128906 13.625 24.039062 12.742188 24.953125 11.867188 Z M 24.953125 11.867188 '
          />
        </g>
        <mask id='mask43'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip44'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface134' clipPath='url(#clip44)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 2.6875 12.648438 C 2.6875 12.808594 2.6875 12.972656 2.6875 13.132812 C 1.773438 14.015625 0.863281 14.890625 -0.046875 15.773438 C -0.046875 15.609375 -0.046875 15.445312 -0.046875 15.28125 C 0.863281 14.40625 1.773438 13.523438 2.6875 12.648438 Z M 2.6875 12.648438 '
          />
        </g>
        <mask id='mask44'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip45'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface137' clipPath='url(#clip45)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 10.5 12.648438 C 10.5 12.808594 10.5 12.972656 10.5 13.132812 C 8.675781 14.925781 6.851562 16.714844 5.03125 18.507812 C 5.03125 18.34375 5.03125 18.179688 5.03125 18.015625 C 6.851562 16.226562 8.675781 14.4375 10.5 12.648438 Z M 10.5 12.648438 '
          />
        </g>
        <mask id='mask45'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip46'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface140' clipPath='url(#clip46)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 18.3125 12.648438 C 18.3125 12.808594 18.3125 12.972656 18.3125 13.132812 C 17.007812 14.40625 15.707031 15.671875 14.40625 16.945312 C 14.40625 16.78125 14.40625 16.617188 14.40625 16.453125 C 15.707031 15.1875 17.007812 13.914062 18.3125 12.648438 Z M 18.3125 12.648438 '
          />
        </g>
        <mask id='mask46'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip47'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface143' clipPath='url(#clip47)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 12.15625 12.84375 C 12.320312 12.84375 12.484375 12.84375 12.648438 12.84375 C 12.222656 13.328125 11.765625 13.785156 11.28125 14.210938 C 11.28125 14.046875 11.28125 13.882812 11.28125 13.71875 C 11.605469 13.460938 11.898438 13.167969 12.15625 12.84375 Z M 12.15625 12.84375 '
          />
        </g>
        <mask id='mask47'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip48'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface146' clipPath='url(#clip48)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 5.8125 13.429688 C 5.8125 13.589844 5.8125 13.753906 5.8125 13.914062 C 5.355469 14.304688 4.929688 14.730469 4.539062 15.1875 C 4.378906 15.1875 4.214844 15.1875 4.054688 15.1875 C 4.605469 14.566406 5.191406 13.980469 5.8125 13.429688 Z M 5.8125 13.429688 '
          />
        </g>
        <mask id='mask48'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip49'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface149' clipPath='url(#clip49)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 13.625 13.429688 C 13.625 13.589844 13.625 13.753906 13.625 13.914062 C 12.84375 14.664062 12.0625 15.414062 11.28125 16.164062 C 11.28125 16 11.28125 15.835938 11.28125 15.671875 C 12.0625 14.925781 12.84375 14.175781 13.625 13.429688 Z M 13.625 13.429688 '
          />
        </g>
        <mask id='mask49'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip50'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface152' clipPath='url(#clip50)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 21.4375 13.429688 C 21.4375 13.589844 21.4375 13.753906 21.4375 13.914062 C 20.65625 14.664062 19.875 15.414062 19.09375 16.164062 C 19.09375 16 19.09375 15.835938 19.09375 15.671875 C 19.875 14.925781 20.65625 14.175781 21.4375 13.429688 Z M 21.4375 13.429688 '
          />
        </g>
        <mask id='mask50'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip51'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface155' clipPath='url(#clip51)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 24.953125 13.820312 C 24.953125 13.980469 24.953125 14.144531 24.953125 14.304688 C 24.039062 15.1875 23.128906 16.0625 22.21875 16.945312 C 22.21875 16.78125 22.21875 16.617188 22.21875 16.453125 C 23.128906 15.578125 24.039062 14.695312 24.953125 13.820312 Z M 24.953125 13.820312 '
          />
        </g>
        <mask id='mask51'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip52'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface158' clipPath='url(#clip52)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 2.6875 14.601562 C 2.6875 14.761719 2.6875 14.925781 2.6875 15.085938 C 1.773438 15.96875 0.863281 16.84375 -0.046875 17.726562 C -0.046875 17.5625 -0.046875 17.398438 -0.046875 17.234375 C 0.863281 16.359375 1.773438 15.476562 2.6875 14.601562 Z M 2.6875 14.601562 '
          />
        </g>
        <mask id='mask52'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip53'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface161' clipPath='url(#clip53)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 10.5 14.601562 C 10.5 14.761719 10.5 14.925781 10.5 15.085938 C 8.675781 16.878906 6.851562 18.667969 5.03125 20.460938 C 5.03125 20.296875 5.03125 20.132812 5.03125 19.96875 C 6.851562 18.179688 8.675781 16.390625 10.5 14.601562 Z M 10.5 14.601562 '
          />
        </g>
        <mask id='mask53'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip54'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface164' clipPath='url(#clip54)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 18.3125 14.601562 C 18.3125 14.761719 18.3125 14.925781 18.3125 15.085938 C 17.007812 16.359375 15.707031 17.625 14.40625 18.898438 C 14.40625 18.734375 14.40625 18.570312 14.40625 18.40625 C 15.707031 17.140625 17.007812 15.867188 18.3125 14.601562 Z M 18.3125 14.601562 '
          />
        </g>
        <mask id='mask54'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip55'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface167' clipPath='url(#clip55)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 13.625 15.382812 C 13.625 15.542969 13.625 15.707031 13.625 15.867188 C 12.84375 16.617188 12.0625 17.367188 11.28125 18.117188 C 11.28125 17.953125 11.28125 17.789062 11.28125 17.625 C 12.0625 16.878906 12.84375 16.128906 13.625 15.382812 Z M 13.625 15.382812 '
          />
        </g>
        <mask id='mask55'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip56'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface170' clipPath='url(#clip56)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 21.4375 15.382812 C 21.4375 15.542969 21.4375 15.707031 21.4375 15.867188 C 20.65625 16.617188 19.875 17.367188 19.09375 18.117188 C 19.09375 17.953125 19.09375 17.789062 19.09375 17.625 C 19.875 16.878906 20.65625 16.128906 21.4375 15.382812 Z M 21.4375 15.382812 '
          />
        </g>
        <mask id='mask56'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip57'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface173' clipPath='url(#clip57)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 24.953125 15.773438 C 24.953125 15.933594 24.953125 16.097656 24.953125 16.257812 C 24.039062 17.140625 23.128906 18.015625 22.21875 18.898438 C 22.21875 18.734375 22.21875 18.570312 22.21875 18.40625 C 23.128906 17.53125 24.039062 16.648438 24.953125 15.773438 Z M 24.953125 15.773438 '
          />
        </g>
        <mask id='mask57'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip58'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface176' clipPath='url(#clip58)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 3.171875 15.96875 C 3.335938 15.96875 3.5 15.96875 3.664062 15.96875 C 2.457031 17.234375 1.21875 18.472656 -0.046875 19.679688 C -0.046875 19.515625 -0.046875 19.351562 -0.046875 19.1875 C 1.058594 18.148438 2.132812 17.074219 3.171875 15.96875 Z M 3.171875 15.96875 '
          />
        </g>
        <mask id='mask58'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip59'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface179' clipPath='url(#clip59)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 5.125 15.96875 C 5.289062 15.96875 5.453125 15.96875 5.617188 15.96875 C 5.453125 16.195312 5.257812 16.390625 5.03125 16.554688 C 5.03125 16.390625 5.03125 16.226562 5.03125 16.0625 C 5.09375 16.0625 5.125 16.03125 5.125 15.96875 Z M 5.125 15.96875 '
          />
        </g>
        <mask id='mask59'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip60'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface182' clipPath='url(#clip60)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 10.5 16.554688 C 10.5 16.714844 10.5 16.878906 10.5 17.039062 C 7.828125 19.644531 5.191406 22.28125 2.585938 24.953125 C 2.425781 24.953125 2.261719 24.953125 2.101562 24.953125 C 4.867188 22.117188 7.664062 19.320312 10.5 16.554688 Z M 10.5 16.554688 '
          />
        </g>
        <mask id='mask60'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip61'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface185' clipPath='url(#clip61)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 18.3125 16.554688 C 18.3125 16.714844 18.3125 16.878906 18.3125 17.039062 C 15.640625 19.644531 13.003906 22.28125 10.398438 24.953125 C 10.238281 24.953125 10.074219 24.953125 9.914062 24.953125 C 12.679688 22.117188 15.476562 19.320312 18.3125 16.554688 Z M 18.3125 16.554688 '
          />
        </g>
        <mask id='mask61'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip62'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface188' clipPath='url(#clip62)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 4.25 16.945312 C 4.25 17.105469 4.25 17.269531 4.25 17.429688 C 2.816406 18.832031 1.382812 20.230469 -0.046875 21.632812 C -0.046875 21.46875 -0.046875 21.304688 -0.046875 21.140625 C 1.382812 19.742188 2.816406 18.34375 4.25 16.945312 Z M 4.25 16.945312 '
          />
        </g>
        <mask id='mask62'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip63'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface191' clipPath='url(#clip63)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 13.625 17.335938 C 13.625 17.496094 13.625 17.660156 13.625 17.820312 C 13.429688 17.953125 13.265625 18.117188 13.132812 18.3125 C 12.972656 18.3125 12.808594 18.3125 12.648438 18.3125 C 12.9375 17.953125 13.265625 17.625 13.625 17.335938 Z M 13.625 17.335938 '
          />
        </g>
        <mask id='mask63'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip64'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface194' clipPath='url(#clip64)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 21.4375 17.335938 C 21.4375 17.496094 21.4375 17.660156 21.4375 17.820312 C 21.242188 17.953125 21.078125 18.117188 20.945312 18.3125 C 20.785156 18.3125 20.621094 18.3125 20.460938 18.3125 C 20.75 17.953125 21.078125 17.625 21.4375 17.335938 Z M 21.4375 17.335938 '
          />
        </g>
        <mask id='mask64'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip65'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface197' clipPath='url(#clip65)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 24.953125 17.726562 C 24.953125 17.886719 24.953125 18.050781 24.953125 18.210938 C 22.671875 20.425781 20.425781 22.671875 18.210938 24.953125 C 18.050781 24.953125 17.886719 24.953125 17.726562 24.953125 C 20.101562 22.507812 22.507812 20.101562 24.953125 17.726562 Z M 24.953125 17.726562 '
          />
        </g>
        <mask id='mask65'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip66'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface200' clipPath='url(#clip66)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 10.5 18.507812 C 10.5 18.667969 10.5 18.832031 10.5 18.992188 C 8.480469 20.945312 6.492188 22.933594 4.539062 24.953125 C 4.378906 24.953125 4.214844 24.953125 4.054688 24.953125 C 6.167969 22.769531 8.316406 20.621094 10.5 18.507812 Z M 10.5 18.507812 '
          />
        </g>
        <mask id='mask66'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip67'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface203' clipPath='url(#clip67)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 18.3125 18.507812 C 18.3125 18.667969 18.3125 18.832031 18.3125 18.992188 C 16.292969 20.945312 14.304688 22.933594 12.351562 24.953125 C 12.191406 24.953125 12.027344 24.953125 11.867188 24.953125 C 13.980469 22.769531 16.128906 20.621094 18.3125 18.507812 Z M 18.3125 18.507812 '
          />
        </g>
        <mask id='mask67'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip68'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface206' clipPath='url(#clip68)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 4.25 18.898438 C 4.25 19.058594 4.25 19.222656 4.25 19.382812 C 2.816406 20.785156 1.382812 22.183594 -0.046875 23.585938 C -0.046875 23.421875 -0.046875 23.257812 -0.046875 23.09375 C 1.382812 21.695312 2.816406 20.296875 4.25 18.898438 Z M 4.25 18.898438 '
          />
        </g>
        <mask id='mask68'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip69'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface209' clipPath='url(#clip69)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 11.765625 19.09375 C 11.867188 19.09375 11.960938 19.09375 12.0625 19.09375 C 12.0625 19.1875 12.0625 19.289062 12.0625 19.382812 C 10.171875 21.207031 8.316406 23.0625 6.492188 24.953125 C 6.332031 24.953125 6.167969 24.953125 6.007812 24.953125 C 7.925781 23 9.847656 21.046875 11.765625 19.09375 Z M 11.765625 19.09375 '
          />
        </g>
        <mask id='mask69'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip70'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface212' clipPath='url(#clip70)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 13.71875 19.09375 C 13.882812 19.09375 14.046875 19.09375 14.210938 19.09375 C 13.785156 19.578125 13.328125 20.035156 12.84375 20.460938 C 12.84375 20.296875 12.84375 20.132812 12.84375 19.96875 C 13.167969 19.710938 13.460938 19.417969 13.71875 19.09375 Z M 13.71875 19.09375 '
          />
        </g>
        <mask id='mask70'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip71'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface215' clipPath='url(#clip71)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 19.578125 19.09375 C 19.679688 19.09375 19.773438 19.09375 19.875 19.09375 C 19.875 19.1875 19.875 19.289062 19.875 19.382812 C 17.984375 21.207031 16.128906 23.0625 14.304688 24.953125 C 14.144531 24.953125 13.980469 24.953125 13.820312 24.953125 C 15.738281 23 17.660156 21.046875 19.578125 19.09375 Z M 19.578125 19.09375 '
          />
        </g>
        <mask id='mask71'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip72'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface218' clipPath='url(#clip72)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 21.53125 19.09375 C 21.695312 19.09375 21.859375 19.09375 22.023438 19.09375 C 21.597656 19.578125 21.140625 20.035156 20.65625 20.460938 C 20.65625 20.296875 20.65625 20.132812 20.65625 19.96875 C 20.980469 19.710938 21.273438 19.417969 21.53125 19.09375 Z M 21.53125 19.09375 '
          />
        </g>
        <mask id='mask72'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip73'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface221' clipPath='url(#clip73)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 24.953125 19.679688 C 24.953125 19.839844 24.953125 20.003906 24.953125 20.164062 C 23.324219 21.726562 21.726562 23.324219 20.164062 24.953125 C 20.003906 24.953125 19.839844 24.953125 19.679688 24.953125 C 21.402344 23.160156 23.160156 21.402344 24.953125 19.679688 Z M 24.953125 19.679688 '
          />
        </g>
        <mask id='mask73'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip74'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface224' clipPath='url(#clip74)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 4.25 20.851562 C 4.25 21.011719 4.25 21.175781 4.25 21.335938 C 3.011719 22.507812 1.804688 23.714844 0.632812 24.953125 C 0.472656 24.953125 0.308594 24.953125 0.148438 24.953125 C 1.480469 23.550781 2.847656 22.183594 4.25 20.851562 Z M 4.25 20.851562 '
          />
        </g>
        <mask id='mask74'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip75'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface227' clipPath='url(#clip75)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 12.0625 20.851562 C 12.0625 21.011719 12.0625 21.175781 12.0625 21.335938 C 10.824219 22.507812 9.617188 23.714844 8.445312 24.953125 C 8.285156 24.953125 8.121094 24.953125 7.960938 24.953125 C 9.292969 23.550781 10.660156 22.183594 12.0625 20.851562 Z M 12.0625 20.851562 '
          />
        </g>
        <mask id='mask75'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip76'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface230' clipPath='url(#clip76)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 19.875 20.851562 C 19.875 21.011719 19.875 21.175781 19.875 21.335938 C 18.636719 22.507812 17.429688 23.714844 16.257812 24.953125 C 16.097656 24.953125 15.933594 24.953125 15.773438 24.953125 C 17.105469 23.550781 18.472656 22.183594 19.875 20.851562 Z M 19.875 20.851562 '
          />
        </g>
        <mask id='mask76'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip77'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface233' clipPath='url(#clip77)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 24.953125 21.632812 C 24.953125 21.792969 24.953125 21.957031 24.953125 22.117188 C 23.976562 23.03125 23.03125 23.976562 22.117188 24.953125 C 21.957031 24.953125 21.792969 24.953125 21.632812 24.953125 C 22.703125 23.8125 23.8125 22.703125 24.953125 21.632812 Z M 24.953125 21.632812 '
          />
        </g>
        <mask id='mask77'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.0235294",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip78'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface236' clipPath='url(#clip78)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 24.953125 23.585938 C 24.953125 23.746094 24.953125 23.910156 24.953125 24.070312 C 24.625 24.332031 24.332031 24.625 24.070312 24.953125 C 23.910156 24.953125 23.746094 24.953125 23.585938 24.953125 C 24.007812 24.460938 24.460938 24.007812 24.953125 23.585938 Z M 24.953125 23.585938 '
          />
        </g>
      </defs>
      <g id='surface1'>
        <use xlinkHref='#surface5' mask='url(#mask0)' />
        <use xlinkHref='#surface8' mask='url(#mask1)' />
        <use xlinkHref='#surface11' mask='url(#mask2)' />
        <use xlinkHref='#surface14' mask='url(#mask3)' />
        <use xlinkHref='#surface17' mask='url(#mask4)' />
        <use xlinkHref='#surface20' mask='url(#mask5)' />
        <use xlinkHref='#surface23' mask='url(#mask6)' />
        <use xlinkHref='#surface26' mask='url(#mask7)' />
        <use xlinkHref='#surface29' mask='url(#mask8)' />
        <use xlinkHref='#surface32' mask='url(#mask9)' />
        <use xlinkHref='#surface35' mask='url(#mask10)' />
        <use xlinkHref='#surface38' mask='url(#mask11)' />
        <use xlinkHref='#surface41' mask='url(#mask12)' />
        <use xlinkHref='#surface44' mask='url(#mask13)' />
        <use xlinkHref='#surface47' mask='url(#mask14)' />
        <path
          style={{
            stroke: "none",
            fillRule: "evenodd",
            fill: appThemeBgColor,
            fillOpacity: 1,
          }}
          d='M 4.445312 3.078125 C 4.605469 3.078125 4.769531 3.078125 4.929688 3.078125 C 5.027344 3.480469 5.058594 3.902344 5.03125 4.34375 C 5.03125 4.507812 5.03125 4.671875 5.03125 4.835938 C 5.03125 5.320312 5.03125 5.8125 5.03125 6.296875 C 5.03125 6.460938 5.03125 6.625 5.03125 6.789062 C 5.03125 6.984375 5.03125 7.179688 5.03125 7.375 C 5.355469 7.375 5.679688 7.375 6.007812 7.375 C 6.167969 7.375 6.332031 7.375 6.492188 7.375 C 6.589844 7.777344 6.621094 8.199219 6.59375 8.640625 C 6.59375 8.804688 6.59375 8.96875 6.59375 9.132812 C 6.59375 9.617188 6.59375 10.109375 6.59375 10.59375 C 6.59375 10.757812 6.59375 10.921875 6.59375 11.085938 C 6.59375 11.570312 6.59375 12.0625 6.59375 12.546875 C 6.59375 12.710938 6.59375 12.875 6.59375 13.039062 C 6.59375 13.523438 6.59375 14.015625 6.59375 14.5 C 6.59375 14.664062 6.59375 14.828125 6.59375 14.992188 C 6.59375 15.316406 6.59375 15.640625 6.59375 15.96875 C 6.265625 15.96875 5.941406 15.96875 5.617188 15.96875 C 5.453125 15.96875 5.289062 15.96875 5.125 15.96875 C 5.0625 15.96875 5.03125 16 5.03125 16.0625 C 5.03125 16.226562 5.03125 16.390625 5.03125 16.554688 C 5.03125 17.039062 5.03125 17.53125 5.03125 18.015625 C 5.03125 18.179688 5.03125 18.34375 5.03125 18.507812 C 5.03125 18.992188 5.03125 19.484375 5.03125 19.96875 C 5.03125 20.132812 5.03125 20.296875 5.03125 20.460938 C 5.03125 20.914062 5.03125 21.371094 5.03125 21.828125 C 4.769531 21.828125 4.507812 21.828125 4.25 21.828125 C 4.25 21.664062 4.25 21.5 4.25 21.335938 C 4.25 21.175781 4.25 21.011719 4.25 20.851562 C 4.25 20.359375 4.25 19.875 4.25 19.382812 C 4.25 19.222656 4.25 19.058594 4.25 18.898438 C 4.25 18.40625 4.25 17.921875 4.25 17.429688 C 4.25 17.269531 4.25 17.105469 4.25 16.945312 C 4.25 16.617188 4.25 16.292969 4.25 15.96875 C 4.054688 15.96875 3.859375 15.96875 3.664062 15.96875 C 3.5 15.96875 3.335938 15.96875 3.171875 15.96875 C 3.011719 15.96875 2.847656 15.96875 2.6875 15.96875 C 2.6875 15.671875 2.6875 15.382812 2.6875 15.085938 C 2.6875 14.925781 2.6875 14.761719 2.6875 14.601562 C 2.6875 14.109375 2.6875 13.625 2.6875 13.132812 C 2.6875 12.972656 2.6875 12.808594 2.6875 12.648438 C 2.6875 12.15625 2.6875 11.671875 2.6875 11.179688 C 2.6875 11.019531 2.6875 10.855469 2.6875 10.695312 C 2.6875 10.203125 2.6875 9.71875 2.6875 9.226562 C 2.6875 9.066406 2.6875 8.902344 2.6875 8.742188 C 2.6875 8.285156 2.6875 7.828125 2.6875 7.375 C 3.140625 7.375 3.597656 7.375 4.054688 7.375 C 4.183594 7.375 4.25 7.308594 4.25 7.179688 C 4.25 6.6875 4.25 6.203125 4.25 5.710938 C 4.25 5.550781 4.25 5.386719 4.25 5.226562 C 4.25 4.734375 4.25 4.25 4.25 3.757812 C 4.25 3.597656 4.25 3.433594 4.25 3.273438 C 4.25 3.140625 4.3125 3.078125 4.445312 3.078125 Z M 3.664062 8.15625 C 4.148438 8.15625 4.640625 8.15625 5.125 8.15625 C 4.605469 8.742188 4.054688 9.292969 3.46875 9.8125 C 3.46875 9.328125 3.46875 8.835938 3.46875 8.351562 C 3.5625 8.316406 3.628906 8.25 3.664062 8.15625 Z M 5.617188 8.15625 C 5.804688 8.566406 5.871094 9.023438 5.8125 9.523438 C 5.03125 10.269531 4.25 11.019531 3.46875 11.765625 C 3.46875 11.28125 3.46875 10.789062 3.46875 10.304688 C 4.214844 9.617188 4.929688 8.902344 5.617188 8.15625 Z M 5.8125 10.007812 C 5.8125 10.5 5.8125 10.984375 5.8125 11.476562 C 5.03125 12.222656 4.25 12.972656 3.46875 13.71875 C 3.46875 13.234375 3.46875 12.742188 3.46875 12.257812 C 4.25 11.507812 5.03125 10.757812 5.8125 10.007812 Z M 5.8125 11.960938 C 5.8125 12.453125 5.8125 12.9375 5.8125 13.429688 C 5.191406 13.980469 4.605469 14.566406 4.054688 15.1875 C 3.859375 15.1875 3.664062 15.1875 3.46875 15.1875 C 3.46875 14.859375 3.46875 14.535156 3.46875 14.210938 C 4.25 13.460938 5.03125 12.710938 5.8125 11.960938 Z M 5.8125 13.914062 C 5.8125 14.339844 5.8125 14.761719 5.8125 15.1875 C 5.386719 15.1875 4.964844 15.1875 4.539062 15.1875 C 4.929688 14.730469 5.355469 14.304688 5.8125 13.914062 Z M 5.8125 13.914062 '
        />
        <path
          style={{
            stroke: "none",
            fillRule: "evenodd",
            fill: appThemeBgColor,
            fillOpacity: 1,
          }}
          d='M 12.257812 3.078125 C 12.417969 3.078125 12.582031 3.078125 12.742188 3.078125 C 12.839844 3.480469 12.871094 3.902344 12.84375 4.34375 C 12.84375 4.507812 12.84375 4.671875 12.84375 4.835938 C 12.84375 5.320312 12.84375 5.8125 12.84375 6.296875 C 12.84375 6.460938 12.84375 6.625 12.84375 6.789062 C 12.84375 7.273438 12.84375 7.765625 12.84375 8.25 C 12.84375 8.414062 12.84375 8.578125 12.84375 8.742188 C 12.84375 9.226562 12.84375 9.71875 12.84375 10.203125 C 12.84375 10.367188 12.84375 10.53125 12.84375 10.695312 C 12.78125 11.191406 12.847656 11.648438 13.039062 12.0625 C 13.199219 12.0625 13.363281 12.0625 13.523438 12.0625 C 13.820312 12.0625 14.109375 12.0625 14.40625 12.0625 C 14.40625 12.222656 14.40625 12.386719 14.40625 12.546875 C 14.40625 12.710938 14.40625 12.875 14.40625 13.039062 C 14.40625 13.523438 14.40625 14.015625 14.40625 14.5 C 14.40625 14.664062 14.40625 14.828125 14.40625 14.992188 C 14.40625 15.476562 14.40625 15.96875 14.40625 16.453125 C 14.40625 16.617188 14.40625 16.78125 14.40625 16.945312 C 14.40625 17.429688 14.40625 17.921875 14.40625 18.40625 C 14.40625 18.570312 14.40625 18.734375 14.40625 18.898438 C 14.40625 19.027344 14.339844 19.09375 14.210938 19.09375 C 14.046875 19.09375 13.882812 19.09375 13.71875 19.09375 C 13.429688 19.09375 13.132812 19.09375 12.84375 19.09375 C 12.84375 19.382812 12.84375 19.679688 12.84375 19.96875 C 12.84375 20.132812 12.84375 20.296875 12.84375 20.460938 C 12.84375 20.914062 12.84375 21.371094 12.84375 21.828125 C 12.582031 21.828125 12.320312 21.828125 12.0625 21.828125 C 12.0625 21.664062 12.0625 21.5 12.0625 21.335938 C 12.0625 21.175781 12.0625 21.011719 12.0625 20.851562 C 12.0625 20.359375 12.0625 19.875 12.0625 19.382812 C 12.0625 19.289062 12.0625 19.1875 12.0625 19.09375 C 11.960938 19.09375 11.867188 19.09375 11.765625 19.09375 C 11.324219 19.121094 10.902344 19.089844 10.5 18.992188 C 10.5 18.832031 10.5 18.667969 10.5 18.507812 C 10.5 18.015625 10.5 17.53125 10.5 17.039062 C 10.5 16.878906 10.5 16.714844 10.5 16.554688 C 10.5 16.0625 10.5 15.578125 10.5 15.085938 C 10.5 14.925781 10.5 14.761719 10.5 14.601562 C 10.5 14.109375 10.5 13.625 10.5 13.132812 C 10.5 12.972656 10.5 12.808594 10.5 12.648438 C 10.5 12.453125 10.5 12.257812 10.5 12.0625 C 10.695312 12.0625 10.890625 12.0625 11.085938 12.0625 C 11.246094 12.0625 11.410156 12.0625 11.570312 12.0625 C 11.734375 12.0625 11.898438 12.0625 12.0625 12.0625 C 12.0625 11.898438 12.0625 11.734375 12.0625 11.570312 C 12.0625 11.410156 12.0625 11.246094 12.0625 11.085938 C 12.0625 10.59375 12.0625 10.109375 12.0625 9.617188 C 12.0625 9.457031 12.0625 9.292969 12.0625 9.132812 C 12.0625 8.640625 12.0625 8.15625 12.0625 7.664062 C 12.0625 7.503906 12.0625 7.339844 12.0625 7.179688 C 12.0625 6.6875 12.0625 6.203125 12.0625 5.710938 C 12.0625 5.550781 12.0625 5.386719 12.0625 5.226562 C 12.0625 4.734375 12.0625 4.25 12.0625 3.757812 C 12.0625 3.597656 12.0625 3.433594 12.0625 3.273438 C 12.0625 3.140625 12.125 3.078125 12.257812 3.078125 Z M 12.15625 12.84375 C 11.898438 13.167969 11.605469 13.460938 11.28125 13.71875 C 11.28125 13.429688 11.28125 13.132812 11.28125 12.84375 C 11.570312 12.84375 11.867188 12.84375 12.15625 12.84375 Z M 12.648438 12.84375 C 12.972656 12.84375 13.296875 12.84375 13.625 12.84375 C 13.625 13.039062 13.625 13.234375 13.625 13.429688 C 12.84375 14.175781 12.0625 14.925781 11.28125 15.671875 C 11.28125 15.1875 11.28125 14.695312 11.28125 14.210938 C 11.765625 13.785156 12.222656 13.328125 12.648438 12.84375 Z M 13.625 13.914062 C 13.625 14.40625 13.625 14.890625 13.625 15.382812 C 12.84375 16.128906 12.0625 16.878906 11.28125 17.625 C 11.28125 17.140625 11.28125 16.648438 11.28125 16.164062 C 12.0625 15.414062 12.84375 14.664062 13.625 13.914062 Z M 13.625 15.867188 C 13.625 16.359375 13.625 16.84375 13.625 17.335938 C 13.265625 17.625 12.9375 17.953125 12.648438 18.3125 C 12.148438 18.371094 11.691406 18.304688 11.28125 18.117188 C 12.0625 17.367188 12.84375 16.617188 13.625 15.867188 Z M 13.625 17.820312 C 13.625 17.984375 13.625 18.148438 13.625 18.3125 C 13.460938 18.3125 13.296875 18.3125 13.132812 18.3125 C 13.265625 18.117188 13.429688 17.953125 13.625 17.820312 Z M 13.625 17.820312 '
        />
        <path
          style={{
            stroke: "none",
            fillRule: "evenodd",
            fill: appThemeBgColor,
            fillOpacity: 1,
          }}
          d='M 20.070312 3.078125 C 20.230469 3.078125 20.394531 3.078125 20.554688 3.078125 C 20.652344 3.480469 20.683594 3.902344 20.65625 4.34375 C 20.65625 4.507812 20.65625 4.671875 20.65625 4.835938 C 20.65625 5.160156 20.65625 5.484375 20.65625 5.8125 C 20.851562 5.8125 21.046875 5.8125 21.242188 5.8125 C 21.402344 5.8125 21.566406 5.8125 21.726562 5.8125 C 21.890625 5.8125 22.054688 5.8125 22.21875 5.8125 C 22.21875 6.101562 22.21875 6.398438 22.21875 6.6875 C 22.21875 6.851562 22.21875 7.015625 22.21875 7.179688 C 22.21875 7.664062 22.21875 8.15625 22.21875 8.640625 C 22.21875 8.804688 22.21875 8.96875 22.21875 9.132812 C 22.21875 9.617188 22.21875 10.109375 22.21875 10.59375 C 22.21875 10.757812 22.21875 10.921875 22.21875 11.085938 C 22.21875 11.570312 22.21875 12.0625 22.21875 12.546875 C 22.21875 12.710938 22.21875 12.875 22.21875 13.039062 C 22.21875 13.523438 22.21875 14.015625 22.21875 14.5 C 22.21875 14.664062 22.21875 14.828125 22.21875 14.992188 C 22.21875 15.476562 22.21875 15.96875 22.21875 16.453125 C 22.21875 16.617188 22.21875 16.78125 22.21875 16.945312 C 22.21875 17.429688 22.21875 17.921875 22.21875 18.40625 C 22.21875 18.570312 22.21875 18.734375 22.21875 18.898438 C 22.21875 19.027344 22.152344 19.09375 22.023438 19.09375 C 21.859375 19.09375 21.695312 19.09375 21.53125 19.09375 C 21.242188 19.09375 20.945312 19.09375 20.65625 19.09375 C 20.65625 19.382812 20.65625 19.679688 20.65625 19.96875 C 20.65625 20.132812 20.65625 20.296875 20.65625 20.460938 C 20.65625 20.914062 20.65625 21.371094 20.65625 21.828125 C 20.394531 21.828125 20.132812 21.828125 19.875 21.828125 C 19.875 21.664062 19.875 21.5 19.875 21.335938 C 19.875 21.175781 19.875 21.011719 19.875 20.851562 C 19.875 20.359375 19.875 19.875 19.875 19.382812 C 19.875 19.289062 19.875 19.1875 19.875 19.09375 C 19.773438 19.09375 19.679688 19.09375 19.578125 19.09375 C 19.136719 19.121094 18.714844 19.089844 18.3125 18.992188 C 18.3125 18.832031 18.3125 18.667969 18.3125 18.507812 C 18.3125 18.015625 18.3125 17.53125 18.3125 17.039062 C 18.3125 16.878906 18.3125 16.714844 18.3125 16.554688 C 18.3125 16.0625 18.3125 15.578125 18.3125 15.085938 C 18.3125 14.925781 18.3125 14.761719 18.3125 14.601562 C 18.3125 14.109375 18.3125 13.625 18.3125 13.132812 C 18.3125 12.972656 18.3125 12.808594 18.3125 12.648438 C 18.3125 12.15625 18.3125 11.671875 18.3125 11.179688 C 18.3125 11.019531 18.3125 10.855469 18.3125 10.695312 C 18.3125 10.203125 18.3125 9.71875 18.3125 9.226562 C 18.3125 9.066406 18.3125 8.902344 18.3125 8.742188 C 18.3125 8.25 18.3125 7.765625 18.3125 7.273438 C 18.3125 7.113281 18.3125 6.949219 18.3125 6.789062 C 18.3125 6.460938 18.3125 6.136719 18.3125 5.8125 C 18.636719 5.8125 18.960938 5.8125 19.289062 5.8125 C 19.449219 5.8125 19.613281 5.8125 19.773438 5.8125 C 19.839844 5.8125 19.875 5.777344 19.875 5.710938 C 19.875 5.550781 19.875 5.386719 19.875 5.226562 C 19.875 4.734375 19.875 4.25 19.875 3.757812 C 19.875 3.597656 19.875 3.433594 19.875 3.273438 C 19.875 3.140625 19.9375 3.078125 20.070312 3.078125 Z M 20.359375 6.59375 C 19.96875 7.046875 19.546875 7.46875 19.09375 7.859375 C 19.09375 7.4375 19.09375 7.015625 19.09375 6.59375 C 19.515625 6.59375 19.9375 6.59375 20.359375 6.59375 Z M 20.851562 6.59375 C 21.046875 6.59375 21.242188 6.59375 21.4375 6.59375 C 21.4375 6.917969 21.4375 7.242188 21.4375 7.570312 C 20.65625 8.316406 19.875 9.066406 19.09375 9.8125 C 19.09375 9.328125 19.09375 8.835938 19.09375 8.351562 C 19.710938 7.796875 20.296875 7.210938 20.851562 6.59375 Z M 21.4375 8.054688 C 21.4375 8.546875 21.4375 9.03125 21.4375 9.523438 C 20.65625 10.269531 19.875 11.019531 19.09375 11.765625 C 19.09375 11.28125 19.09375 10.789062 19.09375 10.304688 C 19.875 9.554688 20.65625 8.804688 21.4375 8.054688 Z M 21.4375 10.007812 C 21.4375 10.5 21.4375 10.984375 21.4375 11.476562 C 20.65625 12.222656 19.875 12.972656 19.09375 13.71875 C 19.09375 13.234375 19.09375 12.742188 19.09375 12.257812 C 19.875 11.507812 20.65625 10.757812 21.4375 10.007812 Z M 21.4375 11.960938 C 21.4375 12.453125 21.4375 12.9375 21.4375 13.429688 C 20.65625 14.175781 19.875 14.925781 19.09375 15.671875 C 19.09375 15.1875 19.09375 14.695312 19.09375 14.210938 C 19.875 13.460938 20.65625 12.710938 21.4375 11.960938 Z M 21.4375 13.914062 C 21.4375 14.40625 21.4375 14.890625 21.4375 15.382812 C 20.65625 16.128906 19.875 16.878906 19.09375 17.625 C 19.09375 17.140625 19.09375 16.648438 19.09375 16.164062 C 19.875 15.414062 20.65625 14.664062 21.4375 13.914062 Z M 21.4375 15.867188 C 21.4375 16.359375 21.4375 16.84375 21.4375 17.335938 C 21.078125 17.625 20.75 17.953125 20.460938 18.3125 C 19.960938 18.371094 19.503906 18.304688 19.09375 18.117188 C 19.875 17.367188 20.65625 16.617188 21.4375 15.867188 Z M 21.4375 17.820312 C 21.4375 17.984375 21.4375 18.148438 21.4375 18.3125 C 21.273438 18.3125 21.109375 18.3125 20.945312 18.3125 C 21.078125 18.117188 21.242188 17.953125 21.4375 17.820312 Z M 21.4375 17.820312 '
        />
        <use xlinkHref='#surface50' mask='url(#mask15)' />
        <use xlinkHref='#surface53' mask='url(#mask16)' />
        <use xlinkHref='#surface56' mask='url(#mask17)' />
        <use xlinkHref='#surface59' mask='url(#mask18)' />
        <use xlinkHref='#surface62' mask='url(#mask19)' />
        <use xlinkHref='#surface65' mask='url(#mask20)' />
        <use xlinkHref='#surface68' mask='url(#mask21)' />
        <use xlinkHref='#surface71' mask='url(#mask22)' />
        <use xlinkHref='#surface74' mask='url(#mask23)' />
        <use xlinkHref='#surface77' mask='url(#mask24)' />
        <use xlinkHref='#surface80' mask='url(#mask25)' />
        <use xlinkHref='#surface83' mask='url(#mask26)' />
        <use xlinkHref='#surface86' mask='url(#mask27)' />
        <use xlinkHref='#surface92' mask='url(#mask29)' />
        <use xlinkHref='#surface95' mask='url(#mask30)' />
        <use xlinkHref='#surface98' mask='url(#mask31)' />
        <use xlinkHref='#surface101' mask='url(#mask32)' />
        <use xlinkHref='#surface104' mask='url(#mask33)' />
        <use xlinkHref='#surface107' mask='url(#mask34)' />
        <use xlinkHref='#surface110' mask='url(#mask35)' />
        <use xlinkHref='#surface113' mask='url(#mask36)' />
        <use xlinkHref='#surface116' mask='url(#mask37)' />
        <use xlinkHref='#surface119' mask='url(#mask38)' />
        <use xlinkHref='#surface122' mask='url(#mask39)' />
        <use xlinkHref='#surface125' mask='url(#mask40)' />
        <use xlinkHref='#surface128' mask='url(#mask41)' />
        <use xlinkHref='#surface131' mask='url(#mask42)' />
        <use xlinkHref='#surface134' mask='url(#mask43)' />
        <use xlinkHref='#surface137' mask='url(#mask44)' />
        <use xlinkHref='#surface140' mask='url(#mask45)' />
        <use xlinkHref='#surface143' mask='url(#mask46)' />
        <use xlinkHref='#surface146' mask='url(#mask47)' />
        <use xlinkHref='#surface149' mask='url(#mask48)' />
        <use xlinkHref='#surface152' mask='url(#mask49)' />
        <use xlinkHref='#surface155' mask='url(#mask50)' />
        <use xlinkHref='#surface158' mask='url(#mask51)' />
        <use xlinkHref='#surface161' mask='url(#mask52)' />
        <use xlinkHref='#surface164' mask='url(#mask53)' />
        <use xlinkHref='#surface167' mask='url(#mask54)' />
        <use xlinkHref='#surface170' mask='url(#mask55)' />
        <use xlinkHref='#surface173' mask='url(#mask56)' />
        <use xlinkHref='#surface176' mask='url(#mask57)' />
        <use xlinkHref='#surface179' mask='url(#mask58)' />
        <use xlinkHref='#surface182' mask='url(#mask59)' />
        <use xlinkHref='#surface185' mask='url(#mask60)' />
        <use xlinkHref='#surface188' mask='url(#mask61)' />
        <use xlinkHref='#surface191' mask='url(#mask62)' />
        <use xlinkHref='#surface194' mask='url(#mask63)' />
        <use xlinkHref='#surface197' mask='url(#mask64)' />
        <use xlinkHref='#surface200' mask='url(#mask65)' />
        <use xlinkHref='#surface203' mask='url(#mask66)' />
        <use xlinkHref='#surface206' mask='url(#mask67)' />
        <use xlinkHref='#surface209' mask='url(#mask68)' />
        <use xlinkHref='#surface212' mask='url(#mask69)' />
        <use xlinkHref='#surface215' mask='url(#mask70)' />
        <use xlinkHref='#surface218' mask='url(#mask71)' />
        <use xlinkHref='#surface221' mask='url(#mask72)' />
        <use xlinkHref='#surface224' mask='url(#mask73)' />
        <use xlinkHref='#surface227' mask='url(#mask74)' />
        <use xlinkHref='#surface230' mask='url(#mask75)' />
        <use xlinkHref='#surface233' mask='url(#mask76)' />
        <use xlinkHref='#surface236' mask='url(#mask77)' />
      </g>
    </svg>
  );
};
export default React.memo(BoxPlotChartSvg);
