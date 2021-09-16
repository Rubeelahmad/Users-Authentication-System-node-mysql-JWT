# Authontecationsystem_using_node_mysql

Node.js + MySQL API for User Management, Authentication and Registration By Rubeel Ahmed
Setup?
Install MySql
Change config.js to connect with database, dont forget to update the secret key accordingly
Run Command : node server


open postman and hit the following api's


Register User:
http://localhost:4000/users/register
{
   "firstName": "Rubeel",
    "lastName": "Ahmed",
    "username": "Rubeel Ahmed",
    "password": "ra_4446"
}


Authenticate:
http://localhost:4000/users/authenticate
{
    "firstName": "Rubeel",
    "lastName": "Ahmed",
    "username": "Rubeel Ahmed",
    "password": "ra_4446"
}
Retrive All Users
http://localhost:4000/users


Update A User:
http://localhost:4000/users/1

{
    "firstName": "Foo",
    "lastName": "Bar"
}


// routes
router.post('/authenticate', uservalidation.authenticateSchema, usercontroller.authenticate);
router.post('/register',uservalidation.registerSchema, usercontroller.register);
router.get('/userslist',usercontroller.getAll);
router.get('/current', usercontroller.getCurrent);
router.get('/', authorize, usercontroller.getById);
router.put('/', authorize , uservalidation.updateSchema , usercontroller.update);
router.delete('/', authorize, usercontroller.delete);



