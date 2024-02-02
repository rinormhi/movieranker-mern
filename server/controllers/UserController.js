const passport = require("passport");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { passwordStrength } = require('check-password-strength')

class UserController {
    create = async (req, res) => {
        try {
            const { fname, lname, username, email, password, confirmPassword } = req.body;

            // Überprüfen ob der Benutzer bereits existiert
            const existingUser = await User.findOne({ email, username });

            if (existingUser) {
                console.log("Benutzer existiert");
                return res.status(400).json({ message: "Benutzer existiert bereits" })
            }

            if (password != confirmPassword) {
                console.log("Passwörter stimmen nicht überein.");
                return res.status(400).json({ message: "Passwörter stimmen nicht überein." });
            }


            if (passwordStrength(password).id == 0) {
                return res.status(400).json({ message: "Passwort ist zu schwach. Bitte mindestens einen kleinen und großen Buchstaben, sowie eine Zahl und ein Symbol nehmen." })
            }

            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(password, salt);

            // Erstellen und Speichern des neuen Benutzers

            const newUser = new User({ fname, lname, username, email, password: hash });

            await newUser.save();

            res.status(201).json({
                message: "Benutzer erfolgreich angelegt."
            });
            console.log("Benutzer erfolgreich erstellt");
        } catch (err) {

            if (err.code === 11000 && err.keyPattern && err.keyPattern.username) {
                console.error("Benutzername bereits vergeben. Error Details:", err);

                return res.status(400).json({ message: "Benutzername bereits vergeben." })
            }
            if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
                console.error("E-Mail bereits vergeben. Error Details:", err);

                return res.status(400).json({ message: "E-Mail bereits vergeben." })
            }

            res.status(500).json({ message: "Interner Serverfehler", err });
        }
    }

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


    //     } catch (err) {
    //         console.error(err);
    //         res.status(500).json({ message: "Interner Serverfehler" });
    //     }
    // }
}

module.exports = UserController;