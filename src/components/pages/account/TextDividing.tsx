import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../../utils/constant';

const TextDividing = ({title} : any) => {
  return (
    <View style={styles.content}>
      <Text style={{color: COLORS.primary, fontSize: SIZES.large - 3, fontWeight: '300'}}>{title}</Text>
      <View style={styles.line}></View>
    </View>
  )
}

export default TextDividing;

const styles = StyleSheet.create({
    content: {
        marginHorizontal: 10,
        marginTop: 13,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    line: {
        marginBottom: 3,
        marginLeft: 5,
        height: 1,
        flex: 1,
        backgroundColor: COLORS.white,
    }
})