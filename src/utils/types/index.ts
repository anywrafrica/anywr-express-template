export type LogAction = 'create' | 'read' | 'update' | 'delete' | 'login' | 'logout' | 'transfer' | 'withdraw';
export type Metadata = Record<string, unknown> | null | undefined;

export type ApplicationStatus = "active" | "inactive" | "pending" | "deleted";
export type BaseStatus = "active" | "inactive" | "deleted";
export type DefaultBusinessInvitationStatus =  "pending " |  "accepted " |  "revoked ";
export type DefaultInvitationStatus = "pending" | "accepted" | "revoked" | "expired";
export type DefaultLogStatus = "success" | "failed" | "pending";
export type DefaultTransactionStatus = "pending" | "success" | "failed" | "reversed";
export type DefaultVerificationStatus =  "pending" | "verified" | "failed";
export type SignInStatus = 'needs_identifier' | 'needs_factor_one' | 'needs_factor_two' | 'needs_new_password' | 'complete';
export type SignUpStatus = 'missing_requirements' | 'complete' | 'abandoned';
export type SessionStatus = 'abandoned' | 'active' | 'ended' | 'expired' | 'removed' | 'replaced' | 'revoked';