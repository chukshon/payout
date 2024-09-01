import { useQuery } from "react-query";
import { validateAccount } from "../services/requests";
import { useAuth } from "../context/authContext";
import { AcccountDetailsT } from "../types";

function useValidateAccount(accountNumber: string, bankCode: string) {
  const { authToken } = useAuth();
  const {
    data,
    isLoading: isValidatingAccountDetails,
    error,
  } = useQuery({
    queryKey: [accountNumber, bankCode],
    queryFn: () =>
      validateAccount(authToken as string, accountNumber, bankCode),
    onError: () => {},
    enabled: accountNumber.length === 10 && bankCode.length > 0,
    retry: 0,
  });

  const AccountDetails: AcccountDetailsT = data?.data?.responseBody;

  const errorMessage = (error as any)?.response?.data?.responseMessage;

  return {
    AccountDetails,
    isValidatingAccountDetails,
    errorMessage,
  };
}

export default useValidateAccount;
