import { AxiosResponse } from 'axios';

export interface AuthRequest {
  token: string;
}

export interface AuthUser {
  createdAt: string;
  email: string;
  firstName: string;
  id: number,
  lastName: string;
  organizationId: string;
  updatedAt: string;
  isSuperAdmin: boolean;
}

export interface AuthOrganization {
  landingPage: string;
}

export interface AuthResponseData {
  authorization: {
    token: string;
    type: string;
  };
  user: AuthUser
  organization: AuthOrganization;
  twoFARequired: boolean;
}

export interface AuthResponse extends AxiosResponse<AuthResponseData> {}
