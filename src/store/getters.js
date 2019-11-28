const getters = {
  token: state => state.user.token,
  headImg: state => state.user.headImg,
  account: state => state.user.account,
  nick: state => state.user.nick,
  roles: state => state.user.roles
}
export default getters
