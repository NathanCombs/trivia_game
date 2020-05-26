import React from 'react';
import App from '../App';
import {TriviaStore, apiState} from '../store/trivia-store';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CircularProgress } from '@material-ui/core';

configure({ adapter: new Adapter() })


describe('App', () => {
  let store = new TriviaStore();
  let stubQuestions: Question[] = [
    {
      category: 'Fake Category 1',
      question: 'Fake Question - True',
      correctAnswer: true,
    },
    {
      category: 'Fake Category 2',
      question: 'Fake Question - False',
      correctAnswer: false,
    }
  ];

  beforeEach(() => {
    store = new TriviaStore();
  });

  it('renders home page at start up', () => {
    store.currentQuestionIndex === undefined;
    const wrapper = mount(<App store={store}/>);
    expect(wrapper.find('h1').text()).toContain('Welcome to the Trivia Challenge!');
  });

  it('renders error', () => {
    store.currentQuestionIndex = 0;
    store.apiState = apiState.error;
    const wrapper = mount(<App store={store}/>);
    expect(wrapper.find('h1').text()).toContain('Error');
  });

  it('renders spinner if data request is pending', () => {
    store.currentQuestionIndex = 0;
    store.apiState = apiState.pending;
    const wrapper = mount(<App store={store}/>);
    expect(wrapper.containsMatchingElement(<CircularProgress />)).toEqual(true);
  });

  it('renders a question', () => {
    store.currentQuestionIndex = 0;
    store.apiState = apiState.done;
    store.questions = stubQuestions;
    const wrapper = mount(<App store={store}/>);
    expect(wrapper.find('p').text()).toContain('Fake Question - True');
  });

  it('renders results', () => {
    store.currentQuestionIndex = 2;
    store.questions = [
      {
        category: 'Fake Category 1',
        question: 'Fake Question - True',
        correctAnswer: true,
        userAnswer: false
      },
      {
        category: 'Fake Category 2',
        question: 'Fake Question - False',
        correctAnswer: false,
        userAnser: true
      }
    ];
    const wrapper = mount(<App store={store}/>);
    expect(wrapper.find('h1').text()).toContain('You scored 0 / 2');
  })

});








//test cases for apistates, question indexes
