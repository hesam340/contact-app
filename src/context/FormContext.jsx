import { createContext, useContext, useReducer } from "react";

const initialState = {
  errors: {
    name: "",
    email: "",
    job: "",
    mobile: "",
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER": {
      return {
        ...state,
        errors: initialState.errors,
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
  
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
  );

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
