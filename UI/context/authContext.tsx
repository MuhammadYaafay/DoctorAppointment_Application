"use client"

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  type FC,
} from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/utils/apiUtils";
import { removeAuthToken, setAuthToken, type User } from "@/utils/authUtils";

interface DoctorDetails {
  specialization: string;
  experience: number;
  fee: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    role: string,
    doctorDetails?: DoctorDetails
  ) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

interface LoginResponse {
  token: string;
  user: User;
  success: boolean;
  message?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { toast } = useToast();

  const refreshUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        return;
      }

      try {
        const userData = await apiRequest("/api/auth/profile", {
          authenticated: true,
        }) as User;
        setUser(userData);
      } catch (error) {
        // Handle unauthorized errors silently
        if (error instanceof Error && error.message.includes("401")) {
          localStorage.removeItem("token");
          setAuthToken("");
          setUser(null);
          return;
        }
        
        // Log other errors but don't throw them
        console.error("Error refreshing user:", error);
        setUser(null);
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error("Unexpected error in refreshUser:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    role: string,
    doctorDetails?: DoctorDetails
  ) => {
    try {
      const response = (await apiRequest("/api/auth/register", {
        method: "POST",
        body: { 
          name, 
          email, 
          password, 
          role,
          ...(role === "doctor" && doctorDetails ? doctorDetails : {})
        },
        headers: {
          "Content-Type": "application/json",
        },
      })) as LoginResponse;
      
      if (response.success) {
        toast({
          title: "Registration successful",
          description: "You have been registered successfully. Please login to continue.",
        });
        router.replace("/login");
      } else {
        throw new Error(response.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An error occurred during registration.",
      });
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = (await apiRequest("/api/auth/login", {
        method: "POST",
        body: { email, password },
        headers: {
          "Content-Type": "application/json",
        },
      })) as LoginResponse;
      
      if (response.success) {
        const token = response.token;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(response.user));
        setUser(response.user);
        router.push("/");
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
      } else {
        throw new Error(response.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error instanceof Error ? error.message : "An error occurred during login",
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await removeAuthToken();
      setUser(null);
      router.push("/login");
      toast({
        title: "Logged out successfully",
        description: "You have been logged out.",
      });
    } catch (error) {
      console.error("Error logging out:", error);
      toast({
        variant: "destructive",
        title: "Logout failed",
        description: "An error occurred while trying to log out.",
      });
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        await refreshUser();
      } catch (error) {
        console.error("Error in checkAuth:", error);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, register, login, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
