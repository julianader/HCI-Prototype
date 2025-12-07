import type {
    FieldErrorResult,
    FieldErrorStrategyContext,
} from './FieldErrorStrategy';

export class RandomErrorStrategy {
    private variants: FieldErrorResult[] = [
        {
            type: 'apologetic',
            title: 'Connection Error',
            message:
                'We apologise for the inconvenience but it seems that the internet connection is a bit unstable.',
            icon: 'wifi',
        },
        {
            type: 'neutral',
            title: 'Connection Error',
            message:
                'Check your connection settings to make sure you are connected to the internet.',
            icon: 'wifi',
        },
        {
            type: 'non-apologetic',
            title: 'Connection Error',
            message:
                'Your internet connection is very bad and unstable. Fix this issue before you continue with the registration! ',
            icon: 'wifi',
        },
    ];

    getRandomError(ctx: FieldErrorStrategyContext): FieldErrorResult {
        return ctx.pickVariantWithTypePreference(this.variants);
    }
}
