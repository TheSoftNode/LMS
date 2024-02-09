"use client";

import React, { FC, Suspense, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Hero";

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <Heading
          title="ELearning"
          description="ELearning is a platform for students to learn and get help from teachers"
          keywords="Programming, Nextjs, Nodejs, Redux"
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
        <Hero />
      </div>
    </Suspense>
  );
};

export default Page;
