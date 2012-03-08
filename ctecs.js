var courses = [
{"id":0, "name": "Metaphysical Dragon Compilers",
"department": "EECS", "number": "841", "professor": "Robby Findler",
    "scores": {"amount learned": 6, "difficulty": 6, "time spent": 6},
    "comments":[
                {"text": "Everyone else got a fruit roll-up.  Why didn't I get a fruit roll-up?",
                 "score": 97},
                 {"text": "This class is impossible without orange arrows.",
                 "score": 72},
                 {"text": "lolwut compilers is hardddd!!!",
                 "score": -2}
                ]},
    
{"id":1, "name": "Metaphysical Dragon Compilers", "department": "EECS", "number": "841", "professor": "Tom Jones",
    "scores": {"amount learned": 2, "difficulty": 1, "time spent": 3},
    "comments":[
                {"text": "It's unusual, but I learned nothing",
                 "score": 100},
                 {"text": "What's new about this ridiculous class?",
                 "score": 97},
                 {"text": "This class taught me nothing!!!",
                 "score": -2}
                ]},
    
{"id":2, "name": "Left-Handed Underwater Basket-Weaving", "department": "UWBW", "number": "385", "professor": "Morton Shapiro",
    "scores": {"amount learned": 5, "difficulty": 6, "time spent": 4},
    "comments":[
                {"text": "Easier than UWBW 391.",
                 "score": 212},
                 {"text": "Good class. You make a lot of baskets.",
                 "score": 102},
                 {"text": "Not practical.",
                 "score": 22}
                ]},
    
{"id":3, "name": "Seminar in 1970's Music", "department": "COMP_LIT", "number": "348", "professor": "Tom Jones",
    "scores": {"amount learned": 3, "difficulty": 4, "time spent": 4},
    "comments":[
                {"text": "BURNING DOWN THE HOUSE!!!",
                 "score": 215},
                 {"text": "Pretty good prof. Jones sings a lot?",
                 "score": 81},
                 {"text": "Jones seems more interested in funk than compilers.",
                 "score": 10}
                ]},
    ]

function detectEnter(e){
	if (e.keyCode == 13) {
		search();
		$("#results").accordion ({collapsible:true, fillSpace:true});
        }
}

function search() {
	$('#results').empty();
	var query = $('#query_box').val().toLowerCase();
    var results = searchCourses(query);
    for (var i=0; i<results.length; i++){
        $('#results').append(badgeHtml(results[i]));
    }
    $('div.badge').click(function(){makeCard($(this));});
}

function searchCourses(query){
    var results=[];
    for (i in courses) {
        c = courses[i];
        if (c["name"].toLowerCase().indexOf(query) >= 0) {
            results.push(c);
            continue;
        }
        if (c["professor"].toLowerCase().indexOf(query) >= 0) {
            results.push(c);
            continue;
        }
        if ((c["department"] + " " + c["number"]).toLowerCase().indexOf(query) >= 0) {
            results.push(c);
            continue;
        }
    }
    return results;
}

function badgeHtml(course){
    return "<div id="+course['id']+
    " class='badge'><ul><li><span style='font-weight:bold'>"+course['department']+" "+
    course['number'] +"</span></li><li>"+course['name']+"</li><li>"+ course['professor']+"</li></ul></div>";

}

function cardHtml(course){
    console.log(makeBars(course));
    return "<td valign='top'><div id="+
            course['id']+
            " class='card'><table class='card_head'><tr><td valign='left' class='course_header'><h2>"+
            course['department']+" "+ course['number'] +"</h2><h3>"+
            course['name']+"</h3>"+ course['professor']+"<br/><br/></td><td valign='top'>"+
            "<a style='color:#ffffff' href='#' onclick='minimizeCard("+course['id']+")'> &#8212&nbsp;</a>"+
            "<a style='color:#ffffff' href='#' onclick='killCard("+course['id']+")'>&nbsp;X </a></td></tr></table>"+
            "<div>Amount Learned:<div class='amount_learned_bar' id='amount_learned_bar"+course['id']+"'></div></div>"+
            "<div>Difficulty:<div class='difficulty_bar' id='difficulty_bar"+course['id']+"'></div></div>"+
            "<div>Time Spent:<div class='time_spent_bar' id='time_spent_bar"+course['id']+"'></div></div>"+
            makeBars(course)+"<br/>"+commentSection(course)+"</div></td>";
}

function killCard(id){
    $("#"+id).remove();
}

function minimizeCard(id){
    for (var i in courses){
        var c = courses[i];
        if (c['id']==id){
            killCard(id);
            $('#results').append(badgeHtml(c));
            $('div.badge').unbind('click');
            $('div.badge').click(function(){makeCard($(this));});
            break;
        }
    }
}

function makeBars(course){
		return	"<script type='text/javascript'>$( '#amount_learned_bar"+course['id']+"').progressbar({value: "+
        (16 * course['scores']['amount learned'])+ "});" +
		"$( '#time_spent_bar"+course['id']+"').progressbar({value: "+
        (16 * course['scores']['time spent'])+ "});" +
        "$( '#difficulty_bar"+course['id']+"').progressbar({value: "+
        (16 * course['scores']['difficulty'])+ "});</script>";
}

function commentSection(course){
    var block = "<div class=comments><table>";
    for (var i in course['comments']){
        addend = "<tr valign='middle'><td align='center'><a href='#'><img class='uparrow' src='uparrow.png' alt='Upvote'/><br/></a>"
            +course['comments'][i]['score']
            +"<br/><a href='#'><img class='downarrow' src='downarrow.png' alt='Downvote'></a></td><td class='comments'>"
            +course['comments'][i]['text']+"</td></tr>";
        block += addend;
    }
    block += "</table></div>";
    return block;
}

function makeCard(badge){
    var course;
    for (var i in courses){
        var c = courses[i];       
        if (c['id']==badge[0].id){
            //this is the course we want
            course=c;
            //delete the badge
            $(badge).remove();
            //render the card
            console.log(course);
            $("#cards").append(cardHtml(course));
        }
    }
}

/*
            //make the fucking arrows work god damn it
            $(".uparrow").unbind('click');
            $(".downarrow").unbind('click');
            $(".uparrow").click(function(){incfComment($(this));});
            $(".downarrow").click(function(){decfComment($(this));});*/