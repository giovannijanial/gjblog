import { Grid } from "@mui/material"

const Footer = () => {
  return (
    <Grid container
      sx={{
        height: "100px",
        backgroundColor: "#ccc",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10px"
      }}>
      <h4>Footer</h4>
      <p>Footer footer footer footer footer footer</p>
    </Grid>
  )
}

export default Footer