import React from 'react'
import { View, StyleSheet, ImageBackground, Text } from 'react-native'
import { BACKGROUND_SOURCE, COLORS, SCREEN_H, SIZES } from "../utils/constant";
import { RootStackParamList } from '../types/RouteScreen';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Header from '../components/header/Header';
import { ScrollView } from 'react-native-gesture-handler';
import EditProfile from '../components/pages/editAccount/EditProfile';
import { authNavi, userType } from '../types';
import TextButton from '../components/common/TextButton';
import i18n from '../locales/i18n';
import { getItemStore } from '../utils/store';

type detailParam = RouteProp<RootStackParamList, "EditAccount">;

const EditAccount: React.FC = () => {
    const navigation = useNavigation<authNavi>();
    const {params:{name, param}} = useRoute<detailParam>();

    const [user, setUser] = React.useState<userType>();

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
        navigation.navigate("Account", {name: "Account"});
    };

    const handleDeleteAccount = () => {
        //
    }

    return (
        <ImageBackground source={BACKGROUND_SOURCE} style={styles.imageBackground}>
            <View style={styles.top}></View>
            <Header handleBackScreen={handleBackScreen} />
            <ScrollView style={styles.body}>

                <EditProfile user={user}/>

                <View style={styles.deleteAccount}>
                    <Text style={styles.textInfor}>{i18n.t('text.deleteInfor')}</Text>
                    <TextButton
                        style={styles.btnText}
                        styleText={styles.textBtn}
                        text={i18n.t('text.delete')}
                        handlePress={handleDeleteAccount}
                    />
                </View>

            </ScrollView>
        </ImageBackground>
    )
}

export default EditAccount;

const styles = StyleSheet.create({
    imageBackground: {
        resizeMode: 'cover',
        height: '100%'
    },
    top: {
        height: 30,
    },
    body: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 20,
        height: SCREEN_H - 64,
    },
    deleteAccount: {
        height: 60,
        marginVertical: 30,
        paddingHorizontal: 10,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center'
    },
    btnText: {
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 13,
        backgroundColor: COLORS.red,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInfor: {
        color: COLORS.red
    },
    textBtn: {
        color: COLORS.white,
        fontSize: SIZES.medium
    }
})