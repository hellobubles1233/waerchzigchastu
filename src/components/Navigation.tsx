import React from 'react';
import { useMsal } from '@azure/msal-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LogOut,
} from 'lucide-react';

const Navigation: React.FC = () => {
  const { instance } = useMsal();

  const handleLogout = () => {
    instance.logoutPopup();
  };

  return (
    <nav className="w-64 bg-light p-4 flex flex-col">
      <div className="mb-8">
          <h2 className="text-xl font-bold text-primary"><img src="https://www.valaiscom.ch/templates/valaiscom_2017/img/logo.svg" alt="Valaiscom AG" width="200" draggable="false"/></h2>
      </div>
      <div className="mb-8"> 
      </div>
      

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-3 py-1 bg-dark text-light hover:bg-primary rounded-lg mt-auto"
      >
        <LogOut size={20} />
        <span>abmäldu</span>
      </button>
    </nav>
  );
};

export default Navigation;