import type {
    FieldErrorResult,
    FieldErrorStrategyContext,
} from './FieldErrorStrategy';

export class SubmitErrorStrategy {
    private variants: FieldErrorResult[] = [
        {
            type: 'apologetic',
            title: 'Missing fields',
            message:
                'Sorry, but it seems some of the fields are still empty. We need every field filled out so we can process your submission.',
            icon: 'warning',
        },
        {
            type: 'neutral',
            title: 'Missing fields',
            message:
                'All fields need to be filled out before submission.',
            icon: 'alert',
        },
        {
            type: 'non-apologetic',
            title: 'Missing fields',
            message:
                'Submission was not successful because you were supposed to fill out everything!',
            icon: 'error',
        },
    ];

    validate(
        formData: Record<string, any>,
        ctx: FieldErrorStrategyContext,
    ): FieldErrorResult | null {
        const requiredFields = [
            'teamName',
            'projectTitle',
            'description',
            'programmingLanguages',
            'email',
        ];

        const hasEmpty = requiredFields.some(fieldName => {
            const value = formData[fieldName];
            if (value === undefined || value === null) return true;
            return String(value).trim().length === 0;
        });

        if (!hasEmpty) {
            return null;
        }

        return ctx.pickVariantWithTypePreference(this.variants);
    }
}
