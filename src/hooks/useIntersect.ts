import { InfiniteQueryObserverResult } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';

type IntersectionObserverProps = {
  hasNextPage?: boolean | false;
  fetchNextPage?: () => Promise<InfiniteQueryObserverResult>;
  options?: IntersectionObserverInit;
};

function useIntersect({ hasNextPage, fetchNextPage, options }: IntersectionObserverProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleIntersect: IntersectionObserverCallback = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (entry?.isIntersecting && hasNextPage && fetchNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage],
  );

  useEffect(() => {
    const targetElement = ref.current;
    let observer: IntersectionObserver;
    if (targetElement) {
      observer = new IntersectionObserver(handleIntersect, { threshold: 0.1, ...options });
      observer.observe(targetElement);
    }
    return () => {
      if (observer && targetElement) {
        observer.unobserve(targetElement);
      }
    };
  }, [ref, handleIntersect, hasNextPage, options]);

  return ref;
}

export default useIntersect;
