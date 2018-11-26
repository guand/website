
import React, { Component } from 'react';
import { connect } from 'react-redux';
// Remember our thunk this is where we will need to make use of it
import { postsFetchData } from '../actions/actions.js';
// We gonna use lodash to map over our recipe object
import _ from 'lodash'

class Post extends Component {
  constructor(props) {
    super(props);
    // Bind our render recipe to function so we can use it in the render method 
    this.renderPost = this.renderPost.bind(this)
  }

  // Fetch recipes when component is mounted
  componentDidMount() {
    const API_URL = 'http://localhost:3000/api/post/?list';
    // I am setting some delay to simulate a real world request
    setTimeout(() => { this.props.fetchPost(API_URL); }, 1000);
  }
// Function to render our recipe
  renderPost() {
    return _.map(this.props.posts, post => {
      // Get the html for our recipe ingredients
      function createMarkupForDescription() {
        if (post.description) {
          return {
            __html: post.description,
          };
        } else {
          return;
        }
      };

      // Make sure we show only published recipes
      if (post.state = "published") {
      return (
        <div key={post._id}>
          <h1>{post.name}</h1>
          {/* 
          In react we cant set HTML directly we need to use dangerouslySetInnerHTML.
          */}
          <div dangerouslySetInnerHTML={createMarkupForDescription()} />
        </div>
      );
    }
    });
  }
  render() {
    // If data is still loading 
    if (this.props.loading) {
      return (
        <div>
          <h1>LOADING...</h1>
        </div>
      );
    }
    // Show recipe once data is loaded
      return (
        <div>
        {this.renderPost()}
        </div>
      );
};
};

function mapStateToProps(state, ownProps) {
  // Things return here are showing in props for Recepie
  return {
    posts: state.posts,
    loading: state.loadPosts,
  };
}

// anything returned from here will end up in the props
const mapDispatchToProps = dispatch => ({
  // Our thunk will be mapped to this.props.fetchRecipe
  fetchPost: (url) => dispatch(postsFetchData(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);