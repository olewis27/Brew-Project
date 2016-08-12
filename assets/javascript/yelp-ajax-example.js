function cb(data) {
    var jsonPretty = JSON.stringify(data, null, '\t');
    $("#target").html(jsonPretty);
}

var auth = {
    //
    // Update with your auth tokens.
    //
    consumerKey: "1agR7FgmVwXIRWzi6CbfvQ",
    consumerSecret: "6BKuyGMJUW9tcfA9yztoZwf364w",
    accessToken: "HrVQAd23FfInIj7DgpBxY7ZGWAYwTV4G",
    // This example is a proof of concept, for how to use the Yelp v2 API with javascript. You wouldn't actually want to expose your access token secret like this in a real application.
    accessTokenSecret: "QxmBmwCeHxBnFRXbkmpDvp37-PA",
    serviceProvider: {
        signatureMethod: "HMAC-SHA1"
    }
};

// Location and Term Variables
var terms = 'coffee';
var near = 'zip code';

var accessor = {
    consumerSecret: auth.consumerSecret,
    tokenSecret: auth.accessTokenSecret
};

var parameters = [];
parameters.push(['term', terms]);
parameters.push(['location', near]);
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
}).done(function(data, textStatus, jqXHR) {
    console.log('success[' + data + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');
}).fail(function(jqXHR, textStatus, errorThrown) {
    console.log('error[' + errorThrown + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');
});
