// Shared OTP storage for the application
// In production, replace this with Redis or a proper database

interface OTPData {
  otp: string;
  expires: number;
  email: string;
  createdAt: number;
}

class OTPStore {
  private store = new Map<string, OTPData>();

  set(email: string, otp: string, expires: number): void {
    this.store.set(email.toLowerCase(), {
      otp,
      expires,
      email: email.toLowerCase(),
      createdAt: Date.now(),
    });
    console.log(
      `OTP stored for ${email.toLowerCase()}: ${otp} (expires: ${new Date(
        expires
      )})`
    );
  }

  get(email: string): OTPData | undefined {
    const data = this.store.get(email.toLowerCase());
    console.log(
      `OTP lookup for ${email.toLowerCase()}:`,
      data ? "FOUND" : "NOT FOUND"
    );
    return data;
  }

  delete(email: string): boolean {
    const deleted = this.store.delete(email.toLowerCase());
    console.log(`OTP deleted for ${email.toLowerCase()}:`, deleted);
    return deleted;
  }

  // Clean up expired OTPs
  cleanup(): void {
    const now = Date.now();
    const emailsToDelete: string[] = [];

    this.store.forEach((data, email) => {
      if (now > data.expires) {
        emailsToDelete.push(email);
      }
    });

    emailsToDelete.forEach((email) => {
      this.store.delete(email);
      console.log(`Expired OTP removed for ${email}`);
    });
  }

  // Get all stored OTPs (for debugging)
  getAll(): Map<string, OTPData> {
    return new Map(this.store);
  }

  // Get store size
  size(): number {
    return this.store.size;
  }
}

// Create a singleton instance
const otpStore = new OTPStore();

// Clean up expired OTPs every 5 minutes
setInterval(() => {
  otpStore.cleanup();
}, 5 * 60 * 1000);

export default otpStore;
