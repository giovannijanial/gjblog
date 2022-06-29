import { Grid } from "@mui/material"
import style from "./Footer.module.css"

const Footer = () => {
  return (
    <Grid container
      sx={{
        height: "150px",
        backgroundColor: "#ccc",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}>
      <h1>Footer</h1>
      <h4>Footer footer footer footer footer footer</h4>
    </Grid>
  )
}

export default Footer