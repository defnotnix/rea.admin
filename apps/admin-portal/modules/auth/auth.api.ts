import axios from "axios";

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    full_name: string;
    phone_number?: string;
    is_active: boolean;
    is_verified: boolean;
  };
  access: string;
  refresh: string;
}

export async function loginUser(
  email: string,
  password: string
): Promise<LoginResponse> {
  try {
    const response = await axios.post<LoginResponse>(`/api/auth/login/`, {
      email,
      password,
    });
    console.log(response);
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

export async function logoutUser(accessToken: string): Promise<void> {
  try {
    await axios.post(
      `/api/auth/logout/`,
      {},
      {
        headers: {
          Authorization: `Bearer  ${accessToken}`,
        },
      }
    );
  } catch (error) {
    console.error("Logout failed:", error);
  }
}

export async function verifyToken(accessToken: string): Promise<boolean> {
  try {
    const response = await axios.get(`/api/auth/verify/`, {
      headers: {
        Authorization: `Bearer  ${accessToken}`,
      },
    });
    return response.status === 200;
  } catch (error) {
    return false;
  }
}
