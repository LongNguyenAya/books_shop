class User {
    constructor(id, name, password_hash, email, avatarurl, role) {
        this.userid = id;
        this.username = name;
        this.password_hash = password_hash;
        this.email = email;
        this.avatarurl = avatarurl;
        this.role = role;
    }
}

module.exports = User;