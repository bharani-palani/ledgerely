import React, { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

export const DivergingChartSvg = () => {
  const userContext = useContext(UserContext);
  const appThemeBgColor =
    userContext.userData.theme === "dark"
      ? getComputedStyle(document.documentElement).getPropertyValue("--app-theme-bg-color")
      : getComputedStyle(document.documentElement).getPropertyValue("--bs-gray");
  return (
    <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' width={25} height={25}>
      <defs>
        <g id='bV' clipPath='url(#b)'>
          <path
            d='M-.023-.023h.097a.15.15 0 0 1-.097.097zm0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='bX' clipPath='url(#c)'>
          <path
            d='M.805-.023h.246C.707.352.35.707-.023 1.05V.805q.44-.388.828-.828m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='bZ' clipPath='url(#d)'>
          <path
            d='M1.781-.023h.246q-1.002 1.048-2.05 2.05v-.246A49 49 0 0 0 1.78-.023m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='cb' clipPath='url(#e)'>
          <path
            d='M2.758-.023h.246A138 138 0 0 1-.023 3.004v-.246c.941-.91 1.87-1.84 2.78-2.781m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='cd' clipPath='url(#f)'>
          <path
            d='M3.734-.023h.246A242 242 0 0 1-.023 3.98v-.246A189 189 0 0 0 3.734-.023m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='cf' clipPath='url(#g)'>
          <path
            d='M4.71-.023h.247a374 374 0 0 1-4.98 4.98v-.246A338 338 0 0 0 4.71-.023m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='ch' clipPath='url(#h)'>
          <path
            d='M5.688-.023h.246Q2.978 2.979-.023 5.934v-.247a492 492 0 0 0 5.71-5.71m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='cj' clipPath='url(#i)'>
          <path
            d='M6.664-.023h.246A725 725 0 0 1-.023 6.91v-.246A600 600 0 0 0 6.664-.023m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='cl' clipPath='url(#j)'>
          <path
            d='M7.64-.023h.247a944 944 0 0 1-7.91 7.91V7.64A886 886 0 0 0 7.64-.023m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='cn' clipPath='url(#k)'>
          <path
            d='M8.617-.023h.246L4.762 4.125h-.246zm0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='cp' clipPath='url(#l)'>
          <path
            d='M9.594-.023h.246L5.738 4.125h-.246zm0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='cr' clipPath='url(#m)'>
          <path
            d='M10.57-.023h.246L6.715 4.125h-.246zm0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='ct' clipPath='url(#n)'>
          <path
            d='M11.547-.023h.246L7.691 4.125h-.246zm0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='cv' clipPath='url(#o)'>
          <path
            d='M12.523-.023h.247L8.668 4.125h-.246zm0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='cx' clipPath='url(#p)'>
          <path
            d='M13.5-.023h.246L9.645 4.125h-.247zm0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='cz' clipPath='url(#q)'>
          <path
            d='M14.477-.023h.246l-2.004 2.05h-.242q1-1.025 2-2.05m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='cB' clipPath='url(#r)'>
          <path
            d='M15.453-.023h.246q-1.464 1.511-2.98 2.976v-.242c.93-.895 1.84-1.809 2.734-2.734m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='cD' clipPath='url(#s)'>
          <path
            d='M16.43-.023h.246a236 236 0 0 1-3.957 3.953v-.243a196 196 0 0 0 3.71-3.71m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='cF' clipPath='url(#t)'>
          <path
            d='M17.406-.023h.246l-4.101 4.148h-.246zm0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='cH' clipPath='url(#u)'>
          <path
            d='M18.383-.023h.246l-4.102 4.148h-.246zm0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='cJ' clipPath='url(#v)'>
          <path
            d='M19.36-.023h.245l-4.101 4.148h-.246zm0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='cL' clipPath='url(#w)'>
          <path
            d='M20.336-.023h.246L16.48 4.125h-.246zm0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='cN' clipPath='url(#x)'>
          <path
            d='M21.313-.023h.246a360 360 0 0 1-4.883 4.882v-.246a288 288 0 0 0 4.637-4.636m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='cP' clipPath='url(#y)'>
          <path
            d='M22.29-.023h.245a518 518 0 0 1-5.86 5.859V5.59A475 475 0 0 0 22.29-.023m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='cR' clipPath='url(#z)'>
          <path
            d='M23.266-.023h.246q-3.883 3.903-7.766 7.812h-.242c2.586-2.605 5.176-5.21 7.762-7.812m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='cT' clipPath='url(#A)'>
          <path
            d='M24.242-.023h.246c-2.59 2.601-5.175 5.207-7.765 7.812h-.243c2.586-2.605 5.176-5.21 7.762-7.812m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='cV' clipPath='url(#B)'>
          <path
            d='M24.977.27v.242a799 799 0 0 0-7.278 7.277h-.242a758 758 0 0 1 7.52-7.52m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='cX' clipPath='url(#C)'>
          <path
            d='M24.977 1.246v.242a599 599 0 0 0-6.301 6.301h-.242q3.245-3.298 6.543-6.543m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='cZ' clipPath='url(#D)'>
          <path
            d='M24.977 2.223v.242a380 380 0 0 0-5.325 5.324h-.242a467 467 0 0 1 5.567-5.566m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='db' clipPath='url(#E)'>
          <path
            d='M12.23 2.27v.246a39 39 0 0 0-1.609 1.609h-.246A52 52 0 0 1 12.23 2.27m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='dd' clipPath='url(#F)'>
          <path
            d='M24.977 3.2v.241a285 285 0 0 0-4.348 4.348h-.242a283 283 0 0 1 4.59-4.59m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='df' clipPath='url(#G)'>
          <path
            d='M12.23 3.246v.246a6 6 0 0 0-.632.633h-.246q.416-.463.878-.879m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='dh' clipPath='url(#H)'>
          <path
            d='M4.516 4.125h7.714v2.102H4.125V4.125zm0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='dj' clipPath='url(#I)'>
          <path
            d='M12.719 4.125h3.957v2.101h-3.957zm0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='dl' clipPath='url(#J)'>
          <path
            d='M24.977 4.176v.242c-1.383 1.367-2.77 2.734-4.153 4.102v-.243zm0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='dn' clipPath='url(#K)'>
          <path
            d='M4.125 4.516v.246L-.023 8.863v-.246zm0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='dp' clipPath='url(#L)'>
          <path
            d='M24.977 5.152v.243l-4.153 4.101v-.242c1.383-1.367 2.77-2.734 4.153-4.102m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='dr' clipPath='url(#M)'>
          <path
            d='M4.125 5.492v.246L-.023 9.84v-.246zm0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='dt' clipPath='url(#N)'>
          <path
            d='M24.977 6.129v.242a339 339 0 0 0-5.032 5.031h-.242q2.613-2.659 5.274-5.273m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='dv' clipPath='url(#O)'>
          <path
            d='M4.32 6.227h.246a318 318 0 0 1-4.59 4.59v-.247A253 253 0 0 0 4.32 6.227m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='dx' clipPath='url(#P)'>
          <path
            d='M5.297 6.227h.246a467 467 0 0 1-5.566 5.566v-.246a427 427 0 0 0 5.32-5.32m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='dz' clipPath='url(#Q)'>
          <path
            d='M6.273 6.227h.247A646 646 0 0 1-.023 12.77v-.247a598 598 0 0 0 6.296-6.296m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='dB' clipPath='url(#R)'>
          <path
            d='M7.25 6.227h.246a853 853 0 0 1-7.52 7.52V13.5A709 709 0 0 0 7.25 6.227m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='dD' clipPath='url(#S)'>
          <path
            d='M8.227 6.227h.246q-4.225 4.271-8.496 8.496v-.246a1027 1027 0 0 0 8.25-8.25m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='dF' clipPath='url(#T)'>
          <path
            d='M9.203 6.227h.246c-3.14 3.171-6.3 6.332-9.472 9.472v-.246c3.09-3.058 6.168-6.137 9.226-9.226m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='dH' clipPath='url(#U)'>
          <path
            d='M10.18 6.227h.246c-.504.52-1.012 1.039-1.516 1.562h-.242q.756-.784 1.512-1.562m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='dJ' clipPath='url(#V)'>
          <path
            d='M11.156 6.227h.246q-.758.779-1.515 1.562h-.242q.755-.784 1.511-1.562m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='dL' clipPath='url(#W)'>
          <path
            d='M12.133 6.227h.097v.195q-.706.657-1.367 1.367h-.242q.756-.784 1.512-1.562m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='dN' clipPath='url(#X)'>
          <path
            d='M13.11 6.227h.245a6 6 0 0 1-.636.632v-.242c.148-.113.277-.246.39-.39m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='dP' clipPath='url(#Y)'>
          <path
            d='M14.086 6.227h.246c-.504.52-1.012 1.039-1.516 1.562h-.097v-.195c.472-.442.93-.895 1.367-1.367m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='dR' clipPath='url(#Z)'>
          <path
            d='M15.063 6.227h.246c-.504.52-1.012 1.039-1.516 1.562h-.242q.756-.784 1.511-1.562m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='dT' clipPath='url(#aa)'>
          <path
            d='M16.04 6.227h.245c-.504.52-1.012 1.039-1.515 1.562h-.243q.756-.784 1.512-1.562m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='dV' clipPath='url(#ab)'>
          <path
            d='M24.977 7.105v.243a248 248 0 0 0-4.055 4.054h-.242a248 248 0 0 1 4.297-4.297m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='dX' clipPath='url(#ac)'>
          <path
            d='M12.23 7.152v.246a2.2 2.2 0 0 0-.39.391h-.242a6 6 0 0 1 .632-.637m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='dZ' clipPath='url(#ad)'>
          <path
            d='M8.668 7.79h3.562v2.097H8.277V7.79zm0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='eb' clipPath='url(#ae)'>
          <path
            d='M12.719 7.79h8.105v2.096H12.72zm0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='ed' clipPath='url(#af)'>
          <path
            d='M24.977 8.082v.242a143 143 0 0 0-3.079 3.078h-.242q1.635-1.686 3.32-3.32m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='ef' clipPath='url(#ag)'>
          <path
            d='M8.277 8.18v.242c-2.77 2.75-5.535 5.504-8.3 8.254v-.246q4.146-4.125 8.3-8.25m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='eh' clipPath='url(#ah)'>
          <path
            d='M24.977 9.059V9.3a59 59 0 0 0-2.102 2.101h-.242a83 83 0 0 1 2.344-2.343m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='ej' clipPath='url(#ai)'>
          <path
            d='M8.277 9.156v.242a61 61 0 0 0-2.004 2.004q-.045 0-.046.047a185 185 0 0 0-3.614 3.614h-.246a496 496 0 0 1 5.91-5.907m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='el' clipPath='url(#aj)'>
          <path
            d='M8.473 9.887h.242L7.25 11.402h-.242q.732-.758 1.465-1.515m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='en' clipPath='url(#ak)'>
          <path
            d='M9.45 9.887h.241l-1.464 1.515h-.243q.733-.758 1.465-1.515m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='ep' clipPath='url(#al)'>
          <path
            d='M10.426 9.887h.242l-1.465 1.515h-.242q.732-.758 1.465-1.515m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='er' clipPath='url(#am)'>
          <path
            d='M11.402 9.887h.243q-.733.758-1.465 1.515h-.242zm0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='et' clipPath='url(#an)'>
          <path
            d='M13.355 9.887h.243q-.416.462-.88.879v-.243q.345-.292.637-.636m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='ev' clipPath='url(#ao)'>
          <path
            d='M14.332 9.887h.242q-.732.758-1.465 1.515h-.242zm0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='ex' clipPath='url(#ap)'>
          <path
            d='M15.309 9.887h.242q-.733.758-1.465 1.515h-.242q.732-.758 1.465-1.515m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='ez' clipPath='url(#aq)'>
          <path
            d='M16.285 9.887h.242q-.732.758-1.465 1.515h-.242q.733-.758 1.465-1.515m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='eB' clipPath='url(#ar)'>
          <path
            d='M17.262 9.887h.242l-1.465 1.515h-.242q.732-.758 1.465-1.515m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='eD' clipPath='url(#as)'>
          <path
            d='M18.238 9.887h.242l-1.464 1.515h-.243q.733-.758 1.465-1.515m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='eF' clipPath='url(#at)'>
          <path
            d='M19.215 9.887h.242l-1.465 1.515h-.242zm0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='eH' clipPath='url(#au)'>
          <path
            d='M20.191 9.887h.243q-.733.758-1.465 1.515h-.242zm0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='eJ' clipPath='url(#av)'>
          <path
            d='M24.977 10.035v.242l-2.051 2.004v-.246q1.025-1 2.05-2m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='eL' clipPath='url(#aw)'>
          <path
            d='M12.23 10.082v.246c-.375.34-.73.7-1.074 1.074h-.242c.422-.457.863-.894 1.316-1.32m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='eN' clipPath='url(#ax)'>
          <path
            d='M24.977 11.012v.242l-2.051 2.004v-.246q1.025-1 2.05-2m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='eP' clipPath='url(#ay)'>
          <path
            d='M12.23 11.059v.246a.14.14 0 0 0-.097.097h-.242q.145-.198.34-.343m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='eR' clipPath='url(#az)'>
          <path
            d='M6.273 11.402h5.957v2.149H6.227v-2.102q0-.047.046-.047m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='eT' clipPath='url(#aA)'>
          <path
            d='M12.719 11.402h10.156c.05.2.066.414.05.633v1.516h-9.327q-.366-.012-.73.023a.6.6 0 0 1-.15.121zm0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='eV' clipPath='url(#aB)'>
          <path
            d='M24.977 11.988v.242a566 566 0 0 0-6.497 6.497h-.242a685 685 0 0 1 6.739-6.739m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='eX' clipPath='url(#aC)'>
          <path
            d='M6.227 12.184v.242Q4.884 13.72 3.59 15.063h-.246q1.418-1.466 2.883-2.88m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='eZ' clipPath='url(#aD)'>
          <path
            d='M24.977 12.965v.242a460 460 0 0 0-5.52 5.52h-.242a445 445 0 0 1 5.762-5.762m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='fb' clipPath='url(#aE)'>
          <path
            d='M6.227 13.16v.242a39 39 0 0 0-1.66 1.66H4.32a55 55 0 0 1 1.907-1.902m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='fd' clipPath='url(#aF)'>
          <path
            d='M6.762 13.55h.246l-1.465 1.512h-.246zm0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='ff' clipPath='url(#aG)'>
          <path
            d='M7.738 13.55h.246L6.52 15.063h-.247zm0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='fh' clipPath='url(#aH)'>
          <path
            d='M8.715 13.55h.246l-1.465 1.512H7.25zm0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='fj' clipPath='url(#aI)'>
          <path
            d='M9.691 13.55h.246l-1.464 1.512h-.246zm0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='fl' clipPath='url(#aJ)'>
          <path
            d='M10.668 13.55h.246q-.732.758-1.465 1.512h-.246zm0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='fn' clipPath='url(#aK)'>
          <path
            d='M11.645 13.55h.246l-1.465 1.512h-.246zm0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='fp' clipPath='url(#aL)'>
          <path
            d='M13.598 13.55h.246q-.54.587-1.125 1.122v-.242q.462-.416.879-.88m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='fr' clipPath='url(#aM)'>
          <path
            d='M14.574 13.55h.246q-.732.758-1.465 1.512h-.246zm0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='ft' clipPath='url(#aN)'>
          <path
            d='M15.55 13.55h.247l-1.465 1.512h-.246zm0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='fv' clipPath='url(#aO)'>
          <path
            d='M16.527 13.55h.246l-1.464 1.512h-.246zm0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='fx' clipPath='url(#aP)'>
          <path
            d='M17.504 13.55h.246l-1.465 1.512h-.246zm0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='fz' clipPath='url(#aQ)'>
          <path
            d='M18.48 13.55h.247a63 63 0 0 1-2.102 2.098v-.242a49 49 0 0 0 1.855-1.855m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='fB' clipPath='url(#aR)'>
          <path
            d='M19.457 13.55h.246a143 143 0 0 1-3.078 3.075v-.242c.96-.93 1.906-1.871 2.832-2.832m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='fD' clipPath='url(#aS)'>
          <path
            d='M20.434 13.55h.246c-1.711 1.723-3.418 3.45-5.13 5.177h-.241q2.563-2.592 5.125-5.176m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='fF' clipPath='url(#aT)'>
          <path
            d='M21.41 13.55h.246q-2.564 2.585-5.129 5.177h-.242q2.563-2.592 5.125-5.176m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='fH' clipPath='url(#aU)'>
          <path
            d='M22.387 13.55h.246c-1.711 1.723-3.418 3.45-5.13 5.177h-.241q2.563-2.592 5.125-5.176m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='fJ' clipPath='url(#aV)'>
          <path
            d='M24.977 13.941v.243a311 311 0 0 0-4.543 4.543h-.243a307 307 0 0 1 4.786-4.786m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='fL' clipPath='url(#aW)'>
          <path
            d='M12.23 13.988v.246q-.44.388-.828.829h-.246c.344-.376.7-.731 1.074-1.075m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='fN' clipPath='url(#aX)'>
          <path
            d='M24.977 14.918v.242a171 171 0 0 0-3.567 3.567h-.242a219 219 0 0 1 3.809-3.809m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='fP' clipPath='url(#aY)'>
          <path
            d='M12.23 14.965v.098h-.097a.15.15 0 0 1 .097-.098m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='fR' clipPath='url(#aZ)'>
          <path
            d='M2.367 15.063h9.863v2.101H2.027v-2.102zm0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='fT' clipPath='url(#ba)'>
          <path
            d='M12.719 15.063h3.906v2.102h-3.906zm0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='fV' clipPath='url(#bb)'>
          <path
            d='M2.027 15.406v.242l-2.05 2.004v-.246q1.025-1 2.05-2m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='fX' clipPath='url(#bc)'>
          <path
            d='M24.977 15.895v.242q-1.32 1.27-2.59 2.59h-.242q1.388-1.443 2.832-2.832m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='fZ' clipPath='url(#bd)'>
          <path
            d='M2.027 16.383v.242l-2.05 2.004v-.246q1.025-1 2.05-2m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='gb' clipPath='url(#be)'>
          <path
            d='M24.977 16.871v.242l-2.051 2.004v-.246q1.025-1 2.05-2m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='gd' clipPath='url(#bf)'>
          <path
            d='M2.172 17.164h.246a90 90 0 0 1-2.441 2.441v-.246a73 73 0 0 0 2.195-2.195m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='gf' clipPath='url(#bg)'>
          <path
            d='M3.148 17.164h.247a176 176 0 0 1-3.418 3.418v-.246a135 135 0 0 0 3.171-3.172m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='gh' clipPath='url(#bh)'>
          <path
            d='M4.125 17.164h.246A291 291 0 0 1-.023 21.56v-.247a260 260 0 0 0 4.148-4.148m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='gj' clipPath='url(#bi)'>
          <path
            d='M5.102 17.164h.246a435 435 0 0 1-5.371 5.371v-.246a396 396 0 0 0 5.125-5.125m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='gl' clipPath='url(#bj)'>
          <path
            d='M6.078 17.164h.246a608 608 0 0 1-6.347 6.348v-.246a499 499 0 0 0 6.101-6.102m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='gn' clipPath='url(#bk)'>
          <path
            d='M7.055 17.164H7.3a809 809 0 0 1-7.324 7.324v-.246a756 756 0 0 0 7.078-7.078m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='gp' clipPath='url(#bl)'>
          <path
            d='M8.031 17.164h.246c-2.59 2.602-5.175 5.207-7.765 7.813H.27c2.585-2.606 5.175-5.211 7.761-7.813m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='gr' clipPath='url(#bm)'>
          <path
            d='M9.008 17.164h.246q-3.883 3.904-7.766 7.813h-.242c2.586-2.606 5.176-5.211 7.762-7.813m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='gt' clipPath='url(#bn)'>
          <path
            d='M9.984 17.164h.246c-2.59 2.602-5.175 5.207-7.765 7.813h-.242q3.88-3.91 7.761-7.813m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='gv' clipPath='url(#bo)'>
          <path
            d='M10.96 17.164h.247c-2.59 2.602-5.176 5.207-7.766 7.813H3.2q3.881-3.91 7.762-7.813m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='gx' clipPath='url(#bp)'>
          <path
            d='M11.938 17.164h.246c-.504.52-1.012 1.04-1.516 1.563h-.242q.756-.785 1.511-1.563m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='gz' clipPath='url(#bq)'>
          <path
            d='M12.914 17.164h.246c-.133.16-.277.309-.441.438v-.243a.55.55 0 0 0 .195-.195m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='gB' clipPath='url(#br)'>
          <path
            d='M13.89 17.164h.247q-.686.733-1.418 1.414v-.242q.61-.563 1.172-1.172m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='gD' clipPath='url(#bs)'>
          <path
            d='M14.867 17.164h.246q-.758.78-1.515 1.563h-.243q.756-.785 1.512-1.563m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='gF' clipPath='url(#bt)'>
          <path
            d='M15.844 17.164h.246c-.504.52-1.012 1.04-1.516 1.563h-.242q.756-.785 1.512-1.563m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='gH' clipPath='url(#bu)'>
          <path
            d='M24.977 17.848v.242l-2.051 2.004v-.246q1.025-1 2.05-2m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='gJ' clipPath='url(#bv)'>
          <path
            d='M12.23 17.895v.246q-.316.27-.585.586h-.243a10 10 0 0 1 .828-.832m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='gL' clipPath='url(#bw)'>
          <path
            d='M12.719 18.727h10.207v2.097H12.719zm0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: appThemeBgColor,
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='gN' clipPath='url(#bx)'>
          <path
            d='M10.328 18.824v.242a468 468 0 0 0-5.91 5.91h-.242a571 571 0 0 1 6.152-6.152m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='gP' clipPath='url(#by)'>
          <path
            d='M24.977 18.824v.242a468 468 0 0 0-5.91 5.91h-.243c1.367-1.382 2.735-2.769 4.102-4.152q1.025-1 2.05-2m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='gR' clipPath='url(#bz)'>
          <path
            d='M10.328 19.8v.243a367 367 0 0 0-4.933 4.934h-.243a359 359 0 0 1 5.176-5.176m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='gT' clipPath='url(#bA)'>
          <path
            d='M24.977 19.8v.243a367 367 0 0 0-4.934 4.934h-.242a359 359 0 0 1 5.176-5.176m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='gV' clipPath='url(#bB)'>
          <path
            d='M10.328 20.777q.052.065.145.047c-1.368 1.383-2.735 2.77-4.102 4.153H6.13a237 237 0 0 1 4.2-4.2m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='gX' clipPath='url(#bC)'>
          <path
            d='M24.977 20.777v.243a236 236 0 0 0-3.957 3.957h-.243a237 237 0 0 1 4.2-4.2m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='gZ' clipPath='url(#bD)'>
          <path
            d='M11.207 20.824h.242l-4.101 4.153h-.243c1.368-1.383 2.735-2.77 4.102-4.153m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='hb' clipPath='url(#bE)'>
          <path
            d='M12.184 20.824h.046v.246a217 217 0 0 0-3.906 3.907h-.242c1.367-1.383 2.734-2.77 4.102-4.153m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='hd' clipPath='url(#bF)'>
          <path
            d='M13.16 20.824h.242q-.315.368-.683.684v-.242c.164-.133.308-.278.441-.442m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='hf' clipPath='url(#bG)'>
          <path
            d='M14.137 20.824h.242q-.804.856-1.66 1.66v-.242q.732-.686 1.418-1.418m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='hh' clipPath='url(#bH)'>
          <path
            d='M15.113 20.824h.242l-4.101 4.153h-.242zm0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='hj' clipPath='url(#bI)'>
          <path
            d='M16.09 20.824h.242c-1.367 1.383-2.734 2.77-4.102 4.153h-.242zm0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='hl' clipPath='url(#bJ)'>
          <path
            d='M17.066 20.824h.243c-1.368 1.383-2.735 2.77-4.102 4.153h-.242zm0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='hn' clipPath='url(#bK)'>
          <path
            d='M18.043 20.824h.242l-4.101 4.153h-.243c1.368-1.383 2.735-2.77 4.102-4.153m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='hp' clipPath='url(#bL)'>
          <path
            d='M19.02 20.824h.242l-4.102 4.153h-.242c1.367-1.383 2.734-2.77 4.102-4.153m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='hr' clipPath='url(#bM)'>
          <path
            d='M19.996 20.824h.242l-4.101 4.153h-.242zm0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='ht' clipPath='url(#bN)'>
          <path
            d='M20.973 20.824h.242l-4.102 4.153h-.242c1.367-1.383 2.734-2.77 4.102-4.153m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='hv' clipPath='url(#bO)'>
          <path
            d='M21.95 20.824h.241l-4.101 4.153h-.242zm0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='hx' clipPath='url(#bP)'>
          <path
            d='M24.977 21.754v.242a119 119 0 0 0-2.98 2.98h-.243a157 157 0 0 1 3.223-3.222m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='hz' clipPath='url(#bQ)'>
          <path
            d='M12.23 21.8v.247q-1.488 1.44-2.93 2.93H9.06A143 143 0 0 1 12.23 21.8m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='hB' clipPath='url(#bR)'>
          <path
            d='M24.977 22.73v.243a61 61 0 0 0-2.004 2.004h-.243q1.096-1.15 2.247-2.247m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='hD' clipPath='url(#bS)'>
          <path
            d='M12.23 22.777q-.018.095.051.149l-2.004 2.05h-.242c.715-.75 1.45-1.48 2.195-2.199m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='hF' clipPath='url(#bT)'>
          <path
            d='M24.977 23.707v.242c-.36.328-.7.668-1.028 1.028h-.242a22 22 0 0 1 1.27-1.27m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <g id='hH' clipPath='url(#bU)'>
          <path
            d='M24.977 24.684v.242q-.052-.001-.051.05h-.242q.123-.17.293-.292m0 0'
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "transparent",
              fillOpacity: 1,
            }}
          />
        </g>
        <filter id='a' width='100%' height='100%' x='0%' y='0%' filterUnits='objectBoundingBox'>
          <feColorMatrix in='SourceGraphic' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0' />
        </filter>
      </defs>
      <use xlinkHref='#bV' mask='url(#bW)' />
      <use xlinkHref='#bX' mask='url(#bY)' />
      <use xlinkHref='#bZ' mask='url(#ca)' />
      <use xlinkHref='#cb' mask='url(#cc)' />
      <use xlinkHref='#cd' mask='url(#ce)' />
      <use xlinkHref='#cf' mask='url(#cg)' />
      <use xlinkHref='#ch' mask='url(#ci)' />
      <use xlinkHref='#cj' mask='url(#ck)' />
      <use xlinkHref='#cl' mask='url(#cm)' />
      <use xlinkHref='#cn' mask='url(#co)' />
      <use xlinkHref='#cp' mask='url(#cq)' />
      <use xlinkHref='#cr' mask='url(#cs)' />
      <use xlinkHref='#ct' mask='url(#cu)' />
      <use xlinkHref='#cv' mask='url(#cw)' />
      <use xlinkHref='#cx' mask='url(#cy)' />
      <use xlinkHref='#cz' mask='url(#cA)' />
      <use xlinkHref='#cB' mask='url(#cC)' />
      <use xlinkHref='#cD' mask='url(#cE)' />
      <use xlinkHref='#cF' mask='url(#cG)' />
      <use xlinkHref='#cH' mask='url(#cI)' />
      <use xlinkHref='#cJ' mask='url(#cK)' />
      <use xlinkHref='#cL' mask='url(#cM)' />
      <use xlinkHref='#cN' mask='url(#cO)' />
      <use xlinkHref='#cP' mask='url(#cQ)' />
      <use xlinkHref='#cR' mask='url(#cS)' />
      <use xlinkHref='#cT' mask='url(#cU)' />
      <use xlinkHref='#cV' mask='url(#cW)' />
      <use xlinkHref='#cX' mask='url(#cY)' />
      <use xlinkHref='#cZ' mask='url(#da)' />
      <use xlinkHref='#db' mask='url(#dc)' />
      <use xlinkHref='#dd' mask='url(#de)' />
      <use xlinkHref='#df' mask='url(#dg)' />
      <use xlinkHref='#dh' mask='url(#di)' />
      <use xlinkHref='#dj' mask='url(#dk)' />
      <use xlinkHref='#dl' mask='url(#dm)' />
      <use xlinkHref='#dn' mask='url(#do)' />
      <use xlinkHref='#dp' mask='url(#dq)' />
      <use xlinkHref='#dr' mask='url(#ds)' />
      <use xlinkHref='#dt' mask='url(#du)' />
      <use xlinkHref='#dv' mask='url(#dw)' />
      <use xlinkHref='#dx' mask='url(#dy)' />
      <use xlinkHref='#dz' mask='url(#dA)' />
      <use xlinkHref='#dB' mask='url(#dC)' />
      <use xlinkHref='#dD' mask='url(#dE)' />
      <use xlinkHref='#dF' mask='url(#dG)' />
      <use xlinkHref='#dH' mask='url(#dI)' />
      <use xlinkHref='#dJ' mask='url(#dK)' />
      <use xlinkHref='#dL' mask='url(#dM)' />
      <use xlinkHref='#dN' mask='url(#dO)' />
      <use xlinkHref='#dP' mask='url(#dQ)' />
      <use xlinkHref='#dR' mask='url(#dS)' />
      <use xlinkHref='#dT' mask='url(#dU)' />
      <use xlinkHref='#dV' mask='url(#dW)' />
      <use xlinkHref='#dX' mask='url(#dY)' />
      <use xlinkHref='#dZ' mask='url(#ea)' />
      <use xlinkHref='#eb' mask='url(#ec)' />
      <use xlinkHref='#ed' mask='url(#ee)' />
      <use xlinkHref='#ef' mask='url(#eg)' />
      <path
        d='M12.477 2.027h.242v20.899h-.438q-.07-.053-.05-.149V2.027zm0 0'
        style={{
          stroke: "none",
          fillRule: "evenodd",
          fill: "#9aadc7",
          fillOpacity: 1,
        }}
      />
      <use xlinkHref='#eh' mask='url(#ei)' />
      <use xlinkHref='#ej' mask='url(#ek)' />
      <use xlinkHref='#el' mask='url(#em)' />
      <use xlinkHref='#en' mask='url(#eo)' />
      <use xlinkHref='#ep' mask='url(#eq)' />
      <use xlinkHref='#er' mask='url(#es)' />
      <use xlinkHref='#et' mask='url(#eu)' />
      <use xlinkHref='#ev' mask='url(#ew)' />
      <use xlinkHref='#ex' mask='url(#ey)' />
      <use xlinkHref='#ez' mask='url(#eA)' />
      <use xlinkHref='#eB' mask='url(#eC)' />
      <use xlinkHref='#eD' mask='url(#eE)' />
      <use xlinkHref='#eF' mask='url(#eG)' />
      <use xlinkHref='#eH' mask='url(#eI)' />
      <use xlinkHref='#eJ' mask='url(#eK)' />
      <use xlinkHref='#eL' mask='url(#eM)' />
      <use xlinkHref='#eN' mask='url(#eO)' />
      <use xlinkHref='#eP' mask='url(#eQ)' />
      <use xlinkHref='#eR' mask='url(#eS)' />
      <use xlinkHref='#eT' mask='url(#eU)' />
      <use xlinkHref='#eV' mask='url(#eW)' />
      <use xlinkHref='#eX' mask='url(#eY)' />
      <use xlinkHref='#eZ' mask='url(#fa)' />
      <use xlinkHref='#fb' mask='url(#fc)' />
      <use xlinkHref='#fd' mask='url(#fe)' />
      <use xlinkHref='#ff' mask='url(#fg)' />
      <use xlinkHref='#fh' mask='url(#fi)' />
      <use xlinkHref='#fj' mask='url(#fk)' />
      <use xlinkHref='#fl' mask='url(#fm)' />
      <use xlinkHref='#fn' mask='url(#fo)' />
      <use xlinkHref='#fp' mask='url(#fq)' />
      <use xlinkHref='#fr' mask='url(#fs)' />
      <use xlinkHref='#ft' mask='url(#fu)' />
      <use xlinkHref='#fv' mask='url(#fw)' />
      <use xlinkHref='#fx' mask='url(#fy)' />
      <use xlinkHref='#fz' mask='url(#fA)' />
      <use xlinkHref='#fB' mask='url(#fC)' />
      <use xlinkHref='#fD' mask='url(#fE)' />
      <use xlinkHref='#fF' mask='url(#fG)' />
      <use xlinkHref='#fH' mask='url(#fI)' />
      <use xlinkHref='#fJ' mask='url(#fK)' />
      <use xlinkHref='#fL' mask='url(#fM)' />
      <use xlinkHref='#fN' mask='url(#fO)' />
      <use xlinkHref='#fP' mask='url(#fQ)' />
      <use xlinkHref='#fR' mask='url(#fS)' />
      <use xlinkHref='#fT' mask='url(#fU)' />
      <use xlinkHref='#fV' mask='url(#fW)' />
      <use xlinkHref='#fX' mask='url(#fY)' />
      <use xlinkHref='#fZ' mask='url(#ga)' />
      <use xlinkHref='#gb' mask='url(#gc)' />
      <use xlinkHref='#gd' mask='url(#ge)' />
      <use xlinkHref='#gf' mask='url(#gg)' />
      <use xlinkHref='#gh' mask='url(#gi)' />
      <use xlinkHref='#gj' mask='url(#gk)' />
      <use xlinkHref='#gl' mask='url(#gm)' />
      <use xlinkHref='#gn' mask='url(#go)' />
      <use xlinkHref='#gp' mask='url(#gq)' />
      <use xlinkHref='#gr' mask='url(#gs)' />
      <use xlinkHref='#gt' mask='url(#gu)' />
      <use xlinkHref='#gv' mask='url(#gw)' />
      <use xlinkHref='#gx' mask='url(#gy)' />
      <use xlinkHref='#gz' mask='url(#gA)' />
      <use xlinkHref='#gB' mask='url(#gC)' />
      <use xlinkHref='#gD' mask='url(#gE)' />
      <use xlinkHref='#gF' mask='url(#gG)' />
      <use xlinkHref='#gH' mask='url(#gI)' />
      <use xlinkHref='#gJ' mask='url(#gK)' />
      <use xlinkHref='#gL' mask='url(#gM)' />
      <use xlinkHref='#gN' mask='url(#gO)' />
      <use xlinkHref='#gP' mask='url(#gQ)' />
      <use xlinkHref='#gR' mask='url(#gS)' />
      <use xlinkHref='#gT' mask='url(#gU)' />
      <use xlinkHref='#gV' mask='url(#gW)' />
      <use xlinkHref='#gX' mask='url(#gY)' />
      <use xlinkHref='#gZ' mask='url(#ha)' />
      <use xlinkHref='#hb' mask='url(#hc)' />
      <use xlinkHref='#hd' mask='url(#he)' />
      <use xlinkHref='#hf' mask='url(#hg)' />
      <use xlinkHref='#hh' mask='url(#hi)' />
      <use xlinkHref='#hj' mask='url(#hk)' />
      <use xlinkHref='#hl' mask='url(#hm)' />
      <use xlinkHref='#hn' mask='url(#ho)' />
      <use xlinkHref='#hp' mask='url(#hq)' />
      <use xlinkHref='#hr' mask='url(#hs)' />
      <use xlinkHref='#ht' mask='url(#hu)' />
      <use xlinkHref='#hv' mask='url(#hw)' />
      <use xlinkHref='#hx' mask='url(#hy)' />
      <use xlinkHref='#hz' mask='url(#hA)' />
      <use xlinkHref='#hB' mask='url(#hC)' />
      <use xlinkHref='#hD' mask='url(#hE)' />
      <use xlinkHref='#hF' mask='url(#hG)' />
      <use xlinkHref='#hH' mask='url(#hI)' />
    </svg>
  );
};
export default React.memo(DivergingChartSvg);
