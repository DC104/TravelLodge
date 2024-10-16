
// eslint-disable-next-line no-unused-vars
import React, { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import axios from "axios";
// Create the context with a default value
export const UserContext = createContext({
  user: null,
  setUser: () => {},
});

// Create a provider component
export function UserContextProvider({ children }) {
  const [user , setUser] = useState(null);
  const [ready , setReady] = useState(false);
  useEffect(() =>{
    if(!user) {
      axios.get('/profile') .then ( ({data}) =>{
        setUser(data);
        setReady(true);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] );

  return (
    <UserContext.Provider value={{ user, setUser , ready }}>
      {children}
    </UserContext.Provider>
  );
}

// Add prop-types for type-checking
UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
