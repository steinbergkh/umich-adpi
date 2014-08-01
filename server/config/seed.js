/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var ExecPosition = require('../api/exec-position/exec-position.model');
var ExecMember = require('../api/exec-member/exec-member.model');
var Photo = require('../api/photo/photo.model');

Thing.find({}).remove(function () {
    Thing.create({
        name: 'Development Tools',
        info: 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Sass, CoffeeScript, and Less.'
    }, {
        name: 'Server and Client integration',
        info: 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
    }, {
        name: 'Smart Build System',
        info: 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
    }, {
        name: 'Modular Structure',
        info: 'Best practice client and server structures allow for more code reusability and maximum scalability'
    }, {
        name: 'Optimized Build',
        info: 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
    }, {
        name: 'Deployment Ready',
        info: 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
    });
});

User.find({}).remove(function () {
    User.create({
            provider: 'local',
            name: 'Test User',
            email: 'test@test.com',
            password: 'test'
        }, {
            provider: 'local',
            role: 'admin',
            name: 'Admin',
            email: 'admin@admin.com',
            password: 'admin'
        }, function () {
            console.log('finished populating users');
        }
    );
});

/*ExecPosition.find({}).remove(function () {
 ExecPosition.create({
 _id: 1,
 title: 'President',
 description: 'works with the chapter to set long-term goals and to organize daily activities of the chapter. She also acts as a liaison between the chapter and other groups on campus.',
 rank: 1,
 memberId: '1'
 }, {
 _id: 2,
 title: 'Executive Vice President',
 description: 'is responsible for a lot of behind-the-scenes paperwork that keeps the Beta Eta Chapter of Alpha Delta Pi running.',
 rank: 2,
 memberId: '2'
 }, {
 _id: 3,
 title: 'Membership Education Vice President',
 description: 'organizes things like our Chapter Retreat, Initiation, Pride Groups, and certain education sessions. Most importantly, it&rsquo;s her job to help you fall in love with ADPi by making sure that your experiences are fun and rewarding.',
 rank: 3,
 memberId: '3'
 }, {
 _id: 4,
 title: 'Recruitment Vice President',
 description: 'handles all marketing efforts for the Beta Eta Chapter of Alpha Delta Pi on Michigan&rsquo;s campus. She also leads the women in preparation for Formal Recruitment.',
 rank: 4,
 memberId: '4'
 }, {
 _id: 5,
 title: 'Finance Vice President',
 description: 'updates our online billing system and ensures that members are aware of all financial responsibilities. She also serves as a voting member of the House Corporation Board of Directors.',
 rank: 5,
 memberId: '5'
 }, {
 _id: 6,
 title: 'Director of Social Enrichment',
 description: 'maintains relations with campus groups and within the Greek Community.',
 rank: 6,
 memberId: '6'
 }, {
 _id: 7,
 title: 'Director of Standards & Ethics',
 description: 'helps uphold the values of our sisterhood to maintain a reputable image among the rest of Greek Life.',
 rank: 7,
 memberId: '7'
 }, {
 _id: 8,
 title: 'Panhellenic Delegate',
 description: 'serves as a liaison between the chapter of Alpha Delta Pi and the rest of the Panhellenic community by attending weekly meetings and related events.',
 rank: 8,
 memberId: '8'
 }, function () {
 console.log('finished populating exec positions');
 }
 );
 });

 ExecMember.find({}).remove(function () {
 ExecMember.create({
 _id: 1,
 name: 'Maddy',
 school: 'Ross School of Business',
 gradYear: 2016,
 imageId: '',
 active: true
 }, {
 _id: 2,
 name: 'Celina',
 school: 'Literature, Science & the Arts',
 gradYear: 2016,
 imageId: '',
 active: true
 }, {
 _id: 3,
 name: 'Eileen',
 school: 'Literature, Science & the Arts',
 gradYear: 2016,
 imageId: '',
 active: true
 }, {
 _id: 4,
 name: 'Caira',
 school: 'Literature, Science & the Arts',
 gradYear: 2016,
 imageId: '',
 active: true
 }, {
 _id: 5,
 name: 'Lindsay',
 school: 'College of Engineering',
 gradYear: 2016,
 imageId: '',
 active: true
 }, {
 _id: 6,
 name: 'Ellen',
 school: 'Literature, Science & the Arts',
 gradYear: 2016,
 imageId: '',
 active: true
 }, {
 _id: 7,
 name: 'Zoe',
 school: 'Literature, Science & the Arts',
 gradYear: 2016,
 imageId: '',
 active: true
 }, {
 _id: 8,
 name: 'Maddy',
 school: 'School of Nursing',
 gradYear: 2016,
 imageId: '',
 active: true
 }, function () {
 console.log('finished populating exec positions');
 }
 );
 });*/

/*Photo.find({}).remove(function () {

 });*/
