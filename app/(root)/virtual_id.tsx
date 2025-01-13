import {View, Text} from 'react-native'
import React from 'react'
import BarCode from "@/components/BarCode";

const BarCodeScanner = () => {
    return (
        <View className={"h-screen flex-1"}>
            <BarCode/>
        </View>
    )
}
export default BarCodeScanner