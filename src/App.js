import React from 'react';
import './App.css';
import Nav from './Nav'
import HomeView from './HomeView'
import SingleMessage from './SingleMessage'
import SendMessage from './SendMessage'
import Sidebar from './Sidebar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emails: [],
      searched: [],
      sent: [],
      message: {},
      homeView: true,
      sentMail: false,
      singleMessage: false,
      sendMessage: false
    }
    this.fetchInbox();
    this.fetchSent();
    this.backToHome = this.backToHome.bind(this)
    this.showSentMail = this.showSentMail.bind(this)
    this.showSingleMessage = this.showSingleMessage.bind(this)
    this.showSendEmail = this.showSendEmail.bind(this)
    this.sendEmail = this.sendEmail.bind(this)
  }

  async fetchSent() {
    const response = await fetch("http://localhost:3001/sent")
    const json = await response.json()
    this.setState({sent: json})
  }

  async fetchInbox() {
    const response = await fetch("http://localhost:3001/emails")
    const json = await response.json()
    this.setState({emails: json})
  }

  // sends us back to our home view which is the inbox
  backToHome() {
    this.setState({
      homeView: true,
      sentMail: false,
      singleMessage: false,
      sendMessage: false
    })
  }

  showSentMail() {
    this.setState({
      homeView: false,
      sentMail: true,
      singleMessage: false,
      sendMessage: false
    })
  }

  // show compose message page
    showSendEmail() {
      this.setState({
        homeView: false,
        sentMail: false,
        singleMessage: false,
        sendMessage: true
      })
    }

  // shows chosen message when clicked in inbox
  showSingleMessage(event) {
    const emailId = event.target.id - 1
    let clickedMessage
    if(event.target.getAttribute('value') === 'jane@galvanize.com') {
      clickedMessage = this.state.sent[emailId]
    }
    else {
      clickedMessage = this.state.emails[emailId]
    }
    this.setState({
      homeView: false,
      sentMail: false,
      singleMessage: true,
      sendMessage: false, 
      message: clickedMessage
    })
  }

  // handles the form submit for sending an email
  async sendEmail(messageDetails) {
    messageDetails.preventDefault();
    // messageDetails is not the data filled out on the form yet in SendMessage
    // messageDetails: recipient subject message
    let sentEmail = {
      sender: 'jane@galvanize.com',
      id: this.state.sent.length + 1,
      recipient: messageDetails.target.elements.recipient.value,
      subject: messageDetails.target.elements.subject.value,
      message: messageDetails.target.elements.message.value
    }
    // add date later
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sentEmail)
    };
    const response = await fetch('http://localhost:3001/send/', requestOptions);
    const data = await response.json();
    alert(data.message)
    if (data.status === 'success') {
      this.fetchSent();
    }
    
  }

  
  
  render() {
    // makes sure the fetch went through before proceeding
    if (!this.state.emails) {
      return null;
    }
    return (
      <div className="App">
        <Nav toHome={this.backToHome} send={this.showSendEmail}/>
        <Sidebar lengths={{inbox:this.state.emails.length, sent:this.state.sent.length}} toHome={this.backToHome} toSent={this.showSentMail} send={this.showSendEmail}/>

        {(this.state.homeView) ? <HomeView value={this.state.emails} singleMessage={this.showSingleMessage} /> : <div />}
        {(this.state.sentMail) ? <HomeView value={this.state.sent} singleMessage={this.showSingleMessage} /> : <div />}
        {(this.state.singleMessage) ? <SingleMessage value={this.state.message} /> : <div />}
        {(this.state.sendMessage) ? <SendMessage sendEmail={this.sendEmail} /> : <div />}
      </div>
    )
  }
}

export default App;
