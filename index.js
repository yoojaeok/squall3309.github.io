'use_strict';

const naver_auth = require('naver_auth');
alert("dsdfsdf");
exports.handler = async (event) => {
    switch (event.path) {
        case '/naver/login':
            if (event.httpMethod === 'GET') {
                const params = event.queryStringParameters;
                return {
                    statusCode: 307,
                    headers: {
                        Location: `callback://success?${new URLSearchParams(params)}`
                    },
                    body: JSON.stringify(params)
                };
            }
            alert("dsdfsdf2");

            break;

        case '/naver/token':
            if (event.httpMethod === 'GET') {
                const accessToken = event.queryStringParameters.accessToken;
                const result = await naver_auth.createFirebaseToken(accessToken);
                return {
                    statusCode: 200,
                    body: result
                };
            }
            alert("dsdfsdf 1");

            break;
        case '/kakao/login':
                    if (event.httpMethod === 'GET') {
                        const params = event.queryStringParameters;
                        return {
                            statusCode: 307,
                            headers: {
                                Location: `callback://success?${new URLSearchParams(params)}`
                            },
                            body: JSON.stringify(params)
                        };
                    }
                    break;

        case '/kakao/token':
            if (event.httpMethod === 'GET') {
                const accessToken = event.queryStringParameters.accessToken;
                const result = await kakao_auth.createFirebaseToken(accessToken);
                return {
                    statusCode: 200,
                    body: result
                };
            }
            break;
    }
};