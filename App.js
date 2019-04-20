import React from "react";
import { StyleSheet, WebView, BackHandler, Alert } from "react-native";

export default class App extends React.Component {
  state = {
    isHomePage: true,
    key: 1
  };
  constructor(props) {
    super(props);
    this.WEBVIEW_REF = React.createRef();
    this.node = 1;
    this.homePage = "https://jozoor.herokuapp.com";
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton = () => {
    //console.log(this.state.isHomePage);
    if (this.state.isHomePage) {
      // Alert.alert(
      //   "Exit App",
      //   "Do you want to exit?",
      //   [
      //     {
      //       text: "No",
      //       onPress: () => {
      //         console.log("Cancel Pressed");
      //         this.node++;
      //       },
      //       style: "cancel"
      //     },
      //     { text: "Yes", onPress: () => BackHandler.exitApp() }
      //   ],
      //   { cancelable: false }
      // );
      BackHandler.exitApp()
    } else {
      this.WEBVIEW_REF.current.goBack();
    }
    return true;
  };

  onNavigationStateChange(navState) {
    if (navState.url !== this.homePage) {
      this.setState({ isHomePage: false });
    } else {
      this.setState({ isHomePage: true });
    }
  
    this.setState({
      canGoBack: navState.canGoBack
    });
  }

  render() {
    return (
      <WebView
        ref={this.WEBVIEW_REF}
        key={this.state.key}
        source={{ uri: this.homePage }}
        domStorageEnabled={true}
        onNavigationStateChange={this.onNavigationStateChange.bind(this)}
        style={{ marginTop: 20 }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});