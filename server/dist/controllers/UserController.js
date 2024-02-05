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
        // login = async (req, res) => {
        //     try {
        //         const { email, password } = req.body;
        //         const existingUser = await User.findOne({ email });
        //         if (!existingUser) {
        //             console.log("Benutzer existiert nicht.");
        //             return res.status(400).json({ message: "Benutzer existiert nicht." })
        //         }
        //         const passwordCorrect = await bcrypt.compare(password, existingUser.password);
        //         if (passwordCorrect) {
        //             // TODO: Session Starten, User Context, Weiterleiten, etc.
        //             return res.status(200).json({
        //                 message: "Du bist eingeloggt.",
        //                 email: email
        //             });
        //         } else {
        //             return res.status(400).json({ message: "Passwort falsch." })
        //         }
        //     } catch (error) {
        //         console.error(error);
        //         res.status(500).json({ message: "Interner Serverfehler" });
        //     }
        // }
    }
}
exports.default = UserController;
