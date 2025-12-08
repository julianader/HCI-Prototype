import type { ErrorType } from '../data/errors';

export type IconName = 'alert' | 'warning' | 'error' | 'wifi';

export interface FieldErrorResult {
    type: ErrorType;
    title: string;
    message: string;
    icon: IconName;
}

export interface FieldErrorStrategyContext {
    shownTypes: Set<ErrorType>;
    allTypes: ErrorType[];
    enforceScenarioSequence: boolean;

    pickVariantWithTypePreference(variants: FieldErrorResult[]): FieldErrorResult;
}

export interface FieldErrorStrategy {
    fieldName: string;

    handleBlur(value: string, ctx: FieldErrorStrategyContext): FieldErrorResult | null;
}
