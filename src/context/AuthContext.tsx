import React, { createContext, useState, useEffect } from "react";
import { User } from "../models/User";
import { Todo } from "../models/Todo";
import { clearAuthData, getAccessToken } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

interface AuthContextProps {
  authenticated: boolean;
  user?: User | null;
  setAuthenticated: (authenticated: boolean) => void;
  logout: () => void;
  addTodo: (todo: Todo) => void;
  verifyingAuth: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  authenticated: false,
  setAuthenticated: () => {},
  logout: () => {},
  addTodo: () => {},
  verifyingAuth: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [verifyingAuth, setVerifyingAuth] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user data is available and update the state
    const userDataString = localStorage.getItem("TODO_APP");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      if (userData && userData.profile) {
        setUser(userData.profile);
      }
    }
  }, [authenticated]);

  const triggerAutoLogin = () => {
    getAccessToken()
      .then((authToken) => {
        console.log({ authToken });
        if (authToken) {
          setAuthenticated(!!authToken);
        }
        const userDataString = localStorage.getItem("TODO_APP");
        if (userDataString) {
          const userData = JSON.parse(userDataString);

          if (userData && userData.profile) {
            setUser(userData.profile);
          }
        }
        navigate("/dashboard");
      })
      .finally(() => {
        setVerifyingAuth(false);
      });
  };

  useEffect(() => {
    triggerAutoLogin();
  }, []);

  const logout = () => {
    setAuthenticated(false);
    setUser(null);
    clearAuthData();
  };

  const addTodo = (todo: Todo) => {
    console.log({ todo, user });
    if (user) {
      const updatedUser = {
        ...user,
        todos: [...user.todos, todo],
      };
      setUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        user,
        setAuthenticated,
        logout,
        addTodo,
        verifyingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
