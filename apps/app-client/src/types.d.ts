declare global {
  namespace Auth {
    interface User {
      user_id: number;
      account_id: number;
      name: string;
      email: string;
    }
  }
}

export {};
