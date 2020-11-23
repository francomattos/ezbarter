import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  //header styling general
  pagesHeader: {
    padding: 30,
  },
  itemsHeader: {
    paddingBottom: 10,
    borderBottomWidth: 3,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  //display text  styling
  textDisplay: {
    fontSize: 15,
    color: '#000000',
  },
  //Trade Flatlist View
  tradeFlatlist: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
  },
  //search area items
  searchInput: {
    padding: 10,
    borderColor: '#CCC',
    borderWidth: 1,
    margin: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  searchResult: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    padding: 0,
    margin: 5,
    height: 50,
    width: 150,
  },
  //Items display tables
  myItemsTable: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#008b8b',
    padding: 0,
    margin: 5,
    height: 50,
    width: 150,
  },
  myItemsTradeTable: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#008b8b',
    padding: 0,
    margin: 5,
    marginHorizontal: 30,
    height: 50,
    width: 150,
  },
  //button style
  textStyle: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  buttonStyle: {
    width: '50%',
    backgroundColor: '#cd5c5c',
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 10,
    paddingHorizontal: 12,
  },
  //Modal Styling My Items
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTradeView: {
    margin: 30,
    marginBottom: 100,
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
