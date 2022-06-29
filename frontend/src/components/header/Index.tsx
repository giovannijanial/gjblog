import { Box, Grid } from "@mui/material"
import style from "./Header.module.css"
import Navbar from "./navbar/Index"

const Header = () => {
  return (
    <Grid container
      sx={{
        padding: "0 20px 0 20px",
        alignItems: "center",
        backgroundColor: "#2e2e2e",
        borderBottom: "3px solid #ccc",
        color: "#ccc"
      }}
      minHeight="80px">
      <Grid item xs={12} sm={6}>
        <Box>Logo</Box>
      </Grid>
      <Grid item xs={12} sm={6}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}>
        <Navbar />
      </Grid>
    </Grid>
  )
}

export default Header