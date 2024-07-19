import { useQuery } from '@tanstack/react-query';
import { fetchPerformances } from '@/apis/Performances';
import { useEffect, useState } from 'react';

export interface IPerformancePayload {
  CODENAME: string;
  GUNAME: string;
  TITLE: string;
  DATE: string;
  PLACE: string;
  ORG_NAME: string;
  USE_TRGT: string;
  USE_FEE: string;
  PLAYER: string;
  PROGRAM: string;
  ETC_DESC: string;
  ORG_LINK: string;
  MAIN_IMG: string;
  RGSTDATE: string;
  TICKET: string;
  STRTDATE: string;
  END_DATE: string;
  THEMECODE: string;
  LOT: string;
  LAT: string;
  IS_FREE: string;
  HMPG_ADDR: string;
}

export const usePerformances = () => {
  // const [] = useState<>();
  const {
    /** data : 쿼리 함수의 반환값을 저장하는 변수 */
    data: performances,
    /** isLoading : 쿼리 함수가 아직 반환되지 않았을 때 true를 반환하는 변수 */
    isLoading,
    /** isError : 쿼리 함수가 에러를 발생시킬 경우 true를 반환하는 변수 */
    isError,
    /** refetch : 쿼리 함수를 다시 실행하는 함수 (재조회 용으로 이용됨) */
    refetch,
  } = useQuery({
    /** queryKey : 향후 캐싱 기능에서 이용이 되며, 중복되는 요청을 방지할때에 구분자로도 이용됨 */
    queryKey: ['performances'],
    /** queryFn : 실행할 함수를 선언해주며, 주로 API요청을 호출하는 로직으로 이용됨. */
    queryFn: fetchPerformances,
  });

  useEffect(() => {
    fetchPerformances().then();
  });
};
