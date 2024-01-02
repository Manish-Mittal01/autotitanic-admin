import { combineReducers } from "@reduxjs/toolkit";
//reducers
import authReducer from "./states/auth/reducer";
import dashReducer from "./states/dashboard/reducer";
import manageUserReducer from "./states/user/reducer";
import manageContestReducer from "./states/contest/reducer";
import reportUserReducer from "./states/reported_users/reducer";
import transactionReducer from "./states/transactions/reducer";
import subAdminReducer from "./states/sub_admin/reducer";
import settingReducer from "./states/settings/slice";
import commonSlice from "./states/common/slice";
import makeSlice from "./states/makeAndModel/slice";
import countrySlice from "./states/country/slice";
import contentPageSlice from "./states/contentPage/slice";

const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashReducer,
  user: manageUserReducer,
  contest: manageContestReducer,
  reported_user: reportUserReducer,
  transactions: transactionReducer,
  sub_admin: subAdminReducer,
  settings: settingReducer,
  common: commonSlice,
  makeAndModel: makeSlice,
  countryAndCity: countrySlice,
  contentPage: contentPageSlice
});

export default rootReducer;
