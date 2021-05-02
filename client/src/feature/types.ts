export interface PRICE_JSON {
  columns: string[];
  index: number[];
  data: number[];
}
export interface DATA_ITEM_NODE {
  id: string;
  source: string;
  symbol: string;
  name: string;
  start: Date;
  end: Date;
  priceJson: string;
}

export interface DATA_ITEM {
  dataItem: DATA_ITEM_NODE;
}
export interface DATA_ITEM_BY_SYMBOL {
  dataItemBySymbol: DATA_ITEM_NODE;
}
export interface DATA_ITEM_CREATE {
  createDataItem: DATA_ITEM_NODE;
}

export interface DATA_ITEM_EDGE {
  node: DATA_ITEM_NODE;
}
export interface ALL_DATA_ITEM {
  node: DATA_ITEM_EDGE[];
}
export interface DATA_IN_JSON {
  dataItem: number | string | boolean;
}
export interface SETTINGS_FOR_EACH_SERVICE {
  id: string;
  shortName: string;
  name: string;
  initialInputForSymbol: string;
  icon: string;
  method: string;
  needApiKey: string;
  period: string;
  payload: string;
}
// export interface TABLE_DATA  {
//   headRow: string[];
//   headCol: number[];
//   formattedHeadCol: string[];
//   bodyData: DATA_IN_JSON[][];
//   tableContents: string[][];
// }
