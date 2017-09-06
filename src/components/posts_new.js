import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
// ...field.input basically passes field.input back to Field.
import {connect} from 'react-redux';
import {createPost} from '../actions';

class PostsNew extends Component{



  //field argument contains handlers so that it can handle any input changes.
  // ... tells it is an object and will handle all arguments
  //field.meta.error will attach itself to the field object from validate()
  renderField(field){

    //destructuring so we can access property from nested parts.
    //field.meta.touched and field.meta.error
    const { meta : {touched, error}} = field;
    const className=`form-group ${touched && error ? 'has-danger' : ''} `;

    return (<div className={className}>
      <label>{field.label}</label>
      <input className="form-control" type="text" {...field.input}/>
      <div className="text-help">{touched ? error : ''}</div>
    </div>
    );
  }

  onSubmit(values){
    //this === component
    console.log(values);
    //creates callback, so once post is created, it will then take user
    // back to index page.
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {

    const {handleSubmit} = this.props;

    //bind(this)) being used as a callback
    return (
      
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field label="Title" name="title" component={this.renderField}/>
          <Field label="Categories" name="categories" component={this.renderField}/>
          <Field label="Post Content" name="content" component={this.renderField}/>
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/" className="btn btn-danger">Cancel</Link>
        </form>

        
    );
  };
}

//values is an object which contains all the values from the form.
function validate(values){
  // console.log(values) -> {title:"Something", categories:"something", content:"Something"}
 
  const errors={};
  
  //validate inputs from 'values'
  if(!values.title){
    errors.title="Enter a title!"; 
  }

  if(!values.categories){
    errors.categories="Enter some categories"
  }

  if(!values.content){
    errors.content="Enter some content please";
  }

  //if errors is empty, form is fine to submit.
   //if errors has any properties, redux form assumes form is invalid
  return errors;

}

export default reduxForm({
  //same as validate : validate
  validate,
  form: 'PostsNewForm'
})(
  connect(null, {createPost})(PostsNew)
);
