import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { useTheme } from "next-themes";

type Props = {};

const AllCourses = (props: Props) => {
  const { theme, setTheme } = useTheme();

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
    },
    {
      field: "title",
      headerName: "Course Title",
      flex: 1,
    },
    {
      field: "ratings",
      headerName: "Ratings",
      flex: 0.5,
    },
    {
      field: "purchased",
      headerName: "Purchased",
      flex: 0.5,
    },
    {
      field: "created_At",
      headerName: "Created At",
      flex: 0.5,
    },
    {
      field: " ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button>
              <AiOutlineDelete
                className="dark: text-white text-black"
                size={20}
              />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [
    {
      id: "1234",
      title: "React",
      purchased: "30",
      ratings: "5",
      created_at: "12/12/12",
    },
  ];
  return (
    <div className="mt-[120px]">
      <Box m-20px></Box>
    </div>
  );
};

export default AllCourses;
