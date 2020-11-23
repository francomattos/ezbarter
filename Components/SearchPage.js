import React, {useState} from 'react';
import styles from './Styles/Components.Styles';
import SearchInput, {createFilter} from 'react-native-search-filter';
import {Text, View, TouchableOpacity, FlatList, Modal} from 'react-native';
import {
  GetUserListNoTraded,
  ItemsByZipcode,
} from './Database/PushPullFunctions';

const KEYS_TO_FILTERS = ['itemname', 'about'];

export function SearchPage() {
  const [searchTerm, setsearchTerm] = useState('');
  const [selectedModalItem, setModalItem] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const ItemsList = ItemsByZipcode();
  const myUserItems = GetUserListNoTraded();

  // Set list of my user items available to be traded.
  const myUserTradeItems = myUserItems.filter(createFilter('no', ['traded']));

  // Creates the filtered list of all items on my zipcode.
  const filteredSearch = ItemsList.filter(
    createFilter(searchTerm, KEYS_TO_FILTERS),
  );
  //Updates the search term.
  const searchUpdater = (term) => {
    setsearchTerm(term);
  };

  // Creates items for search results flatlist to be displayed inside page.
  const Item = ({searchResult}) => (
    <TouchableOpacity
      onPress={() => StartModal(searchResult)}
      key={searchResult.id}
      style={styles.container}>
      <View style={styles.searchResult}>
        <Text>{searchResult.itemname}</Text>
      </View>
    </TouchableOpacity>
  );
  const renderItem = ({item}) => <Item searchResult={item} />;

  // Display modal and set item modal relates to.
  const StartModal = (SelectedItem) => {
    setModalItem(SelectedItem);
    setModalVisible(true);
  };

  // Offer item to trade function.
  const offerToTrade = (item) => {
    selectedModalItem.requests.push(item.id);
    item.traded = 'yes';
    setModalVisible(!modalVisible);
    alert('Offered: ' + item.itemname + ' for: ' + selectedModalItem.itemname);
  };

  return (
    <View style={[styles.pagesHeader, {marginBottom: 30}]}>
      {/* Search input on top of page */}
      <SearchInput
        onChangeText={searchUpdater}
        style={styles.searchInput}
        placeholder="Search items to swap."
      />

      {/* Displays the list of items for user to click, sorts alphabetically */}
      <FlatList
        data={filteredSearch.sort((a, b) =>
          a.itemname.localeCompare(b.itemname),
        )}
        renderItem={renderItem}
        numColumns={2}
      />

      {/* Modal that displays items */}
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalTradeView}>
            {/* Displays item description */}
            <Text style={styles.textDisplay}>
              Item description: {selectedModalItem.about}
            </Text>
            <Text style={styles.textDisplay}>Select Trade</Text>

            {/* Creates list of items to click for trade offer */}
            <FlatList
              data={myUserTradeItems.sort((a, b) =>
                a.itemname.localeCompare(b.itemname),
              )}
              keyExtractor={(item) => item.id.toString()}
              numColumns={1}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => offerToTrade(item)}
                  key={item.id}
                  style={styles.container}>
                  <View style={styles.myItemsTradeTable}>
                    <Text>{item.itemname}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />

            {/* Close button at bottom */}
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              style={styles.buttonStyle}>
              <Text style={styles.textStyle}>Cancel Trade</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
