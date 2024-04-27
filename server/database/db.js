import mongoose from 'mongoose';



const Connection = () => {
    
    const DB_URI = `mongodb://kritikapathak2004:9965oOpJQ8aTWQY3@ac-8iitbjb-shard-00-00.s6wsu0o.mongodb.net:27017,ac-8iitbjb-shard-00-01.s6wsu0o.mongodb.net:27017,ac-8iitbjb-shard-00-02.s6wsu0o.mongodb.net:27017/?ssl=true&replicaSet=atlas-kluo5c-shard-0&authSource=admin&retryWrites=true&w=majority&appName=gmailclone`;
    try{
        mongoose.connect(DB_URI, {useNewUrlParser: true});
        console.log("database connected successfully");
    }
        catch(error){
            console.log("error while connectiong database", error.message);
        }
    }
export default  Connection;