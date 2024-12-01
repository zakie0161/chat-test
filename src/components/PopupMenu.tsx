import { Source } from "@/pages/home/core/_models";
import { useEffect, useRef, useState } from "react";
import { BiChevronDown } from "react-icons/bi";

interface ModalProps {
  sources?: Source[]
  handleSelectedSource: (source: Source) => void;
}

const PopupMenu: React.FC<ModalProps> = ({ sources, handleSelectedSource }) => {
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
  const [popupPosition, setPopupPosition] = useState<string>("top-12");
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const popupRef = useRef<HTMLDivElement>(null);

  const togglePopup = (): void => {
    setIsPopupVisible(!isPopupVisible);
  };

  const closePopup = (): void => {
    setIsPopupVisible(false);
  };

  const handleSelected = (index: number): void => {
    setSelectedIndex(index);
    closePopup();
  };

  useEffect(() => {
    if (isPopupVisible && popupRef.current) {
      const rect = popupRef.current.getBoundingClientRect();
      const isOverflowingBottom = rect.bottom > window.innerHeight;
      const isOverflowingTop = rect.top < 0;

      // Update position based on available space
      if (isOverflowingBottom) setPopupPosition("bottom-full mb-2");
      else if (isOverflowingTop) setPopupPosition("top-12");
    }
  }, [isPopupVisible]);

  // Close popup on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        closePopup();
      }
    };

    if (isPopupVisible) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isPopupVisible]);

  useEffect(() => {
    if (selectedIndex >= 0) {
      handleSelectedSource(sources![selectedIndex])
    }else {
      handleSelectedSource(undefined!)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex]);

  return (
    <div className="flex">
      <div className="relative">
        <button
          className="flex items-center text-gray-300 bg-gray-900 p-2 rounded-lg"
          onClick={togglePopup}
        >
          <span className="mr-2">{selectedIndex >= 0 ? sources![selectedIndex]?.name : 'Default Source'}</span>
          <BiChevronDown className="h-6 w-6 text-white" />
        </button>
        {isPopupVisible && (
          <div
            ref={popupRef}
            className={`absolute ${popupPosition} left-0 bg-gray-900 text-white rounded-lg p-4 w-80 shadow-lg`}
          >
            <div
              onClick={() => handleSelected(-1)}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-700 mt-2 cursor-pointer">
              <div className="flex items-center">
                <i className="fas fa-check-circle text-gray-300 mr-2"></i>
                <div>
                  <div>Default Source</div>
                  <div className="text-sm text-gray-400">
                    Default
                  </div>
                </div>
              </div>
              {selectedIndex === -1 && <i className="fas fa-check text-white" />}
            </div>
            {sources?.map((item, index) => (
              <div
                key={item.guid}>
                <div
                  onClick={() => handleSelected(index)}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-700 mt-2 cursor-pointer">
                  <div className="flex items-center">
                    <i className={`fas fa-${item.type === 'database' ? 'database' : 'terminal'} text-gray-300 mr-2`}></i>
                    <div>
                      <div>{item.name}</div>
                      <div className="text-sm text-gray-400">
                        {item.type}
                      </div>
                    </div>
                  </div>
                  {selectedIndex === index && <i className="fas fa-check text-white" />}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>

  );
}

export default PopupMenu;