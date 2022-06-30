import styles from "./Navbar.module.css"
import { Box, Button } from "@mui/material"
import { NavLink } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../../contexts/authContext"
import { useAuthentication } from "../../../hooks/useAuthentication"


const Navbar = () => {

  const { user } = useContext(AuthContext);
  const { logout } = useAuthentication();

  return (
    <Box className={styles.navbar}>
      <NavLink to="/" >
        Home
      </NavLink>
      {!user && (
        <NavLink to="/login">
          Login
        </NavLink>
      )}
      {user && (
        <>
          <NavLink to="/post/create">
            New Post
          </NavLink>
          <NavLink to="/dashboard">
            Dashboard
          </NavLink>
        </>
      )}
      <NavLink to="/about">
        About
      </NavLink>

      {user && (
        <Button
          onClick={logout}
          sx={{
            color: "#ccc",
            padding: "25px",
            textTransform: "none",
            fontFamily: "inherit",
            fontSize: "inherit",
            ":hover": "background-color: #525252;"
          }}>
          Sair
        </Button>
      )}
    </Box>
  )
}

export default Navbar


