import { useEffect, useState } from "react";
import useAnalytics from "@/hooks/useAnalytics";
import Home from "../home";
import { useRouter } from "next/router";

export default function Chat() {

  const router = useRouter();
  const { guid } = router.query; // Ambil parameter 'guid' dari URL
  
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const { trackEvent } = useAnalytics();

  const toggleComponentVisibility = () => {
    setIsComponentVisible(!isComponentVisible);
  };

  return (
    <Home guid={guid?.toString()}/>
  );
}
