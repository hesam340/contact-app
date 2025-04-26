import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import api from "configs/api";

const UserContext = createContext();

function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/users");
        setUsers(res);
      } catch (error) {
        toast.error("مشکلی پیش آمده است لطفا دوباره وارد شوید!");
      }
    };

    fetchUsers();
  }, [location, reload]);

  return (
    <UserContext.Provider value={{ users, setReload }}>
      {children}
    </UserContext.Provider>
  );
}

const useUser = () => {
  const { users, setReload} = useContext(UserContext);
  return { users, setReload };
};

export default UserProvider;
export { useUser };
