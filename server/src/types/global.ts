export type User = {
  id: number;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  role: string;
};

export enum environment {
  PRODUCTION = "production",
  DEVELOPMENT = "development",
}
