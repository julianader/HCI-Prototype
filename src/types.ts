import type { ErrorType } from './data/errors';

export interface Demographics {
  fullName: string;
  age: string;
  gender: string;
  computerConfidence: number; // 1-7
  currentMood: number; // 1-7
  part2_confidentUsingComputers: number; // 1-5
  part2_solveWebsiteProblems: number; // 1-5
  part2_exploreInterfaces: number; // 1-5
  part2_errorsConfidence: number; // 1-5
}

export interface PostSurvey {
  // Part 1: Mood after task completion (1-7 scale, emoji likert)
  moodAfterTask: number;

  // Part 2.1: Neutral error type statements (1-5 scale, red-green likert)
  part21_aestheticallyAppealing: number;
  part21_feltIrritated: number;
  part21_pleasingAppearance: number;
  part21_helpedUnderstand: number;
  part21_increasedStress: number;
  part21_clearUnderstandable: number;

  // Part 2.2: Second error type statements
  part22_increasedStress: number;
  part22_pleasingAppearance: number;
  part22_helpedUnderstand: number;
  part22_positiveVisualImpression: number;
  part22_feltFrustrated: number;
  part22_guidedEffectively: number;

  // Part 2.3: Third error type statements
  part23_guidedEffectively: number;
  part23_aestheticallyAppealing: number;
  part23_feltFrustrated: number;
  part23_positiveVisualImpression: number;
  part23_clearUnderstandable: number;
  part23_feltIrritated: number;
}

export interface ErrorEvent {
  errorId: string;
  type: ErrorType;
  shownAt: number;
  resolvedAt: number;
}

export interface SessionData {
  demographics: Demographics;
  postSurvey: PostSurvey;
  startTime: number | null;
  endTime: number | null;
  errorEvents: ErrorEvent[];
}
