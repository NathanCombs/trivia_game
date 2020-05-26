import * as React from 'react';
import {observer} from 'mobx-react';
import './page-container.css';
import {Button} from '@material-ui/core';

export enum buttonLabel {'Begin', 'True', 'False', 'Play Again?'}

export interface PageContainerProps {
  store?: any,
  header?: string,
  body: () => {},
  primaryButton?: ButtonProps,
  secondaryButton?: ButtonProps
}

interface ButtonProps {
  id?: string,
  label: string,
  action: () => {}
}

@observer
export class PageContainer extends React.PureComponent<PageContainerProps> {

getPrimaryButton = () => {
  if (this.props.primaryButton) {
    return (
      <Button
        id={this.props.primaryButton.id}
        variant="contained"
        color="primary"
        onClick={this.props.primaryButton.action}
      >{this.props.primaryButton.label}</Button>
    )
  }
}

  getSecondaryButton = () => {
    if (this.props.secondaryButton) {
      return (
        <div className="secondaryButton">
          <Button
            id={this.props.secondaryButton.id}
            color="secondary"
            variant="contained"
            onClick={this.props.secondaryButton.action}
          >{this.props.secondaryButton.label}</Button>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="pageContainer">
        <h1>{this.props.header}</h1>
        {this.props.body()}
        <div className="buttonContainer">
          {this.getSecondaryButton()}
          {this.getPrimaryButton()}
        </div>
      </div>
    )
  }
}
