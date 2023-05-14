import { ChangeEvent, FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useSignIn from "../../hooks/useSignIn";

const SignInPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const signIn = useSignIn();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    form: "",
    password: "",
  });

  const onSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const nextErrors = {
      email: "",
      form: "",
      password: "",
    };

    if (email === "" || password === "") {
      if (email === "") {
        nextErrors.email = "An email is required";
      }

      if (password === "") {
        nextErrors.password = "A password is required";
      }

      setErrors(nextErrors);
    } else {
      setIsSigningIn(true);
      setErrors(nextErrors);

      const response = await signIn({ email, password });

      if (response?.status === "success") {
        const nextPath = location?.state?.from?.pathname || "/admin";
        navigate(nextPath, { replace: true });
      } else {
        setIsSigningIn(false);
        setErrors((prev) => {
          return {
            ...prev,
            form: response?.message || "An error occurred. Please try again.",
          };
        });
      }
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-3 border border-solid border-slate-300 p-5">
        <h1 className="font-sans text-xl">Sign In</h1>
        <form className="flex w-full flex-col gap-3" onSubmit={onSubmit}>
          {errors.form && (
            <p className="border border-solid border-red-200 bg-red-50 px-3.5 py-2.5 font-sans text-base text-red-900">
              {errors.form}
            </p>
          )}
          <div className="text_field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              onChange={(evt: ChangeEvent<HTMLInputElement>) =>
                setEmail(evt.target.value)
              }
              type="text"
              value={email}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="text_field">
            <label htmlFor="password">Password</label>
            <input
              className="text_field"
              id="password"
              onChange={(evt: ChangeEvent<HTMLInputElement>) =>
                setPassword(evt.target.value)
              }
              type="password"
              value={password}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <button
            className="btn btn_primary self-end"
            disabled={isSigningIn}
            type="submit"
          >
            {isSigningIn ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
