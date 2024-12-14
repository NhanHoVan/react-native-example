import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import i18n from '../../../locales/i18n';
import { COLORS, SCREEN_W, SIZES } from '../../../utils/constant';
import IconButton from '../../common/IconButton';
import TextButton from '../../common/TextButton';
import { feedback } from '../../../config/api/feedback';
import { isEmpty } from '../../../utils/validate';
import Validate from '../../common/Validate';

const PopupFeedback: React.FC<any> = (props) => {
    const {show, idUser, onClose, textHeader, setMessageErr} = props

    const [subject, setSubject] = React.useState("")
    const [subjectErr, setSubjectErr] = React.useState("")
    const [content, setContent] = React.useState("")
    const [contentErr, setContentErr] = React.useState("")

    const handleSave = async () => {
        if (!checkValidate()) {
            try {
                let data = await feedback({
                    id_user: idUser,
                    subject: subject,
                    content: content
                })
                const dataRes = (JSON.parse(JSON.stringify(data)))
                if (dataRes.Status == 200) {
                    setMessageErr({
                        message: `Success`,
                        type: 'success'
                    })
                    handleClose()
                }
            } catch (error: any) {
                setMessageErr({
                    message: `${error}`,
                    type: 'error'
                })
            }
        }
    }

    const checkValidate = () => {
        let valid = false
        if (isEmpty(subject)) {
            setSubjectErr(i18n.t("validate.subjectRequire"))
            valid = true
        }
        if (isEmpty(content)) {
            setContentErr(i18n.t("validate.contentRequire"))
            valid = true
        }
        return valid
    }

    const handleClose = () => {
        setSubject("")
        setContent("")
        setContentErr("")
        setSubjectErr("")
        onClose()
    }

    return (
        <Modal
            transparent={true}
            statusBarTranslucent={true}
            visible={show}
            animationType="fade" >
            <TouchableOpacity
                style={{flex:1, backgroundColor: COLORS.dim}}
                disabled={true} >
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <Text style={styles.textHeader}>{textHeader}</Text>
                        <IconButton
                            style={styles.btnClose}
                            name={"times"}
                            size={SIZES.medium}
                            color={COLORS.primary}
                            handlePress={handleClose}
                        />
                    </View>

                    <View style={styles.body}>
                        <View> 
                            <Text>{i18n.t('text.feedbackSubject')}</Text>
                            <TextInput
                                style={styles.textInput}
                                keyboardType='default'
                                value={subject}
                                onBlur={() => {
                                    if (subject.trim().length > 0) {
                                        setSubjectErr("")
                                    }
                                }}
                                onChangeText={(subject) => setSubject(subject)}
                            />
                            <Validate
                                error={subjectErr}
                                name={"exclamation-circle"}
                                size={SIZES.small}
                                color={COLORS.red} />
                        </View>

                        <View> 
                            <Text>{i18n.t('text.feedbackContent')}</Text>
                            <TextInput
                                editable
                                multiline
                                numberOfLines={5}
                                style={[styles.textInput, styles.textArea]}
                                value={content}
                                onBlur={() => {
                                    if (content.trim().length > 0) {
                                        setContentErr("")
                                    }
                                }}
                                onChangeText={(content) => setContent(content)}
                            />
                            <Validate
                                error={contentErr}
                                name={"exclamation-circle"}
                                size={SIZES.small}
                                color={COLORS.red} />
                        </View>
                    </View>
                    <View style={styles.footer}>
                        <TextButton
                            style={styles.btnConfirm}
                            styleText={styles.textBtn}
                            text={i18n.t('text.send')}
                            handlePress={handleSave}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}

export default PopupFeedback;

const styles = StyleSheet.create({
    modal: {
        backgroundColor: "rgba(0,0,0,0.5)",
        opacity: 0.5
    },
    modalContent: {
        top: '30%',
        padding: 8,
        borderRadius: 12,
        width: SCREEN_W*0.9,
        position:'absolute',
        backgroundColor: COLORS.white,
        left: (SCREEN_W - SCREEN_W*0.9)/2,
    },
    header: {
        width: '100%',
        padding: 10,
        borderBottomWidth: 0.5,
        borderColor: COLORS.primary
    },
    textHeader: {
        textAlign: "center",
        color: COLORS.black,
        fontSize: SIZES.medium,
        fontWeight: "bold"
    },
    btnClose: {
        position: "absolute",
        top: 5,
        right: 10
    },
    textTitle: {
        color: COLORS.primary,
        fontWeight: "bold",
        alignSelf: 'center',
        fontSize: SIZES.medium
    },
    body: {
        marginTop: 10
    },
    textInput: {
        backgroundColor: COLORS.gray4,
        borderRadius: 3,
        marginVertical: 5,
        padding: 5,
        textAlignVertical: "top"
    },
    textArea: {
        height: 90
    },
    footer: {
        marginTop: 15,
        alignItems: "flex-end",
    },
    btnConfirm: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        alignItems: "center",
        backgroundColor: COLORS.green,
    },
    textBtn: {
        color: COLORS.white,
        fontSize: SIZES.medium,
        fontWeight: "bold",
    },
})