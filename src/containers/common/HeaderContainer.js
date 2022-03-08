import Header from "../../components/common/Header";
import { useStateValue } from "../../contexts/StateProvider";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

function HeaderContainer() {
  const [{ user }, dispatch] = useStateValue();

  const onLogout = () => {
    if (user) {
      signOut(auth);
    }
  };
  return <Header user={user} onLogout={onLogout} />;
}

export default HeaderContainer;
