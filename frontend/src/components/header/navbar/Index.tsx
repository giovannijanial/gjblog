import styles from "./Navbar.module.css"
import { Box } from "@mui/material"
import { NavLink } from "react-router-dom"


const Navbar = () => {
  return (
    <Box className={styles.navbar}>
      <NavLink to="/" >
        Home
      </NavLink>
      <NavLink to="/login">
        Login
      </NavLink>
      <NavLink to="/about">
        About
      </NavLink>
    </Box>
  )
}

export default Navbar