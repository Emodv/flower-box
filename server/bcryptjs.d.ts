declare module "bcryptjs" {
  export function hashSync(s: string, salt: number): string;
  export function compareSync(s: string, hash: string): boolean;
}
