import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { backendLink } from "../../lib/data";
import { toast } from "react-toastify";

const VerifyAdmin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [adminId, setAdminId] = useState("");
  let { verifyAdmin } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setAdminId(verifyAdmin || "");
    //     if (adminId || adminId !== "") {
    //       setIsLoading(false);
    //     }
  }, [verifyAdmin]);

  console.log(adminId ? adminId : "no adminId");

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${backendLink}/api/auth/getUser/${adminId}`
        );
        if (!response.ok) {
          toast.error("Something Went Wrong");
        } else {
          const user = await response.json();
          console.log("user :::", user);
          //     toast.success("Success");
          localStorage.setItem("user", JSON.stringify(user.data));
          navigate("/");
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    if (adminId && adminId !== "") {
      checkAdmin();
    }
  }, [adminId]);
  return (
    <div>
      {isLoading ? (
        <>Please Wait ...</>
      ) : (
        <div>
          <h1>{adminId ? adminId : "no verifyAdmin"}</h1>
        </div>
      )}
    </div>
  );
};

export default VerifyAdmin;
