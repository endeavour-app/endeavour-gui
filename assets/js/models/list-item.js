$(function() {

    Endeavour.Model.ListItem = Endeavour.Model.Abstract.extend({

        urlRoot: 'http://api.endeavour.local/listitems',

        defaults: {
            'ID':                 null, // int
            'ParentID':           null, // int
            'UserID':             null, // int
            'Title':              null, // string
            'Description':        null, // string
            'Created':            null, // str - ISO-8601 date
            'Due':                null, // str - ISO-8601 date
            'Completed':          null, // str - ISO-8601 date
            'Deleted':            null, // boolean
        },

        created: null,
        due: null,
        completed: null,

        initialize: function() {

            this.items = new Endeavour.Collection.ListItems;

            this.on('change:Created', this.onChangeCreated, this);
            this.on('change:Due', this.onChangeDue, this);
            this.on('change:Completed', this.onChangeCompleted, this);

            this.on('sync', this.onSync, this);

        },

        getListItems: function() {
            if (this.items.length < 1) return null;
            return this.items;
        },

        loadListItems: function() {
            this.items.url = 'http://api.endeavour.local/lists/' + this.id + '/items';
            this.items.fetch();
            return this;
        },

        onChangeCreated: function() {
            this.created = new Date(this.get('Created'));
            return this;
        },

        onChangeDue: function() {
            this.due = new Date(this.get('Due'));
            return this;
        },

        onChangeCompleted: function() {
            this.completed = new Date(this.get('Completed'));
            return this;
        },

        onSync: function() {
            console.log('user sync',this);
            return this;
        },

    });

    Endeavour.Collection.ListItems = Endeavour.Collection.Abstract.extend({
        model: Endeavour.Model.ListItem
    });

});