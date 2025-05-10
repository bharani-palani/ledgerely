import { useEffect, useRef, useState } from "react";

function useDragger(id, object) {
  const isClicked = useRef(false);
  const [coordinates, setCoordinates] = useState({
    rotate: object.z,
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

    const onMouseUp = () => {
      isClicked.current = false;
      coords.current.lastX = target.offsetLeft;
      coords.current.lastY = target.offsetTop;
    };

    const onMouseMove = e => {
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

      const onRotateMouseUp = () => {
        isClicked.current = false;
        document.body.removeEventListener("mousemove", rotateHandle);
        document.body.removeEventListener("mouseup", onRotateMouseUp);
      };

      document.body.addEventListener("mousemove", rotateHandle);
      document.body.addEventListener("mouseup", onRotateMouseUp);
    };

    const onEscape = e => {
      if (e.which === 27 || e.keyCode === 27) {
        isClicked.current = false;
      }
    };

    target.addEventListener("mouseup", onMouseUp);
    window.addEventListener("keydown", onEscape);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseUp);

    const cleanup = () => {
      target.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("keydown", onEscape);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseUp);
    };

    return cleanup;
  }, [id]);

  return [coordinates, setCoordinates];
}

export default useDragger;
