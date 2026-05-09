// models/user.model.js

class User {
  constructor({ userid, username, password_hash, email, email_verified, verify_token, verify_token_expired, avatarurl, role, is_active, createdat, updatedat }) {
    this.userid = userid
    this.username = username
    this.password_hash = password_hash
    this.email = email
    this.email_verified = email_verified
    this.verify_token = verify_token
    this.verify_token_expired = verify_token_expired
    this.avatarurl = avatarurl
    this.role = role
    this.is_active = is_active
    this.createdat = createdat
    this.updatedat = updatedat
  }
}

module.exports = User