import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import CitySelector from './components/CitySelector/index';
import { TCity } from './types/City';
import Map from './components/Map/Map';

const GlobalStyles = createGlobalStyle`
    body {
        background: #ccc;
    }

    .leaflet-popup-content-wrapper {
        background: transparent;
        border-radius: 0;
        box-shadow: none;
        padding: 0;
    }

    .leaflet-popup-content {
        margin: 0;
    }
`;

interface IProps {

}

interface IState {
    selectedCity: TCity;
}

class EntryPoint extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            selectedCity: null
        };
    }

    onSelect = (city: TCity): void => {
        this.setState({
            selectedCity: city
        });
    };

    render(): JSX.Element {
        return (
            <>
                <GlobalStyles />
                <CitySelector onSelect={this.onSelect} />

                {this.state.selectedCity && <Map city={this.state.selectedCity} />}
            </>
        );
    }
}

ReactDOM.render(<EntryPoint />, document.getElementById('app'));
