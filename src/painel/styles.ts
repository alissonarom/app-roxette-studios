import { StyleSheet, StatusBar } from "react-native"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: 'E0E1E5',
  },
  scrollView: {
    padding: 10
  },
  text: {
    fontSize: 42,
  },
  h5: {
    color: "#145B91",
    fontSize: 16,
    fontFamily: "Roboto",
    fontWeight: "600"
    },
  h4: {
    color: "#323232",
    fontSize: 16,
    fontFamily: "Roboto"
  },
  h3: {
    color: "#145B91",
    fontSize: 16,
    fontFamily: "Roboto",
    fontWeight: "600"
  },
  footer: {
    padding: 10,
    backgroundColor: "white",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  },
  subFooter: {
    display: "flex",
    flexDirection: "row",
    color: "#626060",
    fontSize: 18,
    fontFamily: "Roboto",
    justifyContent: "space-between"
  },
  cardPanel:{
    backgroundColor: "white",
    marginBottom: 10,
  },
  cardPanelContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    color: "#145B91"
  },
  cardResumo: {
    backgroundColor: 'white',
    minWidth: '50%'
  },
  cardInputs: {
    width: '40%'
  },
  selectPicker: {
    backgroundColor: 'white',
    borderBottomColor: '#145B91',
    borderTopColor: 'white',
    borderLeftColor: 'white',
    borderRightColor: 'white',
    height: 30,
  },
  daysCount: {
    color: 'red',
    marginStart: 10,
    fontSize: 12,
    padding: 2,
    height: '100%'
  },
  cardContentFinance: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: 'center'
  },
  viewCardPedido: {
    backgroundColor: 'white',
    display:"flex",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: 1
  },
  resumo: {
    backgroundColor: '#DFDDDD',
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: 1
  },
  resumoTexts: {
    fontWeight: '600',
    color: '#145B91'
  },
  resumoView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  })