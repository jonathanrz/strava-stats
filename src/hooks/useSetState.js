import { useState } from "react";

const useSetState = (initialState = {}) => {
  const [state, set] = useState(initialState);

  const setState = (patch) => {
    set((prevState) => {
      const newState = typeof patch === "function" ? patch(prevState) : patch;
      return { ...prevState, ...newState };
    });
  };

  return [state, setState];
};

export default useSetState;
