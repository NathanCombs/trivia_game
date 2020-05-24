import * as React from 'react';
import {observer} from 'mobx-react';
import './page-container.css';
import {Button} from '@material-ui/core';

export enum buttonLabel {'Begin', 'True', 'False', 'Play Again?'}

export interface PageContainerProps {
  store?: any,
  header: string,
  body: () => {},
  primaryButton: ButtonProps,
  secondaryButton?: ButtonProps
}

interface ButtonProps {
  id: string,
  label: string,
  action: () => {}
}

@observer
export class PageContainer extends React.PureComponent<PageContainerProps> {

  getSecondaryButton = () => {
    if (this.props.secondaryButton) {
      return (
        <div className="secondaryButton">
          <Button
            color="secondary"
            variant="contained"
            id={this.props.secondaryButton.label}
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
          <Button
            variant="contained"
            color="primary"
            onClick={this.props.primaryButton.action}
          >{this.props.primaryButton.label}</Button>
        </div>
      </div>
    )
  }
}
