import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import style from "./style.module.scss";
import Tooltip from "@mui/material/Tooltip";
// import { c } from "../../data/c.js";
import * as fs from "fs";

import axios from 'axios';
const c_jsonData = require('../../data/c.json');

const ReferenceItem = (props) => {
  const [display, setDisplay] = useState(props.display);
  const [id] = useState(props.id);

  const handleClickDisplay = async(state_val) => {
    if (state_val == display) setDisplay(0);
    else setDisplay(state_val);
    let s_display = 0;
    let c_loadData = JSON.parse(JSON.stringify(c_jsonData));
    c_loadData.map((data) => {
      if(data.id == id){
        // console.log("data id:",id);
        // console.log("data state_val:",state_val);
        // console.log("data display:",display);
        if(state_val == display) {
          data.display = 0;
          s_display = 0;
        }else{
          data.display = state_val;
          s_display = state_val;
        }
      }
    });

    // const sendData = JSON.stringify(c);
    const sendData = {id:id,display:s_display};
    const response = await axios.post('http://localhost:3001/upload', sendData);
    // console.log("response:",response.data);
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
    return (
      <td className="reference-item">
        {/* <Tooltip title={longText}> */}
        <Stack direction="row" spacing={1} style={{ width: "inherit" }}>
          <IconButton
            aria-label="warning amber"
            color={display == 2 ? "warning" : "default"}
            onClick={() => handleClickDisplay(2)}
          >
            <WarningAmberIcon fontSize="small" />
          </IconButton>
          <IconButton
            aria-label="check"
            color={display == 1 ? "success" : "default"}
            onClick={() => handleClickDisplay(1)}
          >
            <CheckCircleOutlineIcon fontSize="small" />
          </IconButton>
        </Stack>
        {/* </Tooltip> */}
      </td>
    );
  }
};
export default ReferenceItem;
