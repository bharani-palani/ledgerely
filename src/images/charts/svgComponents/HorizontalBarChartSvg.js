import React from "react";
const appThemeBgColor = getComputedStyle(document.documentElement).getPropertyValue("--app-theme-bg-color");

export const HorizontalBarChartSvg = () => {
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
            d='M -0.0234375 -0.0234375 C 0.0078125 -0.0234375 0.0390625 -0.0234375 0.0742188 -0.0234375 C 0.0585938 0.0234375 0.0234375 0.0585938 -0.0234375 0.0742188 C -0.0234375 0.0390625 -0.0234375 0.0078125 -0.0234375 -0.0234375 Z M -0.0234375 -0.0234375 '
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
            d='M 0.804688 -0.0234375 C 0.886719 -0.0234375 0.96875 -0.0234375 1.050781 -0.0234375 C 0.707031 0.351562 0.351562 0.707031 -0.0234375 1.050781 C -0.0234375 0.96875 -0.0234375 0.886719 -0.0234375 0.804688 C 0.269531 0.546875 0.546875 0.269531 0.804688 -0.0234375 Z M 0.804688 -0.0234375 '
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
            d='M 1.78125 -0.0234375 C 1.863281 -0.0234375 1.945312 -0.0234375 2.027344 -0.0234375 C 1.359375 0.675781 0.675781 1.359375 -0.0234375 2.027344 C -0.0234375 1.945312 -0.0234375 1.863281 -0.0234375 1.78125 C 0.59375 1.195312 1.195312 0.59375 1.78125 -0.0234375 Z M 1.78125 -0.0234375 '
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
            d='M 2.757812 -0.0234375 C 2.839844 -0.0234375 2.921875 -0.0234375 3.003906 -0.0234375 C 2.011719 1 1 2.011719 -0.0234375 3.003906 C -0.0234375 2.921875 -0.0234375 2.839844 -0.0234375 2.757812 C 0.917969 1.847656 1.847656 0.917969 2.757812 -0.0234375 Z M 2.757812 -0.0234375 '
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
            d='M 3.734375 -0.0234375 C 3.816406 -0.0234375 3.898438 -0.0234375 3.980469 -0.0234375 C 2.660156 1.328125 1.328125 2.660156 -0.0234375 3.980469 C -0.0234375 3.898438 -0.0234375 3.816406 -0.0234375 3.734375 C 1.246094 2.5 2.5 1.246094 3.734375 -0.0234375 Z M 3.734375 -0.0234375 '
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
            d='M 4.710938 -0.0234375 C 4.792969 -0.0234375 4.875 -0.0234375 4.957031 -0.0234375 C 4.273438 0.675781 3.589844 1.375 2.90625 2.074219 C 2.824219 2.074219 2.742188 2.074219 2.660156 2.074219 C 3.34375 1.375 4.027344 0.675781 4.710938 -0.0234375 Z M 4.710938 -0.0234375 '
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
            d='M 5.6875 -0.0234375 C 5.769531 -0.0234375 5.851562 -0.0234375 5.933594 -0.0234375 C 5.25 0.675781 4.566406 1.375 3.882812 2.074219 C 3.800781 2.074219 3.71875 2.074219 3.636719 2.074219 C 4.320312 1.375 5.003906 0.675781 5.6875 -0.0234375 Z M 5.6875 -0.0234375 '
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
            d='M 6.664062 -0.0234375 C 6.746094 -0.0234375 6.828125 -0.0234375 6.910156 -0.0234375 C 6.226562 0.675781 5.542969 1.375 4.859375 2.074219 C 4.777344 2.074219 4.695312 2.074219 4.613281 2.074219 C 5.296875 1.375 5.980469 0.675781 6.664062 -0.0234375 Z M 6.664062 -0.0234375 '
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
            d='M 7.640625 -0.0234375 C 7.722656 -0.0234375 7.804688 -0.0234375 7.886719 -0.0234375 C 7.203125 0.675781 6.519531 1.375 5.835938 2.074219 C 5.753906 2.074219 5.671875 2.074219 5.589844 2.074219 C 6.273438 1.375 6.957031 0.675781 7.640625 -0.0234375 Z M 7.640625 -0.0234375 '
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
            d='M 8.617188 -0.0234375 C 8.699219 -0.0234375 8.78125 -0.0234375 8.863281 -0.0234375 C 8.179688 0.675781 7.496094 1.375 6.8125 2.074219 C 6.730469 2.074219 6.648438 2.074219 6.566406 2.074219 C 7.25 1.375 7.933594 0.675781 8.617188 -0.0234375 Z M 8.617188 -0.0234375 '
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
            d='M 9.59375 -0.0234375 C 9.675781 -0.0234375 9.757812 -0.0234375 9.839844 -0.0234375 C 9.15625 0.675781 8.472656 1.375 7.789062 2.074219 C 7.707031 2.074219 7.625 2.074219 7.542969 2.074219 C 8.226562 1.375 8.910156 0.675781 9.59375 -0.0234375 Z M 9.59375 -0.0234375 '
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
            d='M 10.570312 -0.0234375 C 10.652344 -0.0234375 10.734375 -0.0234375 10.816406 -0.0234375 C 10.132812 0.675781 9.449219 1.375 8.765625 2.074219 C 8.683594 2.074219 8.601562 2.074219 8.519531 2.074219 C 9.203125 1.375 9.886719 0.675781 10.570312 -0.0234375 Z M 10.570312 -0.0234375 '
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
            d='M 11.546875 -0.0234375 C 11.628906 -0.0234375 11.710938 -0.0234375 11.792969 -0.0234375 C 11.109375 0.675781 10.425781 1.375 9.742188 2.074219 C 9.660156 2.074219 9.578125 2.074219 9.496094 2.074219 C 10.179688 1.375 10.863281 0.675781 11.546875 -0.0234375 Z M 11.546875 -0.0234375 '
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
            d='M 12.523438 -0.0234375 C 12.605469 -0.0234375 12.6875 -0.0234375 12.769531 -0.0234375 C 12.085938 0.675781 11.402344 1.375 10.71875 2.074219 C 10.636719 2.074219 10.554688 2.074219 10.472656 2.074219 C 11.15625 1.375 11.839844 0.675781 12.523438 -0.0234375 Z M 12.523438 -0.0234375 '
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
            d='M 13.5 -0.0234375 C 13.582031 -0.0234375 13.664062 -0.0234375 13.746094 -0.0234375 C 13.0625 0.675781 12.378906 1.375 11.695312 2.074219 C 11.613281 2.074219 11.53125 2.074219 11.449219 2.074219 C 12.132812 1.375 12.816406 0.675781 13.5 -0.0234375 Z M 13.5 -0.0234375 '
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
            d='M 14.476562 -0.0234375 C 14.558594 -0.0234375 14.640625 -0.0234375 14.722656 -0.0234375 C 14.039062 0.675781 13.355469 1.375 12.671875 2.074219 C 12.589844 2.074219 12.507812 2.074219 12.425781 2.074219 C 13.109375 1.375 13.792969 0.675781 14.476562 -0.0234375 Z M 14.476562 -0.0234375 '
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
            d='M 15.453125 -0.0234375 C 15.535156 -0.0234375 15.617188 -0.0234375 15.699219 -0.0234375 C 15.015625 0.675781 14.332031 1.375 13.648438 2.074219 C 13.566406 2.074219 13.484375 2.074219 13.402344 2.074219 C 14.085938 1.375 14.769531 0.675781 15.453125 -0.0234375 Z M 15.453125 -0.0234375 '
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
            d='M 16.429688 -0.0234375 C 16.511719 -0.0234375 16.59375 -0.0234375 16.675781 -0.0234375 C 15.992188 0.675781 15.308594 1.375 14.625 2.074219 C 14.542969 2.074219 14.460938 2.074219 14.378906 2.074219 C 15.0625 1.375 15.746094 0.675781 16.429688 -0.0234375 Z M 16.429688 -0.0234375 '
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
            d='M 17.40625 -0.0234375 C 17.488281 -0.0234375 17.570312 -0.0234375 17.652344 -0.0234375 C 16.96875 0.675781 16.285156 1.375 15.601562 2.074219 C 15.519531 2.074219 15.4375 2.074219 15.355469 2.074219 C 16.039062 1.375 16.722656 0.675781 17.40625 -0.0234375 Z M 17.40625 -0.0234375 '
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
            d='M 18.382812 -0.0234375 C 18.464844 -0.0234375 18.546875 -0.0234375 18.628906 -0.0234375 C 17.945312 0.675781 17.261719 1.375 16.578125 2.074219 C 16.496094 2.074219 16.414062 2.074219 16.332031 2.074219 C 17.015625 1.375 17.699219 0.675781 18.382812 -0.0234375 Z M 18.382812 -0.0234375 '
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
            d='M 19.359375 -0.0234375 C 19.441406 -0.0234375 19.523438 -0.0234375 19.605469 -0.0234375 C 18.921875 0.675781 18.238281 1.375 17.554688 2.074219 C 17.472656 2.074219 17.390625 2.074219 17.308594 2.074219 C 17.992188 1.375 18.675781 0.675781 19.359375 -0.0234375 Z M 19.359375 -0.0234375 '
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
            d='M 20.335938 -0.0234375 C 20.417969 -0.0234375 20.5 -0.0234375 20.582031 -0.0234375 C 19.898438 0.675781 19.214844 1.375 18.53125 2.074219 C 18.449219 2.074219 18.367188 2.074219 18.285156 2.074219 C 18.96875 1.375 19.652344 0.675781 20.335938 -0.0234375 Z M 20.335938 -0.0234375 '
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
            d='M 21.3125 -0.0234375 C 21.394531 -0.0234375 21.476562 -0.0234375 21.558594 -0.0234375 C 20.875 0.675781 20.191406 1.375 19.507812 2.074219 C 19.425781 2.074219 19.34375 2.074219 19.261719 2.074219 C 19.945312 1.375 20.628906 0.675781 21.3125 -0.0234375 Z M 21.3125 -0.0234375 '
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
            d='M 22.289062 -0.0234375 C 22.371094 -0.0234375 22.453125 -0.0234375 22.535156 -0.0234375 C 21.851562 0.675781 21.167969 1.375 20.484375 2.074219 C 20.402344 2.074219 20.320312 2.074219 20.238281 2.074219 C 20.921875 1.375 21.605469 0.675781 22.289062 -0.0234375 Z M 22.289062 -0.0234375 '
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
            d='M 23.265625 -0.0234375 C 23.347656 -0.0234375 23.429688 -0.0234375 23.511719 -0.0234375 C 22.828125 0.675781 22.144531 1.375 21.460938 2.074219 C 21.378906 2.074219 21.296875 2.074219 21.214844 2.074219 C 21.898438 1.375 22.582031 0.675781 23.265625 -0.0234375 Z M 23.265625 -0.0234375 '
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
                fillOpacity: "0.0235294",
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
            d='M 24.242188 -0.0234375 C 24.324219 -0.0234375 24.40625 -0.0234375 24.488281 -0.0234375 C 23.804688 0.675781 23.121094 1.375 22.4375 2.074219 C 22.355469 2.074219 22.273438 2.074219 22.191406 2.074219 C 22.875 1.375 23.558594 0.675781 24.242188 -0.0234375 Z M 24.242188 -0.0234375 '
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
            d='M 24.976562 0.269531 C 24.976562 0.351562 24.976562 0.429688 24.976562 0.511719 C 24.277344 1.195312 23.574219 1.878906 22.875 2.5625 C 22.875 2.480469 22.875 2.402344 22.875 2.320312 C 23.574219 1.636719 24.277344 0.953125 24.976562 0.269531 Z M 24.976562 0.269531 '
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
            d='M 24.976562 1.246094 C 24.976562 1.328125 24.976562 1.40625 24.976562 1.488281 C 24.277344 2.171875 23.574219 2.855469 22.875 3.539062 C 22.875 3.457031 22.875 3.378906 22.875 3.296875 C 23.574219 2.613281 24.277344 1.929688 24.976562 1.246094 Z M 24.976562 1.246094 '
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
                fillOpacity: "0.996078",
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
            d='M 2.660156 2.074219 C 2.742188 2.074219 2.824219 2.074219 2.90625 2.074219 C 3.148438 2.074219 3.394531 2.074219 3.636719 2.074219 C 3.71875 2.074219 3.800781 2.074219 3.882812 2.074219 C 4.125 2.074219 4.371094 2.074219 4.613281 2.074219 C 4.695312 2.074219 4.777344 2.074219 4.859375 2.074219 C 5.101562 2.074219 5.347656 2.074219 5.589844 2.074219 C 5.671875 2.074219 5.753906 2.074219 5.835938 2.074219 C 6.078125 2.074219 6.324219 2.074219 6.566406 2.074219 C 6.648438 2.074219 6.730469 2.074219 6.8125 2.074219 C 7.054688 2.074219 7.300781 2.074219 7.542969 2.074219 C 7.625 2.074219 7.707031 2.074219 7.789062 2.074219 C 8.03125 2.074219 8.277344 2.074219 8.519531 2.074219 C 8.601562 2.074219 8.683594 2.074219 8.765625 2.074219 C 9.007812 2.074219 9.253906 2.074219 9.496094 2.074219 C 9.578125 2.074219 9.660156 2.074219 9.742188 2.074219 C 9.984375 2.074219 10.230469 2.074219 10.472656 2.074219 C 10.554688 2.074219 10.636719 2.074219 10.71875 2.074219 C 10.960938 2.074219 11.207031 2.074219 11.449219 2.074219 C 11.53125 2.074219 11.613281 2.074219 11.695312 2.074219 C 11.9375 2.074219 12.183594 2.074219 12.425781 2.074219 C 12.507812 2.074219 12.589844 2.074219 12.671875 2.074219 C 12.914062 2.074219 13.160156 2.074219 13.402344 2.074219 C 13.484375 2.074219 13.566406 2.074219 13.648438 2.074219 C 13.890625 2.074219 14.136719 2.074219 14.378906 2.074219 C 14.460938 2.074219 14.542969 2.074219 14.625 2.074219 C 14.867188 2.074219 15.113281 2.074219 15.355469 2.074219 C 15.4375 2.074219 15.519531 2.074219 15.601562 2.074219 C 15.84375 2.074219 16.089844 2.074219 16.332031 2.074219 C 16.414062 2.074219 16.496094 2.074219 16.578125 2.074219 C 16.820312 2.074219 17.066406 2.074219 17.308594 2.074219 C 17.390625 2.074219 17.472656 2.074219 17.554688 2.074219 C 17.796875 2.074219 18.042969 2.074219 18.285156 2.074219 C 18.367188 2.074219 18.449219 2.074219 18.53125 2.074219 C 18.773438 2.074219 19.019531 2.074219 19.261719 2.074219 C 19.34375 2.074219 19.425781 2.074219 19.507812 2.074219 C 19.75 2.074219 19.996094 2.074219 20.238281 2.074219 C 20.320312 2.074219 20.402344 2.074219 20.484375 2.074219 C 20.726562 2.074219 20.972656 2.074219 21.214844 2.074219 C 21.296875 2.074219 21.378906 2.074219 21.460938 2.074219 C 21.703125 2.074219 21.949219 2.074219 22.191406 2.074219 C 22.273438 2.074219 22.355469 2.074219 22.4375 2.074219 C 22.582031 2.074219 22.730469 2.074219 22.875 2.074219 C 22.875 2.15625 22.875 2.238281 22.875 2.320312 C 22.875 2.402344 22.875 2.480469 22.875 2.5625 C 22.875 2.808594 22.875 3.050781 22.875 3.296875 C 22.875 3.378906 22.875 3.457031 22.875 3.539062 C 22.875 3.785156 22.875 4.027344 22.875 4.273438 C 22.875 4.355469 22.875 4.433594 22.875 4.515625 C 22.875 4.761719 22.875 5.003906 22.875 5.25 C 22.875 5.332031 22.875 5.410156 22.875 5.492188 C 22.875 5.65625 22.875 5.820312 22.875 5.980469 C 22.714844 5.980469 22.550781 5.980469 22.386719 5.980469 C 22.304688 5.980469 22.226562 5.980469 22.144531 5.980469 C 21.898438 5.980469 21.65625 5.980469 21.410156 5.980469 C 21.328125 5.980469 21.25 5.980469 21.167969 5.980469 C 20.921875 5.980469 20.679688 5.980469 20.433594 5.980469 C 20.351562 5.980469 20.273438 5.980469 20.191406 5.980469 C 19.945312 5.980469 19.703125 5.980469 19.457031 5.980469 C 19.375 5.980469 19.296875 5.980469 19.214844 5.980469 C 18.96875 5.980469 18.726562 5.980469 18.480469 5.980469 C 18.398438 5.980469 18.320312 5.980469 18.238281 5.980469 C 17.992188 5.980469 17.75 5.980469 17.503906 5.980469 C 17.421875 5.980469 17.34375 5.980469 17.261719 5.980469 C 17.015625 5.980469 16.773438 5.980469 16.527344 5.980469 C 16.445312 5.980469 16.367188 5.980469 16.285156 5.980469 C 16.039062 5.980469 15.796875 5.980469 15.550781 5.980469 C 15.46875 5.980469 15.390625 5.980469 15.308594 5.980469 C 15.0625 5.980469 14.820312 5.980469 14.574219 5.980469 C 14.492188 5.980469 14.414062 5.980469 14.332031 5.980469 C 14.085938 5.980469 13.84375 5.980469 13.597656 5.980469 C 13.515625 5.980469 13.4375 5.980469 13.355469 5.980469 C 13.109375 5.980469 12.867188 5.980469 12.621094 5.980469 C 12.539062 5.980469 12.460938 5.980469 12.378906 5.980469 C 12.132812 5.980469 11.890625 5.980469 11.644531 5.980469 C 11.5625 5.980469 11.484375 5.980469 11.402344 5.980469 C 11.15625 5.980469 10.914062 5.980469 10.667969 5.980469 C 10.585938 5.980469 10.507812 5.980469 10.425781 5.980469 C 10.179688 5.980469 9.9375 5.980469 9.691406 5.980469 C 9.609375 5.980469 9.53125 5.980469 9.449219 5.980469 C 9.203125 5.980469 8.960938 5.980469 8.714844 5.980469 C 8.632812 5.980469 8.554688 5.980469 8.472656 5.980469 C 8.226562 5.980469 7.984375 5.980469 7.738281 5.980469 C 7.65625 5.980469 7.578125 5.980469 7.496094 5.980469 C 7.25 5.980469 7.007812 5.980469 6.761719 5.980469 C 6.679688 5.980469 6.601562 5.980469 6.519531 5.980469 C 6.273438 5.980469 6.03125 5.980469 5.785156 5.980469 C 5.703125 5.980469 5.625 5.980469 5.542969 5.980469 C 5.296875 5.980469 5.054688 5.980469 4.808594 5.980469 C 4.726562 5.980469 4.648438 5.980469 4.566406 5.980469 C 4.320312 5.980469 4.078125 5.980469 3.832031 5.980469 C 3.75 5.980469 3.671875 5.980469 3.589844 5.980469 C 3.34375 5.980469 3.101562 5.980469 2.855469 5.980469 C 2.773438 5.980469 2.695312 5.980469 2.613281 5.980469 C 2.433594 5.980469 2.253906 5.980469 2.074219 5.980469 C 2.074219 5.933594 2.074219 5.882812 2.074219 5.835938 C 2.074219 5.753906 2.074219 5.671875 2.074219 5.589844 C 2.074219 5.347656 2.074219 5.101562 2.074219 4.859375 C 2.074219 4.777344 2.074219 4.695312 2.074219 4.613281 C 2.074219 4.371094 2.074219 4.125 2.074219 3.882812 C 2.074219 3.800781 2.074219 3.71875 2.074219 3.636719 C 2.074219 3.394531 2.074219 3.148438 2.074219 2.90625 C 2.074219 2.824219 2.074219 2.742188 2.074219 2.660156 C 2.074219 2.464844 2.074219 2.269531 2.074219 2.074219 C 2.269531 2.074219 2.464844 2.074219 2.660156 2.074219 Z M 2.660156 2.074219 '
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
                fillOpacity: "0.0235294",
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
            d='M 24.976562 2.222656 C 24.976562 2.304688 24.976562 2.382812 24.976562 2.464844 C 24.277344 3.148438 23.574219 3.832031 22.875 4.515625 C 22.875 4.433594 22.875 4.355469 22.875 4.273438 C 23.574219 3.589844 24.277344 2.90625 24.976562 2.222656 Z M 24.976562 2.222656 '
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
            d='M 2.074219 2.660156 C 2.074219 2.742188 2.074219 2.824219 2.074219 2.90625 C 1.375 3.589844 0.675781 4.273438 -0.0234375 4.957031 C -0.0234375 4.875 -0.0234375 4.792969 -0.0234375 4.710938 C 0.675781 4.027344 1.375 3.34375 2.074219 2.660156 Z M 2.074219 2.660156 '
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
            d='M 24.976562 3.199219 C 24.976562 3.28125 24.976562 3.359375 24.976562 3.441406 C 24.277344 4.125 23.574219 4.808594 22.875 5.492188 C 22.875 5.410156 22.875 5.332031 22.875 5.25 C 23.574219 4.566406 24.277344 3.882812 24.976562 3.199219 Z M 24.976562 3.199219 '
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
            d='M 2.074219 3.636719 C 2.074219 3.71875 2.074219 3.800781 2.074219 3.882812 C 1.375 4.566406 0.675781 5.25 -0.0234375 5.933594 C -0.0234375 5.851562 -0.0234375 5.769531 -0.0234375 5.6875 C 0.675781 5.003906 1.375 4.320312 2.074219 3.636719 Z M 2.074219 3.636719 '
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
            d='M 24.976562 4.175781 C 24.976562 4.257812 24.976562 4.335938 24.976562 4.417969 C 22.890625 6.484375 20.808594 8.554688 18.726562 10.621094 C 18.726562 10.539062 18.726562 10.457031 18.726562 10.375 C 20.808594 8.308594 22.890625 6.242188 24.976562 4.175781 Z M 24.976562 4.175781 '
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
            d='M 2.074219 4.613281 C 2.074219 4.695312 2.074219 4.777344 2.074219 4.859375 C 1.375 5.542969 0.675781 6.226562 -0.0234375 6.910156 C -0.0234375 6.828125 -0.0234375 6.746094 -0.0234375 6.664062 C 0.675781 5.980469 1.375 5.296875 2.074219 4.613281 Z M 2.074219 4.613281 '
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
            d='M 24.976562 5.152344 C 24.976562 5.234375 24.976562 5.3125 24.976562 5.394531 C 22.890625 7.460938 20.808594 9.53125 18.726562 11.597656 C 18.726562 11.515625 18.726562 11.433594 18.726562 11.351562 C 20.808594 9.285156 22.890625 7.21875 24.976562 5.152344 Z M 24.976562 5.152344 '
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
            d='M 2.074219 5.589844 C 2.074219 5.671875 2.074219 5.753906 2.074219 5.835938 C 1.375 6.519531 0.675781 7.203125 -0.0234375 7.886719 C -0.0234375 7.804688 -0.0234375 7.722656 -0.0234375 7.640625 C 0.675781 6.957031 1.375 6.273438 2.074219 5.589844 Z M 2.074219 5.589844 '
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
            d='M 2.613281 5.980469 C 2.695312 5.980469 2.773438 5.980469 2.855469 5.980469 C 1.914062 6.957031 0.953125 7.917969 -0.0234375 8.863281 C -0.0234375 8.78125 -0.0234375 8.699219 -0.0234375 8.617188 C 0.871094 7.753906 1.75 6.875 2.613281 5.980469 Z M 2.613281 5.980469 '
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
            d='M 3.589844 5.980469 C 3.671875 5.980469 3.75 5.980469 3.832031 5.980469 C 2.5625 7.285156 1.277344 8.570312 -0.0234375 9.839844 C -0.0234375 9.757812 -0.0234375 9.675781 -0.0234375 9.59375 C 1.195312 8.40625 2.402344 7.203125 3.589844 5.980469 Z M 3.589844 5.980469 '
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
            d='M 4.566406 5.980469 C 4.648438 5.980469 4.726562 5.980469 4.808594 5.980469 C 4.191406 6.617188 3.574219 7.25 2.953125 7.886719 C 2.871094 7.886719 2.792969 7.886719 2.710938 7.886719 C 3.328125 7.25 3.945312 6.617188 4.566406 5.980469 Z M 4.566406 5.980469 '
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
            d='M 5.542969 5.980469 C 5.625 5.980469 5.703125 5.980469 5.785156 5.980469 C 5.167969 6.617188 4.550781 7.25 3.929688 7.886719 C 3.847656 7.886719 3.769531 7.886719 3.6875 7.886719 C 4.304688 7.25 4.921875 6.617188 5.542969 5.980469 Z M 5.542969 5.980469 '
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
            d='M 6.519531 5.980469 C 6.601562 5.980469 6.679688 5.980469 6.761719 5.980469 C 6.144531 6.617188 5.527344 7.25 4.90625 7.886719 C 4.824219 7.886719 4.746094 7.886719 4.664062 7.886719 C 5.28125 7.25 5.898438 6.617188 6.519531 5.980469 Z M 6.519531 5.980469 '
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
            d='M 7.496094 5.980469 C 7.578125 5.980469 7.65625 5.980469 7.738281 5.980469 C 7.121094 6.617188 6.503906 7.25 5.882812 7.886719 C 5.800781 7.886719 5.722656 7.886719 5.640625 7.886719 C 6.257812 7.25 6.875 6.617188 7.496094 5.980469 Z M 7.496094 5.980469 '
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
            d='M 8.472656 5.980469 C 8.554688 5.980469 8.632812 5.980469 8.714844 5.980469 C 8.097656 6.617188 7.480469 7.25 6.859375 7.886719 C 6.777344 7.886719 6.699219 7.886719 6.617188 7.886719 C 7.234375 7.25 7.851562 6.617188 8.472656 5.980469 Z M 8.472656 5.980469 '
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
            d='M 9.449219 5.980469 C 9.53125 5.980469 9.609375 5.980469 9.691406 5.980469 C 9.074219 6.617188 8.457031 7.25 7.835938 7.886719 C 7.753906 7.886719 7.675781 7.886719 7.59375 7.886719 C 8.210938 7.25 8.828125 6.617188 9.449219 5.980469 Z M 9.449219 5.980469 '
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
            d='M 10.425781 5.980469 C 10.507812 5.980469 10.585938 5.980469 10.667969 5.980469 C 10.050781 6.617188 9.433594 7.25 8.8125 7.886719 C 8.730469 7.886719 8.652344 7.886719 8.570312 7.886719 C 9.1875 7.25 9.804688 6.617188 10.425781 5.980469 Z M 10.425781 5.980469 '
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
            d='M 11.402344 5.980469 C 11.484375 5.980469 11.5625 5.980469 11.644531 5.980469 C 11.027344 6.617188 10.410156 7.25 9.789062 7.886719 C 9.707031 7.886719 9.628906 7.886719 9.546875 7.886719 C 10.164062 7.25 10.78125 6.617188 11.402344 5.980469 Z M 11.402344 5.980469 '
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
            d='M 12.378906 5.980469 C 12.460938 5.980469 12.539062 5.980469 12.621094 5.980469 C 12.003906 6.617188 11.386719 7.25 10.765625 7.886719 C 10.683594 7.886719 10.605469 7.886719 10.523438 7.886719 C 11.140625 7.25 11.757812 6.617188 12.378906 5.980469 Z M 12.378906 5.980469 '
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
            d='M 13.355469 5.980469 C 13.4375 5.980469 13.515625 5.980469 13.597656 5.980469 C 12.980469 6.617188 12.363281 7.25 11.742188 7.886719 C 11.660156 7.886719 11.582031 7.886719 11.5 7.886719 C 12.117188 7.25 12.734375 6.617188 13.355469 5.980469 Z M 13.355469 5.980469 '
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
            d='M 14.332031 5.980469 C 14.414062 5.980469 14.492188 5.980469 14.574219 5.980469 C 13.957031 6.617188 13.339844 7.25 12.71875 7.886719 C 12.636719 7.886719 12.558594 7.886719 12.476562 7.886719 C 13.09375 7.25 13.710938 6.617188 14.332031 5.980469 Z M 14.332031 5.980469 '
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
            d='M 15.308594 5.980469 C 15.390625 5.980469 15.46875 5.980469 15.550781 5.980469 C 14.933594 6.617188 14.316406 7.25 13.695312 7.886719 C 13.613281 7.886719 13.535156 7.886719 13.453125 7.886719 C 14.070312 7.25 14.6875 6.617188 15.308594 5.980469 Z M 15.308594 5.980469 '
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
            d='M 16.285156 5.980469 C 16.367188 5.980469 16.445312 5.980469 16.527344 5.980469 C 15.910156 6.617188 15.292969 7.25 14.671875 7.886719 C 14.589844 7.886719 14.511719 7.886719 14.429688 7.886719 C 15.046875 7.25 15.664062 6.617188 16.285156 5.980469 Z M 16.285156 5.980469 '
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
            d='M 17.261719 5.980469 C 17.34375 5.980469 17.421875 5.980469 17.503906 5.980469 C 16.886719 6.617188 16.269531 7.25 15.648438 7.886719 C 15.566406 7.886719 15.488281 7.886719 15.40625 7.886719 C 16.023438 7.25 16.640625 6.617188 17.261719 5.980469 Z M 17.261719 5.980469 '
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
            d='M 18.238281 5.980469 C 18.320312 5.980469 18.398438 5.980469 18.480469 5.980469 C 17.863281 6.617188 17.246094 7.25 16.625 7.886719 C 16.542969 7.886719 16.464844 7.886719 16.382812 7.886719 C 17 7.25 17.617188 6.617188 18.238281 5.980469 Z M 18.238281 5.980469 '
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
            d='M 19.214844 5.980469 C 19.296875 5.980469 19.375 5.980469 19.457031 5.980469 C 18.839844 6.617188 18.222656 7.25 17.601562 7.886719 C 17.519531 7.886719 17.441406 7.886719 17.359375 7.886719 C 17.976562 7.25 18.59375 6.617188 19.214844 5.980469 Z M 19.214844 5.980469 '
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
            d='M 20.191406 5.980469 C 20.273438 5.980469 20.351562 5.980469 20.433594 5.980469 C 19.816406 6.617188 19.199219 7.25 18.578125 7.886719 C 18.496094 7.886719 18.417969 7.886719 18.335938 7.886719 C 18.953125 7.25 19.570312 6.617188 20.191406 5.980469 Z M 20.191406 5.980469 '
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
            d='M 21.167969 5.980469 C 21.25 5.980469 21.328125 5.980469 21.410156 5.980469 C 20.53125 6.894531 19.636719 7.789062 18.726562 8.667969 C 18.726562 8.585938 18.726562 8.503906 18.726562 8.421875 C 19.554688 7.625 20.371094 6.8125 21.167969 5.980469 Z M 21.167969 5.980469 '
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
            d='M 22.144531 5.980469 C 22.226562 5.980469 22.304688 5.980469 22.386719 5.980469 C 21.183594 7.21875 19.960938 8.4375 18.726562 9.644531 C 18.726562 9.5625 18.726562 9.480469 18.726562 9.398438 C 19.882812 8.277344 21.019531 7.136719 22.144531 5.980469 Z M 22.144531 5.980469 '
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
            d='M 24.976562 6.128906 C 24.976562 6.210938 24.976562 6.289062 24.976562 6.371094 C 21.507812 9.824219 18.042969 13.273438 14.574219 16.722656 C 14.574219 16.640625 14.574219 16.5625 14.574219 16.480469 C 18.042969 13.027344 21.507812 9.578125 24.976562 6.128906 Z M 24.976562 6.128906 '
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
            d='M 24.976562 7.105469 C 24.976562 7.1875 24.976562 7.265625 24.976562 7.347656 C 20.109375 12.199219 15.242188 17.050781 10.375 21.898438 C 10.375 21.816406 10.375 21.738281 10.375 21.65625 C 11.757812 20.304688 13.125 18.9375 14.476562 17.554688 C 14.542969 17.554688 14.574219 17.519531 14.574219 17.457031 C 18.042969 14.003906 21.507812 10.554688 24.976562 7.105469 Z M 24.976562 7.105469 '
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
            d='M 24.976562 8.082031 C 24.976562 8.164062 24.976562 8.242188 24.976562 8.324219 C 20.109375 13.175781 15.242188 18.027344 10.375 22.875 C 10.375 22.792969 10.375 22.714844 10.375 22.632812 C 15.242188 17.78125 20.109375 12.929688 24.976562 8.082031 Z M 24.976562 8.082031 '
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
            d='M 2.074219 8.519531 C 2.074219 8.601562 2.074219 8.683594 2.074219 8.765625 C 1.375 9.449219 0.675781 10.132812 -0.0234375 10.816406 C -0.0234375 10.734375 -0.0234375 10.652344 -0.0234375 10.570312 C 0.675781 9.886719 1.375 9.203125 2.074219 8.519531 Z M 2.074219 8.519531 '
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
            d='M 24.976562 9.058594 C 24.976562 9.140625 24.976562 9.21875 24.976562 9.300781 C 19.734375 14.511719 14.511719 19.734375 9.300781 24.976562 C 9.21875 24.976562 9.140625 24.976562 9.058594 24.976562 C 14.347656 19.652344 19.652344 14.347656 24.976562 9.058594 Z M 24.976562 9.058594 '
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
            d='M 2.074219 9.496094 C 2.074219 9.578125 2.074219 9.660156 2.074219 9.742188 C 1.375 10.425781 0.675781 11.109375 -0.0234375 11.792969 C -0.0234375 11.710938 -0.0234375 11.628906 -0.0234375 11.546875 C 0.675781 10.863281 1.375 10.179688 2.074219 9.496094 Z M 2.074219 9.496094 '
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
            d='M 24.976562 10.035156 C 24.976562 10.117188 24.976562 10.195312 24.976562 10.277344 C 20.058594 15.160156 15.160156 20.058594 10.277344 24.976562 C 10.195312 24.976562 10.117188 24.976562 10.035156 24.976562 C 15 19.980469 19.980469 15 24.976562 10.035156 Z M 24.976562 10.035156 '
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
            d='M 2.074219 10.472656 C 2.074219 10.554688 2.074219 10.636719 2.074219 10.71875 C 1.375 11.402344 0.675781 12.085938 -0.0234375 12.769531 C -0.0234375 12.6875 -0.0234375 12.605469 -0.0234375 12.523438 C 0.675781 11.839844 1.375 11.15625 2.074219 10.472656 Z M 2.074219 10.472656 '
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
            d='M 24.976562 11.011719 C 24.976562 11.09375 24.976562 11.171875 24.976562 11.253906 C 20.386719 15.8125 15.8125 20.386719 11.253906 24.976562 C 11.171875 24.976562 11.09375 24.976562 11.011719 24.976562 C 15.648438 20.304688 20.304688 15.648438 24.976562 11.011719 Z M 24.976562 11.011719 '
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
            d='M 2.074219 11.449219 C 2.074219 11.53125 2.074219 11.613281 2.074219 11.695312 C 1.375 12.378906 0.675781 13.0625 -0.0234375 13.746094 C -0.0234375 13.664062 -0.0234375 13.582031 -0.0234375 13.5 C 0.675781 12.816406 1.375 12.132812 2.074219 11.449219 Z M 2.074219 11.449219 '
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
            d='M 2.710938 11.742188 C 2.792969 11.742188 2.871094 11.742188 2.953125 11.742188 C 1.976562 12.753906 0.984375 13.746094 -0.0234375 14.722656 C -0.0234375 14.640625 -0.0234375 14.558594 -0.0234375 14.476562 C 0.902344 13.582031 1.816406 12.671875 2.710938 11.742188 Z M 2.710938 11.742188 '
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
            d='M 3.6875 11.742188 C 3.769531 11.742188 3.847656 11.742188 3.929688 11.742188 C 2.628906 13.078125 1.308594 14.394531 -0.0234375 15.699219 C -0.0234375 15.617188 -0.0234375 15.535156 -0.0234375 15.453125 C 1.230469 14.234375 2.464844 12.996094 3.6875 11.742188 Z M 3.6875 11.742188 '
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
            d='M 4.664062 11.742188 C 4.746094 11.742188 4.824219 11.742188 4.90625 11.742188 C 4.273438 12.394531 3.636719 13.046875 3.003906 13.695312 C 2.921875 13.695312 2.839844 13.695312 2.757812 13.695312 C 3.394531 13.046875 4.027344 12.394531 4.664062 11.742188 Z M 4.664062 11.742188 '
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
            d='M 5.640625 11.742188 C 5.722656 11.742188 5.800781 11.742188 5.882812 11.742188 C 5.25 12.394531 4.613281 13.046875 3.980469 13.695312 C 3.898438 13.695312 3.816406 13.695312 3.734375 13.695312 C 4.371094 13.046875 5.003906 12.394531 5.640625 11.742188 Z M 5.640625 11.742188 '
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
            d='M 6.617188 11.742188 C 6.699219 11.742188 6.777344 11.742188 6.859375 11.742188 C 6.226562 12.394531 5.589844 13.046875 4.957031 13.695312 C 4.875 13.695312 4.792969 13.695312 4.710938 13.695312 C 5.347656 13.046875 5.980469 12.394531 6.617188 11.742188 Z M 6.617188 11.742188 '
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
            d='M 7.59375 11.742188 C 7.675781 11.742188 7.753906 11.742188 7.835938 11.742188 C 7.203125 12.394531 6.566406 13.046875 5.933594 13.695312 C 5.851562 13.695312 5.769531 13.695312 5.6875 13.695312 C 6.324219 13.046875 6.957031 12.394531 7.59375 11.742188 Z M 7.59375 11.742188 '
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
            d='M 8.570312 11.742188 C 8.652344 11.742188 8.730469 11.742188 8.8125 11.742188 C 8.179688 12.394531 7.542969 13.046875 6.910156 13.695312 C 6.828125 13.695312 6.746094 13.695312 6.664062 13.695312 C 7.300781 13.046875 7.933594 12.394531 8.570312 11.742188 Z M 8.570312 11.742188 '
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
            d='M 9.546875 11.742188 C 9.628906 11.742188 9.707031 11.742188 9.789062 11.742188 C 9.15625 12.394531 8.519531 13.046875 7.886719 13.695312 C 7.804688 13.695312 7.722656 13.695312 7.640625 13.695312 C 8.277344 13.046875 8.910156 12.394531 9.546875 11.742188 Z M 9.546875 11.742188 '
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
            d='M 10.523438 11.742188 C 10.605469 11.742188 10.683594 11.742188 10.765625 11.742188 C 10.132812 12.394531 9.496094 13.046875 8.863281 13.695312 C 8.78125 13.695312 8.699219 13.695312 8.617188 13.695312 C 9.253906 13.046875 9.886719 12.394531 10.523438 11.742188 Z M 10.523438 11.742188 '
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
            d='M 11.5 11.742188 C 11.582031 11.742188 11.660156 11.742188 11.742188 11.742188 C 11.109375 12.394531 10.472656 13.046875 9.839844 13.695312 C 9.757812 13.695312 9.675781 13.695312 9.59375 13.695312 C 10.230469 13.046875 10.863281 12.394531 11.5 11.742188 Z M 11.5 11.742188 '
          />
        </g>
        <mask id='mask78'>
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
        <clipPath id='clip79'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface239' clipPath='url(#clip79)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 12.476562 11.742188 C 12.558594 11.742188 12.636719 11.742188 12.71875 11.742188 C 12.085938 12.394531 11.449219 13.046875 10.816406 13.695312 C 10.734375 13.695312 10.652344 13.695312 10.570312 13.695312 C 11.207031 13.046875 11.839844 12.394531 12.476562 11.742188 Z M 12.476562 11.742188 '
          />
        </g>
        <mask id='mask79'>
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
        <clipPath id='clip80'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface242' clipPath='url(#clip80)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 13.453125 11.742188 C 13.535156 11.742188 13.613281 11.742188 13.695312 11.742188 C 13.0625 12.394531 12.425781 13.046875 11.792969 13.695312 C 11.710938 13.695312 11.628906 13.695312 11.546875 13.695312 C 12.183594 13.046875 12.816406 12.394531 13.453125 11.742188 Z M 13.453125 11.742188 '
          />
        </g>
        <mask id='mask80'>
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
        <clipPath id='clip81'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface245' clipPath='url(#clip81)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 14.429688 11.742188 C 14.511719 11.742188 14.589844 11.742188 14.671875 11.742188 C 14.039062 12.394531 13.402344 13.046875 12.769531 13.695312 C 12.6875 13.695312 12.605469 13.695312 12.523438 13.695312 C 13.160156 13.046875 13.792969 12.394531 14.429688 11.742188 Z M 14.429688 11.742188 '
          />
        </g>
        <mask id='mask81'>
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
        <clipPath id='clip82'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface248' clipPath='url(#clip82)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 15.40625 11.742188 C 15.488281 11.742188 15.566406 11.742188 15.648438 11.742188 C 15.015625 12.394531 14.378906 13.046875 13.746094 13.695312 C 13.664062 13.695312 13.582031 13.695312 13.5 13.695312 C 14.136719 13.046875 14.769531 12.394531 15.40625 11.742188 Z M 15.40625 11.742188 '
          />
        </g>
        <mask id='mask82'>
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
        <clipPath id='clip83'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface251' clipPath='url(#clip83)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 16.382812 11.742188 C 16.464844 11.742188 16.542969 11.742188 16.625 11.742188 C 15.957031 12.441406 15.273438 13.125 14.574219 13.792969 C 14.574219 13.730469 14.542969 13.695312 14.476562 13.695312 C 15.113281 13.046875 15.746094 12.394531 16.382812 11.742188 Z M 16.382812 11.742188 '
          />
        </g>
        <mask id='mask83'>
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
        <clipPath id='clip84'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface254' clipPath='url(#clip84)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 17.359375 11.742188 C 17.441406 11.742188 17.519531 11.742188 17.601562 11.742188 C 16.609375 12.769531 15.601562 13.777344 14.574219 14.769531 C 14.574219 14.6875 14.574219 14.609375 14.574219 14.527344 C 15.519531 13.613281 16.445312 12.6875 17.359375 11.742188 Z M 17.359375 11.742188 '
          />
        </g>
        <mask id='mask84'>
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
        <clipPath id='clip85'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface257' clipPath='url(#clip85)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 18.335938 11.742188 C 18.417969 11.742188 18.496094 11.742188 18.578125 11.742188 C 17.261719 13.09375 15.925781 14.429688 14.574219 15.746094 C 14.574219 15.664062 14.574219 15.585938 14.574219 15.503906 C 15.84375 14.265625 17.097656 13.011719 18.335938 11.742188 Z M 18.335938 11.742188 '
          />
        </g>
        <mask id='mask85'>
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
        <clipPath id='clip86'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface260' clipPath='url(#clip86)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 24.976562 11.988281 C 24.976562 12.070312 24.976562 12.148438 24.976562 12.230469 C 20.710938 16.464844 16.464844 20.710938 12.230469 24.976562 C 12.148438 24.976562 12.070312 24.976562 11.988281 24.976562 C 16.300781 20.628906 20.628906 16.300781 24.976562 11.988281 Z M 24.976562 11.988281 '
          />
        </g>
        <mask id='mask86'>
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
        <clipPath id='clip87'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface263' clipPath='url(#clip87)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 24.976562 12.964844 C 24.976562 13.046875 24.976562 13.125 24.976562 13.207031 C 21.035156 17.113281 17.113281 21.035156 13.207031 24.976562 C 13.125 24.976562 13.046875 24.976562 12.964844 24.976562 C 16.953125 20.957031 20.957031 16.953125 24.976562 12.964844 Z M 24.976562 12.964844 '
          />
        </g>
        <mask id='mask87'>
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
        <clipPath id='clip88'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface266' clipPath='url(#clip88)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 24.976562 13.941406 C 24.976562 14.023438 24.976562 14.101562 24.976562 14.183594 C 21.363281 17.765625 17.765625 21.363281 14.183594 24.976562 C 14.101562 24.976562 14.023438 24.976562 13.941406 24.976562 C 17.601562 21.28125 21.28125 17.601562 24.976562 13.941406 Z M 24.976562 13.941406 '
          />
        </g>
        <mask id='mask88'>
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
        <clipPath id='clip89'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface269' clipPath='url(#clip89)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 2.074219 14.378906 C 2.074219 14.460938 2.074219 14.542969 2.074219 14.625 C 1.375 15.308594 0.675781 15.992188 -0.0234375 16.675781 C -0.0234375 16.59375 -0.0234375 16.511719 -0.0234375 16.429688 C 0.675781 15.746094 1.375 15.0625 2.074219 14.378906 Z M 2.074219 14.378906 '
          />
        </g>
        <mask id='mask89'>
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
        <clipPath id='clip90'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface272' clipPath='url(#clip90)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 24.976562 14.917969 C 24.976562 15 24.976562 15.078125 24.976562 15.160156 C 21.6875 18.417969 18.417969 21.6875 15.160156 24.976562 C 15.078125 24.976562 15 24.976562 14.917969 24.976562 C 18.253906 21.605469 21.605469 18.253906 24.976562 14.917969 Z M 24.976562 14.917969 '
          />
        </g>
        <mask id='mask90'>
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
        <clipPath id='clip91'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface275' clipPath='url(#clip91)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 2.074219 15.355469 C 2.074219 15.4375 2.074219 15.519531 2.074219 15.601562 C 1.375 16.285156 0.675781 16.96875 -0.0234375 17.652344 C -0.0234375 17.570312 -0.0234375 17.488281 -0.0234375 17.40625 C 0.675781 16.722656 1.375 16.039062 2.074219 15.355469 Z M 2.074219 15.355469 '
          />
        </g>
        <mask id='mask91'>
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
        <clipPath id='clip92'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface278' clipPath='url(#clip92)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 24.976562 15.894531 C 24.976562 15.976562 24.976562 16.054688 24.976562 16.136719 C 22.011719 19.066406 19.066406 22.011719 16.136719 24.976562 C 16.054688 24.976562 15.976562 24.976562 15.894531 24.976562 C 18.90625 21.933594 21.933594 18.90625 24.976562 15.894531 Z M 24.976562 15.894531 '
          />
        </g>
        <mask id='mask92'>
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
        <clipPath id='clip93'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface281' clipPath='url(#clip93)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 2.074219 16.332031 C 2.074219 16.414062 2.074219 16.496094 2.074219 16.578125 C 1.375 17.261719 0.675781 17.945312 -0.0234375 18.628906 C -0.0234375 18.546875 -0.0234375 18.464844 -0.0234375 18.382812 C 0.675781 17.699219 1.375 17.015625 2.074219 16.332031 Z M 2.074219 16.332031 '
          />
        </g>
        <mask id='mask93'>
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
        <clipPath id='clip94'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface284' clipPath='url(#clip94)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 24.976562 16.871094 C 24.976562 16.953125 24.976562 17.03125 24.976562 17.113281 C 22.339844 19.71875 19.71875 22.339844 17.113281 24.976562 C 17.03125 24.976562 16.953125 24.976562 16.871094 24.976562 C 19.554688 22.257812 22.257812 19.554688 24.976562 16.871094 Z M 24.976562 16.871094 '
          />
        </g>
        <mask id='mask94'>
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
        <clipPath id='clip95'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface287' clipPath='url(#clip95)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 2.074219 17.308594 C 2.074219 17.390625 2.074219 17.472656 2.074219 17.554688 C 1.375 18.238281 0.675781 18.921875 -0.0234375 19.605469 C -0.0234375 19.523438 -0.0234375 19.441406 -0.0234375 19.359375 C 0.675781 18.675781 1.375 17.992188 2.074219 17.308594 Z M 2.074219 17.308594 '
          />
        </g>
        <mask id='mask95'>
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
        <clipPath id='clip96'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface290' clipPath='url(#clip96)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 2.757812 17.554688 C 2.839844 17.554688 2.921875 17.554688 3.003906 17.554688 C 2.011719 18.578125 1 19.589844 -0.0234375 20.582031 C -0.0234375 20.5 -0.0234375 20.417969 -0.0234375 20.335938 C 0.917969 19.425781 1.847656 18.496094 2.757812 17.554688 Z M 2.757812 17.554688 '
          />
        </g>
        <mask id='mask96'>
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
        <clipPath id='clip97'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface293' clipPath='url(#clip97)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 3.734375 17.554688 C 3.816406 17.554688 3.898438 17.554688 3.980469 17.554688 C 3.507812 18.042969 3.035156 18.53125 2.5625 19.019531 C 2.480469 19.019531 2.402344 19.019531 2.320312 19.019531 C 2.792969 18.53125 3.261719 18.042969 3.734375 17.554688 Z M 3.734375 17.554688 '
          />
        </g>
        <mask id='mask97'>
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
        <clipPath id='clip98'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface296' clipPath='url(#clip98)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 4.710938 17.554688 C 4.792969 17.554688 4.875 17.554688 4.957031 17.554688 C 4.484375 18.042969 4.011719 18.53125 3.539062 19.019531 C 3.457031 19.019531 3.378906 19.019531 3.296875 19.019531 C 3.769531 18.53125 4.238281 18.042969 4.710938 17.554688 Z M 4.710938 17.554688 '
          />
        </g>
        <mask id='mask98'>
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
        <clipPath id='clip99'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface299' clipPath='url(#clip99)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 5.6875 17.554688 C 5.769531 17.554688 5.851562 17.554688 5.933594 17.554688 C 5.460938 18.042969 4.988281 18.53125 4.515625 19.019531 C 4.433594 19.019531 4.355469 19.019531 4.273438 19.019531 C 4.746094 18.53125 5.214844 18.042969 5.6875 17.554688 Z M 5.6875 17.554688 '
          />
        </g>
        <mask id='mask99'>
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
        <clipPath id='clip100'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface302' clipPath='url(#clip100)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 6.664062 17.554688 C 6.746094 17.554688 6.828125 17.554688 6.910156 17.554688 C 6.4375 18.042969 5.964844 18.53125 5.492188 19.019531 C 5.410156 19.019531 5.332031 19.019531 5.25 19.019531 C 5.722656 18.53125 6.191406 18.042969 6.664062 17.554688 Z M 6.664062 17.554688 '
          />
        </g>
        <mask id='mask100'>
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
        <clipPath id='clip101'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface305' clipPath='url(#clip101)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 7.640625 17.554688 C 7.722656 17.554688 7.804688 17.554688 7.886719 17.554688 C 7.414062 18.042969 6.941406 18.53125 6.46875 19.019531 C 6.386719 19.019531 6.308594 19.019531 6.226562 19.019531 C 6.699219 18.53125 7.167969 18.042969 7.640625 17.554688 Z M 7.640625 17.554688 '
          />
        </g>
        <mask id='mask101'>
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
        <clipPath id='clip102'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface308' clipPath='url(#clip102)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 8.617188 17.554688 C 8.699219 17.554688 8.78125 17.554688 8.863281 17.554688 C 8.390625 18.042969 7.917969 18.53125 7.445312 19.019531 C 7.363281 19.019531 7.285156 19.019531 7.203125 19.019531 C 7.675781 18.53125 8.144531 18.042969 8.617188 17.554688 Z M 8.617188 17.554688 '
          />
        </g>
        <mask id='mask102'>
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
        <clipPath id='clip103'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface311' clipPath='url(#clip103)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 9.59375 17.554688 C 9.675781 17.554688 9.757812 17.554688 9.839844 17.554688 C 9.367188 18.042969 8.894531 18.53125 8.421875 19.019531 C 8.339844 19.019531 8.261719 19.019531 8.179688 19.019531 C 8.652344 18.53125 9.121094 18.042969 9.59375 17.554688 Z M 9.59375 17.554688 '
          />
        </g>
        <mask id='mask103'>
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
        <clipPath id='clip104'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface314' clipPath='url(#clip104)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 10.570312 17.554688 C 10.652344 17.554688 10.734375 17.554688 10.816406 17.554688 C 10.34375 18.042969 9.871094 18.53125 9.398438 19.019531 C 9.316406 19.019531 9.238281 19.019531 9.15625 19.019531 C 9.628906 18.53125 10.097656 18.042969 10.570312 17.554688 Z M 10.570312 17.554688 '
          />
        </g>
        <mask id='mask104'>
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
        <clipPath id='clip105'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface317' clipPath='url(#clip105)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 11.546875 17.554688 C 11.628906 17.554688 11.710938 17.554688 11.792969 17.554688 C 11.320312 18.042969 10.847656 18.53125 10.375 19.019531 C 10.292969 19.019531 10.214844 19.019531 10.132812 19.019531 C 10.605469 18.53125 11.074219 18.042969 11.546875 17.554688 Z M 11.546875 17.554688 '
          />
        </g>
        <mask id='mask105'>
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
        <clipPath id='clip106'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface320' clipPath='url(#clip106)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 12.523438 17.554688 C 12.605469 17.554688 12.6875 17.554688 12.769531 17.554688 C 11.988281 18.367188 11.191406 19.164062 10.375 19.945312 C 10.375 19.863281 10.375 19.785156 10.375 19.703125 C 11.109375 19.003906 11.824219 18.285156 12.523438 17.554688 Z M 12.523438 17.554688 '
          />
        </g>
        <mask id='mask106'>
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
        <clipPath id='clip107'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface323' clipPath='url(#clip107)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 13.5 17.554688 C 13.582031 17.554688 13.664062 17.554688 13.746094 17.554688 C 12.636719 18.691406 11.515625 19.816406 10.375 20.921875 C 10.375 20.839844 10.375 20.761719 10.375 20.679688 C 11.433594 19.652344 12.476562 18.613281 13.5 17.554688 Z M 13.5 17.554688 '
          />
        </g>
        <mask id='mask107'>
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
        <clipPath id='clip108'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface326' clipPath='url(#clip108)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 24.976562 17.847656 C 24.976562 17.929688 24.976562 18.007812 24.976562 18.089844 C 22.664062 20.371094 20.371094 22.664062 18.089844 24.976562 C 18.007812 24.976562 17.929688 24.976562 17.847656 24.976562 C 20.207031 22.582031 22.582031 20.207031 24.976562 17.847656 Z M 24.976562 17.847656 '
          />
        </g>
        <mask id='mask108'>
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
        <clipPath id='clip109'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface329' clipPath='url(#clip109)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 24.976562 18.824219 C 24.976562 18.90625 24.976562 18.984375 24.976562 19.066406 C 22.988281 21.019531 21.019531 22.988281 19.066406 24.976562 C 18.984375 24.976562 18.90625 24.976562 18.824219 24.976562 C 20.859375 22.910156 22.910156 20.859375 24.976562 18.824219 Z M 24.976562 18.824219 '
          />
        </g>
        <mask id='mask109'>
          <g filter='url(#alpha)'>
            <rect
              x={0}
              y={0}
              width={25}
              height={25}
              style={{
                fill: "rgb(0%, 0%, 0%)",
                fillOpacity: "0.996078",
                stroke: "none",
              }}
            />
          </g>
        </mask>
        <clipPath id='clip110'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface332' clipPath='url(#clip110)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 2.320312 19.019531 C 2.402344 19.019531 2.480469 19.019531 2.5625 19.019531 C 2.808594 19.019531 3.050781 19.019531 3.296875 19.019531 C 3.378906 19.019531 3.457031 19.019531 3.539062 19.019531 C 3.785156 19.019531 4.027344 19.019531 4.273438 19.019531 C 4.355469 19.019531 4.433594 19.019531 4.515625 19.019531 C 4.761719 19.019531 5.003906 19.019531 5.25 19.019531 C 5.332031 19.019531 5.410156 19.019531 5.492188 19.019531 C 5.738281 19.019531 5.980469 19.019531 6.226562 19.019531 C 6.308594 19.019531 6.386719 19.019531 6.46875 19.019531 C 6.714844 19.019531 6.957031 19.019531 7.203125 19.019531 C 7.285156 19.019531 7.363281 19.019531 7.445312 19.019531 C 7.691406 19.019531 7.933594 19.019531 8.179688 19.019531 C 8.261719 19.019531 8.339844 19.019531 8.421875 19.019531 C 8.667969 19.019531 8.910156 19.019531 9.15625 19.019531 C 9.238281 19.019531 9.316406 19.019531 9.398438 19.019531 C 9.644531 19.019531 9.886719 19.019531 10.132812 19.019531 C 10.214844 19.019531 10.292969 19.019531 10.375 19.019531 C 10.375 19.246094 10.375 19.472656 10.375 19.703125 C 10.375 19.785156 10.375 19.863281 10.375 19.945312 C 10.375 20.191406 10.375 20.433594 10.375 20.679688 C 10.375 20.761719 10.375 20.839844 10.375 20.921875 C 10.375 21.167969 10.375 21.410156 10.375 21.65625 C 10.375 21.738281 10.375 21.816406 10.375 21.898438 C 10.375 22.144531 10.375 22.386719 10.375 22.632812 C 10.375 22.714844 10.375 22.792969 10.375 22.875 C 10.375 22.910156 10.359375 22.925781 10.328125 22.925781 C 10.246094 22.925781 10.164062 22.925781 10.082031 22.925781 C 9.839844 22.925781 9.59375 22.925781 9.351562 22.925781 C 9.269531 22.925781 9.1875 22.925781 9.105469 22.925781 C 8.863281 22.925781 8.617188 22.925781 8.375 22.925781 C 8.292969 22.925781 8.210938 22.925781 8.128906 22.925781 C 7.886719 22.925781 7.640625 22.925781 7.398438 22.925781 C 7.316406 22.925781 7.234375 22.925781 7.152344 22.925781 C 6.910156 22.925781 6.664062 22.925781 6.421875 22.925781 C 6.339844 22.925781 6.257812 22.925781 6.175781 22.925781 C 5.933594 22.925781 5.6875 22.925781 5.445312 22.925781 C 5.363281 22.925781 5.28125 22.925781 5.199219 22.925781 C 4.957031 22.925781 4.710938 22.925781 4.46875 22.925781 C 4.386719 22.925781 4.304688 22.925781 4.222656 22.925781 C 3.980469 22.925781 3.734375 22.925781 3.492188 22.925781 C 3.410156 22.925781 3.328125 22.925781 3.246094 22.925781 C 3.003906 22.925781 2.757812 22.925781 2.515625 22.925781 C 2.433594 22.925781 2.351562 22.925781 2.269531 22.925781 C 2.207031 22.925781 2.140625 22.925781 2.074219 22.925781 C 2.074219 22.761719 2.074219 22.597656 2.074219 22.4375 C 2.074219 22.355469 2.074219 22.273438 2.074219 22.191406 C 2.074219 21.949219 2.074219 21.703125 2.074219 21.460938 C 2.074219 21.378906 2.074219 21.296875 2.074219 21.214844 C 2.074219 20.972656 2.074219 20.726562 2.074219 20.484375 C 2.074219 20.402344 2.074219 20.320312 2.074219 20.238281 C 2.074219 19.996094 2.074219 19.75 2.074219 19.507812 C 2.074219 19.425781 2.074219 19.34375 2.074219 19.261719 C 2.074219 19.179688 2.074219 19.101562 2.074219 19.019531 C 2.15625 19.019531 2.238281 19.019531 2.320312 19.019531 Z M 2.320312 19.019531 '
          />
        </g>
        <mask id='mask110'>
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
        <clipPath id='clip111'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface335' clipPath='url(#clip111)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 2.074219 19.261719 C 2.074219 19.34375 2.074219 19.425781 2.074219 19.507812 C 1.375 20.191406 0.675781 20.875 -0.0234375 21.558594 C -0.0234375 21.476562 -0.0234375 21.394531 -0.0234375 21.3125 C 0.675781 20.628906 1.375 19.945312 2.074219 19.261719 Z M 2.074219 19.261719 '
          />
        </g>
        <mask id='mask111'>
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
        <clipPath id='clip112'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface338' clipPath='url(#clip112)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 24.976562 19.800781 C 24.976562 19.882812 24.976562 19.960938 24.976562 20.042969 C 23.316406 21.671875 21.671875 23.316406 20.042969 24.976562 C 19.960938 24.976562 19.882812 24.976562 19.800781 24.976562 C 21.507812 23.234375 23.234375 21.507812 24.976562 19.800781 Z M 24.976562 19.800781 '
          />
        </g>
        <mask id='mask112'>
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
        <clipPath id='clip113'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface341' clipPath='url(#clip113)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 2.074219 20.238281 C 2.074219 20.320312 2.074219 20.402344 2.074219 20.484375 C 1.375 21.167969 0.675781 21.851562 -0.0234375 22.535156 C -0.0234375 22.453125 -0.0234375 22.371094 -0.0234375 22.289062 C 0.675781 21.605469 1.375 20.921875 2.074219 20.238281 Z M 2.074219 20.238281 '
          />
        </g>
        <mask id='mask113'>
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
        <clipPath id='clip114'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface344' clipPath='url(#clip114)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 24.976562 20.777344 C 24.976562 20.859375 24.976562 20.9375 24.976562 21.019531 C 23.640625 22.324219 22.324219 23.640625 21.019531 24.976562 C 20.9375 24.976562 20.859375 24.976562 20.777344 24.976562 C 22.160156 23.558594 23.558594 22.160156 24.976562 20.777344 Z M 24.976562 20.777344 '
          />
        </g>
        <mask id='mask114'>
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
        <clipPath id='clip115'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface347' clipPath='url(#clip115)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 2.074219 21.214844 C 2.074219 21.296875 2.074219 21.378906 2.074219 21.460938 C 1.375 22.144531 0.675781 22.828125 -0.0234375 23.511719 C -0.0234375 23.429688 -0.0234375 23.347656 -0.0234375 23.265625 C 0.675781 22.582031 1.375 21.898438 2.074219 21.214844 Z M 2.074219 21.214844 '
          />
        </g>
        <mask id='mask115'>
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
        <clipPath id='clip116'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface350' clipPath='url(#clip116)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 24.976562 21.753906 C 24.976562 21.835938 24.976562 21.914062 24.976562 21.996094 C 23.964844 22.972656 22.972656 23.964844 21.996094 24.976562 C 21.914062 24.976562 21.835938 24.976562 21.753906 24.976562 C 22.8125 23.886719 23.886719 22.8125 24.976562 21.753906 Z M 24.976562 21.753906 '
          />
        </g>
        <mask id='mask116'>
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
        <clipPath id='clip117'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface353' clipPath='url(#clip117)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 2.074219 22.191406 C 2.074219 22.273438 2.074219 22.355469 2.074219 22.4375 C 1.375 23.121094 0.675781 23.804688 -0.0234375 24.488281 C -0.0234375 24.40625 -0.0234375 24.324219 -0.0234375 24.242188 C 0.675781 23.558594 1.375 22.875 2.074219 22.191406 Z M 2.074219 22.191406 '
          />
        </g>
        <mask id='mask117'>
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
        <clipPath id='clip118'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface356' clipPath='url(#clip118)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 24.976562 22.730469 C 24.976562 22.8125 24.976562 22.890625 24.976562 22.972656 C 24.292969 23.625 23.625 24.292969 22.972656 24.976562 C 22.890625 24.976562 22.8125 24.976562 22.730469 24.976562 C 23.460938 24.210938 24.210938 23.460938 24.976562 22.730469 Z M 24.976562 22.730469 '
          />
        </g>
        <mask id='mask118'>
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
        <clipPath id='clip119'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface359' clipPath='url(#clip119)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 2.269531 22.925781 C 2.351562 22.925781 2.433594 22.925781 2.515625 22.925781 C 1.847656 23.609375 1.179688 24.292969 0.511719 24.976562 C 0.429688 24.976562 0.351562 24.976562 0.269531 24.976562 C 0.9375 24.292969 1.601562 23.609375 2.269531 22.925781 Z M 2.269531 22.925781 '
          />
        </g>
        <mask id='mask119'>
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
        <clipPath id='clip120'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface362' clipPath='url(#clip120)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 3.246094 22.925781 C 3.328125 22.925781 3.410156 22.925781 3.492188 22.925781 C 2.824219 23.609375 2.15625 24.292969 1.488281 24.976562 C 1.40625 24.976562 1.328125 24.976562 1.246094 24.976562 C 1.914062 24.292969 2.578125 23.609375 3.246094 22.925781 Z M 3.246094 22.925781 '
          />
        </g>
        <mask id='mask120'>
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
        <clipPath id='clip121'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface365' clipPath='url(#clip121)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 4.222656 22.925781 C 4.304688 22.925781 4.386719 22.925781 4.46875 22.925781 C 3.800781 23.609375 3.132812 24.292969 2.464844 24.976562 C 2.382812 24.976562 2.304688 24.976562 2.222656 24.976562 C 2.890625 24.292969 3.554688 23.609375 4.222656 22.925781 Z M 4.222656 22.925781 '
          />
        </g>
        <mask id='mask121'>
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
        <clipPath id='clip122'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface368' clipPath='url(#clip122)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 5.199219 22.925781 C 5.28125 22.925781 5.363281 22.925781 5.445312 22.925781 C 4.777344 23.609375 4.109375 24.292969 3.441406 24.976562 C 3.359375 24.976562 3.28125 24.976562 3.199219 24.976562 C 3.867188 24.292969 4.53125 23.609375 5.199219 22.925781 Z M 5.199219 22.925781 '
          />
        </g>
        <mask id='mask122'>
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
        <clipPath id='clip123'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface371' clipPath='url(#clip123)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 6.175781 22.925781 C 6.257812 22.925781 6.339844 22.925781 6.421875 22.925781 C 5.753906 23.609375 5.085938 24.292969 4.417969 24.976562 C 4.335938 24.976562 4.257812 24.976562 4.175781 24.976562 C 4.84375 24.292969 5.507812 23.609375 6.175781 22.925781 Z M 6.175781 22.925781 '
          />
        </g>
        <mask id='mask123'>
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
        <clipPath id='clip124'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface374' clipPath='url(#clip124)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 7.152344 22.925781 C 7.234375 22.925781 7.316406 22.925781 7.398438 22.925781 C 6.730469 23.609375 6.0625 24.292969 5.394531 24.976562 C 5.3125 24.976562 5.234375 24.976562 5.152344 24.976562 C 5.820312 24.292969 6.484375 23.609375 7.152344 22.925781 Z M 7.152344 22.925781 '
          />
        </g>
        <mask id='mask124'>
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
        <clipPath id='clip125'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface377' clipPath='url(#clip125)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 8.128906 22.925781 C 8.210938 22.925781 8.292969 22.925781 8.375 22.925781 C 7.707031 23.609375 7.039062 24.292969 6.371094 24.976562 C 6.289062 24.976562 6.210938 24.976562 6.128906 24.976562 C 6.796875 24.292969 7.460938 23.609375 8.128906 22.925781 Z M 8.128906 22.925781 '
          />
        </g>
        <mask id='mask125'>
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
        <clipPath id='clip126'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface380' clipPath='url(#clip126)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 9.105469 22.925781 C 9.1875 22.925781 9.269531 22.925781 9.351562 22.925781 C 8.683594 23.609375 8.015625 24.292969 7.347656 24.976562 C 7.265625 24.976562 7.1875 24.976562 7.105469 24.976562 C 7.773438 24.292969 8.4375 23.609375 9.105469 22.925781 Z M 9.105469 22.925781 '
          />
        </g>
        <mask id='mask126'>
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
        <clipPath id='clip127'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface383' clipPath='url(#clip127)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 10.082031 22.925781 C 10.164062 22.925781 10.246094 22.925781 10.328125 22.925781 C 9.660156 23.609375 8.992188 24.292969 8.324219 24.976562 C 8.242188 24.976562 8.164062 24.976562 8.082031 24.976562 C 8.75 24.292969 9.414062 23.609375 10.082031 22.925781 Z M 10.082031 22.925781 '
          />
        </g>
        <mask id='mask127'>
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
        <clipPath id='clip128'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface386' clipPath='url(#clip128)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 24.976562 23.707031 C 24.976562 23.789062 24.976562 23.867188 24.976562 23.949219 C 24.617188 24.277344 24.277344 24.617188 23.949219 24.976562 C 23.867188 24.976562 23.789062 24.976562 23.707031 24.976562 C 24.113281 24.535156 24.535156 24.113281 24.976562 23.707031 Z M 24.976562 23.707031 '
          />
        </g>
        <mask id='mask128'>
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
        <clipPath id='clip129'>
          <rect x={0} y={0} width={25} height={25} />
        </clipPath>
        <g id='surface389' clipPath='url(#clip129)'>
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
            d='M 24.976562 24.683594 C 24.976562 24.765625 24.976562 24.84375 24.976562 24.925781 C 24.941406 24.925781 24.925781 24.941406 24.925781 24.976562 C 24.84375 24.976562 24.765625 24.976562 24.683594 24.976562 C 24.765625 24.863281 24.863281 24.765625 24.976562 24.683594 Z M 24.976562 24.683594 '
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
        <use xlinkHref='#surface89' mask='url(#mask28)' />
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
        <path
          style={{
            stroke: "none",
            fillRule: "evenodd",
            fill: appThemeBgColor,
            fillOpacity: 1,
          }}
          d='M 2.710938 7.886719 C 2.792969 7.886719 2.871094 7.886719 2.953125 7.886719 C 3.199219 7.886719 3.441406 7.886719 3.6875 7.886719 C 3.769531 7.886719 3.847656 7.886719 3.929688 7.886719 C 4.175781 7.886719 4.417969 7.886719 4.664062 7.886719 C 4.746094 7.886719 4.824219 7.886719 4.90625 7.886719 C 5.152344 7.886719 5.394531 7.886719 5.640625 7.886719 C 5.722656 7.886719 5.800781 7.886719 5.882812 7.886719 C 6.128906 7.886719 6.371094 7.886719 6.617188 7.886719 C 6.699219 7.886719 6.777344 7.886719 6.859375 7.886719 C 7.105469 7.886719 7.347656 7.886719 7.59375 7.886719 C 7.675781 7.886719 7.753906 7.886719 7.835938 7.886719 C 8.082031 7.886719 8.324219 7.886719 8.570312 7.886719 C 8.652344 7.886719 8.730469 7.886719 8.8125 7.886719 C 9.058594 7.886719 9.300781 7.886719 9.546875 7.886719 C 9.628906 7.886719 9.707031 7.886719 9.789062 7.886719 C 10.035156 7.886719 10.277344 7.886719 10.523438 7.886719 C 10.605469 7.886719 10.683594 7.886719 10.765625 7.886719 C 11.011719 7.886719 11.253906 7.886719 11.5 7.886719 C 11.582031 7.886719 11.660156 7.886719 11.742188 7.886719 C 11.988281 7.886719 12.230469 7.886719 12.476562 7.886719 C 12.558594 7.886719 12.636719 7.886719 12.71875 7.886719 C 12.964844 7.886719 13.207031 7.886719 13.453125 7.886719 C 13.535156 7.886719 13.613281 7.886719 13.695312 7.886719 C 13.941406 7.886719 14.183594 7.886719 14.429688 7.886719 C 14.511719 7.886719 14.589844 7.886719 14.671875 7.886719 C 14.917969 7.886719 15.160156 7.886719 15.40625 7.886719 C 15.488281 7.886719 15.566406 7.886719 15.648438 7.886719 C 15.894531 7.886719 16.136719 7.886719 16.382812 7.886719 C 16.464844 7.886719 16.542969 7.886719 16.625 7.886719 C 16.871094 7.886719 17.113281 7.886719 17.359375 7.886719 C 17.441406 7.886719 17.519531 7.886719 17.601562 7.886719 C 17.847656 7.886719 18.089844 7.886719 18.335938 7.886719 C 18.417969 7.886719 18.496094 7.886719 18.578125 7.886719 C 18.628906 7.886719 18.675781 7.886719 18.726562 7.886719 C 18.726562 8.066406 18.726562 8.242188 18.726562 8.421875 C 18.726562 8.503906 18.726562 8.585938 18.726562 8.667969 C 18.726562 8.910156 18.726562 9.15625 18.726562 9.398438 C 18.726562 9.480469 18.726562 9.5625 18.726562 9.644531 C 18.726562 9.886719 18.726562 10.132812 18.726562 10.375 C 18.726562 10.457031 18.726562 10.539062 18.726562 10.621094 C 18.726562 10.863281 18.726562 11.109375 18.726562 11.351562 C 18.726562 11.433594 18.726562 11.515625 18.726562 11.597656 C 18.726562 11.644531 18.726562 11.695312 18.726562 11.742188 C 18.675781 11.742188 18.628906 11.742188 18.578125 11.742188 C 18.496094 11.742188 18.417969 11.742188 18.335938 11.742188 C 18.089844 11.742188 17.847656 11.742188 17.601562 11.742188 C 17.519531 11.742188 17.441406 11.742188 17.359375 11.742188 C 17.113281 11.742188 16.871094 11.742188 16.625 11.742188 C 16.542969 11.742188 16.464844 11.742188 16.382812 11.742188 C 16.136719 11.742188 15.894531 11.742188 15.648438 11.742188 C 15.566406 11.742188 15.488281 11.742188 15.40625 11.742188 C 15.160156 11.742188 14.917969 11.742188 14.671875 11.742188 C 14.589844 11.742188 14.511719 11.742188 14.429688 11.742188 C 14.183594 11.742188 13.941406 11.742188 13.695312 11.742188 C 13.613281 11.742188 13.535156 11.742188 13.453125 11.742188 C 13.207031 11.742188 12.964844 11.742188 12.71875 11.742188 C 12.636719 11.742188 12.558594 11.742188 12.476562 11.742188 C 12.230469 11.742188 11.988281 11.742188 11.742188 11.742188 C 11.660156 11.742188 11.582031 11.742188 11.5 11.742188 C 11.253906 11.742188 11.011719 11.742188 10.765625 11.742188 C 10.683594 11.742188 10.605469 11.742188 10.523438 11.742188 C 10.277344 11.742188 10.035156 11.742188 9.789062 11.742188 C 9.707031 11.742188 9.628906 11.742188 9.546875 11.742188 C 9.300781 11.742188 9.058594 11.742188 8.8125 11.742188 C 8.730469 11.742188 8.652344 11.742188 8.570312 11.742188 C 8.324219 11.742188 8.082031 11.742188 7.835938 11.742188 C 7.753906 11.742188 7.675781 11.742188 7.59375 11.742188 C 7.347656 11.742188 7.105469 11.742188 6.859375 11.742188 C 6.777344 11.742188 6.699219 11.742188 6.617188 11.742188 C 6.371094 11.742188 6.128906 11.742188 5.882812 11.742188 C 5.800781 11.742188 5.722656 11.742188 5.640625 11.742188 C 5.394531 11.742188 5.152344 11.742188 4.90625 11.742188 C 4.824219 11.742188 4.746094 11.742188 4.664062 11.742188 C 4.417969 11.742188 4.175781 11.742188 3.929688 11.742188 C 3.847656 11.742188 3.769531 11.742188 3.6875 11.742188 C 3.441406 11.742188 3.199219 11.742188 2.953125 11.742188 C 2.871094 11.742188 2.792969 11.742188 2.710938 11.742188 C 2.488281 11.757812 2.277344 11.742188 2.074219 11.695312 C 2.074219 11.613281 2.074219 11.53125 2.074219 11.449219 C 2.074219 11.207031 2.074219 10.960938 2.074219 10.71875 C 2.074219 10.636719 2.074219 10.554688 2.074219 10.472656 C 2.074219 10.230469 2.074219 9.984375 2.074219 9.742188 C 2.074219 9.660156 2.074219 9.578125 2.074219 9.496094 C 2.074219 9.253906 2.074219 9.007812 2.074219 8.765625 C 2.074219 8.683594 2.074219 8.601562 2.074219 8.519531 C 2.074219 8.308594 2.074219 8.097656 2.074219 7.886719 C 2.285156 7.886719 2.5 7.886719 2.710938 7.886719 Z M 2.710938 7.886719 '
        />
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
        <use xlinkHref='#surface239' mask='url(#mask78)' />
        <use xlinkHref='#surface242' mask='url(#mask79)' />
        <use xlinkHref='#surface245' mask='url(#mask80)' />
        <use xlinkHref='#surface248' mask='url(#mask81)' />
        <use xlinkHref='#surface251' mask='url(#mask82)' />
        <use xlinkHref='#surface254' mask='url(#mask83)' />
        <use xlinkHref='#surface257' mask='url(#mask84)' />
        <use xlinkHref='#surface260' mask='url(#mask85)' />
        <use xlinkHref='#surface263' mask='url(#mask86)' />
        <path
          style={{
            stroke: "none",
            fillRule: "evenodd",
            fill: appThemeBgColor,
            fillOpacity: 1,
          }}
          d='M 2.757812 13.695312 C 2.839844 13.695312 2.921875 13.695312 3.003906 13.695312 C 3.246094 13.695312 3.492188 13.695312 3.734375 13.695312 C 3.816406 13.695312 3.898438 13.695312 3.980469 13.695312 C 4.222656 13.695312 4.46875 13.695312 4.710938 13.695312 C 4.792969 13.695312 4.875 13.695312 4.957031 13.695312 C 5.199219 13.695312 5.445312 13.695312 5.6875 13.695312 C 5.769531 13.695312 5.851562 13.695312 5.933594 13.695312 C 6.175781 13.695312 6.421875 13.695312 6.664062 13.695312 C 6.746094 13.695312 6.828125 13.695312 6.910156 13.695312 C 7.152344 13.695312 7.398438 13.695312 7.640625 13.695312 C 7.722656 13.695312 7.804688 13.695312 7.886719 13.695312 C 8.128906 13.695312 8.375 13.695312 8.617188 13.695312 C 8.699219 13.695312 8.78125 13.695312 8.863281 13.695312 C 9.105469 13.695312 9.351562 13.695312 9.59375 13.695312 C 9.675781 13.695312 9.757812 13.695312 9.839844 13.695312 C 10.082031 13.695312 10.328125 13.695312 10.570312 13.695312 C 10.652344 13.695312 10.734375 13.695312 10.816406 13.695312 C 11.058594 13.695312 11.304688 13.695312 11.546875 13.695312 C 11.628906 13.695312 11.710938 13.695312 11.792969 13.695312 C 12.035156 13.695312 12.28125 13.695312 12.523438 13.695312 C 12.605469 13.695312 12.6875 13.695312 12.769531 13.695312 C 13.011719 13.695312 13.257812 13.695312 13.5 13.695312 C 13.582031 13.695312 13.664062 13.695312 13.746094 13.695312 C 13.988281 13.695312 14.234375 13.695312 14.476562 13.695312 C 14.542969 13.695312 14.574219 13.730469 14.574219 13.792969 C 14.574219 14.039062 14.574219 14.28125 14.574219 14.527344 C 14.574219 14.609375 14.574219 14.6875 14.574219 14.769531 C 14.574219 15.015625 14.574219 15.257812 14.574219 15.503906 C 14.574219 15.585938 14.574219 15.664062 14.574219 15.746094 C 14.574219 15.992188 14.574219 16.234375 14.574219 16.480469 C 14.574219 16.5625 14.574219 16.640625 14.574219 16.722656 C 14.574219 16.96875 14.574219 17.210938 14.574219 17.457031 C 14.574219 17.519531 14.542969 17.554688 14.476562 17.554688 C 14.234375 17.554688 13.988281 17.554688 13.746094 17.554688 C 13.664062 17.554688 13.582031 17.554688 13.5 17.554688 C 13.257812 17.554688 13.011719 17.554688 12.769531 17.554688 C 12.6875 17.554688 12.605469 17.554688 12.523438 17.554688 C 12.28125 17.554688 12.035156 17.554688 11.792969 17.554688 C 11.710938 17.554688 11.628906 17.554688 11.546875 17.554688 C 11.304688 17.554688 11.058594 17.554688 10.816406 17.554688 C 10.734375 17.554688 10.652344 17.554688 10.570312 17.554688 C 10.328125 17.554688 10.082031 17.554688 9.839844 17.554688 C 9.757812 17.554688 9.675781 17.554688 9.59375 17.554688 C 9.351562 17.554688 9.105469 17.554688 8.863281 17.554688 C 8.78125 17.554688 8.699219 17.554688 8.617188 17.554688 C 8.375 17.554688 8.128906 17.554688 7.886719 17.554688 C 7.804688 17.554688 7.722656 17.554688 7.640625 17.554688 C 7.398438 17.554688 7.152344 17.554688 6.910156 17.554688 C 6.828125 17.554688 6.746094 17.554688 6.664062 17.554688 C 6.421875 17.554688 6.175781 17.554688 5.933594 17.554688 C 5.851562 17.554688 5.769531 17.554688 5.6875 17.554688 C 5.445312 17.554688 5.199219 17.554688 4.957031 17.554688 C 4.875 17.554688 4.792969 17.554688 4.710938 17.554688 C 4.46875 17.554688 4.222656 17.554688 3.980469 17.554688 C 3.898438 17.554688 3.816406 17.554688 3.734375 17.554688 C 3.492188 17.554688 3.246094 17.554688 3.003906 17.554688 C 2.921875 17.554688 2.839844 17.554688 2.757812 17.554688 C 2.53125 17.554688 2.304688 17.554688 2.074219 17.554688 C 2.074219 17.472656 2.074219 17.390625 2.074219 17.308594 C 2.074219 17.066406 2.074219 16.820312 2.074219 16.578125 C 2.074219 16.496094 2.074219 16.414062 2.074219 16.332031 C 2.074219 16.089844 2.074219 15.84375 2.074219 15.601562 C 2.074219 15.519531 2.074219 15.4375 2.074219 15.355469 C 2.074219 15.113281 2.074219 14.867188 2.074219 14.625 C 2.074219 14.542969 2.074219 14.460938 2.074219 14.378906 C 2.074219 14.152344 2.074219 13.925781 2.074219 13.695312 C 2.304688 13.695312 2.53125 13.695312 2.757812 13.695312 Z M 2.757812 13.695312 '
        />
        <use xlinkHref='#surface266' mask='url(#mask87)' />
        <use xlinkHref='#surface269' mask='url(#mask88)' />
        <use xlinkHref='#surface272' mask='url(#mask89)' />
        <use xlinkHref='#surface275' mask='url(#mask90)' />
        <use xlinkHref='#surface278' mask='url(#mask91)' />
        <use xlinkHref='#surface281' mask='url(#mask92)' />
        <use xlinkHref='#surface284' mask='url(#mask93)' />
        <use xlinkHref='#surface287' mask='url(#mask94)' />
        <use xlinkHref='#surface290' mask='url(#mask95)' />
        <use xlinkHref='#surface293' mask='url(#mask96)' />
        <use xlinkHref='#surface296' mask='url(#mask97)' />
        <use xlinkHref='#surface299' mask='url(#mask98)' />
        <use xlinkHref='#surface302' mask='url(#mask99)' />
        <use xlinkHref='#surface305' mask='url(#mask100)' />
        <use xlinkHref='#surface308' mask='url(#mask101)' />
        <use xlinkHref='#surface311' mask='url(#mask102)' />
        <use xlinkHref='#surface314' mask='url(#mask103)' />
        <use xlinkHref='#surface317' mask='url(#mask104)' />
        <use xlinkHref='#surface320' mask='url(#mask105)' />
        <use xlinkHref='#surface323' mask='url(#mask106)' />
        <use xlinkHref='#surface326' mask='url(#mask107)' />
        <use xlinkHref='#surface329' mask='url(#mask108)' />
        <use xlinkHref='#surface332' mask='url(#mask109)' />
        <use xlinkHref='#surface335' mask='url(#mask110)' />
        <use xlinkHref='#surface338' mask='url(#mask111)' />
        <use xlinkHref='#surface341' mask='url(#mask112)' />
        <use xlinkHref='#surface344' mask='url(#mask113)' />
        <use xlinkHref='#surface347' mask='url(#mask114)' />
        <use xlinkHref='#surface350' mask='url(#mask115)' />
        <use xlinkHref='#surface353' mask='url(#mask116)' />
        <use xlinkHref='#surface356' mask='url(#mask117)' />
        <use xlinkHref='#surface359' mask='url(#mask118)' />
        <use xlinkHref='#surface362' mask='url(#mask119)' />
        <use xlinkHref='#surface365' mask='url(#mask120)' />
        <use xlinkHref='#surface368' mask='url(#mask121)' />
        <use xlinkHref='#surface371' mask='url(#mask122)' />
        <use xlinkHref='#surface374' mask='url(#mask123)' />
        <use xlinkHref='#surface377' mask='url(#mask124)' />
        <use xlinkHref='#surface380' mask='url(#mask125)' />
        <use xlinkHref='#surface383' mask='url(#mask126)' />
        <use xlinkHref='#surface386' mask='url(#mask127)' />
        <use xlinkHref='#surface389' mask='url(#mask128)' />
      </g>
    </svg>
  );
};
export default React.memo(HorizontalBarChartSvg);
