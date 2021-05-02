document.title =
  (process.env.REACT_APP_CIRCLE_BRANCH !== "main"
    ? "[" + process.env.REACT_APP_CIRCLE_BRANCH + "] "
    : "") + "Panda Watcher";

export const apiUrl = () => {
  switch (process.env.REACT_APP_CIRCLE_BRANCH) {
    case "main":
      return apiUrlFromSubDomain(process.env.REACT_APP_MAIN_SAVING_API);
    case "staging":
      return apiUrlFromSubDomain(process.env.REACT_APP_STAGING_SAVING_API);
    case "develop":
      return apiUrlFromSubDomain(process.env.REACT_APP_DEVELOP_SAVING_API);
  }
};

const apiUrlFromSubDomain = (subDomain: string | undefined) => {
  return (
    "http://" +
    subDomain +
    "." +
    process.env.REACT_APP_DOMAIN_NAME +
    ":80/graphql/"
  );
};
