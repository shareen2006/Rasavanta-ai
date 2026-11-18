import { createContext, useContext, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationContext = createContext(null);

export const NavigationProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [destination, setDestination] = useState('/');
  const isLocked = useRef(false);

  const triggerBrandedTransition = useCallback(
    (dest) => {
      // Prevent duplicate triggers from rapid clicks
      if (isLocked.current) return;
      isLocked.current = true;

      setDestination(dest);
      setIsTransitioning(true);

      // After animation completes (~1.2-1.4s total), navigate and release lock
      setTimeout(() => {
        navigate(dest);
        // Small delay before hiding loader so it fades after navigation
        setTimeout(() => {
          setIsTransitioning(false);
          isLocked.current = false;
        }, 250);
      }, 1150);
    },
    [navigate]
  );

  return (
    <NavigationContext.Provider
      value={{ isTransitioning, destination, triggerBrandedTransition }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error('useNavigation must be used within NavigationProvider');
  return ctx;
};
