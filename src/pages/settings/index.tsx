import { useEffect, useState } from "react";
import Chat from "@/components/Chat";
import MobileSiderbar from "@/components/MobileSidebar";
import Sidebar from "@/components/Sidebar";
import useAnalytics from "@/hooks/useAnalytics";
import SidebarSettings from "@/components/SidebarSettings";
import CustomPromptSetting from "@/components/settings/CustomPromptSetting";
import SQLAgentSetting from "@/components/settings/SQLAgentSetting";
import HostSetting from "@/components/settings/HostSetting";

export default function Settings() {
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const [selected, setSelected] = useState('custom-prompt');
  
  const toggleComponentVisibility = () => {
    setIsComponentVisible(!isComponentVisible);
  };

  return (
    <main className="overflow-hidden w-full h-screen relative flex">
      {isComponentVisible ? (
        <MobileSiderbar toggleComponentVisibility={toggleComponentVisibility} />
      ) : null}
      <div className="dark hidden flex-shrink-0 bg-gray-900 md:flex md:w-[260px] md:flex-col">
        <div className="flex h-full min-h-0 flex-col ">
          <SidebarSettings selected={selected} setSelected={setSelected}/>
        </div>
      </div>
      {selected === 'custom-prompt' && <CustomPromptSetting />}
      {selected === 'sql-agent' && <SQLAgentSetting />}
      {selected === 'host' && <HostSetting />}
    </main>
  );
}
