import React, { Fragment } from "react";

class LoadingImg extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loaded: false };
        this.handleImageLoaded = this.handleImageLoaded.bind(this);
        this.image = React.createRef();
    }

    componentDidMount() {
        const img = this.image.current;
        if (img && img.complete) {
            this.handleImageLoaded();
        }
    }

    handleImageLoaded() {
        if (!this.state.loaded) {
            this.setState({ loaded: true });
        }
    }

    render() {
        return (
            <Fragment>
                <img
                    ref={this.image}
                    src={this.props.imageUrl}
                    onLoad={this.handleImageLoaded.bind(this)}
                    // onError={this.handleImageErrored.bind(this)}
                    width={this.props.width}
                    height={this.props.height}
                />
                {!this.state.loaded ? <div
                    style={{ width: this.props.width, height: this.props.height }}
                    className="bg-gray-400 mt-10 border border-grey-900-400 text-gray-500 text-center px-4 py-3 rounded flex justify-center items-center"
                >Goon is loading from IPFS...</div> : ""}

            </Fragment>
        );
    }
}
export default LoadingImg;