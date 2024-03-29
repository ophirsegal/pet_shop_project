const mongoose = require('mongoose');
const User = require('./models/User');
const Pet = require('./models/Pet');
const PetItem = require('./models/PetItem');
const Branch = require('./models/Branch'); 
const Order = require('./models/Order');

mongoose.connect('mongodb://localhost/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const seedDB = async () => {
    // Remove all existing data
    await User.deleteMany({});
    await Pet.deleteMany({});
    await PetItem.deleteMany({});
    await Branch.deleteMany({}); // add this

      // Seed user data
      const password = 'password123';
      const users =
       [
          { username: "John", password },
          { username: "Jane", password },
          { username: "admin", password:"123"},
          { username: "Hemi", password },

      ];

      const savedUsers = await User.insertMany(users);

    // Seed pets data
    const pets = [
        { name: "Cat", breed: "Siamese", image: "/images/cat.jpg" },
        { name: "Dog", breed: "Labrador", image: "/images/dog.jpg" },
        { name: "Parrot", breed: "Macaw", image: "/images/parrot.jpg" },
        { name: "Rabbit", breed: "Holland Lop", image: "/images/rabbit.jpg" }
    ];

    const savedPets = await Pet.insertMany(pets);

    // Seed pet items data
    const petItems = [
        { 
            name: "Dog Toy1s", 
            price: 20, 
            category: "Toys", 
            petId: savedPets[1]._id, 
            image: "/images/dogtoys.jpg",
            description: "Durable toys for playful dogs."
        },
        { 
            name: "Cat Toys", 
            price: 15, 
            category: "Toys", 
            petId: savedPets[0]._id, 
            image: "/images/cattoys.jpg",
            description: "Fun toys for curious cats."
        },
        { 
            name: "Bird Food", 
            price: 10, 
            category: "Food", 
            petId: savedPets[2]._id, 
            image: "/images/birdfood.jpg",
            description: "Nutritious food for chirpy birds."
        },
        { 
            name: "Rabbit Food", 
            price: 15, 
            category: "Food", 
            petId: savedPets[3]._id, 
            image: "/images/rabbitfood.jpg",
            description: "Wholesome food for happy rabbits."
        },
        { 
            name: "Dog Food", 
            price: 25, 
            category: "Food", 
            petId: savedPets[1]._id, 
            image: "/images/dogfood.jpg",
            description: "Balanced diet for healthy dogs."
        },
        { 
            name: "Cat Food", 
            price: 30, 
            category: "Food", 
            petId: savedPets[0]._id, 
            image: "/images/catfood.jpg",
            description: "Tasty and nutritious meals for cats."
        },
        { 
            name: "Cat ladder", 
            price: 50, 
            category: "Toys", 
            petId: savedPets[0]._id, 
            image: "/images/Ron.jpg",
            description: "Rons new toy ."
        },
        { 
            name: "bite bite!", 
            price: 100, 
            category: "Toys", 
            petId: savedPets[1]._id, 
            image: "/images/bite_me.jpg",
            description: "Balanced diet for healthy dogs."
        },
         {
        name: "duck toy!", 
        price: 76, 
        category: "Toys", 
        petId: savedPets[1]._id, 
        image: "/images/duck_toy.jpg",
        description: "the perfect toy for your dog!"
        },
        


{ 
    name: "nature", 
    price: 60, 
    category: "Food", 
    petId: savedPets[3]._id, 
    image: "/images/rfood2.jpg",
    description: "Food for young rabbits."
},
        
{ 
    name: "all in one", 
    price: 60, 
    category: "Food", 
    petId: savedPets[3]._id, 
    image: "/images/rfood4.jpg",
    description: "All the food a rabbit needs to be strong."
},

{ 
    name: "picnic", 
    price: 60, 
    category: "Food", 
    petId: savedPets[3]._id, 
    image: "/images/rfood3.jpg",
    description: "A treat for energetic rabbits."
},

{ 
    name: "best", 
    price: 70, 
    category: "Food", 
    petId: savedPets[3]._id, 
    image: "/images/rfood5.jpg",
    description: "Basic food for rabbits."
},
{ 
    name: "Bite me!", 
    price: 45, 
    category: "Toys", 
    petId: savedPets[3]._id, 
    image: "/images/rtoy1.jpg",
    description: "A facility that combines food and play."
},

{ 
    name: "mio mio!", 
    price: 45, 
    category: "Toys", 
    petId: savedPets[3]._id, 
    image: "/images/rtoy2.jpg",
    description: "Nest for adolescent rabbits."
        },
{ 
    name: "mogambo", 
    price: 50, 
    category: "Food", 
    petId: savedPets[2]._id, 
    image: "/images/tocis.jpg",
    description: "Food rich in vitamins for African birds."
}, 
{ 
    name: "deli nature", 
    price: 90, 
    category: "Food", 
    petId: savedPets[2]._id, 
    image: "/images/tocis2.jpg",
    description: "Pineapple flavored with added raspberry."
}, 

{ 
    name: "countiy", 
    price: 65, 
    category: "Food", 
    petId: savedPets[2]._id, 
    image: "/images/tocis3.jpg",
    description:"Dry food for birds."
},
    { 
        name: "swings", 
        price: 85, 
        category: "Toys", 
        petId: savedPets[2]._id, 
        image: "/images/toy1.jpg",
        description: "A swing adapted to a birdcage."
    },

{ 
        name: "Bird position", 
        price: 45, 
        category: "Toys", 
        petId: savedPets[2]._id, 
        image: "/images/toy2.jpg",
        description: "A wooden stand for the window sill."
        },
{ 
    name: "nature", 
    price: 120, 
    category: "Food", 
    petId: savedPets[1]._id, 
    image: "/images/fooddog1.jpg",
    description: "Food rich in vitamins for the digestive system"
},
{ 
    name: "special mix ",
    price: 95, 
    category: "Food", 
    petId: savedPets[1]._id, 
    image: "/images/fooddog2.jpg",
    description: "Food for adult dogs"
},
{ 
    name: "maxi" ,
    price: 60, 
    category: "Food", 
    petId: savedPets[1]._id, 
    image: "/images/fooddog5.jpg",
    description: "Adult mixed dog food."
  },
{ 
    name: "yummi" ,
    price: 117, 
    category: "Food", 
    petId: savedPets[1]._id, 
    image: "/images/fooddog4.jpg",
    description: "Food for young dogs"
},
{ 
    name: "picnic", 
    price: 98, 
    category: "Food", 
    petId: savedPets[1]._id, 
    image: "/images/fooddog3.jpg",
    description: "Meat flavored dog food"
},
{ 
    name: "Love Bites!", 
    price: 80, 
    category: "Food", 
    petId: savedPets[0]._id, 
    image: "/images/Love_Bites.jpg",
    description: "bites for cats for the digestive system."
},

{ 
    name: "Electric mouse toy!", 
    price: 149, 
    category: "Toys", 
    petId: savedPets[0]._id, 
    image: "/images/electric_mouse_toy.jpg",
    description: "toy for cat Electric mouse toy."
},
{ 
    name: "Just For Cats , All Breed SizesCat Toy!", 
    price: 59, 
    category: "Toys", 
    petId: savedPets[0]._id, 
    image: "/images/13_piece.jpg",
    description: "Exercise your cat's natural instincts to explore and thrive in the world."
},

{ 
    name: "Food rich!", 
    price: 80, 
    category: "Food", 
    petId: savedPets[0]._id, 
    image: "/images/rfood1.jpg",
    description: "Food rich in vitamins for the digestive system."
}

    ];
    
    const savedPetItems = await PetItem.insertMany(petItems);

    // Seed branches data
    const branches = [
        { name: "Tel Aviv Branch", lat: 32.1093, lon: 34.8555 },
        { name: "Haifa Branch", lat: 32.7940, lon: 34.9896 },
        { name: "Be'er Sheva Branch", lat: 31.2529, lon: 34.7915 },
        { name: "Jerusalem Branch", lat: 31.7714, lon: 35.1927 }, 
        { name: "Rishon Lezion Branch", lat: 31.9637, lon: 34.8043 }
    ];
    await Branch.insertMany(branches); // add this

const orders = [
    {isOrdered:true, username: savedUsers[0].username, orderedItems: [savedPetItems[0]._id, savedPetItems[2]._id], totalPrice: savedPetItems[0].price + savedPetItems[2].price, orderDate: new Date(2023, 2, 10) },
    {isOrdered:true, username: savedUsers[0].username, orderedItems: [savedPetItems[1]._id, savedPetItems[3]._id], totalPrice: savedPetItems[1].price + savedPetItems[3].price, orderDate: new Date(2023, 2, 20) },
    { isOrdered:true,username: savedUsers[1].username, orderedItems: [savedPetItems[4]._id, savedPetItems[5]._id], totalPrice: savedPetItems[4].price + savedPetItems[5].price, orderDate: new Date(2023, 1, 5) },
    {isOrdered:true, username: savedUsers[1].username, orderedItems: [savedPetItems[0]._id, savedPetItems[1]._id], totalPrice: savedPetItems[0].price + savedPetItems[1].price, orderDate: new Date(2023, 1, 15) }
];

await Order.insertMany(orders);

console.log('Database seeded!');
}

seedDB().then(() => {
    mongoose.connection.close();
});
