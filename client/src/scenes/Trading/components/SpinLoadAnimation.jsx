import React from 'react';
import { css } from '@emotion/core';

// Another way to import. This is recommended to reduce bundle size
import BeatLoader from 'react-spinners/BeatLoader';
 
// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;
 
class SpinLoadAnimation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  render() {
    return (
      <div className='sweet-loading'>
        <BeatLoader
          css={override}
          sizeUnit={"px"}
          size={10}
          color={'#95a5a6'}
          loading={this.state.loading}
        />
      </div> 
    )
  }
}

export default SpinLoadAnimation;