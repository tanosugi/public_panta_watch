import {
  ApolloError,
  OperationVariables,
  QueryLazyOptions,
  useLazyQuery,
} from "@apollo/client";
import React, {
  createContext,
  ReactElement,
  useContext,
  useState,
} from "react";
import { DATA_IN_JSON, DATA_ITEM } from "../feature/types";
import { GET_SINGLE_DATA_ITEM } from "../queries";
import {
  dataInJsonToNumber,
  roundIfBelowThousand,
  timestampToDate,
} from "../utils/FormatData";

const TrialContext = createContext(
  {} as {
    idToQuerySingle: string;
    setIdToQuerySingle: React.Dispatch<React.SetStateAction<string>>;
    getSingleDataItem: (
      c: QueryLazyOptions<OperationVariables> | undefined
    ) => void;
    updateGraphData: (nCol: number) => number[][];
    processAfterGetSingleDataItem: () => void;
    dataSingleDataItem: DATA_ITEM;
    errorSingleDataItem: ApolloError | undefined;
    headRow: string[];
    headCol: number[];
    formattedHeadCol: string[];
    bodyData: DATA_IN_JSON[][];
    tableContents: string[][];
    graphData: number[][];
  }
);
const TrialContextProvider: React.FC = ({ children }): ReactElement => {
  const [idToQuerySingle, setIdToQuerySingle] = useState("");
  const [headRow, setHeadRow] = useState<string[]>([]);
  const [headCol, setHeadCol] = useState<number[]>([]);
  const [formattedHeadCol, setFormattedHeadCol] = useState<string[]>([]);
  const [bodyData, setBodyData] = useState<DATA_IN_JSON[][]>([]);
  const [tableContents, setTableContents] = useState<string[][]>([]);
  const [graphData, setGraphData] = useState<number[][]>([]);

  const [
    getSingleDataItem,
    { data: dataSingleDataItem, error: errorSingleDataItem },
  ] = useLazyQuery(GET_SINGLE_DATA_ITEM, {
    fetchPolicy: "network-only",
  });

  const updateGraphData = (nCol: number): number[][] => {
    setGraphData(
      headCol
        .map((item, key) => [item, dataInJsonToNumber(bodyData[key][nCol])])
        .filter((row) => row[1] !== 0)
    );
    return graphData;
  };
  const processAfterGetSingleDataItem = () => {
    try {
      if (dataSingleDataItem?.dataItem) {
        const jsonObject = JSON.parse(
          JSON.parse(dataSingleDataItem?.dataItem?.priceJson)
        );
        setHeadRow(jsonObject["columns"]);
        setHeadCol(jsonObject["index"]);
        setFormattedHeadCol(
          jsonObject["index"].map((item: number) => timestampToDate(item))
        );
        setBodyData(jsonObject["data"]);
        setTableContents([
          ["", ...headRow],
          ...bodyData.map((row, key) => [
            formattedHeadCol[key],
            ...row.map((cell) => roundIfBelowThousand(cell)),
          ]),
        ]);
        updateGraphData(0);
      }
    } catch (err) {
      console.log(err.messsage);
    }
  };

  return (
    <TrialContext.Provider
      value={{
        idToQuerySingle,
        setIdToQuerySingle,
        getSingleDataItem,
        updateGraphData,
        processAfterGetSingleDataItem,
        dataSingleDataItem,
        errorSingleDataItem,
        headRow,
        headCol,
        formattedHeadCol,
        bodyData,
        tableContents,
        graphData,
      }}
    >
      {children}
    </TrialContext.Provider>
  );
};
export default TrialContextProvider;
export const useTrialContext = () => useContext(TrialContext);
