import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';


function RenderDish({ dish }) {
    return (
        <div className="col col-12 col-md-5 m-1">
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}
function RenderComments({ comments }) {
    if (comments != null && comments.length > 0) {
        const com = comments.map((i) => {
            const date = new Date(i.date);
            const month = date.toLocaleString('default', { month: 'long' });
            return (
                <div key={i.id}>
                    <li><p>{i.comment}</p></li>
                    <li><p>--{i.author}, {month} {date.getDay()}, {date.getFullYear()}</p></li>
                </div>
            );
        });

        return (
            <div className="col col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {com}
                </ul>
            </div>);
    }
    else {
        return <div></div>
    }
}

const DishDetail = (props) => {
    console.log('DishDetail render invoked');
    if (props.dish != null) {
        return (
            <div className="row">
                {/*
                     Bootstrap 5 doesn't have xs, so I just use col-12
                     to get 12 columns until md and col-md-5 to get
                     5 columns md and up.
                */}
                <RenderDish dish={props.dish} />
                <RenderComments comments = {props.dish.comments} />
            </div>
        );
    } else {
        return <div></div>
    }
}

export default DishDetail;