import { app } from "./index.js";
import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
// Always resolve config.env from project root
dotenv.config({ path: path.resolve(process.cwd(), 'config.env') });
const DB = process.env.DB.replace('<db_password>', process.env.PASSWORD_DB);
mongoose.connect(DB).then(() => {
    console.log('DB connected successfully');
}).catch((err) => {
    console.log('Error connecting to DB', err);
});
const port = process.env.SERVER_PORT;
const server = app.listen(port, () => {
    console.log(`App lisitening on port:${port}`);
});
//# sourceMappingURL=server.js.map