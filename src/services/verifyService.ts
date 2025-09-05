export interface VerificationResult {
  isValid: boolean;
  message?: string;
}

export async function verifyCredential(_qrData: string): Promise<VerificationResult> {
  // TODO: integrate @mosip/inji-verify when available
  return { isValid: false, message: 'SDK not integrated yet' };
}

export default { verifyCredential };

