"use strict";


function update() {
    $.ajax( {
        url: "http://localhost:8081/upload",
        success: function(result) {
            console.log(result);
            var h1 = document.createElement("h1");

            var h2 = document.createElement("h2");
            h1.innerHTML = "Your Image Successfully Uploaded! Thanks for sharing!<br><br>";
            h2.innerHTML ="Uploaded File: " + $('input[type=file]').val().split('\\').pop();
            $("#content").empty();
            $(h1).appendTo($("#content"));
            $(h2).appendTo($("#content"));
            // for (var i in result) {
            //     var row = document.createElement("tr");
            //     var codeCell = document.createElement("td");
            //     var nameCell = document.createElement("td");
            //     var lecturerCell = document.createElement("td");
            //     $(codeCell).text(result[i]["code"]);
            //     $(nameCell).text(result[i]["name"]);
            //     $(lecturerCell).text(result[i]["lecturer"]);
            //     $(codeCell).appendTo($(row));
            //     $(nameCell).appendTo($(row));
            //     $(lecturerCell).appendTo($(row));
            //     $(row).appendTo($("#content"));
            // }
        }
        }

    );
}