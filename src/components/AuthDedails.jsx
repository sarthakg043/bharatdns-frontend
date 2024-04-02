import React, {useEffect, useState} from 'react'
import { auth } from '../firebase/firebase-config'
import { onAuthStateChanged, signOut } from 'firebase/auth'

function AuthDedails() {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if(user){
                setAuthUser(user)
            }
            else{
                setAuthUser(null)
            }
        });
        return () => {
            listen();
        }
    }, [auth])

    const userSignOut = () => {
        signOut(auth)
        .then(() => {
            console.log("sign out successful")
        })
        .catch((error) => console.log(error))
    }
  return (
    <div> { authUser ? <><p>{`Signed In ${authUser.email}`}</p><button onClick={userSignOut}>Sign Out</button></> : <>Signed Out</> } </div>
  )
}

export default AuthDedails