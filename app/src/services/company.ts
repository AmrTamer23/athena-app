export interface CreateCompanyRequest {
  companyName: string;
  companyIdentifier: string;
  fullName: string;
  email: string;
  password: string;
}

export interface CreateCompanyResponse {
  success: boolean;
  companyId: string;
  userId: string;
  message: string;
}

export const createCompany = async (
  data: CreateCompanyRequest
): Promise<CreateCompanyResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return {
    success: true,
    companyId: `company_${Math.random().toString(36).substring(2, 9)}`,
    userId: `user_${Math.random().toString(36).substring(2, 9)}`,
    message: "Company created successfully",
  };
};
