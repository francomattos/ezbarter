import React, { useState } from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import { GetTrades, GetItem } from "./Database/PushPullFunctions";
import { useAuth } from "./Database/AuthProvider";
import styles from "./Styles/Components.Styles";
import Icon from "react-native-vector-icons/Ionicons";

export default function DisplayTrades() {
  const { user } = useAuth();
  const [selectedId, setSelectedId] = useState(null);
  //Grabs items pending trade
  const penidingTrades = GetTrades();

  const Item = ({ pendingTradesItems }) => (
    <View>
      <Text style={styles.textDisplay}>
        Trade: {pendingTradesItems.itemname} For:{" "}
      </Text>
      {/* Starts mapping, gets each item on the array of pending trades for all your items that have pending trades */}
      {pendingTradesItems.requests.map((tradedItem, index) => {
        const itemForTrade = GetItem(tradedItem);

        return (
          //Creates the list of items, this is inside the flatlist for each item, has accept and decline item with on touch option.
          <View key={tradedItem} style={styles.tradeFlatlist}>
            <View style={{ width: "85%" }}>
              <Text>{itemForTrade.itemname}</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  alert(
                    "Accepted trade of " +
                      itemForTrade.itemname +
                      " for " +
                      pendingTradesItems.itemname
                  );
                  itemForTrade.traded = "no";
                  pendingTradesItems.requests = [];
                  pendingTradesItems.userID = itemForTrade.userID;
                  itemForTrade.userID = user.id;
                  setSelectedId(tradedItem);
                }}
              >
                <Icon name="checkmark-circle-outline" color="blue" size={26} />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  pendingTradesItems.requests.splice(index, 1);
                  itemForTrade.traded = "no";
                  setSelectedId(tradedItem);
                }}
              >
                <Icon name="remove-circle-outline" color="red" size={26} />
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );

  const renderItem = ({ item }) => <Item pendingTradesItems={item} />;

  return (
    //Creates flatlist of items pending trade
    <View style={{ marginBottom: 30, marginTop: 10 }}>
      <FlatList
        data={penidingTrades}
        extraData={selectedId}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={1}
      />
    </View>
  );
}
