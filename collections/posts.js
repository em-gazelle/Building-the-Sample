Posts = new Meteor.Collection('posts');

/*   <var Posts = new Meteor.Collection('posts');>   would be the 'normal' code;
however, we do not use "var" because this would limit the scope of this object
to the current file instead of throughout the app.

We want this file, posts, and its data to be available to both the CLIENT AANNNNDDD
the SERVER, because this is what makes Meteor so incredibly magical.


*/

/* ALSO: this can be used with the Mongo Database. This is the collection's job. Like a standard database's library...

but it's a secure copy of a subset. And it's a real-side client-side collection (yay meteor yay!)

*/

/*---------------
-----------------
From creating posts: let's add some network security. Preventing multiple links
making sure users are logged in
making sure headlines, links, all parts of post are filled in
--------
uses Meteor Methods to do so..
*/



Posts.allow({
  update: ownsDocument,
  remove: ownsDocument
});

Posts.deny({
  update: function(userId, post, fieldNames) {
    //user may only edit the following fields on their own posts:
    return (_.without(fieldNames, 'title').length > 0);
  }
});



Meteor.methods({
  post: function(postAttributes) {
    var user = Meteor.user(),
      postWithSameLink = Posts.findOne({url: postAttributes.url});

    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to post new stories");

    // ensure the post has a title
    if (!postAttributes.title)
      throw new Meteor.Error(422, 'Please fill in a headline');

    // check that there are no previous posts with the same link
    if (postAttributes.url && postWithSameLink) {
      throw new Meteor.Error(302, 
        'This link has already been posted', 
        postWithSameLink._id);
    }

    // pick out the whitelisted keys
    var post = _.extend(_.pick(postAttributes, 'url', 'title', 'message'), {
      userId: user._id, 
      author: user.username, 
      submitted: new Date().getTime()
    });

    var postId = Posts.insert(post);

    return postId;
  }
});


/*

Posts.allow({
	insert: function(userId, doc) {
		//this will only allow users who are logged in to post.
		//yay security
		return !! userId;
	}

});

*/