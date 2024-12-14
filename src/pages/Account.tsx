import { View, Text, ImageBackground, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import React from 'react';
import Header from "../components/header/Header";
import { BACKGROUND_SOURCE, COLORS, SCREEN_H, SIZES } from "../utils/constant";
import { RootStackParamList } from "../types/RouteScreen";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { userType, messageType, authNavi } from '../types';
import Profile from '../components/pages/account/Profile';
import Message from '../components/common/Message';
import { initMessage } from '../utils/common';
import { getItemStore } from '../utils/store';
import i18n from '../locales/i18n';
import TextButton from '../components/common/TextButton';
import PopupFeedback from '../components/pages/account/PopupFeedback';

type detailParam = RouteProp<RootStackParamList, "Account">;

const Account: React.FC = () => {
    const navigation = useNavigation<authNavi>();
    const {params:{name}} = useRoute<detailParam>();

    const [user, setUser] = React.useState<userType>();
    const [message, setMessage] = React.useState<messageType>(initMessage);
    const [isShowPopup, setIsShowPopup] = React.useState(false);

    React.useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        await getItemStore('user').then((dataUser) => {
          if (dataUser != null) {
            let user = JSON.parse(JSON.parse(JSON.stringify(dataUser)));
            setUser(user);
          }
        });
    }
  
    const handleBackScreen = () => {
        navigation.navigate("ListTopic", {name: "ListTopic"});
    };

    const handleDetailStory = (id: number) => {
        navigation.navigate('DetailStory', { name: 'DetailStory', param: {categoryId: id, id: id} });
    }

    const handleEditAccount = () => {
        // navigation.navigate('EditAccount', { name: 'EditAccount' });
    }

    const handleUpdateAvatar = () => {
        //
    }

    return (
        <ImageBackground source={BACKGROUND_SOURCE} style={styles.imageBackground}>
            <View style={styles.top}></View>
            <Header handleBackScreen={handleBackScreen} />
            <ScrollView style={styles.body}>
                <Profile
                    user={user}
                    handleEditAccount={handleEditAccount}
                    handleUpdateAvatar={handleUpdateAvatar}
                />

                <PopupFeedback
                    show={isShowPopup}
                    idUser={user?.id}
                    onClose={()=>setIsShowPopup(false)}
                    textHeader={i18n.t('text.feedback')}
                    setMessageErr={(message: messageType)=>setMessage(message)}
                />
                <View style={styles.feedback}>
                    <Text>{i18n.t('text.feedbackLabel')}</Text>
                    <TextButton
                        style={styles.btnText}
                        styleText={styles.textBtn}
                        text={i18n.t('text.feedback')}
                        handlePress={()=>setIsShowPopup(true)}
                    />
                </View>
            </ScrollView>
            
            <SafeAreaView>
                { message.message.length > 0 ?
                    <Message
                        visible={message.message.length > 0}
                        type={message.type}
                        message={message.message}
                        closeMessage={()=>setMessage(initMessage)}
                    />
                : null }
            </SafeAreaView>
        </ImageBackground>
  )
}

export default Account;

const styles = StyleSheet.create({
    imageBackground: {
        resizeMode: 'cover',
        height: '100%'
    },
    top: {
        height: 30,
    },
    body: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 20,
        height: SCREEN_H - 64,
    },
    feedback: {
        minHeight: 60,
        marginVertical: 30,
        marginHorizontal: 5,
        paddingHorizontal: 10,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center'
    },
    btnText: {
        borderRadius: 5,
        marginTop: 10,
        paddingVertical: 5,
        paddingHorizontal: 13,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textBtn: {
        color: COLORS.white,
        fontSize: SIZES.medium
    }
})

