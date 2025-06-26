import React, { useContext } from 'react';
import { MdModeNight, MdWbSunny } from 'react-icons/md';
import { AuthContext } from '../../Auth/AuthContext';

const Theme = () => {
  const { theme, setTheme } = useContext(AuthContext);

  return (
    <div
      onClick={() => setTheme(!theme)}
      className={`${theme? 'text-[yellow]' : 'text-gray-600'} py-1 cursor-pointer  transition duration-300 ease-in-out`}
    >
      {theme ? <MdWbSunny  size={30} ></MdWbSunny>: <MdModeNight size={30}></MdModeNight>}
    </div>
  );
};

export default Theme;
