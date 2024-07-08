const router = require("express").Router();
const { Admin } = require("../../models");

router.post("/", async (req, res) => {
    console.log("here");
    try {
        const adminData = await Admin.create(req.body);
        console.log("here now");

        req.session.save(() => {
            req.session.admin_id = adminData.id;
            req.session.logged_in = true;
            res.status(200).json(adminData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post("/login", async (req, res) => {
    try {
        const adminData = await Admin.findOne({ where: { email_address: req.body.email_address } });
        if (!adminData) {
            res
            .status(400)
            .json({ message: "Incorrect email or password, please try again" });
            return;
        }
        req.session.save(() => {
            req.session.admin_id = adminData.id;
            req.session.logged_in = true;

            res.json({ admin: adminData, message : "You are now logged in" });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post("logout", (req, res) => {
    if(req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;