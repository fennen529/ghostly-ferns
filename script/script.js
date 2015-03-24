
$(document).on('mouseenter', '.spiner', function () {

	$(this).toggleClass('spin-logo');

});

$(window).scroll(function () {
	if ($(this).scrollTop() > 100) {
		$('.scroll-nav').removeClass('flip');
	} else {
		$('.scroll-nav').addClass('flip');
	}
});

$(document).ready(function() { $(document).trigger('page:changed') });

$(document).on('page:changed', function () {
// hide first

	$("#to_top").hide();

// fade in 

	$(function () {
		if($(window).width() > 1024) {
		$(window).scroll(function () {
		if ($(this).scrollTop() > 850) {
			$('#to_top').fadeIn();
		} else {
			$('#to_top').fadeOut();
			$('#to_top a').removeClass('wee');
		}
	});

	}

	// scroll body to 0px on click

	$('#to_top a').click(function () {
		$(this).addClass('wee');
		$('body,html').animate({
		scrollTop: 0
	}, 800);
		return false;
});

	if(window.location.pathname.indexOf('index.php') > 0) {
		$('#aboutslow').click(function () {
		$('body,html').animate({
		scrollTop: 1350
		}, 800);
			return false;
		});
	}
});

loadFirstProject()

$('.project-nav a').on('click', function(e){
	e.preventDefault();
	$('.project-nav a').removeClass('active');
	$(this).addClass('active');
	$('.overflow').load($(this).attr('href') + ' .pull-content');
});

$('.expand').on('click', function(e){
	e.preventDefault();

	if ($(this).text() == 'Collapse Project') {
		$(this).text('Expand project');
		$('.overflow').animate({height: window.overflowHeight}, 800);
		$('body,html').animate({scrollTop: 650}, 800);
		} else {
			window.overflowHeight = $('.overflow').height();
			$(this).text('Collapse Project');
			$('.overflow').css('height', 'auto');
		}
	});
});

$(document).ready(function() {

	var $projectListLinks = $('.project-nav a')
		, $projectList = $('.project-nav li')
		, currentProjectIndex = 0
		, lastProjectIndex = $projectList.length - 1;

	$('#next').on('click', function(e) {
		e.preventDefault();

		if (currentProjectIndex == lastProjectIndex) {
			currentProjectIndex = 0;
		} else {
			currentProjectIndex++;
		}

		$projectListLinks.eq(currentProjectIndex).click();
	});

	$('#prev').on('click', function(e) {
		e.preventDefault();
		
		if (currentProjectIndex == 0) {
			currentProjectIndex = lastProjectIndex;
		} else {
			currentProjectIndex--;
		}

		$projectListLinks.eq(currentProjectIndex).click();
	});

});

$(window).on( 'load resize', function(){
	if ($(window).width() <= 800){	
		$('#fig1 + span, #fig2 + span, #fig3 + span, #fig4 + span').remove();
	}	
});



$(document).ready(function() {
	var listItems = {
		'http://ghostlyferns.com/blog': [
		{ text: "— Contact", href: "http://ghostlyferns.com/contact" },
		{ text: "Home —", href: "http://ghostlyferns.com/" }
		],
		'http://ghostlyferns.com/': [
		{ text: "— Blog", href: "http://ghostlyferns.com/blog" },
		{ text: "Contact —", href: "http://ghostlyferns.com/contact" }
		],
		'http://ghostlyferns.com/index.php': [
		{ text: "— Blog", href: "http://ghostlyferns.com/blog" },
		{ text: "Contact —", href: "http://ghostlyferns.com/contact" }
		],
		'http://ghostlyferns.com/contact': [
		{ text: "— Home", href: "http://ghostlyferns.com/" },
		{ text: "Blog —", href: "http://ghostlyferns.com/blog" }
		]
	}
	, currentHref = window.location.href;

	newLinks(listItems[currentHref]);

	$(document).on('click', 'nav .container div a', function(e) {
		e.preventDefault();

		var $this = $(this)
		, newHref = $this.attr('href');

		switch ($this.index()) {
			case 0:
			loadPage(newHref, 'left');
			break;
			case 1:
			loadPage(newHref, 'right');
			break;
		}

		newLinks(listItems[newHref]);
	});
});

var newLinks = function(links) {
var $navList = $('nav .container div');

$navList.empty();

$.each(links, function(index, link) {
		$navList.append(
			$('<a>').attr('href', link['href']).text(link['text'])
		);
	});
}

var loadPage = function(newUrl, direction) {	
	$('.content-wrapper').before($('<div>', { class: 'content-next' }));
	$('.content-next').load(newUrl + ' .content-wrapper > *', function() {
	if (newUrl == "index.php") {
		loadFirstProject();
	}

	$(document).trigger('page:changed');

	var width = $('.content-next').outerWidth();

	$('.content-next').css({ left: width * (direction == 'left' ? -1 : 1) });

	$('.content-next').animate({ left: 0 }, function() {
		$(this).removeClass('content-next').addClass('content-wrapper');
	});

	$('.content-wrapper').animate({ left: width * (direction == 'right' ? -1 : 1)}, function() {
		$(this).remove();
		});
	});
}

var loadFirstProject = function() {
	$('.overflow').load($('.project-nav a').first().attr('href') + ' .pull-content');
}
