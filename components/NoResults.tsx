import {View, Text,Image} from 'react-native'
import React from 'react'
import images from "@/constants/images";

const NoResults = () => {
    return (
        <View className={"flex flex-1 items-center my-5"}>
            <Image source={images.noResult} className={"w-11/12 h-80"} resizeMode={"contain"}/>
            <Text className={"text-2xl font-rubik-bold mt-5 text-black-300"}>
                No Results Found
            </Text>
            <Text className={"text-base font-rubik mt-2 text-black-300"}>
                We could not find any results
            </Text>
        </View>
    )
}
export default NoResults
