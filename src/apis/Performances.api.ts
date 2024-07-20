import axios from 'axios';
import { BACKEND_URL } from './http';
import { IPerformancePayload } from '@/hooks/usePerformances';

export const fetchPerformances = async (): Promise<IPerformancePayload[]> => {
  try {
    const response = await axios.get(`${BACKEND_URL}/events`, {
      headers: {
        'Content-Type': 'application/json', // JSON 형식의 응답을 기대함
      },
    });

    console.log('API 응답 데이터:', response.data);

    // 응답 데이터가 배열을 포함하는지 확인합니다.
    if (Array.isArray(response.data)) {
      return response.data;
    } else if (response.data && Array.isArray(response.data.data)) {
      // 응답 데이터가 { data: [] } 형식일 경우 처리
      return response.data.data;
    } else {
      throw new Error('API 응답이 배열 형식이 아닙니다.');
    }
  } catch (error) {
    console.error('API 요청 중 오류가 발생했습니다:', error);
    throw error;
  }
};
