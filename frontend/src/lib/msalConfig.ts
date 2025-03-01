export const msalConfig = {
  auth: {
    clientId: 'xxxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx', // Azure ポータルで取得したクライアントID
    authority: 'https://login.microsoftonline.com/xxxx-xxxx-xxxx-xxxx-xxxx', // テナントID
    redirectUri: 'http://localhost:3000', // リダイレクトURI
  },
  cache: {
    cacheLocation: 'sessionStorage', // キャッシュの場所
    storeAuthStateInCookie: false, // IE11やEdgeをサポートする場合はtrueに設定
  },
};

export const loginRequest = {
  scopes: ['User.Read'],
};
