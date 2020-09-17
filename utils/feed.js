module.exports = {
  parse: function(url, callback) {
    const FeedParser = require('feedparser');
    const request = require('request');

    const req = request(url)
    const feedparser = new FeedParser();
    const feedItems = [];

    req.on('error', (error) => {
      callback(error);
    });

    req.on('response', (res) => {
      if (res.statusCode !== 200) {
        this.emit('error', new Error('Bad status code'));
      } else {
        req.pipe(feedparser);
      }
    });

    feedparser.on('readable', () => {
      let item;

      while (item = feedparser.read()) {
        feedItems.push(item);
      }
    });

    feedparser.on('end', function () {
      callback(undefined, feedItems);
    });

    feedparser.on('error', function (err) {
      callback(err);
    });
  }
};