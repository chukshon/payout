import Login from "./containers/Login";
import PayoutForm from "./containers/PayoutForm";
import { useAuth } from "./context/authContext";

function App() {
  const { isLoggedIn } = useAuth();
  return (
    <main className="bg-[#D2D8DE] flex justify-center items-center h-[100vh]">
      <div className="bg-neutral-50 w-[600px] h-[500px] rounded-[8px] py-[20px] px-[20px]">
        {!isLoggedIn ? <Login /> : <PayoutForm />}
      </div>
    </main>
  );
}

export default App;
