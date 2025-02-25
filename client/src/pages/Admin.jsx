import { useState } from "react";
import AdminBar from "../components/AdminBar";
import UserManagement from "../components/UserManagement";
import BrandManagement from "../components/BrandManagement";

const AdminPage = () => {
  const [selectedSection, setSelectedSection] = useState(null);

  return (
    <div className="flex">
      <AdminBar onSelect={setSelectedSection} />
      <div className="flex-grow p-6">
        {selectedSection === "users" && <UserManagement />}
        {selectedSection === "brands" && <BrandManagement />}
      </div>
    </div>
  );
};

export default AdminPage;
