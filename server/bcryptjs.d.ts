declare module 'bcryptjs' {
    // Type definitions for bcryptjs
    // Project: https://github.com/dcodeIO/bcrypt.js
    // Definitions by: Your Name <your email>
    // Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
  
    export function hashSync(s: string, salt: number): string;
    export function compareSync(s: string, hash: string): boolean;
  
    // Add more function signatures as needed
  }
  