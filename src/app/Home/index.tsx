import { Button, CircularProgress, Toolbar, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { DataGridPro, DataGridProProps } from '@mui/x-data-grid-pro';
import { AppBar, } from "@src/common-components";
import * as styles from "./styles";
import useHome from "./hooks";

const columns: GridColDef[] = [
  { field: 'ip', headerName: 'IP Address', flex: 1, },
  {
    field: 'CVEs found',
    headerName: 'CVEs found',
    sortable: true,
    flex: 1,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.vulnerabilities.length || ''}`,
  },
];



const Home = () => {
  const { isLoading, data,   setPage,
    page,} = useHome();

  return (
    <div css={styles.container}>
      <AppBar position="absolute" open={false} >
        <Toolbar
          sx={{
            pr: "24px",
          }}
        >
          <Typography component="h1" variant="h6" color="inherit" noWrap>
            Veriti - Data App
          </Typography>
        </Toolbar>
      </AppBar>

      <div css={styles.card}>
        {isLoading ? (
          <CircularProgress color="inherit" />
        ) : (
          <div style={{ height: '75vh', width: '100%' }}>
            <DataGrid
              rows={data}
              columns={columns}
              // initialState={{
              //   pagination: {
              //     paginationModel: { page: 0, pageSize: 10 },
              //   },
              // }}
              // pageSizeOptions={[10]}
              // onRowsScrollEnd={() => {}}
              getRowId={(row) => row.ip}
              hideFooter={true}
              checkboxSelection={false}
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default Home;
