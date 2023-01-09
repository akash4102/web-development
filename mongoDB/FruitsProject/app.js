// jshint eseversion:6

const mongoose=require('mongoose');

const url='mongodb://localhost:27017/fruitsDB';
mongoose.set('strictQuery',false);
mongoose.connect(url, { useNewUrlParser: true });

const fruitSchema=new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please check your data entry no name specified"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});


const Fruit =mongoose.model("Fruit",fruitSchema);

// const fruit = new Fruit ({
//     name: "mango",
//     rating: 10,
//     review: "peaches are so lovely."
// });

// fruit.save();

const peopleSchema=new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
});

const guava=new Fruit({
    name:"guava",
    rating: 8,
    review: "great fruit for winters"
})

guava.save();
const People=mongoose.model("People",peopleSchema);

// const people=new People({
//     name: "sachin",
//     age: 12,
//     favouriteFruit: pineapple
// });

// people.save();

// const kiwi=new Fruit({
//     name: "kiwi",
//     score: 10,
//     review: "the best fruit!"
// });
// const orange=new Fruit({
//     name: "orange",
//     score: 4,
//     review: "too sour for me"
// });
// const banana=new Fruit({
//     name: "banana",
//     score: 3,
//     review: "weird texture"
// });

// Fruit.insertMany([kiwi,orange,banana],function(err){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("succesfully saved all the fruits to fruitsDB");
//     }
// });

// Fruit.find(function(err,fruits){
//     if(err){
//         console.log(err);
//     }
//     else{
//         // console.log(fruits);
//         mongoose.connection.close();
//         let arrayOfFruits=fruits;
//         arrayOfFruits.forEach(element => {
//             console.log(element.name);
//         });
//     }
// });

// Fruit.updateOne({name:"mango"} , {rating:42},function(err){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("updation success");
//     }
// });

// Fruit.deleteOne({name:"peach"},function(err){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("successfully deleted");
//     }
// });

// People.deleteMany({name:'Akash'},(err)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("deletion successful");
//     }
// });

People.updateOne({name:"Akash"} , {favouriteFruit:guava},function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("updation success");
    }
});


