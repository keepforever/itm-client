import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  fieldWhite: {
    borderBottomWidth: 1,
    fontSize: 20,
    marginBottom: 15,
    height: 100,
    color: 'white'
  },
  fieldBlack: {
    borderBottomWidth: 1,
    fontSize: 20,
    marginBottom: 15,
    height: 100,
    color: 'black'
  },
});

export default class MultilineTextField extends React.PureComponent {
  onChangeText = (text) => {
    const { onChangeText, name } = this.props;
    onChangeText(name, text);
  };

  render() {
    const { value, secureTextEntry, name, kolor } = this.props;
    let isBlackText
    if(kolor === 'black') {
      isBlackText = true
    }

    return (
      <TextInput
        multiline={true}
        numberOfLines={2}
        placeholderTextColor="grey"
        onChangeText={this.onChangeText}
        value={value}
        style={isBlackText ? styles.fieldBlack : styles.fieldWhite}
        placeholder={name}
        autoCapitalize="none"
        secureTextEntry={!!secureTextEntry}
        clearButtonMode="unless-editing"
      />
    );
  }
}
