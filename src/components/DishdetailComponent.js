import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
    Button, Modal, ModalHeader, ModalBody, Label, Row, Col
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


const maxLenght = (len) => (val) => !(val) || (val.length <= len);
const minLenght = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        return (
            <>
                <Modal isOpen={this.state.isModalOpen}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Label htmlFor="rating">Rating</Label>
                            <Row className="form-group">
                                <Col>
                                    <Control.Select model=".rating" name="rating"
                                        className="form-control" >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.Select>
                                </Col>
                            </Row>
                            <Label htmlFor="author">Your Name</Label>
                            <Row className="form-group">
                                <Col>
                                    <Control.Text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            minLenght: minLenght(3), maxLenght: maxLenght(15)
                                        }} />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLenght: 'Must be greater than 2 characters',
                                            maxLenght: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Label htmlFor="comment">Comment</Label>
                            <Row className="form-group">
                                <Col>
                                    <Control.Textarea model=".comment" id="comment" name="comment"
                                        rows="6" className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
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
            <FadeTransform in transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
                <Card>
                    <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        </div>
    );
}
function RenderComments({ comments, postComment, dishId }) {
    if (comments != null && comments.length > 0) {
        const com = comments.map((i) => {
            const date = new Date(i.date);
            const month = date.toLocaleString('default', { month: 'long' });
            return (
                <Fade in>
                    <div key={i.id}>
                        <li><p>{i.comment}</p></li>
                        <li><p>--{i.author}, {month} {date.getDay()}, {date.getFullYear()}</p></li>
                    </div>
                </Fade>
            );
        });

        return (
            <div className="col col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    <Stagger in>
                        {com}
                    </Stagger>
                </ul>
                <CommentForm dishId={dishId} postComment={postComment} />
            </div>);
    }
    else {
        return <div></div>
    }
}

const DishDetail = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    if (props.dish != null) {
        return (
            <div className="container">
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
                    <RenderComments comments={props.comments}
                        postComment={props.postComment}
                        dishId={props.dish.id}
                    />
                </div>
            </div>
        );
    } else {
        return <div></div>
    }
}

export default DishDetail;