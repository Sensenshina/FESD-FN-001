import { User } from './user.model';

describe('User Model - getAge() Method', () => {
  let user: User;

  beforeEach(() => {
    user = new User();
  });

  /**
   * TC-01: Normal Date (Past Date)
   * Input: 1990-01-01
   * Expected: 34 years
   * Rationale: User born in 1990 should be 34 years old (as of 2024)
   */
  it('TC-01: Should calculate correct age for normal past date (1990-01-01)', () => {
    user.dateOfBirth = new Date('1990-01-01');
    const result = user.getAge();
    expect(result).toBeGreaterThanOrEqual(33);
    expect(result).toBeLessThanOrEqual(34);
  });

  /**
   * TC-02: Boundary Case - Birth month same, day not reached
   * Input: 1990-05-20
   * Expected: 34 years
   * Rationale: Test boundary condition where birthday hasn't arrived this year
   */
  it('TC-02: Should calculate correct age for boundary case (1990-05-20)', () => {
    user.dateOfBirth = new Date('1990-05-20');
    const result = user.getAge();
    expect(result).toBeGreaterThanOrEqual(33);
    expect(result).toBeLessThanOrEqual(34);
  });

  /**
   * TC-03: End of Year Date
   * Input: 1990-12-31
   * Expected: 33 years
   * Rationale: User born at end of year
   */
  it('TC-03: Should calculate correct age for end of year date (1990-12-31)', () => {
    user.dateOfBirth = new Date('1990-12-31');
    const result = user.getAge();
    expect(result).toBeGreaterThanOrEqual(33);
    expect(result).toBeLessThanOrEqual(35);
  });

  /**
   * TC-04: Future Date (Edge Case)
   * Input: 2024-05-20 (Future date)
   * Expected: 0 years
   * Rationale: Edge case - birthdate in future should result in age 0
   */
  it('TC-04: Should return 0 for future date (2024-05-20)', () => {
    user.dateOfBirth = new Date('2024-05-20');
    const result = user.getAge();
    expect(result).toBe(0);
  });

  /**
   * TC-05: Leap Year Date
   * Input: 2000-02-29
   * Expected: 24 years
   * Rationale: Test leap year date calculation (Feb 29 is valid leap year date)
   */
  it('TC-05: Should calculate correct age for leap year date (2000-02-29)', () => {
    user.dateOfBirth = new Date('2000-02-29');
    const result = user.getAge();
    expect(result).toBeGreaterThanOrEqual(23);
    expect(result).toBeLessThanOrEqual(26);
  });

  /**
   * TC-06: Invalid Date (Non-existent)
   * Input: 2025-01-01 (Invalid/Future date)
   * Expected: Return 0 or handle gracefully
   * Rationale: Test handling for invalid dates
   */
  it('TC-06: Should handle invalid future date gracefully', () => {
    user.dateOfBirth = new Date('2025-01-01');
    const result = user.getAge();
    expect(result).toBeGreaterThanOrEqual(0);
  });

  /**
   * TC-07: Invalid Date Format
   * Input: Invalid date format
   * Expected: Error / Exception
   * Rationale: Test input validation for invalid date format
   */
  it('TC-07: Should throw error for invalid date format', () => {
    user.dateOfBirth = new Date('invalid-date');
    expect(() => user.getAge()).toThrowError();
  });

  /**
   * TC-08: Null / Missing Data
   * Input: null / undefined
   * Expected: Error / Exception
   * Rationale: Test error handling for missing data
   */
  it('TC-08: Should throw error for null/missing dateOfBirth', () => {
    user.dateOfBirth = null as any;
    expect(() => user.getAge()).toThrowError('Missing Data: dateOfBirth is required');
  });

  /**
   * TC-09: Edge Case - Very Old Date
   * Input: 1900-01-01
   * Expected: 124 years (as of 2024)
   * Rationale: Test calculation for very old dates
   */
  it('TC-09: Should calculate correct age for very old date (1900-01-01)', () => {
    user.dateOfBirth = new Date('1900-01-01');
    const result = user.getAge();
    expect(result).toBeGreaterThanOrEqual(123);
    expect(result).toBeLessThanOrEqual(125);
  });

  /**
   * TC-10: Boundary Case - Today's Birthday
   * Input: Birthday today (testing boundary condition)
   * Expected: Correct age calculation
   * Rationale: Test boundary when current date matches birth anniversary
   */
  it('TC-10: Should calculate correct age when today is birthday', () => {
    const today = new Date();
    const birthDate = new Date(today.getFullYear() - 30, today.getMonth(), today.getDate());
    user.dateOfBirth = birthDate;
    const result = user.getAge();
    expect(result).toBe(30);
  });

  /**
   * Test: Sample Data from Class Diagram
   * Data: daranporn@gmail.com, password: yjdf1716, firstName: ศรีพร, lastName: อุตมพรหม, tel: 0891234567, DOB: 26 May 2012
   */
  it('Should create user with sample data from class diagram', () => {
    user = new User(
      'daranporn@gmail.com',
      'yjdf1716',
      'ศรีพร',
      'อุตมพรหม',
      '0891234567',
      new Date('2012-05-26')
    );

    expect(user.userEmail).toBe('daranporn@gmail.com');
    expect(user.userPassword).toBe('yjdf1716');
    expect(user.userFirstName).toBe('ศรีพร');
    expect(user.userLastName).toBe('อุตมพรหม');
    expect(user.userTel).toBe('0891234567');
    expect(user.getFullName()).toBe('ศรีพร อุตมพรหม');
    expect(user.getAge()).toBeGreaterThanOrEqual(11);
    expect(user.getAge()).toBeLessThanOrEqual(12);
  });

  /**
   * Test: Sample Data 2
   * Data: boompoj@gmail.com, password: mmyf9876, firstName: บูมเพชร, lastName: จี้จุฒิมายา, tel: 0641825563, DOB: 17 Oct 2011
   */
  it('Should create second user with sample data', () => {
    user = new User(
      'boompoj@gmail.com',
      'mmyf9876',
      'บูมเพชร',
      'จี้จุฒิมายา',
      '0641825563',
      new Date('2011-10-17')
    );

    expect(user.userEmail).toBe('boompoj@gmail.com');
    expect(user.userPassword).toBe('mmyf9876');
    expect(user.getFullName()).toBe('บูมเพชร จี้จุฒิมายา');
    expect(user.getAge()).toBeGreaterThanOrEqual(12);
  });

  /**
   * Test: Sample Data 3
   * Data: bodin_thai@gmail.com, password: mmy64577, firstName: บดินทร์, lastName: วัจรจณฐ, tel: 0986345661, DOB: 29 Apr 2007
   */
  it('Should create third user with sample data', () => {
    user = new User(
      'bodin_thai@gmail.com',
      'mmy64577',
      'บดินทร์',
      'วัจรจณฐ',
      '0986345661',
      new Date('2007-04-29')
    );

    expect(user.userEmail).toBe('bodin_thai@gmail.com');
    expect(user.userPassword).toBe('mmy64577');
    expect(user.getFullName()).toBe('บดินทร์ วัจรจณฐ');
    expect(user.getAge()).toBeGreaterThanOrEqual(16);
    expect(user.getAge()).toBeLessThanOrEqual(17);
  });

  /**
   * Test: getFormattedDateOfBirth method
   */
  it('Should format date of birth correctly', () => {
    user.dateOfBirth = new Date('2012-05-26');
    const formatted = user.getFormattedDateOfBirth();
    expect(formatted).toContain('May');
    expect(formatted).toContain('26');
    expect(formatted).toContain('2012');
  });
});