export class User {
  userEmail: string = ''; // String(85) - Email format required
  userPassword: string = ''; // String(15) - 8-15 characters
  userFirstName: string = ''; // String(50) - First name
  userLastName: string = ''; // String(50) - Last name
  userTel: string = ''; // String(50) - Phone number (digits only)
  dateOfBirth: Date = new Date(); // Date type

  constructor(
    userEmail: string = '',
    userPassword: string = '',
    userFirstName: string = '',
    userLastName: string = '',
    userTel: string = '',
    dateOfBirth: Date | string = new Date()
  ) {
    this.userEmail = userEmail;
    this.userPassword = userPassword;
    this.userFirstName = userFirstName;
    this.userLastName = userLastName;
    this.userTel = userTel;

    // Convert string to Date if needed
    if (typeof dateOfBirth === 'string') {
      this.dateOfBirth = new Date(dateOfBirth);
    } else {
      this.dateOfBirth = dateOfBirth;
    }
  }

  /**
   * Calculate age from dateOfBirth
   * @returns Age in years (Number type)
   * @throws Error if dateOfBirth is invalid
   */
  getAge(): number {
    // Validate input
    if (!this.dateOfBirth) {
      throw new Error('Missing Data: dateOfBirth is required');
    }

    // Check if date is valid
    if (!(this.dateOfBirth instanceof Date) || isNaN(this.dateOfBirth.getTime())) {
      throw new Error('Input Validation: Invalid date format');
    }

    // Get today's date
    const today = new Date();

    // Calculate age
    let age = today.getFullYear() - this.dateOfBirth.getFullYear();
    const monthDifference = today.getMonth() - this.dateOfBirth.getMonth();

    // Adjust age if birthday hasn't occurred this year
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < this.dateOfBirth.getDate())
    ) {
      age--;
    }

    // Check if birthdate is in the future (edge case)
    if (age < 0) {
      age = 0;
    }

    return age;
  }

  /**
   * Get full name combining firstName and lastName
   */
  getFullName(): string {
    return `${this.userFirstName} ${this.userLastName}`.trim();
  }

  /**
   * Get formatted date of birth as string (DD MMM YYYY)
   */
  getFormattedDateOfBirth(): string {
    if (!this.dateOfBirth || !(this.dateOfBirth instanceof Date)) {
      return '';
    }

    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    };

    return this.dateOfBirth.toLocaleDateString('en-US', options);
  }
}