import axios from 'axios';
import { BACKEND_URL } from './http';
import { IPerformancePayload } from '@/hooks/usePerformances';

export const fetchPerformances = (): Promise<IPerformancePayload[]> =>
  axios.get(`${BACKEND_URL}/api/events`).then((response) => response.data);
