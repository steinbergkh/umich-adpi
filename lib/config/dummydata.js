'use strict';

var mongoose = require('mongoose'),
    Thing = mongoose.model('Thing'),
    ExecPosition = mongoose.model('ExecPosition'),
    ExecMember = mongoose.model('ExecMember'),
    Photo = mongoose.model('Photo');

/**
 * Populate database with sample application data
 */

//Clear old things, then add things in
Thing.find({}).remove(function () {
    Thing.create({
            name: 'HTML5 Boilerplate',
            info: 'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.',
            awesomeness: 10
        }, {
            name: 'AngularJS',
            info: 'AngularJS is a toolset for building the framework most suited to your application development.',
            awesomeness: 10
        }, {
            name: 'Karma',
            info: 'Spectacular Test Runner for JavaScript.',
            awesomeness: 10
        }, {
            name: 'Express',
            info: 'Flexible and minimalist web application framework for node.js.',
            awesomeness: 10
        }, {
            name: 'MongoDB + Mongoose',
            info: 'An excellent document database. Combined with Mongoose to simplify adding validation and business logic.',
            awesomeness: 10
        }, function () {
            console.log('finished populating things');
        }
    );
});

ExecPosition.find({}).remove(function () {
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
});

Photo.find({}).remove(function () {

});
