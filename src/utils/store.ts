import * as SecureStore from 'expo-secure-store';

export const saveItemStore = async (key: string, value: any) => {
    await SecureStore.setItemAsync(key, value);
}

export const getItemStore = async (key: string) => {
    return await SecureStore.getItemAsync(key);
}

export const deleteItemStore = async (key: string) => {
    await SecureStore.deleteItemAsync(key);
}

const acTokenKey = 'ac_token'

export const getAcToken = async () => {
    return (await getItemStore(acTokenKey) || '') as any
}

export const setAcToken = async (token: string) => {
    await saveItemStore(acTokenKey, token)
}

export const removeAcToken = () => {
    deleteItemStore(acTokenKey)
}