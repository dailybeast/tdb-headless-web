// Zephr API client for authentication

interface ZephrConfig {
  baseUrl: string;
}

class ZephrClient {
  private config: ZephrConfig;

  constructor(config: ZephrConfig) {
    this.config = config;
  }

  /**
   * Check if a user exists
   */
  async checkUserExists(email: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.config.baseUrl}/zephr/media/user/info`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifiers: {
            email_address: email,
          },
        }),
      });
      return response.status === 200;
    } catch (error) {
      console.error('Error checking user:', error);
      return false;
    }
  }

  /**
   * Send OTP to user's email
   */
  async sendOTP(email: string, action: 'login' | 'register' = 'login'): Promise<boolean> {
    try {
      const response = await fetch(`${this.config.baseUrl}/blaize/two-factor-authentication`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          action: action,
          identifiers: {
            email_address: email,
          },
          method: 'email',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send verification code');
      }

      return true;
    } catch (error) {
      console.error('Error sending OTP:', error);
      return false;
    }
  }

  /**
   * Verify OTP and login
   */
  async verifyOTP(email: string, otp: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.config.baseUrl}/blaize/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          identifiers: {
            email_address: email,
          },
          validators: {
            email_otp: otp,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Invalid verification code');
      }

      return true;
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return false;
    }
  }

  /**
   * Register new user with OTP
   */
  async registerWithOTP(email: string, otp: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.config.baseUrl}/blaize/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          identifiers: {
            email_address: email,
          },
          validators: {
            email_otp: otp,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      return true;
    } catch (error) {
      console.error('Error registering user:', error);
      return false;
    }
  }

  /**
   * Get OAuth URL for social login
   */
  getOAuthUrl(provider: 'google' | 'facebook'): string {
    return `${this.config.baseUrl}/blaize/oauth/${provider}`;
  }

  /**
   * Check if user is logged in
   */
  async getCurrentUser(): Promise<any | null> {
    try {
      const response = await fetch(`${this.config.baseUrl}/zephr/media/user/session`, {
        method: 'GET',
        credentials: 'include',
      });
      
      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<boolean> {
    try {
      const response = await fetch(`${this.config.baseUrl}/blaize/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      return response.ok;
    } catch (error) {
      console.error('Error logging out:', error);
      return false;
    }
  }
}

// Create and export the client instance
export const zephrClient = new ZephrClient({
  baseUrl: typeof window !== 'undefined' ? window.location.origin : '',
});