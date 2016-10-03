/**
 * Created by SvenH on 06.09.2016.
 */

'use strict';
//const WP_REST_URL = "http://webdev/rest-api";
//I use a public site to fetch some posts...
const WP_REST_URL = "https://www.sitepoint.com";

//setting up the model for a wordpress post, details will be fetched via REST
var Post = Backbone.Model.extend( {} );

//setting up a Post collection class with REST URL
var Posts = Backbone.Collection.extend( {
	model: Post,
	url  : WP_REST_URL + '/wp-json/wp/v2/posts'
} );

//parent view for all posts
var AppView = Backbone.View.extend( {
	el        : "#container", 
	collection: new Posts(),
	initialize: function() {

		//cache "this" for use in callback function
		var self = this;
		//fetch posts from server
		this.collection.fetch( {
			//when ready, show posts
			success: function() {
				self.render()
			}
		} );

	},

	render: function() {

		//clear view
		$( '#startup-message' ).html( '' );
		//show all posts of collection
		this.collection.each( function( post ) {
			var postView = new PostView( { model: post } );
			$( '#container' )
				.append( postView.el )

		} );

		return this;
	}

} );

//View for a single post
var PostView = Backbone.View.extend( {

	tagName         : 'div',
	className       : 'wp-post',
	post_template   : _.template( $( '#post-template' ).html() ),
	events          : { 'click .toggle-visibility': 'toggleVisibility' },
	toggleVisibility: function() {
		this.$( '.excerpt-container' ).animate( { height: "toggle" } );

	},
	initialize      : function() {
		this.render();
	},
	render          : function() {

		this.$el.append( this.post_template( this.model.toJSON() ) );
		return this;

	}
} );

//create AppView (start app)
var appView = new AppView();


