import type { User } from "./auth.store";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001";

export interface RegisterPayload {
  full_name: string;
  email: string;
  phone_number: string;
  password: string;
  profession?: string;
  district_id: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface District {
  id: string;
  name: string;
}

// Register new user
export async function registerUser(data: RegisterPayload): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        // Backend expects password_hash field
        password_hash: data.password,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Registration failed");
    }

    return response.json();
  } catch (error) {
    console.error("Registration API error:", error);
    throw error;
  }
}

// Login user
export async function loginUser(
  email: string,
  password: string
): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login failed");
    }

    return response.json();
  } catch (error) {
    console.error("Login API error:", error);
    throw error;
  }
}

// Google Sign-In
export async function loginWithGoogle(
  credential: string
): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE}/auth/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ credential }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Google sign-in failed");
    }

    return response.json();
  } catch (error) {
    console.error("Google sign-in API error:", error);
    throw error;
  }
}

// Logout
export async function logoutUser(token: string): Promise<void> {
  try {
    await fetch(`${API_BASE}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Logout API error:", error);
    // Don't throw - logout should succeed locally even if API fails
  }
}

// Verify token and get user
export async function verifyToken(token: string): Promise<User> {
  try {
    const response = await fetch(`${API_BASE}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Token verification failed");
    }

    return response.json();
  } catch (error) {
    console.error("Token verification error:", error);
    throw error;
  }
}

// Get districts for dropdown
export async function getDistricts(): Promise<District[]> {
  try {
    const response = await fetch(`${API_BASE}/districts`);

    if (!response.ok) {
      throw new Error("Failed to fetch districts");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Districts API error:", error);
    throw error;
  }
}
