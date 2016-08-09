'use strict';

import React = require('react');
import Bootstrap = require('react-bootstrap');
import _ = require('underscore');
import $ = require('jquery');

export interface IContactsProps {
  active: boolean;
  prefilled_discount?: string;
  onSaveOrderInfo: Function;
}

export interface IContactsState {
  name?: string;
  email?: string;
  discount_code?: string;
  wants_email?: boolean;
  errors?: string[];
}

export default class Contacts extends React.Component<IContactsProps, IContactsState> {

  constructor(props: IContactsProps) {
    super();

    this.state = this._getInitialState(props);
  }

  private _getInitialState(props: IContactsProps) {
    return {
      name: '',
      email: '',
      discount_code: props.prefilled_discount,
      wants_email: false,
      errors: []
    };
  }

  onValueChange(field: string, event: any) {
    // In a way this would be nicer to have in Store.jsx (Store is kind of
    // the 'controller'), but it's too slow updating the whole app with each keypress
    // Also, until the user clicks "Tallenna", no other part can need these values..
    // So at least for now, kepe these in this state and save them to the Order in
    // onSave().
    // This also allows validation here.
    if (field === 'wants_email') {
      this.setState({wants_email: event.target.checked});
    } else {
      var stateUpdate: IContactsState = {};
      stateUpdate[field] = event.target.value;
      this.setState(stateUpdate);
    }
  }

  onSave() {
    var errors: string[] = [];
    if (!this.state.name) {
      errors.push('name');
    }
    if (!_.contains(this.state.email, '@')) {
      errors.push('email');
    }
    if (this.state.discount_code && !this._checkDiscountCode(this.state.discount_code)) {
      errors.push('discount_code');
    }

    this.setState({errors: errors});
    if (errors.length === 0) {
      this.props.onSaveOrderInfo(_.clone(this.state));
    }
  }

  private _checkDiscountCode(discount_code: string): boolean {
    var req = $.ajax({
      url: 'api/discountCode/' + discount_code,
      async: false
    });
    return JSON.parse(req.responseText).ok === true;
  }

  render() {
    var active = this.props.active;
    var divClass = 'shopping-stage contact-input';
    if (!active) {
      divClass += ' disabled';
    }

    return (
      <div className={divClass}>
        <h2>Yhteystiedot <small>4/5</small></h2>
        <div>
          <Bootstrap.Input
            label='Nimi'
            type='text'
            bsStyle={ _.contains(this.state.errors, 'name') ? ('error') : null }
            readOnly={!active}
            onChange={this.onValueChange.bind(this, 'name')}
            value={this.state.name} />
        </div>

        <div>
          <Bootstrap.Input
            label='Sähköposti'
            type='text'
            bsStyle={ _.contains(this.state.errors, 'email') ? ('error') : null }
            readOnly={!active}
            onChange={this.onValueChange.bind(this, 'email')}
            value={this.state.email} />
        </div>

        <div>
          <Bootstrap.Input
            label='Ennakkolippukoodi'
            type='text'
            bsStyle={ _.contains(this.state.errors, 'discount_code') ? ('error') : null }
            readOnly={!active}
            onChange={this.onValueChange.bind(this, 'discount_code')}
            value={this.state.discount_code} />
        </div>
        <div>
          <Bootstrap.Button id='saveOrderInfo' disabled={!active} onClick={active ? this.onSave.bind(this) : null}>Jatka</Bootstrap.Button>
        </div>
      </div>
    );
  }
}
