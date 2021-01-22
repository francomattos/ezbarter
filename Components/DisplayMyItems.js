import React from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import { GetUserList } from "./Database/PushPullFunctions";
import styles from "./Styles/Components.Styles";

export default function DisplayMyItems() {
  const Item = ({ searchResult }) => (
    <TouchableOpacity
      onPress={() => alert(searchResult.about)}
      key={searchResult.about}
      style={styles.container}
    >
      <View style={styles.myItemsTable}>
        <Text>{searchResult.itemname}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => <Item searchResult={item} />;

  return (
    <View style={{ marginBottom: 30 }}>
      <FlatList
        data={GetUserList()}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
    </View>
  );
}
