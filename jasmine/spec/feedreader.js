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
        
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('url is defined and not empty', function() {
            for (var item of allFeeds) {
                expect(item.url).toBeDefined();
                expect(item.url).not.toBe('');
                console.log(item.url);
            }
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('name is defined and not empty', function() {
            for (var item of allFeeds) {
                expect(item.name).toBeDefined();
                expect(item.name).not.toBe('');
                console.log(item.name);
            }
        });
    });


    /* New test suite named "The menu" */
    describe('The menu', function() {


        /* Test that ensures the menu element is
         * hidden by default. 
         */
        it('element is hidden', () => {

            expect($('body').hasClass("menu-hidden")).toBe(true);
            //console.log($('.menu-hidden'));

        });
         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. 
          */

        it('changes visibility when the menu icon is clicked', () => {
            
            //Function allow to find what is body's class.
            const b = function() {
                let d = document.querySelector("body").className;
                return d;
            };

            //Calling this function we know the name of the body's class
            //before clicking.
            c = b();
            menuIcon = $('.menu-icon-link');
            //console.log(b());
            
            //Simulation of clicking on "menu-icon" element.
            menuIcon.click();
            expect($('body').hasClass(c)).toBe(false); //now we see
            //the class changed and there is no "menu-hidden" class

            //again we want to have actual name of the body's class
            d = b();
            //console.log(b());
            menuIcon.click();
            expect($('body').hasClass(d)).toBe(false);//after second click
            //we see the body's class changed and back to start position
        });
    });
    /* New test suite named "Initial Entries" */
    describe("Initial Entries", () => {
        //The loadFeed is asynchronous function and we need 'done' callback
        //to wait Jasmine completes work.
        beforeEach(function (done) {
                loadFeed(0, done);                
            });

        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it("there is at least a single .entry element", () => {
            f = $('div.feed > > .entry');//"child" elements of div.feed ("parent")
            //console.log($('div.feed > > .entry'));
            expect(f.length).toBeGreaterThan(0);            
        });
    });
    /* New test suite named "New Feed Selection" */
    describe("New Feed Selection", () => {
            //Loading two feeds and getting their name (title). Changed title 
            //is equal changed page content.
            beforeEach(function (done) {
                loadFeed(3, function() {
                    s = document.querySelector(".header-title").textContent;
                    console.log(s); 
                 
                    loadFeed(2, function() {
                        w = document.querySelector(".header-title").textContent;
                        console.log(w);
                 
                            done();          
                    });
                });
            });;                         


        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
               
        it ("new feed is loaded", () => {

            expect(s).not.toBe(w);

        });
    });
}());
