// Performances.api.ts
import { IPerformancePayload } from '@/hooks/usePerformances';
import { httpClient } from './http';

// const API_URL = '/events'; // API 경로는 상대 경로로 설정

export const fetchPerformances = async (
  codename?: string,
  title?: string,
  page: number = 1,
): Promise<IPerformancePayload[]> => {
  const response = await httpClient.get<IPerformancePayload[]>(`/events`, {
    params: {
      codename,
      title,
      page,
    },
  });
  return response.data;
};
