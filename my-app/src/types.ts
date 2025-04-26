export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role:string;
    location: string;
    department:string;
  }
  

  export type UserFormData = Omit<User, 'id'>;