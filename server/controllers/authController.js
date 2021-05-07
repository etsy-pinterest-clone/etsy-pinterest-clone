const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db');
        const {first_name, last_name, birthday, phone_number, email, username, password} = req.body;
        const phoneNumber = parseInt(phone_number);


        try {
            const [existingUser] = await db.auth.find_user_by_username(username);
            
            if (existingUser) {
                return res.status(409).send('Username already exists')
            }
            
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            
            const[newUser] = await db.auth.register_user(first_name, last_name, birthday, phoneNumber, email, username, hash)
            
            req.session.user = newUser;
            
            res.status(200).send(newUser)
        } catch (err) {
            console.log(err)
            return res.status(500).send('ERROR')
        }

    },
    login: async (req, res) => {
        const db = req.app.get('db');
        const { username, password } = req.body;

        try {
            const [ existingUser ] = await db.auth.find_user_by_username(username);
            
            if (!existingUser) {
                return res.status(404).send('User does not exist');
            }

            const isAuthenticated = bcrypt.compareSync(password, existingUser.password);

            if (!isAuthenticated) {
                return res.status(403).send('Incorrect email and/or password');
            }

            delete existingUser.password;

            req.session.user = existingUser;

            res.status(200).send(req.session.user);
        } catch (err) {
            console.log(err)
            return res.status(500).send('ERROR')
        }

    },
    deleteAccount: async (req, res) => {
        const db = req.app.get('db');
        const {user_id} = req.session.user

        await db.auth.delete_account(user_id)
        res.status(200).send('Account successfully deleted')
        
        await db.auth.delete_account(user_id)
        res.status(200).send('Account successfully deleted')
    },

    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },
    

//      IF NEEDED

    getSession: (req, res) => {
        if (req.session.user) {
            res.status(200).send(req.session.user);
        } else {
            res.sendStatus(403);
        }
    }
}

