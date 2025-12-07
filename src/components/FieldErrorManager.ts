import type { ErrorType } from '../data/errors';
import type { ErrorEvent } from '../types';
import type {
    FieldErrorStrategy,
    FieldErrorResult,
    FieldErrorStrategyContext,
} from './FieldErrorStrategy';

import { TeamNameErrorStrategy } from './TeamNameErrorStrategy';
import { EmailErrorStrategy } from './EmailErrorStrategy';
import { DescriptionErrorStrategy } from './DescriptionErrorStrategy';
import { LanguagesErrorStrategy } from './LanguagesErrorStrategy';
import { SubmitErrorStrategy } from './SubmitErrorStrategy';
import { RandomErrorStrategy } from './RandomErrorStrategy';

export class FieldErrorManager {
    private events: ErrorEvent[] = [];
    private currentErrorStartTime: number | null = null;

    private shownTypes: Set<ErrorType> = new Set();

    private readonly allTypes: ErrorType[] = [
        'apologetic',
        'neutral',
        'non-apologetic',
    ];

    private strategies: Map<string, FieldErrorStrategy>;

    private submitStrategy: SubmitErrorStrategy;
    private randomStrategy: RandomErrorStrategy;

    constructor() {
        const strategyList: FieldErrorStrategy[] = [
            new TeamNameErrorStrategy(),
            new EmailErrorStrategy(),
            new DescriptionErrorStrategy(),
            new LanguagesErrorStrategy(),
            // add additional error messages
        ];

        this.strategies = new Map(strategyList.map((s) => [s.fieldName, s]));
        this.submitStrategy = new SubmitErrorStrategy();
        this.randomStrategy = new RandomErrorStrategy();
    }

    public handleFieldBlur(fieldName: string, value: string): any | null {
        const strategy = this.strategies.get(fieldName);
        if (!strategy) return null;

        const ctx: FieldErrorStrategyContext = {
            shownTypes: this.shownTypes,
            allTypes: this.allTypes,
            pickVariantWithTypePreference: (variants: FieldErrorResult[]) =>
                this.pickVariantWithTypePreference(variants),
        };

        const res = strategy.handleBlur(value, ctx);
        if (!res) return null;

        return this.buildError(fieldName, res);
    }

    public handleSubmit(formData: Record<string, any>): any | null {
        const ctx: FieldErrorStrategyContext = {
            shownTypes: this.shownTypes,
            allTypes: this.allTypes,
            pickVariantWithTypePreference: (variants: FieldErrorResult[]) =>
                this.pickVariantWithTypePreference(variants),
        };

        const res = this.submitStrategy.validate(formData, ctx);
        if (!res) return null;

        return this.buildError('submit', res);
    }

    public getRandomConnectionError(): any | null {
        const ctx: FieldErrorStrategyContext = {
            shownTypes: this.shownTypes,
            allTypes: this.allTypes,
            pickVariantWithTypePreference: (variants: FieldErrorResult[]) =>
                this.pickVariantWithTypePreference(variants),
        };

        const res = this.randomStrategy.getRandomError(ctx);
        if (!res) return null;

        return this.buildError('connection', res);
    }

    public handleClose(error: any): void {
        if (this.currentErrorStartTime == null) return;

        const event: ErrorEvent = {
            errorId: error.id,
            type: error.type,
            shownAt: this.currentErrorStartTime,
            resolvedAt: Date.now(),
        };

        this.events = [...this.events, event];
        this.currentErrorStartTime = null;
    }

    public getEvents(): ErrorEvent[] {
        return this.events;
    }

    public getMissingTypes(): ErrorType[] {
        return this.allTypes.filter((t) => !this.shownTypes.has(t));
    }

    private pickVariantWithTypePreference(
        variants: FieldErrorResult[],
    ): FieldErrorResult {
        const missingTypes = this.allTypes.filter(
            (t) => !this.shownTypes.has(t),
        );

        let candidateVariants = variants;

        if (missingTypes.length > 0) {
            const filtered = variants.filter((v) =>
                missingTypes.includes(v.type),
            );
            if (filtered.length > 0) {
                candidateVariants = filtered;
            }
        }

        const idx = Math.floor(Math.random() * candidateVariants.length);
        return candidateVariants[idx];
    }

    private buildError(fieldName: string, res: FieldErrorResult): any {
        this.shownTypes.add(res.type);

        const error: any = {
            id: `${fieldName}-${Date.now()}`,
            type: res.type,
            title: res.title,
            message: res.message,
            icon: res.icon,
            bgColor: 'bg-red-50',
            borderColor: 'border border-red-300',
            textColor: 'text-red-900',
        };

        this.currentErrorStartTime = Date.now();
        return error;
    }
}
