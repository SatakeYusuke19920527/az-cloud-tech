import { AccountInfo } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';

interface Account extends AccountInfo {
  idTokenClaims: {
    aud: string;
    iss: string;
    iat: number;
    nbf: number;
    exp: number;
    idp: string;
    name: string;
    nonce: string;
    oid: string;
    preferred_username: string;
    rh: string;
    sub: string;
    tid: string;
    uti: string;
    ver: string;
  };
}

export interface User {
  sub: string;
  user_name: string;
  email: string;
}

const useCurrentUser = (): User | null | undefined => {
  const { accounts } = useMsal();
  if (accounts.length > 0) {
    const account = accounts[0] as Account;
    const user: User = {
      sub: account.idTokenClaims?.aud,
      user_name: account.idTokenClaims?.name,
      email: account.idTokenClaims?.preferred_username,
    };
    return user;
  }
  return null;
};

export default useCurrentUser;
