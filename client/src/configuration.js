
exports.buildServerUrl = function(url) {
    let result = "http://localhost:5000";

    if (url[0] === "/") {
        result += url;
    }
    else {
        result += "/" + url;
    }

    return result;
}

exports.getTitle = function() {
    return "El Iglú de Roberto";
}