define([
    'postmonger'
], function (
    Postmonger
) {
    'use strict';

    var connection = new Postmonger.Session();
    var authTokens = {};
    var payload = {};
    $(window).ready(onRender);

    connection.on('initActivity', initialize);
    connection.on('requestedTokens', onGetTokens);
    connection.on('requestedEndpoints', onGetEndpoints);

    connection.on('clickedNext', save);
   
    function onRender() {
        // JB will respond the first time 'ready' is called with 'initActivity'
        connection.trigger('ready');
        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');

    }

    function initialize(data) {
		alert('entrou no initialize');
        console.log(data);
        if (data) {
            payload = data;
        }
        
        var hasInArguments = Boolean(
            payload['arguments'] &&
            payload['arguments'].execute &&
            payload['arguments'].execute.inArguments &&
            payload['arguments'].execute.inArguments.length > 0
        );

        var inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};

        console.log(inArguments);





        $.each(inArguments, function (index, inArgument) {
			var variaveis;
			$.each(inArgument, function (key, val) {
                alert(key + ' -> ' + val);
				variaveis = variaveis + val; 
				
            });
			
			var bodyText = {
		"grant_type":"client_credentials",
		"client_id":"cfly1ym6xx6y34jbqw0idypq",
		"client_secret":"FXaTXByn5UyO7r1equQ8OwxU",
		"variaveis" : variaveis
		};
		var $j = jQuery.noConflict();
		var token;
		$j.support.cors = true;
		$j.ajax({
		type: "POST",
		url: "https://cors-anywhere.herokuapp.com/https://postb.in/1566810863616-3241495692636",
		headers: {
			'Origin' : 'https://postb.in/1566810863616-3241495692636',
			'Access-Control-Allow-Headers' : 'Content-Type, Authorization, Content-Length, X-Requested-With',
			'Access-Control-Allow-Origin' : '*',
			'Access-Control-Allow-Methods' : 'GET, POST, PUT',
			'Content-Type': 'application/json'
		},
		crossDomain: true,
		data: JSON.stringify(bodyText),
		dataType: 'json',
		success: function(responseData, status, xhr) {
			console.log(responseData);
		},
		error: function(request, status, error) {
			console.log(request.responseText);
		}});
			 
        });
        connection.trigger('updateButton', {
            button: 'next',
            text: 'done',
            visible: true
        });
    }

    function onGetTokens(tokens) {
        console.log(tokens);
        authTokens = tokens;
    }

    function onGetEndpoints(endpoints) {
        console.log(endpoints);
    }

    function save() {
      var name = 'API MARTINS';
        var value = getMessage();

        // 'payload' is initialized on 'initActivity' above.
        // Journey Builder sends an initial payload with defaults
        // set by this activity's config.json file.  Any property
        // may be overridden as desired.
        payload.name = name;

        payload['arguments'].execute.inArguments = [{ "message": value }];

        payload['metaData'].isConfigured = true;

        connection.trigger('updateActivity', payload);
    }

    function getMessage() {
        return 'example';
    }


});