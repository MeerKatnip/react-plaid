import React, { Component } from "react";
import PlaidLink from "react-plaid-link";
import axios from "axios";

class Link extends Component {
    constructor() {
        super();

        this.state = {
            transactions: []
        };

        this.handleClick = this.handleClick.bind(this);
    };

    handleOnSuccess(public_token, metadata) {
        // send token to client server
        axios.post("/auth/public_token", {
            public_token: public_token
        });
    }

    handleClick(res) {
        axios.get("/transactions").then(res => {
            this.setState({ transactions: res.data });
        });
    }

    render() {
        return (
            <div>
                <PlaidLink
                    clientName="React Plaid"
                    env="sandbox"
                    product={["auth", "transactions"]}
                    publicKey="access-sandbox-72377619-e5c5-4067-a7f9-53c0260eadf1e"
                    onExit={this.handleOnSuccess}
                    className="test"
                >
                    Open Link and connect your bank!
                </PlaidLink>
                <div>
                    <button onClick={this.handleClick}>Get Transactions</button>
                </div>
            </div>
        );
    }
}

export default Link;