import { useState } from "react";
import Login from "./containers/Login";
import PayoutForm from "./containers/PayoutForm";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <main className="bg-[#D2D8DE] flex justify-center items-center h-[100vh]">
      <div className="bg-neutral-50 w-[600px] h-[600px] rounded-[8px] py-[20px] px-[20px]">
        {!isLoggedIn ? <Login /> : <PayoutForm />}
      </div>
    </main>
  );
}

export default App;
