import React, { useContext } from 'react';
import IndexTable from '../../components/IndexTable';
import VisitTable from '../../components/VisitTable';
import ProcedureTable from '../../components/ProcedureTable';
import ReferenceTable from '../../components/ReferenceTable';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ContextInfo from '../../components/ContextInfo';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

const WholeTable = () => {


    return (

        <Box sx={{ width: '100%' }}>
            <Grid container spacing={1}>
                <Grid item xl={4} lg={5} md={12} xs={12}>
                    <IndexTable />
                </Grid>
                <Grid item xl={8} lg={7} md={12} xs={12}>
                    {/* <TableContainer component={Paper}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                p: 1,
                                m: 1,
                                bgcolor: 'background.paper',
                                borderRadius: 1,
                            }}
                        > */}
                            <VisitTable />
                        {/* </Box>
                    </TableContainer> */}
                </Grid>
                <Grid item xl={4} lg={5} md={12} xs={12}>
                    <ProcedureTable />
                </Grid>
                <Grid item xl={8} lg={7} md={12} xs={12}>
                    <ReferenceTable />
                </Grid>
            </Grid>
        </Box>

    )
}

export default WholeTable;