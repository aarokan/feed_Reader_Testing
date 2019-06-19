/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* Make sure that the
         * allFeeds variable has been defined and
         * that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loop through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URLs are defined', function() {
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            }
        });


        /* Loop through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('names are defined', function() {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    /* Test suite named "The menu" */
    describe('The Menu', function() {
        var body;

        // Before each specs testing. Select the body element
        beforeEach(function() {
            body = document.querySelector('body');
        });
        // Ensure the menu element is hidden by default.
        it('The menu is hidden by default', function() {
            // Check body class name if it contains menu-hidden
            expect(body.className).toContain('menu-hidden');
        });

         /* Ensure the menu changes visibility when the menu icon is clicked
          * have two expectations: does the menu display when clicked
          * and does it hide when clicked again.
          */
        it('Menu should toggle (show/hide) when clicked', function() {
            /* Creat event with the Event constructor
             * and simulate a mouse click on the menu icon
             * without actually clicking it
             */
            const menuIconLink = document.querySelector('.menu-icon-link');
            const event = new Event('click');
            menuIconLink.dispatchEvent(event);

            expect(body.className).not.toContain('menu-hidden');

            menuIconLink.dispatchEvent(event);
            expect(body.className).toContain('menu-hidden');
        });
    });

    /* Test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* Ensure when the loadFeed function is called and
         * completes its work, there is at least a single .entry element
         * within the .feed container. loadFeed() is asynchronous so
         * this test requires the use of Jasmine's beforeEach
         * and asynchronous done() function.
         */
        beforeEach(function(done) {
          loadFeed(0, function() {
              /* We call (done) to signal to our framework that
               * our asynchronous function is done doing what we need it to do
               * and we can continue testing
               */
              done();
          });
        });

        it('Feed container should contain at least a single .entry element', done => {
            const feedEntries = document.querySelectorAll('.feed .entry');
            expect(feedEntries.length).toBeGreaterThan(0);
            /* We call (done) after our test to signal to our framework that
             * this test rely upon the async execution that inside beforeEach
             */
            done();
        });
    });

    /* Test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        let firstFeed,
            secondFeed;
        /* Ensure when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        beforeEach(function(done) {
            // load the first feed
            loadFeed(0, function() {
                firstFeed = document.querySelector('.feed').innerHTML;

                /* load the scecond feed
                 * We nested loadFeed(1) inside of loadFeed(0) and therefore
                 * loadFeed(1) will wait for loadFeed(0) and we
                 * ensure that loadFeed(0) receives data from server
                 */
                loadFeed(1, function() {
                    secondFeed = document.querySelector('.feed').innerHTML;
                    done();
                });
            });

        });

        it('Content changes when new feed is loaded', done => {
            // Check if the firstFeed is diffrent from the secondFeed
            expect(firstFeed).not.toEqual(secondFeed);
            done();
        });
    });
}());
