export const get = (user: any) => {
  let avatarSrc = '';
  if (user.avatar) {
    avatarSrc = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`;
  } else {
    const defaultAvatarIndex = (BigInt(user.id) >> 22n) % 6n;
    avatarSrc = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarIndex}.png`
  }
  return avatarSrc;
}