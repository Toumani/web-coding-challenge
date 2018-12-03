/* ============================================================
|   :=Set Cookie a cookie manager from https://gist.github.com/irazasyed/5382490
=============================================================== */
export function setCookie(name, value, expire) {
    var expireDate = new Date();
    expireDate.setSeconds(expireDate.getSeconds() + expire);
    document.cookie = name + "=" + escape(value) + "; expires=" + expireDate.toGMTString() + "; path=/";
}

/* ============================================================
|   :=Read Cookie
=============================================================== */
export function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}