$(function() {

    window.Endeavour.View.Header = Backbone.Marionette.View.extend({

        tagName: 'div',
        className: 'header',
        id: 'header',

        initialize: function() {

            this.els = {};

            this.els.leftButtonsContainer = $('<div class="left-buttons"><div class="logo"></div><ul></ul></div>');
            this.els.leftButtons = this.els.leftButtonsContainer.find('ul');
            this.els.rightButtonsContainer = $('<div class="right-buttons"><ul></ul></div>');
            this.els.rightButtons = this.els.rightButtonsContainer.find('ul');

            this.$el
                .append(this.els.title)
                .append(this.els.leftButtonsContainer)
                .append(this.els.rightButtonsContainer);

            this.addButton('left', 'home', 'Dashboard', '#/dashboard');
            this.addButton('left', 'my-lists', 'My Lists', '#/lists');
            // this.addButton('left', 'calendar', 'Calendar', '#/calendar');
            // this.addButton('left', 'today', 'Today', '#/today');
            this.addButton('left', 'feedback', 'Feedback', $.proxy(this.onClickFeedback, this));

            this.addButton('right', 'my-account', 'My Account', '#/my-account');
            this.addButton('right', 'logout', 'Log out', $.proxy(this.onClickLogout, this));

            Endeavour.subscribe('change:user', this.render, this);

        },

        render: function() {
            if (Endeavour.state.session.user) {
                this.$el.find('.button.my-account a').html('')
                    .append('<img src="" class="avatar" />')
                    .append(Endeavour.state.session.user.getFullName());
                this.$el.find('.button.my-account a img.avatar').attr('src', Endeavour.state.session.user.get('AvatarURL'));
            }
            return this;
        },

        addButton: function(side, tagClass, label, callback) {

            var buttonEl = $('<li class="button ' + tagClass + '"><a href="#"></a></li>');
            buttonEl.find('a').append(label);

            if (typeof callback == 'function') {
                // buttonEl.on('click', $.proxy(callback, this));
                buttonEl.on('click', callback);
            }
            else {
                buttonEl.find('a').attr('href', callback);
            }

            this.els[side + 'Buttons'].append(buttonEl);

            return this;

        },

        onClickFeedback: function(ev) {
            ev.preventDefault();
            Endeavour.publish('show:dialog', 'feedback');
            return this;
        },

        onClickLogout: function() {
            Endeavour.state.logout();
            return this;
        },

    });

});