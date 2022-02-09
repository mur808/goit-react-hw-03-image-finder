import axios from 'axios';

const fethcImages = (searchValue, pageNumber) => {
  return axios.get(
    `https://pixabay.com/api/?q=${searchValue}&page=${pageNumber}&key=25634458-ceb81d144d61c659939ce1593&image_type=photo&orientation=horizontal&per_page=12`,
  );
};

const API = { fethcImages };

export default API;
