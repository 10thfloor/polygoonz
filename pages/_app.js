import App, { Container } from "next/app";
import { StoreProvider } from "easy-peasy";
import store from '../store'
import './style.css';



class PolygoonApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <StoreProvider store={store}>
          <Component {...pageProps} />
        </StoreProvider>
      </Container>
    );
  }
}

export default PolygoonApp;