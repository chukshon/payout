import { login } from "../services/requests";
import { useMutation } from "react-query";
import { generateBasicAuthHeader } from "../utils";
import { useAuth } from "../context/authContext";
import { CONFIG } from "../config";

function useLogin() {
  const { setIsLoggedIn } = useAuth();
  const loginMutation = useMutation({
    mutationFn: async () => {
      return login(
        generateBasicAuthHeader(
          CONFIG.MONNIFY_API_KEY,
          CONFIG.MONNIFY_SECRET_KEY
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
