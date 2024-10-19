import mongoose from 'mongoose'
import { config } from 'dotenv'
config();

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connection with DB successful!');
    } catch (error) {
        console.log('Cannot connect with DB !');
        console.log(error)
        process.exit(1);
    }
}

export default dbConnect;