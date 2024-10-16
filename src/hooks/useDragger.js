import { useEffect, useRef, useState } from "react";
import { CHART_SIZE } from "../components/shared/D3/constants";

function useDragger(id, object) {
  const isClicked = useRef(false);
  const [coordinates, setCoordinates] = useState({
    top: object.y,
    left: object.x,
    rotate: object.z,
    width: object.props.width,
    height: object.props.height,
  });
  const coords = useRef({
    startX: 0,
    startY: 0,
    lastX: object.x,
    lastY: object.y,
  });

  useEffect(() => {
    const target = document.getElementById(id);
    if (!target) throw new Error("Element with given id doesn't exist");

    const container = target.parentElement;
    if (!container) throw new Error("target element must have a parent");

    const onMouseDown = async e => {
      isClicked.current = true;
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;

      const srcClasses = [...e.target.classList];
      if (srcClasses.includes("resizeHandle")) {
        resizeHandle(e);
      }
    };

    const onMouseUp = async () => {
      isClicked.current = false;
      coords.current.lastX = target.offsetLeft;
      coords.current.lastY = target.offsetTop;
    };

    const onMouseMove = async e => {
      if (isClicked.current) {
        const srcClasses = [...e.target.classList];
        if (
          !(
            srcClasses.includes("rotateHandle") ||
            srcClasses.includes("resizeHandle")
          )
        ) {
          dragHandle(e);
        }
        if (srcClasses.includes("rotateHandle")) {
          rotateHandle(e);
        }
      }
    };

    const resizeHandle = async e => {
      const start = {
        width: e.target.parentElement.clientWidth,
        height: e.target.parentElement.clientHeight,
      };

      const startPosition = {
        x: e.pageX,
        y: e.pageY,
      };
      const onDragMouseMove = event => {
        const width = start.width - startPosition.x + event.pageX;
        const height = start.height - startPosition.y + event.pageY;
        if (
          width <= CHART_SIZE.maxWidth &&
          width >= CHART_SIZE.minWidth &&
          height <= CHART_SIZE.maxHeight &&
          height >= CHART_SIZE.minHeight
        ) {
          target.style.width = `${width}px`;
          target.style.height = `${height}px`;
          setCoordinates(prev => ({ ...prev, width, height }));
        }
      };
      const onDragMouseUp = () => {
        document.body.removeEventListener("mousemove", onDragMouseMove);
        document.body.removeEventListener("mouseup", onDragMouseUp);
      };

      document.body.addEventListener("mousemove", onDragMouseMove);
      document.body.addEventListener("mouseup", onDragMouseUp);
    };

    const dragHandle = async e => {
      const nextX = e.clientX - coords.current.startX + coords.current.lastX;
      const nextY = e.clientY - coords.current.startY + coords.current.lastY;

      target.style.top = `${nextY}px`;
      target.style.left = `${nextX}px`;

      setCoordinates(prev => ({
        ...prev,
        top: nextY,
        left: nextX,
        // width: coordinates.width,
        // height: coordinates.height,
      }));
    };

    const rotateHandle = async e => {
      const boxBoundingRect = target.getBoundingClientRect();
      const boxCenter = {
        x: boxBoundingRect.left + boxBoundingRect.width / 2,
        y: boxBoundingRect.top + boxBoundingRect.height / 2,
      };
      const angle =
        Math.atan2(e.pageX - boxCenter.x, -(e.pageY - boxCenter.y)) *
        (180 / Math.PI);

      target.style.transform = `rotate(${angle}deg)`;
      setCoordinates(prev => ({ ...prev, rotate: angle }));
    };

    const onMouseout = async () => {
      isClicked.current = false;
    };

    target.addEventListener("mousedown", onMouseDown);
    target.addEventListener("mouseup", onMouseUp);
    target.addEventListener("mouseout", onMouseout);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseUp);

    const cleanup = () => {
      target.removeEventListener("mousedown", onMouseDown);
      target.removeEventListener("mouseup", onMouseUp);
      target.removeEventListener("mouseout", onMouseout);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseUp);
    };

    return cleanup;
  }, [id]);

  return [coordinates, setCoordinates];
}

export default useDragger;
