/* Bootstrap 5 owns navigation and collapse behavior. */
'use strict';
const share = document.getElementById('tweet_anchor');
if (share) share.href = 'https://twitter.com/intent/tweet?' + new URLSearchParams({
  url: location.href.split('#')[0], text: document.title, via: 'totoadad'
});
