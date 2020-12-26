import React, {useState} from "react";
import LeafletMap from "./LeafletMap";
import {IBarathon, IPub} from "../types/api";
import styled from "styled-components";
import {colors} from "../styles/colors";
import Button from "./Button";

interface IProps {
    barathon: IBarathon;
    pubs: IPub[];
}

const BarathonThumbnail= ({barathon,pubs}: IProps): JSX.Element => {
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const toggleMap = (): void => {
        setIsOpened((!isOpened));
    };

    const selectedPubs = barathon.checkpoints.map((checkpoint:string) => {
        return pubs.find((pub: IPub) => pub._id === checkpoint);
    });

    return (
        <>
            <SBarathon>
                <STitle>
                    {barathon.name}
                </STitle>
                <SAuthor>
                    {'Par: ' + barathon.author}
                </SAuthor>
                <Button type="button" onClick={toggleMap}>{isOpened ? 'Cacher' : 'Voir la cartes'}</Button>
                {isOpened && (
                    <LeafletMap selectedPubs={selectedPubs} pubs={selectedPubs}/>
                )}
            </SBarathon>
        </>
    );
};

const SAuthor = styled.p`
     color: ${colors.white};
     font-size: 15px;
`;

const STitle = styled.p`
     color: ${colors.white};
`;

const SBarathon = styled.div`
    padding: 12px;
    background: ${colors.darkGrey};
    margin-bottom: 15px;
`;

export default BarathonThumbnail;