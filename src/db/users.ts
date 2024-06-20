export interface User {
  email: string;
  password: string;
}

export const usersInMemory = new Set<User>();
