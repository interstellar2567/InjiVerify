# TODO for Inji Verify SDK Integration

- [x] Integrate Inji Verify SDK
- [x] Perform signature, schema, and cached revocation checks entirely offline
- [x] Show verification results (✅ Valid / ❌ Invalid)
- [x] Use IndexedDB to store: Credential verification results, Timestamp, Hash of the VC, Status (Success/Failure)
- [x] Refactor QRScanner.tsx to use QRCodeVerification component from SDK
- [x] Create IndexedDB service for storing verification results
- [x] Update verification flow to store results in IndexedDB
- [x] Test offline verification and result display
- [x] Use Navigator API to detect online/offline status
- [x] Display connectivity status on the UI
