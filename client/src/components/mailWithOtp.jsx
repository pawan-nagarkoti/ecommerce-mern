import React, { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EmailLogin() {
  const navigate = useNavigate();
  const [hasEmail, setHasEmail] = useState("");

  // UI-only OTP state for focus & display; not used for real validation.
  const otpLength = 6;
  const [otp, setOtp] = useState(Array.from({ length: otpLength }, () => ""));
  const inputsRef = useMemo(
    () => Array.from({ length: otpLength }, () => React.createRef()),
    [otpLength]
  );

  const setDigit = (index, value) => {
    const v = value.replace(/\D/g, "").slice(-1); // last digit only
    const next = [...otp];
    next[index] = v;
    setOtp(next);
    if (v && index < otpLength - 1) {
      inputsRef[index + 1]?.current?.focus();
    }
  };

  const onKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef[index - 1]?.current?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0)
      inputsRef[index - 1]?.current?.focus();
    if (e.key === "ArrowRight" && index < otpLength - 1)
      inputsRef[index + 1]?.current?.focus();
  };

  const onPaste = (e) => {
    const text = (e.clipboardData.getData("text") || "").replace(/\D/g, "");
    if (!text) return;
    e.preventDefault();
    const next = [...otp];
    for (let i = 0; i < otpLength; i++) next[i] = text[i] || "";
    setOtp(next);
    const lastFilled = Math.min(text.length, otpLength) - 1;
    if (lastFilled >= 0) inputsRef[lastFilled]?.current?.focus();
  };

  const handleEmail = async (e) => {
    e.preventDefault();
    try {
      console.log(hasEmail);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleOtp = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex min-h-screen items-center justify-center  text-white">
      <div className="w-full max-w-sm rounded-lg border border-gray-700 p-6 shadow-2xl bg-[#3b444b]">
        {/* Header */}
        <h1 className="mb-2 text-center text-2xl font-semibold">
          Login with Email
        </h1>

        <>
          {/* Email step */}
          <form className="space-y-4" onSubmit={handleEmail}>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Email address
              </label>
              <input
                id="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="email@gmail.com"
                className="w-full rounded-md border border-gray-600 bg-[#3b444b] px-3 py-2 text-white placeholder-gray-500 focus:border-white focus:outline-none"
                value={hasEmail}
                onChange={(e) => setHasEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-white px-4 py-2 font-medium text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-70"
            >
              send otp on mail
            </button>
          </form>
          {/* OTP step */}
          {hasEmail && (
            <form className="space-y-5 mt-3" onSubmit={handleOtp}>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  One-time coded (OTP)
                </label>
                <div
                  className="flex justify-between gap-2"
                  onPaste={onPaste}
                  aria-label="Enter the one-time passcode"
                >
                  {otp.map((d, i) => (
                    <input
                      key={i}
                      ref={inputsRef[i]}
                      inputMode="numeric"
                      autoComplete={i === 0 ? "one-time-code" : "off"}
                      pattern="[0-9]*"
                      maxLength={1}
                      value={d}
                      onChange={(e) => setDigit(i, e.target.value)}
                      onKeyDown={(e) => onKeyDown(e, i)}
                      className="h-12 w-10 rounded-md border border-gray-600 bg-[#3b444b] text-center text-lg tracking-widest text-white focus:border-white focus:outline-none"
                      aria-label={`Digit ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-white px-4 py-2 font-medium text-black transition hover:bg-gray-200"
              >
                Login
              </button>
            </form>
          )}

          {/* Footer links */}
          <div
            className="mt-6 text-center cursor-pointer"
            onClick={() => navigate("/login")}
          >
            <button className="text-sm text-gray-400 hover:text-white cursor-pointer">
              Back to sign in
            </button>
          </div>
        </>
      </div>
    </div>
  );
}
