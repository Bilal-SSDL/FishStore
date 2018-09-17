import React from 'react';
import {Component} from 'react';
import {render} from 'react-dom';
import App from './components/App';
import "./css/style.css";
import Router from "./components/Home/Router";
render(<Router />,document.querySelector('#main')); //mounting