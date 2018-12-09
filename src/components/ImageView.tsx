import { faSearchMinus, faSearchPlus, faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import * as cx from 'classnames'
import * as React from 'react'

import './ImageView.css'


export interface ImageViewerProps {
  smallImage: string;
  largeImage: string;
  imageViewerClass?: string
}

interface ImageViewerState {
  showModal: boolean;
  scaleProperty: string | undefined;
  rotateProperty: string | undefined;
  zoomCursor: number;
  rotateCursor: number;
}


class ImageViewer extends React.Component<ImageViewerProps, ImageViewerState> {

  /**
   * Zoom default config.
   */
  private zoomConfig : number[] = [
    0.2, 0.4, 0.6, 0.8, 1,
    1.2, 1.4, 1.6, 1.8, 2
  ]

  /**
   * Rotate default config.
   */
  private rotateConfig : number[] = [
    0, 90, 180, 270, 360
  ]

  constructor(props: ImageViewerProps) {
    super(props);

    this.state = {
      rotateCursor: 0,
      rotateProperty: undefined,
      scaleProperty: undefined,
      showModal: false,
      zoomCursor: this.zoomConfig.indexOf(1)
    };
  }

  public componentDidMount() {
    window.addEventListener('keydown', this.onKeydown)
  }

  public componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeydown)
  }

  public render() {
    const { imageViewerClass, smallImage } = this.props

    return (
      <span className={cx('image-view', imageViewerClass)}>
        <img
          alt='图片'
          className='small-image'
          onClick={this.showImageModal}
          src={smallImage}/>
        {this.renderImageModal()}
      </span>
    )
  }

  private onKeydown = (e: any) :void => {
    if (e.key === 'Escape' && this.state.showModal) {
      this.hideImageModal()
    }
  }

  private showImageModal = () :void => {
    this.setState({ showModal: true });
  }

  private hideImageModal = () :void => {
    this.setState({ showModal: false });
  }

  private zoomIn = (e: any) :void => {
    e.stopPropagation()
    let zoomCursor = this.state.zoomCursor;
    if (zoomCursor < this.zoomConfig.length - 1) {
      zoomCursor += 1;
      this.setState({ zoomCursor });
    }
  }

  private zoomOut = (e: any) :void => {
    e.stopPropagation()
    let zoomCursor = this.state.zoomCursor;
    if (zoomCursor > 0) {
      zoomCursor -= 1;
      this.setState({ zoomCursor })
    }
  }

  private rotate = (e: any) :void => {
    e.stopPropagation()
    const rotateCursor = this.state.rotateCursor;
    this.setState({ rotateCursor: (rotateCursor + 1) % this.rotateConfig.length })
  }

  private renderImageModal = () :JSX.Element => {
    const { largeImage } = this.props;
    const { zoomCursor, rotateCursor } = this.state;
    const style = {
      transform: '',
      transformOrigin: 'top'
    };

    const scaleCssProperty = `scale(${this.zoomConfig[zoomCursor]})`;
    const rotateCssProperty = `rotate(${this.rotateConfig[rotateCursor]}deg)`;
    if (!['rotate(360deg)', 'rotate(0deg)'].includes(rotateCssProperty)) {
      style.transformOrigin = 'center';
    }

    style.transform = `${scaleCssProperty} ${rotateCssProperty}`;

    return (
      <div
        className={cx('imageview-modal', {'imageview-disappear': !this.state.showModal, 'appear': this.state.showModal})}>
        <icon className='imageview-close-icon' onClick={this.hideImageModal}/>
        <div className='imageview-modal-content'>
          <figure>
            <p>
              <img style={style} src={largeImage} alt='图片'/>
            </p>
          </figure>
        </div>
        <div className='imageview-operation'>
          <span onClick={this.zoomIn} id='zoom-in'><FontAwesomeIcon icon={faSearchPlus}/></span>
          <span onClick={this.zoomOut} id='zoom-out'><FontAwesomeIcon icon={faSearchMinus}/></span>
          <span onClick={this.rotate} id='rotate'><FontAwesomeIcon icon={faSyncAlt}/></span>
        </div>
      </div>
    )
  }
}

export default ImageViewer;
