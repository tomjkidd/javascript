var main = {};
(function(main) {

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
        download('data.txt', JSON.stringify(getResults()));
    };

    function getResults() {
        // TODO: Update this to do what is needed
        var results = [];
        results.push({ x: 1, y: 1, name: 'Point 1'});
        results.push({ x: 2, y: 2, name: 'Point 2'});
        results.push({ x: 3, y: 3, name: 'Point 3'});
        return results;
    };

})(main);
