import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Challenge1 = () => {
  const [phoneNumber, setPhoneNumber] = useState();
  const [returnOTP, setReturnOTP] = useState()
  const [otp, setOtp] = useState();
  const navigate = useNavigate()
  const [err, setErr] = useState()
  const [success, setSuccess]= useState()

  const onGetCodeClick = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8080/api/auth/getCode`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        phoneNumber: phoneNumber,
      })
    });
    const data = await response.json();
    setReturnOTP(data.otp)
  };

  const onValidateCodeClick = async(e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8080/api/auth/verifyCode`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        phoneNumber: phoneNumber,
        accessCode: otp
      })
    });
    const data = await response.json();
    if (data.success === true){
      setSuccess("Validate successful")
      setErr("")
      localStorage.setItem('phoneNumber', phoneNumber)
      setTimeout(() => {
        setSuccess("")
        setErr("")
        navigate('/challenge2')
      }, 2000)
    } else{
      setErr("Wrong code!")
    }
  }
  return (
    <div>
      <h1 className="text-center py-8 font-bold text-[24px]">Access Form</h1>
      <div className="w-full flex flex-col gap-4 px-20">
        <form className="flex gap-4 w-full">
          <input
            className="w-full border px-4 py-2"
            type="text"
            placeholder="Please type your phone number with area code (E.g: +8412345689)"
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <button
            className="bg-blue-500 text-white w-[200px] h-[60px]"
            onClick={onGetCodeClick}
          >
            Get verify code
          </button>
        </form>

        <div className="py-4 text-blue-500">{returnOTP ? `Your OTP to validate is ${returnOTP}` : ""}</div>

        <form className="flex gap-4 justify-center">
          <input
            className="w-full border px-4 py-2"
            type="text"
            placeholder="Please type verify code"
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            className="bg-red-500 text-white w-[200px] h-[60px]"
            onClick={onValidateCodeClick}
          >
            Verify OTP
          </button>
        </form>
        <span className={`${err ? 'text-red-500' : success ? 'text-green-500' : ''}`}>{err || success}</span>
      </div>
    </div>
  );
};

export default Challenge1;
