export interface StrapiErrorResponse {
  data: null;
  error?: {
    statusCode: number;
    error: string;
    message: string;
  };
}

export interface StrapiUserData {
  id: number;
  username: string;
  email: string;
}

export interface StrapiRegisterFormProps {
  username: string | null;
  email: string | null;
  password: string | null;
}

export interface StrapiLoginFormProps {
  identifier: string | null;
  password: string | null;
}