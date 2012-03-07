//search function//last.fm metros are static. Instead ofloading new metros every time, just load with the script.
var courses = [
{"id":0, "name": "metaphysical dragon compilers",
"department": "eecs", "number": "841", "professor": "Robby Findler",
    "scores": {"amount learned": 6, "difficulty": 6, "time spent": 6},
    "comments":[
                {"text": "Everyone else got a fruit roll-up.  Why didn't I get a fruit roll-up?",
                 "score": 97},
                 {"text": "This class is impossible without orange arrows.",
                 "score": 72},
                 {"text": "lolwut compilers is hardddd!!!",
                 "score": -2}
                ]},
    
{"id":1, "name": "metaphysical dragon compilers", "department": "eecs", "number": "841", "professor": "Tom Jones",
    "scores": {"amount learned": 2, "difficulty": 1, "time spent": 3},
    "comments":[
                {"text": "It's unusual, but I learned nothing",
                 "score": 100},
                 {"text": "What's new about this ridiculous class?",
                 "score": 97},
                 {"text": "This class taught me nothing!!!",
                 "score": -2}
                ]},
    
{"id":2, "name": "left-handed underwater basket-weaving", "department": "UWBW", "number": "385", "professor": "Morton Shapiro",
    "scores": {"amount learned": 5, "difficulty": 6, "time spent": 4},
    "comments":[
                {"text": "Easier than UWBW 391.",
                 "score": 212},
                 {"text": "Good class. You make a lot of baskets.",
                 "score": 102},
                 {"text": "Not practical.",
                 "score": 22}
                ]},
    
{"id":3, "name": "seminar in 1970's music", "department": "COMP_LIT", "number": "348", "professor": "Tom Jones",
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

//basic search function for query box search
function search() {
	$('#results').empty();
	var query = $('#query_box').val().toLowerCase();
    for (var i=0; i<courses.length; i++){
        if (courses[i]["name"].indexOf(query) >= 0) {
            $('#results').append(courseHtml(courses[i]));
        }
    }
    $('div.badge').click(function(){makeCard($(this));});
}

function courseHtml(course){
	return "<div id="+course['id']+ " class='badge'> <h3><a href='#'>" + course['department'] + "  " + course['number'] + "<br/>" + course['name'] + "<br/>" + course['professor'] +"</a></h3><div><ul><li> professor: "+course['professor']+"</li></ul></div></div><br/>"
}

function makeCard(badge){
    var course;
    for (var i in courses){
        var c = courses[i];       
        if (c['id']==badge[0].id){
            course=c;
        }        
    }
    console.log(course);
}

/*what this would look like if javascript had block quotes instead of being a bitch.	
	<h3><a href="#"> +COURSE NAME+ +COURSE DEPARTMENT+ "-" +COURSE NUMBER+ <input type="button" onclick="displaySlate('+course+')'+'"><img src="button file.jpg"></input></a></h3>
	<div>
		<ul>
			<li>+COURSE PROFESSOR+</li>
			<li>Learned: <div id='amount learned'></div></li>
			<li>Difficulty: <div id='difficulty'></div></li>
			<li>Time: <div id='time spent'></div></li>
		</ul>
	</div>
	<script type='text/javascript'>
		$(function() {
			$( '#amount learned' ).progressbar({
			value: (16 * +COURSE AMOUNT LEARNED+)});
			$( '#difficulty' ).progressbar({
			value: (16 * +COURSE DIFFICULTY+)});
			$( '#time spent' ).progressbar({
			value: (16 * +COURSE TIME SPENT+)});			
		});
	</script>
	*/


function incfComment(course, index){
	course["comments"][index]["score"]++;
}

function decfComment(course, index){
	course["comments"][index]["score"]--;	
}
