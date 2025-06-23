import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../contexts/AuthContext";
import Login from "../pages/Login";

// Create a wrapper component with all the providers
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

describe("Login Component", () => {
  test("renders login form correctly", () => {
    render(
      <TestWrapper>
        <Login />
      </TestWrapper>
    );

    expect(screen.getByText("Sign in to your account")).toBeInTheDocument();
  });
});

describe("Login Component", () => {
  test("renders login form correctly", () => {
    render(
      <TestWrapper>
        <Login />
      </TestWrapper>
    );

    expect(screen.getByText("Sign in to your account")).toBeInTheDocument();
  });

  test("renders username and password inputs", () => {
    render(
      <TestWrapper>
        <Login />
      </TestWrapper>
    );

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });
});

test("shows validation errors for empty fields", () => {
  render(
    <TestWrapper>
      <Login />
    </TestWrapper>
  );

  const submitButton = screen.getByRole("button", { name: /sign in/i });
  fireEvent.click(submitButton);

  expect(screen.getByText("Username is required")).toBeInTheDocument();
  expect(screen.getByText("Password is required")).toBeInTheDocument();
});
