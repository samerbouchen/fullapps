import React, {useEffect, useState} from "react";
import { Box, useTheme } from "@mui/material";
import {  useGetUsersQuery, useDeleteUserMutation } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import "./index.css";
import { useDispatch } from "react-redux";
import {deleteUser, getUsers} from "../../Api/api";
const Chiefs = () => {
  const theme = useTheme();
  const [users, setUsers] = useState([]);

  useEffect(() => {
      (async ()=> {
         await getUsers().then(res => {{
             setUsers(res.data)
         }})
      })()
  }, []);

  const handleDelete = async (id) => {
      await deleteUser(id).then(res => {
        setUsers(users.filter(v=> v.id !== id))
      })
  }

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "fullName",
      headerName: "Full Nale",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
    },
    {
      field: "action",
      headerName: "actions",
      flex: 0.5,
      renderCell: ({ row }) => (
        <>
          <ToggleOffIcon className="iconsDash" />
          <DeleteIcon
            className="iconsDash"
            onClick={() => handleDelete(row.id)}
          />
        </>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="chargée d'affaire " subtitle="Liste des chargées d'affaire " />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={false}
          getRowId={(row) => row.id}
          rows={users??[]}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Chiefs;
