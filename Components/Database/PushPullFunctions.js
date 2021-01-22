import { createFilter } from "react-native-search-filter";
import { useAuth } from "./AuthProvider";

//return items based on zipcode
export function ItemsByZipcode() {
  const { user, searchData } = useAuth();
  itemsList = searchData.filter(function (items) {
    return items.zipcode === user.zipcode;
  });
  return itemsList;
}
//Returns all current items with logged in user.
export function GetUserList() {
  const { user, searchData } = useAuth();
  const UserListFiltered = searchData.filter(createFilter(user.id, ["userID"]));
  return UserListFiltered;
}

//Returns all current items with logged in user not pending trade.
export function GetUserListNoTraded() {
  const { user, searchData } = useAuth();
  const UserListFiltered = searchData.filter(createFilter(user.id, ["userID"]));
  const ReturnList = UserListFiltered.filter(createFilter("no", ["traded"]));

  return ReturnList;
}

//Return user items that have something inside requests array
export function GetTrades() {
  const { user, searchData } = useAuth();
  const UserListFiltered = searchData.filter(createFilter(user.id, ["userID"]));
  itemsList = UserListFiltered.filter(function (items) {
    return items.requests.length != 0;
  });
  return itemsList;
}

//Return item object from its ID
export function GetItem(ID) {
  const { searchData } = useAuth();
  const itemMatch = searchData.filter(function (items) {
    return items.id == ID;
  });
  ReturnItem = itemMatch[0];
  return ReturnItem;
}
