import { login } from "../services/requests";
import { useMutation } from "react-query";
import { generateBasicAuthHeader } from "../utils";
import { useAuth } from "../context/authContext";

function useLogin() {
  const { setIsLoggedIn } = useAuth();
  const loginMutation = useMutation({
    mutationFn: async () => {
      return login(
        generateBasicAuthHeader(
          "MK_TEST_UD76PRU0SC",
          "WQ3VDL32SMAEQ6TAFB1E7LDU4K1AYBZV"
        )
      );
    },
    onSuccess: (data) => {
      localStorage.setItem("auth", data.data.responseBody.accessToken);
      setIsLoggedIn(true);
    },
    onError: () => {
      alert("Something went wrong");
    },
  });
  return { loginMutation };
}

export default useLogin;
