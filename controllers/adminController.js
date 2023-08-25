const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');
const Order = require('../models/Order');
const User = require('../models/User');
const PetItem = require('../models/PetItem');
const Twit = require('twit');
const Chat = require('../models/Chat');

let T = new Twit({
   consumer_key: process.env.TWITTER_CONSUMER_KEY,
   consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
   access_token: process.env.TWITTER_ACCESS_TOKEN,
   access_token_secret: process.env.TWITTER_TOKEN_SECRET,
   timeout_ms: 60 * 1000,
});


exports.postTweet = async (req, res) => {
   const tweet = req.body.status;
   T.post('statuses/update', { status: tweet }, function (error, data, response) {
       if (error) res.json({ msg: 'Failed to post tweet', error: error });
       else res.json({ msg: 'Tweet posted successfully' });
   });
}; 


exports.checkAdmin = (req, res, next) => {
    if (req.session.username === 'admin') {
        next();
    } else {
        res.send('<script>alert(" You are not an admin!!!!!!"); window.location.href = "/";</script>');
    }
}

exports.getSalesData = async (req, res) => {
    try {
        // Use the `await` keyword to pause execution until the aggregation result is retrieved.
        const salesData = await Order.aggregate([
            // First aggregation stage: Match documents where the `isOrdered` field is true.
            {
                $match: { isOrdered: true }
            },
            // Second aggregation stage: Unwind the `orderedItems` array.
            {
                $unwind: "$orderedItems"
            },
            // Third aggregation stage: Perform a lookup to fetch additional data from the 'petitems' collection.
            {
                $lookup: {
                    from: 'petitems',
                    localField: 'orderedItems',
                    foreignField: '_id',
                    as: 'petite'
                }
            },
            // Fourth aggregation stage: Unwind the `petitem` array (likely a typo, should be `petite`).
            {
                $unwind: "$petite"
            },
            // Fifth aggregation stage: Group the data by month and year, calculating the total sales for each group.
            {
                $group: {
                    _id: { month: { $month: "$orderDate" }, year: { $year: "$orderDate" } },
                    totalSales: { $sum: "$petite.price" }
                }
            },
            // Sixth aggregation stage: Project the necessary fields and rename some fields.
            {
                $project: {
                    _id: 0,
                    month: "$_id.month",
                    year: "$_id.year",
                    sales: "$totalSales"
                }
            },
            // Seventh aggregation stage: Sort the results by year and month in ascending order.
            {
                $sort: { year: 1, month: 1 }
            }
        ]);

        // Send the aggregated sales data as a JSON response.
        res.json(salesData);
    } catch (err) {
        // If an error occurs during the aggregation process, send a 500 (Internal Server Error) response.
        res.status(500).json({ message: err.message });
    }
};

exports.getChats = async (req, res) => {
   try {
       const chats = await Chat.find({
           $or: [
               { from: req.params.username, to: 'admin' },
               { from: 'admin', to: req.params.username }
           ]
       });
       res.json(chats);
   } catch (err) {
       console.error(err);
       res.status(500).send('Server Error');
   }
};

exports.getUsers = async (req, res) => {
   try {
       const usersToAdmin = await Chat.distinct('from', { to: 'admin' });
       const usersFromAdmin = await Chat.distinct('to', { from: 'admin' });
       const users = [...new Set([...usersToAdmin, ...usersFromAdmin])];
       res.json(users);
   } catch (err) {
       console.error(err);
       res.status(500).send('Server Error');
   }
};

exports.getOrdersData = async (req, res) => {
   try {
       const ordersData = await Order.aggregate([
         
       ]);

       res.json(ordersData);
   } catch (err) {
       res.status(500).json({ message: err.message });
   }
};

exports.updatePet = async (req, res) => {
   const { id } = req.params;
   const { name, breed, image } = req.body;
   try {
       await Pet.findByIdAndUpdate(id, { name, breed, image });
       res.status(200).send();
   } catch (err) {
       res.status(500).send(err.message);
   }
};

exports.getPetsItems = async (req, res) => {
   try {
       const petItems = await PetItem.find({ petId: req.params.id });
       res.render('adminPetItems', { petItems: petItems });
   } catch (err) {
       res.status(500).send(err.message);
   }
};

exports.getAdminChat = async (req, res) => {
   res.render('adminChat');
};

exports.createUser = async (req, res) => {
   const { username, password } = req.body;
   const user = new User({ username, password });

   try {
       await user.save();
       res.status(200).send();
   } catch (err) {
       res.status(500).send(err.message);
   }
};

exports.updateUser = async (req, res) => {
   const { id } = req.params;
   const { username, password } = req.body;

   try {
       await User.findByIdAndUpdate(id, { username, password });
       res.status(200).send();
   } catch (err) {
       res.status(500).send(err.message);
   }
};

exports.deleteUser = async (req, res) => {
   const { id } = req.params;
   try {
       await User.findByIdAndRemove(id);
       res.status(200).send();
   } catch (err) {
       res.status(500).send(err.message);
   }
};


exports.deleteOrder = async (req, res) => {
   const { id } = req.params;
   try {
       await Order.findByIdAndRemove(id);
       res.status(200).send();
   } catch (err) {
       res.status(500).send(err.message);
   }
};

exports.deletepet =  async (req, res) => {
    const { id } = req.params;
    try {
        await Pet.findByIdAndDelete(id);
        res.status(200).send();
    } catch (err) {
        res.status(500).send(err.message);
    }
};


exports.deletpetItems = async (req, res) => {
    const { id } = req.params;
    try {
        await PetItem.findByIdAndDelete(id);
        res.status(200).send();
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.updatePetItem = async (req, res) => {
   const { id } = req.params;
   const { name, description, image } = req.body;
   try {
       await PetItem.findByIdAndUpdate(id, { name, description, image });
       res.status(200).send();
   } catch (err) {
       res.status(500).send(err.message);
   }
};

exports.createPet = async (req, res) => {
   const { name, breed, image } = req.body;
   const pet = new Pet({ name, breed, image });
   try {
       await pet.save();
       res.status(200).send();
   } catch (err) {
       res.status(500).send(err.message);
   }
};

exports.showAdminPanel = (req, res) => {
   res.render('adminPanel');
};

exports.showPets = async (req, res) => {
   const pets = await Pet.find({});
   res.render('adminPets', { pets });
};

exports.showOrders = async (req, res) => {
    const orders = await Order.find({}).populate('orderedItems');
    res.render('adminOrders', { orders });
};

exports.showUsers = async (req, res) => {
    const users = await User.find({});
    res.render('adminUsers', { users });
};

exports.showGraphs = (req, res) => {
    res.render('graphs');
};

exports.showChats = (req, res) => {
    res.render('adminChat'); 
};


