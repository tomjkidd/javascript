var api = {};
(function(auth){
    api.baseUrl = "https://forsight.crimsonhexagon.com/api/";

    // Url Generation
    api.objectToGetParameters = function(obj){
        return $.map(obj, function(param, key){
            return key + '=' + param;
        }).join('&');
    };
    api.createGetUrl = function (url, params) {
        var parameters = api.objectToGetParameters(params);
        return url + '?' + parameters;
    };

    // Fetch Helpers
    api.getJsonFromResponse = function (response) {
        if(response.status === 200){
            return response.json().then(function(result){
                return Promise.resolve(result);
            });
        } else {
            return Promise.reject("Couldn't load data");
        }
    };
})(api);
