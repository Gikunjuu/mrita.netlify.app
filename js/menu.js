! function() {
    var t = window.Y,
        e = {
            windowEventsState: !1,
            links: t("a[data-slug-particular]"),
            categories: ["rugby"],
            assets: function(e) { this.w = t(".category"), t(this.w.ele[e]).addClass("active-"), t("body").addClass(this.categories[e]), this.current = t(".category.active-"), this.x = t(window).width(), this.y = t(window).height(), this.index = e, this.k = 8, this.time = 3500, this.looping = !0, this.timeouts = [] },
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

            on: function(e) { setTimeout(function() { 0 == this.index ? this.current.replaceClass("active-", "active") : (t(".active-").removeClass("active-"), this.current = t(this.w.ele[this.index]), this.current.addClass("active")), e && this.openCategory(), this.drawCircles(this.current, this.current.timing()) }.bind(this), 20) },
            windowEvents: function() { this.windowEventsState || (this.windowEventsState = !0, t(window).addEvent("mousemove", function(t) { this.animations(t) }.bind(this)), t(window).addEvent("resize", this.resizeAssets.bind(this))) },
            events: function() { this.links.addEvent("click", function(e) { e.preventDefault(), t("body").hasClass("home") && !t(e.currentTarget).hasClass("active") && (this.killTimeouts(), this.oldCategory = this.categories[this.index], this.index = parseFloat(t(e.currentTarget).attr("data-category")), this.step(this.openCategory)) }.bind(this)), t(".js-category-body").addEvent("click", function(t) { t.preventDefault(), this.openCategory() }.bind(this)), t(".btn-plus").addEvent("click", function(t) { t.preventDefault(), this.openCategory() }.bind(this)), t(".js-category-next").addEvent("click", this.next.bind(this)), t(".js-category-previous").addEvent("click", this.previous.bind(this)), t("body").addEvent("touchstart", function(t) { this.touchstart = t.touches[0].clientX }.bind(this)), t("body").addEvent("touchend", function(e) { this.touchend = e.changedTouches[0].clientX, Math.abs(this.touchstart - this.touchend) > this.x / 100 * 20 && t("body").hasClass("home") && (this.touchstart < this.touchend ? this.previous() : this.next()) }.bind(this)) },
            init: function(e, i) {
                if (t("body").hasClass("home")) {
                    var a = null == e ? Math.round(4 * Math.random()) : e;
                    t("body").addClass(this.categories[a]);
                    var s = i || !1;
                    this.timeouts && this.killTimeouts(), this.assets(a), this.on(s), this.windowEvents(), this.events()
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
}()