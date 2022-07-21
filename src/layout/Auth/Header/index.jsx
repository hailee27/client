/* eslint-disable jsx-a11y/alt-text */
import images from "@/assets/images";
import styles from "@/styles/layout/header.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

export default function Header() {
  const user = useSelector((state) => state.user?.userCurrent);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    window.location.reload("/home");
    setAnchorEl(null);
  };
  return (
    <header className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.left}>
          <Link to="/">
            <div className={styles.logo}>
              <img src={images.logo} alt="" />
              <span className={styles.title}>Pink pig group</span>
            </div>
          </Link>
        </div>
        <div className={styles.center}></div>
        <div className={styles.right}>
          {user && (
            <>
              <div className={styles.setting}>
                <Link to={`/${user?.username}`} target="_blank">
                  {user?.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      className={styles.avatar}
                      alt=""
                    />
                  ) : (
                    <img src={images.user} className={styles.avatar} alt="" />
                  )}

                  <span className={styles.name}>{user.username}</span>
                </Link>
              </div>
              <i className="fa-solid fa-caret-down" onClick={handleClick}></i>
            </>
          )}
        </div>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Link to={`/${user?.username}`}>
          <MenuItem sx={{ width: 170, fontSize: "20px" }} onClick={handleClose}>
            <i className="fa-solid fa-user"></i>
            Profile
          </MenuItem>
        </Link>
        <Link to={"/admin/card"}>
          <MenuItem sx={{ width: 170, fontSize: "20px" }} onClick={handleClose}>
            <i className="fa-solid fa-address-card"></i>
            My card
          </MenuItem>
        </Link>
        <MenuItem sx={{ width: 170, fontSize: "20px" }} onClick={handleLogout}>
          <i className="fa-solid fa-right-from-bracket"></i>
          Logout
        </MenuItem>
      </Menu>
    </header>
  );
}
