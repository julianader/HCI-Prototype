import type {
    FieldErrorResult,
    FieldErrorStrategyContext,
} from './FieldErrorStrategy';

export class SubmitErrorStrategy {
    private missingFieldVariants: FieldErrorResult[] = [
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

    private submitErrorVariants: FieldErrorResult[] = [
        {
            type: 'apologetic',
            title: 'Server error',
            message:
                'Sorry, our servers are experiencing some technical difficulties. Please try submitting again.',
            icon: 'warning',
        },
        {
            type: 'neutral',
            title: 'Connection timeout',
            message:
                'The submission timed out. Please try again.',
            icon: 'alert',
        },
        {
            type: 'non-apologetic',
            title: 'Submission failed',
            message:
                'Something went wrong with your submission. Try again!',
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
            'githubUrl',
        ];

        const hasEmpty = requiredFields.some(fieldName => {
            const value = formData[fieldName];
            if (value === undefined || value === null) return true;
            return String(value).trim().length === 0;
        });

        if (hasEmpty) {
            // Show missing fields error
            return ctx.pickVariantWithTypePreference(this.missingFieldVariants);
        } else {
            // All fields filled - show submit error
            return ctx.pickVariantWithTypePreference(this.submitErrorVariants);
        }
    }
}
