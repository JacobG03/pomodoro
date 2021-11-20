import React, { 
  useState,
  useEffect,
  createContext,
  useMemo,
  useCallback,
  useContext
} from "react";

// create context
const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  // the value that will be given to the context
  const [user, setUser] = useState(null);

  const axios = require('axios')

  const signout = useCallback(() => {
    axios.get('/auth/logout')
    .then(res => console.log(res.data.msg))
    setUser(null)
  }, [axios])

  const signin = useCallback((data) => {
    setUser(data)
  }, [])

  useEffect(() => {
    const fetchUser = () => {
      axios.get('/auth')
      .then(res => {
        setUser(res.data.user)
      })
    };

    fetchUser();
  }, [axios]);

  const contextValue = useMemo(() => ({
    user,
    signout,
    signin
  }), [user, signout, signin])

  return (
    // the Provider gives access to the context to its children
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  // get the context
  const context = useContext(UserContext);

  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error("useUserContext was used outside of its Provider");
  }

  return context;
};


export { useUserContext, UserContextProvider };