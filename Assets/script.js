var songArr = [];
var buttonDIV;
var titleDiv;
var artistDiv;
var lyrics; 
var queryLYR;
var replaceSpace;

$(document).on("click", ".happiButtons", lyricsClick);
$(document).on("click", "#yeezy", kanyeTalks);
$(document).on("click", "#search", currentSongSearch);
$(document).on("click", ".listnone", currentSongListnone);

var retrievedData = localStorage.getItem("songArr");
if (retrievedData !=null) {
    var songArr2 = JSON.parse(retrievedData);
    if (songArr.length >= 0) {
        for (i = 0; i < songArr2.length; i++) {
            var ul = $("<ul>").attr("class", "listnone");
            var li = $("<li>");
            li.append(songArr2[i]);
            ul.append(li);
            $("#searchedList").append(ul);
        }
    }
}

function currentSongSearch() {
    $('html,body').animate({
        scrollTop: $(".second").offset().top},
        'slow');
    currentSong = $("#input").val();
    songArr.push(currentSong);
    localStorage.setItem("songArr", JSON.stringify(songArr));
    var ul = $("<ul>").attr("class", "listnone");
    var li = $("<li>");
    li.append(currentSong);
    ul.append(li);
    $("#searchedList").append(ul);
    updateSongList(currentSong);
} 

function currentSongListnone() {
    currentSong = $(this).text()
    updateSongList(currentSong);
}

function updateSongList() {
    $(".showLyricsDiv").text("");

    replaceSpace = currentSong.replace(/\s/g, "%20"); 
    queryLyrics = "https://api.happi.dev/v1/music?q=" + replaceSpace + "&limit=&apikey=05580c9wJXOa2YrFZUJlxtMDKREEexMldmTAHlmwb7Uk62acRmtbkJIv&type="

    $.ajax({
        url: queryLyrics,
        method: "GET"
    }).then(function(response) {
        $("#songButtons").text("");
        var lyricsHeader = $("<h5>").text("Lyrics Options: ")
        $("#songButtons").append(lyricsHeader);

        for (i = 0; i < response.length; i++) {
            buttonDIV = $("<div>").attr("class", "happiButtons");
            buttonDIV.attr("id", `test${i}`);
            titleDiv = $("<div>").text("Title: " + response.result[i].track);
            artistDiv = $("<div>").text("Artist: " + response.result[i].artist);
            lyrics = response.result[i].api_lyrics + "?&apikey=05580c9wJXOa2YrFZUJlxtMDKREEexMldmTAHlmwb7Uk62acRmtbkJIv";
            buttonDIV.val(lyrics);
            $(buttonDIV).append(titleDiv);
            $(buttonDIV).append(artistDiv);
            $("#songButtons").append(buttonDIV);

            queryLYR = lyrics;               
        }

        for (i = 0; i < response.length; i++) {
            tippy(`#test${i}`, {
                content: "Click me to see if I have lyrics!"
            });
        }
    })

        var queryTabs = "https://www.songsterr.com/a/ra/songs.json?pattern=" + replaceSpace;

        $.ajax({
            url: queryTabs,
            method: "GET"
            }).then(function(response) {
                $("#tabList").text("");
                var tabsInfoHeader = $("<h5>").text("Tab Options: ")
                $("#tabList").append(tabsInfoHeader);

                for (i = 0; i < response.length; i++) {
                    var tabButtons = $("<div>").attr("class", "songsterButtons");
                    var titleDiv = $("<li>").text("Title: " + response[i].title);
                    var artistDiv = $("<li>").text("Artist: " + response[i].artist.name);
                    var lyricsLi = $("<li>");
                    var queryURL = "https://www.songsterr.com/a/wa/song?id=" + response[i].id;
                    var aTag = $("<a>").attr("href", queryURL);
                    $(aTag).text("Click me for tab info.").attr("target", "_blank")
                    $(lyricsLi).append(aTag);
                    $(tabButtons).append(titleDiv, artistDiv, lyricsLi);
                    $("#tabList").append(tabButtons);
                }
            })
}

function lyricsClick() {
    queryLYR = $(this).val();

    $.ajax({
        url: queryLYR,
        method: "GET"
    }).then(function(response) {
        if (response.success === true) {
            $(".showLyricsDiv").text("");
            var showLyrics = response.result.lyrics;
            var replaceLyrics = showLyrics.replace(/\n/g, '<br>'); 
            $(".showLyricsDiv").append(replaceLyrics);
        } 
    })
}

// Kanye API Button
function kanyeTalks() {
    var kanyeURL = "https://api.kanye.rest/?format=text"
    $.ajax({
        url: kanyeURL,
        method: "GET"
    }).then(function(kanyeResponse) {
        $(".yeezy-quote").text(kanyeResponse);
    })
}