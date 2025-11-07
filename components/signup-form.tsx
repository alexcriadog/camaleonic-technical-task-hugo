"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateName = (name: string) => {
    if (!name.trim()) {
      return "Full name is required";
    }
    if (name.trim().length < 2) {
      return "Name must be at least 2 characters";
    }
    if (name.trim().length > 50) {
      return "Name must be less than 50 characters";
    }
    return "";
  };

  const validateEmail = (email: string) => {
    if (!email) {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validatePassword = (password: string) => {
    if (!password) {
      return "Password is required";
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters";
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/(?=.*\d)/.test(password)) {
      return "Password must contain at least one number";
    }
    return "";
  };

  const validateConfirmPassword = (confirmPass: string) => {
    if (!confirmPass) {
      return "Please confirm your password";
    }
    if (confirmPass !== password) {
      return "Passwords do not match";
    }
    return "";
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    if (nameError && value) {
      setNameError(validateName(value));
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (emailError && value) {
      setEmailError(validateEmail(value));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (passwordError && value) {
      setPasswordError(validatePassword(value));
    }
    // Also revalidate confirm password if it's already been filled
    if (confirmPassword) {
      setConfirmPasswordError(validateConfirmPassword(confirmPassword));
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (confirmPasswordError && value) {
      setConfirmPasswordError(validateConfirmPassword(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const nameErr = validateName(name);
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    const confirmPasswordErr = validateConfirmPassword(confirmPassword);

    setNameError(nameErr);
    setEmailError(emailErr);
    setPasswordError(passwordErr);
    setConfirmPasswordError(confirmPasswordErr);

    if (nameErr || emailErr || passwordErr || confirmPasswordErr) {
      toast.error("Validation Error", {
        description: "Please fix the errors in the form",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await authClient.signUp.email({
        email,
        password,
        name,
      });

      if (response.error) {
        toast.error("Signup Failed", {
          description:
            response.error.message ||
            "Failed to create account. Please try again.",
        });
        setLoading(false);
        return;
      }

      toast.success("Account Created Successfully!", {
        description: "Welcome! Redirecting to dashboard...",
      });
      router.push("/dashboard");
    } catch (err: unknown) {
      // Handle different error formats
      let errorMessage = "Failed to create account. Please try again.";

      if (
        err &&
        typeof err === "object" &&
        "error" in err &&
        err.error &&
        typeof err.error === "object" &&
        "message" in err.error
      ) {
        errorMessage = String(err.error.message);
      } else if (err && typeof err === "object" && "message" in err) {
        errorMessage = String(err.message);
      } else if (typeof err === "string") {
        errorMessage = err;
      }

      toast.error("Signup Failed", {
        description: errorMessage,
      });
      setLoading(false);
    }
  };

  const handleGitHubSignup = async () => {
    setLoading(true);
    try {
      const response = await authClient.signIn.social({
        provider: "github",
        callbackURL: "/dashboard",
      });

      if (response?.error) {
        toast.error("GitHub Signup Failed", {
          description:
            response.error.message || "Failed to continue with GitHub",
        });
        setLoading(false);
      }
    } catch (err: unknown) {
      let errorMessage = "Failed to continue with GitHub";

      if (
        err &&
        typeof err === "object" &&
        "error" in err &&
        err.error &&
        typeof err.error === "object" &&
        "message" in err.error
      ) {
        errorMessage = String(err.error.message);
      } else if (err && typeof err === "object" && "message" in err) {
        errorMessage = String(err.message);
      } else if (typeof err === "string") {
        errorMessage = err;
      }

      toast.error("GitHub Signup Failed", {
        description: errorMessage,
      });
      setLoading(false);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Fill in the form below to create your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            required
            value={name}
            onChange={handleNameChange}
            onBlur={() => setNameError(validateName(name))}
            disabled={loading}
            className={
              nameError ? "border-red-500 focus-visible:ring-red-500" : ""
            }
          />
          {nameError && (
            <p className="text-red-500 text-sm mt-1">{nameError}</p>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email}
            onChange={handleEmailChange}
            onBlur={() => setEmailError(validateEmail(email))}
            disabled={loading}
            className={
              emailError ? "border-red-500 focus-visible:ring-red-500" : ""
            }
          />
          {emailError ? (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          ) : (
            <FieldDescription>
              We&apos;ll use this to contact you. We will not share your email
              with anyone else.
            </FieldDescription>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={handlePasswordChange}
            onBlur={() => setPasswordError(validatePassword(password))}
            disabled={loading}
            className={
              passwordError ? "border-red-500 focus-visible:ring-red-500" : ""
            }
          />
          {passwordError ? (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          ) : (
            <FieldDescription>
              Must be at least 8 characters with uppercase, lowercase, and
              number.
            </FieldDescription>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input
            id="confirm-password"
            type="password"
            required
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            onBlur={() =>
              setConfirmPasswordError(validateConfirmPassword(confirmPassword))
            }
            disabled={loading}
            className={
              confirmPasswordError
                ? "border-red-500 focus-visible:ring-red-500"
                : ""
            }
          />
          {confirmPasswordError ? (
            <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>
          ) : (
            <FieldDescription>Please confirm your password.</FieldDescription>
          )}
        </Field>
        <Field>
          <Button type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Button
          variant="outline"
          type="button"
          onClick={handleGitHubSignup}
          disabled={loading}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              fill="currentColor"
            />
          </svg>
          Continue with GitHub
        </Button>
        <Field>
          <FieldDescription className="px-6 text-center">
            Already have an account? <a href="/login">Sign in</a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
