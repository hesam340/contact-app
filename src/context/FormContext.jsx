import { createContext, useContext, useEffect, useReducer } from "react";

import generateId from "utils/generateId";

const initialState = {
  users: [],
  errors: {
    name: "",
    email: "",
    job: "",
    mobile: "",
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER": {
      state.users.push({ ...action.payload, userId: generateId() });
      return {
        ...state,
        errors: initialState.errors,
      };
    }
    case "EDIT_USER": {
      let editingUser = state.users.find(
        (user) => user.userId === action.payload.userId
      );
      editingUser.name = action.payload.name;
      editingUser.email = action.payload.email;
      editingUser.job = action.payload.job;
      editingUser.mobile = action.payload.mobile;
      return {
        ...state,
        errors: initialState.errors,
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
    case "INPUT_ERROR":
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.name]: action.payload.error,
        },
      };
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
  console.log(state.users);

  useEffect(() => {
    localStorage.setItem("form", JSON.stringify(state));
  }, [state]);

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
}

const useForm = () => {
  const { state, dispatch } = useContext(FormContext);
  return [state, dispatch];
};

export default FormProvider;
export { useForm };
