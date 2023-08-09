import { Toolbar, Typography } from "@mui/material";
import { DataGrid, } from '@mui/x-data-grid';
import { AppBar, } from "@src/common-components";
import * as styles from "./styles";
import useHome from "./hooks";
import { COLUMNS } from "./constants";

const Home = () => {
  const { isLoading, paginationModel, setPaginationModel, data, } = useHome();

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
        <DataGrid
          getRowId={(row) => row.ip}
          columns={COLUMNS}
          rows={data}
          rowCount={2000}
          pagination
          paginationModel={paginationModel}
          pageSizeOptions={[10]}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          loading={isLoading}
          keepNonExistentRowsSelected
          checkboxSelection={false}
        />
      </div>
    </div>
  );
};

export default Home;
