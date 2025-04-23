export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "doctor" | "admin" | "patient";
  image_url: string;
  created_at: string;
}

export const getAuthToken = (): string | null => {
  return localStorage.getItem("docapp-token");
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem("docapp-token", token);
};

export const removeAuthToken = (): void => {
  localStorage.removeItem("docapp-token");
};

export const getAuthUser = async (): Promise<User | null> => {
  const token = getAuthToken();
  if (!token) {
    return null;
  }

  try {
    const response = await fetch(
      `${
        import.meta.env.API_URL || "http://localhost:5000"
      }/api/auth/getProfile`,
      {
        headers: {
          "x-auth-token": token,
        },
      }
    );
    if (!response.ok) {
      removeAuthToken();
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch authenticated user:", error);
    return null;
  }
};

export const logout = async (): Promise<boolean> => {
  const token = getAuthToken();

  if (!token) {
    return true;
  }
  try {
    const response = await fetch(
      `${import.meta.env.API_URL || "http://localhost:5000"}/api/auth/logout`,
      {
        method: "POST",
        headers: {
          "x-auth-token": token,
        },
      }
    );
    removeAuthToken();
    return response.ok;
  } catch (error) {
    console.log("logout error:", error);
    return false;
  }
};
