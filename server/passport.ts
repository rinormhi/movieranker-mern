import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User, { UserDocument } from "./models/User";

function configurePassport() {

    passport.use(new LocalStrategy(
        {
            usernameField: "email"
        },
        async function (email, password, done) {
            try {
                const user = await User.findOne({ email }) as UserDocument;
                if (!user) {
                    return done(null, false, { message: "Login fehlgeschlagen. Benutzer existiert nicht." }); // Benutzer nicht gefunden
                }

                const isValidPassword = await user.verifyPassword(password);

                if (isValidPassword) {
                    return done(null, user, { message: "Erfolgreich eingeloggt!" });
                } else {
                    return done(null, false, { message: "Login fehlgeschlagen. Passwort nicht korrekt." });
                }
            } catch (err) {
                return done(err); // Fehler bei der Datenbankabfrage
            }
        }
    ));

    passport.serializeUser((user: any, done) => {
        console.log(user._id.toString());
        return done(null, user._id);
    });


    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
}

export default configurePassport;