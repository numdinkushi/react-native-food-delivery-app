import React from 'react'
import { StyleSheet, Text, View,  Image, TouchableOpacity, } from 'react-native'
import { COLORS, icons, FONTS, SIZES } from '../constants'

const HorizontalFoodCard = ({containerStyle, imageStyle, item, onPress}) => {
  return (
    <TouchableOpacity 
    style={{
    borderRadius:SIZES.radius,
    backgroundColor:COLORS.lightGray2,
    flexDirection:'row',
    ...containerStyle
}}
    >
        {/* Image section */}
        <Image 
          source={item.image}
          style={imageStyle} 
        />
        {/* Info section */}
        <View
            style={{flexDirection:"column"}}
        >
        {/* Name  */}
        <Text
            style={{...FONTS.h3, fontSize:17}}
            >
            {item.name}
        </Text>
    {/* Description */}
    <Text style={{
        color: COLORS.darkGray2, ...FONTS.body4
    }}>
    {item.description}
    </Text>
    {/* Price */}
    <Text 
    style={{
        marginTop:SIZES.base, ...FONTS.h2
        }}
    >
       $ {item.price}
    </Text>
        </View>
        {/* Calories */}
        <View
        style={{
            flexDirection:"row",
            position:"absolute",
            top:5,
            right:SIZES.radius
        }}
        >
            <Image
                source={icons.calories}
                    style={{
                        width:30,
                        height:30,
                    }}
                />
                <Text style={{
                    color:COLORS.darkGray2, ...FONTS.body5}}>
                    {item.calories} Calories
                </Text>
        </View>
    </TouchableOpacity>
  )
}

export default HorizontalFoodCard

