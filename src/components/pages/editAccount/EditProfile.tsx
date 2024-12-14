import { View, Text, StyleSheet, TextInput, SafeAreaView } from 'react-native'
import { COLORS, SIZES, SCREEN_W } from '../../../utils/constant'
import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState } from 'react'
import i18n from '../../../locales/i18n';
import Validate from '../../common/Validate';
import TextButton from '../../common/TextButton';
import { messageType } from '../../../types';
import { initLang, initMessage } from '../../../utils/common';
import { changePassword, updateUser } from '../../../config/api/user';
import { isEmpty, isEqual } from '../../../utils/validate';
import Message from '../../common/Message';

const EditProfile: React.FC<any> = (props) => {
    const { user } = props

    const [account, setAccount] = useState('');
    const [accountErr, setAccountErr] = useState('');
    const [email, setEmail] = useState('');

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [items, setItems] = useState<any>();

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [oldPasswordErr, setOldPasswordErr] = useState('');
    const [newPasswordErr, setNewPasswordErr] = useState('');
    const [rePasswordErr, setRePasswordErr] = useState('');

    const [message, setMessage] = React.useState<messageType>(initMessage);
    
    React.useEffect(() => {
        setItemDropdown();
        if (user) {
            setAccount(user.name)
            setEmail(user.email)
        }
    }, [user]);

    const setItemDropdown = () => {
        const newItem = initLang.map((item) => {
            return { value : item.lang, label : item.label }
        })
        setItems(newItem);
        setValue('vi')
    }

    const handleUpdateUser = async () => {
        if (!checkValidateAccount()) {
            try {
                let data = await updateUser(user.id, {name: account})
                const dataRes = (JSON.parse(JSON.stringify(data)))
                if (dataRes) {
                    setMessage({
                        message: `Success`,
                        type: 'success'
                    })
                }
            } catch (error: any) {
                setMessage({
                    message: `${error}`,
                    type: 'error'
                })
            }
        }
    }

    const checkValidateAccount = () => {
        let valid = false
        if (isEmpty(account)) {
            setAccountErr(i18n.t("validate.userNameRequire"))
            valid = true
        }
        return valid
    }

    const handleChangePassword = async () => {
        if (!checkValidatePassword()) {
            try {
                let data = await changePassword({
                    oldPassword: oldPassword,
                    newPassword: newPassword
                })
                const dataRes = (JSON.parse(JSON.stringify(data)))
                if (dataRes) {
                    setMessage({
                        message: `Success`,
                        type: 'success'
                    })
                }
            } catch (error: any) {
                setMessage({
                    message: `${error}`,
                    type: 'error'
                })
            }
        }
    }

    const checkValidatePassword = () => {
        let valid = false
        if (isEmpty(oldPassword)) {
            setOldPasswordErr(i18n.t("validate.passwordRequire"))
            valid = true
        }
        if (isEmpty(newPassword)) {
            setNewPasswordErr(i18n.t("validate.passwordRequire"))
            valid = true
        }
        if (isEmpty(rePassword)) {
            setRePasswordErr(i18n.t("validate.passwordRequire"))
            valid = true
        } else if (!isEqual(newPassword, rePassword)) {
            setRePasswordErr(i18n.t("validate.rePasswordEqual"))
            valid = true
        }
        return valid
    }

    const handleUpdateAvatar = () => {
        //
    }

    return (
        <View style={styles.form} >

            <View style={styles.avatarUser}>
                <TextButton
                    style={styles.btnAvatar}
                    styleText={styles.textName}
                    text={user && user.name.substring(0,1)}
                    handlePress={handleUpdateAvatar}
                />
            </View>

            <View style={styles.informationZone}>
                <View style={styles.rowForm}>
                    <Text style={styles.label}>{i18n.t('text.nameAccount')}</Text>
                    <TextInput
                        style={styles.inputText}
                        value={account}
                        onChangeText={(account) => setAccount(account)}
                        onBlur={() => {
                            if (account.trim().length > 0) {
                                setAccountErr("")
                            }
                        }}
                    />
                    <Validate
                        error={accountErr}
                        name={"exclamation-circle"}
                        size={SIZES.small}
                        color={COLORS.red} />
                </View>

                <View style={styles.rowForm}>
                    <Text style={styles.label}>{i18n.t('text.email')}</Text>
                    <TextInput
                        editable={false}
                        style={styles.inputText}
                        keyboardType='default'
                        value={email}
                    />
                </View>

                <View style={[styles.rowForm, styles.dropdownContainer]}>
                    <Text style={styles.label}>{i18n.t('text.language')}</Text>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        dropDownContainerStyle={{
                            borderRadius: 10,
                            backgroundColor: COLORS.gray4,
                            borderTopWidth: 0.2,
                            borderWidth: 0,
                        }}
                        listMode="SCROLLVIEW"
                        scrollViewProps={{
                            nestedScrollEnabled: true,
                        }}
                        multiple={false}
                        style={styles.dropdown}
                    />
                </View>
            </View>
            <View style={styles.btnAction}>
                <TextButton
                    style={styles.btnText}
                    styleText={styles.textBtn}
                    text={i18n.t('text.save')}
                    handlePress={handleUpdateUser}
                />
            </View>

            <View style={styles.line}></View>

            <View style={styles.rowForm}>
                <Text style={styles.label}>{i18n.t('text.oldPassword')}</Text>
                <TextInput
                    style={styles.inputText}
                    value={oldPassword}
                    secureTextEntry={true}
                    onChangeText={(oldPassword) => setOldPassword(oldPassword)}
                    onBlur={() => {
                        if (oldPassword.trim().length > 0) {
                            setOldPasswordErr("")
                        }
                    }}
                />
                <Validate
                    error={oldPasswordErr}
                    name={"exclamation-circle"}
                    size={SIZES.small}
                    color={COLORS.red} />
            </View>

            <View style={styles.rowForm}>
                <Text style={styles.label}>{i18n.t('text.newPassword')}</Text>
                <TextInput
                    style={styles.inputText}
                    value={newPassword}
                    secureTextEntry={true}
                    onChangeText={(newPassword) => setNewPassword(newPassword)}
                    onBlur={() => {
                        if (newPassword.trim().length > 0) {
                            setNewPasswordErr("")
                        }
                    }}
                />
                <Validate
                    error={newPasswordErr}
                    name={"exclamation-circle"}
                    size={SIZES.small}
                    color={COLORS.red} />
            </View>

            <View style={styles.rowForm}>
                <Text style={styles.label}>{i18n.t('text.rePassword')}</Text>
                <TextInput
                    style={styles.inputText}
                    value={rePassword}
                    secureTextEntry={true}
                    onChangeText={(rePassword) => setRePassword(rePassword)}
                    onBlur={() => {
                        if (rePassword.trim().length > 0) {
                            setRePasswordErr("")
                        }
                    }}
                />
                <Validate
                    error={rePasswordErr}
                    name={"exclamation-circle"}
                    size={SIZES.small}
                    color={COLORS.red} />
            </View>
            <View style={styles.btnAction}>
                <TextButton
                    style={styles.btnText}
                    styleText={styles.textBtn}
                    text={i18n.t('text.change')}
                    handlePress={handleChangePassword}
                />
            </View>
            <SafeAreaView>
            { message.message.length > 0 ?
                <Message
                visible={message.message.length > 0}
                type={message?.type}
                message={message?.message}
                closeMessage={()=>setMessage(initMessage)}
                />
            : null }
            </SafeAreaView>
        </View>
    )
}

export default EditProfile;

const styles = StyleSheet.create({
    form: {
        backgroundColor: COLORS.white,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        flex: 1,
    },
    avatarUser: {
        width: SCREEN_W*0.3,
        aspectRatio: 1,
        borderRadius: 100,
        backgroundColor: "#d9004c",
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 3,
        left: (SCREEN_W - SCREEN_W*0.3 - 20)/2
    },
    btnAvatar: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    textName: {
        fontSize: SIZES.xxxLarge,
        textAlign: "center",
        color: COLORS.white,
    },
    informationZone: {
        zIndex: 1,
    },
    rowForm: {
        paddingVertical: 5
    },
    label: {
        marginVertical: 3,
    },
    inputText: {
        backgroundColor: COLORS.gray4,
        borderRadius: 5,
        padding: 5,
        zIndex: 1,
        minHeight: 40
    },
    btnAction: {
        marginVertical: 10,
        alignItems: "flex-end"
    },
    btnText: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 5,
        alignItems: "center",
        backgroundColor: COLORS.primary,
    },
    textBtn: {
        color: COLORS.white,
        fontSize: SIZES.medium,
        fontWeight: "bold",
    },
    dropdownContainer: {
        zIndex: 2
    },
    dropdown: {
        minHeight: 40,
        borderRadius: 5,
        borderWidth: 0,
        backgroundColor:COLORS.gray4,
    },
    line: {
        height: 1,
        marginBottom: 3,
        marginLeft: 5,
        backgroundColor: COLORS.gray4,
    }
})