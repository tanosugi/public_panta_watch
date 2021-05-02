import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React, { ReactElement, useCallback, useEffect } from "react";
import { useParams } from "react-router";
import { Navigate } from "react-router-dom";
import { useQueryDataContext } from "../../context/QueryDataContext";
import { useUiContext } from "../../context/UIContext";
import settings from "../../settings";
import InputForm from "./InputForm";
import PriceGraph from "./PriceGraph";
import PriceTable from "./PriceTable";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: "1 1 auto",
      minHeight: "100%",
      // display: "flex",
      flexDirection: "column",
      backgroundColor: theme.palette.grey[200],
      // backgroundColor: "yellow",
      paddingBottom: theme.spacing(1),
      // paddingTop: theme.spacing(1),
      "& >div": { margin: theme.spacing(1) },
    },
  })
);

const QueryDataView: React.FC = (): ReactElement => {
  const classes = useStyles();
  const { slug } = useParams();
  const setting = settings.find((item) => item.shortName === slug);
  const {
    setSourceToGet,
    dataCreateDataItem,
    loadingCreateDataItem,
    calledCreateDataItem,
    errorCreateDataItem,
    headCol,
    bodyData,
    tableContents,
    setSettingForSelectedService,
    // settingForSelectedService,
    setSymbolToGet,
    dateFrom,
    graphIndex,
  } = useQueryDataContext();
  const { setSelectedService } = useUiContext();

  useEffect(() => {
    setSourceToGet(slug);
    if (setting !== undefined) {
      setSettingForSelectedService(setting);
      setSymbolToGet(setting.initialInputForSymbol);
      const today = new Date();
      dateFrom?.setFullYear(today.getFullYear() - 3);
    }
    setSelectedService(slug);
  }, [slug]);

  const wrapPriceGraph = useCallback(() => {
    return <PriceGraph />;
  }, []);
  const wrapPriceTable = useCallback(() => {
    return <PriceTable />;
  }, []);
  return (
    <div className={classes.root}>
      {/* <p>QueryDataView</p>
      <p>slug = {slug}</p> */}

      {!setting && <Navigate to="/404" />}

      <InputForm />
      {errorCreateDataItem && errorCreateDataItem.message}
      {loadingCreateDataItem && "Loading..."}
      {/* {dataCreateDataItem && tableContents !== [] && slug && ( */}
      {calledCreateDataItem &&
        !loadingCreateDataItem &&
        dataCreateDataItem &&
        tableContents !== [] && (
          <>
            {headCol.length !== 0 && bodyData.length !== 0 ? (
              <PriceGraph />
            ) : (
              // wrapPriceGraph()
              "Loading Graph..."
            )}
            <PriceTable />
            {/* {wrapPriceTable()} */}
          </>
        )}
    </div>
  );
};

export default QueryDataView;
