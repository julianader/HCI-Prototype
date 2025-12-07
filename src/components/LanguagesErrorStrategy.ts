import type {
    FieldErrorStrategy,
    FieldErrorResult,
    FieldErrorStrategyContext,
} from './FieldErrorStrategy';

export class LanguagesErrorStrategy implements FieldErrorStrategy {
    public fieldName = 'programmingLanguages';

    // list of most known programming languages
    private knownLanguages = [
        'javascript',
        'python',
        'java',
        'c++',
        'c',
        'c#',
        'typescript',
        'php',
        'swift',
        'go',
        'rust',
        'kotlin',
        'ruby',
        'scala',
        'r',
        'sql',
        'html',
        'css',
        'bash',
        'dart',
        'matlab',
        'perl',
        'lua',
        'haskell',
        'elixir',
    ];

    // These are the displayed error messages
    private variants: FieldErrorResult[] = [
        {
            type: 'apologetic',
            title: 'Programming Language not found',
            message:
                'Unfortunately, we could not find the programming language you tried to enter. If you would not mind, could you use a more well-known language like JavaScript or Python?',
            icon: 'warning',
        },
        {
            type: 'neutral',
            title: 'Programming Language not found',
            message:
                'This programming language is not registered in out database. Use a known programming language.',
            icon: 'alert',
        },
        {
            type: 'non-apologetic',
            title: 'Programming Language not found',
            message:
                'What kind of programming language is that? It does not exist! Enter a valid one!',
            icon: 'error',
        },
    ];

    handleBlur(
        value: string,
        ctx: FieldErrorStrategyContext,
    ): FieldErrorResult | null {
        const lower = value.toLowerCase().trim();

        if (!lower) return ctx.pickVariantWithTypePreference(this.variants);

        const containsKnownLanguage = this.knownLanguages.some(lang => {
            return lower.includes(lang.toLowerCase());
        });

        if (!containsKnownLanguage) {
            return ctx.pickVariantWithTypePreference(this.variants);
        }

        return null;
    }
}
