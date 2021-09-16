module.exports = validateRequest;

function validateRequest(req, next, schema) {
    if(req.body.user_id != "")
    {
        var userid = req.body.user_id
    }
   
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };

    const { error, value } = schema.validate(req.body, options);
    if (error) {
        next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    } else {
        req.body = value;
        if(userid)
        {
            req.body.user_id = userid
        }
        next();
    }
}