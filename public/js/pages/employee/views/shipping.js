/*global define */

define([
    'backbone',
    'tmpl!pages/employee/templates/shipping'
], function (
    Backbone,
    shippingTmpl
) {
    return Backbone.View.extend({

        initialize: function () {
        },

        events: {
        },

        render: function () {
            this.$el.html(shippingTmpl({
                msg: "Click on an Order to Load it"
            }));
            return this;
        },
        gotOrder: function (data) {
            this.$el.html(shippingTmpl(data));
        }
    });
});