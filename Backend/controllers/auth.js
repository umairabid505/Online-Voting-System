const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    console.log('kdsfjksdjjjjjjjjjjjjjjjjjjjjjjjjjjjj')
    const cookieToken = req.cookies.loginCookies;
    console.log(cookieToken)
    const verifyUser = jwt.verify(cookieToken, process.env.SECRET_KEY);
    // console.log(verifyUser)

    res.status(200).json({ message: "authorization successful" });
  } catch (error) {
    res.status(400).json({ message: "not authorized" });
  }
};

module.exports = { auth };
