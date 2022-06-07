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
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DuplicateVisit from "../DuplicateVisit";
import { red } from "@mui/material/colors";
import style from "./style.module.scss";

const VisitItem = (props) => {
  const [duplicateOpen, setDuplicateOpen] = useState(false);
  const [data, setData] = useState(props.visit);

  const handleClickOpen_Duplicate = () => {
    setDuplicateOpen(true);
  };

  const handleClose_Duplicate = () => {
    setDuplicateOpen(false);
  };

  useEffect(() => {
    setData(props.visit);
  }, [props.visit]);

  return (
    <Table
      sx={{ width: "177px" }}
      style={{ borderCollapse: "collapse" }}
      key={data.id}
    >
      <TableHead>
        <TableRow>
          <TableCell>
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
            {data.intervalo_referencia == 1 ? "Inclusao" : "Fim do tratamento"}
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
      <DuplicateVisit
        handleClose_Duplicate={handleClose_Duplicate}
        duplicateOpen={duplicateOpen}
      />
    </Table>
  );
};
export default VisitItem;
