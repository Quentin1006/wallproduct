const uuid = require("uuid")

const users = [{
  id: 1,
  login: "test",
  pwd: "password"
}]

class Store {
  tokens = {}
  expirationTimeInMin
  constructor({expirationTimeInMin}) {
    this.expirationTimeInMin = expirationTimeInMin || 5 
  }

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
      expires: Date.now() + this.expirationTimeInMin * 60 * 1000 // valide 5 min 
    } 

    this.tokens[generatedToken] = tokenInfos
    return tokenInfos
  }

  verifyToken(token = "") {
    const tokenInfos = this.tokens[token.replace("Bearer ", "")] 
    return tokenInfos?.expires > Date.now()
  }
}

module.exports = Store