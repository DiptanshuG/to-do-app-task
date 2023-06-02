import React, { createContext, useState, useEffect } from "react";
import { User } from "../models/User";
import { Todo, SubTask } from "../models/Todo";
import { clearAuthData, getAccessToken } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import lodash from "lodash";

interface AuthContextProps {
  authenticated: boolean;
  user?: User | null;
  setAuthenticated: (authenticated: boolean) => void;
  logout: () => void;
  addTodo: (todo: Todo) => void;
  verifyingAuth: boolean;
  markTodoAsChecked: (todo: Todo, checked: boolean) => void;
  addSubTask: (subtask: SubTask, parentTodoId: string) => void;
  markSubtaskAsCompleted: (
    subtask: SubTask,
    parentTodoId: string,
    checked: boolean
  ) => void;
  deleteTodo: (todoId: string) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  authenticated: false,
  verifyingAuth: true,
} as AuthContextProps);

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
        const userProfile = userData.profile;
        const storedTodos = localStorage.getItem("todos");

        if (storedTodos) {
          const parsedTodos: Todo[] = JSON.parse(storedTodos);

          lodash.set(userProfile, "todos", parsedTodos);
        }
        setUser(userProfile);
      }
    }
  }, [authenticated]);

  const triggerAutoLogin = () => {
    getAccessToken()
      .then((authToken) => {
        if (authToken) {
          setAuthenticated(!!authToken);
        }
        const userDataString = localStorage.getItem("TODO_APP");
        if (userDataString) {
          const userData = JSON.parse(userDataString);

          if (userData && userData.profile) {
            const userProfile = userData.profile;
            const storedTodos = localStorage.getItem("todos");

            if (storedTodos) {
              const parsedTodos: Todo[] = JSON.parse(storedTodos);

              lodash.set(userProfile, "todos", parsedTodos);
            }
            setUser(userProfile);
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
    if (user) {
      const updatedUser = {
        ...user,
        todos: [...user.todos, todo],
      };
      setUser(updatedUser);
    }
  };

  const addSubTask = (subtask: SubTask, parentTodoId: string) => {
    if (user) {
      const updatedUser = {
        ...user,
        todos: user.todos.map((todo: Todo) => {
          if (todo.id === parentTodoId) {
            return {
              ...todo,
              subTasks: [...todo.subTasks, subtask],
            };
          }
          return todo;
        }),
      };
      setUser(updatedUser);
    }
  };

  useEffect(() => {
    if (authenticated) {
      if (lodash.get(user, "todos.length", 0) > 0) {
        localStorage.setItem("todos", JSON.stringify(user?.todos));
      }
    }
  }, [authenticated, user]);

  const markTodoAsChecked = (todo: Todo, checked = true) => {
    setUser((user) => {
      if (user) {
        const updatedUser = {
          ...user,
          todos: user.todos.map((t) => {
            if (t.id === todo.id) {
              return {
                ...t,
                completed: checked,
              };
            }
            return t;
          }),
        };

        return updatedUser;
      }
      return user;
    });
  };

  const deleteTodo = (todoId: string) => {
    setUser((user) => {
      if (user) {
        // Filter out the todo with the specified todoId
        const updatedTodos = user.todos.filter((t) => t.id !== todoId);

        // Update the user object with the updated todos
        const updatedUser = {
          ...user,
          todos: updatedTodos,
        };

        // Save the updated todos to local storage
        localStorage.setItem("todos", JSON.stringify(updatedTodos));

        return updatedUser;
      }
      return user;
    });
  };

  const markSubtaskAsCompleted = (
    subtask: SubTask,
    parentTodoId: string,
    checked = true
  ) => {
    setUser((user) => {
      if (user) {
        const updatedUser = {
          ...user,
          todos: user.todos.map((t) => {
            if (t.id === parentTodoId) {
              return {
                ...t,
                subTasks: t.subTasks.map((sub) => {
                  if (sub.id === subtask.id) {
                    return {
                      ...sub,
                      completed: checked,
                    };
                  }
                  return sub;
                }),
              };
            }
            return t;
          }),
        };

        return updatedUser;
      }
      return user;
    });
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
        markTodoAsChecked,
        addSubTask,
        markSubtaskAsCompleted,
        deleteTodo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
