import * as React from 'react';
// import ReactDOMServer from 'react-dom/server';
import * as ReactDOMServer from 'react-dom/server';
import * as babel from '@babel/core';
import reval from 'eval';
import '@babel/register';

export default function compile(data: {text: string, path: string}) {
    const js = babel.transform(data.text, {filename: data.path});
    const Component = reval(js?.code, data.path, null, true);

    return (locals: any) => {
        const element = React.createElement(Component.default || Component, locals);
        const markup = ReactDOMServer.renderToStaticMarkup(element);
        if(markup.slice(0, 5).toLocaleLowerCase() === '<html') {
            return '<!doctype html>\n' + markup;
        }
        return markup;
    }
}
