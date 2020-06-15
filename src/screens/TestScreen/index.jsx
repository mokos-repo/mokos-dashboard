import React from 'react'

import app from 'firebase/app'
import { auth } from '../../firebase'

const Test = () => {

    const login = async () => {
        auth.signInWithEmailAndPassword("aman.teferi.79@gmail.com", "testPassword")
            .then(res => {
                res.user.getIdToken().then(async idToken => {
                    console.log(idToken)
                    await localStorage.setItem("token", idToken)
                })
            }).catch(err => {
                console.log(err)
            })
    }

    const signup = async () => {
        app.auth().createUserWithEmailAndPassword("aman.teferi.79@gmail.com", "testPassword")
            .then(res => {
                res.user.getIdToken().then(idToken => {
                    console.log(idToken)
                    localStorage.setItem("token", idToken)
                })
            }).catch(err => {
                console.log(err)
            })
    }

    const logout = async () => {
        localStorage.removeItem("token")
        console.log(localStorage.getItem("token"))
    }


    return (
        <div>
            <button onClick = { signup }>Signup with google</button>
            <button onClick = { login }>Login with google</button>
            <button onClick = { logout }>Logout</button>
        </div>
    )
}

export default Test
