import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Menu, X, LogOut } from 'lucide-react'; // optional: use any icon library or svg

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false); // close menu on logout
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide">
          <Link to="/" className="hover:text-indigo-400 transition-colors">HunTrackR</Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-5 text-sm font-medium">
          {!user ? (
            <>
              <Link to="/register" className="hover:text-indigo-400 transition-colors">Sign Up</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="hover:text-indigo-400 transition-colors">Dashboard</Link>
              <Link to="/applications" className="hover:text-indigo-400 transition-colors">Applications</Link>
              <button
                onClick={handleLogout}
                className="hover:text-indigo-400 text-white px-6 py-2 rounded-lg shadow-sm transition-all"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 space-y-3 text-sm font-medium">
          {!user ? (
            <>
              <Link to="/register" onClick={() => setIsOpen(false)} className="block hover:text-indigo-400">Sign Up</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block hover:text-indigo-400">Dashboard</Link>
              <Link to="/applications" onClick={() => setIsOpen(false)} className="block hover:text-indigo-400">Applications</Link>
              <button
                onClick={handleLogout}
                className="w-full text-left hover:text-indigo-400 text-white  rounded-lg shadow-sm transition-all"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
