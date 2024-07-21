import { useQuery } from '@tanstack/react-query';
import { fetchPerformances } from '@/apis/Performances.api';

export interface IPerformancePayload {
  TITLE: string;
  IMAGE: string;
  CODENAME: string;
  DATE: string;
  [key: string]: any; // 추가 속성들을 허용
}

export const usePerformances = (codename?: string, title?: string, page: number = 1) => {
  const {
    data: performances = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<IPerformancePayload[]>({
    queryKey: ['performances', codename, title, page],
    queryFn: () => fetchPerformances(codename, title, page),
  });

  return { performances, isLoading, isError, refetch };
};
