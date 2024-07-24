import { ILikePayload } from '@/hooks/useLikes';
import { httpClient } from './http';
import { IPerformancePayload } from '@/hooks/usePerformances';

// 좋아요 추가
export const addLike = async ({
  email,
  codename,
  title,
  date,
}: {
  email?: string;
  codename?: string;
  title?: string;
  date?: string;
}): Promise<void> => {
  try {
    await httpClient.post(`/likes/add`, { email, codename, title, date });
  } catch (error) {
    throw new Error('좋아요 추가 요청 오류: ' + (error instanceof Error ? error.message : '알 수 없는 오류'));
  }
};

// 좋아요 삭제
export const removeLike = async ({
  email,
  codename,
  title,
  date,
}: {
  email?: string;
  codename?: string;
  title?: string;
  date?: string;
}): Promise<void> => {
  try {
    await httpClient.delete(`/likes/remove`, {
      params: {
        email,
        codename,
        title,
        date,
      },
    });
  } catch (error) {
    throw new Error('좋아요 삭제 요청 오류: ' + (error instanceof Error ? error.message : '알 수 없는 오류'));
  }
};

// 좋아요 체크
export const checkLike = async (email?: string, codename?: string, date?: string, title?: string): Promise<boolean> => {
  try {
    const response = await httpClient.get(`/likes/check`, {
      params: { email, codename, date, title },
    });
    return response.data.liked; // liked 값을 반환
  } catch (error) {
    throw new Error('좋아요 상태 확인 요청 오류: ' + (error instanceof Error ? error.message : '알 수 없는 오류'));
  }
};

//좋아요 조회
export const Likes = async (email?: string): Promise<IPerformancePayload[]> => {
  try {
    const response = await httpClient.get<IPerformancePayload[]>(`/likes`, {
      params: {
        email,
      },
    });
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      throw new Error('API 응답 데이터 형식 오류: 배열이 아닙니다', response.data);
    }
  } catch (error) {
    throw new Error('좋아요 상태 확인 요청 오류: ' + (error instanceof Error ? error.message : '알 수 없는 오류'));
  }
};
