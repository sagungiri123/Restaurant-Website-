const mongoose = require('mongoose');
const crypto = require('crypto');

const refreshTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        index: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
        index: { expires: 0 }, // TTL index — MongoDB auto-deletes expired docs
    },
}, { timestamps: true });

/**
 * Generate a cryptographically random refresh token string.
 * The raw token is returned to the client; a SHA-256 hash is stored in the DB.
 */
refreshTokenSchema.statics.createToken = async function (userId) {
    const raw = crypto.randomBytes(40).toString('hex');
    const hashed = crypto.createHash('sha256').update(raw).digest('hex');

    await this.create({
        token: hashed,
        user: userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    return raw; // send raw to client, store hash in DB
};

/**
 * Find a refresh token by its raw value (hash it first to compare).
 */
refreshTokenSchema.statics.findByToken = async function (raw) {
    const hashed = crypto.createHash('sha256').update(raw).digest('hex');
    return this.findOne({ token: hashed, expiresAt: { $gt: new Date() } });
};

module.exports = mongoose.model('RefreshToken', refreshTokenSchema);
