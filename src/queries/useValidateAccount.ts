import { useQuery } from "react-query";
import { validateAccount } from "../services/requests";
import { useAuth } from "../context/authContext";
import { AcccountDetailsT } from "../types";

function useValidateAccount(accountNumber: string, bankCode: string) {
  const { authToken, setIsLoggedIn } = useAuth();
  const { data, isLoading: isValidatingAccountDetails } = useQuery({
    queryKey: [],
    queryFn: () =>
      validateAccount(authToken as string, accountNumber, bankCode),
    onError: () => {
      setIsLoggedIn(false);
      localStorage.clear();
    },
  });

  const AccountDetails: AcccountDetailsT =
    data?.data?.responseBody?.accountName;

  return {
    AccountDetails,
    isValidatingAccountDetails,
  };
}

export default useValidateAccount;
