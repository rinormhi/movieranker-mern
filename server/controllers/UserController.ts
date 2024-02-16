import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import { passwordStrength } from 'check-password-strength';
import mongoose, { ObjectId } from "mongoose";
import MovieController from "./MovieController";

class UserController {
    create = async (req: Request, res: Response) => {
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
        } catch (error: any) {

            if (error.code === 11000 && error.keyPattern && error.keyPattern.username) {
                console.error("Benutzername bereits vergeben. Error Details:", error);

                return res.status(400).json({ message: "Benutzername bereits vergeben." })
            }
            if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
                console.error("E-Mail bereits vergeben. Error Details:", error);

                return res.status(400).json({ message: "E-Mail bereits vergeben." })
            }

            res.status(500).json({ message: "Interner Serverfehler", error });
        }
    }

    addToFavorites = async (req: Request, res: Response, movieId: string) => {
        try {
            console.log("Request:", req);
            console.log("movieId:", movieId);

            if (!req.user) {
                return res.status(401).json({ success: false, message: "Unauthorized. User not logged in." });
            }

            const user: any = req.user;
            const movieAlreadyInFavorites = await User.findOne({ _id: user._id, favoriteMovies: movieId });

            if (movieAlreadyInFavorites) {
                console.log("Film ist bereits in den favorites");
                await User.updateOne({ _id: user._id }, { $unset: { favoriteMovies: movieId } })
                return res.status(400).json({ success: false, message: 'Movie already in favorites' });
            } else {
                await User.updateOne({ _id: user._id }, { $addToSet: { favoriteMovies: movieId } });
            }
        } catch (err) {
            console.log(err);
        }
    }
}

export default UserController;