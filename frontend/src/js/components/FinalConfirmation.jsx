'use strict';

var React = require('react');
var Button = require('react-bootstrap/lib/Button');
var _ = require('underscore');

var FinalConfirmation = React.createClass({

  render: function() {
    var numTickets = this.props.order.get('tickets').length;
    var finalPrice = this.props.order.get('order_price');
    var discountCode = this.props.order.get('discount_code');
    var ticketTotal = this.props.order.get('tickets_total_price');
    var discountedTotalEl = null;
    if (discountCode) {
      discountedTotalEl = (
        <tr>
          <td>Alennuskoodi {discountCode}</td>
          <td>-{ticketTotal - finalPrice} eur</td>
        </tr>
      );

    }
    var active = !this.props.paymentBegun;
    return (

      <div className='shopping-stage final-confirmation'>
        <h2>Vahvistus <small>5/5</small></h2>
        <table className='table table-bordered'>
        <tbody>
          <tr>
            <td>Pääsylippu, {numTickets} kpl</td>
            <td>{ticketTotal} eur</td>
          </tr>
          {discountedTotalEl}
          <tr>
            <td>Yhteensä</td>
            <td>{finalPrice} eur</td>
          </tr>
        </tbody>
        </table>

        <Button id='proceedToPayment' disabled={!active} onClick={active ? this.props.onProceedToPayment : null}>
          {active ? 'Siirry maksamaan' : 'Siirrytään maksupalveluun'}
        </Button>
      </div>
    );
  }

});

module.exports = FinalConfirmation;
