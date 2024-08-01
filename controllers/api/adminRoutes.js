const router = require("express").Router();
const { Admin } = require("../../models");

const withAuth = require("../../utils/auth");

//http request: /api/admins/
router.post("/", async (req, res) => {
    console.log('user route hit');
    try {
        const { email_address, password } = req.body;
        if (!email_address || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const adminData = await Admin.create({
            // username: req.body.username,
            email_address: email_address,
            password: body.password,
        });

        req.session.save(() => {
            req.session.logged_in = true;
            req.session.admin_id = adminData.id;
            // req.session.username = adminData.username;
            res.status(200).json(adminData);
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Admin signup failed" + error});
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
            req.session.username = adminData.username;
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


// UPDATE an admin http request: api/admins/:id
router.put('/:id', withAuth, async (req, res) => {
    try {
        console.log('in update route');
      const adminData = await Admin.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (!adminData[0]) {
        res.status(404).json({ message: 'No admin with this id!' });
        return;
      }
      res.status(200).json(adminData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;