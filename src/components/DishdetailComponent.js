import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
    Button, Modal, ModalHeader, ModalBody, FormGroup, Label, Form, Input
} from 'reactstrap';
import { Link } from 'react-router-dom';

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
    };

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render() {
        return (
            <>
                <Modal isOpen={this.state.isModalOpen} toggle={this.state.toggleModal}>
                    <ModalHeader>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input} />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                        innerRef={(input) => this.remember = input} />
                                    Remember me
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" className="primary">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
            </>
        );
    };
}

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
                <CommentForm />
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