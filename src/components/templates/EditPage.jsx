import { useParams } from "react-router-dom";

import { useUser } from "context/FormContext";
import AddPage from "./AddPage";

function EditPage() {
  const { id } = useParams();
  const [state] = useUser();

  const user = state.users.find((user) => user.userId === +id);

  return <AddPage editedData={user} />;
}

export default EditPage;
