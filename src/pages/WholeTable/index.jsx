import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../../data/base_url";
import FirstRow from "../../components/FirstRow";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import ProcedureHeader from "../../components/ProcedureHeader";
import ProcRefRow from "../../components/ProcRefRow";

const WholeTable = () => {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [visit, setVisit] = useState([]);
  const [procedure, setProcedure] = useState([]);
  const [reference, setReference] = useState([]);
  const [procedureRender, setProcedureRender] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const size = 50;

  /**
   * Consulta a API e seta os states.
   */
  useEffect(() => {
    if (token === "") {
      axios
        .post(`${baseURL}/sessions`, {
          nome: "benjamin",
          password: "123456",
        })
        .then((response) => {
          getVisit(response.data.token);
        })
        .catch((error) => {
          setError(error);
        });
    }
  }, []);

  /**
   * Toda vez que a página atual é atualizada
   * mais procedures são carregadas.
   */
  useEffect(() => {
    if (procedure.length - procedureRender.length > size) {
      setProcedureRender(procedure.slice(0, procedureRender.length + size));
    } else {
      setProcedureRender(procedure);
    }
  }, [currentPage]);

  /**
   * Aguarda o carregamento completo da página para
   * que o elemento "SENTINELA" (no final da tabela)
   * possar ser observado
   * @returns Promise
   */
  function waitForElm() {
    return new Promise((resolve) => {
      if (document.querySelector("#sentinel")) {
        return resolve(true);
      }

      const observer = new MutationObserver((mutations) => {
        if (document.querySelector("#sentinel")) {
          resolve(true);
          observer.disconnect();
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    });
  }

  /**
   * A sentinela no final da tabela é observada.
   * Caso o usuário alcance o final da tabela o
   * IntersectionObserver atualiza a página atual
   * para +1.
   * Em outro useEffect, toda vez que a página atual
   * é atualizada ele carrega mais elementos da tabela.
   */
  useEffect(() => {
    waitForElm().then((elm) => {
      let options = {
        threshold: 1.0,
      };

      const intersectionObserver = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setCurrentPage((currentValue) => currentValue + 1);
        }
      }, options);

      intersectionObserver.observe(document.querySelector("#sentinel"));

      return () => intersectionObserver.disconnect();
    });
  }, []);

  /**
   * Consulta a API utilizando o TOKEN e seta as visitas
   * no state.
   * @param {*} token
   */
  const getVisit = (token) => {
    axios
      .get(`${baseURL}/visita?co_braco=90`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setVisit(res.data);
        getProcedure(token);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**
   * Consulta a API utilizando o TOKEN e seta os procedimentos
   * no state.
   * @param {*} token
   */
  const getProcedure = (token) => {
    axios
      .get(`${baseURL}/protocoloprocedimento/?co_protocolo=77`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProcedure(res.data);
        setProcedureRender(res.data.slice(0, size));
        getReference(token);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**
   * Consulta a API utilizando o TOKEN e seta as referências
   * no state.
   * @param {*} token
   */
  const getReference = (token) => {
    axios
      .get(`${baseURL}/visitaprocedimento/?co_braco=90`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setReference(summarizeReferences(res.data));
        setToken(token);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**
   * Associa cada referência a uma KEY que é a seguinte combinação:
   * COD_VISITA-COD_PROTOCOLO
   * @param {} references
   * @returns Objeto associando as keys com as referencias
   */
  const summarizeReferences = (references) => {
    let summarizedReferences = {};

    references.forEach(function (ref, i) {
      let key = ref.co_visita + "-" + ref.co_protocolo_procedimento;
      summarizedReferences[key] = ref;
    });
    return summarizedReferences;
  };

  /**
   * Enquanto os dados não são carregados
   * a página retorna um LOADER.
   */
  if (token !== "") {
    return (
      <Paper sx={{ width: "100%" }}>
        <Table
          stickyHeader
          aria-label="sticky table"
          style={{
            tableLayout: "fixed",
            padding: 0,
          }}
        >
          <TableContainer style={{ maxHeight: "calc(100vh - 16px)" }}>
            <TableHead
              sx={{
                bgcolor: "background.paper",
                borderRadius: 1,
              }}
            >
              <FirstRow visit={visit} />
              <TableRow>
                <TableCell
                  align="center"
                  colSpan={1}
                  style={{
                    position: "sticky",
                    left: 0,
                    top: "396.7px",
                    background: "white",
                    boxShadow: "3px 2px 7px #d2d2d2",
                    zIndex: 999,
                  }}
                >
                  <ProcedureHeader />
                </TableCell>
                <TableCell
                  colSpan={visit.length}
                  style={{
                    top: "396.7px",
                    background: "white",
                    boxShadow: "3px 2px 7px #d2d2d2",
                    zIndex: 998,
                  }}
                />
              </TableRow>
            </TableHead>
            <TableBody>
              {procedureRender.map((procedureItem, index) => {
                return (
                  <ProcRefRow
                    procedure={procedureItem}
                    visit={visit}
                    reference={reference}
                  />
                );
              })}
              {procedure.length !== procedureRender.length && (
                <TableRow>
                  <TableCell
                    style={{
                      position: "sticky",
                      left: 0,
                      background: "white",
                      zIndex: 999,
                    }}
                    colSpan={1}
                  >
                    <div style={{ marginBottom: "10px" }} id={"sentinel"}>
                      Carregando...
                    </div>
                    <CircularProgress />
                  </TableCell>
                  <TableCell colSpan={visit.length}></TableCell>
                </TableRow>
              )}
            </TableBody>
          </TableContainer>
        </Table>
      </Paper>
    );
  } else {
    if (error !== "") {
      return <h3>network connection error</h3>;
    } else {
      return (
        <Box
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            height: "50%",
          }}
        >
          <div style={{ marginBottom: "10px", marginTop: "20px" }}>
            Carregando...
          </div>
          <CircularProgress />
        </Box>
      );
    }
  }
};

export default WholeTable;
