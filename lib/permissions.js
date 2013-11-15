


//Is the User attempting to edit post the owner of the posts?

ownsDocument = function(userId, doc) {
	return doc && doc.userId === userId;
}