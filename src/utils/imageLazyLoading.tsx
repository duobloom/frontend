import React, { useRef, useEffect, useCallback, useState } from "react";

type IntersectHandler = (entry: IntersectionObserverEntry, observer: IntersectionObserver) => void;

const useIntersection = (onIntersect: IntersectHandler, options?: IntersectionObserverInit) => {
  const ref = useRef<HTMLImageElement | null>(null);

  const callback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // console.log("IntersectionObserver triggered for:", entry.target);
          onIntersect(entry, observer);
        }
      });
    },
    [onIntersect],
  );

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(callback, options);

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, options, callback]);

  return ref;
};

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className = "" }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const ref = useIntersection(
    useCallback(
      ({ target }, observer) => {
        if (loaded || error) return;

        const imgElement = target as HTMLImageElement;
        const imageSrc = imgElement.getAttribute("data-src");

        if (imageSrc) {
          imgElement.setAttribute("src", imageSrc); // 실제 이미지 로드
          observer.unobserve(target);
        }
      },
      [loaded, error],
    ),
    { rootMargin: "100px" },
  );

  return (
    <>
      {!loaded && !error && <div className="h-full w-full animate-pulse bg-gray-100"></div>}
      <img
        ref={ref}
        data-src={src}
        alt={alt}
        className={`${className} ${loaded ? "loaded" : "loading"} ${error ? "error" : ""}`}
        onLoad={() => {
          // console.log("이미지 로드 성공:", src); // 로드 성공 로그
          setLoaded(true);
        }}
        onError={() => {
          console.error("이미지 로드 실패:", src); // 로드 실패 로그
          setError(true);
        }}
        style={{
          visibility: loaded ? "visible" : "hidden",
        }}
      />
    </>
  );
};
