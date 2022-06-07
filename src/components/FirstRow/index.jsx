import React, { useEffect, useContext, useRef, useState } from "react";
import axios from "axios";
import { baseURL } from "../../data/base_url";
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
import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DuplicateVisit from "../DuplicateVisit";
import { red } from "@mui/material/colors";
import Box from "@mui/material/Box";
import style from "./style.module.scss";
import { countVisit } from "../../redux/CountRowColumn/actions";
import { useDispatch, useSelector } from "react-redux";
import { scrollX, scrollY } from "../../redux/ScrollPosition/actions";
import IndexTable from "../../components/IndexTable";
import ProcedureHeader from "../../components/ProcedureHeader";

function createData(details, alpha, visit) {
  return { details, alpha, visit };
}

const FirstRow = (props) => {
  /**
   *  Gera a primeira parte da tabela, com a Index Table e Visit Table
   */
  const [duplicateOpen, setDuplicateOpen] = useState(false);
  const [visit, setVisit] = useState(props.visit);
  const x = useRef(); // this means X coordinate of screen
  const dispatch = useDispatch();
  ///////////// to get redux variable
  const storeValue = useSelector((store) => store);
  // useEffect(()=>{
  //     console.log(storeValue.CountReducer)
  // }, [])
  ////////////// to get redux variable

  const rows = [
    createData("Nome Protocolo", "Alphacross", "Nome"),
    createData("Nome do Braço", "Controle/Experience", "Intervalo"),
    createData("Qtde. Visitas", storeValue.CountReducer.count_visit, "Unidade"),
    createData(
      "Qtde. Procedimentos",
      storeValue.CountReducer.count_procedure,
      "Referencia(apos)"
    ),
    createData("", null, "Visita Referencia"),
    createData("", null, "Janela -"),
    createData("", null, "Janela +"),
    createData("", null, "Valor Total"),
  ];

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen_Duplicate = () => {
    setDuplicateOpen(true);
  };

  const handleClose_Duplicate = () => {
    setDuplicateOpen(false);
  };

  const handleScroll = () => {
    dispatch(scrollX(x.current.scrollLeft));
  };

  // useEffect(() => {
  //   // x.current.addEventListener("scroll", handleScroll);
  //   // return () => {
  //   //   x.current.removeEventListener("scroll", handleScroll);
  //   // };
  // }, []);

  useEffect(() => {
    setVisit(props.visit);
  }, [props.token, props.visit]);

  // useEffect(() => {
  //   x.current.scrollLeft = storeValue.ScrollPosReducer.scrollPos_x;
  // }, [storeValue]);

  useEffect(() => {
    dispatch(countVisit(visit.length));
  }, [visit.length]);

  return (
    <TableRow>
      <TableCell
        style={{
          position: "sticky",
          left: 0,
          background: "white",
          boxShadow: "3px 2px 7px #d2d2d2",
          zIndex: 999,
        }}
      >
        <Table sx={{ width: "600px" }}>
          <TableHead
            style={{
              background: "white",
            }}
          >
            <TableRow key={"indexTable"} sx={{ height: "89px" }}>
              <TableCell>
                <Button
                  variant="contained"
                  style={{ textTransform: "none" }}
                  endIcon={<RemoveCircleOutlinedIcon />}
                >
                  Menos Detalhes
                </Button>
              </TableCell>
              <TableCell></TableCell>
              <TableCell direction="asc" iconcomponent="ArrowDownwardIcon">
                <Button
                  color="warning"
                  variant="contained"
                  style={{ textTransform: "none" }}
                  endIcon={<AddCircleOutlinedIcon />}
                  onClick={handleClickOpen}
                >
                  Visita
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index} sx={{ height: "37px" }}>
                <TableCell>{row.details}</TableCell>
                <TableCell>{row.alpha}</TableCell>
                <TableCell>{row.visit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableCell>
      {visit.map((data, index) => {
        return (
          <TableCell
            style={{
              overflow: "hidden",
            }}
          >
            <Table sx={{ width: "177px" }} key={index}>
              <TableHead sx={{ height: "89px" }}>
                <TableRow>
                  <TableCell direction="row">
                    <Stack direction="row" spacing={1}>
                      <IconButton aria-label="edit" color="primary">
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        aria-label="content copy"
                        color="warning"
                        onClick={handleClickOpen_Duplicate}
                      >
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
                <TableRow sx={{ height: "37px" }}>
                  <TableCell>{data.nome_visita}</TableCell>
                </TableRow>
                <TableRow sx={{ height: "37px" }}>
                  <TableCell>{data.intervalo}</TableCell>
                </TableRow>
                <TableRow sx={{ height: "37px" }}>
                  <TableCell>
                    {data.intervalo_unidade == 1 ? "Semana(s)" : "Dia(s)"}
                  </TableCell>
                </TableRow>
                <TableRow sx={{ height: "37px" }}>
                  <TableCell>
                    {data.intervalo_referencia == 1
                      ? "Inclusao"
                      : "Fim do tratamento"}
                  </TableCell>
                </TableRow>
                <TableRow sx={{ height: "37px" }}>
                  <TableCell>{data.intervalo_referencia_visita}</TableCell>
                </TableRow>
                <TableRow sx={{ height: "37px" }}>
                  <TableCell>{data.janela_dias_menos}</TableCell>
                </TableRow>
                <TableRow sx={{ height: "37px" }}>
                  <TableCell>{data.janela_dias_mais}</TableCell>
                </TableRow>
                <TableRow sx={{ height: "37px" }}>
                  <TableCell>{data.valor}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableCell>
        );
      })}
      <DuplicateVisit
        handleClose_Duplicate={handleClose_Duplicate}
        duplicateOpen={duplicateOpen}
      />
    </TableRow>
  );
};
export default FirstRow;
