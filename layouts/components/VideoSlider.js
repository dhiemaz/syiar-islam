import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/scss/image-gallery.scss';

const PREFIX_URL = 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/';

class MyVideoSlider extends React.Component {
    constructor() {
        super();
        this.state = {
            showIndex: false,
            showBullets: true,
            infinite: true,
            showThumbnails: true,
            showFullscreenButton: true,
            showGalleryFullscreenButton: true,
            showPlayButton: true,
            showGalleryPlayButton: true,
            showNav: true,
            isRTL: false,
            slideDuration: 450,
            slideInterval: 2000,
            slideOnThumbnailOver: true,
            thumbnailPosition: 'bottom',
            showVideo: {},
            useWindowKeyDown: true,
        };

        this.images = [
            {
                thumbnail: `https://i3.ytimg.com/vi/sGvh-WJjK60/hqdefault.jpg`,
                original: `https://i3.ytimg.com/vi/sGvh-WJjK60/maxresdefault.jpg`,
                embedUrl:
                    'https://www.youtube.com/embed/sGvh-WJjK60?autoplay=1&showinfo=0',
                description: 'Render custom slides (such as videos)',
                renderItem: this._renderVideo.bind(this),
            },
            {
                thumbnail: `https://i3.ytimg.com/vi/tYGh2qnCl9I/hqdefault.jpg`,
                original: `https://i3.ytimg.com/vi/tYGh2qnCl9I/maxresdefault.jpg`,
                embedUrl:
                    'https://www.youtube.com/embed/tYGh2qnCl9I?autoplay=1&showinfo=0',
                description: 'Render custom slides (such as videos)',
                renderItem: this._renderVideo.bind(this),
            },
            {
                original: `${PREFIX_URL}1.jpg`,
                thumbnail: `${PREFIX_URL}1t.jpg`,
                originalClass: 'featured-slide',
                thumbnailClass: 'featured-thumb',
                description: 'Custom class for slides & thumbnails',
            },
        ].concat(this._getStaticImages());
    }

    _onImageClick(event) {
        console.debug(
            'clicked on image',
            event.target,
            'at index',
            this._imageGallery.getCurrentIndex()
        );
    }

    _onImageLoad(event) {
        console.debug('loaded image', event.target.src);
    }

    _onSlide(index) {
        this._resetVideo();
        console.debug('slid to index', index);
    }

    _onPause(index) {
        console.debug('paused on index', index);
    }

    _onScreenChange(fullScreenElement) {
        console.debug('isFullScreen?', !!fullScreenElement);
    }

    _onPlay(index) {
        console.debug('playing from index', index);
    }

    _getStaticImages() {
        let images = [];
        for (let i = 2; i < 4; i++) {
            images.push({
                original: `${PREFIX_URL}${i}.jpg`,
                thumbnail: `${PREFIX_URL}${i}t.jpg`,
            });
        }

        return images;
    }

    _resetVideo() {
        this.setState({showVideo: {}});

        // if (this.state.showPlayButton) {
        //     this.setState({showGalleryPlayButton: true});
        // }

        this.setState({showGalleryPlayButton: true});

        if (this.state.showFullscreenButton) {
            this.setState({showGalleryFullscreenButton: true});
        }
    }

    _toggleShowVideo(url) {
        this.state.showVideo[url] = !Boolean(this.state.showVideo[url]);
        this.setState({
            showVideo: this.state.showVideo,
        });

        if (this.state.showVideo[url]) {
            if (this.state.showPlayButton) {
                this.setState({showGalleryPlayButton: false});
            }

            if (this.state.showFullscreenButton) {
                this.setState({showGalleryFullscreenButton: false});
            }
        }
    }

    _renderVideo(item) {
        return (
            <div>
                {this.state.showVideo[item.embedUrl] ? (
                    <div className="video-wrapper">
                        <a
                            className="close-video"
                            onClick={this._toggleShowVideo.bind(this, item.embedUrl)}
                        ></a>
                        <iframe
                            width="560"
                            height="315"
                            src={item.embedUrl}
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    </div>
                ) : (
                    <a onClick={this._toggleShowVideo.bind(this, item.embedUrl)}>
                        <div className="play-button"></div>
                        <img className="image-gallery-image" src={item.original}/>
                        {item.description && (
                            <span
                                className="image-gallery-description"
                                style={{right: '0', left: 'initial'}}
                            >
                {item.description}
              </span>
                        )}
                    </a>
                )}
            </div>
        );
    }

    render() {
        return (
            <section className="app">
                <ImageGallery
                    ref={(i) => (this._imageGallery = i)}
                    items={this.images}
                    onClick={this._onImageClick.bind(this)}
                    onImageLoad={this._onImageLoad}
                    onSlide={this._onSlide.bind(this)}
                    onPause={this._onPause.bind(this)}
                    onScreenChange={this._onScreenChange.bind(this)}
                    onPlay={this._onPlay.bind(this)}
                    infinite={this.state.infinite}
                    showBullets={this.state.showBullets}
                    showFullscreenButton={
                        this.state.showFullscreenButton &&
                        this.state.showGalleryFullscreenButton
                    }
                    // showPlayButton={
                    //     this.state.showPlayButton && this.state.showGalleryPlayButton
                    // }

                    showPlayButton={true}
                    showThumbnails={this.state.showThumbnails}
                    showIndex={this.state.showIndex}
                    showNav={this.state.showNav}
                    isRTL={this.state.isRTL}
                    thumbnailPosition={this.state.thumbnailPosition}
                    slideDuration={parseInt(this.state.slideDuration)}
                    slideInterval={parseInt(this.state.slideInterval)}
                    slideOnThumbnailOver={this.state.slideOnThumbnailOver}
                    additionalClass="app-image-gallery"
                    useWindowKeyDown={this.state.useWindowKeyDown}
                />
            </section>
        );
    }
}

export default MyVideoSlider;