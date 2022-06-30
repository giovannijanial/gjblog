import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";

const HomePage = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <h1>Bem-vindo! sr. {user?.displayName}</h1>
    </div>
  )
}

export default HomePage