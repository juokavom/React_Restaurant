import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';


class DishDetail extends Component {
    constructor(props) {
        super(props);
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

                    </div>
                </div>
            );
        } else {
            return <div></div>
        }
    }
}

export default DishDetail;