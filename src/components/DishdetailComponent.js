import React from 'react';
import {Card, CardImg,CardText, CardBody, CardTitle,Media,Col,Row} from 'reactstrap';


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

function RenderComments({comments}){
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
                    <RenderDish dish={dish}/>
                    <RenderComments comments={props.dish.comments} />
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
