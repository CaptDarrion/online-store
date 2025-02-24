import { useState } from "react";
import AdminBar from "../components/AdminBar";
import UserManagement from "../components/UserManagement";

const AdminPage = () => {
  const [selectedSection, setSelectedSection] = useState(null);

  return (
    <div className="flex">
      <AdminBar onSelect={setSelectedSection} /> {/* Передаем функцию выбора */}
      <div className="flex-grow p-6">
        {selectedSection === "users" && <UserManagement />}
      </div>
    </div>
  );
};

export default AdminPage;
