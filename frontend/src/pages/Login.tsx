import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/api";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});
  const navigate = useNavigate();
  const { login: authLogin, isAuthenticated, isLoading } = useAuth();

  const loginMutation = useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => login(username, password),
    onSuccess: (data) => {
      authLogin(data.token, {
        id: data.id,
        username: data.username,
        email: data.email,
      });

      // Redirect to tasks page
      navigate("/tasks");
    },
    onError: (error: any) => {
      console.error("Login failed:", error);

      if (error.response?.data) {
        setErrors(error.response.data);
      }
    },
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/tasks", { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600'></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});

    // Basic frontend validation
    const newErrors: any = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    loginMutation.mutate({ username, password });
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Sign in to your account
          </h2>
        </div>
        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          {loginMutation.isError && !errors.username && !errors.password && (
            <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
              {errors.error || "Login failed. Please check your credentials."}
              {errors.message || ""}
            </div>
          )}

          <div className='space-y-4'>
            <div>
              <input
                type='text'
                required
                className={`appearance-none relative block w-full px-3 py-2 border ${
                  errors.username ? "border-red-300" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && (
                <p className='mt-1 text-sm text-red-600'>{errors.username}</p>
              )}
            </div>

            <div>
              <input
                type='password'
                required
                className={`appearance-none relative block w-full px-3 py-2 border ${
                  errors.password ? "border-red-300" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className='mt-1 text-sm text-red-600'>{errors.password}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type='submit'
              disabled={loginMutation.isPending}
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed'>
              {loginMutation.isPending ? "Signing in..." : "Sign in"}
            </button>
          </div>

          <div className='text-center'>
            <Link
              to='/register'
              className='text-indigo-600 hover:text-indigo-500'>
              Don't have an account? Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
