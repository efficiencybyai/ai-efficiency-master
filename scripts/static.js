
const secretId = process.env.TENCENT_SECRET_ID || '';
const secretKey = process.env.TENCENT_SECRET_KEY || ''; 
const appId = process.env.TENCENT_APP_ID || '';

module.exports = {
    secretId,
    secretKey,
    appId
};
