import type {
    FieldErrorStrategy,
    FieldErrorResult,
    FieldErrorStrategyContext,
} from './FieldErrorStrategy';

export class DescriptionErrorStrategy implements FieldErrorStrategy {
    public fieldName = 'description';

    // These are the displayed error messages
    private variants: FieldErrorResult[] = [
        {
            type: 'apologetic',
            title: 'Description too short',
            message:
                'We deeply apologize for the inconvenience but it seems that your project description is too short. Could you please tell us a bit more about your project and idea?',
            icon: 'warning',
        },
        {
            type: 'neutral',
            title: 'Description too short',
            message:
                'The description of your project must contain at least 150 letters.',
            icon: 'alert',
        },
        {
            type: 'non-apologetic',
            title: 'Description too short',
            message:
                'Your description is not long enough. Try again and make it longer!',
            icon: 'error',
        },
    ];

    handleBlur(
        value: string,
        ctx: FieldErrorStrategyContext,
    ): FieldErrorResult | null {
        const trimmed = value.trim();

        if (trimmed.length >= 150) {
            return null;
        }

        return ctx.pickVariantWithTypePreference(this.variants);
    }
}
