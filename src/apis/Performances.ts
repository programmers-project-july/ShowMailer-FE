import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

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

export const fetchPerformances = (): Promise<IPerformancePayload[]> =>
  axios.get(`${BACKEND_URL}/api/events`).then((response) => response.data);
