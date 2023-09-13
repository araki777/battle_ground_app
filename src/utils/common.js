export const accessTokenValidator = (accessTokenDate) => {
  const now = new Date();
  const tokenDateLimit = new Date(accessTokenDate).setHours(
    new Date(accessTokenDate).getHours() + 1
  );
  if (tokenDateLimit < now) {
    return true;
  } else {
    return false;
  }
};
