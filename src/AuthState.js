import React from "react";
import AuthContext from "./authContext";
import { useHistory } from "react-router-dom";

const AuthState = (props) => {
  const history = useHistory();

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;
    return true;
  };

  const login = (auth) => {
    if (auth.email === "" || auth.password === "") {
      alert("Enter email and password !");
    } else {
      const opts = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(auth),
      };

      fetch("/login_submit", opts)
        .then((resp) => {
          if (resp.status === 200) return resp.json();
          else alert("There has been some error");
        })
        .then((data) => {
          if (data.login === true) {
            localStorage.setItem("token", JSON.stringify(data.token));
            console.log(data.token);
            history.push("/");
          } else {
            alert(data.msg);
          }
        })
        .catch((error) => {
          console.error("An error has occured !", error);
        });
    }
  };

  const register = (user) => {
    if (
      user.email === "" ||
      user.password === "" ||
      user.firstName === "" ||
      user.lastName === "" ||
      user.phoneNumber === "" ||
      user.confirmPassword === ""
    ) {
      alert("Missing fields !");
    } else {
      if (user.password === user.confirmPassword) {
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        };

        fetch("/register_submit", opts)
          .then((resp) => {
            if (resp.status === 200) return resp.json();
            else alert("There has been some error");
          })
          .then((data) => {
            if (data.register === true) {
              alert("Successfully Registered !");
              history.push("/login");
            } else {
              alert(data.msg);
            }
          })
          .catch((error) => {
            console.error("An error has occured !", error);
          });
      } else {
        alert("Password Does not match !");
      }
    }
  };

  //Logout User
  const logout = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  const backHome = () => {
    history.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        checkAuth,
        register,
        backHome,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
