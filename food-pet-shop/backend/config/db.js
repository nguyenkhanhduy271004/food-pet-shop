import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://nguyenduy271004:kuy271004@cluster0.cl604bc.mongodb.net/sell-food-pet')
            .then(() => console.log('DB Connected'))
            .catch((err) => console.log('DB Error: ' + err.message))
    } catch (error) {
        console.error('Error connecting to the database', err.message);
        process.exit(1);

    }

}
