import React, { useState } from 'react'
import { useInput } from '../../hooks/inputHooks'
import Axios from 'axios'

const SmsTestScreen = () => {
    const {bind: bindPhone, value: phone_number } = useInput("+251911647091")
    const {bind: bindVerify, value: verifyInput} = useInput("");
    const [verifyMessage, setVerifyMessage] = useState("")
    const [otpMessage, setOtpMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const {bind: bindUsername, setValue: setUsername ,value: username} = useInput("")
    const {bind: bindFirstName ,value: first_name} = useInput("")
    const {bind: bindLastName ,value: last_name} = useInput("")
    const {bind: bindEmail ,value: email} = useInput("")

    const sendOTP = async () => {
        setIsLoading(true)
        await Axios.post(process.env.REACT_APP_SERVER_ADDRESS + "auth/sendOtp", {phone_number})
            .then(res => {
                setIsLoading(false)
            }).catch(err => {
                console.log(err)
                setOtpMessage("Message failed")
                setIsLoading(false)
            })
    }



    const signUp = async () => {
        await Axios
                .post(process.env.REACT_APP_SERVER_ADDRESS + "auth/signup", 
                    { args: {
                        phone_number,
                        username,
                        first_name,
                        last_name,
                        email, 
                    }}).then(res=>{
                        console.log(res)
                    }).catch(err => {
                        console.log(err)
                    })
    }

    const verifyOTP = async () => {
        await Axios.post(process.env.REACT_APP_SERVER_ADDRESS + "auth/verifyOtp",
            {
                args: {
                    phone_number,
                    otp: verifyInput
                }
            }
        ).then(res => {
            setUsername(res.data.username)
            setVerifyMessage(res.data.success)
        }).catch(err => {
            setVerifyMessage('OTP not verified')
        })
    }

    return (
        <div>
            <h3>AfricasTalking Sms Testing screen</h3>
            <p>{isLoading?"Loading...":""}</p>
            <div>
                <input placeholder="Phone number" {...bindPhone}/>
                <button onClick={sendOTP}>Send OTP</button>
                <p>{otpMessage}</p>
            </div>
            <hr />
            <div>
                <input placeholder="Short code" {...bindVerify}/>
                <button onClick={verifyOTP}>Verify</button>
                <p>{verifyMessage}</p>
            </div>
            <hr />
            <div style={{display: "flex", flexDirection: "column", width: "20%"}}>
                <input placeholder="Username" {...bindUsername}/>
                <input placeholder="First Name" {...bindFirstName}/>
                <input placeholder="Last Name" {...bindLastName}/>
                <input placeholder="Email" {...bindEmail}/>
                <button onClick={signUp}>Signup</button>
            </div>
        </div>
    )
}

export default SmsTestScreen
