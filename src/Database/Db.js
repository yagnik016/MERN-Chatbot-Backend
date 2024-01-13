import {connect,disconnect} from 'mongoose';

export const connectionToDatabase = async ()=>{
    try {
        await connect(process.env.MONGO_URL);
        console.log("Database Connected");
        
    } catch (error) {
        console.log(error);
        throw new Error("Database Connection Failed");
        
    }
}

export const disconnectFromDatabase = async ()=>{
    try {
        await disconnect();
        console.log("Database Disconnected");
        
    } catch (error) {
        console.log(error);
        throw new Error("Database Disconnection Failed");
        
    }
}
