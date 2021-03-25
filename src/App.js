import React, {Component, Fragment} from 'react';
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:4000/examen`)
            .then(res => {
                const {data} = res.data;
                this.setState({data});
            })
    }

    render() {
        const {data} = this.state;

        const dataView = {
            "_id": "605c370501010a8d4058d1ad",
            "index": 0,
            "guid": "ef7e6e69-5828-4077-b3c4-bec2da88fd23",
            "isActive": true,
            "balance": "$1,843.20",
            "picture": "http://placehold.it/32x32",
            "age": 38,
            "eyeColor": "green",
            "name": {
                "first": "Lily",
                "last": "Cantrell"
            },
            "company": "CORPORANA",
            "email": "lily.cantrell@corporana.net",
            "phone": "+1 (896) 416-3013",
            "address": "527 Lake Place, Hoagland, California, 8808",
            "about": "Adipisicing ullamco ipsum incididunt proident. Exercitation duis labore pariatur commodo laborum tempor ipsum. Est elit deserunt adipisicing esse aliqua. Laboris ex ut pariatur reprehenderit anim non. Velit consectetur aliqua fugiat incididunt non.",
            "registered": "Wednesday, March 10, 2021 4:55 PM",
            "latitude": "-87.319052",
            "longitude": "38.201583",
            "tags": [
                "nulla",
                "minim",
                "do",
                "cillum",
                "non"
            ],
            "range": [
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9
            ],
            "friends": [
                {
                    "id": 0,
                    "name": "Rich Hays"
                },
                {
                    "id": 1,
                    "name": "Katherine Doyle"
                },
                {
                    "id": 2,
                    "name": "Brittany Burt"
                }
            ],
            "greeting": "Hello, Lily! You have 5 unread messages.",
            "favoriteFruit": "strawberry"
        };

        console.log(data);
        return (
            <>
                <ul>
                    {data?.map(d => <li key={d._id} className="Container">
                            <div className="infoContainer">
                                <img width={100} height={100} src={d.picture} alt={`img_${d.id}`}/>
                                <span style={{backgroundColor: d.isActive ? 'green' : 'red'}}>.</span>
                                <p>first name: {d.name.first}</p>
                                <p>last name: {d.name.last}</p>
                                <p>Company: {d.company}</p>
                                <p>Phone: {d.phone}</p>
                                <p>Email: {d.email}</p>
                                <p>last name: {d.company}</p>
                                <p>age: {d.age}</p>
                                <p>balance: {d.balance}</p>
                                <p>eye color: {d.eyeColor}</p>

                                <h4>friends</h4>
                                <ul>
                                    {d.friends.map(f => <li>
                                        {f.name}
                                    </li>)}
                                </ul>
                                <p>greeting: {d.greeting}</p>
                                <p>favorite fruit: {d.favoriteFruit}</p>
                                <hr/>
                            </div>
                        </li>
                    )}
                </ul>
            </>
        );
    }
}

export default App;
