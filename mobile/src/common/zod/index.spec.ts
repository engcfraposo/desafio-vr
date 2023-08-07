import { validationSchema, Card } from '.'; // Adjust the path to your zod file

describe('validationSchema', () => {
  it('should validate a valid card', () => {
    const validCard: Card = {
      id: '9b717e4b-dce9-42d2-a634-5c99425f81a8',
      number: '1234567890123456',
      cvv: '123',
      name: 'John Doe',
      validDate: '12/23', // A future date (greater than the current month and year)
    };

    const validationResult = validationSchema.safeParse(validCard);
    expect(validationResult.success).toBe(true);
  });

  it('should validate a valid card with card valid year is after this year', () => {
    const validCard: Card = {
      id: '9b717e4b-dce9-42d2-a634-5c99425f81a8',
      number: '1234567890123456',
      cvv: '123',
      name: 'John Doe',
      validDate: '12/24', // A future date (greater than the current month and year)
    };

    const validationResult = validationSchema.safeParse(validCard);
    expect(validationResult.success).toBe(true);
  });

  it('should not validate a card with invalid expiry date', () => {
    const invalidCard: Card = {
      id: '9b717e4b-dce9-42d2-a634-5c99425f81a8',
      number: '1234567890123456',
      cvv: '123',
      name: 'John Doe',
      validDate: '08/22', // An expired date (less than the current month and year)
    };

    const validationResult = validationSchema.safeParse(invalidCard);
    expect(validationResult.success).toBe(false);
    expect(validationResult.error.message).toContain(
      'The expiry date must be greater than the current month and year.'
    );
  });

  it('should validate a card with minimum name length', () => {
    const validCard: Card = {
      id: '9b717e4b-dce9-42d2-a634-5c99425f81a8',
      number: '1234567890123456',
      cvv: '123',
      name: 'J', // Minimum length (1 character)
      validDate: '12/23', // A future date (greater than the current month and year)
    };

    const validationResult = validationSchema.safeParse(validCard);
    expect(validationResult.success).toBe(true);
  });

  it('should not validate a card with empty name', () => {
    const invalidCard: Card = {
      id: '9b717e4b-dce9-42d2-a634-5c99425f81a8',
      number: '1234567890123456',
      cvv: '123',
      name: '', // Empty name
      validDate: '12/23', // A future date (greater than the current month and year)
    };

    const validationResult = validationSchema.safeParse(invalidCard);
    expect(validationResult.success).toBe(false);
    expect(validationResult.error.message).toContain(
      'String must contain at least 1 character(s)'
    );
  });

  it('should not validate a card with invalid month', () => {
    const invalidCard: Card = {
      id: '9b717e4b-dce9-42d2-a634-5c99425f81a8',
      number: '1234567890123456',
      cvv: '123',
      name: 'John Doe',
      validDate: '13/25', // Invalid month (greater than 12)
    };

    const validationResult = validationSchema.safeParse(invalidCard);
    expect(validationResult.success).toBe(false);
    expect(validationResult.error.message).toContain(
      'The expiry date must be greater than the current month and year.'
    );
  });

  it('should not validate a card with expired date', () => {
    const invalidCard: Card = {
      id: '9b717e4b-dce9-42d2-a634-5c99425f81a8',
      number: '1234567890123456',
      cvv: '123',
      name: 'John Doe',
      validDate: '08/22', // An expired date (less than the current month and year)
    };

    const validationResult = validationSchema.safeParse(invalidCard);
    expect(validationResult.success).toBe(false);
    expect(validationResult.error.message).toContain(
      'The expiry date must be greater than the current month and year.'
    );
  });

  it('should not validate a card with invalid number length', () => {
    const invalidCard: Card = {
      id: '9b717e4b-dce9-42d2-a634-5c99425f81a8',
      number: '123456789012345', // Invalid number length (not 16 digits)
      cvv: '123',
      name: 'John Doe',
      validDate: '12/23', // A future date (greater than the current month and year)
    };

    const validationResult = validationSchema.safeParse(invalidCard);
    expect(validationResult.success).toBe(false);
    expect(validationResult.error.message).toContain(
      'String must contain exactly 16 character(s)'
    );
  });

  it('should not validate a card with invalid CVV length', () => {
    const invalidCard: Card = {
      id: '9b717e4b-dce9-42d2-a634-5c99425f81a8',
      number: '1234567890123456',
      cvv: '12', // Invalid CVV length (not 3 digits)
      name: 'John Doe',
      validDate: '12/23', // A future date (greater than the current month and year)
    };

    const validationResult = validationSchema.safeParse(invalidCard);
    expect(validationResult.success).toBe(false);
    expect(validationResult.error.message).toContain(
      'String must contain exactly 3 character(s)'
    );
  });

  it('should not validate a card with an invalid UUID', () => {
    const invalidCard: Card = {
      id: 'invalid-uuid', // Invalid UUID format
      number: '1234567890123456',
      cvv: '123',
      name: 'John Doe',
      validDate: '12/23', // A future date (greater than the current month and year)
    };

    const validationResult = validationSchema.safeParse(invalidCard);
    expect(validationResult.success).toBe(false);
    expect(validationResult.error.message).toContain(
      'Invalid uuid'
    );
  });

  it('should not validate a card with missing number', () => {
    const invalidCard: Card = {
      id: '9b717e4b-dce9-42d2-a634-5c99425f81a8',
      cvv: '123',
      name: 'John Doe',
      validDate: '12/23', // A future date (greater than the current month and year)
    };

    const validationResult = validationSchema.safeParse(invalidCard);
    expect(validationResult.success).toBe(false);
    expect(validationResult.error.message).toContain(
      'Required'
    );
  });

  // Add more test cases to cover other validation scenarios.
  // For example, you can test the validation for each individual field, etc.
});
