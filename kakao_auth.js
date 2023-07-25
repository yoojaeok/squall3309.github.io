'use strict';

// https://github.com/FirebaseExtended/custom-auth-samples/tree/master/kakao

const admin = require('./firebase_admin.js');
const axios = require('axios');

const URL = 'https://kapi.kakao.com/v2/user/me';
async function loginWithKakao(accessToken) {
    Kakao.Auth.authorize({
         redirectUri: 'https://thyadang-techlabs.github.io/',
       });
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
        provider: 'KAKAO',
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
    const userId = `kakao:${me.id}`;
    let nickname = null;
    let profileImage = null;
    if (me.properties) {
        nickname = me.properties.nickname;
        profileImage = me.properties.profile_image;
    }
    const userRecord = await updateOrCreateUser(userId, me.kakao_account.email, nickname, profileImage);
    const updateParams = {
        uid: userRecord.id,
        email: me.kakao_account.email,
        provider: 'KAKAO',
        displayName: nickname,
    };
    if (nickname) {
        updateParams['displayName'] = nickname;
    } else {
        updateParams['displayName'] = me.kakao_account.email;
    }
    if (profileImage) {
        updateParams['photoURL'] = profileImage;
    }
    return await admin.auth().createCustomToken(userId, {provider: 'KAKAO'});
}

module.exports = {
    createFirebaseToken
};