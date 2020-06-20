import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import "./App.css";
import Nav from "./Nav";
import HomeView from "./HomeView";
import SingleMessage from "./SingleMessage";
import SendMessage from "./SendMessage";
import Sidebar from "./Sidebar";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emails: [],
      sent: [],
      searched: [],
      message: {},
      homeView: true,
      sentMail: false,
      searchedMail: false,
      singleMessage: false,
      sendMessage: false,
    };
    this.fetchInbox();
    this.fetchSent();
    this.backToHome = this.backToHome.bind(this);
    this.showSentMail = this.showSentMail.bind(this);
    this.showSingleMessage = this.showSingleMessage.bind(this);
    this.showSendEmail = this.showSendEmail.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
    this.searchEmails = this.searchEmails.bind(this);
  }

  // fetch inbox
  async fetchInbox() {
    const response = await fetch("http://localhost:3001/emails");
    const json = await response.json();
    this.setState({ emails: json });
  }

  // fetch sent main
  async fetchSent() {
    const response = await fetch("http://localhost:3001/sent");
    const json = await response.json();
    this.setState({ sent: json });
  }

  // sends us back to our home view which is the inbox
  backToHome() {
    this.setState({
      searched: [],
      homeView: true,
      sentMail: false,
      searchedMail: false,
      singleMessage: false,
      sendMessage: false,
    });
  }

  showSentMail() {
    this.setState({
      searched: [],
      homeView: false,
      sentMail: true,
      searchedMail: false,
      singleMessage: false,
      sendMessage: false,
    });
  }

  // show compose message page
  showSendEmail() {
    this.setState({
      searched: [],
      homeView: false,
      sentMail: false,
      searchedMail: false,
      singleMessage: false,
      sendMessage: true,
    });
  }

  // shows chosen message when clicked in inbox
  showSingleMessage(event) {
    const emailId = event.target.id - 1;
    let clickedMessage;
    if (event.target.getAttribute("value") === "jane@galvanize.com") {
      clickedMessage = this.state.sent[emailId];
    } else {
      clickedMessage = this.state.emails[emailId];
    }
    this.setState({
      homeView: false,
      sentMail: false,
      searchedMail: false,
      singleMessage: true,
      sendMessage: false,
      message: clickedMessage,
    });
  }

  // handles the form submit for sending an email
  async sendEmail(messageDetails) {
    // messageDetails is not the data filled out on the form yet in SendMessage
    // messageDetails: recipient subject message
    console.log(new Date().toJSON());
    let sentEmail = {
      date: new Date().toJSON(),
      sender: "jane@galvanize.com",
      id: this.state.sent.length + 1,
      recipient: messageDetails.target.elements.recipient.value,
      subject: messageDetails.target.elements.subject.value,
      message: messageDetails.target.elements.message.value,
    };
    const requestOptions = {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sentEmail),
    };
    const response = await fetch("http://localhost:3001/send/", requestOptions);
    const data = await response.json();
    alert(data.message);
    if (data.status === "success") {
      this.fetchSent();
    }
  }

  // look for search term in inbox and sent mail
  // pushes any matching emails to temp array and then sets state
  // of searched to temp array
  searchEmails(query) {
    const searchQuery = query.target.elements[0].value
    // look for search query in inbox
    let tempArr = []
    this.state.emails.forEach(e => {
      if(e.subject.toLowerCase().indexOf(searchQuery) !== -1) {
        tempArr.push(e)
      }
      else if (e.sender.toLowerCase().indexOf(searchQuery) !== -1) {
        tempArr.push(e)
      }
    })
    // look for search query in sent mail
    this.state.sent.forEach(e => {
      if(e.subject.toLowerCase().indexOf(searchQuery) !== -1) {
        tempArr.push(e)
      }
      else if (e.sender.toLowerCase().indexOf(searchQuery) !== -1) {
        tempArr.push(e)
      }
    })
    this.setState({
      searched: tempArr,
      homeView: false,
      sentMail: false,
      searchedMail: true,
      singleMessage: false,
      sendMessage: false,
    })
  }

  render() {
    // makes sure the fetch went through before proceeding
    if (!this.state.emails) {
      return null;
    }
    return (
      <div className="App">
        <Nav toHome={this.backToHome} />
        <MDBContainer>
          <MDBRow className="grid-divider">
            <MDBCol lg="2" border-right>
              <Sidebar
                lengths={{
                  inbox: this.state.emails.length,
                  sent: this.state.sent.length,
                }}
                toHome={this.backToHome}
                toSent={this.showSentMail}
                send={this.showSendEmail}
              />
            </MDBCol>
            <MDBCol lg="10">
              {this.state.homeView ? (
                <HomeView
                  value={this.state.emails}
                  singleMessage={this.showSingleMessage}
                  searchMail={this.searchEmails}
                />
              ) : (
                <div />
              )}
              {this.state.sentMail ? (
                <HomeView
                  value={this.state.sent}
                  singleMessage={this.showSingleMessage}
                  searchMail={this.searchEmails}
                />
              ) : (
                <div />
              )}
              {this.state.searchedMail ? (
                <HomeView
                  value={this.state.searched}
                  singleMessage={this.showSingleMessage}
                  searchMail={this.searchEmails}
                />
              ) : (
                <div />
              )}
              {this.state.singleMessage ? (
                <SingleMessage value={this.state.message} />
              ) : (
                <div />
              )}
              {this.state.sendMessage ? (
                <SendMessage sendEmail={this.sendEmail} />
              ) : (
                <div />
              )}
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

export default App;
