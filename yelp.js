$(function() {
var businesses = {};

    $("#search").click(function() {

        //Grabing latitude and longitude 
        var address = $("#myAddress").val().split(" ").join("+");
        console.log(address); //if space then +


        //       function cb(data) {
        //     var jsonPretty = JSON.stringify(data, null, '\t');
        //     $("#target").html(jsonPretty);
        //     console.log(jsonPretty)
        // }

        function cb(data, textStatus, jqXHR) {
            for (var i = 0; i < data.businesses.length; i++) {
                var key = data.businesses[i].name;
                businesses[key] = {
                    rating: data.businesses[i].rating,
                    latitude: data.businesses[i].location.coordinate.latitude,
                    longitude: data.businesses[i].location.coordinate.longitude,
                };
            }
        
        console.log(businesses);
        $("#target").append(
            $.each(businesses, function(i, ob) {
                document.write(i + "<br>");
                $.each(ob, function(ind, obj) {
                    document.write(obj + "<br>");
                });
                document.write("<br>");
            })
        );
}

        var auth = {
            //
            // Update with your auth tokens.
            //
            consumerKey: "1agR7FgmVwXIRWzi6CbfvQ",
            consumerSecret: "6BKuyGMJUW9tcfA9yztoZwf364w",
            accessToken: "4tiMQslXOW2aSCgFfYvxWee0ALDqJw6R",
            // This example is a proof of concept, for how to use the Yelp v2 API with javascript. You wouldn't actually want to expose your access token secret like this in a real application.
            accessTokenSecret: "sDkKBblaGNG8InvLEhk3TVgq24I",
            serviceProvider: {
                signatureMethod: "HMAC-SHA1"
            }
        };


        // Location and Term Variables
        var terms = 'coffeeshop';
        // var near = 'Orlando';

        var accessor = {
            consumerSecret: auth.consumerSecret,
            tokenSecret: auth.accessTokenSecret
        };

        var parameters = [];
        parameters.push(['term', terms]);
        parameters.push(['location', 'Orlando']);
        parameters.push(['callback', 'cb']);
        parameters.push(['oauth_consumer_key', auth.consumerKey]);
        parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
        parameters.push(['oauth_token', auth.accessToken]);
        parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

        var message = {
            'action': 'https://api.yelp.com/v2/search',
            'method': 'GET',
            'parameters': parameters
        };

        OAuth.setTimestampAndNonce(message);
        OAuth.SignatureMethod.sign(message, accessor);

        var parameterMap = OAuth.getParameterMap(message.parameters);

        $.ajax({
            'url': message.action,
            'data': parameterMap,
            'dataType': 'jsonp',
            'jsonpCallback': 'cb',
            'cache': true
        }).done(cb, function(data, textStatus, jqXHR) {
            //     for (var index = 0; index < data.businesses.length; index++) {
            //         var business = data.businesses[index];
            // console.log('business', business);
            //         var businessDiv = $('<div></div>');

            //         var pTag = $('<p></p>').html(business.name);


            //         businessDiv.append(pTag);

            //         $('#target').append(businessDiv);
            //     }

            console.log('success[' + data + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');
            console.log(data.businesses);

        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.log('error[' + errorThrown + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');
        });

    });
});