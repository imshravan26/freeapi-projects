import { useState } from "react";
import { useToast } from "../components/Toast";
const base = `https://api.freeapi.app/api/v1/users`;

const ACCESS_TOKEN_KEY = "auth-access-token";
const REFRESH_TOKEN_KEY = "auth-refresh-token";

type AuthResponse = {
  statusCode?: number;
  success?: boolean;
  message?: string;
  data?: {
    user?: unknown;
    accessToken?: string;
    refreshToken?: string;
  };
};

const useAuth = () => {
  const [user, setuser] = useState<unknown>();
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null as string | null);
  const { show } = useToast();

  const persistAuth = (
    nextUser: unknown,
    nextAccessToken?: string,
    nextRefreshToken?: string,
  ) => {
    setuser(nextUser);
    if (nextAccessToken) {
      window.localStorage.setItem(ACCESS_TOKEN_KEY, nextAccessToken);
    }
    if (nextRefreshToken) {
      window.localStorage.setItem(REFRESH_TOKEN_KEY, nextRefreshToken);
    }
  };

  const extractAuthData = (response: AuthResponse) => {
    const payload = response?.data ?? {};
    return {
      user: payload.user ?? payload ?? null, // ← falls back to payload itself
      accessToken: payload.accessToken ?? null,
      refreshToken: payload.refreshToken ?? null,
      message: response.message ?? "",
    };
  };

  // login function
  const Login = async (username: string, password: string) => {
    setloading(true);
    try {
      const res = await fetch(`${base}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, username }),
      });
      const data = (await res.json()) as AuthResponse;
      const authData = extractAuthData(data);
      console.log("getCurrentUser response:", data);
      console.log("Extracted auth data:", authData);

      if (res.ok) {
        persistAuth(
          authData.user,
          authData.accessToken ?? undefined,
          authData.refreshToken ?? undefined,
        );
        seterror(null);
        show(authData.message || "Logged in successfully", "success");
        setuser(authData.user);
      } else {
        const message = authData.message || "Login failed";
        seterror(message);
        show(message, "error");
      }
    } catch (err) {
      const message = "An error occurred during login";
      seterror(message);
      show(message, "error");
    } finally {
      setloading(false);
    }
  };

  const Register = async (
    username: string,
    email: string,
    password: string,
  ) => {
    setloading(true);
    try {
      const res = await fetch(`${base}/register`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = (await res.json()) as AuthResponse;
      const authData = extractAuthData(data);
      console.log("getCurrentUser response:", data);
      console.log("Extracted auth data:", authData);

      if (res.ok) {
        show(authData.message || "Account created successfully", "success");
        seterror(null);
        await Login(username, password);
      } else if (res.status === 409) {
        const message = authData.message || "User already exists";
        seterror(message);
        show(message, "error");
      } else {
        const message = authData.message || "Registration failed";
        seterror(message);
        show(message, "error");
      }
    } catch (err) {
      const message = "An error occurred during registration";
      seterror(message);
      show(message, "error");
    } finally {
      setloading(false);
    }
  };

  const getCurrentUser = async () => {
    setloading(true);
    try {
      const accessToken = window.localStorage.getItem(ACCESS_TOKEN_KEY);
      if (!accessToken) {
        setuser(null);
        return;
      }

      const res = await fetch(`${base}/current-user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = (await res.json()) as AuthResponse;

      if (res.ok) {
        // getCurrentUser returns user directly in data, not data.user
        const user =
          (data.data as Record<string, unknown>)?.user ?? data.data ?? null;
        setuser(user);
        seterror(null);
      } else {
        setuser(null);
      }
    } catch (error) {
      seterror("Failed to fetch user data");
      show("Login session expired, please log in again", "error");
    } finally {
      setloading(false);
    }
  };

  const Logout = async () => {
    if (typeof window === "undefined") return;
    try {
      const accessToken = window.localStorage.getItem(ACCESS_TOKEN_KEY);
      const res = await fetch(`${base}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // ← same fix
        },
      });
      if (res.ok) {
        show("Logged out successfully", "success");
      }
    } catch (error) {
      console.error("Error occurred while logging out:", error);
    }
    setuser(null);
    seterror(null);
    window.localStorage.removeItem(ACCESS_TOKEN_KEY);
    window.localStorage.removeItem(REFRESH_TOKEN_KEY);
  };

  return { user, loading, error, getCurrentUser, Login, Register, Logout };
};

export default useAuth;
