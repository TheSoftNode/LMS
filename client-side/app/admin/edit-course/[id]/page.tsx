"use client";
import EditCourse from "../../../../app/components/Admin/Course/EditCourse";
import DashboardHeader from "../../../../app/components/Admin/DashboardHeader";
import AdminSidebar from "../../../../app/components/Admin/sidebar/AdminSidebar";
import Heading from "../../../../app/utils/Heading";
import React from "react";

type Props = {};

const page = ({ params }: any) => {
  const id = params?.id;

  return (
    <div>
      <Heading
        title="LMS - Admin"
        description="ELearning is a platform for students to learn and get help from teachers"
        keywords="Programming, Nextjs, Nodejs, Redux"
      />
      <div className="flex">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHeader />
          {/* <CreateCourse /> */}
          <EditCourse id={id} />
        </div>
      </div>
    </div>
  );
};

export default page;
