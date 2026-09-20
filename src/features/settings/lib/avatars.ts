import type { ImageSourcePropType } from "react-native";

export type AvatarOption = {
  id: string;
  source: ImageSourcePropType;
};

export const DEFAULT_AVATAR_ID = "avatar-7";

export const AVATAR_OPTIONS: AvatarOption[] = [
  { id: "avatar-1", source: require("../../../../assets/images/avatars/avatar-1.png") },
  { id: "avatar-2", source: require("../../../../assets/images/avatars/avatar-2.png") },
  { id: "avatar-3", source: require("../../../../assets/images/avatars/avatar-3.png") },
  { id: "avatar-4", source: require("../../../../assets/images/avatars/avatar-4.png") },
  { id: "avatar-5", source: require("../../../../assets/images/avatars/avatar-5.png") },
  { id: "avatar-6", source: require("../../../../assets/images/avatars/avatar-6.png") },
  { id: "avatar-7", source: require("../../../../assets/images/avatars/avatar-7.png") },
  { id: "avatar-8", source: require("../../../../assets/images/avatars/avatar-8.png") },
  { id: "avatar-9", source: require("../../../../assets/images/avatars/avatar-9.png") },
  { id: "avatar-10", source: require("../../../../assets/images/avatars/avatar-10.png") },
  { id: "avatar-11", source: require("../../../../assets/images/avatars/avatar-11.png") },
  { id: "avatar-12", source: require("../../../../assets/images/avatars/avatar-12.png") },
];

export function getAvatarSource(avatarId: string | null | undefined): ImageSourcePropType {
  return AVATAR_OPTIONS.find((avatar) => avatar.id === avatarId)?.source ?? AVATAR_OPTIONS[0].source;
}
