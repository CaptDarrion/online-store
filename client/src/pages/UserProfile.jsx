import { useState } from "react";
import UserBar from "../components/UserBar";
import UserInformationManagement from "../components/UserInformationManagement";
import UserOrderManagement from "../components/UserOrderManagement";

const UserProfile = () => {
  const [selectedSection, setSelectedSection] = useState(null);

  return (
    <div className="flex">
      <UserBar onSelect={setSelectedSection} />
      <div className="flex-grow p-6">
        {selectedSection === "personalInformation" && (
          <UserInformationManagement />
        )}
        {selectedSection === "orderInformation" && <UserOrderManagement />}
      </div>
    </div>
  );
};

export default UserProfile;
