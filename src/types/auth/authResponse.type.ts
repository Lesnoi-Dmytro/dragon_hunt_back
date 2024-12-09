export default interface AuthResponse {
  id: string;
  email: string;
  name: string;
  image?: string;
  token: string;
}
