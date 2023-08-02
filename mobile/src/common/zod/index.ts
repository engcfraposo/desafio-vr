import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

function isValidCreditCardNumber(value: string): boolean {
  const sanitizedValue = value.replace(/\D/g, '');

  let sum = 0;
  let shouldDouble = false;

  for (let i = sanitizedValue.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitizedValue.charAt(i), 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

const cardSchema = z.object({
  id: z.string().uuid(),
  number: z
    .string()
    .regex(/^\d{16}$/)
    .refine((value) => isValidCreditCardNumber(value), {
      message: 'Invalid credit card number',
    }),
  cvv: z.string().length(3),
  name: z.string().min(1).max(255),
});

export type Card = z.infer<typeof cardSchema>;

export const validateSchema = toFormikValidationSchema(cardSchema)
