// components/Button.jsx
export default function Button({ children, onClick, type = 'button' }) {
    return (
      <button
        type={type}
        onClick={onClick}
        className="px-5 py-2 bg-gradient-to-r from-blue-900 to-blue-900 text-white font-semibold rounded-full shadow-md backdrop-blur-md bg-white/30 hover:from-blue-950 hover:to-blue-950 hover:shadow-lg active:scale-95 transition-all duration-200"
      >
        {children}
      </button>
    );
  }
  