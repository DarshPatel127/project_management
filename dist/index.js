"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const errorMiddleware_1 = __importDefault(require("./middlewares/errorMiddleware"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const corsOptions = {
    origin: process.env.CORS_ALLOW_ORIGIN,
    credentials: true,
};
//app.use(cors(corsOptions));
app.use((0, cookie_parser_1.default)());
app.use('/api/v1/users', userRoutes_1.default);
app.get('/', (req, res) => {
    res.send('API is running!');
});
app.use(errorMiddleware_1.default);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
