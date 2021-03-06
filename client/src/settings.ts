import { SETTINGS_FOR_EACH_SERVICE } from "./feature/types";

const settingsForEachService: SETTINGS_FOR_EACH_SERVICE[] = [
  {
    id: "1",
    shortName: "fred",
    name: "FRED",
    initialInputForSymbol: "GDP",
    icon: "../assets/icon/fred.ico",
    method: "data",
    needApiKey: "false",
    period: "datetime",
    payload: "",
  },
  {
    id: "2",
    shortName: "stooq",
    name: "Stooq",
    initialInputForSymbol: "GOOG",
    icon: "../assets/icon/fred.ico",
    method: "data",
    needApiKey: "false",
    period: "datetime",
    payload: "",
  },
  {
    id: "3",
    shortName: "tiingo",
    name: "Tiingo",
    initialInputForSymbol: "GOOG",
    icon: "../assets/icon/fred.ico",
    method: "pdr",
    needApiKey: "true",
    period: "datetime",
    payload: "",
  },
  {
    id: "4",
    shortName: "iex",
    name: "IEX",
    initialInputForSymbol: "GOOG",
    icon: "../assets/icon/fred.ico",
    method: "data",
    needApiKey: "true",
    period: "datetime",
    payload: "",
  },
  {
    id: "5",
    shortName: "av-daily",
    name: "AlphaVantage",
    initialInputForSymbol: "GOOG",
    icon: "../assets/icon/fred.ico",
    method: "data",
    needApiKey: "true",
    period: "datetime",
    payload: "",
  },
  {
    id: "6",
    shortName: "econdb",
    name: "Econdb",
    initialInputForSymbol: "ticker=RGDPUS",
    icon: "../assets/icon/fred.ico",
    method: "data",
    needApiKey: "false",
    period: "datetime",
    payload: "",
  },
  {
    id: "7",
    shortName: "quandl",
    name: "Quandl",
    initialInputForSymbol: "SBJ/0307",
    icon: "../assets/icon/fred.ico",
    method: "data",
    needApiKey: "false",
    period: "datetime",
    payload: "",
  },
  {
    id: "8",
    shortName: "famafrench",
    name: "Fama-French Data",
    initialInputForSymbol: "5_Industry_Portfolios",
    icon: "../assets/icon/fred.ico",
    method: "data",
    needApiKey: "false",
    period: "datetime",
    payload: "",
  },
  {
    id: "9",
    shortName: "wb",
    name: "World Bank",
    initialInputForSymbol: "NY.GDP.PCAP.KD",
    icon: "../assets/icon/fred.ico",
    method: "pdr.wb",
    needApiKey: "false",
    period: "-",
    payload: "country",
  },
  {
    id: "10",
    shortName: "oecd",
    name: "OECD",
    initialInputForSymbol: "TUD",
    icon: "../assets/icon/fred.ico",
    method: "data",
    needApiKey: "false",
    period: "datetime",
    payload: "",
  },
  {
    id: "11",
    shortName: "eurostat",
    name: "Eurostat",
    initialInputForSymbol: "tran_sf_railac",
    icon: "../assets/icon/fred.ico",
    method: "data",
    needApiKey: "false",
    period: "datetime",
    payload: "",
  },
  {
    id: "12",
    shortName: "nasdaq",
    name: "NASDAQ",
    initialInputForSymbol: "",
    icon: "../assets/icon/fred.ico",
    method: "data",
    needApiKey: "false",
    period: "datetime",
    payload: "",
  },
  {
    id: "13",
    shortName: "moex",
    name: "Moscow Exchange",
    initialInputForSymbol: "USD000UTSTOM",
    icon: "../assets/icon/fred.ico",
    method: "data",
    needApiKey: "false",
    period: "datetime",
    payload: "",
  },
  {
    id: "14",
    shortName: "naver",
    name: "Naver Finance",
    initialInputForSymbol: "005930",
    icon: "../assets/icon/fred.ico",
    method: "data",
    needApiKey: "false",
    period: "datetime",
    payload: "",
  },
  {
    id: "15",
    shortName: "yfinance",
    name: "Yahoo Finance",
    initialInputForSymbol: "GOOG",
    icon: "../assets/icon/fred.ico",
    method: "pdr.get_data_yahoo",
    needApiKey: "false",
    period: "yyyy-mm-dd",
    payload: "",
  },
];
export default settingsForEachService;
