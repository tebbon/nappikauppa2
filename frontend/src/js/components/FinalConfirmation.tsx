'use strict';
import ReactElement = __React.ReactElement;
import React = require('react');
import Bootstrap = require('react-bootstrap');
import {IOrder} from '../../../../backend/src/order';

export interface IFinalConfirmationProps {
  order: IOrder;
  paymentBegun: boolean;

  onProceedToPayment: Function;
}

export default class FinalConfirmation extends React.Component<IFinalConfirmationProps, any> {

  render() {
    if (!this.props.order) {
      return (<div />);
    }
    var numTickets = this.props.order.tickets.length;
    var finalPrice = this.props.order.order_price;
    var discountCode = this.props.order.discount_code;
    var ticketTotal = this.props.order.tickets_total_price;
    var discountedTotalEl: ReactElement<any> = null;
    var buttonLabel = finalPrice > 0.5 ? 'Siirry maksamaan' : 'Vahvista liput';
    var buttonBusyLabel = finalPrice > 0.5 ? 'Siirrytään maksupalveluun' : 'Vahvistetaan lippuja';
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

        <Bootstrap.Button id='proceedToPayment' disabled={!active} onClick={active ? this.props.onProceedToPayment : null}>
          {active ? buttonLabel : buttonBusyLabel}
        </Bootstrap.Button>
      </div>
    );
  }

}
