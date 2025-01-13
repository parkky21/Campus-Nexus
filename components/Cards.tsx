import {View, Text, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import images from "@/constants/images";
import icons from "@/constants/icons";
import {Models} from "react-native-appwrite";

interface Props{
    onPress?:()=>void;
    item:Models.Document;
}

const Cards = ({
                   item:{image,rating,price,name,address},
                   onPress}:Props) => {
    return (
        <TouchableOpacity onPress={onPress}
            className={"flex-1 flex-col items-start w-full " +
                "mt-4 px-3 py-4 rounded-lg bg-white shadow-lg " +
                "shadow-black-100/70 relative"}
        >

            <View className={"absolute  flex flex-row items-center px-2 top-5 right-5  bg-white/90 p-1 z-50 rounded-full"}>
                <Image source={icons.star} className={"size-2.5"}/>
                <Text className={"text-black-300 font-rubik-bold text-xs ml-0.5"}>{rating}</Text>
            </View>
            <Image source={{uri:image}} className={"w-full h-40 rounded-lg "}/>

            <View className={"flex flex-col mt-2"}>
                <Text className={"text-base font-rubik-bold text-black-300"} numberOfLines={1}>
                    {name}
                </Text>
                <Text className={"text-xs font-rubik text-black-200"} numberOfLines={1}>
                    {address}
                </Text>
                <View className={"flex flex-row w-full  items-center justify-between mt-2"}>
                    <Text className={"text-base font-rubik-bold text-primary-300 "} >${price}</Text>
                    <Image source={icons.heart} className={"size-5 mr-2"} tintColor={"#191d31"}/>
                </View>
            </View>

        </TouchableOpacity>
    )
}

const FeaturedCards = ({
                           item:{image,rating,price,name,address},
                           onPress}:Props) => {
    return (
        <TouchableOpacity onPress={onPress}
                          className={"flex flex-col items-start w-60 h-80 relative"}
        >
            <Image source={{uri:image}} className={"size-full rounded-2xl "}/>
            <Image source={images.cardGradient} className={"size-full absolute rounded-2xl bottom-0"} />

            <View className={"absolute top-5 right-5 flex flex-row items-center px-3 py-1.5 gap-1 bg-white/90 rounded-2xl"}>
                <Image source={icons.star} className={"size-3.5"}/>
                <Text className={"text-black-300 font-rubik-bold text-xs"}>{rating}</Text>
            </View>

            <View className={"flex flex-col absolute bottom-5 inset-x-5 items-start"}>
                <Text className={"text-xl font-rubik-extrabold text-white"} numberOfLines={1}>
                    {name}
                </Text>
                <Text className={"text-base font-rubik text-white"} numberOfLines={1}>
                    {address}
                </Text>
                <View className={"flex flex-row items-center justify-between mt-2 w-full"}>
                    <Text className={"text-xl font-rubik-extrabold text-white "} >${price}</Text>
                    <Image source={icons.heart} className={"size-5"}/>
                </View>
            </View>

        </TouchableOpacity>
    )
}

export {FeaturedCards,Cards}
