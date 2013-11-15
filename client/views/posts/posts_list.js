

Template.postsList.helpers({
	posts: function() {
		return Posts.find({}, {sort: {submitted: -1}});
	}

});


/*  THIS IS THE OLD CODE, which is now in the server's file (fixtures.js)

it will only load if there is no other data.


var postsData = [
{
	title: 'Introducing Telescope',
	author: 'Sacha Greif',
	url: 'http://sachagreif.com/introducing-telescope/'
},
{
	title: 'Meteor',
	author: 'Tom Coleman',
	url: 'http://meteor.com'
},
{
	title: 'The Meteor Book',
	author: 'Tom Coleman',
	url: 'http://themeteorbook.com'
}
];

Template.postsList.helpers({
	posts: postsData
});

*/