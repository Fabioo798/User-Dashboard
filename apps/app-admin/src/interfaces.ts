
export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
}

export interface createUser {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

export interface state {
  token: string | null;
  user: User | null;
  allUsers: User[];
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

export interface onRetriEveResponse {
  results: User[];
}

export interface UseHandleRetrieveReturnType {
  handleRetrieve: () => Promise<onRetriEveResponse>;
  data: onRetriEveResponse | undefined;
  isLoading: boolean;
  isError: boolean;
}


