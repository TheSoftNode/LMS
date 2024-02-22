import React, { FC, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import {
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "../../../../redux/features/user/userApi";
import { styles } from "@/app/styles/style";
import toast from "react-hot-toast";

type Props = {
  isTeam: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme, setTheme } = useTheme();

  const [active, setActive] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");

  const { isLoading, data, error } = useGetAllUsersQuery({});
  const [updateUserRole, { error: updateError, isSuccess }] =
    useUpdateUserRoleMutation({});

  useEffect(() => {
    if (updateError) {
      if ("data" in updateError) {
        const errorMessage = updateError as any;
        toast.error(errorMessage.data.message);
      }
    }

    if (isSuccess) {
      toast.success("User role updated successfully");
      setActive(false);
    }
  }, [updateError, isSuccess]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.3,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
    {
      field: "courses",
      headerName: " Purchased Courses",
      flex: 0.5,
    },
    {
      field: "createdAt",
      headerName: " Joined At",
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
    {
      field: " ",
      headerName: "Email",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <a href={`mailto: ${params.row.email}`}>
              <AiOutlineMail
                className="dark: text-white text-black"
                size={20}
              />
            </a>
          </>
        );
      },
    },
  ];

  const rows: any = [];

  if (isTeam) {
    const newData =
      data && data.users.filter((item: any) => item.role === "admin");

    newData &&
      newData.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          createdAt: format(item.createdAt),
        });
      });
  } else {
    data &&
      data.users.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          createdAt: format(item.createdAt),
        });
      });
  }

  const handleSubmit = async () => {
    await updateUserRole({ email, role });
  };

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m-20px>
          {isTeam && (
            <div className="w-full flex justify-end">
              <div
                className={`${styles.button} !w-[200px] !rounded-[10px] !h-[35px] dark:bg-[#57c7a3] dark:border dark:border-[#ffffff6c]`}
                onClick={() => setActive(!active)}
              >
                Add New Member
              </div>
            </div>
          )}
          <Box
            m="40px 0 0 0"
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30!important"
                    : "1px solid #ccc!important",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                borderBottom: "none",
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
                borderTop: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
              },
              "& .MuiCheckbox-root": {
                color:
                  theme === "dark" ? `#b7ebde !important` : `#000 !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: "#fff !important",
              },
            }}
          >
            <DataGrid checkboxSelection rows={rows} columns={columns} />

            {active && (
              <Modal
                open={active}
                onClose={() => setActive(!active)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[45px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                  <h1 className={`${styles.title}`}>Add New Member</h1>
                  <div className="mt-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email..."
                      className={`${styles.input}`}
                    />
                    <select name="" id="" className={`${styles.input} !mt-6`}>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                    <br />
                    <div
                      className={`${styles.button} my-6 !h-[30px]`}
                      onClick={handleSubmit}
                    >
                      Submit
                    </div>
                  </div>
                </Box>
              </Modal>
            )}
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AllUsers;
