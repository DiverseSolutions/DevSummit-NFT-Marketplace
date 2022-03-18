import React, { Component } from 'react';
import axios from 'axios';

// const BASE_URL = "https://my-json-server.typicode.com/themeland/netstorm-json-1/author";
//
class AuthorProfile extends Component {
    state = {
        data: {
          "img": "https://theme-land.com/netstorm/assets/img/content/auction_2.jpg",
          "authorImg": "https://www.stablecoin.mn/static/media/od.88fe2537.jpeg",
          "author": "mnkhod",
          "content": "Dev Summit 2022 - NFT Marketplace Workshop Demo",
          "authorId": "ZqpthncaYTsd0579hasfu00st",
          "btnText": "Follow",
        },
        socialData: [
            {
              "id": 1,
              "link": "https://www.facebook.com/mnkhod.dev/",
              "icon": "fab fa-facebook-f"
            },
            {
              "id": 2,
              "link": "https://www.instagram.com/mnkh_od/",
              "icon": "fab fa-instagram"
            },
            {
              "id": 3,
              "link": "https://github.com/mnkhod",
              "icon": "fab fa-github"
            },
        ]
    }
    componentDidMount(){
        // axios.get(`${BASE_URL}`)
        //     .then(res => {
        //         this.setState({
        //             data: res.data,
        //             socialData: res.data.socialData
        //         })
        //         // console.log(this.state.data)
        //     })
        // .catch(err => console.log(err))
    }
    render() {
        return (
            <div className="text-center card no-hover">
                <div className="image-over">
                    <img className="card-img-top" src={this.state.data.img} alt="" />
                    {/* Author */}
                    <div className="author">
                        <div className="author-thumb">
                            <img className="rounded-circle" src={this.state.data.authorImg} alt="" />
                        </div>
                    </div>
                </div>
                {/* Card Caption */}
                <div className="p-0 card-caption col-12">
                    {/* Card Body */}
                    <div className="mt-4 card-body">
                        <h5 className="mb-3">{this.state.data.author}</h5>
                        <p className="my-3">{this.state.data.content}</p>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder={this.state.data.authorId} />
                            <div className="input-group-append">
                                <button><i className="icon-docs" /></button>
                            </div>
                        </div>
                        {/* Social Icons */}
                        <div className="my-3 social-icons d-flex justify-content-center">
                            {this.state.socialData.map((item, idx) => {
                                return (
                                    <a key={`asd_${idx}`} href={item.link}>
                                        <i className={item.icon} />
                                        <i className={item.icon} />
                                    </a>
                                );
                            })}
                        </div>
                        <a className="btn btn-bordered-white btn-smaller" href="https://www.linkedin.com/in/mnkhod/">{this.state.data.btnText}</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default AuthorProfile;
