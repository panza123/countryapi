
import { useTheme } from '../context/ThemeProvider'; // Import the useTheme hook
import { CiLight } from "react-icons/ci";
import { FaRegMoon } from "react-icons/fa6";

export default function Nav() {
  const { darkMode, toggleDarkMode } = useTheme(); // Use the useTheme hook to access darkMode and toggleDarkMode

  return (
    <header className='w-full h-16 flex justify-between items-center px-10 shadow-lg shadow-gray-200 dark:shadow-black'>
      <p className="text-lg lg:text-2xl font-bold">Where in the world</p>
      {/* Toggle button for dark mode */}
      <button onClick={toggleDarkMode} className="flex gap-4 items-center transition-all ease-in-out duration-1000">
        {darkMode ? <CiLight size={30} /> : <FaRegMoon size={30} />}
        <p>{darkMode ? "Light Mode" : "Dark Mode"}</p>
      </button>
    </header>
  );
}
