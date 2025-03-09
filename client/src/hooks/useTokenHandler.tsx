import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userAuth } from "../services/Token";
import { useUserContext } from "../contexts/AuthContext";

const useTokenHandler = () => {
  const { setIsAuthenticated } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      try {
        const authStatus = await userAuth();
        setIsAuthenticated(authStatus);
      } catch (error) {
        console.error(`Failed to validate token: ${error}`);
        navigate('/');
        setIsAuthenticated(false);
      }
    }

    validateToken();
  }, [setIsAuthenticated, navigate]);
}

export default useTokenHandler;