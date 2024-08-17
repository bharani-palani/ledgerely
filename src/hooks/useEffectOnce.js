import { useEffect, useRef } from "react";

const useEffectOnce = (cb, dependencies) => {
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) {
      return cb();
    }
    mounted.current = true;
  }, dependencies);
};

export default useEffectOnce;
