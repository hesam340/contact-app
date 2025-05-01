import { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
  users: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER": {
      state.users.push({ ...action.payload });
      return {
        ...state,
      };
    }
    case "EDIT_USER": {
      let editingUser = state.users.find(
        (user) => user.userId === action.payload.userId
      );
      editingUser.fullName = action.payload.fullName;
      editingUser.email = action.payload.email;
      editingUser.job = action.payload.job;
      editingUser.mobile = action.payload.mobile;
      return {
        ...state,
      };
    }
    case "DELETE_ONE_USER": {
      const newUsers = state.users.filter(
        (user) => user.userId !== action.payload.userId
      );
      return {
        ...state,
        users: [...newUsers],
      };
    }
    case "DELETE_GROUP_USERS": {
      const newUsers = state.users.filter(
        (item) => !action.payload.some((i) => i.userId === item.userId)
      );
      return {
        ...state,
        users: [...newUsers],
      };
    }
    default:
      throw new Error("Invalid Action");
  }
};

const FormContext = createContext();

function FormProvider({ children }) {
  const getInitialState = () => {
    const storedData = localStorage.getItem("form");
    return storedData ? JSON.parse(storedData) : initialState;
  };

  const [state, dispatch] = useReducer(reducer, initialState, getInitialState);

  useEffect(() => {
    localStorage.setItem("form", JSON.stringify(state));
  }, [state]);

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
}

const useUser = () => {
  const { state, dispatch } = useContext(FormContext);
  return [state, dispatch];
};

export default FormProvider;
export { useUser };
