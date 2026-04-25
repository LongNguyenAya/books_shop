class HomeController {
    // [GET] /home
    index(req, res) {
        res.send('home');
    }
}

module.exports = new HomeController();