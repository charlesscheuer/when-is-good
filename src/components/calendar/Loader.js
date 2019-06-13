import React from 'react'
import { css } from '@emotion/core'
import { SyncLoader } from 'react-spinners'
 
const override = css`
    display: block;
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 1000;
    border-color: #333333;
`;
 
class Loader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }
  render() {
    return (
      <div className='sweet-loading'>
        <SyncLoader
          css={override}
          sizeUnit={"px"}
          size={15}
          color={'#333333'}
          loading={this.state.loading}
        />
      </div>
    )
  }
}

export default Loader