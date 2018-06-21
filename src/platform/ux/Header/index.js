import React from "react";
import { Image } from "react-native";

const Header = () => {
  //console.log("header");
  return (
    <Image
      resizeMode="cover"
      style={{
        width: 150,
        height: 36,
        resizeMode: "contain",
        alignSelf: "center"
      }}
      source={require("../../itm.jpg")}
    />
  );
};

export default Header;
