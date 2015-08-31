var main = {};
(function(main, auth, api) {

    // Good ole' stack overflow:
    // http://stackoverflow.com/questions/3665115/create-a-file-in-memory-for-user-to-download-not-through-server
    function download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    };

    main.clickHandler = function() {
        getResults().then(function(results){
            console.log(results);
            download('data.txt', JSON.stringify(results));
        }).catch(function(){ console.log("unable to fetch"); });
    };

    function getResults() {
        var monitorUrlBase = api.baseUrl + "monitor/detail";
        var params = {
            auth: auth.authKey,
            id: 1021
        };
        var monitorUrl = api.createGetUrl(monitorUrlBase, params);
        console.log(monitorUrl);

        var myHeaders = new Headers({
            'Access-Control-Allow-Origin': '*'
        });

        var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };

        return fetch(monitorUrl).then(api.getJsonFromResponse);
    };

})(main, auth, api);
