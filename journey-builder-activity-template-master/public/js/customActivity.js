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
            $.each(inArgument, function (key, val) {
                alert(key + ' -> ' + val);
				console.log(key + ' -> ' + val);
				const userAction = async () => {
				  const response = await fetch('https://webhook.site/5e89f242-1528-406d-83df-fcdbfaa828c2', {
					method: 'POST',
					body: 'RESPOSTA DO JS', // string or object
					headers: {
					  'Content-Type': 'application/json'
					}
				  });
				  const myJson = await response.json(); //extract JSON from the http response
				  // do something with myJson
				}
			
            });
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