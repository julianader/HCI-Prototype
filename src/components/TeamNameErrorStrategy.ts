import type { FieldErrorStrategy, FieldErrorResult, FieldErrorStrategyContext } from './FieldErrorStrategy';

export class TeamNameErrorStrategy implements FieldErrorStrategy {
    public fieldName = 'teamName';

    // These are the displayed error messages
    private variants: FieldErrorResult[] = [
        {
            type: 'apologetic',
            title: 'Team Name is already in use.',
            message: 'We apologize, but it seems that the name you tried to use is already taken by another team. We kindly ask you to choose an alternative name for your team.',
            icon: 'warning',
        },
        {
            type: 'neutral',
            title: 'Team Name is already in use',
            message: 'This name is taken. Please try another name.',
            icon: 'alert',
        },
        {
            type: 'non-apologetic',
            title: 'Team Name is already in use',
            message: 'Someone else is already using this name. We will not offer any alternatives. Simply think of another name!',
            icon: 'error',
        },
    ];

    private lastErrorValue: string | null = null;

    handleBlur(value: string, ctx: FieldErrorStrategyContext): FieldErrorResult | null {
        const trimmed = value.trim();
        if (!trimmed) return null;

        if (this.lastErrorValue === null) {
            this.lastErrorValue = trimmed;
            return ctx.pickVariantWithTypePreference(this.variants);
        }

        if (trimmed === this.lastErrorValue) {
            return ctx.pickVariantWithTypePreference(this.variants);
        }

        return null;
    }
}
