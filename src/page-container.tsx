import * as React from 'react';
import {observer} from 'mobx-react';
import {Button} from '@material-ui/core';

export enum buttonLabel {'Begin', 'True', 'False', 'Play Again?'}

export interface PageContainerProps {
  store?: any,
  header: string,
  body: string,
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
        <Button
          color="secondary"
          variant="contained"
          id={this.props.secondaryButton.label}
          onClick={this.props.secondaryButton.action}
        >{this.props.secondaryButton.label}</Button>
      )
    }
  }

  render() {
    return (
      <div className="App">
        <h1>{this.props.header}</h1>
        <p>{this.props.body}</p>
        {this.getSecondaryButton()}
        <Button
          variant="contained"
          color="primary"
          onClick={this.props.primaryButton.action}
        >{this.props.primaryButton.label}</Button>
      </div>
    )
  }
}
