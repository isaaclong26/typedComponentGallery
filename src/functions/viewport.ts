import React, {useEffect, useState} from "react"

 const  useIsInViewport:Function = (ref: React.RefObject<HTMLElement>)=>{
        
    const [isInViewport, setIsInViewport] = useState(false);
  
    useEffect(() => {
      const handleIntersect = (entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsInViewport(true);
          } else {
            setIsInViewport(false);
          }
        });
      };
  
      if (ref.current) {
        const observer = new IntersectionObserver(handleIntersect);
        observer.observe(ref.current);
        return () => observer.disconnect();
      }
    }, [ref]);
  
    return isInViewport;
  }

export {useIsInViewport}