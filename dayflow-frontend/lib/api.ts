export const API_BASE_URL = "http://localhost:8000"; // FastAPI URL

// API Response Types
export interface LoginResponse {
  login_id: string;
  role: string;
  must_change_password: boolean;
}

export interface CreateEmployeeResponse {
  login_id: string;
  temporary_password: string;
}

export interface ChangePasswordResponse {
  message: string;
}

export interface UserInfoResponse {
  login_id: string;
  name: string;
  email: string;
  phone: string;
  company_name: string;
  role: string;
  year_of_joining: number;
}

// API Functions
export const api = {
  // Login
  async login(loginId: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        login_id: loginId,
        password,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: "Invalid credentials" }));
      throw new Error(error.detail || "Login failed");
    }

    return response.json();
  },

  // Create Employee (HR only)
  async createEmployee(data: {
    company_name: string;
    name: string;
    email: string;
    phone: string;
    year_of_joining: number;
  }): Promise<CreateEmployeeResponse> {
    const response = await fetch(`${API_BASE_URL}/admin/create-employee`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: "Failed to create employee" }));
      throw new Error(error.detail || "Failed to create employee");
    }

    return response.json();
  },

  // HR Signup
  async hrSignup(data: {
    company_name: string;
    name: string;
    email: string;
    phone: string;
    year_of_joining: number;
  }): Promise<CreateEmployeeResponse> {
    const response = await fetch(`${API_BASE_URL}/hr/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: "Failed to create HR account" }));
      throw new Error(error.detail || "Failed to create HR account");
    }

    return response.json();
  },

  // Change Password
  async changePassword(loginId: string, newPassword: string): Promise<ChangePasswordResponse> {
    const response = await fetch(`${API_BASE_URL}/change-password?login_id=${encodeURIComponent(loginId)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        new_password: newPassword,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: "Failed to change password" }));
      throw new Error(error.detail || "Failed to change password");
    }

    return response.json();
  },

  // Get Current User Info
  async getCurrentUser(loginId: string): Promise<UserInfoResponse> {
    const response = await fetch(`${API_BASE_URL}/user/me?login_id=${encodeURIComponent(loginId)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: "Failed to get user info" }));
      throw new Error(error.detail || "Failed to get user info");
    }

    return response.json();
  },
};