const { Stack, SvgIcon, Typography } = require("@mui/material")
const { GoAlertFill } = require("react-icons/go")
import { VscCircleSlash } from "react-icons/vsc";
import { BsCheckCircle } from "react-icons/bs";


export const PopupAlerta = (props) => {

  const { title, type } = props

  const colorMap = {
    warning: "warning.main",
    success: "#3f9960",
    error: "error.main",
    warningDark: "#B54708",
    successDark: "#022b11",
    errorDark: "#9c0000"
  };

  const bkColor = colorMap[type] || "error.main";

  return (
    <Stack
      direction={"row"}
      spacing={2}
      sx={{
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: bkColor,
        borderRadius: "10px"
      }}
    >
      <SvgIcon>
        {type == "warning" ? <GoAlertFill color={colorMap[`${type}Dark`]} size={25} /> : <></>}
        {type == "error" ? <VscCircleSlash color={colorMap[`${type}Dark`]} size={25} /> : <></>}
        {type == "success" ? <BsCheckCircle color={colorMap[`${type}Dark`]}size={24} /> : <></>}
      </SvgIcon>
      <Typography
        sx={{
          color: "#fff",
          fontWeight: "bold"
        }}
      >
        {title}
      </Typography>
    </Stack>
  )
}