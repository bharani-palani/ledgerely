import "d3-transition";
import { descending } from "d3-array";
import d3Cloud from "d3-cloud";
import { event } from "d3-selection";
import _ from "lodash";
import seedrandom from "seedrandom";
import {
  choose,
  getFontScale,
  getFontSize,
  getText,
  getTransform,
  rotate,
} from "./utils";
import { tooltip } from "../constants";

export function render({ callbacks, options, random, selection, data }) {
  const { getWordColor, onWordClick } = callbacks;
  const {
    colors,
    fontStyle,
    fontWeight,
    textAttributes,
    showTooltip,
    tooltipPrefix,
    tooltipSuffix,
  } = options;
  const { fontFamily, transitionDuration } = options;

  function getFill(word) {
    return getWordColor ? getWordColor(word) : choose(colors, random);
  }

  const vizWords = selection.selectAll("text").data(data);
  vizWords.join(
    enter => {
      let text = enter
        .append("text")
        .on("click", word => {
          if (onWordClick) {
            onWordClick(word, event);
          }
        })
        .on("mousemove", word => {
          // console.log("bbb", { showTooltip, tooltipPrefix, tooltipSuffix });
          if (showTooltip) {
            tooltip.style("padding", "5px");
            tooltip.style("opacity", 1);
            tooltip
              .html(
                `${tooltipPrefix} ${word.text} → ${word.value} ${tooltipSuffix}`,
              )
              .style("left", event.clientX + 15 + "px")
              .style("top", event.clientY - 40 + "px");
          }
        })
        .on("mouseout", d => {
          tooltip.style("padding", 0);
          tooltip.style("opacity", 0);
        })
        .attr("cursor", onWordClick ? "pointer" : "default")
        .attr("fill", getFill)
        .attr("font-family", fontFamily)
        .attr("font-style", fontStyle)
        .attr("font-weight", fontWeight)
        .attr("text-anchor", "middle")
        .attr("transform", "translate(0, 0) rotate(0)");

      if (typeof textAttributes === "object") {
        Object.keys(textAttributes).forEach(key => {
          text = text.attr(key, textAttributes[key]);
        });
      }

      text = text.call(enter =>
        enter
          .transition()
          .duration(transitionDuration)
          .attr("font-size", getFontSize)
          .attr("transform", getTransform)
          .text(getText),
      );
    },
    update => {
      update
        .transition()
        .duration(transitionDuration)
        .attr("fill", getFill)
        .attr("font-family", fontFamily)
        .attr("font-size", getFontSize)
        .attr("transform", getTransform)
        .text(getText);
    },
    exit => {
      exit
        .transition()
        .duration(transitionDuration)
        .attr("fill-opacity", 0)
        .remove();
    },
  );
}

export function layout({
  callbacks,
  maxWords,
  options,
  selection,
  size,
  data,
}) {
  const MAX_LAYOUT_ATTEMPTS = 10;
  const SHRINK_FACTOR = 0.95;
  const {
    deterministic,
    enableOptimizations,
    fontFamily,
    fontStyle,
    fontSizes,
    fontWeight,
    padding,
    randomSeed,
    rotations,
    rotationAngles,
    spiral,
    scale,
  } = options;

  const sortedWords = data
    .concat()
    .sort((x, y) => descending(x.value, y.value))
    .slice(0, maxWords);

  const random = seedrandom(
    deterministic ? randomSeed || "deterministic" : null,
  );

  let cloud;
  if (enableOptimizations) {
    cloud = d3Cloud();
  } else {
    cloud = d3Cloud();
  }

  cloud
    .size(size)
    .padding(padding)
    .words(_.cloneDeep(sortedWords))
    .rotate(() => {
      if (rotations === undefined) {
        return (~~(random() * 6) - 3) * 30;
      }
      return rotate(rotations, rotationAngles, random);
    })
    .spiral(spiral)
    .random(random)
    .text(getText)
    .font(fontFamily)
    .fontStyle(fontStyle)
    .fontWeight(fontWeight);

  function draw(fontSizes, attempts = 1) {
    if (enableOptimizations) {
      cloud.revive();
    }

    cloud
      .fontSize(word => {
        const fontScale = getFontScale(sortedWords, fontSizes, scale);
        return fontScale(word.value);
      })
      .on("end", computedWords => {
        if (
          sortedWords.length !== computedWords.length &&
          attempts <= MAX_LAYOUT_ATTEMPTS
        ) {
          if (attempts === MAX_LAYOUT_ATTEMPTS) {
            console.warn(
              `Unable to layout ${
                sortedWords.length - computedWords.length
              } word(s) after ${attempts} attempts.  Consider: (1) Increasing the container/component size. (2) Lowering the max font size. (3) Limiting the rotation angles.`,
            );
          }

          const minFontSize = Math.max(fontSizes[0] * SHRINK_FACTOR, 1);
          const maxFontSize = Math.max(
            fontSizes[1] * SHRINK_FACTOR,
            minFontSize,
          );

          draw([minFontSize, maxFontSize], attempts + 1);
        } else {
          render({
            callbacks,
            options,
            random,
            selection,
            data: computedWords,
          });
        }
      })
      .start();
  }

  draw(fontSizes);
}
