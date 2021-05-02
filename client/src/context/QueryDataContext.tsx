import { ApolloError, useMutation } from "@apollo/client";
import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { DATA_IN_JSON, SETTINGS_FOR_EACH_SERVICE } from "../feature/types";
import { CREATE_DATA_ITEM } from "../queries";
import {
  dataInJsonToNumber,
  dateToYYYYMMDD,
  roundIfBelowThousand,
  timestampToDate,
} from "../utils/FormatData";

const QueryDataContext = createContext(
  {} as {
    symbolToGet: string;
    setSymbolToGet: React.Dispatch<React.SetStateAction<string>>;
    sourceToGet: string;
    setSourceToGet: React.Dispatch<React.SetStateAction<string>>;
    apiKey: string;
    setApiKey: React.Dispatch<React.SetStateAction<string>>;
    dateFrom: Date | null;
    setDateFrom: React.Dispatch<React.SetStateAction<Date | null>>;
    dateTo: Date | null;
    setDateTo: React.Dispatch<React.SetStateAction<Date | null>>;
    graphData: number[][];
    setGraphData: React.Dispatch<React.SetStateAction<number[][]>>;
    graphIndex: number;
    setGraphIndex: React.Dispatch<React.SetStateAction<number>>;
    headRow: string[];
    headCol: number[];
    formattedHeadCol: string[];
    bodyData: DATA_IN_JSON[][];
    tableContents: string[][];
    dataCreateDataItem: any;
    loadingCreateDataItem: boolean;
    calledCreateDataItem: boolean;
    errorCreateDataItem: ApolloError | undefined;
    handleCreateDataItem: () => void;
    updateGraphData: (nCol: number) => number[][];
    settingForSelectedService: SETTINGS_FOR_EACH_SERVICE | null;
    setSettingForSelectedService: React.Dispatch<
      React.SetStateAction<SETTINGS_FOR_EACH_SERVICE | null>
    >;
  }
);
const QueryDataContextProvider: React.FC = ({ children }): ReactElement => {
  const [symbolToGet, setSymbolToGet] = useState("");
  const [sourceToGet, setSourceToGet] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [dateFrom, setDateFrom] = useState<Date | null>(new Date());
  const [dateTo, setDateTo] = useState<Date | null>(new Date());
  const [graphData, setGraphData] = useState<number[][]>([]);
  const [graphIndex, setGraphIndex] = useState(0);
  const [headRow, setHeadRow] = useState<string[]>([]);
  const [headCol, setHeadCol] = useState<number[]>([]);
  const [formattedHeadCol, setFormattedHeadCol] = useState<string[]>([]);
  const [bodyData, setBodyData] = useState<DATA_IN_JSON[][]>([]);
  const [tableContents, setTableContents] = useState<string[][]>([]);
  const [
    settingForSelectedService,
    setSettingForSelectedService,
  ] = useState<SETTINGS_FOR_EACH_SERVICE | null>(null);
  const [
    createDataItem,
    {
      data: dataCreateDataItem,
      loading: loadingCreateDataItem,
      called: calledCreateDataItem,
      error: errorCreateDataItem,
    },
  ] = useMutation(CREATE_DATA_ITEM);
  const updateGraphData = (nCol: number): number[][] => {
    setGraphData(
      headCol
        .map((item, key) => [item, dataInJsonToNumber(bodyData[key][nCol])])
        .filter((row) => row[1] !== 0)
    );
    return graphData;
  };
  const handleCreateDataItem = async () => {
    try {
      const result = await createDataItem({
        // variables: {
        //   source: "yfinance", //sourceToGet,
        //   symbol: "GOOG", //symbolToGet,
        //   start: "2018-01-01", // dateToYYYYMMDD(dateFrom),
        //   end: "2020-01-01", //dateToYYYYMMDD(dateTo),
        //   apiKey: "abd", //apiKey,
        // },
        variables: {
          source: sourceToGet,
          symbol: symbolToGet,
          start: dateToYYYYMMDD(dateFrom),
          end: dateToYYYYMMDD(dateTo),
          apiKey: apiKey,
        },
      });
      // if (dataCreateDataItem?.createDataItem) {
      if (result) {
        const jsonObject = await JSON.parse(
          JSON.parse(result.data?.createDataItem?.dataItem?.priceJson)
        );
        setHeadRow(jsonObject["columns"]);
        setHeadCol(jsonObject["index"]);
        setFormattedHeadCol(
          jsonObject["index"].map((item: number) => timestampToDate(item))
        );
        setBodyData(jsonObject["data"]);
      }
      // setDataResult(dataCreateDataItem.createDataItem);
    } catch (err) {
      alert(err.message);
    }
  };
  useEffect(() => {
    setTableContents([
      ["", ...headRow],
      ...bodyData.map((row, key) => [
        formattedHeadCol[key],
        ...row.map((cell) => roundIfBelowThousand(cell)),
      ]),
    ]);
  }, [headRow, headCol, formattedHeadCol, bodyData]);
  return (
    <QueryDataContext.Provider
      value={{
        symbolToGet,
        setSymbolToGet,
        sourceToGet,
        setSourceToGet,
        apiKey,
        setApiKey,
        dateFrom,
        setDateFrom,
        dateTo,
        setDateTo,
        graphData,
        setGraphData,
        graphIndex,
        setGraphIndex,
        headRow,
        headCol,
        formattedHeadCol,
        bodyData,
        tableContents,
        dataCreateDataItem,
        loadingCreateDataItem,
        calledCreateDataItem,
        errorCreateDataItem,
        handleCreateDataItem,
        updateGraphData,
        settingForSelectedService,
        setSettingForSelectedService,
      }}
    >
      {children}
    </QueryDataContext.Provider>
  );
};
export default QueryDataContextProvider;
export const useQueryDataContext = () => useContext(QueryDataContext);
