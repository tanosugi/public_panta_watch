import { DATA_IN_JSON } from "../feature/types";

// 日付をYYYY-MM-DDの書式で返すメソッド
export const dateToYYYYMMDD = (dt: Date | null): string => {
  if (dt instanceof Date) {
    var y = dt.getFullYear();
    var m = ("00" + (dt.getMonth() + 1)).slice(-2);
    var d = ("00" + dt.getDate()).slice(-2);
    return y + "-" + m + "-" + d;
  } else {
    return "";
  }
};
export const timestampToDate = (timestamp: number): string => {
  const dt = new Date(timestamp.valueOf());
  const y = dt.getFullYear();
  const m = ("00" + (dt.getMonth() + 1)).slice(-2);
  const d = ("00" + dt.getDate()).slice(-2);
  return y + "-" + m + "-" + d;
};

export const roundIfBelowThousand = (dataItem: DATA_IN_JSON): string => {
  if (typeof dataItem == "number") {
    if (dataItem < 1000) {
      return Number(dataItem).toFixed(2);
    } else {
      return Number(dataItem).toFixed(0);
    }
  } else if (typeof dataItem == "boolean") {
    return dataItem ? "true" : "false";
  } else if (typeof dataItem == "string") {
    return dataItem;
  } else {
    return "";
  }
};
export const dataInJsonToNumber = (n: DATA_IN_JSON): number => {
  if (typeof n == "number") {
    return n;
  } else {
    return 0;
  }
};

// export default dateToYYYYMMDD;
