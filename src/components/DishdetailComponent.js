import React,{Component} from 'react';
import {Label,Row,Card, CardImg,CardText, CardBody, CardTitle ,Breadcrumb, BreadcrumbItem,Modal,ModalHeader,ModalBody,Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import {LocalForm, Control,Errors} from 'react-redux-form';

const minLength= (len)=> (val)=> (val) && (val.length>=len);
const maxLength= (len)=> (val)=> !(val) || (val.length<=len);


class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state={
            isOpenModal: false
        }
        this.toggleModal=this.toggleModal.bind(this);

    }
    toggleModal(){
        this.setState({
            isOpenModal: !this.state.isOpenModal
        });
    }
    handleSubmit(values){
        this.toggleModal();
        this.props.addComment(this.props.dishId,values.rating,values.author,values.comment);
    }
    render(){
        return(
            <React.Fragment>
                <Button onClick={this.toggleModal}>
                    <span className="fa fa-comment"></span> Submit Comment
                </Button>

                <Modal isOpen={this.state.isOpenModal} toggle={this.toggleModal}>
                <div className="container">
                    <ModalHeader isOpen={this.state.isOpenModal} toggle={this.toggleModal}>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values)=> this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" name="rating" className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author">Your name</Label>
                                <Control.text validators={{minLength: minLength(3),maxLength: maxLength(15)}} model=".author" className="form-control" name="author" id="author" placeholder="Your name"/>
                                <Errors
                                    className="text-danger" model=".author" show="touched" messages={{
                                            minLength: 'Must be greater than 3 characters',
                                            maxLength: 'Must be less than 15 characters'
                                        }}
                                />
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".comment" id="comment" name="comment" rows="6" className="form-control"/>
                            </Row>
                            <Button type="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                    </div>
                </Modal>
            </React.Fragment>
        );
    }
}

function RenderDish({dish}){
    return(
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg width="100%"  src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function RenderComments({comments,addComment,dishId}){
    if(comments != null){
        return(
            <div className="col-12 col-md-5 m-1">
                <h5>Comments</h5>
                <ul className="list unstyled">
                    {comments.map((c)=>{
                            return(
                                <li key={c.id}>
                                    <p>{c.comment}</p>
                                    <p>
                                        --- {c.author}, {new Intl.DateTimeFormat('en-US',{year:'numeric' ,month: 'short', day: '2-digit'}).format(new Date(Date.parse(c.date)))}
                                    </p>
                                </li>
                            );
                        }
                    )}
                </ul>
                <CommentForm dishId={dishId} addComment={addComment}/>
            </div>
        );
    }
    else{
        return(
            <div></div>
        );
    }
}

const DishDetail=(props) => {
    const dish=props.dish;
    if(dish != null){
        return(
            <div class="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/menu">Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3><br/>
                    </div>
                </div>
                <div className="row ">
                    <RenderDish dish={dish}/>
                    <RenderComments comments={props.comments} addComment={props.addComment} dishId={props.dish.id}/>
                </div>
            </div>
        );
    }
    else{
        return(
            <div></div>
        );
    }
}

export default DishDetail;
