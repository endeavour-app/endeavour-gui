$(function() {

    Endeavour.on('initialize:before', function(options) {
        console.log('Initialization Starting...');
        options.router = new Endeavour.Router();
    });

    Endeavour.on('initialize:after', function(options) {
        console.log('Initialization Finished');
    });

    Endeavour.on('start', function(options) {

        console.log('Endeavour start',options);

        // Copy options to Endeavour object
        window.Endeavour.router = options.router;
        window.Endeavour.state = new Endeavour.Model.State;

        // Load stage view
        window.Endeavour.stage = new Endeavour.View.Stage;
        $('body').prepend(window.Endeavour.stage.render().$el);

        // Start backbone history
        Backbone.history.start({pushState: false});

    });

    Endeavour.start({});

});