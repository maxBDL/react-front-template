import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../styles/colors';
import { IPub, IBarathon} from '../types/api';
import BarathonForm from './BarathonForm';
import { CustomContextProvider } from './MyContext';
import Section from './Section';
import BarathonList from './BarathonList';

const SContainer = styled.div`
    background-color: ${colors.darkGrey};
    height: 100%;
    width: 100%;
    padding: 15px;
`;

const App = (): JSX.Element => {
    // Déclaration d'une nouvelle variable d'état interne : pubs
    // RAPPEL: un changement d'état du composant provoque
    //         son re-rendu
    const [pubs, setPubs] = useState<IPub[]>([]);
    //const [isReadyToFetch, setIsReadyToFetch] = useState<boolean>(false);
    const [barathons, setBarathons] = useState<IBarathon[]>([]);
    // fonction executé au montage du composant
    // dans le DOM

    /*useEffect(() => {
        const init = async (): Promise<void> => {
            const locallyStoredPubs = await localStorage.getItem('pubs');
            if (locallyStoredPubs) {
                console.log('is stored in local database');
                setPubs(JSON.parse(locallyStoredPubs));
            }
            else {
                console.log('fetch');
                window.setTimeout(() => {
                    setIsReadyToFetch(true);
                }, 1000);
            }
        };

        init();*/
        /*const listener = (): void => {
            console.log(window.scrollY);
        };

        window.addEventListener('scroll', listener);

        return (): void => {
            window.removeEventListener('scroll', listener);
        };
    }, []);*/

    useEffect(() => {
        // obligé d'utiliser une fonction passe-plat pour le code asynchrone
        //if (isReadyToFetch === true) {
            const fetchPubs = async (): Promise<void> => {
                const response = await fetch('https://miw-server.herokuapp.com/pubs');
                const pubs = await response.json();
                await localStorage.setItem('pubs', JSON.stringify(pubs));
                setPubs(pubs);
            };

            const fetchBarathon = async (): Promise<void> => {
                const response = await fetch('https://miw-server.herokuapp.com/barathons');
                const barathons = await response.json();
                setBarathons(barathons);
            };

            fetchPubs();
            fetchBarathon();
        //}
    }, [/*isReadyToFetch*/]);
    return (
        <CustomContextProvider>
            <SContainer>
                <Section>
                    <BarathonForm pubs={pubs} />
                </Section>
                <Section>
                    <BarathonList
                        pubs={pubs}
                        barathons={barathons}
                    />
                </Section>
            </SContainer>
        </CustomContextProvider>
    );
};

const SPubsContainer = styled.div`
    display: flex; 
`;

export default App;