import Header from "../../components/common/Header";
import { useStateValue } from "../../contexts/StateProvider";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function HeaderContainer() {
  const navigator = useNavigate();
  const [{ user }, dispatch] = useStateValue();

  const onLogout = () => {
    if (user) {
      signOut(auth);
      navigator("/");
    }
  };
  return <Header user={user} onLogout={onLogout} />;
}

export default HeaderContainer;
