export const secondsToTime = e => {
  const h = Math.floor(e / 3600)
      .toString()
      .padStart(2, '0'),
    m = Math.floor((e % 3600) / 60)
      .toString()
      .padStart(2, '0'),
    s = Math.floor(e % 60)
      .toString()
      .padStart(2, '0');

  return h + ':' + m + ':' + s;
};

export const findUser = (uuid, users) => users.find(u => u.login.uuid === uuid);
