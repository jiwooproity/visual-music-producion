import { useState, useEffect, useRef } from "react";

interface LazyImagePropsType {
  className?: string;
  src: string;
  alt: string;
  width?: string | "100%";
  height?: string | "100%";
}

const LazyImage = ({
  className,
  src,
  alt,
  width,
  height,
}: LazyImagePropsType) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observer = useRef<IntersectionObserver>();

  const intersectionObserver = (
    entries: IntersectionObserverEntry[],
    io: IntersectionObserver
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        io.unobserve(entry.target);
        setIsLoading(true);
      }
    });
  };

  useEffect(() => {
    observer.current = new IntersectionObserver(intersectionObserver);
    imgRef.current && observer.current.observe(imgRef.current);
  }, []);

  return (
    <img
      ref={imgRef}
      className={`${className}${isLoading ? "" : "lazy"}`}
      src={isLoading ? src : ""}
      alt={alt}
      style={{ width, height }}
    />
  );
};

export default LazyImage;
