import React, { useState, useRef, useEffect } from "react";
import DateTimePicker from "react-datetime-picker";

const DateTimePopper = ({ value, format, onChange, minDate, maxDate, ...rest }) => {
  const triggerRef = useRef(null);
  const portalRef = useRef(null);
  const [portalContainer, setPortalContainer] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen || typeof document === "undefined") {
      return undefined;
    }

    const node = document.createElement("div");
    node.style.position = "fixed";
    node.style.top = "0px";
    node.style.left = "0px";
    node.style.zIndex = "99999";
    node.style.pointerEvents = "none";
    document.body.appendChild(node);
    portalRef.current = node;
    setPortalContainer(node);

    return () => {
      node.remove();
      portalRef.current = null;
      setPortalContainer(null);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!portalRef.current || !triggerRef.current) {
      return undefined;
    }

    const updatePosition = () => {
      const rect = triggerRef.current.getBoundingClientRect();
      if (!rect) return;

      const popupEl = portalRef.current.firstElementChild;
      const popupHeight = popupEl ? popupEl.getBoundingClientRect().height : 320;
      const gap = 8;
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const shouldOpenAbove = spaceBelow < popupHeight + gap && spaceAbove > popupHeight + gap;

      portalRef.current.style.left = `${Math.max(8, rect.left)}px`;
      portalRef.current.style.top = shouldOpenAbove
        ? `${Math.max(8, rect.top - popupHeight - gap)}px`
        : `${Math.min(window.innerHeight - popupHeight - 8, rect.bottom + gap)}px`;
      portalRef.current.style.width = `${Math.max(rect.width, 180)}px`;
      portalRef.current.style.pointerEvents = "auto";
    };

    updatePosition();

    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [portalContainer, isOpen]);

  return (
    <div ref={triggerRef} style={{ position: "relative", display: "inline-block" }}>
      <DateTimePicker
        {...rest}
        value={value}
        format={format}
        clearIcon={null}
        portalContainer={portalContainer}
        isCalendarOpen={isOpen}
        onCalendarOpen={() => setIsOpen(true)}
        onCalendarClose={() => setIsOpen(false)}
        onChange={value => {
          onChange?.(value);
          setIsOpen(false);
        }}
        minDate={minDate}
        maxDate={maxDate}
      />
    </div>
  );
};

export default DateTimePopper;
