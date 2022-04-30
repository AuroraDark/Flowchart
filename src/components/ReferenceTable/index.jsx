import React, { useContext, useEffect, useState, useRef } from "react";
import "./style.scss";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import ReferenceItem from "../ReferenceItem";
import { a } from "../../data/a.js";
import { b } from "../../data/b.js";
// import { c } from "../../data/c.js";
import { useDispatch, useSelector } from "react-redux";
import { countProcedure, countVisit } from "../../redux/CountRowColumn/actions";
import { scrollX, scrollY } from "../../redux/ScrollPosition/actions";
import CustomizeTR from "../CustomizeTR/CustomizeTR";
const c_jsonData = require('../../data/c.json');
const ReferenceTable = () => {
  const scroll_pos = useRef();
  const dispatch = useDispatch();
  let c_loadData = JSON.parse(JSON.stringify(c_jsonData));

  /////////     to dispatch scroll x and y redux
  const handleScroll = () => {
    //console.log("33333333333333");
    dispatch(scrollX(scroll_pos.current.scrollLeft)); // x coordinate
    dispatch(scrollY(scroll_pos.current.scrollTop)); // y coordinate
  };

  //////////    getting scroll position of reference table
  useEffect(() => {
    //////////      to dispatch visit count and procedure count redux
    // dispatch(countVisit(a.length));
    // dispatch(countProcedure(b.length));

    // scroll_pos.current.addEventListener("scroll", handleScroll);

    // return () => {
    //   scroll_pos.current.removeEventListener("scroll", handleScroll);
    // };
  }, []);

  /////////////   getting redux variable of scroll position
  const storeValue = useSelector((store) => store);
  useEffect(() => {
    scroll_pos.current.scrollLeft = storeValue.ScrollPosReducer.scrollPos_x;
    scroll_pos.current.scrollTop = storeValue.ScrollPosReducer.scrollPos_y;
  }, [storeValue]);

  ///////////   cell
  let tmp = c_loadData[0].id_b;
  let resultTr = [],
    tmpTr = [];

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
        <table className="reference-table">
          <tbody>
            {c_loadData.map((data) => {
              if (tmp == data.id_b) {
                tmpTr.push(<ReferenceItem key={data.id} id={data.id} idA={data.id_a} idB={data.id_b} display={data.display} />);
              } else {
                // console.log(data.id_b, "tmpTr=>", tmpTr);
                tmp = data.id_b;
                resultTr = [...tmpTr];
                tmpTr = [];
                return <CustomizeTR key={data.id_b} children={resultTr} />;
              }
            })}
           
          </tbody>
        </table>
      </Box>
    </TableContainer>
  );
};
export default ReferenceTable;
