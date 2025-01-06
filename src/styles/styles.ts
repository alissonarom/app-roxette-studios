import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
        backgroundImage: {
            justifyContent: 'center',
            height: '100%',
            width: '100%',
        },
        container: {
          flex: 1,
          justifyContent: "flex-start",
          padding: 80,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        },
        input: {
          height: 54,
          width: "100%",
          borderRadius: 5,
          padding: 16,
          backgroundColor: '#00000069',
          color: 'rgb(109 109 109)',
          borderBottomColor: 'white',
          borderBottomWidth: 1,
          fontSize: 16
        },
        button: {
          height: 80,
          borderRadius: 5,
          justifyContent: "center",
          margin: 30,
          fontSize: 25,
          backgroundColor: 'rgb(156 74 76)',
          color: 'white',
          fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
          textAlign: 'center',
        },
        texth3: {
          fontSize: 23,
          color: "white",
          marginVertical: 15,
          textAlign: 'center',
        },
        texth2: {
          fontSize: 30,
          color: "white",
          marginVertical: 15,
          textAlign: 'center',
        },
        texth2Form: {
            fontSize: 25,
            color: "#c7aa9a",
            marginVertical: 15,
            textAlign: 'left',
          },
        texth1: {
          fontSize: 40,
          color: "white",
          marginVertical: 15,
          textAlign: 'center',
        },
        tinyLogo: {
          width: '50%',
          height: 200,
          alignSelf: 'center',
          marginTop: 20,
          marginBottom: 300,
        },
        switchContainer: {
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            marginTop: 20,
            width: '60%',
            alignSelf: 'center'
        }

  })