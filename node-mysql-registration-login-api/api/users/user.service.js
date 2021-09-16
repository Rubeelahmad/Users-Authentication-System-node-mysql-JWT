const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const response_failure = require('../../public/response.failure.json');
const response_success = require('../../public/response.success.json');

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ username, password }) {
    const user = await db.User.scope('withHash').findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.hash)))
    {
        let failure_401 = response_failure.failure_401;
        failure_401.message = "Username or password is incorrect";
        throw failure_401;
    }
    else{
        const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
        const response = { ...omitHash(user.get()), token };
        if(response)
        {
            let success_200 = response_success.success_200;
            success_200.message = "Authorized Successfully!";
            success_200.data.users = [ response ]
            return success_200;
        }
    }
    
    // authentication successful
}

async function getAll() {
    const users =  await db.User.findAll();
    if (!users) 
    {
        let failure_404 = response_failure.failure_404;
        failure_404.message = "User Not Found!"
        throw failure_404;
    }
    else
    {
        let success_200 = response_success.success_200;
        success_200.message = "User's List Found Successfully!";
        success_200.data.users = [ users ]
        return success_200;
    }
}

async function getById(userid) {
   const user = await getUser(userid);
   if (!user) 
   {
       let failure_404 = response_failure.failure_404;
       failure_404.message = "User Not Found!"
       throw failure_404;
   }
   else
   {
       let success_200 = response_success.success_200;
       success_200.message = "User Found Successfully!";
       success_200.data.users = [ user ]
       return success_200;
   }
   
}

async function create(params)  {
    // validate
    if (await db.User.findOne({ where: { username: params.username } })) {
       // throw 'Username "' + params.username + '" is already taken';
       let failure_409 = response_failure.failure_409;
       failure_409.message =  params.username + " is already resgiter!";
       throw failure_409;
    }

    // hash password
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }

    // save user
    const response = await db.User.create(params);
    if(response)
    {
        let success_200 = response_success.success_200;
        success_200.message = "User registered successfully!";
        success_200.data.users = [ response ]
        return success_200;
    }
}

async function update(userid, params) {
 
    const user = await getUser(userid);

    // validate
    const usernameChanged = params.username && user.username !== params.username;
    if (usernameChanged && await db.User.findOne({ where: { username: params.username } })) {
        let failure_409 = response_failure.failure_409;
        failure_409.message =  params.username + " is already taken!";
        throw failure_409;
    }

    // hash password if it was entered
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }

    // copy params to user and save
    Object.assign(user, params);
     user.save();
    const userWithoutHash = await omitHash(user.get());

        let success_200 = response_success.success_200;
        success_200.message = "User updated Successfully!";
        success_200.data.users = [ userWithoutHash ]
        return success_200;
    
    
}

async function _delete(userid) {
    const user = await getUser(userid);
    if (!user) 
    {
        let failure_404 = response_failure.failure_404;
        failure_404.message = "User Not Found!"
        throw failure_404;
    }
    else
    {
        await user.destroy();
        let success_200 = response_success.success_200;
        success_200.message = "User deleted Successfully!";
        success_200.data.users = [ user ]
        return success_200;
    }

}

// helper functions
async function getUser(id) {
    return await db.User.findByPk(id);
  
}

function omitHash(user) {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
}


