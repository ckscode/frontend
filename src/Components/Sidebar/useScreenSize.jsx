import { useState, useEffect } from 'react';

const useScreenSize = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1080);

  useEffect(() => {
    const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 1080);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isSmallScreen;
};

export default useScreenSize;