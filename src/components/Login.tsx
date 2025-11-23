import { useEffect, useState } from "react";
import Input from "./UI/Input";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { customError, login, signup } from "../util/http";
import type { loginSignupData } from "../util/http";
import { getAuthToken } from "../util/auth";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const isAuthenticated = getAuthToken();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/shatat-slaughterhouse/dashboard");
    }
  }, [isAuthenticated]);

  const [mode, ] = useState("login");
  // const toggleMode = () => {
  //   mode === "login" ? setMode("signup") : setMode("login");
  // };

  const {
    mutate: signupMutate,
    isPending: signupIsPending,
    isError: signupIsError,
    error: signupError,
  } = useMutation<any, customError, loginSignupData>({
    mutationFn: signup,
    onSuccess: (data) => {
      alert(data);
    },
  });

  const {
    mutate: loginMutate,
    isPending: loginIsPending,
    isError: loginIsError,
    error: loginError,
  } = useMutation<any, customError, loginSignupData>({
    mutationFn: login,
    onSuccess: () => {
      navigate("shatat-slaughterhouse/dashboard");
    },
  });

  const handleLoginSignup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const userData = Object.fromEntries(fd.entries());

    if (mode === "login") {
      const typedUserData: loginSignupData = {
        username: userData.username as string,
        password: userData.password as string,
      };

      loginMutate(typedUserData);
    } else if (mode === "signup") {
      if (typeof userData.username === "string" && !userData.username.trim()) {
        alert("Username cannot be empty.");
        return;
      }

      if (userData.password !== userData["confirm-password"]) {
        alert("Passwords do not match.");
        return;
      }

      delete userData["confirm-password"];

      const typedUserData: loginSignupData = {
        username: userData.username as string,
        password: userData.password as string,
      };

      signupMutate(typedUserData);
    }

    // mode === "login" ? loginMutate(userData) : signupMutate(userData);
  };

  return (
    <div className="flex-auto flex justify-center items-center">
      <form
        onSubmit={handleLoginSignup}
        className="bg-green-950 text-white p-10 space-y-5 my-3 rounded-2xl min-w-2/5 max-lg:w-1/2 max-md:w-full max-md:mx-32 max-sm:mx-5 font-bold"
      >
        <h2 className="uppercase text-2xl">{mode}</h2>

        {mode === "login" && loginIsError && (
          <p className="text-red-600">
            {String(
              loginError?.info?.error ?? "An error occurred... Try again later."
            )}
          </p>
        )}
        {mode === "signup" && signupIsError && (
          <p className="text-red-600">
            {String(
              signupError?.info?.error ?? "An error occurred... Try again later."
            )}
          </p>
        )}

        <div className="flex gap-5 max-lg:flex-col">
          <Input label="Username" id="username" type="text" required />
        </div>

        <div className="flex gap-5 max-lg:flex-col">
          <Input label="Password" id="password" type="password" />
          {mode === "signup" && (
            <Input
              label="Confirm Password"
              id="confirm-password"
              type="password"
            />
          )}
        </div>

        <div className="flex justify-end">
          {(loginIsPending || signupIsPending) && <p>Loading...</p>}
          {!(loginIsPending || signupIsPending) && (
            <button className="bg-green-500 px-5 py-2 rounded-md uppercase hover:cursor-pointer hover:bg-green-400">
              {mode}
            </button>
          )}
        </div>

        {/* <div className="space-y-1">
          <p>
            {mode === "login" ? "Don't" : "Already"} have an account?{" "}
            <span
              className="underline font-bold hover:cursor-pointer hover:text-green-500"
              onClick={toggleMode}
            >
              {mode === "login" ? "Signup" : "Login"}
            </span>
          </p>
        </div> */}
      </form>
    </div>
  );
};

export default Login;
