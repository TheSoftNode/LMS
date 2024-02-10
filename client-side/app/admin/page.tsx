"use client";
import React from "react";
import Heading from "../utils/Heading";
import AdminSidebar from "../components/Admin/sidebar/AdminSidebar";
import AdminProtected from "../hooks/useAdminProtected";

const page = () => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="LMS - Admin"
          description="ELearning is a platform for students to learn and get help from teachers"
          keywords="Programming, Nextjs, Nodejs, Redux"
        />

        <div className="flex h-[200vh]">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]"></div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
