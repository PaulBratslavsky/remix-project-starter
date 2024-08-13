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
  documentId: string;
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

export interface StrapiUserMeProps {
  user: StrapiUserData | null;
} 


interface ImageProps {
  url: string;
  alt: string;
  width: number;
  height: number;
  alternativeText: string;
  formats: {
    medium: {
      url: string;
      height: number;
      width: number;
    };
  };
}

export interface CourseProps {
  id: number;
  documentId: string;
  title: string;
  description: string;
  isPremium: boolean;
  slug: string;
  createdAt: string;
  image: ImageProps;
}