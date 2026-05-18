import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../../store/authStore";
import { Camera, Loader2 } from "lucide-react";

const Profile = () => {
  const { user, userlogout, setUser } = useAuthStore();
  const fileInputRef = useRef(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isSavingName, setIsSavingName] = useState(false);

  const [nameData, setNameData] = useState({
    firstName: user?.name?.split(" ")[0] || "Juan",
    lastName: user?.name?.split(" ").slice(1).join(" ") || "Dela Cruz",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleNameChange = (e) => {
    const { name, value } = e.target;
    setNameData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogout = () => {
    userlogout();
  };

  // --- CONNECTED SAVING NAME TO BACKEND ---
  const handleSaveName = async (e) => {
    e.preventDefault();
    setIsSavingName(true);

    try {
      console.log(
        "Saving changes for user account name to local server...",
        nameData
      );

      const res = await fetch(
        "http://localhost:5000/api/userauth/update-details",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            firstName: nameData.firstName,
            lastName: nameData.lastName,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.message || "Failed to update profile name");

      console.log("Name updated successfully!", data);

      if (setUser) {
        setUser(data.user);
      } else if (useAuthStore.setState) {
        useAuthStore.setState({ user: data.user });
      }

      setIsEditingName(false);
    } catch (error) {
      console.error(error.message || "Failed to save profile changes");
      alert(
        error.message || "Something went wrong saving your profile changes"
      );
    } finally {
      setIsSavingName(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    // Validate that the user typed their new password correctly twice
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    try {
      console.log("Sending password updates to secure server backend...");

      const res = await fetch(
        "http://localhost:5000/api/userauth/update-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Essential for verifying token cookies
          body: JSON.stringify({
            currentPassword: passwordData.currentPassword,
            newPassword: passwordData.newPassword,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to alter password");

      alert("Password updated successfully!");

      // Reset form states back to clean strings on success
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(error.message);
      alert(error.message || "Something went wrong updating your password.");
    }
  };

  // --- CONNECTED IMAGE HANDLERS TO LOCAL SERVER ---
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      const uploadData = new FormData();
      uploadData.append("image", file); // Must match upload.single("image") from backend

      console.log("Uploading profile photo image file to local server...");

      const res = await fetch(
        "http://localhost:5000/api/userauth/update-profile-picture",
        {
          method: "PUT",
          credentials: "include",
          body: uploadData,
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to upload image");

      console.log("Profile photo updated successfully!", data);

      // Dynamically push the newly generated server URL straight into your global store state
      if (setUser) {
        setUser(data.user);
      } else if (useAuthStore.setState) {
        useAuthStore.setState({ user: data.user });
      }
    } catch (error) {
      console.error(error.message || "Failed to upload image");
      alert(error.message || "Something went wrong uploading your photo");
    } finally {
      setIsUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = ""; // Reset file pointer input selection
    }
  };

  return (
    <div className="bg-black min-h-screen text-white flex items-center w-full">
      <main className="max-w-5xl mx-auto px-6 py-12 w-full text-left grow">
        <h1 className="text-3xl font-bold mb-8 tracking-tight text-white!">
          Your Profile
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-900/30 border border-gray-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-stretch"
        >
          <div className="bg-gray-900/50 border border-gray-800/80 rounded-2xl p-6 flex flex-col items-center justify-between text-center md:w-80 min-h-100">
            <div className="flex flex-col items-center w-full">
              {/* --- INTEGRATED ACTIVE AVATAR CONTAINER --- */}
              <div
                onClick={handleAvatarClick}
                className="relative w-36 h-36 bg-[#D9D9D9] rounded-full mb-6 shrink-0 cursor-pointer overflow-hidden group border border-transparent hover:border-gray-700 transition-all flex items-center justify-center"
              >
                {isUploadingImage ? (
                  <Loader2 className="h-8 w-8 text-gray-500 animate-spin" />
                ) : user?.profilePictureUrl ? (
                  <img
                    src={user.profilePictureUrl}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full bg-[#D9D9D9]"
                    aria-hidden="true"
                  />
                )}

                {/* Hover Action Overlay */}
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="h-6 w-6 text-white mb-1" />
                  <span className="text-white text-[10px] uppercase font-semibold tracking-wider">
                    Upload
                  </span>
                </div>

                {/* Hidden Native File Input Field Selection */}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

              {/* Identity Details from Auth Store */}
              <h2 className="text-2xl font-bold text-white! mb-1">
                {user?.name || `${nameData.firstName} ${nameData.lastName}`}
              </h2>
              <p className="text-sm text-gray-400 underline break-all opacity-80 mb-4">
                {user?.email || "juan.delacruz@gmail.com"}
              </p>
            </div>

            {/* Framer-Motion Logout Button Wrapper */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6 w-full"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="w-full py-3 px-4 bg-linear-to-r bg-sky-500 text-black
                font-bold rounded-lg shadow-lg
                focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 uppercase tracking-wider text-sm"
              >
                Logout
              </motion.button>
            </motion.div>
          </div>

          {/* RIGHT PANEL: Settings Forms */}
          <div className="flex-1 flex flex-col justify-between space-y-8">
            {/* Section 1: Personal Details Displays */}
            <section>
              <div className="flex justify-between items-center mb-1">
                <h2 className="text-xl font-bold text-white!">
                  Personal Details
                </h2>

                {!isEditingName && (
                  <button
                    onClick={() => setIsEditingName(true)}
                    className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium px-4 py-1.5 rounded-full transition-colors border border-gray-700"
                  >
                    Edit Name
                  </button>
                )}
              </div>

              <p className="text-xs text-gray-500 mb-4">
                Update your account information and security
              </p>

              <AnimatePresence mode="wait">
                {isEditingName ? (
                  <motion.form
                    key="edit-fields"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={handleSaveName}
                    className="space-y-4 bg-black/30 p-4 rounded-xl border border-dashed border-gray-800"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-gray-400 mb-1.5 block">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={nameData.firstName}
                          onChange={handleNameChange}
                          className="w-full bg-black/60 border border-gray-700 rounded-full px-4 py-2 text-white text-sm focus:outline-none focus:border-sky-500/50 transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-400 mb-1.5 block">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={nameData.lastName}
                          onChange={handleNameChange}
                          className="w-full bg-black/60 border border-gray-700 rounded-full px-4 py-2 text-white text-sm focus:outline-none focus:border-sky-500/50 transition-colors"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-1">
                      <button
                        type="button"
                        disabled={isSavingName}
                        onClick={() => setIsEditingName(false)}
                        className="px-4 py-1.5 bg-gray-800 hover:bg-gray-700 text-xs font-bold rounded-full transition-all disabled:opacity-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSavingName}
                        className="px-4 py-1.5 bg-[#00C875] hover:bg-[#00B268] text-black text-xs font-bold rounded-full transition-all flex items-center gap-1 disabled:opacity-50"
                      >
                        {isSavingName && (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        )}
                        {isSavingName ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="read-only-fields"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  >
                    <div>
                      <label className="text-xs font-semibold text-gray-400 mb-1.5 block">
                        First Name
                      </label>
                      <input
                        type="text"
                        disabled
                        placeholder="First Name"
                        value={user?.name?.split(" ")[0] || nameData.firstName}
                        className="w-full bg-black/50 border border-gray-800 rounded-full px-4 py-2 text-white text-sm opacity-60 cursor-not-allowed focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-400 mb-1.5 block">
                        Last Name
                      </label>
                      <input
                        type="text"
                        disabled
                        placeholder="Last Name"
                        value={
                          user?.name?.split(" ").slice(1).join(" ") ||
                          nameData.lastName
                        }
                        className="w-full bg-black/50 border border-gray-800 rounded-full px-4 py-2 text-white text-sm opacity-60 cursor-not-allowed focus:outline-none"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>

            {/* Section 2: Change Password*/}
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-white! mb-4">
                  Change Password
                </h2>

                <div className="space-y-3 max-w-md">
                  <input
                    type="password"
                    name="currentPassword"
                    placeholder="Current Password"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full bg-black/50 border border-gray-800 rounded-full px-4 py-2 text-white text-sm focus:outline-none focus:border-sky-500/50 transition-colors"
                  />
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full bg-black/50 border border-gray-800 rounded-full px-4 py-2 text-white text-sm focus:outline-none focus:border-sky-500/50 transition-colors"
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm New Password"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full bg-black/50 border border-gray-800 rounded-full px-4 py-2 text-white text-sm focus:outline-none focus:border-sky-500/50 transition-colors"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full max-w-md py-2.5 px-6 bg-[#38BDF8] text-black font-bold rounded-full hover:bg-[#0EA5E9] transition-all duration-200 text-sm shadow-lg shadow-sky-500/10"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Profile;
