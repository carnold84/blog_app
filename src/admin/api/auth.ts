import { User } from "../types";

export interface AuthResponse {
  message?: string;
  status: "error" | "success";
  user?: User;
}

export interface SignIn {
  email: string;
  password: string;
}

const getUser = () => {
  return new Promise<AuthResponse>((resolve) => {
    setTimeout(() => {
      const userString = localStorage.getItem("blog_app_user");

      if (userString) {
        const user: User = JSON.parse(userString);
        resolve({
          status: "success",
          user,
        });
      } else {
        resolve({
          status: "error",
        });
      }
    }, 1000);
  });
};

const signIn = ({ email, password }: SignIn) => {
  return new Promise<AuthResponse>((resolve) => {
    setTimeout(() => {
      if (password === "demo") {
        const user: User = {
          firstName: "Billy",
          id: "demo",
          lastName: "Demo",
          email,
        };

        localStorage.setItem("blog_app_user", JSON.stringify(user));
        resolve({
          status: "success",
          user,
        });
      } else {
        resolve({
          message: "Email or password was incorrect.",
          status: "error",
        });
      }
    }, 1000);
  });
};

const signOut = () => {
  return new Promise<AuthResponse>((resolve) => {
    setTimeout(() => {
      if (Math.random() > 0.3) {
        localStorage.removeItem("blog_app_user");
        resolve({
          status: "success",
        });
      } else {
        resolve({
          status: "error",
        });
      }
    }, 1000);
  });
};

export { getUser, signIn, signOut };
