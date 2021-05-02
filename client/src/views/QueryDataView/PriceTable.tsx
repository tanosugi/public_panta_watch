import {
  Button,
  createStyles,
  Link,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
} from "@material-ui/core";
import React, { ReactElement, useState } from "react";
import { useQueryDataContext } from "../../context/QueryDataContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      flex: "1 1 auto",
      maxHeight: "50vh",
      overflow: "auto",
      // maxWidth: "100%",
      // maxHeight: "100%",
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(3),
    },
    container: { flex: "1 1 auto" },
    table: {},
  })
);

const PriceTable: React.FC = (): ReactElement => {
  const classes = useStyles();
  const [isTableTransposed, setIsTableTransposed] = useState(false);
  const {
    // dataCreateDataItem,
    headRow,
    formattedHeadCol,
    bodyData,
    tableContents,
    updateGraphData,
  } = useQueryDataContext();
  const transpose = (a: string[][]) => a[0].map((_, c) => a.map((r) => r[c]));
  return (
    <div className={classes.root}>
      {console.log("PriceTable")}
      {bodyData && (
        <div className={classes.container}>
          <p>PriceTable</p>
          <Button
            variant="contained"
            onClick={() => {
              setIsTableTransposed(!isTableTransposed);
            }}
          >
            Transpose
          </Button>
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label="sticky table" size="small">
              <TableHead>
                <TableRow key={0}>
                  <TableCell>index</TableCell>
                  {(isTableTransposed ? formattedHeadCol : headRow).map(
                    (cell: string, key) => (
                      <TableCell>
                        <Link
                          href="#"
                          onClick={() => {
                            updateGraphData(key);
                          }}
                        >
                          {cell}
                        </Link>
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {(isTableTransposed
                  ? transpose(tableContents)
                  : tableContents
                ).map(
                  (row: string[], nRow: number) =>
                    nRow !== 0 && (
                      <TableRow key={nRow} hover role="checkbox" tabIndex={-1}>
                        {row.map((cell: string, nCol: number) => (
                          <TableCell>{cell}</TableCell>
                        ))}
                      </TableRow>
                    )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};

export default React.memo(PriceTable);
