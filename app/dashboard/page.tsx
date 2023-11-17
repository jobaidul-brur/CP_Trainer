import React from "react";
import FetchProblems from "./fetchProblems";

const AdminDashboard: React.FC = () => {
  return (
    <div>
      {/* Add any necessary navigation, header, and footer components */}
      <h1>Admin Dashboard</h1>
      {/* Add any necessary logic to fetch data from an API or database */}
      {/* Render the necessary components and data in the dashboard */}
      <FetchProblems />
    </div>
  );
};

export default AdminDashboard;
