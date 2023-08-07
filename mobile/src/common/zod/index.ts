import { z } from 'zod';

const isDateGreaterThanToday = (value: string) => {
  const partes = value.split('/');
  const [ month, year ] = partes;
  const cardMonth = +month;
  const cardYear = +year;
  const currentDate = new Date();
  const currentMonth = currentDate.getUTCMonth() + 1;
  const currentYear = currentDate.getUTCFullYear() % 100;
  if(cardMonth < 0 || cardMonth > 12){
    return false
  }
  if (cardYear > currentYear) {
    return true;
  }
  if (cardYear === currentYear && cardMonth >= currentMonth) {
    return true;
  }
};

export const validationSchema = z
  .object({
    id: z.string().uuid().nullable(),
    number: z.string().length(16),
    cvv: z.string().length(3),
    name: z.string().min(1).max(255),
    validDate: z.string().refine(isDateGreaterThanToday, {
      message:
        'The expiry date must be greater than the current month and year.',
    }),
  })
  .required();

export type Card = z.infer<typeof validationSchema>;
