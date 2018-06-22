const bcrypt = require("bcrypt");

const formatErrors = (error, otherErrors)=>{
    const errors = error.errors;
    let objectErrors = [];
    if (errors) {
        Object.entries(errors).map(error => {
            const { path, message } = error[1];
            objectErrors.push({path, message})
        });
        objectErrors = objectErrors.concat(otherErrors);
        return objectErrors;
    } else if (otherErrors.length){
        return otherErrors;
    }

    let uknownError = {};
    switch (error.code) {
        case 11000:
            uknownError.path = "username";
            uknownError.message = "El nombre de usuario ya existe";
            break;
        default:
            uknownError.path = "Desconocido";
            uknownError.message = error.message;
    }

    return [uknownError];
};

module.exports = {
    Query: {
        allUsers: (parent, args, {models}, info)=> models.User.find(),
        getUser: (parent, args, {models}, info)=> models.User.findOne(args)
    },

    Mutation: {
        createUser: async (parent, {password, ...args}, {models})=>{
            let otherErrors = [];
            try {
                if (password.length < 8){
                    otherErrors.push({path: 'password', message: 'Password debe ser mayor a 8 caracteres'});
                }
                let hashPassword = await bcrypt.hash(password, 10,)
                let user = await models.User.create({...args,password:hashPassword})
                if (otherErrors.length){
                    throw otherErrors;
                }
                return {
                    success: user && user._id,
                    errors: [],
                }
            } catch (error) {
                return {
                    success: false,
                    errors: formatErrors(error, otherErrors)
                }
            }
        }
    }
};