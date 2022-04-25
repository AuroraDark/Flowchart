import React, { useContext, useEffect, useState, useRef } from "react";
import "./style.scss";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import ReferenceItem from "../ReferenceItem";
import { a } from "../../data/a.js";
import { b } from "../../data/b.js";
import { c } from "../../data/c.js";
import { useDispatch, useSelector } from "react-redux";
import { countProcedure, countVisit } from "../../redux/CountRowColumn/actions";
import { scrollX, scrollY } from "../../redux/ScrollPosition/actions";

const ReferenceTable = () => {
  const scroll_pos = useRef();
  const dispatch = useDispatch();
  
  /////////     to dispatch scroll x and y redux
  const handleScroll = () => {    
    //console.log("33333333333333");
    dispatch(scrollX(scroll_pos.current.scrollLeft)); // x coordinate
    dispatch(scrollY(scroll_pos.current.scrollTop)); // y coordinate
  };
  
  //////////    getting scroll position of reference table
  useEffect(() => {
    //////////      to dispatch visit count and procedure count redux
    dispatch(countVisit(a.length));
    dispatch(countProcedure(b.length));
    
    scroll_pos.current.addEventListener("scroll", handleScroll);

    return () => {
      scroll_pos.current.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /////////////   getting redux variable of scroll position
  const storeValue = useSelector((store) => store);
  useEffect(() => {
    scroll_pos.current.scrollLeft = storeValue.ScrollPosReducer.scrollPos_x;
    scroll_pos.current.scrollTop = storeValue.ScrollPosReducer.scrollPos_y;
  }, [storeValue]);

  ///////////   cell
  let resultTable = "<tr>";
  let tmp = c[0].id_b;
  c.map((data) => {
    if (tmp === data.id_b) {
      resultTable += 
      "<td class='tooltip'>"+
        "<div class='reference-item'>"+
          "<i id='w"+data.id+"' class='default fa fa-exclamation-circle' onclick='clickWarning("+data.id+")'></i>"+
          "<i id='c"+data.id+"' class='default fa fa-check-circle' onclick='clickCheck("+data.id+")'></i>"+
        "</div>"+"<span class='tooltiptext'>"+"<p>"+data.id+","+data.id_a+","+data.id_b+","+data.display+"</p>"+"</span>"+
      "</td>";
    } else {
      resultTable += "</tr>"+
      "<td class='tooltip'>"+
        "<div class='reference-item'>"+
          "<i id='w"+data.id+"' class='default fa fa-exclamation-circle' onclick='clickWarning("+data.id+")'></i>"+
          "<i id='c"+data.id+"' class='default fa fa-check-circle' onclick='clickCheck("+data.id+")'></i>"+
        "</div>"+"<span class='tooltiptext'>"+"<p>"+data.id+","+data.id_a+","+data.id_b+","+data.display+"</p>"+"</span>"+
      "</td>";
      tmp = data.id_b;
    }
  });
  resultTable += "</tr>";  

  return (
    <TableContainer component={Paper}>
      <Box
        style={{ overflow: "scroll", height: "470px" }}
        sx={{
          p: 1,
          m: 1,
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
        ref={scroll_pos}
      >
        <div className="reference-title"></div>
        <table style={{ borderCollapse: "collapse" }}>
          <tbody dangerouslySetInnerHTML={{ __html: resultTable }}>
            
          </tbody>
        </table>
      </Box>
    </TableContainer>
  );
};
export default ReferenceTable;
