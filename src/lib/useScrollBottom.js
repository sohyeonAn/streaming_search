import { useRef, useEffect, useState } from "react";

const useScrollBottom = () => {
  const [isBottom, setIsBottom] = useState(false);
  const scrollRef = useRef(null);
  const onScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      setIsBottom(scrollTop >= scrollHeight - clientHeight);
    }
  };

  useEffect(() => {
    scrollRef.current.addEventListener("scroll", onScroll);
    return () => {
      if (scrollRef && scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", onScroll);
      }
    };
  }, [scrollRef.current]);

  return [isBottom, scrollRef];
};

export default useScrollBottom;
