import { View, Text, StyleSheet } from 'react-native'
import { SIZES, COLORS } from '../../../utils/constant'
import React, { useState } from 'react'
import i18n from '../../../locales/i18n';
import TextButton from '../../common/TextButton';
import IconButton from '../../common/IconButton';
import { langType } from '../../../types';
import { getItemStore } from '../../../utils/store';
import { initLang } from '../../../utils/common';


const Profile: React.FC<any> = (props) => {
    const {user, handleUpdateAvatar, handleEditAccount} = props;

    const [langUser, setLangUser] = useState<langType>()

    React.useEffect(() => {
        getLangUser()
    }, []);

    const getLangUser = async () => {
        await getItemStore('lang').then((lang) => {
            if (lang != null) {
                setLangUser(initLang.find(item => item.lang === lang))
            }
        });
    }

    return (
        <View style={styles.profile}>
            <View style={styles.avatarUser}>
                <TextButton
                    style={styles.btnText}
                    styleText={styles.textBtn}
                    text={user && user.name.substring(0,1)}
                    handlePress={handleUpdateAvatar}
                />
            </View>

            <View style={styles.textProfile}>
                <Text style={styles.textName}>{user && user.name}</Text>
                <Text style={styles.text}>{i18n.t('text.phoneNumberUser')}: {user && user.phoneNumber}</Text>
                <Text style={styles.text}>{i18n.t('text.email')}: {user && user.email}</Text>
                <Text style={styles.text}>{i18n.t('text.language')}: {langUser?.label}</Text>
            </View>

            <IconButton
                style={styles.btnEdit}
                name={"edit"}
                size={SIZES.medium}
                color={COLORS.gray2}
                handlePress={handleEditAccount}
            />
        </View>
    )
}

export default Profile;

const styles = StyleSheet.create({
    profile: {
        paddingStart: 30,
        borderRadius: 10,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 5
    },
    avatarUser: {
        width: "25%",
        aspectRatio: 1,
        borderRadius: 100,
        backgroundColor: "#d9004c",
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 3,
    },
    btnText: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    textBtn: {
        padding: 4,
        fontSize: SIZES.xxxLarge + 10,
        textAlign: "center",
        color: COLORS.white,
    },
    textProfile: {
        paddingLeft: 15,
        marginVertical: 13,
    },
    textName: {
        fontSize: SIZES.xLarge,
        fontWeight: '600',
    },
    text: {
        fontSize: SIZES.small,
        paddingLeft: 3,
    },
    btnEdit: {
        position: "absolute",
        top: 15,
        right: 30
    }
})