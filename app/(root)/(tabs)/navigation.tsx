import React, { useState, useCallback, useEffect } from "react";
import {View, Text, KeyboardAvoidingView, Keyboard, Platform, Button} from "react-native";
import { GiftedChat, Send, IMessage } from "react-native-gifted-chat";
import {fetchAPI} from "@/lib/fetch";

const ChatScreen = () => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: "Hello! How can I assist you today?",
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: "Botpress Assistant",
                    avatar: "https://i.pravatar.cc/300",
                },
            },
        ]);

        const showSubscription = Keyboard.addListener("keyboardDidShow", () =>
            setIsKeyboardVisible(true)
        );
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () =>
            setIsKeyboardVisible(false)
        );

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const chatreq=async()=>{
        try{
            const res =await fetch("/(api)/chat", {
                method: "POST",
                body: JSON.stringify({
                    message: "Hello! How can I assist you today?",
                }),
            })
            console.log({res});
        }
        catch (error) {
            console.log(error);
        }
    }

    const onSend = useCallback((newMessages = []) => {

        setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
    }, []);

    const renderSend = (props: any) => (
        <Send {...props}>
            <View className="flex-row items-center justify-center bg-blue-500 px-4 py-2 rounded-full mr-2 mb-2">
                <Text className="text-white font-bold">Send</Text>
            </View>
        </Send>
    );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            className={`flex-1 bg-white ${isKeyboardVisible ? "mb-0" : "mb-20"}`}
        >
            <Button title={"Request"} onPress={() =>chatreq()} />
            <GiftedChat
                messages={messages}
                onSend={(newMessages) => onSend(newMessages)}
                user={{
                    _id: 1,
                }}
                placeholder="Type your message..."
                alwaysShowSend
                renderSend={renderSend}
                renderAvatarOnTop
                showAvatarForEveryMessage
                scrollToBottom
                textInputStyle={{
                    borderWidth: 1,
                    borderColor: "black",
                    borderRadius: 25, // Capsule shape
                    paddingHorizontal: 15,
                    paddingVertical: 5,
                    margin: 5,
                    backgroundColor: "white",
                }}
            />
        </KeyboardAvoidingView>
    );
};

export default ChatScreen;
