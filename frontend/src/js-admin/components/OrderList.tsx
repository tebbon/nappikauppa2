'use strict';

import React = require('react');
import $ = require('jquery');
import _ = require('underscore');
import Bootstrap = require('react-bootstrap');

import {IAdminOrderListItem} from "../../../../backend/src/order";

export interface IOrderListProps {
  show_id?: number;
}

export interface IOrderListState {
  orders?: IAdminOrderListItem[];
}

export default class OrderList extends React.Component<IOrderListProps, IOrderListState> {
  constructor() {
    super();
    this.state = {orders: []};
  }

  componentWillMount() {
    var data = this.props.show_id ? {show_id: this.props.show_id} : null;
    $.getJSON('admin-api/orders/', data, (resp: IAdminOrderListItem[]) => {
      this.setState({orders: resp});
    });
  }

  render() {
    return (
      <div>
        <Bootstrap.Table bordered striped condensed><tbody>
        <tr>
          <th>Nimi</th>
          <th>Ostettu</th>
          <th>Hinta</th>
          <th>Status</th>
          <th>Edit</th>
          <th>Liput</th>
          <th>Maksulinkki</th>
        </tr>
          {this.state.orders.map((order) => {
            var editLink = order.status === 'paid' ? <a href={'#orders/' + order.id}>Edit</a> : null;
            var ticketLink = order.status === 'paid' ? <a href={'admin-api/orders/' + order.id + '/tickets/'}>Liput</a> : null;
            var paymentLink = order.status !== 'paid' ? <a href={order.payment_url}>Maksulinkki</a> : null;

            return (<tr key={order.id}>
              <td>{order.name}</td>
              <td>{order.time}</td>
              <td>{order.price}</td>
              <td>{order.status}</td>
              <td>{editLink}</td>
              <td>{ticketLink}</td>
              <td>{paymentLink}</td>
            </tr>);
          })}
        </tbody></Bootstrap.Table>
      </div>
    );
  }

}