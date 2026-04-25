class User {
    constructor(id, name, password, email, avatarurl, role) {
        this.userid = id;
        this.username = name;
        this.password = password;
        this.email = email;
        this.avatarurl = avatarurl;
        this.role = role;
    }
}

module.exports = User;