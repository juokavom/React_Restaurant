import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';


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
    if (props.dish != null) {
        return (
            <div class="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/menu'>Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            {props.dish.name}
                    </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        );
    } else {
        return <div></div>
    }
}

export default DishDetail;