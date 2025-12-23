import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://10.0.0.6:8000";

export interface LoginResponse {
  user: {
    userId: string;
    email: string;
    full_name: string;
    phone_number?: string;
    is_active: boolean;
    is_verified: boolean;
  };
  token: string;
}

export async function loginUser(
  email: string,
  password: string
): Promise<LoginResponse> {
  try {
    const response = await axios.post<LoginResponse>(
      `${API_BASE_URL}/auth/login`,
      {
        email,
        password,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
    throw error;
  }
}

export async function logoutUser(token: string): Promise<void> {
  try {
    await axios.post(
      `${API_BASE_URL}/auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Logout failed:", error);
  }
}

export async function verifyToken(token: string): Promise<boolean> {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.status === 200;
  } catch (error) {
    return false;
  }
}
