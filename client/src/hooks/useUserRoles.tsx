import { useCallback } from "react";
import { useUserContext } from "../contexts/AuthContext";

const useUserRole = () => {
  const { role, setRole } = useUserContext();

  const changeRole = useCallback(() => {
    const newRole = role === "admin" ? "guest" : "admin";
    setRole(newRole);
  }, [role, setRole]);

  const changeRoleFromRegister = () => setRole("guest");

  return { role, changeRole, changeRoleFromRegister };
};

export default useUserRole;