import { UserDao } from "../daos/index.js";
import { ERROR } from "../utils/index.js";

const UserApi = new UserDao();

const getUsers = async (req, res) => {
  try {
    const users = await UserApi.getAll();
    res.send(users);
  } catch (error) {
    res
      .status(500)
      .send({ status: "error", error: ERROR.MESSAGE.INTERNAL_ERROR });
  }
};

export { getUsers };
