import React, { useState } from "react";
//Needs elements for form input
import { Button, Text, Input } from "react-native-elements";
import { View, Modal, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./Styles/Components.Styles";
import DisplayMyItems from "./DisplayMyItems";
import DisplayTrades from "./DisplayTrades";
import { useAuth } from "./Database/AuthProvider";

export function MyItems() {
  const { addItem } = useAuth();
  const [currentPage, setCurrentPage] = useState("myitems");
  const [modalVisible, setModalVisible] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setitemDescription] = useState("");

  //Sets switch between the my items page and trades page to be displayed
  function PageDisplay(props) {
    if (props.thisPage == "myitems") {
      return <DisplayMyItems />;
    } else if (props.thisPage == "trades") {
      return <DisplayTrades />;
    }
  }

  return (
    <View style={styles.pagesHeader}>
      <View style={styles.itemsHeader}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon name="add-circle-outline" size={26} width={60} height={60} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setCurrentPage("myitems")}>
          <Text>My Items</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentPage("trades")}>
          <Text>Trades</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.modalView}>
            <Text style={{ fontSize: 16 }}>
              Please enter all information for the item you would like to trade:
            </Text>
            <Input
              autoCapitalize="none"
              placeholder="Name"
              onChangeText={setItemName}
            />
            <Input
              autoCapitalize="none"
              placeholder="Description"
              onChangeText={setitemDescription}
            />

            <View style={{ flexDirection: "row" }}>
              <View style={{ margin: 20 }}>
                <Button
                  onPress={() => {
                    if (itemName == "" || itemDescription == "")
                      alert("Please enter all item information");
                    else {
                      setitemDescription("");
                      setItemName("");
                      addItem(itemName, itemDescription);
                      setModalVisible(!modalVisible);
                    }
                  }}
                  title="Submit"
                />
              </View>
              <View style={{ margin: 20 }}>
                <Button
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                  title="Cancel"
                />
              </View>
            </View>
          </View>
        </Modal>

        <PageDisplay thisPage={currentPage} />
      </View>
    </View>
  );
}
