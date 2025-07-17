const Follower = require("../models/follower");
const User = require("../models/user");


const obtenerFollows = async(req,res) => {
    try{
        const followers = await Follower.find().select('-__v');
        if(!followers || followers.length === 0){
            return res.status(404).json({message: "No se encontraron seguidores"});
        }
        res.status(200).json(followers);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}


const obtenerSeguidores = async(req,res) => {
    const userId = req.params.userId;
    try {
        const followers = await Follower.find({ followed: userId }).select('follower').populate('follower', 'nickName');
        if (!followers || followers.length === 0) {
            return res.status(404).json({ message: "No se encontraron seguidores para este usuario" });
        }
        res.status(200).json(followers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const obtenerSeguidos = async(req,res) => {
    const userId = req.params.userId;
    try {
        const following = await Follower.find({ follower: userId }).select('followed').populate('followed', 'nickName');
        if (!following || following.length === 0) {
            return res.status(404).json({ message: "No se encontraron seguidos para este usuario" });
        }
        res.status(200).json(following);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const seguir = async(req,res) => {
    const userId = req.params.userId;
    const followedUserId = req.body.followedUserId;

    if (!followedUserId) {
        return res.status(400).json({ message: "El ID del usuario a seguir es requerido" });
    }

    try {
        // Verificar si ya se sigue al usuario
        const existingFollow = await Follower.findOne({ follower: userId, followed: followedUserId });
        if (existingFollow) {
            return res.status(400).json({ message: "Ya sigues a este usuario" });
        }

        // Crear un nuevo seguimiento
        const newFollow = new Follower({
            follower: userId,
            followed: followedUserId
        });

        await newFollow.save();

        const followedUser = await User.findById(followedUserId);
        const user = await User.findById(userId);

        user.following.push(followedUser._id)
        await user.save()
        followedUser.followers.push(user._id)
        await followedUser.save()

        res.status(201).json({ message: "Usuario seguido correctamente", follow: newFollow });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const unfollow = async(req,res) => {
    const userId = req.params.userId;
    const unfollowedUserId = req.params.unfollowedUserId;

    try {
        // Verificar si existe el seguimiento
        const existingFollow = await Follower.findOne({ follower: userId, followed: unfollowedUserId });
        if (!existingFollow) {
            return res.status(404).json({ message: "No sigues a este usuario" });
        }

        // Eliminar el seguimiento
        await Follower.deleteOne({ _id: existingFollow._id });

        const unfollowedUser = await User.findById(unfollowedUserId);
        const user = await User.findById(userId);

        user.following.pull(unfollowedUser._id)
        await user.save()
        unfollowedUser.followers.pull(user._id)
        await unfollowedUser.save()

        res.status(200).json({ message: "Usuario dejado de seguir correctamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports={
    obtenerFollows,
    obtenerSeguidores,
    obtenerSeguidos,
    seguir,
    unfollow
}