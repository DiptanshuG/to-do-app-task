import lodashGet from "lodash/get";

const AUTH_LOCAL_STORAGE_KEYNAME = "TODO_APP";
const LOCAL_ADMIN_CRED_LIST = [
  {
    id: "admin",
    password: "admin",
  },
];

const getLocalStorage = () => {
  if (typeof localStorage !== "undefined") {
    return localStorage;
  }
  return null;
};

export const clearAuthData = () => {
  let store = getLocalStorage();
  var key = AUTH_LOCAL_STORAGE_KEYNAME;
  store?.removeItem(key);
};

export const getAccessToken = async () => {
  var curAuthData = getAuthData();

  if (!curAuthData) return Promise.resolve(undefined);

  const token = lodashGet(curAuthData, "accessToken.token", null);

  return Promise.resolve(token);
};

const getAuthData = () => {
  try {
    let store = getLocalStorage();
    if (!store) return undefined;

    var key = AUTH_LOCAL_STORAGE_KEYNAME;
    var d = store.getItem(key);
    if (!d) return undefined;

    return JSON.parse(d);
  } catch {
    return undefined;
  }
};

const storeAuthData = (authData: any) => {
  let store = getLocalStorage();
  var key = AUTH_LOCAL_STORAGE_KEYNAME;
  store?.setItem(key, JSON.stringify(authData));
};

export const mockSignIn = (username: string, password: string) => {
  const isAuthenticated: boolean = LOCAL_ADMIN_CRED_LIST.some(
    (cred) => cred.id === username && cred.password === password
  );

  if (isAuthenticated) {
    storeAuthData({
      accessToken: {
        token: "Nt6rAWNtAVSr7U83uGJzNt6rAWNtAVSr7U83uGJzNt6rAWNtAVSr7U83uGJz",
      },
      profile: {
        id: "admin",
        name: "Admin",
        email: "admin@example.com",
        todos: [],
      },
      expires: new Date().getTime() + 10000 * 1000,
    });
  }

  return isAuthenticated;
};
