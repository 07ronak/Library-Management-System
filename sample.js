const bcrypt = require("bcrypt");

const getSalt = async () => {
  const saltRounds = 10; // Number of salt rounds
  const salt = await bcrypt.genSalt(saltRounds);
  console.log(salt);
};

getSalt();
