export interface AuthResponseWrapper {
  message: string;
  data: AuthResponse;
}

export interface AuthResponse {
  userId: string;
  roles: string[];
  profilePicture: null;
  token: string;
}
