import { createContext, useContext, useReducer } from "react";

const initialState = {
  form: [],
  errors: {
    name: "",
    email: "",
    job: "",
    mobile: "",
  },
  loading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_REQUEST": {
      return {
        ...state,
        loading: true,
      };
    }
    case "ADD_SUCCESS": {
      state.form.push({ ...action.payload });
      return {
        ...state,
        loading: false,
        errors: initialState.errors,
      };
    }
    case "ADD_ERROR": {
      return {
        ...state,
        loading: false,
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
  const [state, dispatch] = useReducer(reducer, initialState);

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
