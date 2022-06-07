import React, { useEffect, useState } from "react";
import "./style.scss";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import ReferenceItem from "../ReferenceItem";
import ProcedureItem from "../../components/ProcedureItem";

const ProcRefRow = (props) => {
  /**
   * Linha da tabela contendo o procedimento e as referências cruzadas com as visitas
   */
  const [reference, setReference] = useState(props.reference);
  const [procedure, setProcedure] = useState(props.procedure);
  const [visit, setVisit] = useState(props.visit);

  useEffect(() => {
    setReference(props.reference);
    setProcedure(props.procedure);
    setVisit(props.visit);
  }, [props.reference, props.procedure, props.visit]);

  return (
    <TableRow key={"proc-row-" + props.procedure.id}>
      <TableCell
        style={{
          position: "sticky",
          left: 0,
          background: "white",
          boxShadow: "3px 2px 7px #d2d2d2",
          zIndex: 997,
        }}
      >
        <ProcedureItem procedure={procedure} />
      </TableCell>
      {visit.map((visitItem, index) => {
        let key = visitItem.id + "-" + procedure.id;
        let referenceItem = reference[key];
        return (
          <TableCell key={referenceItem.id}>
            <ReferenceItem
              key={referenceItem.id}
              id={referenceItem.id}
              idA={referenceItem.co_visita}
              idB={referenceItem.co_protocolo_procedimento}
              display={referenceItem.disponibilidade}
              visit={visitItem.nome_visita}
              procedure={procedure.nome_procedimento_estudo}
              token={props.token}
            />
          </TableCell>
        );
      })}
    </TableRow>
  );
};
export default ProcRefRow;
