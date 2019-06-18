# Project Overview

This is a web-based application that reads RSS feeds. We used Jasmine to write a number of tests against the pre-existing application.

## How to test the app

Simply download or clone the project with
* `git clone https://github.com/aarokan/feed_Reader_Testing.git`
* Then open the index.html file and check the tests result at the bottom of the page.

## The testing suites and its specs

1. RSS Feeds
    * Ensure `allFeeds` variable has been defined and that it is not empty
    * Loops through each feed in the `allFeeds` object and ensures it has a URL defined and that the URL is not empty
    * Loops through each feed in the `allFeeds` object and ensures it has a name defined and that the name is not empty
2. The Menu
    * Ensures the menu element is hidden by default
    * Ensures the menu changes visibility when the menu icon is clicked
3. Initial Entries
    * Ensures when the asynchronous `loadFeed` function is called and completes its work, there is at least a single `.entry` element within the `.feed` container
4. New Feed Selection
    * Ensures when a new feed is loaded by the asynchronous `loadFeed` function that the content actually changes
