export const getSavedUserFromReqBody = (obj: any): SavedUser => {
  if (!obj.id || !obj.username) throw new Error("No saved user data");
  const savedUser: SavedUser = {
    id: obj.id,
    username: obj.username,
  };
  return savedUser;
};
