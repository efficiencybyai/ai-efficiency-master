
const secretId = process.env.TENCENT_SECRET_ID || 'YOUR_SECRET_ID_HERE';
const secretKey = process.env.TENCENT_SECRET_KEY || 'YOUR_SECRET_KEY_HERE'; 
const appId = process.env.TENCENT_APP_ID || 'YOUR_APP_ID_HERE';

module.exports = {
    secretId,
    secretKey,
    appId
};
