import React, { useState } from "react";
import { QRCodeVerification } from "@mosip/react-inji-verify-sdk";
import ResultCard from "./ResultCard";
import { indexedDBService, generateVCHash } from "../services/indexedDBService";

const QRScanner: React.FC = () => {
  const [verificationResult, setVerificationResult] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const verifyServiceUrl = "http://localhost:8080/v1/verify"; // Update with actual backend URL

  const handleVCProcessed = async (vpResults: any[]) => {
    setVerificationResult(vpResults);
    setError(null);

    // Store each VC verification result in IndexedDB
    for (const result of vpResults) {
      try {
        const vcHash = await generateVCHash(result.vc);
        await indexedDBService.storeVerificationResult({
          vcHash,
          timestamp: Date.now(),
          status: result.vcStatus === "SUCCESS" ? "SUCCESS" : "FAILED",
          vcData: result.vc,
          verificationDetails: result,
        });
      } catch (err) {
        console.error("Failed to store verification result in IndexedDB", err);
      }
    }
  };

  const handleError = (err: Error) => {
    setError(err.message);
    setVerificationResult(null);
  };

  return (
    <div className="grid hero">
      <div>
        <h2>Scan QR Code</h2>
        <p className="muted">Point your camera at a VC QR code to verify.</p>
        {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}
        {verificationResult && verificationResult.length > 0 && (
          <div className="card">
            <h3>Verification Results:</h3>
            {verificationResult.map((result, index) => (
              <ResultCard
                key={index}
                success={result.vcStatus === "SUCCESS"}
                message={`Status: ${result.vcStatus}`}
              />
            ))}
          </div>
        )}
        <QRCodeVerification
          verifyServiceUrl={verifyServiceUrl}
          onVCProcessed={handleVCProcessed}
          onError={handleError}
          triggerElement={<button className="btn">Start Verification</button>}
          isEnableUpload={true}
          isEnableScan={true}
          isEnableZoom={true}
        />
      </div>
    </div>
  );
};

export default QRScanner;
