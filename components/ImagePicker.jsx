import React, { useState, useEffect } from "react";
import { Image, View, Platform } from "react-native";
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

const ImagePickerC = ({ image, setImage }) => {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{}}>
      <Button onPress={pickImage} icon={`attachment`} mode="outlined">
        Attach Image
      </Button>
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
};

export default ImagePickerC;
