import { useParams } from "react-router-dom";

import { useForm } from "context/FormContext";
import AddPage from "./AddPage";

function EditPage() {
  const { id } = useParams();
  const [state] = useForm();

  const user = state.users.find((user) => user.userId === +id);
  console.log(user);

  return <AddPage data={user} />;
}

export default EditPage;
