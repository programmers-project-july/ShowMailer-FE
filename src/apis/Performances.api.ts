// Performances.api.ts
import { IPerformancePayload } from '@/hooks/usePerformances';
import { httpClient } from './http';

// const API_URL = '/events'; // API 경로는 상대 경로로 설정

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
      // console.error('API 응답 데이터 형식 오류: 배열이 아닙니다.', response.data);
      // return [];
    }
  } catch (error) {
    throw new Error('API 요청 오류' +error + '');
    // console.error('API 요청 오류:', error);
    return [];
  }
};
