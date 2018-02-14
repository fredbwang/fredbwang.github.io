console.log("hello");

var levelNaming = Cookies.get("as_level_naming").split('.');
var levelPattern = Cookies.get("as_level_pattern");

function parseAdhoc(adhoc, levelPattern) {
    // get the order of level tag patterns
    var indexRegex = /\(i(\d{1})\)/g;
    var index = levelPattern.match(indexRegex);
    for (var key in index) {
        index[key] = index[key].substring(2, 3);
    }

    // get the patterns
    var levelRegex = /\[p([\[\]\{\}\d\w\\\-\.\,]+)\]/g;
    var patterns = levelPattern.match(levelRegex);
    console.log(patterns);

    //replace the [p ... ] tag with group tag ( ... ) for backreference
    levelPattern = levelPattern.replace(levelRegex, function replacer(match, p1, offset, string) {
        return '(' + p1 + ')';
    });

    // remove the index tag: (i ... )
    levelPattern = levelPattern.replace(indexRegex, '');
    var matches = adhoc.match(levelPattern);

    var result = [];
    for (var i = 0; i < 4; i++) {
        result[index[i] - 1] = matches[i + 1];
    }

    return result;
}

$("#btn").on('click', function() {

    console.log("clicked");
    insertNewRow();
});

$(document).on('click', ".issue", function() {
    console.log($(this).text());
});


function insertNewRow() {
    var row = document.getElementById("table").insertRow(0)
    var cell1 = row.insertCell(0)
    cell1.innerHTML = `
        <div class="btn-group btn-group-sm" role="group">
            <button type="button" class="btn issue red" name="c">Cracked</button>
            <button type="button" class="btn issue" name="h">Hotspot</button>
            <button type="button" class="btn issue blue" name="d">Diode</button>
            <button type="button" class="btn issue purple" name="f">Failed</button>
            <button type="button" class="btn issue orange" name="cf">Connector/Fuse</button>
            <button type="button" class="btn issue green" name="s">Shaded</button>
            <button type="button" class="btn issue grey" name="o">Other</button>
        </div>`;
}
