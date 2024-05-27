import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Datatable from "../../components/datatable/Datatable";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { backendLink } from "../../lib/data";
import "./list.scss";

const ShippingList = ({ columns }) => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  const getAllUsers = async () => {
    try {
      setIsLoading(true);
      // const user = JSON.parse(localStorage.getItem("user"));
      const response = await fetch(
        `${backendLink}/api/shipping/view-adminShippings`
      );
      if (!response.ok) {
        toast.error("Something Went Wrong");
      } else {
        const shippings = await response.json();
        console.log(shippings);
        setUserData(shippings?.data || []);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    if (!userData || userData.length === 0) {
      getAllUsers();
    }
  }, [userData]);

  useEffect(() => {
    const searchShipping = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${backendLink}/api/shipping/adminSearchShippings`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: searchValue,
            }),
          }
        );
        if (!response.ok) {
          toast.error("Something went wrong");
          getAllUsers();
        } else {
          const res = await response.json();
          console.log(res.shippings);
          setUserData(res.shippings || []);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    if (searchValue && searchValue !== "") {
      searchShipping();
    } else {
      getAllUsers();
    }
  }, [searchValue]);

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar setSearchValue={setSearchValue} />

        <Datatable
          columns={columns}
          userData={userData}
          isLoading={isLoading}
          refetch={getAllUsers}
          setIsLoading={setIsLoading}
        />
      </div>
    </div>
  );
};

export default ShippingList;
