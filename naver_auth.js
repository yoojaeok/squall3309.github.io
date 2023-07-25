'use strict';

const admin = require('./firebase_admin.js');
const axios = require('axios');

const URL = 'https://openapi.naver.com/v1/nid/me';


async function requestMe(accessToken) {
    const result = await axios.get(URL, {
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + accessToken}
    });
    return result.data;
}


async function requestMe(accessToken) {
    const result = await axios.get(URL, {
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + accessToken}
    });
    return result.data;
}

async function updateOrCreateUser(userId, email, displayName, photoURL) {
    const updateParams = {
        provider: 'NAVER',
        displayName: displayName,
    };
    if (displayName) {
        updateParams['displayName'] = displayName;
    } else {
        updateParams['displayName'] = email;
    }
    if (photoURL) {
        updateParams['photoURL'] = photoURL;
    }
    try {
        return await admin.auth().updateUser(userId, updateParams);
    } catch (e) {
        if (e.code === 'auth/user-not-found') {
            updateParams['uid'] = userId;
            if (email) {
                updateParams['email'] = email;
            }
            return await admin.auth().createUser(updateParams);
        }

        throw (e);
    }
}

async function createFirebaseToken(accessToken) {
    const me = await requestMe(accessToken);
    const body = me.response;
    const userId = `naver:${body.id}`;
    const userRecord = await updateOrCreateUser(userId, body.email, body.nickname, null);
    const updateParams = {
        uid: userRecord.id,
        email: body.email,
        provider: 'NAVER',
        displayName: '',
    };
    if (body.nickname) {
        updateParams['displayName'] = body.nickname;
    } else {
        updateParams['displayName'] = body.email;
    }
    if (body.profile_image) {
        updateParams['photoURL'] = body.profile_image;
    }
    return await admin.auth().createCustomToken(userId, {provider: 'NAVER'});
}

module.exports={
    createFirebaseToken
};