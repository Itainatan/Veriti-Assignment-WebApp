import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const COLUMNS: GridColDef[] = [
  { field: "ip", headerName: "IP Address", flex: 1 },
  {
    field: "CVEs found",
    headerName: "CVEs found",
    sortable: true,
    flex: 1,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.vulnerabilities.length || ""}`,
  },
];

export { COLUMNS };
