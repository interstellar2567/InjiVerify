export interface VerificationResult {
  isValid: boolean;
  message?: string;
}

export async function verifyCredential(qrData: string): Promise<VerificationResult> {
  try {
    const response = await fetch('http://localhost:8080/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ vc: qrData }),
    });

    if (!response.ok) {
      return { isValid: false, message: `Verification failed: ${response.statusText}` };
    }

    const data = await response.json();

    return {
      isValid: data.isValid,
      message: data.message || (data.isValid ? 'Credential is valid' : 'Credential is invalid'),
    };
  } catch (error) {
    return {
      isValid: false,
      message: 'Verification failed: ' + (error instanceof Error ? error.message : String(error)),
    };
  }
}

export default { verifyCredential };
