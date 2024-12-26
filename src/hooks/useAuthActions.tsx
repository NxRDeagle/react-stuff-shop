export const useAuthActions = (setIsOpen: (state: boolean) => void, setAuth: () => void) => {
  const toggleAuth = () => {
    setAuth();
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  return {
    toggleAuth,
    closeDrawer,
  };
};
