import { Avatar, Link } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import * as React from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useQueryDataContext } from "../../context/QueryDataContext";
import { useUiContext } from "../../context/UIContext";
import settings from "../../settings";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    drawer: {
      [theme.breakpoints.up("md")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      boxSizing: "border-box",
      width: drawerWidth,
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    hiddenForMoblie: {
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
  })
);

interface Props {
  window?: () => Window;
}
export default function MiniDrawer(props: Props) {
  const { window } = props;
  const { slug } = useParams();
  const classes = useStyles();
  const theme = useTheme();
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    selectedService,
    setSelectedService,
  } = useUiContext();
  const { setSymbolToGet } = useQueryDataContext();

  const handleDrawerToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {settings.map((jsonSetting, index) => (
          <Link component={RouterLink} to={`/app/${jsonSetting.shortName}`}>
            <ListItem
              button
              key={index}
              // selected={jsonSetting.shortName === selectedService}
              selected={jsonSetting.shortName === selectedService}
              onClick={() => {
                setSymbolToGet(jsonSetting.initialInputForSymbol);
                setSelectedService(slug);
              }}
            >
              <ListItemIcon>
                <Avatar
                  className={classes.small}
                  variant="square"
                  alt={jsonSetting.name}
                  src={`/assets/icon/${jsonSetting.shortName}.ico`}
                />
              </ListItemIcon>
              <ListItemText primary={jsonSetting.name} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden mdUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={isSidebarOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden mdDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
}
