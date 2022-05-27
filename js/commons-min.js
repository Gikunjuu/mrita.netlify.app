! function() {
    var t = window.Y,
        e = {
            windowEventsState: !1,
            links: t("a[data-slug-particular]"),
            categories: ["sport", "medical", "perineologie", "bien-etre", "piscine"],
            assets: function(e) { this.w = t(".category"), t(this.w.ele[e]).addClass("active-load"), t("body").addClass(this.categories[e]), this.current = t(".category.active-load"), this.x = t(window).width(), this.y = t(window).height(), this.index = e, this.k = 8, this.time = 3500, this.looping = !0, this.timeouts = [] },
            resizeAssets: function() { this.x = t(window).width(), this.y = t(window).height() },
            killTimeouts: function() {
                this.looping = !1;
                for (var t = 0; t < this.timeouts.length; t++) clearTimeout(this.timeouts[t]);
                this.timeouts = []
            },
            loopCat: function() {
                if (this.looping && t("body").hasClass("home") && this.x >= 1024) {
                    var e = setTimeout(function() { this.oldCategory = this.categories[this.index], this.index + 1 < this.w.length() ? this.index++ : this.index = 0, this.step() }.bind(this), this.time);
                    this.timeouts.push(e)
                }
            },
            next: function() { this.index + 1 < this.w.length() ? this.index++ : this.index = 0, this.step() },
            previous: function() { this.index - 1 >= 0 ? this.index-- : this.index = this.w.length() - 1, this.step() },
            step: function(e) {
                var i = null;
                void 0 !== e && (i = e.bind(this));
                var a = this.current.timing();
                this.current.removeClass("active"), this.current.addClass("reverse-circles"), this.links.removeClass("active");
                var s = setTimeout(function() {
                    this.current.removeClass("reverse-circles", "active-circles"), t(this.w.ele[this.index]).addClass("active"), this.current = t(this.w.ele[this.index]), i && i(!0), this.drawCircles(this.current, a), t("body").replaceClass(this.oldCategory, this.categories[this.index]);
                    for (var e = 0; e < this.categories.length; e++) t("body").removeClass(this.categories[e]);
                    t("body").addClass(this.categories[this.index])
                }.bind(this), a);
                this.timeouts.push(s)
            },
            drawCircles: function(e, i, a) {
                var s = setTimeout(function() { e.addClass("active-circles"), t(this.links.ele[this.index]).addClass("active") }.bind(this), .12 * i),
                    n = setTimeout(function() { this.looping && this.loopCat() }.bind(this), e.find(".circle").timing() + .12 * i);
                this.timeouts.push(s, n)
            },
            animations: function(e) {
                if (t("body").hasClass("home")) {
                    var i = e.clientX,
                        a = e.clientY,
                        s = i / this.x * 2 - 1,
                        n = a / this.y * 2 - 1,
                        o = Math.round(this.k * s),
                        r = Math.round(this.k * n),
                        l = 180 * Math.atan2(a - this.y / 2, i - this.x / 2) / Math.PI;
                    t("html").hasClass("ie") ? (t(".circle-wrapper-top").each(function(e) { t(e).css("transform", "translate(" + o / 2 + "px," + r / 2 + "px) rotate(120deg)") }.bind(this)), t(".circle-wrapper-bottom").each(function(e) { t(e).css("transform", "translate(" + o / 2 + "px," + r / 2 + "px) rotate(-60deg)") }.bind(this))) : t(".circle-wrapper").each(function(e) { t(e).css("transform", "translate(" + o / 2 + "px," + r / 2 + "px) rotate(0)") }.bind(this)), t(".category-body").each(function(e) { t(e).css("transform", "translate(" + o + "px," + r + "px)") }), t(".gradient-top").each(function(e) { t(e).attr("gradientTransform", "rotate(" + l + ",.5,.5)") }), t(".gradient-bottom").each(function(e) { t(e).attr("gradientTransform", "rotate(" + -l + ",.5,.5)") })
                }
            },
            openCategory: function(e) {
                var i = t(".category.active .js-category-body").attr("data-c1"),
                    a = t(".category.active .js-category-body").attr("data-c2");
                t(".js-gradient-1").hasClass("show") || t(".js-gradient-2").hasClass("show") ? (t(".js-gradient-1").hasClass("show") || t(".js-gradient-2").hasClass("show")) && (t(".js-gradient-2").hasClass("show") ? (t(".js-gradient-1").css("background-image", "linear-gradient(135deg," + i + "," + a + ")"), t(".js-gradient-2").removeClass("show")) : (t(".js-gradient-2").css("background-image", "linear-gradient(135deg," + i + "," + a + ")"), t(".js-gradient-2").addClass("show"))) : (t(".js-gradient-1").css("background-image", "linear-gradient(135deg," + i + "," + a + ")"), t(".js-gradient-1").addClass("show")), t("body").hasClass("category-open") ? e || (t(".js-gradient").removeClass("show"), t("body").removeClass("category-open"), this.killTimeouts(), this.looping = !0, this.loopCat()) : (this.killTimeouts(), t("body").addClass("category-open"))
            },
            onLoad: function(e) { setTimeout(function() { 0 == this.index ? this.current.replaceClass("active-load", "active") : (t(".active-load").removeClass("active-load"), this.current = t(this.w.ele[this.index]), this.current.addClass("active")), e && this.openCategory(), this.drawCircles(this.current, this.current.timing()) }.bind(this), 20) },
            windowEvents: function() { this.windowEventsState || (this.windowEventsState = !0, t(window).addEvent("mousemove", function(t) { this.animations(t) }.bind(this)), t(window).addEvent("resize", this.resizeAssets.bind(this))) },
            events: function() { this.links.addEvent("click", function(e) { e.preventDefault(), t("body").hasClass("home") && !t(e.currentTarget).hasClass("active") && (this.killTimeouts(), this.oldCategory = this.categories[this.index], this.index = parseFloat(t(e.currentTarget).attr("data-category")), this.step(this.openCategory)) }.bind(this)), t(".js-category-body").addEvent("click", function(t) { t.preventDefault(), this.openCategory() }.bind(this)), t(".btn-plus").addEvent("click", function(t) { t.preventDefault(), this.openCategory() }.bind(this)), t(".js-category-next").addEvent("click", this.next.bind(this)), t(".js-category-previous").addEvent("click", this.previous.bind(this)), t("body").addEvent("touchstart", function(t) { this.touchstart = t.touches[0].clientX }.bind(this)), t("body").addEvent("touchend", function(e) { this.touchend = e.changedTouches[0].clientX, Math.abs(this.touchstart - this.touchend) > this.x / 100 * 20 && t("body").hasClass("home") && (this.touchstart < this.touchend ? this.previous() : this.next()) }.bind(this)) },
            init: function(e, i) {
                if (t("body").hasClass("home")) {
                    var a = null == e ? Math.round(4 * Math.random()) : e;
                    t("body").addClass(this.categories[a]);
                    var s = i || !1;
                    this.timeouts && this.killTimeouts(), this.assets(a), this.onLoad(s), this.windowEvents(), this.events()
                }
            }
        };
    e.init(), window.mySlideshow = e
}(),
function() {
    var t = window.Y,
        e = window.mySlideshow,
        i = {
            gradientState: function(e) {
                var i = t(e).attr("data-category");
                if (i !== t(".js-gradient-parent").attr("data-category")) {
                    var a = t(e).attr("data-c1"),
                        s = t(e).attr("data-c2");
                    t(".js-gradient-parent").attr("data-gradient", i), t(".js-gradient-child").hasClass("show") ? (t(".js-gradient-parent").css("background-image", "linear-gradient(135deg," + a + "," + s + ")"), t(".js-gradient-parent").css("background-color", a)) : (t(".js-gradient-child").css("background-image", "linear-gradient(135deg," + a + "," + s + ")"), t(".js-gradient-child").css("background-color", a)), setTimeout(function() { t(".js-gradient-child").toggleClass("show") }, 20)
                }
            },
            singleCall: function() { t(".js-btn-menu").addEvent("click", function() { t("body").hasClass("header-open") ? (!t("body").hasClass("category-open") && t("body").hasClass("home") && (e.looping = !0, e.loopCat()), t("body").removeClass("header-open")) : (t("body").hasClass("home") && e.killTimeouts(), t("body").addClass("header-open")) }.bind(this)), t(".js-btn-calendar").addEvent("click", e.killTimeouts.bind(e)), t(".js-gradient-colors").addEvent("mouseenter", function(e) { t(window).width() > 1024 && this.gradientState(e.target) }.bind(this)) },
            init: function() { t(".js-main-nav") && this.singleCall() }
        };
    i.init(), window.myMenu = i
}(),
function() {
    var t, e = window.Y,
        i = {
            squares: function() {
                var t;
                e(".js-square") && e(".js-square").each(function(i) { t = parseFloat(e(i).parent().height()) - parseFloat(window.getComputedStyle(e(i).parent().ele, null)["padding-bottom"]), pw = parseFloat(e(i).parent().width()), t > pw ? (e(i).addClass("js-square-center"), e(i).width(""), e(i).height(pw + "px")) : (e(i).removeClass("js-square-center"), e(i).height(""), e(i).width(t + "px")) })
            },
            firstCall: function() { this.squares() },
            windowEvents: function() { e(".js-square") ? e(window).addEvent("resize", function() { this.squares(), clearTimeout(t), t = setTimeout(function() { this.squares() }.bind(this), 800) }.bind(this)) : e(window).removeEvent("resize", this.squares) },
            events: function() {},
            reset: function() { this.init() },
            init: function() { this.firstCall(), this.windowEvents(), this.events() }
        };
    i.init(), window.myScripts.push(i)
}(),
function() {
    var t = window.Y;
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame, window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
    var e = {
        index: 8,
        speed: 0,
        max: null,
        animation: null,
        windowEventsState: !1,
        windowAnimate: !1,
        timeout: null,
        time: 1200,
        easing: function(t) { return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1 },
        scrollTo: function() {
            if (t(window).top() < this.max) {
                this.currentTime = new Date, this.speed = (this.currentTime - this.beginTime) / this.time >= 1 ? 1 : (this.currentTime - this.beginTime) / this.time;
                var e = this.point * this.easing(this.speed);
                window.scrollTo(0, this.initial + e), this.animation = requestAnimationFrame(this.scrollTo.bind(this))
            } else window.scrollTo(0, this.max), cancelAnimationFrame(this.animation)
        },
        scroll: function() { t("body").hasClass("home") || (0 == t(window).top() && t("body").removeClass("darkest-header"), t(window).top() > 0 && !t("body").hasClass("darkest-header") && t("body").addClass("darkest-header")), t(".js-ban") && (0 == t(window).top() ? t(".js-ban").removeClass("show") : t(".js-ban").addClass("show")) },
        animateScroll: function() {
            if (t(".js-animate")) {
                var e;
                t(".js-animate").each(function(i) {
                    if (1 == (e = parseFloat(t(i).attr("data-animate-k")) / 100)) t(i).addClass("js-animated");
                    else {
                        var a = t(i).height() < t(window).height() ? t(i).height() * e : t(window).height() * e;
                        t(i).top() <= t(window).height() - a && !t(i).hasClass("js-animated") && t(i).addClass("js-animated")
                    }
                })
            }
        },
        windowEvents: function() { this.windowEventsState || (this.windowEventsState = !0, t(window).addEvent("scroll", this.scroll.bind(this))), this.windowAnimate || (this.windowAnimate = !0, t(window).addEvent("scroll", this.animateScroll.bind(this))) },
        events: function() { t("body").hasClass("skeleton") && (t(".js-btn-scroll") && t(".js-btn-scroll").addEvent("click", function(e) { e.preventDefault(), clearTimeout(this.timeout), this.timeout = null, this.current = t(window).top(), this.initial = t(window).top(), this.target = t(t(e.currentTarget).attr("href")), this.point = this.target.top() + t(window).height() <= t("body").height() ? this.target.top() : this.target.top() - (t(window).height() - this.target.height()), this.max = this.point + t(window).top(), this.speed = 0, this.beginTime = new Date, this.oldTime = this.beginTime, this.scrollTo(), setTimeout(function() { clearTimeout(this.timeout), cancelAnimationFrame(this.animation) }.bind(this), this.time + 50) }.bind(this)), t(".js-scroll-to") && t(".js-scroll-to").addEvent("click", function(e) { e.preventDefault(), clearTimeout(this.timeout), this.timeout = null, this.current = t(window).top(), this.initial = t(window).top(), this.target = t(t(e.currentTarget).attr("href")), this.point = this.target.top() + t(window).height() + t(window).top() <= t("body").height() ? this.target.top() : this.target.top() - (t(window).height() - this.target.height()), this.max = this.point + t(window).top(), this.speed = 0, this.beginTime = new Date, this.oldTime = this.beginTime, this.scrollTo(), setTimeout(function() { clearTimeout(this.timeout), cancelAnimationFrame(this.animation) }.bind(this), this.time + 50) }.bind(this))) },
        init: function() { this.windowEvents(), setTimeout(function() { this.animateScroll() }.bind(this), 200), this.scroll(), this.events() }
    };
    e.init(), window.scrollJs = e, window.myScripts.push(e)
}(),
function() {
    var t = window.Y,
        e = {
            sharers: [],
            Sharer: function(e) {
                this.self = t(e), this.type = this.self.data("sharer"), this.w = 720 > t(window).width() ? t(window).width() - 48 : 720, this.h = 400 > t(window).height() ? t(window).height() - 48 : 400, this.url = document.URL, this.initShare = function() {
                    var t = "";
                    switch (this.type) {
                        case "facebook":
                            t = "https://www.facebook.com/sharer/sharer.php?u=" + this.url, this.h, this.w;
                            break;
                        case "twitter":
                            t = "https://twitter.com/share?url=" + this.url, this.h, this.w;
                            break;
                        case "linkedin":
                            this.title = this.self.data("title"), t = "https://www.linkedin.com/shareArticle?mini=true&url=" + this.url + "&title=" + this.title + "&source=" + window.location.origin, this.h, this.w;
                            break;
                        default:
                            return !1
                    }
                    this.self.attr("href", t).attr("target", "_blank").attr("rel", "noopener")
                }, this.initShare()
            },
            windowEvents: function() {},
            events: function() {},
            init: function() { t(".js-sharer").each(function(t) { this.sharers.push(new this.Sharer(t)) }.bind(this)) }
        };
    t(".js-sharer") && e.init(), window.sharer = e
}(),
function() {
    var t = window.Y,
        e = {
            origin: window.location.origin,
            practitioners: null,
            categories: null,
            datas: { categories: "https://www.moovia.be/content.php/?category", practitioners: "https://www.moovia.be/content.php/?practitioner", articles: "https://www.moovia.be/content.php/?blog", testimonials: "https://www.moovia.be/content.php?testimonial", disciplines: "https://www.moovia.be/content.php?discipline" },
            cats: ["sport", "medical", "perineologie", "bien-etre", "piscine"],
            max: 5,
            current: 0,
            old: 0,
            assets: function() {
                var t = /[a-z0-9-]+\.html/gi;
                this.hash = window.location.hash.replace("#", ""), this.slug = window.location.pathname.match(t).toString().replace(".html", "")
            },
            loadImage: function(e, i, a) { i.removeClass("loader"), t(e).addClass("show"), e.alt = a + " | Moovia" },
            putBtnDiscipline: function(e) {
                for (var i = t("article[data-practice]").attr("data-practice"), a = 0; a < e.length; a++)
                    if (i == e[a].slug) t("<a>").attr("href", e[a].reservation).attr("target", "_blank").attr("rel", "noopener").addClass("btn--cta", "btn--cta--white").text("Prendre rendez-vous").appendTo(t(".js-header-content"))
            },
            putDisciplines: function(e) {
                for (var i = {}, a = 0; a < this.cats.length; a++) i[this.cats[a]] = [];
                for (var s = 0; s < e.length; s++) i[e[s].theme].push(e[s]);
                var n = t("#jsContainer"),
                    o = t("<ul>").addClass("appointment-cat-list").appendTo(n);
                for (var r in i)
                    if (i[r].length > 0)
                        for (var l = t("<li>").addClass("appointment-cat-itm").appendTo(o), d = t("<ul>").addClass("appointment-list").appendTo(l), a = 0; a < i[r].length; a++) {
                            var h = i[r][a],
                                c = t("<li>").addClass("appointment-itm").appendTo(d),
                                u = t("<a>").attr("href", h.reservation).attr("target", "_blank").attr("rel", "noopener").appendTo(c);
                            p = t("<p>").text(h.title).appendTo(u), line = t("<span>").addClass("line").appendTo(u), btn = t("<span>").addClass("btn--cta", "btn--cta--" + h.theme).text("Prendre rendez-vous").appendTo(u)
                        }
            },
            putArticle: function(e) {
                var e = e;
                t("body").addClass(e.categorie), t("title").text(e.title + " | Moovia"), t("meta[name='description']").attr("content", e.resume), t("meta[name='og:title']").attr("content", e.title), t("meta[name='og:description']").attr("content", e.resume), t("meta[name='og:image']").attr("content", e.header.url), t("meta[name='og:image:height']").destroy();
                var i = t(".skeleton-wrapper"),
                    a = t("<header>").addClass("skeleton-header", "flx", "flx-v-center"),
                    s = t("<h1>").text(e.title).addClass("flx-xxxs-12", "itm-2", "js-animate").attr("data-animate", "fade--top").attr("data-animate-k", 100),
                    n = t("<small>").text("Blog").addClass("flx-xxxs-12", "itm-1", "js-animate").attr("data-animate", "fade--top").attr("data-animate-k", 100),
                    o = t("<p>").text(e.resume).addClass("skeleton-subtitle", "flx-xxxs-12", "flx-sm-8", "itm-3", "js-animate").attr("data-animate", "fade--top").attr("data-animate-k", 100),
                    r = t("<div>").addClass("skeleton-header-image"),
                    l = t("<a>").attr("href", "#jsContainer").addClass("js-btn-scroll", "btn-down").html("<span></span>"),
                    d = new Image;
                d.onload = function() { d.alt = e.header.alt + " | Moovia", r.append(d), r.css("background-image", "url(" + e.header.url + ")"), t("body").removeClass("load"), t(".loader-global").addClass("invisible"), setTimeout(function() { t(".loader-global").destroy() }, t(".loader-global").timing() + 100) }, d.src = e.header.url, a.append(s, n, o, r, l), i.append(a), window.scrollJs.events();
                for (var h = t("<div>").addClass("skeleton-content", "flx").attr("id", "jsContainer"), c = t("<section>").addClass("skeleton-section", "flx", "js-animate").attr("data-animate", "fade--top").attr("data-animate-k", 30), p = t("<div>").addClass("skeleton-section-content", "flx-xxxs-12"), u = t("<div>").addClass("skeleton-section-image"), m = e.content.length, w = 0; w < m; w++) {
                    for (var g = e.content[w].content.length, f = !(g > 1), v = c.clone(), b = [], y = 0; y < g; y++) {
                        var x = e.content[w].content[y].length,
                            f = !(g > 1),
                            C = p.clone();
                        f || C.addClass("flx-sm-6");
                        for (var T = 0; T < x; T++) {
                            var k = e.content[w].content[y][T];
                            if ("text" == k.mod) C.html(C.html() + k.data), b.push(C);
                            else {
                                var j = new Image;
                                if (f) v = t("<div>").addClass("skeleton-section", "skeleton-section-full", "js-animate").attr("data-animate", "fade-scale").attr("data-animate-k", 30), C = t("<div>").addClass("skeleton-section-sub", "loader"), j.onload = this.loadImage(j, C, e.content[w].background), C.css("background-image", "url(" + e.content[w].background.url + ")");
                                else {
                                    var E = u.clone().addClass("loader").append(j);
                                    C.append(E), j.onload = this.loadImage(j, E, k.data.alt)
                                }
                                j.src = k.data.url, b.push(C)
                            }
                        }
                    }
                    if (b.length > 0)
                        for (var P = 0; P < b.length; P++) v.append(b[P]);
                    h.append(v)
                }
                var S = t("<footer>").addClass("skeleton-sharer", "flx", "flx-v-center"),
                    A = t("<p>").text("Partagez cet article"),
                    q = t("<a>").addClass("icons", "icons-fbk-w", "js-sharer").data("sharer", "facebook").attr("href", "#"),
                    M = t("<a>").addClass("icons", "icons-tw-w", "js-sharer").data("sharer", "twitter").attr("href", "#"),
                    I = t("<a>").addClass("icons", "icons-in-w", "js-sharer").data("sharer", "linkedin").data("title", e.title).attr("href", "#");
                S.append(A, q, M, I), i.append(h, S), window.sharer.init()
            },
            putArticles: function() {
                if (this.current < window.articles.length) {
                    this.old = this.current, this.current = this.current + this.max > window.articles.length ? window.articles.length : this.current + this.max, this.current == window.articles.length && t(".js-btn-more").destroy();
                    var e, i = window.articles;
                    e = t(".skeleton-articles-list") ? t(".skeleton-articles-list") : t("<ul>").addClass("skeleton-articles-list", "flx-xxxs-12");
                    i.length;
                    var a = t("<a>").addClass("btn", "btn-round", "btn-plus");
                    a.html("<svg viewBox='0 0 48 48'><circle cx='24' cy='24' r='23' stroke='#333' stroke-width='2' fill='none'></circle></svg><span></span>Lire la suite");
                    for (var s = this.old; s < this.current; s++) {
                        var n = i[s].categorie || "sport",
                            o = t("<li>").addClass("skeleton-article-wrapper"),
                            r = t("<article>").addClass("skeleton-article", "skeleton-article"),
                            l = t("<div>").addClass("skeleton-loader", "flx").append(t("<div>").addClass("loader", "flx-xxxs-12", "flx-sm-3", "flx-md-5", "flx-lg-6")),
                            d = t("<div>").addClass("skeleton-image-wrapper", "js-animate").attr("data-animate", "fade-scale").attr("data-animate-k", "45"),
                            h = t("<div>").addClass("skeleton-article-content", "flx-xxxs-12", "flx-sm-9", "flx-md-7", "flx-lg-6", "js-animate").attr("data-animate", "fade").attr("data-animate-k", "60");
                        h.addClass("skeleton-article-content-" + n);
                        t("<h2>").text(i[s].title).appendTo(h), t("<p>").text(i[s].resume).appendTo(h), a.clone(!0).attr("href", "/article/" + i[s].slug + ".html").attr("data-slug", "/article/" + i[s].slug + ".html").appendTo(h);
                        r.append(l, d, h);
                        var c = new Image;
                        d.append(c), c.onload = this.loadImage(c, d, i[s].header.alt), d.css("background-image", "url(" + i[s].header.url + ")"), c.src = i[s].header.url, e.append(o.append(r))
                    }
                    t(".skeleton-articles-list") || t(".skeleton-content").append(e), t(".loader-global") && t(".loader-global").destroy(), window.router.reset()
                }
            },
            putPractitionersInPractices: function() {
                for (var e = window.practitioners, i = e.length, a = [], s = 0; s < i; s++) e[s].categories.forEach(function(i) { i == t("article[data-practice]").attr("data-practice") && a.push(e[s]) });
                if (a.length > 0) {
                    for (var n = a.length, o = t(".js-loaded-content"), r = t("<footer>").addClass("skeleton-practitioners", "flx-xxxs-12", "js-animate").attr("data-animate", "fade--top").attr("data-animate-k", "65"), l = t("<h2>").text("Praticiens"), d = t("<ul>").addClass("flx"), s = 0; s < n; s++) {
                        var h = t("<li>").addClass("flx-xxxs-12", "flx-xs-6").appendTo(d),
                            c = t("<a>").attr("href", "/praticien/" + a[s].slug + ".html").attr("data-slug", "/praticien/" + a[s].slug + ".html").appendTo(h),
                            p = t("<div>").addClass("skeleton-img-wrapper", "loader").appendTo(c);
                        a[s].thumbhover && t("<span>").addClass("skeleton-img-hover").css("background-image", "url('" + a[s].thumbhover.url + "')").appendTo(p);
                        t("<h3>").html("<span>" + a[s].lastname + "</span> " + a[s].firstname).appendTo(c), t("<a>").attr("href", "mailto:" + a[s].mail).text(a[s].mail).appendTo(h);
                        if (a[s].phone) t("<a>").attr("href", "tel:" + a[s].phone.href).text(a[s].phone.text).appendTo(h);
                        var u = new Image;
                        t(u).appendTo(p), !1 === a[s].thumb ? "w" === a[s].sexe ? (u.onload = this.loadImage(u, p, "Praticienne"), u.src = "https://www.moovia.be/image/practitioners/placeholder-femme_1200_moovia.jpg") : (u.onload = this.loadImage(u, p, "Praticien"), u.src = "https://www.moovia.be/image/practitioners/placeholder-homme_1200_moovia.jpg") : (u.onload = this.loadImage(u, p, a[s].thumb.alt), u.src = a[s].thumb.url)
                    }
                    r.append(l, d).appendTo(o), window.router.reset()
                }
            },
            putPractitioners: function() {
                for (var e = window.practitioners, i = window.categories, a = i.length, s = e.length, n = [], o = 0; o < a; o++) {
                    var r = {};
                    r.title = i[o].title, r.practitioners = [];
                    for (w = 0; w < s; w++) e[w].teams.forEach(function(t) { t == i[o].slug && (e[w].index = w, r.practitioners.push(e[w])) });
                    n.push(r)
                }
                for (var l = n.length, d = t(".js-loaded-content"), o = 0; o < l; o++) {
                    for (var h = t("<section>").addClass("skeleton-practitioners", "js-animate").attr("data-animate", "fade--top").attr("data-animate-k", "30"), c = t("<h2>").text(n[o].title), p = t("<ul>").addClass("flx"), u = n[o].practitioners, m = u.length, w = 0; w < m; w++) {
                        var g = t("<li>").addClass("flx-xxxs-12", "flx-xs-6").appendTo(p),
                            f = t("<a>").attr("href", "/praticien/" + u[w].slug + ".html").attr("data-slug", "/praticien/" + u[w].slug + ".html").appendTo(g),
                            v = t("<div>").addClass("skeleton-img-wrapper").appendTo(f);
                        u[w].thumbhover && t("<span>").addClass("skeleton-img-hover").css("background-image", "url('" + u[w].thumbhover.url + "')").appendTo(v);
                        t("<h3>").html("<span>" + u[w].lastname + "</span> " + u[w].firstname).appendTo(f), t("<a>").attr("href", "mailto:" + u[w].mail).text(u[w].mail).appendTo(g);
                        if (u[w].phone && u[w].phone.href.length > 0) t("<a>").attr("href", "tel:" + u[w].phone.href).text(u[w].phone.text).appendTo(g);
                        var b = new Image;
                        v.append(b), !1 === u[w].thumb ? "w" === u[w].sexe ? (b.onload = this.loadImage(b, v, "Praticienne"), b.src = "https://www.moovia.be/image/practitioners/placeholder-femme_1200_moovia.jpg") : (b.onload = this.loadImage(b, v, "Praticien"), b.src = "https://www.moovia.be/image/practitioners/placeholder-homme_1200_moovia.jpg") : (b.onload = this.loadImage(b, v, u[w].thumb.alt), b.src = u[w].thumb.url)
                    }
                    t(".loader").addClass("hide"), h.append(c, p).appendTo(d)
                }
                window.router.reset()
            },
            putPractitioner: function(e) {
                console.log(e), t("title").html(e.lastname + " " + e.firstname + " – Praticien | Moovia");
                for (var i = t("<article>").addClass("flx", "hide"), a = "w" == e.sexe ? "Praticienne" : "Praticien", s = t("<small>").text(a).addClass("flx-xxxs-12"), n = t("<h1>").text(e.lastname + " " + e.firstname).addClass("flx-xxxs-12"), o = t("<div>").addClass("btn-wrapper", "flx-xxxs-12"), r = (t("<a>").attr("href", e.reservation).attr("target", "_blank").attr("rel", "noopener").addClass("btn--cta").text("Prendre rendez-vous").appendTo(o), t("<ul>").addClass("practitioners-discipline", "flx-xxxs-12")), l = 0; l < e.practices.length; l++) t("<p>").html(e.practices[l]).appendTo(r);
                var d = t("<ul>").addClass("practitioners-contact", "flx-xxxs-12"),
                    h = (t("<a>").attr("href", "mailto:" + e.mail).text(e.mail).appendTo(t("<p>").appendTo(d)), t("<p>"));
                if (e.phone && e.phone.href.length > 0) t("<a>").attr("href", "tel:" + e.phone.href).text(e.phone.text).appendTo(h);
                t("<a>").attr("href", "tel:+3210452191").text("+32(0)10/45.21.91").appendTo(h);
                h.appendTo(d);
                var c = t("<blockquote>").addClass("practitioners-quote", "flx-xxxs-12", "flx-sm-8", "flx-lg-6");
                if (e.quote && e.quote.length > 0) t("<p>").text(e.quote).appendTo(c);
                var p, u, m = t("<div>").addClass("practitioners-image");
                !1 === e.background ? "w" === e.sexe ? (p = "https://www.moovia.be/image/background/placeholder-femme_moovia.jpg", u = "Praticienne | Moovia") : (p = "https://www.moovia.be/image/background/placeholder-homme_moovia.jpg", u = "Praticien | Moovia") : (p = e.background.url, u = e.background.alt + " | Moovia"), m.css("background-image", "url(" + p + ")"), i.append(s, n, r, d, c, o, m).appendFirst(t(".js-shell"));
                var w = new Image;
                m.append(w), w.onload = function() { w.alt = u, t("body").addClass("light-header"), t(".loader").addClass("invisible"), setTimeout(function() { t("body").removeClass("load"), t(".loader-global").destroy(), i.removeClass("hide") }, t(".loader-global").timing()) }, w.src = p
            },
            putTestimonials: function() {
                var e = window.testimonials,
                    i = "skeleton-testimonial-",
                    a = t(".skeleton-content"),
                    s = t("<ul>").addClass(i + "wrapper", "flx"),
                    n = t("<li>").addClass(i + "item", "flx", "flx-xxxs-12", "js-animate").attr("data-animate", "fade--top").attr("data-animate-k", 30),
                    o = t("<p>").addClass(i + "citation"),
                    r = t("<div>").addClass(i + "profile", "flx", "flx-v-center"),
                    l = t("<p>").addClass(i + "name", "flx-xxxs-12"),
                    d = t("<p>").addClass(i + "job", "flx-xxxs-12"),
                    h = t("<div>").addClass(i + "img-wrapper");
                t(".loader-global").destroy(), e.forEach(function(e) {
                    var c = e.categorie,
                        p = t("<blockquote>"),
                        u = (o.clone().text(e.resume).appendTo(p), l.clone().text(e.author)),
                        m = d.clone().text(e.title),
                        w = h.clone().css("background-image", "url(" + e.thumb.url + ")"),
                        g = (r.clone().append(u, m, w).appendTo(p), n.clone().addClass(i + c).append(p)),
                        f = new Image;
                    w.append(f), f.onload = this.loadImage(f, w, e.thumb.alt), f.src = e.thumb.url, e.resume.length <= 350 && g.addClass("flx-md-6"), s.append(g).appendTo(a)
                }.bind(this)), s.appendTo(a)
            },
            getXhr: function() { if (!window.XMLHttpRequest && !window.ActiveXObject) return null; if (!window.ActiveXObject) return new XMLHttpRequest; try { return new ActiveXObject("Msxml2.XMLHTTP") } catch (t) { return new ActiveXObject("Microsoft.XMLHTTP") } },
            getDisciplines: function(t, e) { window.disciplines ? e(window.disciplines) : this.ajax(t, function(t) { window.disciplines = t, e(t) }.bind(this)) },
            getArticle: function(t) { this.ajax(t, function(t) { t ? this.putArticle(t) : window.router.getDatas("/erreur404.html") }.bind(this)) },
            getArticles: function(t) { "undefined" !== window.articles ? this.ajax(t, function(t) { window.articles = t, this.putArticles() }.bind(this)) : this.putArticles() },
            getPractitioners: function(t) { window.practitioners ? this.getCategory(t) : this.ajax("https://www.moovia.be/content.php/?practitioner", function(e) { window.practitioners = e, this.getCategory(t) }.bind(this)) },
            getPractitioner: function() { for (var t = window.practitioners.length, e = 0; e < t; e++) window.practitioners[e].slug == this.slug && this.putPractitioner(window.practitioners[e]) },
            getCategory: function(t) { window.categories ? t() : this.ajax("https://www.moovia.be/content.php/?category", function(e) { window.categories = e, t() }.bind(this)) },
            getTestimonials: function(t, e) {
                window.testimonials ? e() : this.ajax(t, function(t) {
                    var i = [],
                        a = [],
                        s = [],
                        n = 0,
                        o = 0;
                    if (t.forEach(function(t) { t.resume.length > 350 ? a.push(t) : i.push(t) }), a.length > 0 && i.length > 0)
                        for (r = 0; r < i.length + a.length; r++)(r + 1) / 3 % 1 == 0 && n + 1 <= a.length ? (s.push(a[n]), n++) : (s.push(i[o]), o++);
                    if (n <= a.length)
                        for (r = n; r < a.length; r++) s.push(a[r]);
                    if (o <= i.length)
                        for (var r = o; r < i.length; r++) s.push(i[r]);
                    window.testimonials = s, e()
                }.bind(this))
            },
            ajax: function(t, e) {
                var i = t,
                    a = this.getXhr();
                a.onreadystatechange = function() {
                    if (4 == a.readyState && (200 == a.status || 0 == a.status)) {
                        var t = JSON.parse(a.responseText);
                        e(t)
                    }
                }.bind(this), a.open("GET", i, !0), a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), a.send("")
            },
            events: function() { t(".js-btn-more") && t(".js-btn-more").addEvent("click", this.putArticles.bind(this)) },
            init: function() { this.current = 0, this.events(), t("body").hasClass("practitioners") && (this.assets(), this.slug.length > 0 && "praticien" !== this.slug ? this.getPractitioners(this.getPractitioner.bind(this)) : window.location = this.origin + "/praticiens.html"), t("body").hasClass("team") && this.getPractitioners(this.putPractitioners.bind(this)), t("body").hasClass("practices") && (this.getPractitioners(this.putPractitionersInPractices.bind(this)), this.getDisciplines(this.datas.disciplines, this.putBtnDiscipline.bind(this))), t("body").hasClass("appointment") && this.getDisciplines(this.datas.disciplines, this.putDisciplines.bind(this)), t("body").hasClass("blog") && this.getArticles(this.datas.articles), t("body").hasClass("testimonial") && this.getTestimonials(this.datas.testimonials, this.putTestimonials.bind(this)), t("body").hasClass("article") && (this.assets(), this.slug.length > 0 && "article" !== this.slug ? (console.log(this.datas.articles + "=" + this.slug), this.getArticle(this.datas.articles + "=" + this.slug)) : window.location = this.origin + "/blog.html") }
        };
    e.init(), window.myScripts.push(e)
}(),
function() {
    var t = window.Y,
        e = {
            initMap: function() {
                var e = { scrollwheel: !1, zoom: t(window).width() <= 640 ? 11 : 12, maxZoom: 20, mapTypeControl: !1, streetViewControl: !1, draggable: !0, center: { lat: 50.697479, lng: 4.5694723 }, styles: [{ featureType: "administrative", elementType: "geometry.fill", stylers: [{ visibility: "off" }] }, { featureType: "administrative", elementType: "labels.text", stylers: [{ visibility: "on" }, { color: "#8e8e8e" }] }, { featureType: "administrative", elementType: "labels.text.fill", stylers: [{ color: "#7f7f7f" }] }, { featureType: "administrative", elementType: "labels.text.stroke", stylers: [{ visibility: "off" }] }, { featureType: "administrative.country", elementType: "geometry.stroke", stylers: [{ color: "#bebebe" }] }, { featureType: "administrative.province", elementType: "geometry.stroke", stylers: [{ visibility: "on" }, { color: "#cbcbcb" }, { weight: "0.69" }] }, { featureType: "administrative.locality", elementType: "geometry", stylers: [{ visibility: "simplified" }] }, { featureType: "landscape", elementType: "all", stylers: [{ color: "#e4e4e4" }] }, { featureType: "poi", elementType: "all", stylers: [{ visibility: "off" }] }, { featureType: "road", elementType: "all", stylers: [{ saturation: -100 }, { lightness: 45 }, { visibility: "simplified" }] }, { featureType: "road", elementType: "geometry.stroke", stylers: [{ visibility: "off" }] }, { featureType: "road", elementType: "labels", stylers: [{ visibility: "off" }] }, { featureType: "road.highway", elementType: "all", stylers: [{ visibility: "simplified" }, { color: "#dadada" }] }, { featureType: "road.highway", elementType: "labels", stylers: [{ visibility: "off" }] }, { featureType: "road.highway", elementType: "labels.text", stylers: [{ visibility: "simplified" }] }, { featureType: "road.arterial", elementType: "all", stylers: [{ visibility: "on" }] }, { featureType: "road.arterial", elementType: "labels.text", stylers: [{ visibility: "simplified" }] }, { featureType: "road.arterial", elementType: "labels.icon", stylers: [{ visibility: "off" }] }, { featureType: "road.local", elementType: "all", stylers: [{ visibility: "simplified" }] }, { featureType: "road.local", elementType: "geometry", stylers: [{ color: "#eeeeee" }] }, { featureType: "road.local", elementType: "labels.text", stylers: [{ visibility: "simplified" }] }, { featureType: "transit", elementType: "all", stylers: [{ visibility: "off" }] }, { featureType: "water", elementType: "all", stylers: [{ color: "#cbcbcb" }, { visibility: "on" }] }, { featureType: "water", elementType: "geometry.fill", stylers: [{ color: "#d9d9d9" }] }, { featureType: "water", elementType: "geometry.stroke", stylers: [{ visibility: "off" }] }, { featureType: "water", elementType: "labels.text", stylers: [{ visibility: "simplified" }] }] },
                    i = new google.maps.Map(document.getElementById("js-google-map"), e);
                [{ position: new google.maps.LatLng(50.67129, 4.645797), icon: { url: "/img/icons/pin-piscine.png", size: new google.maps.Size(48, 72), origin: new google.maps.Point(0, 0), anchor: new google.maps.Point(24, 48), scaledSize: new google.maps.Size(32, 48), optimized: !1 } }, { position: new google.maps.LatLng(50.7217175, 4.5141278), icon: { url: "/img/icons/pin-sport.png", size: new google.maps.Size(48, 72), origin: new google.maps.Point(0, 0), anchor: new google.maps.Point(24, 48), scaledSize: new google.maps.Size(32, 48), optimized: !1 } }].forEach(function(t) { new google.maps.Marker({ position: t.position, map: i, title: "Moovia", animation: google.maps.Animation.DROP, icon: t.icon }) })
            },
            init: function() { t("body").hasClass("contact") && document.getElementById("js-google-map") && e.initMap() }
        };
    e.init(), window.myScripts.push(e)
}(),
function() {
    var t = window.Y,
        e = { windowEventsState: !1, timeout: null, windowEvents: function() { this.windowEventsState || (this.windowEventsState = !0, t(window).addEvent("resize", function() { t("body").hasClass("js-resizing") || t("body").addClass("js-resizing"), clearTimeout(this.timeout), this.timeout = setTimeout(function() { t("body").removeClass("js-resizing") }, 400) }.bind(this))) }, init: function() { this.windowEvents() } };
    e.init(), window.myScripts.push(e)
}(),
function() {
    var t = window.Y,
        e = {
            usr: "",
            pwd: "",
            id: "",
            w: window.screen.width,
            h: window.screen.height,
            param: window.location.search.replace("?", "").split("&"),
            loadIframe: function() {
                var e = "//www.physiotec.org/index.php?do=patient&action=new_load&username=" + this.usr + "&password=" + this.pwd + "&iframe=y&remove_header=y&screen_resolution_width=" + this.w + "&screen_resolution_hight=" + this.h + "&directAccess=yes&idProgram=" + this.id;
                t("<iframe>").attr("id", "physiotec").attr("src", e).appendTo(t("#iframeWrapper"));
                t("#iframeForm").destroy()
            },
            checkForm: function(e) {
                if ("click" == e.type) {
                    var i = !0;
                    t(".js-required").each(function(e) { "" == e.value ? (t(e).addClass("empty"), i = !1) : "login" == t(e).attr("id") ? this.usr = e.value : "password" == t(e).attr("id") && (this.pwd = e.value) }.bind(this)), i && this.loadIframe()
                } else "blur" == e.type && ("" != e.currentTarget.value ? (t(e.currentTarget).hasClass("empty") && t(e.currentTarget).removeClass("empty"), t(e.currentTarget).addClass("complete")) : t(e.currentTarget).removeClass("complete"))
            },
            checkUrl: function() {
                if ("" != location.search) {
                    for (var t = 0; t < this.param.length; t++) {
                        var e = this.param[t].split("="),
                            i = e[0],
                            a = e[1].replace(/%22/g, "");
                        "username" == i ? this.usr = a : "password" == i ? this.pwd = a : "idProgram" == i && (this.id = a)
                    }
                    "" != this.usr && "" != this.pwd && this.loadIframe()
                }
            },
            windowEvents: function() { t(window).addEvent("load", this.checkUrl.bind(this)) },
            events: function() { t("#btn-login").addEvent("click", function(t) { t.preventDefault(), this.checkForm(t) }.bind(this)), t("input").addEvent("blur", function(e) { this.checkForm(e), t(e.currentTarget).parent().removeClass("focus") }.bind(this)), t("input").addEvent("focus", function(e) { t(e.currentTarget).parent().addClass("focus") }) },
            init: function() { t("body").hasClass("physiotec") && (t("input").each(function(t) { t.value = "" }), this.windowEvents(), this.events()) }
        };
    e.init(), window.myScripts.push(e)
}(),
function() {
    var t = window.Y,
        e = {
            assets: function() { this.datas = {}, this.getXhr(), this.php = t("#contactForm").attr("action") },
            getXhr: function() { if (!window.XMLHttpRequest && !window.ActiveXObject) return null; if (window.ActiveXObject) try { this.xhr = new ActiveXObject("Msxml2.XMLHTTP") } catch (t) { this.xhr = new ActiveXObject("Microsoft.XMLHTTP") } else this.xhr = new XMLHttpRequest },
            checkForm: function(e) {
                if ("click" == e.type) {
                    var i = 0;
                    t(".js-required").each(function(e) { "" == e.value ? t(e).addClass("empty") : e.checkValidity() && (i++, this.datas[t(e).attr("id")] = e.value.trim().replace(/<[^>]*>/g, "")) }.bind(this)), i == t(".js-required").length() && this.send()
                } else "blur" == e.type && ("" != e.currentTarget.value ? (t(e.currentTarget).hasClass("empty") && t(e.currentTarget).removeClass("empty"), t(e.currentTarget).addClass("complete")) : t(e.currentTarget).removeClass("complete"))
            },
            clearInputs: function() { t(".js-input").each(function(e) { e.value = "", t(e).removeClass("empty", "complete") }) },
            send: function() {
                if (t("body").hasClass("landing")) e = window.location;
                else var e = window.location.origin + "/" + this.php;
                var i = JSON.stringify(this.datas);
                this.xhr.onreadystatechange = function() {
                    if (4 == this.xhr.readyState && (200 == this.xhr.status || 0 == this.xhr.status))
                        if ("true" === String(this.xhr.responseText)) {
                            if (this.clearInputs(), t("body").hasClass("landing")) {
                                var e = window.location.href.replace("ad/", "ad/merci/");
                                window.location = e
                            }
                            t(".js-message") && (t(".js-message-content").text("Votre message a bien été envoyé"), t(".js-message").addClass("show"), setTimeout(function() { t(".js-message").removeClass("show") }, 5e3))
                        } else alert("Votre message n'a pas pu être envoyé")
                }.bind(this), this.xhr.open("POST", e, !0), this.xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"), this.xhr.send("datas=" + i)
            },
            windowEvents: function() {},
            events: function() { t("#send").addEvent("click", function(t) { t.preventDefault(), this.checkForm(t) }.bind(this)), t(".js-required").addEvent("blur", function(e) { this.checkForm(e), t(e.currentTarget).parent().removeClass("focus") }.bind(this)), t(".js-input").addEvent("focus", function(e) { t(e.currentTarget).parent().addClass("focus") }), t(".js-message") && t(".js-message").addEvent("click", function() { t(this).removeClass("show") }) },
            init: function() { t(".js-form") && (this.assets(), this.clearInputs(), this.events()) }
        };
    e.init(), window.myScripts.push(e)
}();