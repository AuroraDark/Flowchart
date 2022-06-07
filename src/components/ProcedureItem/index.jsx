import { useRef, useState, useEffect, useContext } from "react";
import axios from "axios";
import { baseURL } from "../../data/base_url";
import style from "./style.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import AddProcedure from "../AddProcedure";
import EditProcedure from "../EditProcedure";
import { red } from "@mui/material/colors";
import { countProcedure } from "../../redux/CountRowColumn/actions";
import { useDispatch, useSelector } from "react-redux";
import { scrollX, scrollY } from "../../redux/ScrollPosition/actions";

const ProcedureItem = (props) => {
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [procedure, setProcedure] = useState(props.procedure);
  // let [procedureId, setProcedureId] = useState([]);

  const handleClickOpen_AddDialog = () => {
    setAddOpen(true);
  };

  const handleClickOpen_EditDialog = () => {
    setEditOpen(true);
  };

  const handleClose_AddDialog = () => {
    setAddOpen(false);
  };

  const handleClose_EditDialog = () => {
    setEditOpen(false);
  };

  const y = useRef(); // this means Y coordinate of screen
  const dispatch = useDispatch();
  const handleScroll = () => {
    dispatch(scrollY(y.current.scrollTop));
  };

  useEffect(() => {
    // y.current.addEventListener("scroll", handleScroll);
    // return () => {
    //   y.current.removeEventListener("scroll", handleScroll);
    // };
  }, []);

  /////////////   getting redux variable of scroll y position
  const storeValue = useSelector((store) => store);

  useEffect(() => {
    setProcedure(props.procedure);
  }, [props.procedure]);

  // useEffect(() => {
  //   // console.log(storeValue.ScrollPosReducer.scrollPos_x, storeValue.ScrollPosReducer.scrollPos_y);
  //   y.current.scrollTop = storeValue.ScrollPosReducer.scrollPos_y;
  // }, [storeValue]);

  useEffect(() => {
    dispatch(countProcedure(procedure.length));
  }, [procedure.length]);

  return (
    <Table>
      <TableRow className="height-procedure" key={procedure.id}>
        <TableCell style={{ width: "245px" }}>
          {procedure.nome_procedimento_estudo}
        </TableCell>
        <TableCell style={{ width: "145px" }}></TableCell>
        <TableCell style={{ width: "75px" }}>{procedure.valor}</TableCell>
        <TableCell style={{ width: "80px" }}>
          <Stack direction="row" spacing={0}>
            <IconButton
              aria-label="edit"
              color="primary"
              onClick={handleClickOpen_EditDialog}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="delete forever" style={{ color: red[500] }}>
              <DeleteForeverIcon />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>
      <AddProcedure
        handleClose_AddDialog={handleClose_AddDialog}
        addOpen={addOpen}
      />
      <EditProcedure
        handleClose_EditDialog={handleClose_EditDialog}
        editOpen={editOpen}
      />
    </Table>
  );
};

export default ProcedureItem;
