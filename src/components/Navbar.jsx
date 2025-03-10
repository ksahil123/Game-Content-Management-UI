import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>
      <br/>
      <Link to="/characters">Characters</Link>
      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <Link to="/">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
