import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchPerformances } from '@/apis/Performances.api';

export interface IPerformancePayload {
  title: string;
  image: string;
  codename: string;
  date: string;
  [key: string]: any; // 추가 속성들을 허용
}

export const usePerformances = ({ codename, title, page = 1 }: { codename?: string; title?: string; page: number }) => {
  const res = useQuery<IPerformancePayload[]>({
    queryKey: [
      'performances',
      {
        codename,
        title,
        page,
      },
    ],
    queryFn: () => fetchPerformances(codename, title, page),
    placeholderData: keepPreviousData,
  });

  return {
    ...res,
    data: res.data || [],
  };
};
