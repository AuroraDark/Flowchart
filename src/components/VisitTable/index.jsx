import React, {useEffect, useContext, useRef, useState} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DuplicateVisit from "../DuplicateVisit";
import { red } from "@mui/material/colors";
import Box from "@mui/material/Box";
import { a } from "../../data/a.js";
import style from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {scrollX, scrollY} from "../../redux/ScrollPosition/actions";

const VisitTable = () => {
  const [duplicateOpen, setDuplicateOpen] = useState(false);

  const handleClickOpen_Duplicate = () => {
    setDuplicateOpen(true);
  };

  const handleClose_Duplicate = () => {
    setDuplicateOpen(false);
  };


  const x = useRef();      // this means X coordinate of screen
  const dispatch = useDispatch();
  const handleScroll = () => {      
    dispatch(scrollX(x.current.scrollLeft))
  };

  useEffect(() => {
    // x.current.addEventListener("scroll", handleScroll);
    
    // return () => {
    //   x.current.removeEventListener("scroll", handleScroll);
    // };
  }, []);

  /////////////   getting redux variable of scroll x position
  const storeValue = useSelector((store) => store);
  useEffect(() => {    
    x.current.scrollLeft = storeValue.ScrollPosReducer.scrollPos_x    
  }, [storeValue]);

  function createData(value) {
    return { value };
  }

  const rows = [
    createData(null),
    createData(null),
    createData(null),
    createData(null),
    createData(null),
    createData(null),
  ];

  return (
    <>
    <TableContainer component={Paper}>
      <Box
      style={{ overflowX: "scroll", scrollbarWidth: "thin" }}
        sx={{
          display: "flex",
          flexDirection: "row",
          p: 1,
          m: 1,
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
        ref={x}
      >
        {a.map((data, index) => {
          return (
            <Table
              className={style.tableMargin}
              sx={{ width: "177px", padding: "14px" }}
              style={{ borderCollapse: "collapse" }}
              key={index}
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton aria-label="edit" color="primary">
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton aria-label="content copy" color="warning" onClick={handleClickOpen_Duplicate}>
                        <ContentCopyIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        aria-label="delete forever"
                        style={{ color: red[500] }}
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow hover={true}>
                  <TableCell>{data.name}</TableCell>
                </TableRow>
                <TableRow hover={true}>
                  <TableCell>{data.id}</TableCell>
                </TableRow>
                {rows.map((row, index) => (
                  <TableRow key={index} hover={true}>
                    <TableCell>
                      {row.value === null ? (
                        <div style={{ height: "26px" }}></div>
                      ) : (
                        row.value
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          );
        })}        
      </Box>
    </TableContainer>
    <DuplicateVisit handleClose_Duplicate={handleClose_Duplicate} duplicateOpen={duplicateOpen} />
    </>
  );
};
export default VisitTable;
