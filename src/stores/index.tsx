import UserAPIService from "../services/UserService/index.api";
import UserFixtureService from "../services/UserService/index.fixture";
import UserStore from "./UserStore";

const useFixtures = true;

const getUserStoreService = () => {
	if (useFixtures) {
		return new UserFixtureService();
	}
	return new UserAPIService();
};

const userStore = new UserStore(getUserStoreService());

const stores = {
	userStore,
};
export default stores;
