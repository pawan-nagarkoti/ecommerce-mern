import { useState } from "react";
import { _post } from "../lib/api";

export default function ResetPassword() {
  const [oldPasswordValue, setOldPasswordValue] = useState("");
  const [newPasswordValue, setNewPasswordValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await _post("auth/reset-password", {
        oldPassword: oldPasswordValue,
        newPassword: newPasswordValue,
      });
      if (res.data.success) {
        alert(res.data.message);
        setOldPasswordValue("");
        setNewPasswordValue("");
      }
    } catch (e) {
      console.log(e.message);
      alert(e.response.data.message);
    }
  };

  return (
    <div className="flex my-[50px] items-center justify-center  text-white">
      <div className="w-full max-w-sm border border-gray-700 rounded-lg p-6 bg-[#232b2b]">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Reset Password
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Old Password */}
          <div>
            <label
              htmlFor="oldPassword"
              className="block text-sm font-medium mb-2"
            >
              Old Password
            </label>
            <input
              id="oldPassword"
              type="text"
              placeholder="Enter old password"
              value={oldPasswordValue}
              className="w-full rounded-md border border-gray-600 bg-black px-3 py-2 text-white placeholder-gray-400 focus:border-white focus:outline-none"
              onChange={(e) => setOldPasswordValue(e.target.value)}
            />
          </div>

          {/* New Password */}
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium mb-2"
            >
              New Password
            </label>
            <input
              id="newPassword"
              type="text"
              placeholder="Enter new password"
              value={newPasswordValue}
              className="w-full rounded-md border border-gray-600 bg-black px-3 py-2 text-white placeholder-gray-400 focus:border-white focus:outline-none"
              onChange={(e) => setNewPasswordValue(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-md bg-white px-4 py-2 font-medium text-black hover:bg-gray-200 transition"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
