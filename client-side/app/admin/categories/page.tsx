import EditCategories from "../../../app/components/Admin/Customization/EditCategories";
import DashboardHero from "../../../app/components/Admin/DashboardHero";
import AdminSidebar from "../../../app/components/Admin/sidebar/AdminSidebar";
import AdminProtected from "../../../app/hooks/useAdminProtected";
import Heading from "../../../app/utils/Heading";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="LMS - Admin"
          description="LMS is a platform for students to learn and get help from teachers"
          keywords="Programming, MERN, Redux, Machine Learning"
        />
        <div className="flex h-screen">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
        </div>
        <div className="w-[85%]">
          <DashboardHero />
          <EditCategories />
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
