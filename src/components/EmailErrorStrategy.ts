import type { FieldErrorStrategy, FieldErrorResult, FieldErrorStrategyContext } from './FieldErrorStrategy';

export class EmailErrorStrategy implements FieldErrorStrategy {
    public fieldName = 'email';

    // These are the displayed error messages
    private variants: FieldErrorResult[] = [
        {
            type: 'apologetic',
            title: 'Email not valid',
            message: 'Apologies, there is a small mistake. Could you please look at your input again and make sure that it contains a "@" symbol? ',
            icon: 'warning',
        },
        {
            type: 'neutral',
            title: 'Email not valid',
            message: 'This email is not valid. Make sure it contains a "@" symbol.',
            icon: 'alert',
        },
        {
            type: 'non-apologetic',
            title: 'Email not valid',
            message: 'This is an email field so it should be clear that a "@" symbol is required. Do better!',
            icon: 'error',
        },
    ];

    handleBlur(value: string, ctx: FieldErrorStrategyContext): FieldErrorResult | null {
        if (!value.includes('@')) {
            return ctx.pickVariantWithTypePreference(this.variants);
        }
        return null;
    }
}
