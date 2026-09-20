import AsyncStorage from "@react-native-async-storage/async-storage";

const CACHED_USER_KEY = "auth_cached_user";

export const getCachedUser = (): Promise<string | null> => AsyncStorage.getItem(CACHED_USER_KEY);

export const setCachedUser = (value: string): Promise<void> => AsyncStorage.setItem(CACHED_USER_KEY, value);

export const removeCachedUser = (): Promise<void> => AsyncStorage.removeItem(CACHED_USER_KEY);
