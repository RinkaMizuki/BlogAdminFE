/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Badge,
  Button
} from "shards-react";
import { get as getPosts } from "../services/httpRequest"

import PageTitle from "../components/common/PageTitle";
import { Link } from "react-router-dom";

const options = {
  weekday: 'long',
  day: '2-digit',
  month: 'long',
  year: 'numeric'
}

class BlogPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postList: [],
      links: []
    }

  }
  handleGetPostLink = async (link) => {
    const posts = await fetch(link, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    }).then(res => res.json()).then(data => data)
    this.setPostList(posts.posts_list.data)
    this.setLinkList(posts.posts_list.links);
  }
  async componentDidMount() {
    const posts = await getPosts("/admin/blog-posts");
    console.log(posts);
    this.setPostList(posts.posts_list.data)
    this.setLinkList(posts.posts_list.links);

  }
  setPostList = (newPosts) => {
    this.setState({ postList: newPosts });
  }


  setLinkList = (newLinks) => {
    this.setState({ links: newLinks });
  }
  render() {
    console.log(this.state.postList);
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Blog Posts" subtitle="Components" className="text-sm-left" />
        </Row>

        <Row>
          {this.state.postList.map((post) => (
            <Col lg="3" md="6" sm="12" className="mb-4" key={post.id}>
              <Card small className="card-post card-post--1">
                <div
                  className="card-post__image"
                  style={{ backgroundImage: `url(${post.post_thumbnail})` }}
                >
                  <Badge
                    pill
                    className={`card-post__category bg-blue`}
                  >
                    {post.category.cat_title}
                  </Badge>
                  <div className="card-post__author d-flex">
                    <a
                      href="#"
                      className="card-post__author-avatar card-post__author-avatar--small"
                      style={{ backgroundImage: `url('${post.authorAvatar}')` }}
                    >
                      Written by {post.created_by}
                    </a>
                  </div>
                </div>
                <CardBody>
                  <h5 className="card-title">
                    <a href="#" className="text-fiord-blue">
                      {post.post_title}
                    </a>
                  </h5>
                  <p className="card-text d-inline-block mb-3">{post.post_content}</p>
                  <span className="text-muted">{new Intl.DateTimeFormat('en-GB', options).format(new Date(post.created_at))}</span>
                </CardBody>
              </Card>
            </Col>
          ))}
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              {this.state.links.map(link => {
                return (
                  <li class="page-item"><div class="page-link" onClick={() => { this.handleGetPostLink(link.url) }}>{link.label}</div></li>
                )
              })}
            </ul>
          </nav>
        </Row>

      </Container>
    );
  }
}

export default BlogPosts;
