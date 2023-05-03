const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');

module.exports = {
    // getUser
    async getUser(req, res) {
        try {
          const user = await User.find();
    
        //   const userObj = {
        //     user,
        //     headCount: await headCount(),
        //   };
    
        //   res.json(userObj);
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
      },

    // getSingleUser
    async getSingleUser(req, res) {
        try {
          const user = await User.findOne({ _id: req.params.userId })
            .select('-__v');
    
          if (!user) {
            return res.status(404).json({ message: 'No user with that ID' })
          }
    
          res.json({
            user,
            grade: await grade(req.params.userId),
          });
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
      },
    // createUser
    async createUser(req, res) {
        try {
          const user = await User.create(req.body);
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
    // updateUser

    // deleteUser
    async deleteUser(req, res) {
        try {
          const user = await User.findOneAndRemove({ _id: req.params.studentId });
    
          if (!user) {
            return res.status(404).json({ message: 'No such user exists' });
          }
    
          const course = await Course.findOneAndUpdate(
            { users: req.params.userId },
            { $pull: { users: req.params.userId } },
            { new: true }
          );
    
          if (!course) {
            return res.status(404).json({
              message: 'Student deleted, but no courses found',
            });
          }
    
          res.json({ message: 'Student successfully deleted' });
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },
    // addFriend,
    // deleteFriend
}