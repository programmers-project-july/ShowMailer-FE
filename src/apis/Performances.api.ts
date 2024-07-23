// Performances.api.ts
import { IPerformancePayload } from '@/hooks/usePerformances';
import { httpClient } from './http';

export const fetchPerformances = async (
  codename?: string,
  title?: string,
  page?: number,
  date?: string,
): Promise<IPerformancePayload[]> => {
  try {
    // const processedCodename = codename ? codename.split('/')[0] : undefined;
    const response = await httpClient.get<IPerformancePayload[]>(`/events`, {
      params: {
        codename,
        title,
        page,
        date,
      },
    });
    if (Array.isArray(response.data)) {
      return response.data as IPerformancePayload[];
    } else {
      throw new Error('API 응답 데이터 형식 오류: 배열이 아닙니다', response.data);
    }
  } catch (error) {
    throw new Error('API 요청 오류' +error + '');
    return [];
  }
};
