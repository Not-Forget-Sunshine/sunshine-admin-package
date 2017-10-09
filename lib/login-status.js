!function (o, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports["Sunshine"] = t() : o["Sunshine"] = t()
}(this, function () {
    return function (o) {
        function t(i) {
            if (e[i])return e[i].exports;
            var n = e[i] = {exports: {}, id: i, loaded: !1};
            return o[i].call(n.exports, n, n.exports, t), n.loaded = !0, n.exports
        }

        var e = {};
        return t.m = o, t.c = e, t.p = "", t(0)
    }([function (o, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0}), t.default = {
            check: function (o, t) {
                var e = this, o = o || {}, i = {
                    type: o.type || "wechatOauth",
                    isRedirect: o.isRedirect || 1,
                    redirectUrl: o.redirectUrl || "/login"
                };
                if (tools.isEmpty(tools.localCache.get("Authorization")) && 1 == window.canauthinit) e.getSign(o, t); else if (!tools.isEmpty(tools.localCache.get("Authorization"))) {
                    if (0 == tools.localCache.get("isLogin") || void 0 == tools.localCache.get("isLogin")) {
                        if (1 === i.isRedirect && "/login" != tools.router.currentRoute.path && "login" == i.type) {
                            var n = "";
                            "-1" != location.href.indexOf("?") && (n = location.href.substring(location.href.indexOf("?")));
                            var r = tools.router.currentRoute.path + n;
                            tools.router.replace({path: i.redirectUrl, query: {callback: encodeURIComponent(r)}})
                        } else if ("wechatOauth" == i.type) {
                            var c = location.href,
                                r = window.config.api.url + i.redirectUrl + "?callback=" + encodeURIComponent(c) + "&key=" + btoa(tools.localCache.get("Authorization"));
                            tools.localCache.set("isLogin", 2), window.location.href = r
                        } else"/login" == tools.router.currentRoute.path && "function" == typeof t && t();
                        return !1
                    }
                    2 == tools.localCache.get("isLogin") ? e.isLogin("/api/users", o, t) : "function" == typeof t && t()
                }
            }, getSign: function (o, t) {
                var e = this;
                log.debug("开始获取签名"), window.canauthinit = 0, tools.alert.loading(), tools.ajax({
                    url: "/api/init",
                    ajaxData: {},
                    successFun: function (i) {
                        log.debug("获取到签名:", i), tools.localCache.set("Authorization", i.token), tools.alert.closeLoading(), e.check(o, t), window.canauthinit = 1
                    },
                    errorFun: function (o) {
                        log.debug("获取签名失败"), window.canauthinit = 1
                    },
                    type: "GET"
                })
            }, isLogin: function (o, t, e) {
                var i = this;
                log.debug("获取是否登录"), tools.ajax({
                    url: o, ajaxData: {}, successFun: function (o) {
                        tools.localCache.set("isLogin", 1), i.check(t, e)
                    }, errorFun: function (o) {
                        log.error("登录失败!"), tools.alert.error("English" === config.language ? "Login fail!" : "登录失败!"), tools.localCache.set("isLogin", 0), i.check(t, e)
                    }, type: "GET"
                })
            }
        }
    }])
});