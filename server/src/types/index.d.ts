interface RequestWithToken extends Request {
  token?: string;
}

interface SavedUser {
  id: string;
  username: string;
  token?: string;
}

interface NewUser {
  username: string;
  password: string;
}

interface LoginUser {
  username: string;
  password: string;
}
