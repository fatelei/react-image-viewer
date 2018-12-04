import * as React from 'react';
import './App.css';
import ImageViewer from './components/ImageView';


class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <ImageViewer
          smallImage={'https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'}
          largeImage={'https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'}/>
      </div>
    );
  }
}

export default App;
