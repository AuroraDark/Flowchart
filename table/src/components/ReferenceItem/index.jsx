import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import style from "./style.module.scss";
import Tooltip from "@mui/material/Tooltip";
// import { c } from "../../data/c.js";

const ReferenceItem = (props) => {
    // let m = JSON.parse(c.readFileSync('c.js').toString());

  const [warning, setWarning] = useState(true);
  const [check, setCheck] = useState(true);

  const handleClickWarning = () => {
    setWarning(!warning);
  };
  const handleClickCheck = () => {
    setCheck(!check);
  };

  

  const longText = (
    <div>
      <div>id: {props.id}</div>
      <div>id_a: {props.idA}</div>
      <div>id_b:{props.idB}</div>
      <div>display: {props.display}</div>
    </div>
  );

  {
    if (props.display == 0)
      return (
        <Tooltip title={longText}>
          <Stack direction="row" spacing={1} style={{width: "inherit"}}>
            <IconButton
              aria-label="warning amber"
              color={warning ? "default" : "warning"}
              onClick={handleClickWarning}
            >
              <WarningAmberIcon fontSize="small" />
            </IconButton>
            <IconButton
              aria-label="check"
              color={check ? "default" : "success"}
              onClick={handleClickCheck}
            >
              <CheckCircleOutlineIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Tooltip>
      );
    else if (props.display == 1)
      return (
        <Tooltip title={longText}>
          <Stack direction="row" spacing={1} style={{width: "inherit"}}>
            <IconButton
              aria-label="warning amber"
              color={warning ? "default" : "warning"}
              onClick={handleClickWarning}
            >
              <WarningAmberIcon fontSize="small" />
            </IconButton>
            <IconButton
              aria-label="check"
              color={check ? "success" : "default"}
              onClick={handleClickCheck}
            >
              <CheckCircleOutlineIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Tooltip>
      );
    else
      return (
        <Tooltip title={longText}>
          <Stack direction="row" spacing={1} style={{width: "inherit"}}>
            <IconButton
              aria-label="warning amber"
              color={warning ? "warning" : "default"}
              onClick={handleClickWarning}
            >
              <WarningAmberIcon fontSize="small" />
            </IconButton>
            <IconButton
              aria-label="check"
              color={check ? "default" : "success"}
              onClick={handleClickCheck}
            >
              <CheckCircleOutlineIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Tooltip>
      );
  }
};
export default ReferenceItem;
