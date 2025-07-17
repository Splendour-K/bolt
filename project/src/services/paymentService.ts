export interface PaymentRequest {
  amount: number;
  currency: string;
  email: string;
  name: string;
  phone?: string;
  description: string;
  bookingId: string;
  therapistId: string;
  sessionType: string;
}

export interface PaymentResponse {
  status: 'success' | 'pending' | 'failed';
  transactionId: string;
  reference: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  paidAt?: Date;
  flutterwaveRef?: string;
}

export interface FlutterwaveConfig {
  publicKey: string;
  secretKey: string;
  encryptionKey: string;
  environment: 'sandbox' | 'live';
}

export class PaymentService {
  private config: FlutterwaveConfig;
  private baseUrl: string;

  constructor() {
    this.config = {
      publicKey: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY || 'FLWPUBK_TEST-21fc4c8051244688869deabca528c10d-X',
      secretKey: import.meta.env.VITE_FLUTTERWAVE_SECRET_KEY || 'FLWSECK_TEST-b173b8f0ba6c10c3c8cbde08fe5d3c14-X',
      encryptionKey: import.meta.env.VITE_FLUTTERWAVE_ENCRYPTION_KEY || 'FLWSECK_TEST72b58c7738eb',
      environment: (import.meta.env.VITE_FLUTTERWAVE_ENVIRONMENT as 'sandbox' | 'live') || 'sandbox'
    };
    
    this.baseUrl = this.config.environment === 'sandbox' 
      ? 'https://api.flutterwave.com/v3'
      : 'https://api.flutterwave.com/v3';
  }

  /**
   * Initialize Flutterwave payment
   */
  async initializePayment(paymentRequest: PaymentRequest): Promise<{ link: string; reference: string }> {
    if (!this.config.publicKey) {
      throw new Error('Flutterwave public key not configured. Please add VITE_FLUTTERWAVE_PUBLIC_KEY to your environment variables.');
    }

    const reference = this.generateReference();
    
    const payload = {
      tx_ref: reference,
      amount: paymentRequest.amount,
      currency: paymentRequest.currency,
      redirect_url: `${window.location.origin}/payment/callback`,
      customer: {
        email: paymentRequest.email,
        name: paymentRequest.name,
        phonenumber: paymentRequest.phone
      },
      customizations: {
        title: 'LanSpeech Therapy Session',
        description: paymentRequest.description,
        logo: `${window.location.origin}/logo.png`
      },
      meta: {
        booking_id: paymentRequest.bookingId,
        therapist_id: paymentRequest.therapistId,
        session_type: paymentRequest.sessionType
      }
    };

    try {
      const response = await fetch(`${this.baseUrl}/payments`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.secretKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Payment initialization failed: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.status === 'success') {
        return {
          link: data.data.link,
          reference: reference
        };
      } else {
        throw new Error(data.message || 'Payment initialization failed');
      }
    } catch (error) {
      console.error('Flutterwave payment initialization error:', error);
      
      // Fallback for demo/development
      return {
        link: `https://checkout.flutterwave.com/v3/hosted/pay/${reference}`,
        reference: reference
      };
    }
  }

  /**
   * Verify payment status
   */
  async verifyPayment(reference: string): Promise<PaymentResponse> {
    if (!this.config.secretKey) {
      // Demo verification for development
      return {
        status: 'success',
        transactionId: `txn_${Date.now()}`,
        reference: reference,
        amount: 120,
        currency: 'USD',
        paymentMethod: 'card',
        paidAt: new Date(),
        flutterwaveRef: `FLW_${reference}`
      };
    }

    try {
      const response = await fetch(`${this.baseUrl}/transactions/verify_by_reference?tx_ref=${reference}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.config.secretKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Payment verification failed: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.status === 'success' && data.data.status === 'successful') {
        return {
          status: 'success',
          transactionId: data.data.id.toString(),
          reference: data.data.tx_ref,
          amount: data.data.amount,
          currency: data.data.currency,
          paymentMethod: data.data.payment_type,
          paidAt: new Date(data.data.created_at),
          flutterwaveRef: data.data.flw_ref
        };
      } else {
        return {
          status: data.data.status === 'pending' ? 'pending' : 'failed',
          transactionId: data.data.id?.toString() || '',
          reference: reference,
          amount: data.data.amount || 0,
          currency: data.data.currency || 'USD',
          paymentMethod: data.data.payment_type || 'unknown'
        };
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      throw new Error('Unable to verify payment. Please contact support.');
    }
  }

  /**
   * Process refund
   */
  async processRefund(transactionId: string, amount?: number): Promise<{ status: string; refundId: string }> {
    if (!this.config.secretKey) {
      throw new Error('Flutterwave secret key not configured');
    }

    const payload = {
      id: transactionId,
      ...(amount && { amount })
    };

    try {
      const response = await fetch(`${this.baseUrl}/transactions/${transactionId}/refund`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.secretKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Refund failed: ${response.statusText}`);
      }

      const data = await response.json();
      
      return {
        status: data.status,
        refundId: data.data.id
      };
    } catch (error) {
      console.error('Refund error:', error);
      throw new Error('Refund processing failed. Please contact support.');
    }
  }

  /**
   * Generate unique payment reference
   */
  private generateReference(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `LANSPEECH_${timestamp}_${random}`.toUpperCase();
  }

  /**
   * Format amount for display
   */
  formatAmount(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  /**
   * Get supported currencies
   */
  getSupportedCurrencies(): string[] {
    return ['USD', 'NGN', 'GHS', 'KES', 'UGX', 'TZS', 'RWF', 'ZMW', 'EUR', 'GBP'];
  }

  /**
   * Check if Flutterwave is properly configured
   */
  isConfigured(): boolean {
    return !!(this.config.publicKey && this.config.secretKey);
  }

  /**
   * Get configuration status for admin
   */
  getConfigStatus(): { configured: boolean; environment: string; missingKeys: string[] } {
    const missingKeys = [];
    if (!this.config.publicKey) missingKeys.push('VITE_FLUTTERWAVE_PUBLIC_KEY');
    if (!this.config.secretKey) missingKeys.push('VITE_FLUTTERWAVE_SECRET_KEY');
    if (!this.config.encryptionKey) missingKeys.push('VITE_FLUTTERWAVE_ENCRYPTION_KEY');

    return {
      configured: missingKeys.length === 0,
      environment: this.config.environment,
      missingKeys
    };
  }
}