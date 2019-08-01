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
		alert('entrou no init da custom activity')
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
			
			var bodyText = '{';
			$.each(inArgument, function (key, val) {
				bodyText = bodyText + ' ' + key + ' -> ' + val ;
			});
			bodyText = bodyText + '};';
				
		var $j = jQuery.noConflict();
		var token;
		$j.support.cors = true;
		$j.ajax({
		type: "POST",
		url: "https://cors-anywhere.herokuapp.com/https://postb.in/1564668447159-7746483376249",
		headers: {
			'Origin' : 'https://postb.in/1564668447159-7746483376249',
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
		}
			
			
			
			
			
            
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
      /*  var postcardURLValue = $('#postcard-url').val();
        var postcardTextValue = $('#postcard-text').val();

        payload['arguments'].execute.inArguments = [{
            "tokens": authTokens,
            "emailAddress": "{{Contact.Attribute.PostcardJourney.EmailAddress}}"
        }];
        
        payload['metaData'].isConfigured = true;

        console.log(payload);
        connection.trigger('updateActivity', payload);*/
    }


});