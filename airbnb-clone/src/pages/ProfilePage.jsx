import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

export default function ProfilePage() {
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  if (!subpage) {
    subpage = 'profile';
  }
  const navigate = useNavigate();

  const logout = async () => {
    try {
      console.log('Sending logout request');
      await axios.post('/logout', {}, { withCredentials: true });
      console.log('Logout successful');
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!ready) {
    return 'Loading .....';
  }

  if (ready && !user) {
    return <Navigate to="/login" />;
  }

 

  return (
    <div>
      <AccountNav/>
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email}) <br />
          <button onClick={logout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      )}
      {subpage === 'places' && <PlacesPage />}
    </div>
  );
}
