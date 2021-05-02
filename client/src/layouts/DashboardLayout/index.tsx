import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React, { ReactElement, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useQueryDataContext } from "../../context/QueryDataContext";
import { useUserContext } from "../../context/UserContext";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      minHeight: "100vh",
      maxWidth: "100vw",
      overflow: "hidden",
      width: "100%",
      // backgroundColor: "pink",
    },
    toolbar: { ...theme.mixins.toolbar },
    content: {
      display: "inline-block",
      // flex: "1 0 auto",
      flex: 1,
      height: "auto",
      overflow: "hidden",
      flexDirection: "column",
      // borderColor: "green",
    },
  })
);
const DashboardLayout: React.FC = (): ReactElement => {
  const classes = useStyles();
  const { redirectIfNotLoggedIn } = useUserContext();
  const { settingForSelectedService } = useQueryDataContext();

  useEffect(() => {
    redirectIfNotLoggedIn();
  }, []);
  return (
    <div>
      {/* <p>DashboardLayout</p> */}
      <div className={classes.root}>
        <Topbar />
        {/* {settingForSelectedService?.initialInputForSymbol && <Sidebar />} */}
        <Sidebar />

        {/* <div className={classes.wrapper}>
          <div className={classes.contentContainer}> */}
        {/* <div> */}
        {/* <div> */}
        {/* <main> */}
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Outlet />
        </main>
      </div>
    </div>
    //   </div>
    // </div>
  );
};

export default DashboardLayout;
