import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [user, setUser] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData: any) => {
    setIsPending(true);
    setUser(null);
    setError(null);

    const username = formData.get("username");

    try {
      const res = await axios.post("http://localhost:5000/handle_username", {
        username,
      });
      if (res.status === 200) {
        localStorage.setItem("username", username);
        window.location.reload();
      }
    } catch (error: any) {
      setError(error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <form className="border-2 p-5" action={handleSubmit}>
        <p>Username</p>
        <input name="username" type="text" placeholder="Username" />
        <button name="username" type="submit" className="bg-blue-500 p-1">
          submit
        </button>
      </form>
      {error ? (
        <p className="text-red-800 bg-red-400 mt-5 px-15">
          Username already taken
        </p>
      ) : null}
    </div>
  );
};

export default Login;
