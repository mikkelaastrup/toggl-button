'use strict';

togglbutton.render(
  '#main > #content.ticket:not(.toggl)',
  { observe: true },
  function (elem) {
    const tracTicketId = (
      $('#main > #content.ticket > #ticket > h2 > .trac-id') || // Trac v1.x
        $('#main > #content.ticket > h1#trac-ticket-title > a')
    ).textContent;
    // Trac v0.x

    const tracTicketDescription = $(
      '#main > #content.ticket > #ticket .summary',
      elem
    ).textContent;

    const tracProjectName =
        $('title')
          .textContent.split('     – ')
          .pop() || $('#banner > #header > #logo > img').attr('alt');
    // First try to get project name from title tag // If can't find in title tag, get from logo alt attribute

    const container =
        $('#main > #content.ticket > #ticket > h2 > .trac-type', elem) || // Trac v1.x
        $('#main > #content.ticket > h1#trac-ticket-title > a', elem);
    // Trac v0.x

    const link = togglbutton.createTimerLink({
      className: 'trac',
      description: tracTicketId + ' ' + tracTicketDescription,
      projectName: tracProjectName
    });

    const spanTag = document.createElement('span');
    container.parentNode.appendChild(spanTag.appendChild(link));
  }
);
