"use client";

import AdminSidebar from "../../../app/components/Admin/sidebar/AdminSidebar";
import AdminProtected from "../../../app/hooks/useAdminProtected";
import Heading from "../../../app/utils/Heading";
import React from "react";
import DashboardHero from "../../../app/components/Admin/DashboardHero";
import AllCourses from "../../../app/components/Admin/Course/AllCourses";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="LMS - Admin"
          description="ELearning is a platform for students to learn and get help from teachers"
          keywords="Programming, Nextjs, Nodejs, Redux"
        />

        <div className="flex h-screen">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHero />
            <AllCourses />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
