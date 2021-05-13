module.exports = {
    updateProfile: async (req, res) => {
        //  console.log(req.session.user)
        const db = req.app.get('db');
        const {first_name, last_name, birthday, email, phone_number, username} = req.body;
        const phoneNumber = parseInt(phone_number);

        const[updateProfile] = await db.user.update_profile(first_name, last_name, birthday, email, phoneNumber, username,req.session.user.user_id)
        
        delete updateProfile.password;

        req.session.user = updateProfile;
        
        res.status(200).send(req.session.user)
        // console.log(req.session.user)
    },

    getUserData: async (req, res) => {
         const db = req.app.get('db');
         const {id} = req.params;
        //  console.log(id)
         const [userData] = await db.user.userData.get_user_data(id)
            if (userData){
                res.status(200).send(userData)
                }else{
                    res.status(400).send('data not found')
                }
    },
    

    updateUserData: async(req, res) => {rs

// UPDATE user_data SET user_id = $1, number_of_posts = $2, number_posts_others_saved = $3, profile_visits = $4, revenue = $5, average_rating = $6, store_visits = $7
// WHERE user_id = $8
// RETURNING *;
        const db = req.app.get('db');
        const {user_id, number_of_posts, number_posts_others_saved, profile_visits, revenue, average_rating, store_visits} = req.body;

        const[updateUserData] = await db.user.userData.update_user_data(user_id, number_of_posts, number_posts_others_saved, profile_visits, revenue, average_rating, store_visits, req.session.user.user_id)

        req.session.user = updateUserData;

        res.status(200).send(req.session.user)
        // console.log(req.session.user)
    }
}