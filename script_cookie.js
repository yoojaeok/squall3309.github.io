function setCookie(cName, cValue, cDay) {
    var expire = new Date();
    expire.setDate(expire.getDate() + cDay);
    cookies = cName + '=' + escape(cValue) + '; path=/ ';
    if (typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
    //temp
    cookies += "; domain=shop2.jeomsin.co.kr; samesite=None; Secure";
    document.cookie = cookies;
}

