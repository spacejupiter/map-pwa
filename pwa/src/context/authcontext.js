import { createContext, useState ,useEffect} from 'react'
import authenticate from '../windows/auth/auth'
import { Link, useNavigate, useLocation } from 'react-router-dom';

export const AuthContext = createContext()

function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [currentUser, setcurrentUser] = useState(null)
  const [accessToken, setAccessToken] = useState(null)
  const [isError, setError] = useState({
    status:false,
    message:''
  })

  const setLogInState = (state) => {
    setLoggedIn((prev) => !prev)
  }
  useEffect(()=>{
   const auth = authenticate.getauth();
   auth.onAuthStateChanged(user =>{
    setcurrentUser(user);
    console.log(currentUser);
});
  },[]);

  

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      if (email && password) {
        authenticate
          .login(email, password)
          .then((user) => {
            console.log(user)
            setAccessToken(user.accessToken)
            resolve(user);
            //
          })
          .catch((e) => {
            setError({status:true,message:e})
            console.log(e);
          })
      }
    })
  }

  const signup = (email, password) => {
    return new Promise((resolve, reject) => {
      if (email && password) {
        authenticate
          .signup(email, password)
          .then((user) => {
            console.log(user)
            setAccessToken(user.accessToken)
            resolve(user);
            //
          })
          .catch((e) => {
            reject(e);
            setError({status:true,message:e})
            console.log(e);
          })
      }
    })
  }

  const setUsers = (currentUser) => {
    setcurrentUser(currentUser)
  }

  const setAcess = (access) => {
    setAccessToken(access)
  }

  return (
    <AuthContext.Provider
      value={{
        setLogInState,
        loggedIn,
        setUsers,
        currentUser,
        accessToken,
        setAcess,
        isError,
        login,
        signup
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
