import Button from "../components/ui/Button";
import { login } from "../services/requests";
import { useMutation } from "react-query";
import { generateBasicAuthHeader } from "../utils";
import { useAuth } from "../context/authContext";

const Login = () => {
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

  const handleLogin = () => {
    loginMutation.mutate();
  };
  return (
    <div className="flex justify-center items-center flex-col gap-[20px] h-full">
      <h2 className="text-[30px] font-[600] text-center">Login</h2>
      <Button
        onClick={handleLogin}
        isLoading={loginMutation.isLoading}
        isDisabled={loginMutation.isLoading}
        type="button"
      >
        Login Here
      </Button>
    </div>
  );
};

export default Login;
