const router = require("express").Router();
const { Admin } = require("../../models");

//http request: /api/admins/
router.post("/", async (req, res) => {

    try {

        const { email_address, password } = req.body;
        if (!email_address || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const adminData = await Admin.create(req.body);

        req.session.save(() => {
            req.session.admin_id = adminData.id;
            req.session.logged_in = true;

            res.status(200).json(adminData);
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Admin signup failed"});
    }
});

//http request: /api/admins/login
router.post("/login", async (req, res) => {
    try {

        const { email_address, password } = req.body;
        if (!email_address || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const adminData = await Admin.findOne({ where: { email_address } });
        if (!adminData) {
            res
            .status(400)
            .json({ message: "Incorrect email or password, please try again" });
            return;
        }

        const validPassword = await adminData.checkPassword(req.body.password);

        if (!validPassword) {
          res
            .status(400)
            .json({ message: 'Incorrect email or password, please try again' });
          return;
        }

        req.session.save(() => {
            req.session.admin_id = adminData.id;
            req.session.logged_in = true;

            res.json({ admin: adminData, message : "You are now logged in" });
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Log in failed"});
    }
});

//http request localhost:3001/api/admins/logout

router.post("/logout", (req, res) => {
    console.log('Session object before destroy:', req.session);
    if(req.session.logged_in) {
        console.log('logged in');
        req.session.destroy(err => {
            if (err) {
                console.error('Error destroying session:', err);
                res.status(500).json({ message: 'Failed to destroy session' });
            } else {
                console.log('Session destroyed');
                res.status(204).end();
            }
        })
    } else {
        console.log('not logged in');
        res.status(404).end();
    }
});

module.exports = router;