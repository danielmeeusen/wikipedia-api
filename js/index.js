$(document).ready(function(){
	$(".topNav").hide();
	$('.searchresults').hide();
	
	$('.topSearch-btn').on("click", function(){
		topSearchResults();
	});
	
	$('#searchbtn').on("click", function(){
		initToTop();
		searchResults();
	});
	
	var top = false;

	// Submits form to reformat page and display search result.
	// not sure why 'event.preventDefault did not work here vs 'return false.' if someone can explain please comment.
	$('form').submit(function(event){
		if (top === true) {
			topSearchResults();
		} else {
			searchResults();
			initToTop();
		}
		return false;
	});	
	
	
	
	function placeFooter() {
		if ($("body").height() > $(document).height()) {
			$('footer').css('position', 'relative');
    } else {
			$('footer').css('position', 'absolute');
		}
	}

				$("#topSearch").autocomplete({
					delay: 0,
			source: function(request, response) {
				$.ajax({
					url: 'https://en.wikipedia.org/w/api.php',
					dataType: "jsonp",
					data: {
						'action': "opensearch",
						'format': "json",
						'limit': 5,
						'search': request.term
					},
					success: function(data) {
						response(data[1]);
					}					
				});	
			}, select: function(event, ui){
				$('#topSearch').submit();
				}
		}).keyup(function(event) {
        if(event.which === 13) {
            $(".ui-menu-item").hide();
        }            
    });
	
		$("#wikisearch").autocomplete({
			delay: 0,
			source: function(request, response) {
				$.ajax({
					url: 'https://en.wikipedia.org/w/api.php',
					dataType: "jsonp",
					data: {
						'action': "opensearch",
						'format': "json",
						'limit': 5,
						'search': request.term
					},
					success: function(data) {
						response(data[1]);
					}					
				});	
			}, select: function(event, ui) {
				$('#wikisearch').submit();
			}
		});
	
	
	
	function topSearchResults() {
		var topSearchTerm = $('#topSearch').val();
		console.log(topSearchTerm);
		$.ajax({
			url: 'https://en.wikipedia.org/w/api.php',
			dataType: "jsonp",
			data: {
						'action': "opensearch",
						'format': "json",
						'search': topSearchTerm,
					},
					success: function(data) {
						var title = data[1];
						var link = data[3];
						var description = data[2];
						var resultCards = [];
						for (var i = 0; i < title.length; i++) {
							resultCards.push(`<div class="resultCard"><a href="${link[i]}" target="_blank"> ${title[i]}</></a><p>${description[i]}</p></div>`);
						}
						$('.searchResults').html(resultCards);
					}					
		});
		$('#topSearch').blur();
		$('#topSearch').val('');
	}

	function searchResults() {
		var searchTerm = $('#wikisearch').val();
		console.log(searchTerm);
		$.ajax({
			url: 'https://en.wikipedia.org/w/api.php',
			dataType: "jsonp",
			data: {
						'action': "opensearch",
						'format': "json",
						'search': searchTerm,
					},
					success: function(data) {
						var title = data[1];
						var link = data[3];
						var description = data[2];
						var resultCards = [];
						for (var i = 0; i < title.length; i++) {
							resultCards.push(`<div class="resultCard"><a href="${link[i]}" target="_blank"> ${title[i]}</></a><p>${description[i]}</p></div>`);
						}
						$('.searchResults').html(resultCards);
						placeFooter();	
					}					
		});
	}
								
	function initToTop() {
		top = true;
		$(".input-group").hide();
		$(".topNav").show();
		$(".randomlink").hide();
		$('.searchresults').show();
		$('body').css("background-image", "linear-gradient( rgba(0, 0, 0, .85), rgba(0, 0, 0, .25) ),url('https://s19.postimg.org/ubtvuuavn/stacks.jpg')");
	}
	
	// Darkens background when searchbox is in focus.
	$("#wikisearch").focus(function(){
		$('body').css("background-image", "linear-gradient( rgba(0, 0, 0, .85), rgba(0, 0, 0, .25) ),url('https://s19.postimg.org/ubtvuuavn/stacks.jpg')");
	 });
	
	// Lightens background when searchbox is not in focus.
	$("#wikisearch").blur(function(){
		$('body').css("background-image", "linear-gradient( rgba(0, 0, 0, .65), rgba(0, 0, 0, .0) ),url('https://s19.postimg.org/ubtvuuavn/stacks.jpg')");
	});

});
