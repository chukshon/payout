import Button from "../components/ui/Button";
import useLogin from "../mutations/useLogin";

const Login = () => {
  const { loginMutation } = useLogin();
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
