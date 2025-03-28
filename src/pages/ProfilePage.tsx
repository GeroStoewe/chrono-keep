import React, {
  useRef,
  useState,
  useEffect,
  Dispatch,
  SetStateAction
} from "react";
import { useAuth } from "../hooks/UseAuth";
import NavigationBar from "../components/dashboardPage/NavigationBar";
import ProfileHeader from "../components/profilePage/ProfileHeader";
import ProfileGoogleMessage from "../components/profilePage/ProfileGoogleMessage";
import { ProfileTextInputField } from "../components/profilePage/ProfileTextInputField";
import { ProfilePasswordInputField } from "../components/profilePage/ProfilePasswordInputField";
import { ProfileSubmitButton } from "../components/profilePage/ProfileSubmitButton";
import { ProfileDeleteAccountPasswordInputField } from "../components/profilePage/ProfileDeleteAccountPasswordInputField";
import LogoutButton from "../components/profilePage/LogoutButton";
import DeleteAccountButton from "../components/profilePage/DeleteAccountButton";

/**
 * Handles the submission of the profile update form.
 * This function is responsible for updating the user's profile information, including their name, email, and password.
 * It also verifies the user's current password before allowing changes to sensitive data like the email.
 * After a successful update, it resets the input fields and updates the displayed user information.
 *
 * @param {React.FormEvent} e - The form submission event.
 * @param {Function} updateUserProfile - Function that updates the user's profile with the given data.
 * @param {Function} verifyPassword - Function that verifies the correctness of the user's password.
 * @param {string} inputFirstName - The new first name entered by the user.
 * @param {string} inputLastName - The new last name entered by the user.
 * @param {string} inputEmail - The new email entered by the user.
 * @param {string} oldPassword - The current password entered by the user for verification.
 * @param {string} newPassword - The new password entered by the user.
 * @param {string} displayFirstName - The currently displayed first name of the user.
 * @param {string} displayLastName - The currently displayed last name of the user.
 * @param {string} displayEmail - The currently displayed email of the user.
 * @param {Dispatch<SetStateAction<string>>} setDisplayFirstName - Function to update the displayed first name state.
 * @param {Dispatch<SetStateAction<string>>} setDisplayLastName - Function to update the displayed last name state.
 * @param {Dispatch<SetStateAction<string>>} setDisplayEmail - Function to update the displayed email state.
 * @param {Dispatch<SetStateAction<string>>} setInputFirstName - Function to update the input first name state.
 * @param {Dispatch<SetStateAction<string>>} setInputLastName - Function to update the input last name state.
 * @param {Dispatch<SetStateAction<string>>} setInputEmail - Function to update the input email state.
 * @param {Dispatch<SetStateAction<string>>} setOldPassword - Function to update the input old password state.
 * @param {Dispatch<SetStateAction<string>>} setNewPassword - Function to update the input new password state.
 * @param {Dispatch<SetStateAction<boolean>>} setIsLoading - Function to set the loading state.
 *
 * @returns {Promise<void>} - A promise that resolves when the profile update is completed or rejected.
 */
async function handleSubmit(
  e: React.FormEvent,
  updateUserProfile: (
    firstName: string,
    lastName: string,
    email: string,
    currentPassword: string,
    newPassword: string
  ) => Promise<void>,
  verifyPassword: (currentPassword: string) => Promise<boolean>,
  inputFirstName: string,
  inputLastName: string,
  inputEmail: string,
  oldPassword: string,
  newPassword: string,
  displayFirstName: string,
  displayLastName: string,
  displayEmail: string,
  setDisplayFirstName: Dispatch<SetStateAction<string>>,
  setDisplayLastName: Dispatch<SetStateAction<string>>,
  setDisplayEmail: Dispatch<SetStateAction<string>>,
  setInputFirstName: Dispatch<SetStateAction<string>>,
  setInputLastName: Dispatch<SetStateAction<string>>,
  setInputEmail: Dispatch<SetStateAction<string>>,
  setOldPassword: Dispatch<SetStateAction<string>>,
  setNewPassword: Dispatch<SetStateAction<string>>,
  setIsLoading: Dispatch<SetStateAction<boolean>>
) {
  e.preventDefault();
  setIsLoading(true);

  try {
    const updatedFirstName = inputFirstName.trim() || displayFirstName;
    const updatedLastName = inputLastName.trim() || displayLastName;
    let updatedEmail = displayEmail;

    // Only can change email when entered password ic correct
    if (inputEmail.trim() && inputEmail.trim() !== displayEmail) {
      const isPasswordCorrect = await verifyPassword(oldPassword);
      if (!isPasswordCorrect) {
        alert("Incorrect password. Email change is not allowed.");
        setIsLoading(false);
        return;
      }
      updatedEmail = inputEmail.trim();
    }

    await updateUserProfile(
      updatedFirstName,
      updatedLastName,
      updatedEmail,
      oldPassword,
      newPassword
    );

    setDisplayFirstName(updatedFirstName);
    setDisplayLastName(updatedLastName);
    setDisplayEmail(updatedEmail);

    // Reset Text Input Fields
    setInputFirstName("");
    setInputLastName("");
    setInputEmail("");
    setOldPassword("");
    setNewPassword("");

    console.log("Profile updated successfully!");
  } catch (err) {
    console.error("Profile update failed", err);
  } finally {
    setIsLoading(false);
  }
}

/**
 * This hook is used to handle the logic for the profile page, including updating the user's profile,
 * verifying their password, logging out, deleting the account, and handling the avatar image.
 *
 * @returns {JSX.Element} - The JSX structure of the profile page.
 */
const ProfilePage: React.FC = () => {
  const { user, updateUserProfile, verifyPassword, logout, deleteAccount } =
    useAuth();

  const isGoogleUser = user?.providerData.some(
    (provider) => provider.providerId === "google.com"
  );

  const [displayFirstName, setDisplayFirstName] = useState("");
  const [displayLastName, setDisplayLastName] = useState("");
  const [displayEmail, setDisplayEmail] = useState("");
  const [inputFirstName, setInputFirstName] = useState("");
  const [inputLastName, setInputLastName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * useEffect hook that runs when the `user` object changes.
   * It updates the displayed profile information, including the user's
   * first name, last name, email, and profile image.
   * The profile image is fetched from localStorage if available.
   */
  useEffect(() => {
    if (user) {
      const fullName = user.displayName || "Anonymous";
      const [fName, lName] = fullName.split(" ");
      setDisplayFirstName(fName);
      setDisplayLastName(lName || "");
      setDisplayEmail(user.email || "anonymous@example.com");
      const storedImage = localStorage.getItem("profileImage");
      if (storedImage) {
        setProfileImage(storedImage);
      } else {
        setProfileImage(null);
      }
    }
  }, [user]);

  /**
   * To generate initials from a full name.
   * It splits the name into parts and returns the first letter of the
   * first and last name (if available), combined and converted to uppercase.
   *
   * @param {string} name - The full name to generate initials from.
   * @returns {string} The initials derived from the full name.
   */
  const fullName = `${displayFirstName} ${displayLastName}`;
  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    const first = parts[0]?.charAt(0) ?? "";
    const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : "";
    return (first + last).toUpperCase();
  };
  const initials = getInitials(fullName);

  /**
   * Triggers a click event on the file input to allow the user
   * to upload a profile picture.
   */
  const handleAvatarClick = () => fileInputRef.current?.click();

  /**
   * Handle the file input change event when a user uploads a new profile image.
   * It reads the uploaded image file and saves it to localStorage, then updates
   * the profile image state with the new data URL.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event triggered by the file input change.
   */
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        localStorage.setItem("profileImage", dataUrl);
        setProfileImage(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  /**
   * Remove the profile image stored in localStorage and clear the
   * profile image state.
   */
  const handleRemoveImage = async () => {
    localStorage.removeItem("profileImage");
    setProfileImage(null);
  };

  /**
   * Handle account deletion after user confirmation.
   * It prompts the user for confirmation and, if confirmed, calls the
   * `deleteAccount` function with the current password to delete the account.
   */
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      await deleteAccount(oldPassword);
    }
  };

  const joinDate =
    user && user.metadata?.creationTime
      ? new Date(user.metadata.creationTime).toLocaleDateString()
      : "";

  return (
    <div className="min-h-screen bg-gradient-to-tl from-blue-400 to-purple-700">
      <NavigationBar />

      <div className="max-w-6xl mx-auto p-8 relative">
        <h1 className="text-4xl font-bold text-white mb-6 select-none">
          Profile
        </h1>

        <div className="bg-white rounded-xl shadow-2xl p-8 relative">
          <ProfileHeader
            joinDate={joinDate}
            profileImage={profileImage}
            handleRemoveImage={handleRemoveImage}
            handleAvatarClick={handleAvatarClick}
            initials={initials}
            fullName={fullName}
            displayEmail={displayEmail}
          ></ProfileHeader>

          <div className="mt-10">
            <h3 className="text-2xl font-semibold mb-4 select-none">
              Profile Settings
            </h3>
            {/* If a User is logged in with a Google Account */}
            {isGoogleUser ? (
              <ProfileGoogleMessage logout={logout}></ProfileGoogleMessage>
            ) : (
              <form
                className="space-y-2"
                onSubmit={(e) =>
                  handleSubmit(
                    e,
                    updateUserProfile,
                    verifyPassword,
                    inputFirstName,
                    inputLastName,
                    inputEmail,
                    oldPassword,
                    newPassword,
                    displayFirstName,
                    displayLastName,
                    displayEmail,
                    setDisplayFirstName,
                    setDisplayLastName,
                    setDisplayEmail,
                    setInputFirstName,
                    setInputLastName,
                    setInputEmail,
                    setOldPassword,
                    setNewPassword,
                    setIsLoading
                  )
                }
              >
                {/* If a User is logged in with Email and Password */}

                {/* Change First and/or Last name */}
                <ProfileTextInputField
                  label="First Name"
                  type="text"
                  value={inputFirstName}
                  placeholder={displayFirstName}
                  onChange={(e) => setInputFirstName(e.target.value)}
                />
                <ProfileTextInputField
                  label="Last Name"
                  type="text"
                  value={inputLastName}
                  placeholder={displayLastName}
                  onChange={(e) => setInputLastName(e.target.value)}
                />

                {/* Change Email */}
                <div className="mt-8 space-y-2">
                  <ProfileTextInputField
                    label="Email"
                    type="text"
                    value={inputEmail}
                    placeholder={displayEmail}
                    onChange={(e) => setInputEmail(e.target.value)}
                  ></ProfileTextInputField>
                  <ProfilePasswordInputField
                    label="Current Password"
                    value={oldPassword}
                    placeholder="Enter your current password for changing your Email"
                    onChange={(e) => setOldPassword(e.target.value)}
                  ></ProfilePasswordInputField>
                </div>

                {/* Change Password */}
                <div className="mt-8 space-y-2">
                  <ProfilePasswordInputField
                    label="Current Password"
                    value={oldPassword}
                    placeholder="Enter your current password"
                    onChange={(e) => setOldPassword(e.target.value)}
                  ></ProfilePasswordInputField>
                  <ProfilePasswordInputField
                    label="New Password"
                    value={newPassword}
                    placeholder="Enter your new password"
                    onChange={(e) => setNewPassword(e.target.value)}
                  ></ProfilePasswordInputField>
                </div>

                {/* Submit Button */}
                <div className="mt-8 flex justify-center">
                  <ProfileSubmitButton
                    isLoading={isLoading}
                    text={"Save Changes"}
                  />
                </div>

                {/* Logout and Delete Account Button */}
                <div className="mt-18 flex justify-between items-center w-full">
                  <LogoutButton logout={logout}></LogoutButton>
                  <div className="flex gap-4 items-center">
                    <ProfileDeleteAccountPasswordInputField
                      value={oldPassword}
                      placeholder="Current password for deleting account"
                      onChange={(e) => setOldPassword(e.target.value)}
                    ></ProfileDeleteAccountPasswordInputField>
                    <DeleteAccountButton
                      handleDelete={handleDelete}
                    ></DeleteAccountButton>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default ProfilePage;
