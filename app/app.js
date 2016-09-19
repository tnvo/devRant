// Extenal Links Open in New Window
$('a').not('[href*=\"mailto:\"]').each(function (){
  var isInternalLink = new RegExp('/' + window.location.host + '/');
  if (!isInternalLink.test(this.href)) {
    $(this).attr('target', '_blank');
  }
});

// Adds Download Button to Menu
$('<li><a target=\"_blank\" href=\"https://www.devrant.io/\"><span class=\"icon-about2 icon\"></span>Downloads</a></li>').insertAfter(
  'div.menu-modal > ul > li:nth-child(5)'
);

// Adds Feedback Button to Menu
$('<li><a target=\"_blank\" href=\"mailto:info@devrant.io\"><span class=\"icon-feedback2 icon\"></span>Feedback</a></li>').insertAfter(
  'div.menu-modal > ul > li:nth-child(5)'
);

//Adds Back Button
$('.feed-top-icons:nth-child(2), .rant-top-bar > .share-icons, div.body-col2.profile-page > .rant-top-bar').prepend(
  '<a href=\"javascript: history.back();\" title=\"Back\" alt=\"Back\"><span class=\"icon-back2 icon\"></span></a>'
);
