import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPost, deletePost} from '../actions';
import {Link} from 'react-router-dom';

// Handles show post. 

class PostsShow extends Component{
componentDidMount(){

  //React Router method which allows for access to URL. 
  
  if(!this.props.posts){
    const {id} = this.props.match.params;
    this.props.fetchPost(id);
  }
}

onDeleteClick(){
  const {id} = this.props.match.params;
  this.props.deletePost(id, ()=> {
    this.props.history.push('/');
  });
}

  render(){
    const {post} = this.props;


    //If post hasn't been retreived yet, it will give a 'loading screen'
    if(!post){
      return <div>Loading...</div>;
    }


    return(
      <div>
        <Link to="/" className="btn btn-warning" id="Back">Back To Index</Link>
        <button className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}>
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

function mapStateToProps({posts}, ownProps){

  //Will grab the exact post that it needs.
  return {post: posts[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchPost, deletePost})(PostsShow);