import { useEffect, useRef, useState } from "react";

function useDragger(id, object) {
  const isClicked = useRef(false);
  const [coordinates, setCoordinates] = useState({
    top: object.y,
    left: object.x,
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

    const onMouseDown = async e => {
      isClicked.current = true;
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
    };

    const onMouseUp = async e => {
      isClicked.current = false;
      coords.current.lastX = target.offsetLeft;
      coords.current.lastY = target.offsetTop;
    };

    const onMouseMove = async e => {
      if (isClicked.current) {
        const srcClasses = [...e.target.classList];
        if (srcClasses.includes("shape")) {
          dragHandle(e);
        }
        if (srcClasses.includes("rotateHandle")) {
          rotateHandle(e);
        }
      }
    };

    const dragHandle = e => {
      const nextX = e.clientX - coords.current.startX + coords.current.lastX;
      const nextY = e.clientY - coords.current.startY + coords.current.lastY;

      target.style.top = `${nextY}px`;
      target.style.left = `${nextX}px`;

      setCoordinates(prev => ({ ...prev, top: nextY, left: nextX }));
    };

    const rotateHandle = e => {
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

    const onkeyup = async e => {
      if (e.code === "Escape" || e.keyCode === 27) {
        isClicked.current = false;
      }
    };

    const onMouseout = () => {
      isClicked.current = false;
    };

    target.addEventListener("mousedown", onMouseDown);
    target.addEventListener("mouseup", onMouseUp);
    target.addEventListener("mouseout", onMouseout);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseUp);
    document.addEventListener("keyup", onkeyup);

    const cleanup = () => {
      target.removeEventListener("mousedown", onMouseDown);
      target.removeEventListener("mouseup", onMouseUp);
      target.removeEventListener("mouseout", onMouseout);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseUp);
      document.removeEventListener("keyup", onkeyup);
    };

    return cleanup;
  }, [id]);

  return [coordinates, setCoordinates];
}

export default useDragger;
