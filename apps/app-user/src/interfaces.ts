
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface state {
  token: string | null;
  user: User | null;
}

export interface useLoginResponse {
  message: string;
  results: string;
}

export interface onEditProfileResponse {
  ok: boolean;
  message: string;
}

export interface apiLoginResponse {
  message: string;
  results: string;
}
