import type { ErrorType } from './data/errors';

export interface Demographics {
  fullName: string;
  age: string;
  gender: string;
  computerConfidence: number; // 1-7
  currentMood: number; // 1-7
}

export interface ErrorEvent {
  errorId: string;
  type: ErrorType;
  shownAt: number;
  resolvedAt: number;
}

export interface SessionData {
  demographics: Demographics;
  startTime: number | null;
  endTime: number | null;
  errorEvents: ErrorEvent[];
}
