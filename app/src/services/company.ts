import { api, ApiError } from "@/lib/api/api-util";
import { signup } from "./auth";

export interface CreateCompanyRequest {
  companyName: string;
  companyIdentifier: string;
  fullName: string;
  email: string;
  password: string;
  phone_number: string;
  country: string;
  city: string;
  postal_code: string;
  domain?: string;
  company_size?: string;
}

export interface CreateCompanyResponse {
  id: number;
  name: string;
  identifier: string;
  phone_number: string;
  country: string;
  city: string;
  postal_code: string;
  domain?: string;
  company_size?: string;
  created_at: string;
}

export interface SignupAndCreateCompanyResponse {
  signupSuccess: boolean;
  company?: CreateCompanyResponse;
  requiresVerification: boolean;
  message: string;
}

export const createCompany = async (
  data: CreateCompanyRequest
): Promise<SignupAndCreateCompanyResponse> => {
  const [firstName, ...lastNameParts] = data.fullName.trim().split(" ");
  const lastName = lastNameParts.join(" ") || firstName;

  try {
    await signup({
      email: data.email,
      password: data.password,
      first_name: firstName,
      last_name: lastName,
    });

    const companyData = {
      name: data.companyName,
      phone_number: data.phone_number || "+1234567890",
      country: data.country || "US",
      city: data.city || "New York",
      postal_code: data.postal_code || "10001",
      domain: data.domain || "",
      company_size: data.company_size || "2-10",
    };

    const company = await api.post<CreateCompanyResponse>(
      "/company/",
      companyData
    );

    return {
      signupSuccess: true,
      company,
      requiresVerification: false,
      message: "Company created successfully",
    };
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 400) {
        const errorData = error as any;
        if (errorData.message?.includes("email") || errorData.message?.includes("Email")) {
          return {
            signupSuccess: false,
            requiresVerification: true,
            message: "Please check your email for verification. After verifying, you can create your company.",
          };
        }
        throw new ApiError(
          errorData.message || "Failed to create company",
          error.status,
          error.statusText
        );
      }
      throw error;
    }
    throw new ApiError("Failed to create company", 0, "Unknown Error");
  }
};
