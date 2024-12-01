import { useRouter } from "next/router";
import React from "react";
import {
  AiOutlineMessage,
  AiOutlinePlus,
  AiOutlineUser,
  AiOutlineSetting,
} from "react-icons/ai";
import { BiHome, BiLinkExternal } from "react-icons/bi";
import { FiMessageSquare } from "react-icons/fi";
import { MdLogout } from "react-icons/md";


interface SideBarSettingsProps {
  selected: string;
  setSelected: (value: string) => void;
}

const navItems = [
  {
    id: "home",
    icon: BiHome,
    label: "Home",
  },
  {
    id: "custom-prompt",
    icon: AiOutlineMessage,
    label: "Custom Prompt",
  },
  {
    id: "sql-agent",
    icon: AiOutlineUser,
    label: "SQL Agent",
  },
  {
    id: "host",
    icon: AiOutlineSetting,
    label: "Host",
  },
  {
    id: "help",
    icon: BiLinkExternal,
    label: "Get help",
  },
  {
    id: "logout",
    icon: MdLogout,
    label: "Log out",
  },
];


const SidebarSettings: React.FC<SideBarSettingsProps> = ({ selected, setSelected }) => {

  const router = useRouter();

  const navigateToHome = () => {
    // Navigate to /about page
    router.push('/');
  };

  return (
    <div className="scrollbar-trigger flex h-full w-full flex-1 items-start border-white/20">
      <nav className="flex h-full flex-1 flex-col space-y-1 p-2">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={item.id === 'home' ? navigateToHome : () => setSelected(item.id)}
            className={`flex py-3 px-3 items-center gap-3 rounded-md ${selected===item.id? 'bg-gray-700' : ''} hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm`}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default SidebarSettings;
