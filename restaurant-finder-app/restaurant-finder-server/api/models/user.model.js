const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: String,
    password: String,
    email: String
});

/**
 * Pre-validation
 */
userSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) return next();
    if (user.password) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next();
                user.password = hash;
                next(err)
            })
        })
    }
});

/**
 * Pre-validation
 */
userSchema.pre('update', function (next) {
    var user = this;
    if (user._update.$set.password) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) return next(err);
            bcrypt.hash(user._update.$set.password, salt, function (err, hash) {
                if (err) return next();
                user._update.$set.password = hash;
                next(err)
            })
        })
    }else{
        next();
    }
});

/**
 * Compares local password and hashed password
 */
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('users', userSchema)

