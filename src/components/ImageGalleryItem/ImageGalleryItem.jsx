import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';
import Modal from '../Modal/Modal';

class ImageGalleryItem extends React.Component {
  state = {
    showModal: false,
    largeImg: '',
  };

  togleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    const { images } = this.props;
    return (
      <li className={styles.ImageGalleryItem} key={images.id}>
        <img
          src={images.webformatURL}
          alt=""
          className={styles.ImageGalleryItem_image}
          onClick={this.togleModal}
        />
        {this.state.showModal && (
          <Modal onClose={this.togleModal}>
            <img src={images.largeImageURL} alt="" width="600px" />
          </Modal>
        )}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  images: PropTypes.object,
};

export default ImageGalleryItem;
