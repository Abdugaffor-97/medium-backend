const passport = require("passport");

const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `http://localhost:3001/users/google-redirect`,
    },
    async (request, accessToken, refreshToken, profile, next) => {
      console.log(profile);
    }
  )
);

passport.serializeUser(function (user, next) {
  next(null, user);
});
