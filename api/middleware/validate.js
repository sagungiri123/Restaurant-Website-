const { validationResult } = require('express-validator');

/* Run express-validator checks and return 400 with clean errors if any fail */
const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map((v) => v.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) return next();

        const extracted = errors.array().map((e) => ({
            field: e.path,
            message: e.msg,
        }));

        return res.status(400).json({ success: false, errors: extracted });
    };
};

module.exports = validate;
