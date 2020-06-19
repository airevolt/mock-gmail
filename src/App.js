import React from 'react';
import './App.css';
import Nav from './Nav'
import HomeView from './HomeView'
import SingleMessage from './SingleMessage'
import SendMessage from './SendMessage'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emails: [],
      searched: [],
      message: {},
      homeView: true,
      singleMessage: false,
      sendMessage: false
    }
    this.fetchEmails();
    this.backToHome = this.backToHome.bind(this)
    this.showSingleMessage = this.showSingleMessage.bind(this)
    this.sendEmail = this.sendEmail.bind(this)
  }

  async fetchEmails() {
    const response = await fetch("http://localhost:3001/emails")
    const json = await response.json()
    this.setState({emails: json})
  }

  // sends us back to our home view when logo in nav is clicked
  backToHome() {
    this.setState({homeView: true})
  }

  showSingleMessage(event) {
    const emailId = event.target.id - 1
    let clickedMessage = this.state.emails[emailId]
    // we could fetch the email here but we should already have them all stored in state
    // const response = await fetch("http://localhost:3001/emails/" + emailId)
    // const json = await response.json()
    this.setState({homeView: false, singleMessage: true, message: clickedMessage})
  }

  sendEmail() {
    this.setState({homeView: false, singleMessage: false, sendMessage: true})
  }
  
  render() {
    // makes sure the fetch went through before proceeding
    if (!this.state.emails) {
      return null;
    }
    return (
      <div className="App">
        <Nav toHome={this.backToHome} send={this.sendEmail}/>
        {(this.state.homeView) ? <HomeView value={this.state.emails} singleMessage={this.showSingleMessage}/> : <div />}
        {(this.state.singleMessage) ? <SingleMessage value={this.state.message}/> : <div />}
        {(this.state.sendMessage) ? <SendMessage /> : <div />}
      </div>
    )
  }
}

export default App;
