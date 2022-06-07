import { useState } from "react";
import style from "./style.scss";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import Box from "@mui/material/Box";
import AddProcedure from "../AddProcedure";
import EditProcedure from "../EditProcedure";

const ProcedureHeader = () => {
  /**
   *  Colunas índice dos procedimentos
   */
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const handleClickOpen_AddDialog = () => {
    setAddOpen(true);
  };

  const handleClose_AddDialog = () => {
    setAddOpen(false);
  };

  const handleClose_EditDialog = () => {
    setEditOpen(false);
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell style={{ width: "245px" }}>
            <Button
              color="warning"
              variant="contained"
              style={{ textTransform: "none" }}
              endIcon={<AddCircleOutlinedIcon />}
              onClick={handleClickOpen_AddDialog}
            >
              Procedimento
            </Button>
          </TableCell>
          <TableCell style={{ width: "145px" }}>Categoria</TableCell>
          <TableCell style={{ width: "75px" }}>Valor Estudo</TableCell>
          <TableCell style={{ width: "80px" }}>Açoes</TableCell>
        </TableRow>
      </TableHead>
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

export default ProcedureHeader;
