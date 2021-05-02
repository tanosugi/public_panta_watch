import {
  Card,
  CardContent,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import React, { ReactElement, useEffect } from "react";
import { useQueryDataContext } from "../../context/QueryDataContext";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: "1 1 auto",
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(3),
    },
  })
);
const PriceGraph: React.FC = (): ReactElement => {
  const classes = useStyles();
  const {
    dataCreateDataItem,
    graphData,
    updateGraphData,
  } = useQueryDataContext();
  const options = {
    rangeSelector: {
      selected: 6,
    },
    title: {
      text: dataCreateDataItem?.dataItem?.name,
    },
    series: [
      {
        name: dataCreateDataItem?.dataItem?.name,
        data: graphData,
        tooltip: {
          valueDecimals: 2,
        },
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 768,
          },
          chartOptions: {
            tooltip: {
              shared: true,
              split: false,
            },
          },
        },
      ],
    },
  };
  useEffect(() => {
    updateGraphData(0);
  }, []);
  return (
    <>
      {dataCreateDataItem ? (
        <Card className={classes.root}>
          <CardContent>
            <HighchartsReact
              highcharts={Highcharts}
              constructorType={"stockChart"}
              options={options}
            />
          </CardContent>
        </Card>
      ) : (
        <div>Loading ...</div>
      )}
    </>
  );
};

export default React.memo(PriceGraph);
