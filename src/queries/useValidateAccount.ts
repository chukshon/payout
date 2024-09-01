import { useQuery } from "react-query";
import { validateAccount } from "../services/requests";
import { useAuth } from "../context/authContext";
import { AcccountDetailsT } from "../types";

function useValidateAccount(accountNumber: string, bankCode: string) {
  const { authToken, setIsLoggedIn } = useAuth();
  const { data, isLoading: isValidatingAccountDetails } = useQuery({
    queryKey: [accountNumber, bankCode],
    queryFn: () =>
      validateAccount(authToken as string, accountNumber, bankCode),
    onError: () => {
      // setIsLoggedIn(false);
      // localStorage.clear();
    },
    enabled: accountNumber.length === 10 && bankCode.length > 0,
    retry: 0,
  });

  const AccountDetails: AcccountDetailsT = data?.data?.responseBody;

  return {
    AccountDetails,
    isValidatingAccountDetails,
  };
}

export default useValidateAccount;
