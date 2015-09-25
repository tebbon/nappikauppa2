var React = require('react');
var Backbone = require('backbone');

var ShowSelector = require('./ShowSelector.jsx');
var SeatSelector = require('./SeatSelector.jsx');
var ShoppingCart = require('./ShoppingCart.jsx');
var Contacts = require('./Contacts.jsx');

var Shows = require('../collections/shows.js');
var Tickets = require('../collections/tickets.js');
var Ticket = require('../models/ticket.js');

var Router = require('../router.js');

var Store = React.createClass({
  shows: new Shows(),
  tickets: new Tickets(),

  getInitialState: function () {
    return {page: "home", showid: this.props.showid, show: null};
  },

  componentWillMount: function () {
    this.shows.fetch({
      success: function(collection, response, options) {
        if(this.state.showid) {
          this.setState({page: 'seats', show: this.shows.get(this.state.showid)});
        }

        this.forceUpdate();
      }.bind(this)
    });
  },

  onShowSelect: function (showid) {
    this.tickets.reset();
    this.setState({
      page: 'seats',
      showid: showid,
      show: this.shows.get(showid)
    });
    Router.navigate('show/'+showid, {trigger: false});
  },

  onSeatClicked: function (seat) {
    var ticket = this.tickets.findWhere({seat: seat});
    if(ticket) {
      this.tickets.remove(ticket);
    } else {
      this.tickets.add(new Ticket({seat: seat}));
    }
    this.forceUpdate();
  },

  onReserveTickets: function () {
    Backbone.sync('create', this.tickets,
      { url: "/api/show/" + this.state.showid + "/tickets/",
        success: function() { console.log("wow");},
        error: function() {console.log("gotta figure out something");}
      });
  },

  helpText: (<div className="shopping-stage help-text">
    <h4>Tervetuloa katsomaan Suomen suurinta opiskelijamusikaalia!</h4>
    Mikäli koet ongelmia lippukaupan toiminnassa, voit ottaa yhteyttä lipunmyyntivastaavaan osoitteessa liput@teekkarispeksi.fi.
  </div>),


  render: function () {
    var seatSelectorElem, shoppingCartElem, contactsElem;

    if(this.state.page == 'home') {
      seatSelectorElem = this.helpText;
    } else if(this.state.page == 'seats') {
      // for now everything is displayed when a show is selected - maybe be more gradual?
      seats = this.tickets.map(function(ticket) { return ticket.get("seat"); });
      seatSelectorElem = <SeatSelector onSeatClicked={this.onSeatClicked} show={this.state.show} selectedSeats={seats} />;
      shoppingCartElem = <ShoppingCart tickets={this.tickets} onReserveTickets={this.onReserveTickets} />;
      contactsElem = <Contacts />;
    }

    return (
      <div>
        <ShowSelector onShowSelect={this.onShowSelect} shows={this.shows} />
        {seatSelectorElem}
        {shoppingCartElem}
        {contactsElem}
      </div>
    );
  }

});

module.exports = Store;
