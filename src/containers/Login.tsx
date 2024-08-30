import Button from "../components/ui/Button";
import { login } from "../services/requests";
import { useMutation } from "@tanstack/react-query";
import { generateBasicAuthHeader } from "../utils";

const Login = () => {
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
      localStorage.setItem(
        "auth",
        JSON.stringify(data.data.responseBody.accessToken)
      );
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
        isLoading={loginMutation.isPending}
        isDisabled={loginMutation.isPending}
        type="button"
      >
        Login Here
      </Button>
    </div>
  );
};

export default Login;
