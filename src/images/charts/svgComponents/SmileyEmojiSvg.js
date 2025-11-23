import React from "react";
const appThemeBgColor = getComputedStyle(document.documentElement).getPropertyValue("--app-theme-bg-color");

export const SmileyEmojiSvg = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' id='Layer_1' data-name='Layer 1' viewBox='0 0 122.88 122.88' width={25} height={25}>
      <defs>
        <style
          dangerouslySetInnerHTML={{
            __html: `\n      .cls-1 {\n        fill: ${appThemeBgColor};\n      }\n\n      .cls-1,\n      .cls-2 {\n        fill-rule: evenodd;\n      }\n\n      .cls-2 {\n        fill: #141518;\n      }\n    `,
          }}
        />
      </defs>
      <title>smiley</title>
      <path className='cls-1' d='M45.54,2.11A61.42,61.42,0,1,1,2.11,77.34,61.42,61.42,0,0,1,45.54,2.11Z' />
      <path className='cls-2' d='M45.78,32.27c4.3,0,7.79,5,7.79,11.27s-3.49,11.27-7.79,11.27S38,49.77,38,43.54s3.48-11.27,7.78-11.27Z' />
      <path className='cls-2' d='M77.1,32.27c4.3,0,7.78,5,7.78,11.27S81.4,54.81,77.1,54.81s-7.79-5-7.79-11.27S72.8,32.27,77.1,32.27Z' />
      <path d='M28.8,70.82a39.65,39.65,0,0,0,8.83,8.41,42.72,42.72,0,0,0,25,7.53,40.44,40.44,0,0,0,24.12-8.12,35.75,35.75,0,0,0,7.49-7.87.22.22,0,0,1,.31,0L97,73.14a.21.21,0,0,1,0,.29A45.87,45.87,0,0,1,82.89,88.58,37.67,37.67,0,0,1,62.83,95a39,39,0,0,1-20.68-5.55A50.52,50.52,0,0,1,25.9,73.57a.23.23,0,0,1,0-.28l2.52-2.5a.22.22,0,0,1,.32,0l0,0Z' />
    </svg>
  );
};

export default React.memo(SmileyEmojiSvg);
