import { Toolbar, Typography, Button } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams, GridRenderCellParams } from '@mui/x-data-grid';
import { AppBar, } from "@src/common-components";
import * as styles from "./styles";
import useHome from "./hooks";

const Home = () => {
  const { isLoading, paginationModel, setPaginationModel, data, item, setItem } = useHome();

  const DEFAULT_COLUMNS: GridColDef[] = [
    { field: "ip", headerName: "IP Address", flex: 1 },
    {
      field: "CVEs found",
      headerName: "CVEs found",
      sortable: true,
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        params.row?.vulnerabilities?.length,
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => setItem(params.row)}
        >
          View
        </Button>
      ),
    },
  ];

  const ITEM_COLUMNS: GridColDef[] = [
    { field: "number", headerName: "#", flex: 1, renderCell: (index)=>index.api.getRowIndexRelativeToVisibleRows(index.row) + 1  },
    {
      field: "CVEs found",
      headerName: "Industry Reference",
      sortable: true,
      flex: 1,
      valueGetter: (params: GridValueGetterParams) => {
        return `${params.row}`
      },
    },
  ];

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
        {
          !!item && <Button onClick={() => setItem(null)}>Show Default</Button>
        }

        <DataGrid
          getRowId={(row) => item ? row : row.ip}
          columns={item ? ITEM_COLUMNS : DEFAULT_COLUMNS}
          rows={item ? item.vulnerabilities : data}
          rowCount={item ? item.vulnerabilities.length : 2000}
          pagination
          paginationModel={paginationModel}
          pageSizeOptions={[10]}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          loading={isLoading}
          keepNonExistentRowsSelected
          checkboxSelection={false}
          hideFooter={!!item}
        />
      </div>
    </div>
  );
};

export default Home;
