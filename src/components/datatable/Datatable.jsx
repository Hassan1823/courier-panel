import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { backendLink } from "../../lib/data";
import { toast } from "react-toastify";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Datatable = ({ columns, userData, isLoading, refetch, setIsLoading }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  console.log(path);
  const [list, setList] = useState();
  // const { data, loading, error } = useFetch(`/${path}`);
  // console.log(data);
  useEffect(() => {
    setList(userData);
  }, [userData]);

  // const handleDelete = async (id) => {
  //   try {
  //     setIsLoading(true);
  //     const response = await fetch(`${backendLink}/api/auth/deleteUser/${id}`, {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     if (!response.ok) {
  //       toast.error("Something Went Wrong");
  //     } else {
  //       const res = await response.json();
  //       refetch();
  //       toast.success(res.message);
  //     }
  //     setIsLoading(false);
  //   } catch (err) {
  //     setIsLoading(false);
  //     console.log(err);
  //   }
  // };

  const handleUpdate = async (id) => {
    try {
      setIsLoading(true);
      // Find the row with the given ID
      const row = list.find((row) => row._id === id);
      if (row) {
        // Assuming the status is stored in a field named 'status'
        const status = row.status || "No Status Found";
        console.log(`Updating item with ID: ${id} and Status: ${status}`);

        const response = await fetch(
          `${backendLink}/api/shipping/updateStatus/${id}/${status}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          console.log("Something went wrong");
        } else {
          const data = await response.json();
          console.log(data);
          refetch();
        }
        // Perform any update operation here
        // toast.success(`Item with ID: ${id} updated successfully.`);
      } else {
        console.log(`Item with ID: ${id} not found.`);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  const handleStatusChange = (newStatus, id) => {
    // Find the row with the given ID
    const row = list.find((row) => row._id === id);
    if (row) {
      // Update the status of the row
      row.status = newStatus;
      // Update the list state to trigger re-rendering
      setList([...list]);
      // toast.success(`Status for item with ID: ${id} updated to ${newStatus}.`);
    } else {
      console.log(`Item with ID: ${id} not found.`);
    }
  };

  const actionColumn1 = [
    {
      field: "status",
      headerName: "Status",
      width: 250,
      renderCell: (params) => {
        // console.log("Status :::", params.value);
        return (
          <div className="cellAction">
            <button className="statusBtn">
              <select
                name=""
                id=""
                className="dropdown"
                onChange={(e) =>
                  handleStatusChange(e.target.value, params.row._id)
                }
              >
                <option value="" style={{ color: "black" }} selected>
                  {params.value}
                </option>
                <option value="Ready to send" style={{ color: "black" }}>
                  Ready to send
                </option>
                <option value="Prepare to send" style={{ color: "black" }}>
                  Prepare to send
                </option>
                <option value="Get into the system" style={{ color: "black" }}>
                  Get into the system
                </option>
                <option value="Delivery" style={{ color: "black" }}>
                  Delivery
                </option>
                <option
                  value="The customer receives the items"
                  style={{ color: "black" }}
                >
                  Customer receives the items
                </option>
                <option value="Return origin" style={{ color: "black" }}>
                  Return origin
                </option>
                <option value="Cancel" style={{ color: "black" }}>
                  Cancel
                </option>
              </select>
              <ArrowDropDownIcon className="icon" />
            </button>
          </div>
        );
      },
    },
  ];
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        // console.log(params);
        return (
          <div className="cellAction">
            {/* user id will pass here to new page  */}
            {/* <Link
              to={`/users/${params?.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link> */}
            <div
              className="deleteButton"
              onClick={() => handleUpdate(params.row._id)} // Updated to handleUpdate
            >
              Update
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <>
      {isLoading ? (
        <>Please Wait ...</>
      ) : (
        <div className="datatable">
          <div className="datatableTitle">{path}</div>
          {list ? (
            <DataGrid
              className="datagrid"
              rows={list}
              columns={columns.concat(actionColumn1, actionColumn)}
              pageSize={9}
              rowsPerPageOptions={[9]}
              checkboxSelection
              getRowId={(row) => row._id}
            />
          ) : (
            <div class="loader"></div>
          )}
        </div>
      )}
    </>
  );
};

export default Datatable;
