# AngularJS One 

AngularJS One goal is to get all the news from your favorites ressources (HackerNews, Github ) 
directly into one single page. It's all written in **AngularJS 1.5.1** right now and it's getting **news about angularjs**.

It has all been written within a day as a side project [@Orson] (http://en.orson.io)

## News feed
We use all the public API using JSONP callback so it's working directly from the client.

**Github** [Documentation](https://developer.github.com/v3/)

**Hackernews** provide a super fast and nice API with Algolia [Documentation] (http://hn.algolia.com/api/v1)

If you want to search something else than "AngularJS", you just need to change 

	var searchQuery = "angularjs";

## Job board

We wanted to have a job board and we use **Google Drive Spreedsheet** as a database even if we wanted to try out the new Firebase. It was much faster to use Google Spreedsheet.

Just need to create a [Google Form] (https://www.google.com/intl/fr_fr/forms/about/) with a Google Spreedsheet linked for the responses and make it public **(File > Publish for the web > Entire Document)** and magic! You can now access publicly to the Spreedsheet datas throught

	https://spreadsheets.google.com/feeds/list/+YOUR SHEET ID /1/public/values?alt=json

[Source: Ctrlq.org] (https://ctrlq.org/code/20004-google-spreadsheets-json)

## Environment 
* Angularjs 1.5.1
* Bootstrap 3.3.6 / LESS
* Jquery 2.2.2

Enjoy, Love and Share ✌🏼! 