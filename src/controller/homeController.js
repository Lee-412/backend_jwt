
const handleHomePage = (req, res) => {
    const name = "Lee";
    return res.render("home.ejs", { name })
}


module.exports = {
    handleHomePage,

}