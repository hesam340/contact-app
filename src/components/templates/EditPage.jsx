import { useParams } from "react-router-dom";

import { useUser } from "context/UserContext";
import AddPage from "./AddPage";

function EditPage() {
  const { id } = useParams();
  const { users } = useUser();

  const user = users.find((user) => user.id === id);

  return <AddPage editedData={user} />;
}

export default EditPage;
