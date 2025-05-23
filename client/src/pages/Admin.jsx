import { useState } from "react";
import AdminBar from "../components/AdminBar";
import UserManagement from "../components/UserManagement";
import BrandManagement from "../components/BrandManagement";
import CategoryManagement from "../components/CategoryManagement";
import ProductManagement from "../components/ProductManagement";
import AdminOrderManagement from "../components/AdminOrderManagement";

const AdminPage = () => {
  const [selectedSection, setSelectedSection] = useState(null);

  return (
    <div className="flex">
      <AdminBar onSelect={setSelectedSection} />
      <div className="flex-grow p-6">
        {selectedSection === "users" && <UserManagement />}
        {selectedSection === "brands" && <BrandManagement />}
        {selectedSection === "categories" && <CategoryManagement />}
        {selectedSection === "products" && <ProductManagement />}
        {selectedSection === "orders" && <AdminOrderManagement />}
      </div>
    </div>
  );
};

export default AdminPage;
