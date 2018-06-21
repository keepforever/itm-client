import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

const navitems = [
  {
    name: "Dashboard",
    nav: "Dashboard"
  },
];

export default class Drawer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View
        style={{
          borderWidth: 0,
          flex: 1,
          backgroundColor: "white",
          marginTop: 10,
          paddingTop: 40
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Image
            style={{
              width: 80,
              height: 80,
              marginVertical: 10,
              borderRadius: 25,
              borderWidth: 1
            }}
            resizeMode={"cover"}
            source={{
              uri:
                "http://www.ala-access.com/s/wp-content/uploads/2016/01/analyst-placeholder-avatar.png"
            }}
          />
        </View>
        <View>
          {navitems.map((l, i) => {
            return (
              <TouchableOpacity
                key={i}
                style={{ marginBottom: 0.5 }}
                onPress={() => {
                  this.props.navigation.navigate(l.nav);
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    height: 50,
                    paddingLeft: 15,
                    backgroundColor: "#fff0",
                    borderTopWidth: 0.5,
                    borderColor: "#fff"
                  }}
                >
                  <Text style={{ fontSize: 16, color: "black" }}>{l.name}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }
}
