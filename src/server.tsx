import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { CounterCheckWidget } from './components/CounterCheckWidget';

export function render(props: any = {}): string {
  return ReactDOMServer.renderToString(React.createElement(CounterCheckWidget, props));
}

export { CounterCheckWidget };
export default CounterCheckWidget;
