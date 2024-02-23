import { useEffect, useRef, useState } from "react";

function useDragger(id, object) {
  const isClicked = useRef(false);
  const [coordinates, setCoordinates] = useState({
    top: object.y,
    left: object.x,
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
        const nextX = e.clientX - coords.current.startX + coords.current.lastX;
        const nextY = e.clientY - coords.current.startY + coords.current.lastY;

        target.style.top = `${nextY}px`;
        target.style.left = `${nextX}px`;
        setCoordinates({ top: nextY, left: nextX });
      }
    };

    target.addEventListener("mousedown", onMouseDown);
    target.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseUp);

    const cleanup = () => {
      target.removeEventListener("mousedown", onMouseDown);
      target.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseUp);
    };

    return cleanup;
  }, [id]);

  return [coordinates, setCoordinates];
}

export default useDragger;
