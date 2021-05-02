import {
  Button,
  Container,
  createStyles,
  Grid,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import DatePicker from "@material-ui/lab/DatePicker";
import React, { ReactElement, useCallback, useEffect } from "react";
import { useQueryDataContext } from "../../context/QueryDataContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: "1 0 auto",
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(3),
      // backgroundColor: "yellow",
    },
    container: {
      paddingLeft: theme.spacing(3),
    },
    button: {},
  })
);

const InputForm: React.FC = (): ReactElement => {
  // const [localSymbolToGet, setLocalSymbolToGet] = useState(symbolToGet);
  const classes = useStyles();
  const {
    symbolToGet,
    setSymbolToGet,
    apiKey,
    setApiKey,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    handleCreateDataItem,
    settingForSelectedService,
  } = useQueryDataContext();
  // useState(() => {
  //   if (settingForSelectedService !== null) {
  //     setSymbolToGet(settingForSelectedService.initialInputForSymbol);
  //   }
  //   const today = new Date();
  //   dateFrom?.setFullYear(today.getFullYear() - 3);
  // });
  useEffect(() => {
    if (settingForSelectedService?.initialInputForSymbol !== undefined) {
      setSymbolToGet(settingForSelectedService?.initialInputForSymbol);
    }
  }, []);
  const handleChange = useCallback(
    (e) => {
      setSymbolToGet(e.target.value);
    },
    [setSymbolToGet]
  );

  return (
    <div className={classes.root}>
      <Container maxWidth="xl" className={classes.container}>
        <Typography>
          <h1>Input</h1>
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="flex-start"
        >
          <Grid item xs={4} sm={4} lg={1}>
            <Typography>
              <h3>Ticker</h3>
            </Typography>
          </Grid>
          <Grid item xs={8} sm={8} lg={2}>
            <TextField
              id="symbol-basic"
              label="Ticker"
              variant="outlined"
              placeholder="Search Symbol?"
              value={symbolToGet}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </Grid>
          <Grid item xs={4} sm={4} lg={1}>
            <Typography>
              <h3>From:</h3>
            </Typography>
          </Grid>
          <Grid item xs={8} sm={8} lg={2}>
            <DatePicker
              // variant="inline"
              // inputVariant="outlined"
              label="Date From"
              value={dateFrom}
              onChange={(newValue) => {
                setDateFrom(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item xs={4} sm={4} lg={1}>
            <Typography>
              <h3>To:</h3>
            </Typography>
          </Grid>
          <Grid item xs={8} sm={8} lg={2}>
            <DatePicker
              // variant="inline"
              // inputVariant="outlined"
              label="Date To"
              value={dateTo}
              onChange={(newValue) => {
                setDateTo(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          {settingForSelectedService?.needApiKey === "true" && (
            <>
              <Grid item xs={4} sm={4} lg={1}>
                <Typography>
                  <h3>API Key:</h3>
                </Typography>
              </Grid>
              <Grid item xs={8} sm={8} lg={2}>
                <TextField
                  id="api-key-basic"
                  label="api key"
                  variant="outlined"
                  placeholder="Search Symbol?"
                  value={apiKey}
                  onChange={(e) => {
                    setApiKey(e.target.value);
                  }}
                />
              </Grid>
            </>
          )}
          <Grid container item sm={12} justifyContent="center">
            <Grid item>
              <Button
                size="large"
                variant="contained"
                onClick={async () => {
                  await handleCreateDataItem();
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default React.memo(InputForm);
