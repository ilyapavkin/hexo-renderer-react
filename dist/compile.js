"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
// import ReactDOMServer from 'react-dom/server';
const ReactDOMServer = __importStar(require("react-dom/server"));
const babel = __importStar(require("@babel/core"));
const eval_1 = __importDefault(require("eval"));
require("@babel/register");
function compile(data) {
    const js = babel.transform(data.text, { filename: data.path });
    const Component = eval_1.default(js?.code, data.path, null, true);
    return (locals) => {
        const element = React.createElement(Component.default || Component, locals);
        const markup = ReactDOMServer.renderToStaticMarkup(element);
        if (markup.slice(0, 5).toLocaleLowerCase() === '<html') {
            return '<!doctype html>\n' + markup;
        }
        return markup;
    };
}
exports.default = compile;
