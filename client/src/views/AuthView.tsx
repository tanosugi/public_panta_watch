import { useMutation } from "@apollo/client";
import {
  Box,
  Button,
  createStyles,
  Grid,
  makeStyles,
  Tab,
  Tabs,
  TextField,
  Theme,
} from "@material-ui/core";
import { Form, Formik, FormikProps } from "formik";
import React, { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { useUserContext } from "../context/UserContext";
import { CREATE_USER, GET_TOKEN } from "../queries";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      height: "100%",
      width: "100%",
      alignItem: "center",
      justifyContent: "center",
      // backgroundColor: "pink",
    },
    container: {
      maxWidth: "450px",
      display: "block",
      margin: "0 auto",
    },
    textField: {
      "& > *": {
        width: "100%",
      },
    },
    submitButton: {
      marginTop: "24px",
      display: "flex",
      alignContent: "center",
    },
    title: { textAlign: "center" },
    successMessage: { color: "green" },
    errorMessage: { color: "red" },
  })
);

interface ISignUpForm {
  username: string;
  password: string;
  confirmPassword: string;
}

interface IFormStatus {
  message: string;
  type: string;
}

interface IFormStatusProps {
  [key: string]: IFormStatus;
}

const formStatusProps: IFormStatusProps = {
  success: {
    message: "Signed up successfully.",
    type: "success",
  },
  duplicate: {
    message: "Email-id already exist. Please use different email-id.",
    type: "error",
  },
  error: {
    message: "Something went wrong. Please try again.",
    type: "error",
  },
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const AuthView: React.FC = (): ReactElement => {
  const classes = useStyles();
  const { isLoggedIn, setIsLoggedIn } = useUserContext();
  const [value, setValue] = React.useState(0);
  const [displayFormStatus, setDisplayFormStatus] = useState(false);
  const [formStatus, setFormStatus] = useState<IFormStatus>({
    message: "",
    type: "",
  });
  const navigate = useNavigate();
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  const [getToken] = useMutation(GET_TOKEN);
  const [createUser] = useMutation(CREATE_USER);
  const [isRegister, setIsRegister] = useState(true);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const login = async (username: string, password: string) => {
    try {
      const result = await getToken({
        variables: { username: username, password: password },
      });
      localStorage.setItem("token", result.data.tokenAuth.token);
      setIsLoggedIn(true);
      // navigate("/app/fred");
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };
  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  const authUser = async (data: ISignUpForm, resetForm: Function) => {
    try {
      if (isRegister) {
        await createUser({
          variables: { username: data.username, password: data.password },
        });
        login(data.username, data.password);
      } else {
        login(data.username, data.password);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  // const createNewUser = async (data: ISignUpForm, resetForm: Function) => {
  //   try {
  //     // API call integration will be here. Handle success / error response accordingly.
  //     if (data) {
  //       setFormStatus(formStatusProps.success);
  //       resetForm({});
  //     }
  //   } catch (error) {
  //     const response = error.response;
  //     if (response.data === "user already exist" && response.status === 400) {
  //       setFormStatus(formStatusProps.duplicate);
  //     } else {
  //       setFormStatus(formStatusProps.error);
  //     }
  //   } finally {
  //     setDisplayFormStatus(true);
  //   }
  // };

  // function a11yProps(index: number) {
  //   return {
  //     id: `simple-tab-${index}`,
  //     "aria-controls": `simple-tabpanel-${index}`,
  //   };
  // }

  // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  //   setValue(newValue);
  // };

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={isRegister ? 0 : 1}
              // value={value}
              // onChange={(event, newValue) => setIsRegister(newValue === 1)}
              onChange={(event, newValue) => {
                handleChange(event, newValue);
                setIsRegister(newValue === 0);
              }}
              aria-label="basic tabs example"
              centered
            >
              <Tab label="Register" {...a11yProps(0)} />
              <Tab label="Login" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <div className={classes.container}>
            <Formik
              initialValues={{
                username: "",
                password: "",
                confirmPassword: "",
              }}
              onSubmit={(values: ISignUpForm, actions) => {
                authUser(values, actions.resetForm);
                setTimeout(() => {
                  actions.setSubmitting(false);
                }, 500);
              }}
              validationSchema={Yup.object().shape({
                username: Yup.string().required("Please enter full name"),
                password: Yup.string()
                  .min(8)
                  // .matches(
                  //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,20}\S$/
                  // )
                  .required("Please valid password in more than 8 charactors"),
                confirmPassword: Yup.string()
                  .required("Required")
                  .test(
                    "password-match",
                    "Password musth match",
                    function (value) {
                      return this.parent.password === value;
                    }
                  ),
              })}
            >
              {(props: FormikProps<ISignUpForm>) => {
                const {
                  values,
                  touched,
                  errors,
                  handleBlur,
                  handleChange,
                  isSubmitting,
                } = props;
                return (
                  <Form>
                    <h1 className={classes.title}>
                      {isRegister ? "Register" : "Login"}
                    </h1>
                    <Grid
                      container
                      justifyContent="space-around"
                      direction="row"
                      spacing={3}
                    >
                      <Grid
                        item
                        lg={10}
                        md={10}
                        sm={10}
                        xs={10}
                        className={classes.textField}
                      >
                        <TextField
                          name="username"
                          id="username"
                          label="Nick Name"
                          value={values.username}
                          type="text"
                          helperText={
                            errors.username && touched.username
                              ? errors.username
                              : "Enter your nick name."
                          }
                          error={
                            errors.username && touched.username ? true : false
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid
                        item
                        lg={10}
                        md={10}
                        sm={10}
                        xs={10}
                        className={classes.textField}
                      >
                        <TextField
                          name="password"
                          id="password"
                          label="Password"
                          value={values.password}
                          type="password"
                          helperText={
                            errors.password && touched.password
                              ? "Please valid password. One uppercase, one lowercase, one special character and no spaces"
                              : "One uppercase, one lowercase, one special character and no spaces"
                          }
                          error={
                            errors.password && touched.password ? true : false
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid
                        item
                        lg={10}
                        md={10}
                        sm={10}
                        xs={10}
                        className={classes.textField}
                      >
                        <TextField
                          name="confirmPassword"
                          id="confirmPassword"
                          label="Confirm password"
                          value={values.confirmPassword}
                          type="password"
                          helperText={
                            errors.confirmPassword && touched.confirmPassword
                              ? errors.confirmPassword
                              : "Re-enter password to confirm"
                          }
                          error={
                            errors.confirmPassword && touched.confirmPassword
                              ? true
                              : false
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid
                        container
                        item
                        lg={10}
                        md={10}
                        sm={10}
                        xs={10}
                        className={classes.submitButton}
                        justifyContent="center"
                      >
                        <Grid item>
                          <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            disabled={isSubmitting}
                            size="large"
                          >
                            {isRegister ? "Register" : "Login"}
                          </Button>
                        </Grid>
                        {displayFormStatus && (
                          <div className="formStatus">
                            {formStatus.type === "error" ? (
                              <p className={classes.errorMessage}>
                                {formStatus.message}
                              </p>
                            ) : formStatus.type === "success" ? (
                              <p className={classes.successMessage}>
                                {formStatus.message}
                              </p>
                            ) : null}
                          </div>
                        )}
                      </Grid>
                    </Grid>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default AuthView;
