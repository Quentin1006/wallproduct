const uuid = require("uuid")

const users = [{
  id: 1,
  login: "test",
  pwd: "password"
}]

class Store {
  tokens = {}

  authorize (login, pwd) {
    const user = this.verifyCreds(login, pwd)

    if(!user) {
      return { error: true, reason: "UNKNOWN_USER"}
    }
    return this.createTokenForUser(user.id)
  }
 
  verifyCreds (login, pwd) {
    return users.find(u => (u.login === login && u.pwd === pwd))
  }

  createTokenForUser(id) {
    const generatedToken = `at-${uuid.v4()}`
    const tokenInfos = {
      id,
      token: generatedToken,
      expires: Date.now() + 5 * 60 * 1000 // valide 5 min 
    } 

    this.tokens[generatedToken] = tokenInfos
    return tokenInfos
  }

  verifyToken(token) {
    return this.tokens[token.replace("Bearer ", "")]
  }
}

module.exports = Store