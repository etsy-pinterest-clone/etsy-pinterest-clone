module.exports = {
    updateProfile: async (req, res) => {
        // console.log(req.session.user)
        const db = req.app.get('db');
        const {first_name, last_name, birthday, email, phone_number, username} = req.body;
        const phoneNumber = parseInt(phone_number);

        const[updateProfile] = await db.user.update_profile(first_name, last_name, birthday, email, phoneNumber, username,req.session.user.user_id)
        
        delete updateProfile.password;

        req.session.user = updateProfile;
        
        res.status(200).send(req.session.user)
        console.log(req.session.user)
    },

    // getUserData: (req, res) => {
    //     const db = req.app.get('db');
    //     const userId = req.body;
    //     const userData = {
    //         numOfPosts: , 
    //         numPostsUsersSaved: , 
    //         numOfVists: 
    //     };
    //     res.status(200).send(userData)

    // }
}