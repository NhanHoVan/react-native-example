export type authNavi = StackNavigationProp<RootStackParamList>;

export type userType = {
    id: number,
    avatar: string,
    name: string,
    phoneNumber: string,
    email: string,
    token: string
}

export type messageType = {
    message: string,
    type: string,
    duration?: number
}

export type langType = {
    lang: string,
    label: string,
    source: string
}
