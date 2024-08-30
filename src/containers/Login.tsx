import React from "react";
import Button from "../components/ui/Button";

const Login = () => {
  const handleLogin = () => {
    alert("login");
  };
  return (
    <div className="flex justify-center items-center flex-col gap-[20px] h-full">
      <h2 className="text-[30px] font-[600] text-center">Login</h2>
      <Button
        onClick={handleLogin}
        isLoading={false}
        isDisabled={false}
        type="button"
      >
        Login Here
      </Button>
    </div>
  );
};

export default Login;
