const bcrypt = require("bcrypt");

//"Jhon321@"
async function hashPassword(pwd) {
    const hash = await bcrypt.hash(pwd , process.env.SALT_ROUNDS);
    return hash;
}

hashPassword().then(result => {
    console.log(result);
}).catch(err => {
    console.error(err);
});
