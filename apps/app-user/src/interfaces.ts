
interface User {
  id: number;
  name?: string;
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
