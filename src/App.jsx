import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './App.module.css';
import API from './services/image-api';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Loader from './components/Loader/Loader';

class App extends React.Component {
  state = {
    searchValue: '',
    pageNumber: 1,
    images: [],
    status: 'idle',
    imagesLength: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchValue !== this.state.searchValue) {
      this.setState({
        status: 'pending',
      });
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { searchValue, pageNumber } = this.state;

    API.fethcImages(searchValue, pageNumber).then(res => {
      if (res.data.total > 0) {
        this.setState(prevState => ({
          images: [...prevState.images, ...res.data.hits],
          pageNumber: prevState.pageNumber + 1,
          status: 'resolved',
          imagesLength: res.data.hits.length,
        }));
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      } else {
        this.setState({
          status: 'rejected',
        });
      }
    });
  };

  searchSubmit = searchValue => {
    this.setState({
      searchValue,
      images: [],
      pageNumber: 1,
    });
  };

  render() {
    const { images, status, imagesLength } = this.state;
    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.searchSubmit} />

        {status === 'rejected' && <h1 className={styles.error}>Not found</h1>}

        {status === 'resolved' && <ImageGallery images={images} />}
        {status === 'pending' && <Loader />}
        {imagesLength === 12 && status === 'resolved' && <Button onLoadMore={this.fetchImages} />}

        <ToastContainer />
      </div>
    );
  }
}

export default App;
