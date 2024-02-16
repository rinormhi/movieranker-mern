"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const check_password_strength_1 = require("check-password-strength");
class UserController {
    constructor() {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { fname, lname, username, email, password, confirmPassword } = req.body;
                // Überprüfen ob der Benutzer bereits existiert
                const existingUser = yield User_1.default.findOne({ email, username });
                if (existingUser) {
                    console.log("Benutzer existiert");
                    return res.status(400).json({ message: "Benutzer existiert bereits" });
                }
                if (password != confirmPassword) {
                    console.log("Passwörter stimmen nicht überein.");
                    return res.status(400).json({ message: "Passwörter stimmen nicht überein." });
                }
                if ((0, check_password_strength_1.passwordStrength)(password).id == 0) {
                    return res.status(400).json({ message: "Passwort ist zu schwach. Bitte mindestens einen kleinen und großen Buchstaben, sowie eine Zahl und ein Symbol nehmen." });
                }
                const saltRounds = 10;
                const salt = yield bcrypt_1.default.genSalt(saltRounds);
                const hash = yield bcrypt_1.default.hash(password, salt);
                // Erstellen und Speichern des neuen Benutzers
                const newUser = new User_1.default({ fname, lname, username, email, password: hash });
                yield newUser.save();
                res.status(201).json({
                    message: "Benutzer erfolgreich angelegt."
                });
                console.log("Benutzer erfolgreich erstellt");
            }
            catch (error) {
                if (error.code === 11000 && error.keyPattern && error.keyPattern.username) {
                    console.error("Benutzername bereits vergeben. Error Details:", error);
                    return res.status(400).json({ message: "Benutzername bereits vergeben." });
                }
                if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
                    console.error("E-Mail bereits vergeben. Error Details:", error);
                    return res.status(400).json({ message: "E-Mail bereits vergeben." });
                }
                res.status(500).json({ message: "Interner Serverfehler", error });
            }
        });
        this.addToFavorites = (req, res, movieId) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Request:", req);
                console.log("movieId:", movieId);
                if (!req.user) {
                    return res.status(401).json({ success: false, message: "Unauthorized. User not logged in." });
                }
                const user = req.user;
                const movieAlreadyInFavorites = yield User_1.default.findOne({ _id: user._id, favoriteMovies: movieId });
                if (movieAlreadyInFavorites) {
                    console.log("Film ist bereits in den favorites");
                    return res.status(400).json({ success: false, message: 'Movie already in favorites' });
                }
                else {
                    yield User_1.default.updateOne({ _id: user._id }, { $addToSet: { favoriteMovies: movieId } });
                    console.log("added to favorite movies");
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.default = UserController;
