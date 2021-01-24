import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';


class DishDetail extends Component {
    constructor(props) {
        super(props);
    }

    renderComments(comments) {
        if (comments != null && comments.length > 0) {
            const com = comments.map((i) => {
                const date = new Date(i.date);
                const month = date.toLocaleString('default', {month: 'long'});
                return (
                    <div>
                        <li><p>{i.comment}</p></li>
                        <li><p>--{i.author}, {month} {date.getDay()}, {date.getFullYear()}</p></li>
                    </div>
                );
            });

            return (
                <div>
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

    render() {
        if (this.props.dish != null) {
            return (
                <div className="row">
                    {/*
                     Bootstrap 5 doesn't have xs, so I just use col-12
                     to get 12 columns until md and col-md-5 to get
                     5 columns md and up.
                    */}
                    <div className="col col-12 col-md-5 m-1">
                        <Card>
                            <CardImg width="100%" src={this.props.dish.image} alt={this.props.dish.name} />
                            <CardBody>
                                <CardTitle>{this.props.dish.name}</CardTitle>
                                <CardText>{this.props.dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col col-12 col-md-5 m-1">
                        {this.renderComments(this.props.dish.comments)}
                    </div>
                </div>
            );
        } else {
            return <div></div>
        }
    }
}

export default DishDetail;