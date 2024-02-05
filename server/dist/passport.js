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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const User_1 = __importDefault(require("./models/User"));
function configurePassport() {
    passport_1.default.use(new passport_local_1.Strategy({
        usernameField: "email"
    }, function (email, password, done) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.findOne({ email });
                if (!user) {
                    return done(null, false, { message: "Login fehlgeschlagen. Benutzer existiert nicht." }); // Benutzer nicht gefunden
                }
                const isValidPassword = yield user.verifyPassword(password);
                if (isValidPassword) {
                    return done(null, user, { message: "Erfolgreich eingeloggt!" });
                }
                else {
                    return done(null, false, { message: "Login fehlgeschlagen. Passwort nicht korrekt." });
                }
            }
            catch (err) {
                return done(err); // Fehler bei der Datenbankabfrage
            }
        });
    }));
    passport_1.default.serializeUser((user, done) => {
        console.log(user._id.toString());
        return done(null, user._id);
    });
    passport_1.default.deserializeUser((id, done) => __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield User_1.default.findById(id);
            done(null, user);
        }
        catch (err) {
            done(err, null);
        }
    }));
}
exports.default = configurePassport;
