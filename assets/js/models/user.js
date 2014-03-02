$(function() {

    Endeavour.Model.User = Endeavour.Model.Abstract.extend({

        urlRoot: 'http://api.endeavour.local/users',

        defaults: {
            'ID':                 null, // int
            'EmailAddress':       null, // str
            'FirstName':          null, // str
            'LastName':           null, // str
            'Created':            null, // str - ISO-8601 date
            'Modified':           null, // str - ISO-8601 date
        },

        initialize: function() {

            this.lists = new Endeavour.Collection.Lists;
            this.lists.url = 'http://api.endeavour.local/lists';

            this.on('sync', this.onSync, this);

        },

        onSync: function() {
            console.log('user sync',this);
            this.lists.fetch();
            return this;
        },

    });

});